"""Outline the current website wordmark using its bundled font asset."""

from io import BytesIO
from pathlib import Path
import json
import sys

# Small shaping dependencies are kept outside the website checkout.
sys.path.insert(0, str(Path.home() / "AppData/Local/Temp/onera-wordmark-tools"))

import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


HERE = Path(__file__).resolve().parent
FONT_PATH = HERE.parent.parent / "web-app-onera/dist/_next/static/media/01e4147cff8141ee-s.p.3huc2loe0ie8a.woff2"
TEXT = "Onéra"
WEIGHT = 300
TRACKING_EM = 0.12
PADDING = 64

font = instantiateVariableFont(TTFont(FONT_PATH), {"wght": WEIGHT}, inplace=False)
font.flavor = None
font_bytes = BytesIO()
font.save(font_bytes)
units = font["head"].unitsPerEm
glyph_set = font.getGlyphSet()
glyph_order = font.getGlyphOrder()

shaping_font = hb.Font(hb.Face(font_bytes.getvalue()))
shaping_font.scale = (units, units)
hb.ot_font_set_funcs(shaping_font)
buffer = hb.Buffer()
buffer.add_str(TEXT)
buffer.guess_segment_properties()
hb.shape(shaping_font, buffer, {"kern": True, "liga": False, "clig": False})

path_pen = SVGPathPen(glyph_set, ntos=lambda n: f"{n:.5f}".rstrip("0").rstrip(".") if n else "0")
bounds_pen = BoundsPen(glyph_set)
cursor = 0
glyphs = []
for index, (info, position) in enumerate(zip(buffer.glyph_infos, buffer.glyph_positions)):
    name = glyph_order[info.codepoint]
    offset = (cursor + position.x_offset, position.y_offset)
    matrix = (1, 0, 0, 1, *offset)
    glyph_set[name].draw(TransformPen(path_pen, matrix))
    glyph_set[name].draw(TransformPen(bounds_pen, matrix))
    glyphs.append({"glyph": name, "x": offset[0], "y": offset[1], "advance": position.x_advance})
    cursor += position.x_advance
    if index < len(buffer.glyph_infos) - 1:
        cursor += TRACKING_EM * units

left, bottom, right, top = bounds_pen.bounds
width = right - left + 2 * PADDING
height = top - bottom + 2 * PADDING
path_data = path_pen.getCommands()
transform = f"translate({PADDING-left:g} {PADDING+top:g}) scale(1 -1)"

variants = {"onera-wordmark": "#413E07", "onera-wordmark-white": "#FFFFFF"}
for name, color in variants.items():
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width:g}" height="{height:g}" viewBox="0 0 {width:g} {height:g}" role="img" aria-labelledby="title desc">
  <title id="title">Onéra</title>
  <desc id="desc">Website wordmark, Cormorant Garamond Light 300, 0.12em letter spacing. Transparent background; letters converted to vector outlines.</desc>
  <path fill="{color}" transform="{transform}" d="{path_data}"/>
</svg>
'''
    (HERE / f"{name}.svg").write_text(svg, encoding="utf-8")

spec = {
    "wordmark": TEXT,
    "sourceComponent": "C:/Users/chris/Onéra/src/components/wordmark.tsx",
    "fontAsset": str(FONT_PATH),
    "fontFamily": "Cormorant Garamond",
    "weight": WEIGHT,
    "trackingEm": TRACKING_EM,
    "kerning": True,
    "fontDependenciesInSvg": False,
    "background": "transparent",
    "unitsPerEm": units,
    "inkBounds": {"left": left, "bottom": bottom, "right": right, "top": top},
    "viewBox": [0, 0, width, height],
    "glyphs": glyphs,
    "variants": variants,
}
(HERE / "wordmark-spec.json").write_text(json.dumps(spec, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(json.dumps({"output": str(HERE), "viewBox": spec["viewBox"], "glyphs": [g["glyph"] for g in glyphs]}))
