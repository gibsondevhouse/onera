# Preview the Onéra website on Windows

Everything here is free. You only do Parts 1–3 once.

## Part 1 — Install two free programs

1. **Git** — go to https://git-scm.com/download/win. Open the download and click **Next** on every screen, then **Install**.
2. **Node.js** — go to https://nodejs.org and click the **LTS** button. Open the download and click **Next** on every screen, then **Install**.
3. **Restart your computer.**

## Part 2 — Download the project

1. Press the **Windows key**, type `PowerShell`, and press **Enter**. A window with a blinking cursor opens.
2. Type these two lines, pressing **Enter** after each:

```
cd Documents
git clone https://github.com/gibsondevhouse/onera.git
```

3. If a window asks you to sign in to GitHub, sign in. Wait until the cursor comes back, then close PowerShell.

## Part 3 — Find the folder

1. Open **File Explorer** (the folder icon on your taskbar).
2. Click **Documents** in the left sidebar.
3. Open the **onera** folder.

You'll see a file called **Start Preview.cmd**. Pin the **onera** folder to Quick Access (right-click it, then **Pin to Quick Access**) so it's easy to find.

## Part 4 — See the website

1. Double-click **Start Preview.cmd**.
2. If Windows says "Windows protected your PC", click **More info**, then **Run anyway**.
3. A black window opens. The first time, it takes a few minutes to set up. This is normal.
4. When you see `Local: http://localhost:3000`, open your browser and go to **http://localhost:3000**.

Keep the black window open while you look at the site. Close it when you're done.

## Getting updates

Open PowerShell and type:

```
cd Documents\onera
git pull
```

Then double-click **Start Preview.cmd** again.

## Stuck?

Take a screenshot of the black window and send it to the developer.
