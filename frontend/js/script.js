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
  initGate();
  initCountdown();
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

/* ---------------- Opening gate ---------------- */
function initGate() {
  const gate = document.getElementById("gate");
  const invite = document.getElementById("invite");
  const openBtn = document.getElementById("openInvite");
  if (!gate || !invite || !openBtn) return;

  openBtn.addEventListener("click", () => {
    gate.classList.add("gate--closed");
    invite.hidden = false;
    document.body.style.overflow = "auto";

    // Move focus into the invitation for accessibility
    invite.setAttribute("tabindex", "-1");
    invite.focus({ preventScroll: true });

    setTimeout(() => {
      gate.style.display = "none";
    }, 950);
  });
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
