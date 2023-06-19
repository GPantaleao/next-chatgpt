import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHAkDeTXy14oYOCbqtgXcqiTQnA3M392g",
  authDomain: "chatgpt-messenger-91d93.firebaseapp.com",
  projectId: "chatgpt-messenger-91d93",
  storageBucket: "chatgpt-messenger-91d93.appspot.com",
  messagingSenderId: "566605019829",
  appId: "1:566605019829:web:16e1315d9b5defae965cfc",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
