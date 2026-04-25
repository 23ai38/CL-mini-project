const choices = ["rock", "paper", "scissors"];
const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

let playerScore = 0;
let computerScore = 0;

const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const playerPickEl = document.getElementById("player-pick");
const computerPickEl = document.getElementById("computer-pick");
const resultMessageEl = document.getElementById("result-message");
const choiceButtons = document.querySelectorAll(".choice");
const resetButton = document.getElementById("reset-button");

function randomChoice() {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  const index = randomBuffer[0] % choices.length;
  return choices[index];
}

function formatChoice(choice) {
  return choice.charAt(0).toUpperCase() + choice.slice(1);
}

function setActiveButton(selectedChoice) {
  choiceButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.choice === selectedChoice);
  });
}

function updateScore() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function showResult(message, isWin = false) {
  resultMessageEl.textContent = message;
  resultMessageEl.classList.toggle("status-win", isWin);
}

function playRound(playerChoice) {
  const computerChoice = randomChoice();

  playerPickEl.textContent = formatChoice(playerChoice);
  computerPickEl.textContent = formatChoice(computerChoice);
  setActiveButton(playerChoice);

  if (playerChoice === computerChoice) {
    showResult("It's a draw. Try another round.");
    return;
  }

  if (beats[playerChoice] === computerChoice) {
    playerScore += 1;
    updateScore();
    showResult(`${formatChoice(playerChoice)} beats ${formatChoice(computerChoice)}. You win this round!`, true);
    return;
  }

  computerScore += 1;
  updateScore();
  showResult(`${formatChoice(computerChoice)} beats ${formatChoice(playerChoice)}. Computer wins this round.`);
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  updateScore();
  playerPickEl.textContent = "-";
  computerPickEl.textContent = "-";
  resultMessageEl.classList.remove("status-win");
  resultMessageEl.textContent = "Make your move to start the match.";
  choiceButtons.forEach((button) => button.classList.remove("is-active"));
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.dataset.choice);
  });
});

resetButton.addEventListener("click", resetGame);
