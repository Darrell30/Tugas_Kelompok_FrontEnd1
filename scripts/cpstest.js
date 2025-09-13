// --- DOM ELEMENT REFERENCES ---
const clickArea = document.getElementById("click-area");
const resultDisplay = document.getElementById("result-display");
const durationSelect = document.getElementById("duration");

const scoreModal = document.getElementById("score-modal");
const scoreText = document.getElementById("score-text");
const closeModal = document.getElementById("close-modal");

const timerValue = document.getElementById("timer-value");
const clicksValue = document.getElementById("clicks-value");
const scoreValue = document.getElementById("score-value");

// --- GAME STATE VARIABLES ---
let clicks = 0;
let totalTime = 5;
let timer;
let gameActive = false;

// --- EVENT LISTENERS ---

// Main click area listener: Starts the game or registers a click.
clickArea.addEventListener("click", (event) => {
  // Only start a new game if the current one is inactive AND the score modal is hidden.
  if (!gameActive && scoreModal.style.display !== "flex") {
    startGame();
  } else {
    registerClick(event);
  }
});

// Close the modal when the 'X' button is clicked.
closeModal.addEventListener("click", () => {
  scoreModal.style.display = "none";
});

/*
// THIS BLOCK HAS BEEN REMOVED TO PREVENT THE MODAL FROM CLOSING ACCIDENTALLY
window.addEventListener("click", (e) => {
  if (e.target === scoreModal) {
    scoreModal.style.display = "none";
  }
});
*/


// --- GAME FUNCTIONS ---

/**
 * Sets up and starts a new game session.
 */
function startGame() {
  clicks = 0;
  totalTime = parseInt(durationSelect.value);
  gameActive = true;

  resultDisplay.textContent = "";
  clickArea.textContent = "Click as fast as you can!";
  clickArea.classList.add("active");

  clearInterval(timer); // Clear any previous timers.

  const interval = 10; // Update every 10ms for a smooth timer.
  const startTime = Date.now();

  timer = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    const timeLeft = Math.max(0, totalTime - elapsed).toFixed(2);

    // Update the display boxes
    timerValue.textContent = timeLeft;
    const cps = (clicks / elapsed || 0).toFixed(2);
    clicksValue.textContent = cps;
    scoreValue.textContent = clicks;

    // Check if the time is up.
    if (elapsed >= totalTime) {
      clearInterval(timer);
      endGame();
    }
  }, interval);
}

/**
 * Registers a click, increments the score, and creates a visual burst effect.
 * @param {MouseEvent} e - The click event.
 */
function registerClick(e) {
  if (!gameActive) return;
  clicks++;

  // Create and animate a burst effect for visual feedback.
  const burst = document.createElement("div");
  burst.className = "click-burst";
  burst.style.left = `${e.clientX - 10}px`; // Center burst on cursor
  burst.style.top = `${e.clientY - 10}px`;
  document.body.appendChild(burst);

  // Remove the burst element after its animation completes.
  setTimeout(() => burst.remove(), 500);
}

/**
 * Ends the game, calculates the final score, and displays the results modal.
 */
function endGame() {
  gameActive = false;
  clickArea.textContent = "Click here to start!";
  clickArea.classList.remove("active");

  const finalCPS = (clicks / totalTime).toFixed(2);
  resultDisplay.innerHTML = `You clicked <strong>${clicks}</strong> times in ${totalTime}s.<br/>CPS: <strong>${finalCPS}</strong>`;

  // Prepare and display the final score in the modal.
  scoreText.innerHTML = `You clicked <strong>${clicks}</strong> times in ${totalTime}s.<br>Your CPS: <strong>${finalCPS}</strong>`;
  scoreModal.style.display = "flex";
}