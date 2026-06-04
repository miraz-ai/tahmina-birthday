const stageIds = [
  "opening",
  "photo",
  "envelope",
  "letter1",
  "letter2",
  "wishes",
  "final",
];
let current = "opening";
let envelopeOpened = false;
let letter1Played = false;
let letter2Played = false;
let musicPlaying = false;

const dots = document.getElementById("dots");
const toast = document.getElementById("toast");
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("music");

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1700);
}

function setupDots() {
  dots.innerHTML = "";
  stageIds.forEach((id) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.dataset.stage = id;
    dots.appendChild(dot);
  });
  updateDots("opening");
}

function updateDots(id) {
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.classList.toggle("active", dot.dataset.stage === id);
  });
  dots.classList.toggle("show", id !== "opening");
}

function goTo(id) {
  if (!stageIds.includes(id) || id === current) return;

  const oldStage = document.getElementById(current);
  const newStage = document.getElementById(id);

  oldStage.classList.remove("visible");

  setTimeout(() => {
    oldStage.classList.remove("active");
    newStage.classList.add("active");

    requestAnimationFrame(() => {
      newStage.classList.add("visible");
      current = id;
      updateDots(id);
      runStage(id);
    });
  }, 450);
}

function runStage(id) {
  if (id !== "opening") musicBtn.classList.add("show");

  if (id === "photo") {
    setTimeout(() => releasePetals(), 450);
  }

  if (id === "letter1" && !letter1Played) {
    revealLines("letterText1", "letter1Actions");
    letter1Played = true;
  }

  if (id === "letter2" && !letter2Played) {
    revealLines("letterText2", "letter2Actions", "signature");
    letter2Played = true;
  }

  if (id === "wishes") {
    document.querySelectorAll(".wish-card").forEach((card, index) => {
      setTimeout(() => card.classList.add("show"), 520 + index * 260);
    });
  }

  if (id === "final") {
    setTimeout(() => burstConfetti(90), 500);
  }
}

function revealLines(textId, actionsId, signatureId) {
  const lines = document.querySelectorAll(`#${textId} .line`);
  const actions = document.getElementById(actionsId);
  actions.classList.remove("show");

  lines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add("show");

      if (index === lines.length - 1) {
        setTimeout(() => {
          if (signatureId) {
            document.getElementById(signatureId).classList.add("show");
            setTimeout(() => actions.classList.add("show"), 800);
          } else {
            actions.classList.add("show");
          }
        }, 900);
      }
    }, index * 1450);
  });
}

function createParticles() {
  const layer = document.getElementById("particles");
  const symbols = ["✦", "✧", "🌸", "•", "✨"];
  const colors = ["#f6bac8", "#d9cdfb", "#fff8ef", "#d6a75d", "#de7187"];

  layer.innerHTML = "";

  const count = window.innerWidth < 450 ? 28 : 42;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("span");
    item.className = "particle";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.setProperty("--left", Math.random() * 100 + "%");
    item.style.setProperty("--size", Math.random() * 12 + 8 + "px");
    item.style.setProperty("--duration", Math.random() * 10 + 11 + "s");
    item.style.setProperty("--delay", Math.random() * 10 + "s");
    item.style.setProperty("--drift", (Math.random() - 0.5) * 120 + "px");
    item.style.setProperty(
      "--color",
      colors[Math.floor(Math.random() * colors.length)],
    );
    layer.appendChild(item);
  }
}

function releaseMini(x, y) {
  const icons = ["💗", "🌸", "✨", "🤍"];

  for (let i = 0; i < 9; i++) {
    const item = document.createElement("span");
    item.className = "mini";
    item.textContent = icons[Math.floor(Math.random() * icons.length)];
    item.style.left = x + (Math.random() - 0.5) * 90 + "px";
    item.style.top = y + (Math.random() - 0.5) * 35 + "px";
    item.style.animationDelay = Math.random() * 160 + "ms";
    document.body.appendChild(item);
    setTimeout(() => item.remove(), 1400);
  }
}

