# 💍 Shivam & Supriya — Royal Wedding Invitation

[![Static Badge](https://img.shields.io/badge/Architecture-Pure_Frontend-gold?style=for-the-badge)](file:///c:/Users/MDMuzammil-Int/wedding-invitation-website-/frontend)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](file:///c:/Users/MDMuzammil-Int/wedding-invitation-website-/frontend/index.html)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](file:///c:/Users/MDMuzammil-Int/wedding-invitation-website-/frontend/css/style.css)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](file:///c:/Users/MDMuzammil-Int/wedding-invitation-website-/frontend/js/script.js)
[![License](https://img.shields.io/badge/Celebration-Nov_2026-critical?style=for-the-badge)](#)

A luxurious, interactive digital wedding invitation website crafted for **Shivam & Supriya**'s wedding celebrations in Patna, Bihar (November 2026).

Designed with a royal Indian aesthetic featuring deep burgundy and champagne gold palettes, smooth glassmorphism, traditional Sanskrit shlokas, dynamic particle animations, and direct Google Drive cloud photo streaming.

---

## ✨ Features & Highlights

- ✉️ **Royal Wax Seal & 3D Envelope:** An interactive unboxing experience with realistic wax seal breaking, card lift animation, and scratch-to-reveal invite card.
- 🎵 **Ambient Background Music:** Automated background playback of *"Ranjha"* (*Shershaah*) with a floating music toggle button.
- ✨ **Golden Ambient Particle Engine:** Lightweight floating gold sparkle particle system for an authentic royal ambiance.
- ⏳ **Live Countdown Timer:** Real-time countdown tracking days, hours, minutes, and seconds until the wedding day.
- 📸 **Google Drive Photo Streaming:** Seamlessly loads Bride & Groom portraits directly from public Google Drive links with multi-tier CDN caching and local fallbacks.
- 🗓️ **"Save the Date" 1-Click Calendar:** 
  - Add directly to **Google Calendar** (with auto-filled event details, dates, and venue location).
  - Download universal `.ics` file for **Apple iCal** and **Microsoft Outlook**.
- 🌸 **Interactive Flower Shower Blessings:** Tap on the Parents' tribute cards to trigger a 3D golden flower petal shower celebration.
- 🗺️ **Interactive Events Timeline & Navigation:** Complete ceremony schedule with direct 1-tap Google Maps directions for every venue.
- 📱 **100% Responsive:** Pixel-perfect experience optimized across mobile phones, tablets, laptops, and ultra-wide screens.
- ⚡ **Zero Build Tools / 100% Serverless:** Pure HTML, CSS, and Vanilla JavaScript with no Node.js/Python server dependencies.

---

## 📅 Wedding Events Schedule

| Date & Time | Ceremony | Venue | Map Link |
| :--- | :--- | :--- | :--- |
| **Nov 21, 2026 \| 6:00 PM** | **Tilak Ceremony** | Usri Bandh Jamshaut Road, Patna, Bihar | [View Map ↗](https://maps.app.goo.gl/uyPPQ3ENX7NJNwUK8) |
| **Nov 23, 2026 \| 6:00 PM** | **Haldi & Mehndi Ceremony** | Usri Bandh Jamshaut Road, Patna, Bihar | [View Map ↗](https://maps.app.goo.gl/uyPPQ3ENX7NJNwUK8) |
| **Nov 24, 2026 \| 6:00 PM** | **The Baraat & Wedding** | Sainik Rest House, Danapur Cantt, Patna | [View Map ↗](https://maps.app.goo.gl/2swnAPzT2U7tK1G79) |
| **Nov 26, 2026 \| 7:30 PM** | **Grand Reception** | Amantran Marriage Garden, Takiapar, Danapur, Patna | [View Map ↗](https://maps.app.goo.gl/RXHxwvkQmM5Brbh4A) |

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
│   │   └── script.js          # Google Drive photo loader, audio, countdown & envelope logic
│   └── index.html             # Main wedding invitation page markup
├── .gitignore
└── README.md
```

---

## 📸 Managing Google Drive Photos

The Bride and Groom portraits in the **Our Story** section stream directly from Google Drive.

To update or replace the photos in the future:
1. Upload your photo to Google Drive.
2. Right-click the photo ➔ **Share** ➔ **Share** ➔ set *General access* to **"Anyone with the link"**.
3. Copy the link and paste it into [`frontend/js/script.js`](file:///c:/Users/MDMuzammil-Int/wedding-invitation-website-/frontend/js/script.js#L11-L17):

```javascript
const GOOGLE_DRIVE_CONFIG = {
  // Groom photo (Shivam):
  groomPhoto: "https://drive.google.com/file/d/YOUR_GROOM_FILE_ID/view?usp=drive_link",

  // Bride photo (Supriya):
  bridePhoto: "https://drive.google.com/file/d/YOUR_BRIDE_FILE_ID/view?usp=drive_link",
};
```

> **Note:** The script automatically transforms the share link into a high-speed direct CDN stream (`lh3.googleusercontent.com/d/FILE_ID`) and includes automatic fallback to local assets if offline.

---

## 🚀 How to Run Locally

Because the project is 100% pure frontend, you can run it instantly without installing any dependencies:

### Method 1: Open Directly
Double-click [`frontend/index.html`](file:///c:/Users/MDMuzammil-Int/wedding-invitation-website-/frontend/index.html) to open it directly in Chrome, Edge, Safari, or Firefox.

### Method 2: Local HTTP Server (Recommended)
```bash
# Navigate to the frontend folder
cd frontend

# Start a simple Python local server
python -m http.server 5500
```
Open **`http://localhost:5500`** in your browser.

### Method 3: VS Code Live Server
Right-click `frontend/index.html` in VS Code and select **"Open with Live Server"**.

---

## 🌐 Free Hosting & Deployment Guide

This static website can be hosted for free with custom domain support on any modern static platform:

### 1. GitHub Pages (Free)
1. Push your repository to GitHub.
2. Go to repository **Settings** ➔ **Pages**.
3. Under *Branch*, select `main` and set the folder to `/frontend` (or move files to root).
4. Click **Save** — your site will be live at `https://<username>.github.io/<repo-name>/`.

### 2. Vercel (1-Click Deployment)
1. Import your GitHub repository on [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Click **Deploy**.

### 3. Netlify
1. Drag and drop the `frontend` folder onto [Netlify Drop](https://app.netlify.com/drop).
2. Your site goes live instantly with an HTTPS link.

---

## 🎨 Customization Guide

- **Change Music:** Replace `frontend/assets/ranjha.mp3` with any `.mp3` file of your choice.
- **Change Event Details/Times:** Edit the `<section class="section events">` inside [`frontend/index.html`](file:///c:/Users/MDMuzammil-Int/wedding-invitation-website-/frontend/index.html).
- **Update Wedding Date/Countdown:** Update the target date in [`frontend/js/script.js`](file:///c:/Users/MDMuzammil-Int/wedding-invitation-website-/frontend/js/script.js) under `initCountdown()`.
- **Theme Colors & Fonts:** Adjust the CSS root variables in [`frontend/css/style.css`](file:///c:/Users/MDMuzammil-Int/wedding-invitation-website-/frontend/css/style.css) (`--gold`, `--burgundy-deep`, `--cream`).

---

## 📜 License & Credits

- **Designed & Developed by:** **Mr Bob**
- Created with ❤️ for **Shivam & Supriya**'s Wedding Celebration.
