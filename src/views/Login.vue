<template>
    <div class="login">
        <p> test09 </p>

        <p> Need an account? Register Here</p>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();
onAuthStateChanged(auth, user => {

});

export default{
    name: 'login',

}
</script>