// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth, type User } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getFunctions, type Functions } from "firebase/functions";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD81xiaLYEzWZlbdHzL-BdKuj_NPUINKsE",
  authDomain: "xyzzai.firebaseapp.com",
  databaseURL: "https://xyzzai-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "xyzzai",
  storageBucket: "xyzzai.firebasestorage.app",
  messagingSenderId: "424780446122",
  appId: "1:424780446122:web:584566b21e5f6d8cd053d3",
  measurementId: "G-SC8W810MLQ"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let functions: Functions;

// Initialize Firebase
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);
functions = getFunctions(app);


export { app, auth, db, storage, functions };
