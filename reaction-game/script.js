const box = document.getElementById("parent");
const message = document.getElementById("message");

let startTime;
let timeout;
let gameStarted = false;

// Start
function startGame() {
  message.textContent = "Wait for green...";
  box.style.backgroundColor = "red";
  gameStarted = false;

  // Random delay
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
    gameStarted = false;
  } else {
    message.textContent = "Wait for green!";
  }

  // Reset after a click
  setTimeout(startGame, 1500);
});

// game start
startGame();
