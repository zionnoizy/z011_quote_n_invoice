<template>




    <div class="dashboard">

        <section class="warehouse_background" style="background-image: url(&quot;/assets/Warehouse_Nologo-3ff955ec.png&quot;);">
            
            <h2 class="dont_blur info_head text-4xl font-sans-b mb-16 text-left max-w-lg uppercase lg:ml-16 mt-12 text-white"> Welcome Back To CMS-QuoteIn </h2>
            
            <div class="  mr-auto" style="">
                <div class=" grid grid-cols-2 gap-2" style="z-index: 2;">
                    <div><button class="btn btn-lg mt-5 mb-4 font-weight-bold" style="background-color: rgb(161, 204, 254) !important; border: none; height: 55px;">
                        <a href="/dashboard/all_client" class=""> View / Add Client </a>
                    </button></div>
                    <div><button class="btn btn-success mt-5 btn-lg mb-4 font-weight-bold" style="background-color: rgb(161, 204, 254) !important; border: none; height: 55px;">
                        <a href="/dashboard/all_product" class=""> View / Add Product </a>
                    </button></div>
                </div>
            </div>
        </section>




        <div class="container">
            <div class="row">
                <div class="col-8">

                    <button class="btn btn-primary btn-lg mb-3 btn-block mx-auto" style="width:100%;">  <router-link :to="{name: 'QuoteAdd' }"> Add New Quote </router-link> </button>
                </div>

                
            </div>
        </div>

        <p class="text-3xl font-bold underline pb-3"> Please Select The Following </p>

        
        
        <div class="grid grid-cols-3 text-xl pb-6">
        
            <div><router-link :to="{name: 'ClientCard' }"> Client </router-link></div>

            <div><router-link :to="{name: 'QuoteAll' }"> Quote </router-link></div>

            <div><router-link :to="{name: 'InvoiceAll' }"> Invoice </router-link></div>
        
    
        </div>
        

        <transition name="fade" mode="out-in">
        <router-view class="anime_height"></router-view>
        </transition>


        <div v-if="user">
            You're logged in as {{user.displayName}}
        </div>
        <button @click="sign_out">Logout</button>
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
export default{
    name:"Dashboard",
    data(){
        return{
            my_email: null,
            warehouse: warehouse,
        }
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
        //console.log("[Dashboard-onBeforeMount] " + user);
        if (user){
            this_usr_name.value = user.email.split(['@'])[0];
        }
   
    },
};



         

const sign_out = () =>{
    signOut(auth)
    commit('CLEAR_USER')
    router.push('/')
}



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
</style>
