<template>
<p>test11</p>

<p>Welcome to CMS Quote-N-Invoice. You are Currnetly in the Page: </p> <router-view/>

<router-link :to="{name: '/'}">Login</router-link> | 
<router-link :to="{name: 'Register'}">Register</router-link> |
<p>Companies Management Systems Ltd.</p>

</template>

<script>

export default {
  name: 'app'

}
</script>

<style >
body{
  background: #2c3e50;
  color: #FFF;
}
#app{
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
a{
  color: inherit
}
</style>