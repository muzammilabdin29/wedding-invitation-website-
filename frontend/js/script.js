// ===========================================================
// Shivam & Supriya — Wedding Invitation
// Gate animation, ambient particles, countdown, music, Google Drive photos
// ===========================================================

/**
 * 📸 GOOGLE DRIVE PHOTO CONFIGURATION (BRIDE & GROOM)
 * ------------------------------------------------------------
 * Google Drive sharing is set to "Anyone with the link can view".
 */
const GOOGLE_DRIVE_CONFIG = {
  // Groom photo (Shivam):
  groomPhoto: "https://drive.google.com/file/d/1cgaH5BBnx6I98h-J5bTNfiSVLiLifu_1/view?usp=drive_link",

  // Bride photo (Supriya):
  bridePhoto: "https://drive.google.com/file/d/1nosa-0wOCW30BimKaY8MtuYaP9ccazid/view?usp=drive_link",
};

document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initEnvelope();
  initScratchCard();
  initCountdown();
  initSaveTheDate();
  initBlessingsInteractions();
  initGoogleDrivePhotos();
  initMusic();
});

/* ---------------- Ambient gold particles ---------------- */
function initParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  const count = window.innerWidth < 640 ? 12 : 24;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${8 + Math.random() * 10}s`;
    p.style.animationDelay = `${Math.random() * 10}s`;
    p.style.width = p.style.height = `${3 + Math.random() * 4}px`;
    container.appendChild(p);
  }
}

/* ---------------- 3D Envelope Opening Animation ---------------- */
function initEnvelope() {
  const gate = document.getElementById("gate");
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const envelope = document.getElementById("envelope");
  const waxSeal = document.getElementById("waxSeal");
  const openBtn = document.getElementById("openInvite");
  const invite = document.getElementById("invite");
  const bgMusic = document.getElementById("bgMusic");
  const musicIconOn = document.getElementById("musicIconOn");
  const musicIconOff = document.getElementById("musicIconOff");

  if (!envelope || !invite) return;

  let isOpening = false;

  function openEnvelope(e) {
    if (isOpening) return;
    isOpening = true;

    // Start background music seamlessly from 22 seconds
    if (bgMusic && bgMusic.paused) {
      if (bgMusic.currentTime < 22) {
        try { bgMusic.currentTime = 22; } catch (err) {}
      }
      bgMusic.play().then(() => {
        if (musicIconOn && musicIconOff) {
          musicIconOn.style.display = "block";
          musicIconOff.style.display = "none";
        }
      }).catch((err) => console.log("Audio autoplay prevented:", err));
    }

    // Determine seal position for sparkle explosion
    let sealX = window.innerWidth / 2;
    let sealY = window.innerHeight / 2;
    if (waxSeal) {
      const rect = waxSeal.getBoundingClientRect();
      sealX = rect.left + rect.width / 2;
      sealY = rect.top + rect.height / 2;
    }
    createSparkleBurst(sealX, sealY);

    // Step 1: Unfold top flap & reveal seal break
    envelope.classList.add("is-open");

    // Step 2: After card slides fully up out of envelope, zoom in and transition to main page
    setTimeout(() => {
      if (envelopeWrapper) {
        envelopeWrapper.classList.add("envelope-wrapper--zoom");
      }
      invite.hidden = false;
      setTimeout(() => {
        if (window.refreshScratchCard) {
          window.refreshScratchCard();
        }
      }, 100);
    }, 1350);

    // Step 3: Fade out gate overlay and enable scrolling
    setTimeout(() => {
      if (gate) {
        gate.classList.add("gate--closed");
      }
      document.body.style.overflow = "auto";

      // Move focus into the invitation for accessibility
      invite.setAttribute("tabindex", "-1");
      invite.focus({ preventScroll: true });
    }, 1950);

    // Step 4: Clean up gate element
    setTimeout(() => {
      if (gate) {
        gate.style.display = "none";
      }
    }, 2650);
  }

  // Click & Keyboard event listeners for seal, button, and envelope
  if (waxSeal) {
    waxSeal.addEventListener("click", (e) => {
      e.stopPropagation();
      openEnvelope(e);
    });
    waxSeal.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openEnvelope(e);
      }
    });
  }

  if (openBtn) {
    openBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openEnvelope(e);
    });
  }

  envelope.addEventListener("click", openEnvelope);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openEnvelope(e);
    }
  });
}

/* ---------------- Sparkle explosion on wax seal break ---------------- */
function createSparkleBurst(x, y) {
  const count = 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "sparkle-particle";

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const distance = 40 + Math.random() * 90;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const size = 3 + Math.random() * 6;
    const colors = ["#ffe89c", "#d4a742", "#ffffff", "#e6cd8a", "#c9a24b"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.backgroundColor = color;
    p.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    p.style.setProperty("--tx", `${tx}px`);
    p.style.setProperty("--ty", `${ty}px`);
    p.style.animationDuration = `${0.6 + Math.random() * 0.4}s`;

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1000);
  }
}

/* ---------------- Countdown to the wedding ---------------- */
function initCountdown() {
  const target = new Date("2026-11-24T17:00:00+05:30").getTime();
  const els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs"),
  };
  if (!els.days) return;

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      els.days.textContent = "00";
      els.hours.textContent = "00";
      els.mins.textContent = "00";
      els.secs.textContent = "00";
      return;
    }
    const pad = (n) => String(n).padStart(2, "0");
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    els.days.textContent = pad(days);
    els.hours.textContent = pad(hours);
    els.mins.textContent = pad(mins);
    els.secs.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
}



/* ---------------- Background Music (Ranjha from Shershaah) ---------------- */
function initMusic() {
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicIconOn = document.getElementById("musicIconOn");
  const musicIconOff = document.getElementById("musicIconOff");
  const openBtn = document.getElementById("openInvite");

  if (!bgMusic || !musicToggle) return;

  const START_TIME = 22; // Start from 22 seconds

  function setInitialSeek() {
    if (bgMusic.currentTime < START_TIME) {
      try {
        bgMusic.currentTime = START_TIME;
      } catch (err) {}
    }
  }

  // Seek to 22s as soon as audio data is ready
  bgMusic.addEventListener("loadedmetadata", setInitialSeek);
  bgMusic.addEventListener("canplay", setInitialSeek);
  setInitialSeek();

  function updateUiPlaying(isPlaying) {
    if (isPlaying) {
      if (musicIconOn) musicIconOn.style.display = "block";
      if (musicIconOff) musicIconOff.style.display = "none";
      musicToggle.classList.add("is-playing");
      musicToggle.setAttribute("title", "Pause Music (Ranjha - Shershaah)");
      musicToggle.setAttribute("aria-label", "Pause Ranjha Background Music");
    } else {
      if (musicIconOn) musicIconOn.style.display = "none";
      if (musicIconOff) musicIconOff.style.display = "block";
      musicToggle.classList.remove("is-playing");
      musicToggle.setAttribute("title", "Play Music (Ranjha - Shershaah)");
      musicToggle.setAttribute("aria-label", "Play Ranjha Background Music");
    }
  }

  function startMusic() {
    setInitialSeek();
    return bgMusic.play().catch(e => {
      console.log("Audio autoplay waiting for user interaction:", e);
    });
  }

  function toggleMusic() {
    if (bgMusic.paused) {
      startMusic();
    } else {
      bgMusic.pause();
    }
  }

  musicToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMusic();
  });

  // Sync state on native audio events
  bgMusic.addEventListener("play", () => updateUiPlaying(true));
  bgMusic.addEventListener("pause", () => updateUiPlaying(false));
  bgMusic.addEventListener("ended", () => {
    // Loop back to 22s for continuous melodic chorus
    bgMusic.currentTime = START_TIME;
    bgMusic.play().catch(() => {});
  });

  // Default is music ON: attempt immediate autoplay
  startMusic();

  // If browser blocks unmuted autoplay without gesture, start on first click/touch/keypress anywhere
  function triggerOnFirstInteraction() {
    if (bgMusic.paused) {
      startMusic();
    }
    document.removeEventListener("click", triggerOnFirstInteraction);
    document.removeEventListener("touchstart", triggerOnFirstInteraction);
    document.removeEventListener("keydown", triggerOnFirstInteraction);
  }

  document.addEventListener("click", triggerOnFirstInteraction, { passive: true });
  document.addEventListener("touchstart", triggerOnFirstInteraction, { passive: true });
  document.addEventListener("keydown", triggerOnFirstInteraction, { passive: true });

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      if (bgMusic.paused) {
        startMusic();
      }
    });
  }
}

/* ---------------- Interactive Scratch Card to Reveal Date & Countdown ---------------- */
function initScratchCard() {
  const card = document.getElementById("scratchCard");
  const canvas = document.getElementById("scratchCanvas");
  const hint = document.getElementById("scratchHint");
  const quickBtn = document.getElementById("btnQuickReveal");
  if (!canvas || !card) return;

  const ctx = canvas.getContext("2d");
  let isDrawing = false;
  let isRevealed = false;
  let lastPoint = null;

  function resizeCanvas() {
    if (isRevealed) return;
    const rect = card.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.scale(dpr, dpr);

    drawScratchLayer(rect.width, rect.height);
  }

  window.refreshScratchCard = resizeCanvas;

  function drawScratchLayer(w, h) {
    if (w === 0 || h === 0) return;

    ctx.globalCompositeOperation = "source-over";

    // Shimmering Champagne Rose-Gold & Twilight gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#3e2444");
    grad.addColorStop(0.2, "#c99a6b");
    grad.addColorStop(0.45, "#fff2db");
    grad.addColorStop(0.7, "#d49a88");
    grad.addColorStop(1, "#28122d");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Diagonal champagne glitter lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
    ctx.lineWidth = 1.5;
    for (let i = -w; i < w + h; i += 22) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + h, h);
      ctx.stroke();
    }

    // Elegant inner border frame
    ctx.strokeStyle = "rgba(255, 245, 220, 0.85)";
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, w - 16, h - 16);

    ctx.strokeStyle = "rgba(230, 185, 140, 0.55)";
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, w - 24, h - 24);

    // Decorative Text & Monogram
    ctx.fillStyle = "#261026";
    ctx.font = "bold 17px 'Marcellus', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ SCRATCH TO REVEAL ✦", w / 2, h / 2 - 16);

    ctx.font = "italic 13px 'Cormorant Garamond', serif";
    ctx.fillStyle = "#381836";
    ctx.fillText("Scratch with finger / mouse for Wedding Date & Countdown", w / 2, h / 2 + 14);
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      clientX: e.clientX,
      clientY: e.clientY,
    };
  }

  function scratch(pos) {
    if (isRevealed) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2, false);
    ctx.fill();

    if (lastPoint) {
      ctx.lineWidth = 48;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    lastPoint = { x: pos.x, y: pos.y };

    if (Math.random() < 0.35) {
      createSparkleBurst(pos.clientX, pos.clientY);
    }

    checkScratchProgress();
  }

  function checkScratchProgress() {
    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      let transparentCount = 0;
      const step = 16;
      const totalSamples = data.length / (4 * step);

      for (let i = 3; i < data.length; i += 4 * step) {
        if (data[i] === 0) {
          transparentCount++;
        }
      }

      const percentage = (transparentCount / totalSamples) * 100;
      if (percentage >= 20) {
        revealAll();
      }
    } catch (err) {
      // Fallback
    }
  }

  function revealAll() {
    if (isRevealed) return;
    isRevealed = true;
    canvas.classList.add("is-revealed");
    if (hint) hint.style.display = "none";
    if (quickBtn) quickBtn.style.display = "none";

    const rect = card.getBoundingClientRect();
    createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    setTimeout(() => {
      createSparkleBurst(rect.left + rect.width / 3, rect.top + rect.height / 3);
      createSparkleBurst(rect.left + (rect.width * 2) / 3, rect.top + rect.height / 3);
    }, 180);
  }

  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    const pos = getPos(e);
    lastPoint = { x: pos.x, y: pos.y };
    scratch(pos);
  });
  window.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    scratch(getPos(e));
  });
  window.addEventListener("mouseup", () => {
    isDrawing = false;
    lastPoint = null;
  });

  canvas.addEventListener("touchstart", (e) => {
    isDrawing = true;
    const pos = getPos(e);
    lastPoint = { x: pos.x, y: pos.y };
    scratch(pos);
  }, { passive: true });
  canvas.addEventListener("touchmove", (e) => {
    if (!isDrawing) return;
    scratch(getPos(e));
  }, { passive: true });
  canvas.addEventListener("touchend", () => {
    isDrawing = false;
    lastPoint = null;
  });

  if (quickBtn) {
    quickBtn.addEventListener("click", revealAll);
  }

  setTimeout(resizeCanvas, 200);
  window.addEventListener("resize", resizeCanvas);
}

/* ---------------- Interactive Blessings Section & Flower Shower ---------------- */
function initBlessingsInteractions() {
  const cards = document.querySelectorAll(".blessings__card--interactive");
  if (!cards.length) return;

  cards.forEach((card) => {
    // 3D Parallax Tilt on Mouse Move
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / (rect.height / 2)) * 6;
      const rotateY = (x / (rect.width / 2)) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

    // Flower Shower Trigger on Click or Button Tap
    card.addEventListener("click", (e) => {
      const rect = card.getBoundingClientRect();
      const clickX = e.clientX || rect.left + rect.width / 2;
      const clickY = e.clientY || rect.top + rect.height / 2;
      createFlowerShower(clickX, clickY);
      createSparkleBurst(clickX, clickY);
    });

    // Keyboard support
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const rect = card.getBoundingClientRect();
        createFlowerShower(rect.left + rect.width / 2, rect.top + rect.height / 2);
        createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    });
  });
}

function createFlowerShower(originX, originY) {
  const petalCount = 26;
  const colors = [
    "radial-gradient(circle, #ff4d6d 30%, #c9184a 100%)",
    "radial-gradient(circle, #ff758f 30%, #ff4d6d 100%)",
    "radial-gradient(circle, #ffb703 30%, #fb8500 100%)",
    "radial-gradient(circle, #ffd166 30%, #f4a261 100%)",
    "radial-gradient(circle, #ffe3e0 30%, #ff85a1 100%)",
  ];

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("span");
    petal.className = "petal-particle";

    const startX = originX + (Math.random() - 0.5) * 120;
    const startY = originY + (Math.random() - 0.5) * 60;
    const size = 12 + Math.random() * 14;
    const dx = (Math.random() - 0.5) * 200;
    const endDx = dx + (Math.random() - 0.5) * 160;
    const midY = 80 + Math.random() * 120;
    const endY = 220 + Math.random() * 260;
    const duration = 1.4 + Math.random() * 1.2;

    petal.style.left = `${startX}px`;
    petal.style.top = `${startY}px`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.25}px`;
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];
    petal.style.setProperty("--dx", `${dx}px`);
    petal.style.setProperty("--endDx", `${endDx}px`);
    petal.style.setProperty("--midY", `${midY}px`);
    petal.style.setProperty("--endY", `${endY}px`);
    petal.style.animationDuration = `${duration}s`;
    petal.style.filter = "drop-shadow(0 4px 6px rgba(0,0,0,0.15))";

    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000 + 100);
  }
}

