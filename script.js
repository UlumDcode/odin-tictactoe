const board = document.getElementById("board");
const gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

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

  board.appendChild(cell);
}

function handleCellClick(idx, cell) {
  if (gameActive === false) {
    return;
  }

  if (gameBoard[idx] !== "") {
    return;
  }

  gameBoard[idx] = currentPlayer;
  cell.innerText = currentPlayer;

  // LINGKUNGAN SELANJUTNYA (Kerjakan bertahap setelah ini):
  // - Cek Menang: jika cekPemenang() -> gameActive = false
  // - Cek Seri: jika cekSeri() -> gameActive = false
  // - Jika belum ada yang menang/seri -> ganti giliran pemain

  console.log(gameBoard);
}
