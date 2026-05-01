# Split Plan

## Goal

Move the project away from one giant HTML file without breaking the known-good playable build.

## Current state

The repository started with one playable file:

```text
toybox_catacombs_single_file_html_53.html
```

That file is intentionally left untouched in this PR.

## Stage 1: Safe wrapper

Added:

```text
index.html
styles/main.css
README.md
scripts/split_single_file_html.py
```

`index.html` launches the original game file through an iframe. This gives the repo a normal browser entrypoint while keeping the old build intact.

## Stage 2: Mechanical extraction

Run:

```powershell
python scripts/split_single_file_html.py
```

Expected generated files:

```text
index.split.html
styles/extracted.css
src/game.js
```

This stage should be verified manually before replacing the root `index.html`.

## Stage 3: Real module split

Once `src/game.js` is confirmed to behave exactly like the original script, split it by responsibility:

```text
src/core/random.js
src/core/input.js
src/game/state.js
src/game/items.js
src/game/player.js
src/game/enemies.js
src/game/level_generation.js
src/game/combat.js
src/game/rendering.js
src/main.js
```

## Rule

Do not delete the original single-file HTML until the split build has been manually tested in browser.
