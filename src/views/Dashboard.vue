<template>
    <div class="dashboard">
        <p> test12 </p>

        <p> welcome back.</p>

        <button @click="signOut">Logout</button>
    </div>
</template>

<script>

import { FirebaseError } from '@firebase/util';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import router from '../plugins/router';
import firebase from 'firebase'

const auth = getAuth();
onAuthStateChanged(auth, user => {

});

export default{
    name: 'Dashboard',

}

const signOut = () =>{
    firebase.auth().signOut()
    router.push('/')
}
</script>