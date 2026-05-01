# Flesh And Stone

HTML5 top-down roguelite prototype.

## Play

For the current modular entrypoint, run a local server:

```bash
python scripts/dev_server.py
```

Then open:

```text
http://127.0.0.1:8000/index.html
```

Fallback: open the original single-file build directly:

```text
toybox_catacombs_single_file_html_53.html
```

## Controls

- WASD to move
- Arrow keys or mouse to shoot
- E to interact, buy, or exit
- Space for shockwave
- R to restart after a run

## Current structure

```text
index.html                                      Modular browser entrypoint
styles/main.css                                Page and canvas styling
src/game-loader.js                             Loads and runs the original build through external JS
toybox_catacombs_single_file_html_53.html      Original known-good playable build
scripts/dev_server.py                          Tiny local dev server
scripts/split_single_file_html.py              Extracts CSS/JS from the original HTML file
docs/SPLIT_PLAN.md                             Refactor plan
```

## Refactor direction

This branch starts with a safe runtime split:

```text
index.html
styles/main.css
src/game-loader.js
```

The next stage is to mechanically extract the original inline script into:

```text
src/game.js
```

After that, split gameplay systems into focused modules.
