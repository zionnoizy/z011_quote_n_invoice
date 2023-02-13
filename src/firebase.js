// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmnk75XdGraJ2LbDC6VQAM-_J5wkwCAtw",
  authDomain: "quote-n-invoice.firebaseapp.com",
  projectId: "quote-n-invoice",
  storageBucket: "quote-n-invoice.appspot.com",
  messagingSenderId: "183239941114",
  appId: "1:183239941114:web:001bd5427fcab85a6ce243"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const db2 = getFirestore();
const increment = firebase.firestore.FieldValue.increment;
//const analytics = getAnalytics();

export {  app, auth, db, db2, increment }
