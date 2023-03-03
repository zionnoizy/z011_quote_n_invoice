<template>
    <div class="register">

        <p>test08</p>

        <h1>Create Quote N Invoice Account Today</h1>
        <p><input type="text" placeholder="Email" style=" color: #2c3e50 !important;" v-model="email" /></p>
        <p><input type="password" placeholder="Password" style=" color: #2c3e50 !important;" v-model="password" /></p>
        <!-- <p v-if="err_msg">{{ err_msg }}</p> -->
        <p><button @click="register">Register</button></p>
        <p>Have an account already? Login Here</p>

        
    </div>

</template>



<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
import { auth } from "@/firebase.js";

const email = ref("");
const password = ref("");
const router = useRouter();
const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) =>{
        //console.log('Successfully Registered To Quote N Invoice!');
        router.push('/dashboard');
    })
    .catch(error => {
        //console.log(email.value + " " + password.value)
        //console.log(error.code)
        alert(error.message);
    })
}
</script>
<style>
#register{
    text-align: center;
}
</style>