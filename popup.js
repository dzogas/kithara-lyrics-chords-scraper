function downloadFile(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Robust chord/lyric merge
function mergeChordLyric(chordLine, lyricLine) {
  const tokens = [];
  let i = 0;
  while (i < chordLine.length) {
    if (chordLine[i] === " ") { i++; continue; }
    const start = i;
    let token = "";
    while (i < chordLine.length && chordLine[i] !== " ") {
      token += chordLine[i];
      i++;
    }
    token = token.replace(/\s+/g, "");
    if (/^[A-G][#b]?/.test(token)) {
      tokens.push({ start, token });
    }
  }

  let result = "";
  let pos = 0;
  let tIndex = 0;

  while (pos < lyricLine.length) {
    while (tIndex < tokens.length && tokens[tIndex].start === pos) {
      result += `[${tokens[tIndex].token}]`;
      tIndex++;
    }
    result += lyricLine[pos];
    pos++;
  }

  while (tIndex < tokens.length) {
    result += `[${tokens[tIndex].token}]`;
    tIndex++;
  }

  return result;
}

// Metadata with graceful fallback (no external APIs)
function fetchMetadata(scrapedKey) {
  const key = scrapedKey || "Unknown";
  const time = "4/4";
  const bpm = "Unknown";
  return { key, time, bpm };
}

let lastChordPro = "";
let lastTitle = "";
let lastArtist = "";

document.getElementById("scrapeBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"]
    }, () => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "scrape" }, (response) => {
        if (response) {
          lastTitle = response.title;
          lastArtist = response.artist;

          const meta = fetchMetadata(response.key);

          let chordPro = `{title: ${response.title}}\n{artist: ${response.artist}}\n{key: ${meta.key}}\n{time: ${meta.time}}\n{tempo: ${meta.bpm}}\n\n`;

          for (let i = 0; i < response.lines.length; i++) {
            const line = response.lines[i];
            const nextLine = response.lines[i + 1];

            if (line.type === "chord" && nextLine && nextLine.type === "lyric") {
              chordPro += mergeChordLyric(line.text, nextLine.text) + "\n";
              i++;
            } else if (line.type === "lyric") {
              chordPro += line.text + "\n";
            } else if (line.type === "chord") {
              const chordOnly = line.text
                .split(/\s+/)
                .filter(Boolean)
                .map(c => `[${c.replace(/\s+/g, "")}]`)
                .join("");
              chordPro += chordOnly + "\n";
            } else if (line.type === "empty") {
              chordPro += "\n"; // preserve blank line
            }
          }

          lastChordPro = chordPro;
          document.getElementById("output").textContent = lastChordPro;
          document.getElementById("downloadBtn").disabled = false;

          navigator.clipboard.writeText(lastChordPro).then(() => {
            document.getElementById("status").textContent = "✅ Copied to clipboard!";
          }).catch(err => {
            document.getElementById("status").textContent = "❌ Clipboard copy failed.";
            console.error("Clipboard copy failed:", err);
          });
        } else {
          document.getElementById("output").textContent = "No lyrics/chords found.";
        }
      });
    });
  });
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  if (lastChordPro) {
    const safeTitle = lastTitle.replace(/[^\w\s-]/g, "");
    const safeArtist = lastArtist.replace(/[^\w\s-]/g, "");
    const filename = `${safeArtist} - ${safeTitle}.cho`;
    downloadFile(filename, lastChordPro);
  }
});