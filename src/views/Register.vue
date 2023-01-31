<template>
    <div class="register">

        <p>test08</p>

        <h1>Create Quote N Invoice Account Today</h1>
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <!-- <p v-if="err_msg">{{ err_msg }}</p> -->
        <p><button @click="register_qni">Register</button></p>
        <p>Have an account already? Login Here</p>
    </div>

</template>



<script>
export default{
    name: 'register',
}
import {ref} from 'vue';
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
const email = ref('')
const password = ref('')

const router = useRouter();
const register_qni = () => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) =>{
        console.log('Successfully Registered To Quote N Invoice!');
        router.push('/dashboard');
    })
    .catch(error => {
        console.log(error.code)
        alert(error.message);
    })

}
</script>