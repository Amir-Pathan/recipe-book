// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuzTnrIn8RQ1Y5dbphjD1pnhB_7hD3XHw",
  authDomain: "recipe-app-b0713.firebaseapp.com",
  projectId: "recipe-app-b0713",
  storageBucket: "recipe-app-b0713.appspot.com",
  messagingSenderId: "736406612481",
  appId: "1:736406612481:web:d301d6f287f0827b456e00",
  measurementId: "G-EKT05QR2ZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app)

const storage = getStorage(app)

export {
  auth,
  db,
  storage
}