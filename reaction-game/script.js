const box = document.getElementById("parent");
const message = document.getElementById("message");
const bestTimeDisplay = document.getElementById("best-time");

let startTime;
let timeout;
let gameStarted = false;

// Load best time from localStorage
let bestTime = localStorage.getItem("bestReactionTime");
if (bestTime) {
  bestTimeDisplay.textContent = `Best Time: ${bestTime} ms`;
} else {
  bestTimeDisplay.textContent = "Best Time: -- ms";
}

// Start the game
function startGame() {
  message.textContent = "Wait for green...";
  box.style.backgroundColor = "red";
  gameStarted = false;

  // Random delay between 1s and 4s
  const delay = Math.floor(Math.random() * 3000) + 1000;

  timeout = setTimeout(() => {
    box.style.backgroundColor = "green";
    startTime = Date.now();
    gameStarted = true;
    message.textContent = "CLICK NOW!";
  }, delay);
}

// Box click logic
box.addEventListener("click", () => {
  const color = getComputedStyle(box).backgroundColor;

  if (!gameStarted) {
    clearTimeout(timeout);
    message.textContent = "Too soon! Wait for green.";
  } else if (color === "rgb(0, 128, 0)") {
    const reactionTime = Date.now() - startTime;
    message.textContent = `🎉 Your reaction time is ${reactionTime} ms. Click to try again!`;

    // Check and update best time
    if (!bestTime || reactionTime < bestTime) {
      bestTime = reactionTime;
      localStorage.setItem("bestReactionTime", bestTime);
      bestTimeDisplay.textContent = `🔥 New Record! Best Time: ${bestTime} ms`;
    }

    gameStarted = false;
  } else {
    message.textContent = "Wait for green!";
  }

  // Reset the game after a click
  setTimeout(startGame, 1500);
});

// Initial game start
startGame();
