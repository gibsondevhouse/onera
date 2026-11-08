import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [,, outDir, profile] = process.argv;
const port = 9333;
const url = 'https://www.zivalagos.com/';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const chrome = spawn(CHROME, ['--headless=new','--disable-gpu','--hide-scrollbars','--autoplay-policy=no-user-gesture-required',`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'--window-size=1440,1000','about:blank'], { stdio: 'ignore' });
let target;
for (let i = 0; i < 50 && !target; i++) { try { const list = await fetch(`http://127.0.0.1:${port}/json`).then(r => r.json()); target = list.find(t => t.type === 'page'); } catch { await sleep(200); } }
if (!target) { chrome.kill(); throw new Error('no page target'); }
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pending = new Map(); const events = [];
ws.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); } else if (m.method) events.push(m.method); });
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
const evalJs = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result.value;
await send('Page.enable'); await send('Runtime.enable');
const hideScript = `(() => { document.documentElement.style.scrollBehavior='auto'; let n=0; const walk=(root)=>{ for (const e of root.querySelectorAll('*')) { if (e.shadowRoot) walk(e.shadowRoot); const t=(e.textContent||'').trim(); if ((t.startsWith('10% off')||t==='Chat'||/entire order/i.test(t)) && e.children.length<=3) { let a=e; for (let i=0;i<14&&a;i++){ const p=getComputedStyle(a).position; if(p==='fixed'||p==='sticky'){ a.style.setProperty('display','none','important'); n++; break;} a=a.parentElement||a.getRootNode().host; } } } }; walk(document); document.querySelectorAll('body > div, body > section, body > aside, iframe, dialog, [class*=modal], [class*=popup], [id*=popup]').forEach(e=>{ const cs=getComputedStyle(e); if(cs.position==='fixed' && !e.id.includes('header') && !e.className.toString().includes('header')){ e.style.setProperty('display','none','important'); n++; } }); return n; })()`;
const configs = [
  { name: 'desktop', width: 1440, height: 1000, dsf: 1, mobile: false },
  { name: 'mobile', width: 390, height: 844, dsf: 2, mobile: true, ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' },
];
for (const c of configs) {
  await send('Emulation.setDeviceMetricsOverride', { width: c.width, height: c.height, deviceScaleFactor: c.dsf, mobile: c.mobile });
  if (c.ua) { await send('Emulation.setUserAgentOverride', { userAgent: c.ua }); await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 }); }
  await send('Page.navigate', { url });
  for (let i = 0; i < 100; i++) { if (await evalJs('document.readyState') === 'complete') break; await sleep(200); }
  await sleep(3000);
  // hide overlays, then scroll through so lazy images and scroll reveals run
  await evalJs(hideScript);
  const docH0 = await evalJs('document.documentElement.scrollHeight');
  for (let y = 0; y < docH0; y += Math.floor(c.height * 0.8)) { await evalJs(`scrollTo({top:${y},behavior:'instant'})`); await sleep(350); }
  await sleep(800);
  await evalJs(hideScript);
  // make sure nothing is left hidden by scroll-reveal and no header hide state lingers
  await evalJs(`document.querySelectorAll('[data-animation]').forEach(e=>{e.style.opacity='1'}); document.querySelectorAll('.section-site-header--hidden').forEach(e=>e.classList.remove('section-site-header--hidden')); scrollTo({top:0,behavior:'instant'});`);
  await sleep(1200);
  const hidden = await evalJs(hideScript);
  const docH = await evalJs('document.documentElement.scrollHeight');
  const width = await evalJs('document.documentElement.clientWidth');
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: docH, scale: 1 } });
  const out = `${outDir}/zivalagos-${c.name}-native-${c.width}.png`;
  writeFileSync(out, Buffer.from(shot.data, 'base64'));
  console.log(`${c.name}: ${width}x${docH} css px @${c.dsf}x, hidden=${hidden} -> ${out}`);
}
ws.close(); chrome.kill();
