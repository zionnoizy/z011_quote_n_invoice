<template>
    <div class="login">

        <p> test09 </p>
        <h1>Login Quote N Invoice Account Here</h1>
        <!-- <p><button @click="signInWithGoogle">Sign In With Google</button></p> -->
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <p v-if="err_msg">{{ err_msg }}</p>
        <p><button @click="login_qni">Login</button></p>

        <p> Need an account? Register Here</p>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const email = ref("");
const password = ref("");
const router = useRouter();

const login_qni = () => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) =>{
        console.log('Successfully Registered!');
        router.push('/dashboard')
    })
    .catch(error => {
        console.log(error.code)
        switch (error.code){
            case "auth/invalid-email":
                err_msg.value = "Invalid Email, Please Try Again."
                break;
            case "auth/invalid-email":
                err_msg.value = "Invalid Email, Please Try Again."
                break;
            case "auth/invalid-email":
                err_msg.value = "Invalid Email, Please Try Again."
                break;
            case "auth/invalid-email":
                err_msg.value = "Invalid Email, Please Try Again."
                break;
        }
    })

}

export default{
    name: 'Login',

}
</script>