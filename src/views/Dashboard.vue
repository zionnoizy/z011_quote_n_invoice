<template>
    <div class="dashboard">
        <p> test19 </p>

        <p> Weclome Back {{ this_usr_name }} </p>

        <ul>
            <li><router-link :to="{name: 'QIAll' }">All </router-link></li>
            <li><router-link :to="{name: 'QuoteAll' }">Quote</router-link></li>
            <li><router-link :to="{name: 'InvoiceAll' }">Invoice</router-link></li>
            
        </ul>

        <router-view></router-view>
        <!--[btn-for-client-product]-->
        <!-- <div class="bg-green-500 w-full block">

            <div class="w-24 h-24 float-right p-10">

                <div class="grid grid-cols-2 gap-2">

                    <div>
                         <button> <router-link :to="{name: 'ViewClient' }"> View Client </router-link> </button> -->
                    <!-- </div>
                    <div>
                        <button class="indigo-400">View Product</button>
                    </div>
                    <div>
                            <button class="blue-700"> <router-link :to="{name: 'AddClient' }"> Add Client </router-link> </button>
                    </div>
                    <div>
                        <button class="indigo-700">Add Product</button>
                    </div>
                </div>
            </div>
        </div> -->

        <div class="grid grid-cols-2 gap-2">
            <div>
                <button class="btn btn-primary btn-lg"> <router-link :to="{name: 'ClientAll' }"> View Client </router-link> </button> -->
            </div>
            <div>
                <button class="btn btn-success btn-lg">View Product</button>
            </div>
            <div>
                <button class="btn btn-primary btn-lg"> <router-link :to="{name: 'ClientAdd' }"> Add Client </router-link> </button>
            </div>
            <div>
                <button class="btn btn-success btn-lg">Add Product</button>
            </div>
        </div>
        
        <!-- <button @click="signOut">Logout</button> -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {onBeforeMount } from 'vue'
import router from '../plugins/router';

/*
const auth = getAuth();
onAuthStateChanged(auth, user => {
});
*/
const name = ref("");
onBeforeMount(() => {
    /*
    const user = firebase.auth().currentUser;
    console.log("[DashboardDebug] " + user);
    if (user){
        this_usr_name.value = user.email.split(['@'])[0];
    }
    */
});

    
    /*
    mounted(){
        let usr = localStorage.getItem('user-info');
        if (!usr){
            this.$router.push({name:'Register'})
    },
    */
         

const signOut = () =>{
    firebase.auth().signOut()
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