function releasePetals() {
  const box = document.getElementById("photoBox");
  const icons = ["🌸", "✦", "✧", "❀"];
  const rect = box.getBoundingClientRect();

  for (let i = 0; i < 18; i++) {
    const petal = document.createElement("span");
    petal.className = "mini";
    petal.textContent = icons[Math.floor(Math.random() * icons.length)];
    petal.style.left = rect.left + Math.random() * rect.width + "px";
    petal.style.top = rect.top - 10 + "px";
    petal.style.animationDelay = Math.random() * 350 + "ms";
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 1500);
  }
}

function burstConfetti(amount) {
  const layer = document.getElementById("confettiLayer");
  const colors = [
    "#f6bac8",
    "#d9cdfb",
    "#fff8ef",
    "#d6a75d",
    "#de7187",
    "#c68a7a",
  ];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 350 + "ms";
    piece.style.animationDuration = Math.random() * 1100 + 1900 + "ms";
    piece.style.setProperty("--x", (Math.random() - 0.5) * 180 + "px");
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 3600);
  }
}

function resetAll() {
  envelopeOpened = false;
  letter1Played = false;
  letter2Played = false;

  document.getElementById("envelopeBox").classList.remove("open");
  document.getElementById("readLetterBtn").style.display = "none";

  document
    .querySelectorAll(".line")
    .forEach((line) => line.classList.remove("show"));
  document
    .querySelectorAll(".paper-actions")
    .forEach((action) => action.classList.remove("show"));
  document.getElementById("signature").classList.remove("show");
  document
    .querySelectorAll(".wish-card")
    .forEach((card) => card.classList.remove("show"));
  document.getElementById("secret").classList.remove("show");
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => goTo(button.dataset.next));
});

document.getElementById("envelopeWrap").addEventListener("click", () => {
  if (envelopeOpened) return;

  envelopeOpened = true;
  document.getElementById("envelopeBox").classList.add("open");
  releaseMini(window.innerWidth / 2, window.innerHeight * 0.46);

  setTimeout(() => {
    document.getElementById("readLetterBtn").style.display = "flex";
  }, 1400);
});

document.getElementById("photoBox").addEventListener("click", () => {
  const rect = document.getElementById("photoBox").getBoundingClientRect();
  releaseMini(rect.left + rect.width / 2, rect.top + rect.height / 2);
  showToast("A beautiful smile saved 🌸");
});

document.querySelectorAll(".wish-card").forEach((card) => {
  card.addEventListener("click", () => {
    releaseMini(window.innerWidth / 2, window.innerHeight * 0.62);
    showToast(card.dataset.wish || "A wish for Tahmina 🌸");
  });
});

document.getElementById("heart").addEventListener("click", () => {
  document.getElementById("secret").classList.toggle("show");
  releaseMini(window.innerWidth / 2, window.innerHeight * 0.52);
});

document.getElementById("replay").addEventListener("click", () => {
  resetAll();
  goTo("opening");
  musicBtn.classList.remove("show");
});

musicBtn.addEventListener("click", async () => {
  try {
    if (!musicPlaying) {
      if (music.currentTime < 15) {
        music.currentTime = 15; 
      }

      await music.play();

      musicPlaying = true;
      musicBtn.textContent = "🔊";
      showToast("Music playing softly");
    } else {
      music.pause();
      musicPlaying = false;
      musicBtn.textContent = "🎵";
      showToast("Music paused");
    }
  } catch {
    showToast("Add music.mp3 first 🎵");
  }
});

document.getElementById("mainPhoto").addEventListener("error", () => {
  document.getElementById("mainPhoto").style.display = "none";
  document.getElementById("photoFallback").style.display = "grid";
});

window.addEventListener("resize", createParticles);

createParticles();
setupDots();
