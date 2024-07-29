import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBQpJjeLGRfgowLvFvKFhctJspHztdREgM",
  authDomain: "samnu-the-chaotic-cat.firebaseapp.com",
  projectId: "samnu-the-chaotic-cat",
  storageBucket: "samnu-the-chaotic-cat.appspot.com",
  messagingSenderId: "440983988404",
  appId: "1:440983988404:web:6ec2de7be7e05b689d8fe1",
  measurementId: "G-8R7YKY6M42"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };