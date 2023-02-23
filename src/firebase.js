// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadString } from "firebase/storage";
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

const storage = getStorage(app);
//const analytics = getAnalytics();



export {  app, auth, db, db2, increment, storage }

export const save_2_storage = (fullPath, my_url) => {
  const image_ref = ref(storage, fullPath);
  const storage_ref = ref(storage, "text.txt");

  const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
  uploadString(storage_ref, message4, 'data_url')
  .then((snapshot) => {
    console.log('Uploaded a data_url string!');
  });
}

export const test2_storage = (fullPath, pdf_base64) => {
  console.log("[firebase test2_storage]");

  const image_ref = ref(storage, fullPath);
  const storage_ref = ref(storage, fullPath + "text4.pdf");

  const message2 = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
  uploadString(storage_ref, pdf_base64, 'data_url')
  .then((snapshot) => {
    console.log('Uploaded a base64 string pdf version!');
  });

}


