<template>
    <div class="dashboard">
        <p> test17 </p>

        <p> welcome back.</p>

        <!-- <button @click="signOut">Logout</button> -->
    </div>
</template>

<script>
import router from '../plugins/router';
/*
const auth = getAuth();
onAuthStateChanged(auth, user => {
});
*/
export default{
    name: 'Dashboard',
    /*
    setup(){
        const name = ref("");
        onBeforeMount(() => {
            const user = firebase.auth().currentUser;
            if (user){
                name.value = user.email.split(['@'])[0];
            }
        });
    
    },
    */
    /*
    mounted(){
        let usr = localStorage.getItem('user-info');
        if (!usr){
            this.$router.push({name:'Register'})
    },
    */
         
}
const signOut = () =>{
    db.auth().signOut()
    router.push('/')
}


</script>