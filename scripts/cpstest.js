const clickArea = document.getElementById("click-area");
const resultDisplay = document.getElementById("result-display");
const durationSelect = document.getElementById("duration");

const scoreModal = document.getElementById("score-modal");
const scoreText = document.getElementById("score-text");
const closeModal = document.getElementById("close-modal");

const timerValue = document.getElementById("timer-value");
const clicksValue = document.getElementById("clicks-value");
const scoreValue = document.getElementById("score-value");

let clicks = 0;
let totalTime = 5;
let timer;
let gameActive = false;

// Suara click
const clickSound = new Audio("sounds/click.mp3");
clickSound.volume = 0.5;

// Klik area → start atau hitung klik
clickArea.addEventListener("click", (event) => {
  if (!gameActive) {
    startGame();
  } else {
    registerClick(event);
  }
});

// Tutup modal
closeModal.addEventListener("click", () => { 
  scoreModal.style.display = "none"; 
});
window.addEventListener("click", (e) => { 
  if(e.target === scoreModal) scoreModal.style.display = "none"; 
});

// --- Fungsi startGame ---
function startGame() {
  clicks = 0;
  totalTime = parseInt(durationSelect.value); // total time dalam detik
  gameActive = true;

  resultDisplay.textContent = "";
  clickArea.textContent = "Click fast!";
  clickArea.classList.add("active");

  clearInterval(timer);

  const interval = 10; // 10ms = 0.01s presisi
  const startTime = Date.now();

  timer = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000; // waktu berjalan
    const timeLeft = Math.max(0, (totalTime - elapsed)).toFixed(2);

    timerValue.textContent = timeLeft; // update timer box

    // Click per second
    const cps = (clicks / elapsed || 0).toFixed(2);
    clicksValue.textContent = cps;

    scoreValue.textContent = clicks;

    if (elapsed >= totalTime) {
      clearInterval(timer);
      endGame();
    }
  }, interval);
}

// --- Fungsi registerClick ---
function registerClick(e) {
  if (!gameActive) return;
  clicks++;

  // Animasi burst
  const burst = document.createElement("div");
  burst.className = "click-burst";
  burst.style.left = `${e.clientX - 10}px`;
  burst.style.top = `${e.clientY - 10}px`;
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 500);

  // Suara click
  const sound = clickSound.cloneNode();
  sound.play().catch(() => {});
}

// --- Fungsi endGame ---
function endGame() {
  clearInterval(timer);
  gameActive = false;
  clickArea.textContent = "Click here to start!";
  clickArea.classList.remove("active");

  const cps = (clicks / totalTime).toFixed(2);
  resultDisplay.innerHTML = `You clicked <strong>${clicks}</strong> times in ${totalTime}s.<br/>CPS: <strong>${cps}</strong>`;

  // Tampilkan popup
  scoreText.innerHTML = `You clicked <strong>${clicks}</strong> times in ${totalTime}s.<br>Your CPS: <strong>${cps}</strong>`;
  scoreModal.style.display = "flex";
}
