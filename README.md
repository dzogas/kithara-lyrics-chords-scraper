# Kithara Lyrics & Chords Scraper 🎸

A Chrome extension that scrapes lyrics and chords from [kithara.to](https://kithara.to) song pages and exports them into **ChordPro format**.  
Perfect for importing into Songbook Pro or other chord sheet apps.

---

## ✨ Features
- Scrapes **title, artist, key, lyrics, chords, and empty lines**
- Converts directly to **ChordPro format**
- Copies result to **clipboard automatically**
- Download as `.cho` file with proper naming
- Custom **icons, banner, and favicon** for a professional look

---

## 📦 Installation (Developer Mode)
1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked** and select the project folder.
5. Pin the extension to your toolbar for easy access.

---

## 🔑 Permissions
- **activeTab**: Needed to access the current kithara.to page when scraping.
- **scripting**: Used to inject the content script into the active tab.

---

## 🔒 Privacy
This extension does **not** collect, store, or transmit any personal data.  
It only reads the current kithara.to page when you click **Scrape Lyrics & Chords**.  
No information is shared with third parties.

---

## 📂 Project Structure
kithara-lyrics-chords-scraper/
├── manifest.json
├── content.js
├── popup.html
├── popup.js
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── banner.png        (optional, for branding)
├── favicon.png       (optional)
└── README.md


---

## 🖼️ Branding
- **Icons**: Guitar + chord grid in light, dark, and color variants
- **Banner**: Extension name with guitar/chord logo
- **Favicon**: Matching mini icon for popup tab

---

## 🚀 Roadmap
- Publish to Chrome Web Store

---

## 📜 License
MIT License — free to use, modify, and share.  
See [LICENSE](LICENSE) for details.

---

## 🙌 Credits
Created by **Dionysios**  
Icons, banner, and favicon designed with Copilot assistance.

