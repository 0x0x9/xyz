// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth, type User } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getFunctions, type Functions } from "firebase/functions";


// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "oria-ai-assistant",
  "appId": "1:161385582711:web:bed5e98b880afb1d903672",
  "storageBucket": "oria-ai-assistant.firebasestorage.app",
  "apiKey": "AIzaSyBLQiu9wjVCH5fPL0cfXUb5eEt-cjk74_4",
  "authDomain": "oria-ai-assistant.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "161385582711"
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
