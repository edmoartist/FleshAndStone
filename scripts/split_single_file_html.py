from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "toybox_catacombs_single_file_html_53.html"
OUT_INDEX = ROOT / "index.split.html"
OUT_CSS = ROOT / "styles" / "extracted.css"
OUT_JS = ROOT / "src" / "game.js"

def extract_single(pattern: str, text: str, label: str) -> str:
    match = re.search(pattern, text, flags=re.DOTALL | re.IGNORECASE)
    if not match:
        raise RuntimeError(f"Could not find {label} in {SOURCE.name}")
    return match.group(1).strip() + "\n"

def main() -> None:
    if not SOURCE.exists():
        raise FileNotFoundError(f"Missing source file: {SOURCE}")

    html = SOURCE.read_text(encoding="utf-8")

    title = extract_single(r"<title>(.*?)</title>", html, "title").strip()
    css = extract_single(r"<style>(.*?)</style>", html, "style block")
    js = extract_single(r"<script>(.*?)</script>", html, "script block")

    OUT_CSS.parent.mkdir(parents=True, exist_ok=True)
    OUT_JS.parent.mkdir(parents=True, exist_ok=True)

    OUT_CSS.write_text(css, encoding="utf-8")
    OUT_JS.write_text(js, encoding="utf-8")

    split_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{title}</title>
<link rel="stylesheet" href="styles/extracted.css" />
</head>
<body>
<canvas id="game" width="1280" height="720"></canvas>
<script src="src/game.js"></script>
</body>
</html>
"""
    OUT_INDEX.write_text(split_html, encoding="utf-8")

    print("Split complete:")
    print(f"- {OUT_INDEX.relative_to(ROOT)}")
    print(f"- {OUT_CSS.relative_to(ROOT)}")
    print(f"- {OUT_JS.relative_to(ROOT)}")
    print()
    print("Open index.split.html in a browser and compare it against the original file.")

if __name__ == "__main__":
    main()
