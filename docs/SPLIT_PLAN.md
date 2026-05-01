# Split Plan

## Goal

Move the project away from one giant HTML file without losing a playable fallback.

## Current state

The original playable build remains untouched:

```text
toybox_catacombs_single_file_html_53.html
```

The modular entrypoint now uses:

```text
index.html
styles/main.css
src/game-loader.js
```

`src/game-loader.js` fetches the original single-file HTML, extracts its inline CSS and JavaScript, injects the CSS into the page, and then runs the extracted JavaScript against the normal `#game` canvas in `index.html`.

This is an intermediate split. It proves the repo can use external files without immediately hand-editing the entire 62 KB game script through the GitHub bridge.

## Running locally

Directly opening `index.html` from disk may fail because browsers usually block `fetch()` from `file://`.

Use:

```bash
python scripts/dev_server.py
```

Then open:

```text
http://127.0.0.1:8000/index.html
```

The original single-file build can still be opened directly at any time:

```text
toybox_catacombs_single_file_html_53.html
```

## Next split stage

Run:

```bash
python scripts/split_single_file_html.py
```

Expected generated files:

```text
index.split.html
styles/extracted.css
src/game.js
```

After manual browser testing, promote those generated files:

```text
index.split.html      -> index.html
styles/extracted.css  -> styles/main.css
src/game.js           -> src/game.js
```

Then delete `src/game-loader.js`.

## Final module split

Once `src/game.js` is the live source, split by responsibility:

```text
src/core/random.js
src/core/input.js
src/core/math.js
src/game/state.js
src/game/items.js
src/game/player.js
src/game/enemies.js
src/game/level-generation.js
src/game/combat.js
src/game/rendering.js
src/main.js
```

## Rule

Keep the original single-file HTML until the fully split build has been manually tested in browser.
