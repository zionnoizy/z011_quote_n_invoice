<template>




    <div class="dashboard ">
        <!--v-if="!isloaded" overlay-->
        <div class="cms_loader overlay" >
            <img src="../assets/load1.gif" class="loading">
        </div>
        <section class="warehouse_background " style="background-image: url(&quot;/assets/Warehouse_Nologo-3ff955ec.png&quot;); z-index: 998;">
            
            <h2 class="dont_blur info_head text-4xl font-sans-b mb-16 ml-5 mt-3 text-left uppercase  text-white"> 
                
                <img  width="225" height="105"  class="qi_logo logo justify-center mx-auto mb-3" src="../assets/logo/logo-white.png" />
            
                Welcome Back To CMS-QuoteIn {{ userEmail }}
            
            </h2>
            
            <div class="  mx-auto" style="">
                <div class=" grid gird-cols-1 lg:grid-cols-2 gap-5" style="z-index: 2;">
                    <!--background-color: rgb(161, 204, 254) !important; border: none; height: 80px;-->
                    <div>
                        <button class="btn btn-primary btn-lg mt-5  font-weight-bold" style="">

                        <a href="/dashboard/all_client" class=""> View / Add Client 
                            <font-awesome-icon icon="fa-solid fa-user" style="color: #ffffff;" />
                        </a>

                        </button>
                    </div>

                    <div><button class="btn btn-primary btn-lg  mt-5  font-weight-bold" style="">
                        <a href="/dashboard/intro" class=""> Information
                            
                        </a>
                    </button></div>

                    <div><button class="btn btn-primary btn-lg mt-3  font-weight-bold" style="">
                        <a href="/dashboard/all_product" class=""> View / Add Product 
                            <font-awesome-icon icon="fa-solid fa-box-archive" style="color: #ffffff;" />
                        </a>
                    </button></div>

                    

                </div>
            </div>
        </section>




        <div class="container">
            <div class="row">
                <div class="col-8 mx-auto">

                    <button class="btn btn-primary btn-lg mb-3 btn-block mx-auto mt-5" style="width:100%; ">  
                        <router-link :to="{name: 'QuoteAdd' }"> 
                            Create New Quotation Here
                            <font-awesome-icon icon="fa-solid fa-paperclip" style="color: #ffffff;" />
                        </router-link> 
                    </button>
                </div>

                
            </div>
        </div>


        
        
        <div class="grid grid-cols-3 text-xl pb-6">
        
            <div>
                <router-link :to="{name: 'ClientCard' }"  class="router-link" active-class="router-link-active"> 
                <p class="text-3xl font-bold"> Client 

                    <font-awesome-icon icon="fa-solid fa-user" style="color: #ffffff;" />
                </p> 
            
                </router-link>
            </div>

            <div><router-link :to="{name: 'QuoteAll' }" class="router-link" active-class="router-link-active"> 
                <p class="text-3xl font-bold"> Quote 
                    <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" style="color: #ffffff;" />

                </p> 
            </router-link></div>

            <div><router-link :to="{name: 'InvoiceAll' }" class="router-link" active-class="router-link-active"> 
                <p class="text-3xl font-bold"> Invoice 
                    <font-awesome-icon icon="fa-solid fa-paperclip" style="color: #ffffff;" />
                </p> 
            
            </router-link></div>
        
    
        </div>
        

        <transition name="fade" mode="out-in">
        <router-view class="anime_height"></router-view>
        </transition>


        <font-awesome-icon icon="fa-solid fa-user-secret" style=""/>
        <font-awesome-icon icon="fa-sharp fa-solid fa-user" size="lg" />
        


       
    </div>
</template>

<script>
import { ref } from 'vue';
import {onBeforeMount } from 'vue'
import router from '../plugins/router';

import { auth } from "@/firebase.js";
import { signOut } from 'firebase/auth'
import {computed} from "vue";
const name = ref("");


import warehouse from "@/assets/Warehouse_Nologo.png";
import load1 from "@/assets/load1.gif";
export default{
    name:"Dashboard",
    setup() {
        const auth = getAuth()
        const userEmail = ref('')

        onMounted(() => {
        const user = auth.currentUser
        userEmail.value = user ? user.email : ''
        })

        console.log("userEmail?" + userEmail);
        return { userEmail }
    },
    data(){
        return{
            my_email: null,
            warehouse: warehouse,
            isLoaded: false,
            userEmail: '',
        }
    },
    mounted(){

        window.addEventListener('load', () => {
            this.isLoaded =  true;
            console.log("page completely load2.");
        })


    },
    setup(){


        firebase.auth().onAuthStateChanged(function(user) {
            
            if (user) {
                // User is signed in.
                //console.log("[Dashboard] signin");
                var displayName = user.displayName;
                
                var email = user.email;
                my_email.value = email;
                var email_split = email.split(['@'])[0];
                console.log("put this to top" + email_split);
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                // ...
            } else {
                // User is signed out.
                // ...
            }
        });
    },
   
    beforeMount() {
    
        const user = firebase.auth().currentUser;
        if (user){
            this_usr_name.value = user.email.split(['@'])[0];
        }
   
    },
    method:{
        SING_OUT(){
            commit('CLEAR_USER')
            firebase.auth().signOut().then(() => {
                this.$router.push('/')
            })
        }
    },

};



         





</script>

<style lang="scss">
//animation
.product_enter
.product_leave{
    transition: 0.8s ease all;
}
.product_from{
    transition: translateX(700px);
}

</style>

<style>
.warehouse_background{
    /* filter: brightness(70%) saturate(140%); */

    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: bottom;
    background-size: cover;
    display: flex;
    z-index: -2;
    height: 300px;
}


.anime_height > div  {
  transition: height 0.2s;
}

.dont_blur{

    z-index: 2;


}

.cms_loader{
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: url('../assets/load2.gif') no-repeat;
}

.overlay {
    display: none;
    position: fixed;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
}

.router-link {
  position: relative;
}

.router-link::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s;
}
.router-link{
  position: relative;
  display: inline-block;
}
.router-link-active::before {
  transform: scaleX(1);
}

.qi_logo {


transition: transform .2s; /* Animation */

margin: 0 auto;
}

.qi_logo:hover {
transform: scale(1.05); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
</style>
