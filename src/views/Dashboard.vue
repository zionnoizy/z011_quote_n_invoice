<template>
    <div class="dashboard">
        <p> test19 </p>

        <p> Weclome Back. {{ this_usr_name }} </p>

        <h2>
            <button>Quote</button> |
            <button>Invoice</button> |
            <button>Product</button> |
            <button>Clients</button>
        </h2>
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
    const user = firebase.auth().currentUser;
    console.log("[DashboardDebug] " + user);
    if (user){
        this_usr_name.value = user.email.split(['@'])[0];
    }
});

    
    /*
    mounted(){
        let usr = localStorage.getItem('user-info');
        if (!usr){
            this.$router.push({name:'Register'})
    },
    */
         

const signOut = () =>{
    db.auth().signOut()
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