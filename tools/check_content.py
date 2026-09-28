"""Checks the site's content: data files, images, links and placeholders.

Run from the repo root:  py tools/check_content.py

Errors mean something on the page is wrong right now. "Before launch" lists
content still to come. It only reads files; nothing is changed. It doesn't
visit the Etsy links (Etsy blocks scripts), so click each one before launch.
"""
import json
import re
import sys
from pathlib import Path

LIMITS = {'name': 28, 'description': 120, 'title': 40, 'alt': 125}  # SPEC → Text limits
PLACEHOLDER = re.compile(r'\[[^\[\]]*\]')  # [anything in square brackets]

errors = {}   # where → problems
todos = {}


def report(found, where, problem):
    found.setdefault(where, []).append(problem)


def load(name):
    return json.loads(Path('data', name).read_text(encoding='utf-8'))


def check_text(where, entry, fields):
    """Blank fields, [placeholders] and over-long text."""
    for field in fields:
        text = entry.get(field, '')
        if not text:
            report(todos, where, f'no {field}')
        elif PLACEHOLDER.search(text):
            report(todos, where, f'{field} has a placeholder: {PLACEHOLDER.search(text).group()}')
        if field in LIMITS and len(text) > LIMITS[field]:
            report(todos, where, f'{field} is {len(text)} characters (limit {LIMITS[field]})')


def check_images(where, paths):
    missing = [str(path) for path in paths if not path.exists()]
    if missing:
        report(todos, where, 'missing ' + ', '.join(missing))


def check_shape(where, entry, file):
    """The shape is written by prepare_images.py once the full image exists."""
    if 'width' not in entry and Path(f'images/full/{file}-1400.webp').exists():
        report(todos, where, 'no width/height: run tools/prepare_images.py')


def full_images(file):
    return [Path(f'images/full/{file}-800.webp'), Path(f'images/full/{file}-1400.webp')]


def check_offerings(data):
    group_ids = {group['id'] for group in data['groups']}
    for offering in data['offerings']:
        where = f"offerings.json {offering['id']}"
        if offering['group'] not in group_ids:
            report(errors, where, f"group '{offering['group']}' isn't in groups")
        check_text(where, offering, ['name', 'description'])
        url = offering['etsyUrl']
        if not url:
            report(todos, where, 'no Etsy link (the button goes to the shop instead)')
        elif not url.startswith('https://www.etsy.com/'):
            report(errors, where, f"Etsy link doesn't start with https://www.etsy.com/: {url}")
    return {offering['id'] for offering in data['offerings']}


def check_entries(name, entries, fields, card_folder, offering_ids=None):
    seen = set()
    for entry in entries:
        file = entry['file']
        where = f'{name} {file}'
        if file in seen:
            report(errors, where, 'this file name is used twice')
        seen.add(file)
        for offering in entry.get('offerings', []):
            if offering_ids is not None and offering not in offering_ids:
                report(errors, where, f"offering '{offering}' isn't in offerings.json (the tile is left out)")
        check_text(where, entry, fields)
        check_images(where, [Path(f'images/{card_folder}/{file}.webp')] + full_images(file))
        check_shape(where, entry, file)


def check_page():
    """index.html: placeholder text, links that go nowhere, and the images it names."""
    html = Path('index.html').read_text(encoding='utf-8')
    for number, line in enumerate(html.splitlines(), start=1):
        for placeholder in PLACEHOLDER.findall(line):
            short = placeholder if len(placeholder) <= 60 else placeholder[:56] + '...]'
            report(todos, f'index.html line {number}', f'placeholder: {short}')
    empty_links = html.count('href="#"')
    if empty_links:
        report(todos, 'index.html', f'{empty_links} links still go nowhere (href="#"): Etsy shop, email, Instagram')
    check_images('index.html', [Path(path) for path in sorted(set(re.findall(r'images/[\w/.-]+', html)))])


def print_group(title, found):
    if found:
        print(f'\n{title}')
        for where, problems in found.items():
            print(f'  {where}: ' + '; '.join(problems))


def main():
    offering_ids = check_offerings(load('offerings.json'))
    check_entries('gallery.json', load('gallery.json'), ['alt'], 'thumbs', offering_ids)
    check_entries('personal.json', load('personal.json'), ['title', 'year', 'alt'], 'personal')
    check_page()

    print_group('Errors (the page is wrong now):', errors)
    print_group('Before launch:', todos)
    count = sum(len(problems) for problems in [*errors.values(), *todos.values()])
    print(f'\n{count} to fix.' if count else 'All clear: ready to launch (after clicking every Etsy link).')
    sys.exit(1 if count else 0)


if __name__ == '__main__':
    main()
