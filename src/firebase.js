// // // src/firebase.js
// // import { initializeApp } from "firebase/app";
// // import { getFirestore } from "firebase/firestore";

// import firebase from "firebase/app";
// import "firebase/firestore";

// // Your Firebase configuration (from Firebase Console)
// const firebaseConfig = firebase.initializeApp( {
// apiKey: "AIzaSyC9kjdz8rMyidP3ga9UZO2ZDlMNRoeJM0A",
// authDomain: "test-f9c1e.firebaseapp.com",
// projectId: "test-f9c1e",
// storageBucket: "test-f9c1e.firebasestorage.app",
// messagingSenderId: "295973941871",
// appId: "1:295973941871:web:291df8eb93c1093c10539a"
// });


// export { firebaseConfig as firebase };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// //  export const firestore = getFirestore(app);

// // Get services you want to use (Authentication, Firestore, Storage, etc.)
// // const auth = getAuth(app);
// // const db = getFirestore(app);
// // const storage = getStorage(app);

// // export { auth, db, storage };


// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration (from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyBoBbj5IeUj1OHw6JZMBQq9DAHNsguM22o",
    authDomain: "temp-9730e.firebaseapp.com",
    projectId: "temp-9730e",
    storageBucket: "temp-9730e.firebasestorage.app",
    messagingSenderId: "650138207333",
    appId: "1:650138207333:web:d741b3e48f5b3850fcf28c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Export Firestore
export { firestore };
