# Penjelasan Kode Tic Tac Toe

## index.html (Struktur Halaman)

- **`<header>`** — Logo Odin + judul game.
- **`<main>`** — Berisi 3 komponen:
  - **`.score-container`** — Skor Player X, Draw, Player O (masing-masing punya `id` untuk di-update JS).
  - **`#status`** — Teks giliran pemain (`GILIRAN PEMAIN: X`).
  - **`#board`** — Grid 3×3 tempat kotak-kotak game dibuat oleh JS.
  - **`#resetBtn`** — Tombol mulai ulang, panggil `resetGame()` via `onclick`.
- **`<footer>`** — Copyright.
- **`<script src="script.js">`** — Semua logika game.

---

## style.css (Tampilan)

- **`*`** — Reset CSS global, font `MedievalSharp`.
- **`header`** — Latar `#2f4f4f`, teks `#f5f5dc`, flex row.
- **`main`** — Flex column, konten ditengah.
- **`.score-container`** — 3 kotak skor dengan pembatas vertikal, shadow, max-width 400px.
- **`.status-turn`** — Teks giliran, uppercase, warna abu.
- **`.board`** — Grid 3 kolom @ 125px, gap 5px, latar `#f5f5dc`.
- **`.cell`** — Kotak 125×125px, font 3rem untuk X/O.
- **`.reset-btn`** — Tombol warna senada header, hover sedikit lebih terang.

---

## script.js (Logika Game)

### State (baris 1-8)

```js
const gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");
```

- `gameBoard` array 9 elemen (`""` = kosong, `"X"` atau `"O"` = terisi).
- `currentPlayer` giliran siapa sekarang.
- `gameActive` false kalau game sudah selesai (menang/seri).
- Sisanya referensi ke element DOM.

### Kondisi Menang (baris 10-19)

```js
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Baris
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolom
  [0, 4, 8], [2, 4, 6],             // Diagonal
];
```

8 kombinasi indeks yang bikin menang.

### Render Board (baris 21-31)

```js
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  cell.addEventListener("click", () => {
    handleCellClick(i, cell);
  });
  boardElement.appendChild(cell);
}
```

Loop 9× buat 9 `div.cell`, pasang event click, tempel ke `#board`.

### handleCellClick (baris 33-57)

```js
function handleCellClick(idx, cell) {
  if (!gameActive || gameBoard[idx] !== "") return;

  gameBoard[idx] = currentPlayer;
  cell.innerText = currentPlayer;

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
```

1. Abaikan klik kalau game tidak aktif atau kotak sudah terisi.
2. Simpan simbol pemain di array + tampilkan di layar.
3. **Cek menang** — kalau true: tampilkan pesan + nonaktifkan game + tambah skor + return.
4. **Cek seri** — kalau true: tampilkan pesan + nonaktifkan game + tambah skor draw + return.
5. Kalau belum menang/seri: **ganti giliran**.

### gantiGiliran (baris 59-62)

```js
function gantiGiliran() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus("Giliran pemain: " + currentPlayer);
}
```

Toggle X ↔ O, update teks status.

### cekPemenang (baris 64-79)

```js
function cekPemenang() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    ) return true;
  }
  return false;
}
```

Cocokkan `gameBoard` dengan setiap kombinasi `winningConditions`. Kalau ada 3 sama dan tidak kosong → menang.

### cekSeri (baris 81-83)

```js
function cekSeri() {
  return !gameBoard.includes("");
}
```

Kalau tidak ada cell kosong (`""`) dan tidak ada yang menang → seri (draw).

### updateStatus (baris 85-87)

```js
function updateStatus(message) {
  statusElement.innerText = message;
}
```

Ubah teks `#status` di HTML.

### resetGame (baris 89-96)

```js
function resetGame() {
  gameBoard.fill("");
  currentPlayer = "X";
  gameActive = true;
  document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
  updateStatus("Giliran pemain: X");
}
```

- Reset array (`fill("")`).
- Balikin giliran ke X, aktifkan game.
- Bersihin teks semua cell di layar.
- Update status.
- Skor **tidak** di-reset (biar akumulasi antar ronde).