/* ---------------- Save The Date Calendar Dropdown ---------------- */
function initSaveTheDate() {
  const btn = document.getElementById("btnSaveDate");
  const dropdown = document.getElementById("calendarDropdown");
  const calGoogle = document.getElementById("calGoogle");
  const calOutlook = document.getElementById("calOutlook");
  const calYahoo = document.getElementById("calYahoo");
  const calApple = document.getElementById("calApple");
  const calIcs = document.getElementById("calIcs");

  if (!btn || !dropdown) return;

  const eventData = {
    title: "Wedding Ceremony of Shivam & Supriya",
    description: "We cordially invite you to celebrate the wedding ceremony of Shivam and Supriya in Patna, Bihar.",
    location: "Sainik Rest House Danapur Cantt, Patna, Bihar",
    startIso: "2026-11-24T18:00:00",
    endIso: "2026-11-24T23:59:00",
    startUtc: "20261124T123000Z",
    endUtc: "20261124T183000Z"
  };

  // Google Calendar URL
  if (calGoogle) {
    calGoogle.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${eventData.startUtc}/${eventData.endUtc}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}`;
  }

  // Outlook / Office 365 URL
  if (calOutlook) {
    calOutlook.href = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=${eventData.startIso}&enddt=${eventData.endIso}&subject=${encodeURIComponent(eventData.title)}&location=${encodeURIComponent(eventData.location)}&body=${encodeURIComponent(eventData.description)}`;
  }

  // Yahoo Calendar URL
  if (calYahoo) {
    calYahoo.href = `https://calendar.yahoo.com/?v=60&title=${encodeURIComponent(eventData.title)}&st=${eventData.startUtc}&et=${eventData.endUtc}&desc=${encodeURIComponent(eventData.description)}&in_loc=${encodeURIComponent(eventData.location)}`;
  }

  // Generate and Download .ics File for Apple / Generic Calendar
  function downloadIcs(e) {
    e.preventDefault();
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Shivam & Supriya Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:wedding-shivam-supriya-${Date.now()}@wedding.invitation`,
      "DTSTAMP:20261124T000000Z",
      `DTSTART:${eventData.startUtc}`,
      `DTEND:${eventData.endUtc}`,
      `SUMMARY:${eventData.title}`,
      `DESCRIPTION:${eventData.description}`,
      `LOCATION:${eventData.location}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wedding_shivam_supriya.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    closeDropdown();
  }

  if (calApple) calApple.addEventListener("click", downloadIcs);
  if (calIcs) calIcs.addEventListener("click", downloadIcs);

  // Toggle Dropdown
  function toggleDropdown(e) {
    e.stopPropagation();
    const isActive = dropdown.classList.toggle("is-active");
    btn.setAttribute("aria-expanded", String(isActive));
  }

  function closeDropdown() {
    dropdown.classList.remove("is-active");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", toggleDropdown);

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown();
  });
}

