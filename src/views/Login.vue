<template>
    <div class="login">

        <p>test15</p>
        
        <h1>Login Quote N Invoice Account </h1>


        <p class="pb-3"><input class="form-control" type="text" placeholder="Email" style=" color: #2c3e50 !important;" v-model="email" /></p>
        <p class="pb-3"><input class="form-control" type="password" placeholder="Password" style=" color: #2c3e50 !important;" v-model="password" /></p>

        <p v-if="err_msg">{{ err_msg }}</p>

        <p><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" @click="login">Login</button></p>
            

        <p>Need an account? <router-link :to="{name: 'Register'}">Register Here</router-link></p>
        <p>(DEBUG ONLY test003@cms.com	hwong2881)</p>
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
<style>
#login{
    text-align: center;
}
</style>