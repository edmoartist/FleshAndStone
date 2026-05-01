(() => {
  "use strict";

  const ORIGINAL_SINGLE_FILE = "toybox_catacombs_single_file_html_53.html";

  const LEGACY_SCRIPT_PATCHES = [
    {
      name: "keep combat doors passable while the player is near the doorway",
      search: "if (dist(G.player.x, G.player.y, cx, cy) < 58) return false;",
      replace: "if (dist(G.player.x, G.player.y, cx, cy) < 116) return false;",
    },
    {
      name: "make top-left HUD panel larger",
      search: "ctx.fillRect(14,14,400,104)",
      replace: "ctx.fillRect(14,14,560,142)",
    },
    {
      name: "make main HUD heading readable",
      search: "ctx.font='bold 17px monospace'",
      replace: "ctx.font='bold 23px monospace'",
    },
    {
      name: "make small HUD/help text readable",
      search: "ctx.font='12px monospace'",
      replace: "ctx.font='16px monospace'",
    },
    {
      name: "make floating/message text readable",
      search: "ctx.font='bold 15px monospace'",
      replace: "ctx.font='bold 20px monospace'",
    },
    {
      name: "make item/title subtitle text readable",
      search: "ctx.font='13px monospace'",
      replace: "ctx.font='16px monospace'",
    },
  ];

  function showBootError(error) {
    console.error("Failed to boot modular loader:", error);

    const canvas = document.getElementById("game");
    const bootError = document.getElementById("boot-error");

    if (canvas) {
      canvas.hidden = true;
    }

    if (bootError) {
      bootError.hidden = false;
    }
  }

  function extractTagContent(html, tagName) {
    const pattern = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
    const match = html.match(pattern);
    return match ? match[1].trim() : "";
  }

  function applyLegacyPatches(script) {
    let patched = script;

    for (const patch of LEGACY_SCRIPT_PATCHES) {
      if (!patched.includes(patch.search)) {
        console.warn(`Legacy patch skipped: ${patch.name}`);
        continue;
      }

      patched = patched.replace(patch.search, patch.replace);
    }

    return patched;
  }

  async function loadOriginalBuild() {
    if (window.location.protocol === "file:") {
      throw new Error(
        "Browser fetch() usually cannot read sibling files from file://. Use scripts/dev_server.py."
      );
    }

    const response = await fetch(ORIGINAL_SINGLE_FILE, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Could not fetch ${ORIGINAL_SINGLE_FILE}: HTTP ${response.status}`);
    }

    const html = await response.text();
    const css = extractTagContent(html, "style");
    const script = extractTagContent(html, "script");

    if (!script) {
      throw new Error(`No inline <script> block found in ${ORIGINAL_SINGLE_FILE}`);
    }

    const legacyStyle = document.getElementById("legacy-style");
    if (legacyStyle && css) {
      legacyStyle.textContent = css;
    }

    const patchedScript = applyLegacyPatches(script);

    const scriptElement = document.createElement("script");
    scriptElement.textContent = `${patchedScript}\n//# sourceURL=legacy-game.js`;
    document.body.appendChild(scriptElement);
  }

  loadOriginalBuild().catch(showBootError);
})();
