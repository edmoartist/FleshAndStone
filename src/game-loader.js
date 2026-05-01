(() => {
  "use strict";

  const ORIGINAL_SINGLE_FILE = "toybox_catacombs_single_file_html_53.html";

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

    const scriptElement = document.createElement("script");
    scriptElement.textContent = `${script}\n//# sourceURL=legacy-game.js`;
    document.body.appendChild(scriptElement);
  }

  loadOriginalBuild().catch(showBootError);
})();
