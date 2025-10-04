
let targetNumber;
let userGuesses = [];
let attempts = 0;
let gameOver = false;


const guessInput = document.getElementById("guessInput");
const submitButton = document.getElementById("submitButton");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attemptsDisplay");
const previousGuesses = document.getElementById("previousGuesses");
const resetButton = document.getElementById("resetButton");


function generateNumber() {
  return Math.floor(Math.random() * 100) + 1;
}


function startGame() {
  targetNumber = generateNumber();
  userGuesses = [];
  attempts = 0;
  gameOver = false;

  guessInput.disabled = false;
  submitButton.disabled = false;
  resetButton.style.display = "none";
  guessInput.value = "";
  feedback.textContent = "";
  updateUI();


  const storedAttempts = localStorage.getItem("guessingAttempts");
  if (storedAttempts) {
    attempts = parseInt(storedAttempts);
    attemptsDisplay.textContent = `Attempts: ${attempts}`;
  }
}

function updateUI() {
  attemptsDisplay.textContent = `Attempts: ${attempts}`;
  previousGuesses.textContent = userGuesses.length
    `Previous Guesses: ${userGuesses.join(", ")}`
     "Previous Guesses: None";
}

function validateInput(input) {
  const guess = parseInt(input);
  if (isNaN(guess)) {
    feedback.textContent = "Please enter a valid number.";
    return false;
  }
  if (guess < 1 || guess > 100) {
    feedback.textContent = "Number must be between 1 and 100.";
    return false;
  }
  return true;
}


function handleGuess() {
  if (gameOver) return;

  const userGuess = guessInput.value.trim();

  if (!validateInput(userGuess)) return;

  const guess = parseInt(userGuess);
  userGuesses.push(guess);
  attempts++;
  localStorage.setItem("guessingAttempts", attempts); // store persistently

  if (guess === targetNumber) {
    feedback.textContent = `Congratulations! ${guess} is correct!`;
    endGame();
  } else if (guess < targetNumber) {
    feedback.textContent = `${guess} is too low. Try again.`;
  } else {
    feedback.textContent = `${guess} is too high. Try again.`;
  }

  updateUI();
  guessInput.value = "";
}

function endGame() {
  gameOver = true;
  guessInput.disabled = true;
  submitButton.disabled = true;
  resetButton.style.display = "inline-block";
}


resetButton.addEventListener("click", () => {
  localStorage.removeItem("guessingAttempts");
  startGame();
});

submitButton.addEventListener("click", handleGuess);


guessInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleGuess();
  }
});

startGame();
