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

        <div class="grid grid-cols-2 gap-2 mb-3">
            
            <div>
                <img width="335" height="105" alt="Vue logo" class="logo justify-center mx-auto mb-3" src="../assets/design_it/Artboard1.png" />
            </div>
            <div>
                <img  width="225" height="105" class="qi_logo logo justify-center mx-auto " src="../assets/logo/logo-no-background.png" />
                
            </div>
        </div>



        <p class="pb-3">
            <label id="e_tag" class=" " >Email</label>
            <input  type="text" class="form-control" placeholder="Email" id="em" v-model="email" required/>
            <!--class="form-control"   style=" color: #2c3e50 !important;"   v-model="email" -->
            <!-- <input id="em"  type="text" placeholder="Email"   required/> --> </p>
        
        <p class="pb-3">
            <label id="p_tag" class=" " >Password</label>
            <input id="pw" class="form-control" type="password" placeholder="Password" style=" color: #2c3e50 !important;" v-model="password" required/></p>

        <p v-if="err_msg">{{ err_msg }}</p>

        <p><button id="login_btn"    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" @click="login">Login</button></p>
            
        <p class="my-3" id="complain_text" style="color: red;"> </p>
        <p class="my-3">Question? Please Send an email zionn951@gmail.com for inquery</p>
        
        <h1>Current Time:</h1>
        <div id="current-time"></div>
        <h2 id="le" class="my-3">Edition v1.0: 14/05/2023 21:39(Sun)</h2>

        <img alt="" class="position-absolute bottom-0 end-0" src="../assets/contact-form-bg.png" style="z-index:-999; ;;" />
            
    </div>
</template>


<script setup>
import {ref} from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';


import { auth } from "@/firebase.js";

const router = useRouter();

const email = ref("");
const password = ref("");
const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Successfully logged in
      // Obtain the token and store it in localStorage
      return userCredential.user.getIdToken();
    })
    .then((token) => {
      localStorage.setItem('token', token);
      // context.commit('SET_USER', response.user);
      // console.log('Successfully Login!');
      router.push('/dashboard/client');
    })
    .catch((error) => {
      console.log(error.code);

      var paragraph = document.getElementById("complain_text");
      if (paragraph.textContent <= 0 || paragraph.textContent == null || paragraph.textContent == '') {
        paragraph.textContent += "Incorrect login details, email it@companiesms.co.uk for extra help.";
      }
    });
}


</script>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { auth } from "@/firebase.js";
import {ref} from 'vue';

export default{
    name: 'ProductAll',
    setup() {
        const router = useRouter();
        const email = ref("");
        const password = ref("");
        const login = () => {
            signInWithEmailAndPassword(auth, email.value, password.value)
            .then((data) =>{
                let token = data.user.getIdToken();
                localStorage.setItem('token', token);
                
                //context.commit('SET_USER', response.user);
                //console.log('Successfully Login!');
                router.push('/dashboard/client');
            })
            .catch(error => {
                //console.log(error.code)
                switch (error.code){
                    case "auth/invalid-email":
                        var paragraph = document.getElementById("complain_text");
                        //if (paragraph.textContent <=0 || paragraph.textContent == null || paragraph.textContent == ''){
                            paragraph.textContent += "Incorrect login details, email it@companiesms.co.uk for extra help.";
                        //}     
                }
            })
        return { login };
    }
    },
    data(){
        return{
            email: '',
            password: '',
            
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
        /*
        async login(){
            var flag = validate_l_input();
            console.log(this.email + " " + this.password + " " + flag);
            
            
            if (flag){
            const response = await signInWithEmailAndPassword(auth, this.email, this.password)
            console.log(response);
                if (response) {

                    //commit('SET_USER', response.user);
                    console.log('Successfully Login!');
                    
                    router.push('/dashboard/client');

                } else {
                    console.log('NO Login!');
                    //this.complain_text = "Incorrect login details, email it@companiesms.co.uk for extra help"
                    var paragraph = document.getElementById("complain_text");
                    if (paragraph.textContent <=0 || paragraph.textContent == null || paragraph.textContent == ''){
                        paragraph.textContent += "Incorrect login details, email it@companiesms.co.uk for extra help.";
                    }
                }
            }
            
        },
        */
    },
    computed: {
      
    },

    created() {

      
    },
}

function validate_l_input(){
      let flag = true;
      var lc_1 = document.getElementById('em').value;
      var lc_2 = document.getElementById('pw').value;

      var lcc_1 = document.getElementById('e_tag');
      var lcc_2 = document.getElementById('p_tag');
      if (lc_1.length <= 0){
        console.log("email empty");
        lcc_1.classList.add("txt_red");
        flag = false;
      }
      if (lc_2.length <= 0){
        console.log("pw empty");
        lcc_2.classList.add("txt_red");
        flag = false;
      }
      
      return flag;
}
function displayCurrentTime() {
      var date = new Date();
      var currentTime = date.toLocaleTimeString();
      document.getElementById('current-time').innerHTML = currentTime;
    }
    setInterval(displayCurrentTime, 1000); // Update every second
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

h1, #current-time, #le {
      display: inline;
}
</style>