// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc, DocumentReference } from "firebase/firestore";
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
const fv = firebase.firestore.FieldValue;

const storage = getStorage(app);

// const admin = require('firebase-admin');
// admin.initializeApp();
//const analytics = getAnalytics();

let tmp_url = '';

export {  app, auth, db, db2, fv, storage }

export const save_2_storage = (fullPath, my_url) => {
  const image_ref = ref(storage, fullPath);
  const storage_ref = ref(storage, "text.txt");

  const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
  uploadString(storage_ref, message4, 'data_url')
  .then((snapshot) => {
    console.log('Uploaded a data_url string!');
  });
}

export const test2_storage = (tmp, fullPath, pdf_base64) => {
  console.log("[firebase test2_storage]");

  const image_ref = ref(storage, fullPath);
  const storage_ref = ref(storage, fullPath + "text4.pdf");


  uploadString(storage_ref, pdf_base64, 'data_url')
  .then((snapshot) => {

    getDownloadURL(snapshot.ref).then(async (url) => {
      const get_id = firebase.firestore().collection("ALL_quote").doc(tmp);
      get_id
      .update({
          quote_hashid: tmp,
          q_pdf_link: url.toString(),
      })
      .then(() => {
          console.log("set doc");

          get_id.get().then((d) => {
              console.log("updated data:", d.data());
          });
      });
      tmp = url.toString();


      return { tmp };


    })

    console.log('Uploaded a base64 string pdf version!');
  });
  
}




export const auto_quote_no_generator = () => {

  let ans = '';
  let first_half = "Q-CMS";

  const ref = collection(db, 'ALL_quotes');
  const snapshot = ref.count().get(); //count is not a function
  console.log(snapshot.data().count);
  const how_many = snapshot.data().count;
  ans = first_half + how_many;
  return { ans };

  
}


export const auto_invoice_no_generator = () => {

  let ans = '';
  let first_half = "I-CMS"
  const collectionRef = db.collection('ALL_quotes');
  const snapshot = collectionRef.count().get().limit(1).then(
    doc => {
      if (doc.exists) {
        console.log(snapshot.data().count);
        const how_many = snapshot.data().count;
        ans = first_half + how_many;
        return { ans };
      }
    });;
  
}

