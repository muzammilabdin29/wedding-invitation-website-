# 💍 Shivam & Supriya — Royal Wedding Invitation

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Website-success?style=for-the-badge&logo=vercel)](https://wedding-invitation-website-frontend.vercel.app/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://wedding-invitation-website-frontend.vercel.app/)
[![Pure Frontend](https://img.shields.io/badge/Architecture-Pure_Frontend-gold?style=for-the-badge)](#)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Celebration](https://img.shields.io/badge/Celebration-Nov_2026-critical?style=for-the-badge)](#)

> 🌟 **Live Website:** **[https://wedding-invitation-website-frontend.vercel.app/](https://wedding-invitation-website-frontend.vercel.app/)**
>
> *An interactive, royal Indian digital wedding invitation featuring realistic 3D envelope unboxing, background wedding melodies, live countdown, and one-click calendar sync.*

---

## 📖 Overview

A luxurious, interactive digital wedding invitation website crafted for **Shivam & Supriya**'s wedding celebrations in Patna, Bihar (November 2026).

Designed with a rich royal Indian aesthetic featuring deep burgundy, plum, and champagne gold palettes, smooth glassmorphism, traditional Sanskrit shlokas, floating golden particles, interactive flower petal showers, and Google Drive cloud photo streaming.

---

## ✨ Features & Highlights

- ✉️ **Royal Wax Seal & 3D Envelope Unboxing:** An interactive unboxing experience featuring realistic wax seal breaking, sparkle explosion, and a smooth slide-out card with scratch-to-reveal wedding details.
- 🎵 **Continuous Background Melodies:** Automated playback of *"Ranjha"* (*Shershaah*) with a persistent floating play/pause audio controller.
- ✨ **Golden Ambient Particle Engine:** Lightweight floating gold sparkle particle system for an authentic royal ambiance.
- ⏳ **Live Countdown Timer:** Real-time countdown tracking days, hours, minutes, and seconds until the Baraat & Wedding on **November 24, 2026 at 7:00 PM IST**.
- 🗓️ **"Save the Date" 1-Click Calendar:**
  - **Google Calendar:** Auto-filled event title, timings, description, and venue location.
  - **Microsoft Outlook & Yahoo Calendar:** Direct compose links with pre-filled event metadata.
  - **Apple Calendar / Universal `.ics`:** Downloadable calendar file compatible with iOS, macOS, and desktop calendar clients.
- 🌸 **Interactive Flower Shower Blessings:** Tap on the Parents' tribute cards to trigger a 3D animated golden flower petal shower.
- 🗺️ **Ceremony Timeline & Navigation:** Complete ceremony schedule with direct 1-tap Google Maps directions for every venue.
- 📸 **Google Drive Photo Streaming:** Bride & Groom portraits stream directly from Google Drive using high-speed CDN links with local fallback handling.
- 📱 **Mobile-First & 100% Responsive:** Pixel-perfect layout tailored for smartphones, tablets, laptops, and large screens.
- ⚡ **Zero Build Tools / 100% Serverless:** Pure HTML5, CSS3, and Vanilla JavaScript with no dependencies or build steps required.

---

## 📅 Wedding Events Schedule

| Date & Time | Ceremony | Venue | Map Link |
| :--- | :--- | :--- | :--- |
| **Nov 21, 2026 \| 12:00 PM** | **Tilak Ceremony** | Usri Bandh Jamshaut Road, Patna, Bihar | [View Map ↗](https://maps.app.goo.gl/uyPPQ3ENX7NJNwUK8) |
| **Nov 23, 2026 \| Haldi: 2:00 PM &bull; Mehndi: 5:00 PM** | **Haldi & Mehndi Ceremony** | Usri Bandh Jamshaut Road, Patna, Bihar | [View Map ↗](https://maps.app.goo.gl/uyPPQ3ENX7NJNwUK8) |
| **Nov 24, 2026 \| 7:00 PM** | **The Baraat & Wedding** | Sainik Rest House, Danapur Cantt, Patna | [View Map ↗](https://maps.app.goo.gl/2swnAPzT2U7tK1G79) |
| **Nov 26, 2026 \| 7:00 PM** | **Grand Reception** | Amantran Marriage Garden, Takiapar, Danapur, Patna | [View Map ↗](https://maps.app.goo.gl/RXHxwvkQmM5Brbh4A) |

---

## 📁 Repository Structure

```
wedding-invitation-website/
├── frontend/
│   ├── assets/
│   │   ├── events_bg.jpg      # Background for wedding events timeline
│   │   ├── gratitude_bg.jpg   # Background for gratitude & shloka section
│   │   ├── hero_bg.jpg        # Royal palace background for hero entrance
│   │   └── ranjha.mp3         # Background wedding music track
│   ├── css/
│   │   └── style.css          # Royal theme styling, animations & responsiveness
│   ├── js/
│   │   └── script.js          # Audio, countdown, envelope & calendar logic
│   └── index.html             # Main wedding invitation page markup
├── .gitignore
├── memory.md
└── README.md
```

---

## 📸 Managing Google Drive Photos

The Bride and Groom portraits in the **Our Story** section can be updated anytime directly via Google Drive links without re-uploading image files:

1. Upload the photo to Google Drive.
2. Right-click the photo ➔ **Share** ➔ **Share** ➔ set *General access* to **"Anyone with the link"**.
3. Copy the link and update `GOOGLE_DRIVE_CONFIG` in `frontend/js/script.js`:

```javascript
const GOOGLE_DRIVE_CONFIG = {
  // Groom photo (Shivam):
  groomPhoto: "https://drive.google.com/file/d/YOUR_GROOM_FILE_ID/view?usp=drive_link",

  // Bride photo (Supriya):
  bridePhoto: "https://drive.google.com/file/d/YOUR_BRIDE_FILE_ID/view?usp=drive_link",
};
```

---

## 🚀 Running Locally

Because the project is built with pure vanilla web standards, you can run it immediately without installing npm packages:

### Option 1: Open Directly in Browser
Double-click `frontend/index.html` to open it in Chrome, Edge, Safari, or Firefox.

### Option 2: Local HTTP Server (Recommended)
```bash
# Navigate to frontend folder
cd frontend

# Run a lightweight local server with Python
python -m http.server 5500
```
Open **`http://localhost:5500`** in your browser.

### Option 3: VS Code Live Server
Right-click `frontend/index.html` in VS Code and select **"Open with Live Server"**.

---

## 🌐 Deployment

The project is hosted and continuously deployed on **Vercel**:

- **Live URL:** [https://wedding-invitation-website-frontend.vercel.app/](https://wedding-invitation-website-frontend.vercel.app/)
- **Root Directory:** `frontend`
- **Build Command:** *(None required — static HTML/CSS/JS)*
- **Output Directory:** `.`

---

## 🎨 Customization Guide

- **Change Music:** Replace `frontend/assets/ranjha.mp3` with any `.mp3` audio track of your choice.
- **Change Event Timings & Details:** Edit `<section class="section events">` in `frontend/index.html`.
- **Update Wedding Countdown:** Adjust the target date in `frontend/js/script.js` inside `initCountdown()`.
- **Change Palette / Styles:** Edit the CSS custom properties in `frontend/css/style.css` (`--gold`, `--maroon`, `--cream`).

---

## 📜 Credits

- **Designed & Developed with ❤️ by:** **Mr Bob**
- Created for **Shivam & Supriya**'s Wedding Celebration.
