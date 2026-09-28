"""Turns Sarah's exported images into the web images the site uses.

Put the exports in originals/, laid out like images/ (any of JPG, PNG or WebP):

    originals/full/solo-portrait_01.jpg    the whole piece, uncropped, as large as you have it
    originals/thumbs/solo-portrait_01.jpg  hand-cropped square
    originals/personal/personal_01.jpg     hand-cropped 4:5 portrait
    originals/hero/hero_01.jpg             hand-cropped 4:5 (hero_03 is square)
    originals/about.jpg                    hand-cropped square

Then run from the repo root:  py tools/prepare_images.py

It never crops. A crop that's the wrong shape is reported and skipped.
Each full piece's shape is written into its entry in data/gallery.json or
data/personal.json, so the phone lightbox can fit the art.
Needs Pillow:  py -m pip install --user pillow
"""
import json
from pathlib import Path

from PIL import Image

SOURCE = Path('originals')
OUTPUT = Path('images')
DATA_FILES = [Path('data/gallery.json'), Path('data/personal.json')]
QUALITY = 80                 # WebP quality, from the spec
FULL_SIZES = (800, 1400)     # long edge of the two lightbox versions
MAX_KB = 60                  # the spec's budget for each cropped image

# The allowed sizes for each hand-cropped image, by where it sits in originals/
CROPPED_SIZES = {
    'thumbs': [(600, 600)],
    'personal': [(600, 750)],
    'hero': [(600, 750), (600, 600)],
    'about': [(640, 640)],
}


def main():
    if not SOURCE.is_dir():
        print(f'No {SOURCE}/ folder found. Run this from the repo root.')
        return
    shapes = {}
    for path in sorted(SOURCE.rglob('*')):
        if path.suffix.lower() not in ('.jpg', '.jpeg', '.png', '.webp'):
            continue
        kind = path.parent.name if path.parent != SOURCE else path.stem
        if kind == 'full':
            shapes[path.stem] = export_full(path)
        elif kind in CROPPED_SIZES:
            export_cropped(path, kind)
        else:
            print(f'SKIPPED {path}: not a folder this script knows')
    record_shapes(shapes)


def open_image(path):
    # convert('RGB') drops transparency and any colour profile quirks WebP can't keep
    return Image.open(path).convert('RGB')


def export_full(path):
    """Saves the 800 and 1400 versions, and returns the 1400 version's size."""
    image = open_image(path)
    if max(image.size) < FULL_SIZES[-1]:
        print(f'WARNING {path}: only {image.width}x{image.height}, so the {FULL_SIZES[-1]} version is enlarged')
    for long_edge in FULL_SIZES:
        scale = long_edge / max(image.size)
        size = (round(image.width * scale), round(image.height * scale))
        save(image.resize(size, Image.LANCZOS), OUTPUT / 'full' / f'{path.stem}-{long_edge}.webp')
    return size  # the last one resized: the 1400 version


def export_cropped(path, kind):
    """Resizes a hand-cropped image to its exact size, if its shape is right."""
    image = open_image(path)
    for width, height in CROPPED_SIZES[kind]:
        # Within 1% of the right shape is close enough; resizing hides the difference
        if abs(image.width / image.height - width / height) < 0.01 * width / height:
            folder = OUTPUT if kind == 'about' else OUTPUT / kind
            size_kb = save(image.resize((width, height), Image.LANCZOS), folder / f'{path.stem}.webp')
            if size_kb > MAX_KB:
                print(f'WARNING {path}: {size_kb} KB, over the {MAX_KB} KB budget')
            return
    wanted = ' or '.join(f'{w}x{h}' for w, h in CROPPED_SIZES[kind])
    print(f'SKIPPED {path}: {image.width}x{image.height} is the wrong shape; crop it to the shape of {wanted}')


def save(image, destination):
    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, quality=QUALITY)
    size_kb = round(destination.stat().st_size / 1024)
    print(f'saved {destination} ({image.width}x{image.height}, {size_kb} KB)')
    return size_kb


def record_shapes(shapes):
    """Writes each full piece's width and height into its data entry."""
    found = set()
    for data_file in DATA_FILES:
        entries = json.loads(data_file.read_text(encoding='utf-8'))
        for entry in entries:
            if entry['file'] in shapes:
                entry['width'], entry['height'] = shapes[entry['file']]
                found.add(entry['file'])
        # One entry per line, like the files are written by hand
        lines = ',\n'.join(f'  {{ {json.dumps(entry, ensure_ascii=False)[1:-1]} }}' for entry in entries)
        data_file.write_text(f'[\n{lines}\n]\n', encoding='utf-8', newline='\n')
    for name in sorted(set(shapes) - found):
        print(f'WARNING {SOURCE / "full" / name}: no entry with this file name in the data files')


if __name__ == '__main__':
    main()
