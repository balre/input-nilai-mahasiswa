// Import koneksi database dari firebase-config.js
import { db } from "./js/firebase-config.js";
import {
  collection, addDoc, getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

/* 
==========================================
  LOGIC LAYER - Input Nilai Mahasiswa
  File ini berfungsi untuk:
  1. Validasi input form
  2. Menyimpan data ke Firestore
  3. Menampilkan data dari Firestore
==========================================
*/

// ====== Fungsi Validasi Input ======
function validasiInput(nim, nama, matkul, nilai) {
  if (!nim || !nama || !matkul || !nilai) {
    alert("⚠️ Semua field harus diisi!");
    return false;
  }
  if (isNaN(nilai) || nilai < 0 || nilai > 100) {
    alert("⚠️ Nilai harus berupa angka antara 0 - 100!");
    return false;
  }
  return true;
}

// ====== Simpan Data ke Firestore ======
async function simpanData() {
  const nim = document.getElementById("nim").value.trim();
  const nama = document.getElementById("nama").value.trim();
  const matkul = document.getElementById("matkul").value.trim();
  const nilai = document.getElementById("nilai").value.trim();

  // Jalankan validasi sebelum menyimpan
  if (!validasiInput(nim, nama, matkul, nilai)) return;

  try {
    await addDoc(collection(db, "nilai_mahasiswa"), {
      nim,
      nama,
      matkul,
      nilai: parseInt(nilai)
    });
    alert("✅ Data berhasil disimpan!");
    clearForm();
    loadData();
  } catch (error) {
    console.error("❌ Gagal menyimpan data: ", error);
    alert("Terjadi kesalahan saat menyimpan data!");
  }
}

// ====== Ambil & Tampilkan Data dari Firestore ======
async function loadData() {
  const table = document.getElementById("dataTable");
  table.innerHTML = "<tr><td colspan='4' class='text-center'>Memuat data...</td></tr>";

  try {
    const querySnapshot = await getDocs(collection(db, "nilai_mahasiswa"));
    table.innerHTML = ""; // Kosongkan tabel sebelum menampilkan data baru

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const row = `
        <tr>
          <td>${data.nim}</td>
          <td>${data.nama}</td>
          <td>${data.matkul}</td>
          <td>${data.nilai}</td>
        </tr>`;
      table.innerHTML += row;
    });

    if (table.innerHTML === "") {
      table.innerHTML = "<tr><td colspan='4' class='text-center'>Belum ada data.</td></tr>";
    }
  } catch (error) {
    console.error("❌ Gagal memuat data:", error);
    alert("Gagal memuat data dari database!");
  }
}

// ====== Bersihkan Form Setelah Simpan ======
function clearForm() {
  document.getElementById("nim").value = "";
  document.getElementById("nama").value = "";
  document.getElementById("matkul").value = "";
  document.getElementById("nilai").value = "";
}

// ====== Event Listener ======
document.getElementById("btnSimpan").addEventListener("click", simpanData);
document.getElementById("btnTampil").addEventListener("click", loadData);

// ====== Load Data Otomatis Saat Halaman Dibuka ======
window.addEventListener("DOMContentLoaded", loadData);

