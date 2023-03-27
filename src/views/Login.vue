<template>
    <div class="login  py-12 sm:px-6 lg:px-8">

        <!-- <div class="border">
            <p> debug border here only - after login.</p>
            <p> Email is= </p>
            <p> Account ID Hash is=  </p>
            <input class="quote_num" id="quote_num"/> <br>
            <br>
            <input class="ref_num" id="ref_num"/> 
        </div> -->

        <div class="grid grid-cols-2 gap-2">
            <div>
                <img alt="Vue logo" class="logo justify-center mx-auto mb-3" src="../assets/cms_logo_small.png" />
            </div>
            <div>
                <h1>QUOTE-IN</h1>
            </div>
        </div>



        <p class="pb-3"><input class="form-control" type="text" placeholder="Email" style=" color: #2c3e50 !important;" v-model="email" /></p>
        <p class="pb-3"><input class="form-control" type="password" placeholder="Password" style=" color: #2c3e50 !important;" v-model="password" /></p>

        <p v-if="err_msg">{{ err_msg }}</p>

        <p><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" @click="login">Login</button></p>
            

        <p>Need an account? <router-link :to="{name: 'Register'}">Register Here</router-link></p>
        <p>(DEBUG ONLY test003@cms.com	hwong2881)</p>

        <img alt="" class="position-absolute bottom-0 end-0" src="../assets/contact-form-bg.png" style="z-index:-999; ;;" />
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
        //context.commit('SET_USER', response.user);
        //console.log('Successfully Login!');
        router.push('/dashboard/client');
    })
    .catch(error => {
        //console.log(error.code)
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