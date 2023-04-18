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
                <img  width="195" height="105" class="qi_logo logo justify-center mx-auto " src="../assets/logo/logo-no-background.png" />
            </div>
        </div>



        <p class="pb-3">
            <label class="text-secondary" >Email</label>
            <input class="form-control" type="text" placeholder="Email" style=" color: #2c3e50 !important;" v-model="email" /></p>
        
        <p class="pb-3">
            <label class="text-secondary" >Password</label>
            <input id="pw" class="form-control" type="password" placeholder="Password" style=" color: #2c3e50 !important;" v-model="password" /></p>

        <p v-if="err_msg">{{ err_msg }}</p>

        <p><button id="login_btn"    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" @click="login">Login</button></p>
            

        <p class="my-3">Need an account? Please Send an email it@companiesms.co.uk for registration</p>


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



</script>

<script>
export default{
    name: 'ProductAll',
    setup() {
    },
    data(){
        return{

        }
    },
    mounted(){
        var a = document.getElementById("pw");
        a.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {

                document.getElementById("login_btn").click();
            }
        });
    },

    methods: {
        login() {
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
                        err_msg.value = "Invalid Email or Password, Please Try Again."
                        break;
                }
            })
        }
    },
    computed: {
      
    },

    created() {

      
    },
}

</script>
<style>
#login{
    text-align: center;
}

.qi_logo {


  transition: transform .2s; /* Animation */

  margin: 0 auto;
}

.qi_logo:hover {
  transform: scale(1.05); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}


</style>