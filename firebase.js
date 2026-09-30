// Firebase configuration for the Bonsa Bashir portfolio.
// Replace the placeholder values with the Web App configuration
// from Firebase Console > Project settings > Your apps.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDh7lNGolDDIZO1ZeKylKBcFKC0Ej41eHE",
  authDomain: "bonsa-po.firebaseapp.com",
  projectId: "bonsa-po",
  storageBucket: "bonsa-po.firebasestorage.app",
  messagingSenderId: "1014715357806",
  appId: "1:1014715357806:web:a9ddf792d91ee9439e647f"
};

const isFirebaseConfigured = !Object.values(firebaseConfig).some(value => value.startsWith("YOUR_"));

let app = null;
let db = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export { app, db, isFirebaseConfigured };
