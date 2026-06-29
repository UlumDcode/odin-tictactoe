# Pseudocode Tic Tac Toe

## 1. Inisialisasi Data (State)

// Ini adalah "otak" permainan
Variabel gameBoard = ["", "", "", "", "", "", "", "", ""]
Variabel currentPlayer = "X"
Variabel gameActive = true

// Kombinasi angka yang bikin menang
Variabel winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Baris
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolom
  [0, 4, 8], [2, 4, 6]             // Diagonal
]

// Referensi ke element HTML
Variabel boardElement = document.getElementById("board")
Variabel statusElement = document.getElementById("status")

---

## 2. Handle Player Move (Saat Kotak Diklik)

Fungsi handleCellClick(index):
  Jika gameActive == false, stop
  Jika gameBoard[index] != "", stop (kotak sudah terisi)

  // Tempatkan simbol pemain sekarang
  gameBoard[index] = currentPlayer
  Tampilkan currentPlayer di kotak[index] di layar

  // Cek kondisi permainan
  Jika cekPemenang() == true:
    Tampilkan "Pemain " + currentPlayer + " menang!"
    gameActive = false
  Lain Jika cekSeri() == true:
    Tampilkan "Permainan seri!"
    gameActive = false
  Lain:
    gantiGiliran()

---

## 3. Switch Turn (Ganti Giliran)

Fungsi gantiGiliran():
  Jika currentPlayer == "X":
    currentPlayer = "O"
  Lain:
    currentPlayer = "X"
  Tampilkan "Giliran pemain: " + currentPlayer

---

## 4. Check Win (Cek Pemenang)

Fungsi cekPemenang():
  Untuk setiap kondisi in winningConditions:
    a = kondisi[0], b = kondisi[1], c = kondisi[2]
    Jika gameBoard[a] != "" &&
       gameBoard[a] == gameBoard[b] &&
       gameBoard[b] == gameBoard[c]:
      return true
  return false

---

## 5. Check Tie (Cek Seri)

Fungsi cekSeri():
  Jika semua isi gameBoard tidak ada yang "":
    return true
  return false

---

## 6. Update Status (Tampilkan Pesan)

Fungsi updateStatus(pesan):
  statusElement.innerHTML = pesan

// Dipanggil di:
// - handleCellClick: saat menang/seri
// - gantiGiliran: saat menunjukkan giliran

---

## 7. Reset Game (Mulai Ulang)

Fungsi resetGame():
  gameBoard = ["", "", "", "", "", "", "", "", ""]
  currentPlayer = "X"
  gameActive = true
  Kosongkan semua kotak di layar
  updateStatus("Giliran pemain: X")

---

## 8. Event Listeners (Pasang Pendengar)

Saat halaman selesai dimuat:
  Untuk i dari 0 sampai 8:
    Ambil kotak ke-i dari boardElement
    Pasang event click -> handleCellClick(i)

  // Tombol reset
  TombolReset.addEventListener("click", resetGame)

  updateStatus("Giliran pemain: X")
