// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7y8jAGKK6zfYzw2JPJK-6nNDwl95ULdM",
    authDomain: "james-001-70a3d.firebaseapp.com",
    projectId: "james-001-70a3d",
    storageBucket: "james-001-70a3d.firebasestorage.app",
    messagingSenderId: "661839183636",
    appId: "1:661839183636:web:60748f72971441cdd6cc01",
    measurementId: "G-7T3BMTJJDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
