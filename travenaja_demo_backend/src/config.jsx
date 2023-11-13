// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8oOERSfmNF5vrPSLLnaqu7j2ycnZWpqA",
  authDomain: "travelnaja-f4147.firebaseapp.com",
  databaseURL: "https://travelnaja-f4147-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "travelnaja-f4147",
  storageBucket: "travelnaja-f4147.appspot.com",
  messagingSenderId: "866226827977",
  appId: "1:866226827977:web:1be3b4876bc69b52989318"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);