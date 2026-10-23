#!/usr/bin/env python3
"""
build_preview.py — makes a single self-contained HTML file for the in-app preview.

The workspace preview runs in a sandboxed iframe with NO network access, so
external files (styles.css, app.js, .webp images) will not load there.
This script inlines all of them into ../preview.html as data URIs.

The real site (index.html + assets/) is untouched and is what you deploy to Netlify.

Usage:  python3 tools/build_preview.py
"""
import base64
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT.parent / "wedding-preview.html"


def data_uri(path: pathlib.Path) -> str:
    mime = {
        ".webp": "image/webp",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".svg": "image/svg+xml",
    }[path.suffix.lower()]
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{b64}"


def main() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")

    # 1. inline the stylesheet
    css = (ROOT / "assets/css/styles.css").read_text(encoding="utf-8")
    html = html.replace(
        '<link rel="stylesheet" href="assets/css/styles.css" />',
        "<style>\n" + css + "\n</style>",
    )

    # 2. inline the favicon
    html = html.replace(
        '<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml" />',
        f'<link rel="icon" href="{data_uri(ROOT / "assets/img/favicon.svg")}" type="image/svg+xml" />',
    )

    # 3. inline the scripts, in order
    for name in ("config.js", "app.js"):
        js = (ROOT / "assets/js" / name).read_text(encoding="utf-8")
        html = html.replace(
            f'<script src="assets/js/{name}"></script>',
            "<script>\n" + js + "\n</script>",
        )

    # 4. drop the social-sharing image (it points at a 1.5 MB PNG we don't want inlined)
    html = re.sub(r'\s*<meta property="og:image"[^>]*>', "", html)

    # 5. inline every referenced image (markup + any src set by JS from config)
    for rel in sorted({m for m in re.findall(r"assets/img/[\w.\-]+", html)}):
        p = ROOT / rel
        if p.exists():
            html = html.replace(rel, data_uri(p))

    OUT.write_text(html, encoding="utf-8")
    print(f"wrote {OUT}  ({OUT.stat().st_size/1024:.0f} KB)")


if __name__ == "__main__":
    main()
