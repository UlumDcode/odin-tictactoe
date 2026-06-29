const gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Baris
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Kolom
  [0, 4, 8],
  [2, 4, 6], // Diagonal
];

// Buat 9 kotak
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  cell.addEventListener("click", () => {
    handleCellClick(i, cell);
  });

  boardElement.appendChild(cell);
}

function handleCellClick(idx, cell) {
  if (!gameActive || gameBoard[idx] !== "") return;

  gameBoard[idx] = currentPlayer;
  cell.innerText = currentPlayer;

  console.log(gameBoard);

  if (cekPemenang()) {
    updateStatus("Pemain " + currentPlayer + " menang!");
    gameActive = false;
    const scoreId = currentPlayer === "X" ? scoreX : scoreO;
    scoreId.innerText = parseInt(scoreId.innerText) + 1;
    return;
  }

  if (cekSeri()) {
    updateStatus("Permainan seri!");
    gameActive = false;
    scoreDraw.innerText = parseInt(scoreDraw.innerText) + 1;
    return;
  }

  gantiGiliran();
}

function gantiGiliran() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus("Giliran pemain: " + currentPlayer);
}

function cekPemenang() {
  for (const condition of winningConditions) {
    const a = condition[0];
    const b = condition[1];
    const c = condition[2];

    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    ) {
      return true;
    }
  }
  return false;
}

function cekSeri() {
  return !gameBoard.includes("");
}

function updateStatus(message) {
  statusElement.innerText = message;
}

function resetGame() {
  gameBoard.fill("");
  currentPlayer = "X";
  gameActive = true;

  document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
  updateStatus("Giliran pemain: X");
}
