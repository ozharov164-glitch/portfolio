"""One-off resize of the brand mark. Uses Pillow already on the machine; commit the webp output.

Not a site runtime dependency.
"""

from pathlib import Path

from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / "public/media/brand/programmer.webp"
image = Image.open(source).convert("RGBA")

for size in (64, 128, 256):
    resized = image.resize((size, size), Image.Resampling.LANCZOS)
    target = root / f"public/media/brand/programmer-{size}.webp"
    resized.save(target, "WEBP", quality=82, method=6)
    print(target.name, target.stat().st_size)
