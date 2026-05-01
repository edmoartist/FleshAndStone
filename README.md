# Flesh And Stone

Single-file HTML5 top-down roguelite prototype.

## Play

Open `index.html` in a modern browser.

`index.html` currently launches the known-good single-file build through an iframe so the original playable file stays untouched while the repo is modularized.

## Current files

```text
index.html                                  Browser entrypoint
styles/main.css                            Page/frame styling
toybox_catacombs_single_file_html_53.html  Known-good original playable build
scripts/split_single_file_html.py          Local splitter for extracting CSS/JS from the original file
docs/SPLIT_PLAN.md                         Refactor plan
```

## Controls

- WASD to move
- Arrow keys or mouse to shoot
- E to interact, buy, or exit
- Space for shockwave
- R to restart after a run

## Refactor direction

The safe path is to preserve the original single-file build, then split it into:

```text
index.html
styles/main.css
src/game.js
docs/
scripts/
```

After that, gameplay systems can be split further into `src/items.js`, `src/level_generation.js`, `src/rendering.js`, and similar modules.
