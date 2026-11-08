import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

// usage: swift stitch.swift <out.png> <viewportCSSHeight> <docCSSHeight> <y1:path1> <y2:path2> ...
let args = CommandLine.arguments
guard args.count >= 5 else { fputs("usage: stitch out.png vh docH y:path ...\n", stderr); exit(2) }
let outPath = args[1]
let vh = Double(args[2])!
let docH = Double(args[3])!
var frames: [(Double, CGImage)] = []
for spec in args[4...] {
    let parts = spec.split(separator: ":", maxSplits: 1).map(String.init)
    let y = Double(parts[0])!
    let url = URL(fileURLWithPath: parts[1])
    guard let src = CGImageSourceCreateWithURL(url as CFURL, nil),
          let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else { fputs("cannot read \(parts[1])\n", stderr); exit(1) }
    frames.append((y, img))
}
frames.sort { $0.0 < $1.0 }
let first = frames[0].1
let scale = Double(first.height) / vh
let outW = first.width
let outH = Int((docH * scale).rounded())
let cs = CGColorSpaceCreateDeviceRGB()
guard let ctx = CGContext(data: nil, width: outW, height: outH, bitsPerComponent: 8, bytesPerRow: 0, space: cs, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { exit(1) }
ctx.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
ctx.fill(CGRect(x: 0, y: 0, width: outW, height: outH))
for (y, img) in frames {
    let top = Int((y * scale).rounded())
    let h = img.height
    // CoreGraphics origin is bottom-left: convert top offset to bottom offset
    let bottom = outH - top - h
    ctx.draw(img, in: CGRect(x: 0, y: bottom, width: img.width, height: h))
}
guard let out = ctx.makeImage(),
      let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: outPath) as CFURL, UTType.png.identifier as CFString, 1, nil) else { exit(1) }
CGImageDestinationAddImage(dest, out, nil)
if !CGImageDestinationFinalize(dest) { fputs("write failed\n", stderr); exit(1) }
print("wrote \(outPath) \(outW)x\(outH) scale=\(String(format: "%.3f", scale)) frames=\(frames.count)")
