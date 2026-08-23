// ===========================================================
// Aarav & Diya — Wedding Invitation
// Gate animation, ambient particles, countdown, RSVP -> FastAPI
// ===========================================================

// The frontend talks to the backend via a relative "/api" path.
// In docker-compose, nginx proxies "/api/*" to the FastAPI service.
// For local (non-docker) dev, override by setting window.API_BASE
// before this script loads, e.g. window.API_BASE = "http://localhost:8000"
const API_BASE = window.API_BASE || "";

document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initEnvelope();
  initScratchCard();
  initCountdown();
  initBlessingsInteractions();
  initRSVP();
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

    // Start background music seamlessly
    if (bgMusic && bgMusic.paused) {
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

/* ---------------- RSVP form -> FastAPI backend ---------------- */
function initRSVP() {
  const form = document.getElementById("rsvpForm");
  const errorEl = document.getElementById("rsvpError");
  const thankYou = document.getElementById("rsvpThankYou");
  const submitBtn = document.getElementById("rsvpSubmit");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.hidden = true;

    const fullName = form.full_name.value.trim();
    const guests = parseInt(form.guests.value, 10);
    const attending = form.attending.value === "true";
    const message = form.message.value.trim();

    if (!fullName) {
      showError("Please enter your full name.");
      return;
    }

    const payload = {
      full_name: fullName,
      guests,
      attending,
      message: message || null,
    };

    submitBtn.disabled = true;
    submitBtn.querySelector("span").textContent = "Sending...";

    try {
      const res = await fetch(`${API_BASE}/api/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Something went wrong. Please try again.");
      }

      form.hidden = true;
      thankYou.hidden = false;
      thankYou.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      showError(err.message || "Could not send your RSVP. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector("span").textContent = "Send Confirmation";
    }
  });

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }
}

/* ---------------- Background Music ---------------- */
function initMusic() {
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicIconOn = document.getElementById("musicIconOn");
  const musicIconOff = document.getElementById("musicIconOff");
  const openBtn = document.getElementById("openInvite");

  if (!bgMusic || !musicToggle) return;

  function toggleMusic() {
    if (bgMusic.paused) {
      bgMusic.play();
      musicIconOn.style.display = "block";
      musicIconOff.style.display = "none";
    } else {
      bgMusic.pause();
      musicIconOn.style.display = "none";
      musicIconOff.style.display = "block";
    }
  }

  musicToggle.addEventListener("click", toggleMusic);

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      // Play audio on first user interaction
      bgMusic.play().then(() => {
        musicIconOn.style.display = "block";
        musicIconOff.style.display = "none";
      }).catch(e => console.log("Audio play prevented:", e));
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

    // Rich metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#7a4e0a");
    grad.addColorStop(0.2, "#d4a742");
    grad.addColorStop(0.45, "#fff6cc");
    grad.addColorStop(0.7, "#c9a24b");
    grad.addColorStop(1, "#5c3905");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Diagonal gold foil glitter lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
    ctx.lineWidth = 1.5;
    for (let i = -w; i < w + h; i += 22) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + h, h);
      ctx.stroke();
    }

    // Elegant inner border frame
    ctx.strokeStyle = "rgba(255, 245, 205, 0.75)";
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, w - 16, h - 16);

    ctx.strokeStyle = "rgba(201, 162, 75, 0.5)";
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, w - 24, h - 24);

    // Decorative Text & Monogram
    ctx.fillStyle = "#361603";
    ctx.font = "bold 17px 'Marcellus', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ SCRATCH TO REVEAL ✦", w / 2, h / 2 - 16);

    ctx.font = "italic 13px 'Cormorant Garamond', serif";
    ctx.fillStyle = "#472105";
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
      if (percentage >= 35) {
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


