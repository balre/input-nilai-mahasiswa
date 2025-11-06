// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAqb9xsInEmE3oUh5vKhN-Pn6lfgcYMg0E",
  authDomain: "input-nilai-c6ada.firebaseapp.com",
  projectId: "input-nilai-c6ada",
  storageBucket: "input-nilai-c6ada.firebasestorage.app",
  messagingSenderId: "248591791287",
  appId: "1:248591791287:web:345fcfa8a0510a1b60c932",
  measurementId: "G-LH33C3P81F"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Ekspor koneksi Firestore agar logic.js bisa pakai
export const db = getFirestore(app);
