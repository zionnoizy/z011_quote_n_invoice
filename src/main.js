import { createApp } from 'vue';

import App from './App.vue';


import router from "@/plugins/router";

import "bootstrap/dist/css/bootstrap.min.css"

import "bootstrap"


/*
import { initializeApp } from "firebase/app";


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


initializeApp(firebaseConfig);
*/

createApp(App)
.use(router)
.mount('#app')

