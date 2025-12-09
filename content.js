function scrapeLyricsAndChords() {
  const title = document.querySelector("h1.ti")?.innerText || "Unknown Title";
  const artist = document.querySelector("h2.ar")?.innerText || "Unknown Artist";

  // Key inside <summary> with class "til"
  let key = "Unknown";
  const keyElement = document.querySelector("summary .til");
  if (keyElement) {
    let rawKey = keyElement.innerText.trim(); // e.g. "A μινόρε" or "C ματζόρε"
    rawKey = rawKey.replace("μινόρε", "m").replace("ματζόρε", "");
    key = rawKey.trim();
  }

  // Include .te, .ch, and .no (empty line markers)
  const nodes = Array.from(document.querySelectorAll(".te, .ch, .no"));

  const lines = nodes.map(node => {
    if (node.classList.contains("no")) {
      return { type: "empty", text: "" };
    }
    const isLyric = node.classList.contains("te");
    const isChord = node.classList.contains("ch");
    const text = node.innerText ?? "";
    if ((text === "" || text.trim() === "") && (isLyric || isChord)) {
      return { type: "empty", text: "" };
    }
    return {
      type: isLyric ? "lyric" : "chord",
      text
    };
  });

  return { title, artist, key, lines };
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "scrape") {
    sendResponse(scrapeLyricsAndChords());
  }
});