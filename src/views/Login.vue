<template>
    <div class="login">

        <p>test15</p>
        
        <h1>Login Quote N Invoice Account </h1>


            <p><input type="text" placeholder="Email" v-model="email" /></p>
            <p><input type="password" placeholder="Password" v-model="password" /></p>

            <p v-if="err_msg">{{ err_msg }}</p>

            <p><button class="" @click="login">Login</button></p>
            

        <p>Need an account? <router-link :to="{name: 'Register'}">Register Here</router-link></p>
        
    </div>
</template>


<script setup>
import {ref} from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';


import { auth } from "@/firebase.js";
const email = ref("");
const password = ref("");
const router = useRouter();

const login = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) =>{
        console.log('Successfully Login!');
        router.push('/dashboard');
    })
    .catch(error => {
        console.log(error.code)
        switch (error.code){
            case "auth/invalid-email":
                err_msg.value = "Invalid Email, Please Try Again."
                break;
            /*
            case "auth/invalid-email":
                err_msg.value = "Invalid Email, Please Try Again."
                break;
            case "auth/invalid-email":
                err_msg.value = "Invalid Email, Please Try Again."
                break;
            case "auth/invalid-email":
                err_msg.value = "Invalid Email, Please Try Again."
                break;
            */
        }
    })

}
</script>