/* ---------------- Google Drive Photo Loader & Direct Link Resolver ---------------- */
function resolveDriveImageUrl(input) {
  if (!input || typeof input !== "string") return "";
  const trimmed = input.trim();

  // If it's a Google Drive link or ID
  if (trimmed.includes("drive.google.com") || trimmed.includes("docs.google.com")) {
    const fileIdMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
                        trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
                        trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
  } else if (!trimmed.includes("/") && trimmed.length >= 25) {
    // Treat as raw Google Drive File ID
    return `https://lh3.googleusercontent.com/d/${trimmed}`;
  }

  // Return standard local path or web URL as-is
  return trimmed;
}

function initGoogleDrivePhotos() {
  if (typeof GOOGLE_DRIVE_CONFIG === "undefined") return;

  const groomImg = document.getElementById("groomPhoto");
  const brideImg = document.getElementById("bridePhoto");

  // Load Groom Photo from Google Drive or local path
  if (groomImg && GOOGLE_DRIVE_CONFIG.groomPhoto) {
    const directGroomUrl = resolveDriveImageUrl(GOOGLE_DRIVE_CONFIG.groomPhoto);
    groomImg.src = directGroomUrl;

    if (directGroomUrl.includes("googleusercontent.com/d/")) {
      const fileId = directGroomUrl.split("/d/")[1];
      groomImg.onerror = () => {
        groomImg.onerror = () => {
          groomImg.onerror = null;
          groomImg.src = "assets/shivam.jpeg";
        };
        groomImg.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
      };
    }
  }

  // Load Bride Photo from Google Drive or local path
  if (brideImg && GOOGLE_DRIVE_CONFIG.bridePhoto) {
    const directBrideUrl = resolveDriveImageUrl(GOOGLE_DRIVE_CONFIG.bridePhoto);
    brideImg.src = directBrideUrl;

    if (directBrideUrl.includes("googleusercontent.com/d/")) {
      const fileId = directBrideUrl.split("/d/")[1];
      brideImg.onerror = () => {
        brideImg.onerror = () => {
          brideImg.onerror = null;
          brideImg.src = "assets/supriya.jpeg";
        };
        brideImg.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
      };
    }
  }
}




