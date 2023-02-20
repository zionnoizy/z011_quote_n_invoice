<template>
    <div class="dashboard">
        <p> test19 </p>
        <div class="card-header">Welcome, {{my_email}}</div>
        <div class="container">
            <div class="row">
                <div class="col-8">
                    <p class="text-3xl font-bold underline"> Weclome Back To CMS-QuoteIn {{ this_usr_name }} </p>
                    <button class="btn btn-primary btn-lg mb-3"> <router-link :to="{name: 'QuoteAdd' }"> Add New Quote </router-link> </button>
                </div>

                <div class="col-4">
                    <button class="btn btn-primary btn-lg mb-3"> <router-link :to="{name: 'ClientAll' }"> View / Add Client </router-link> </button>
                    <button class="btn btn-success btn-lg mb-3"> <router-link :to="{name: 'ProductAll' }"> View / Add Product </router-link></button>
                </div>
            </div>
        </div>

        <p class="text-3xl font-bold underline"> Weclome Back! </p>

        
        
        <div class="grid grid-cols-3 ">
        
            <div><router-link :to="{name: 'QIAll' }">All </router-link></div>
            <div><router-link :to="{name: 'QuoteAll' }">Quote</router-link></div>
            <div><router-link :to="{name: 'InvoiceAll' }">Invoice</router-link></div>
        
    
        </div>
        
        <div v-if="user">
            You're logged in as {{user.displayName}}
        </div>

        <router-view></router-view>
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

export default{
    name:"Dashboard",
    setup(){


        firebase.auth().onAuthStateChanged(function(user) {
            console.log(user);
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                my_email.value = email;
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
        console.log("[Dashboard-onBeforeMount] " + user);
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