<template>


<!--ACCOUNCEMENT CAN BE IN HERE <p>Welcome to CMS Quote-N-Invoice.</p>  -->
<router-view></router-view>

<router-link to="/" exact><a>Login</a></router-link> | 
<router-link :to="{name: 'Register'}">Register</router-link> |
<p>©2023 Companies Management Systems Ltd.</p>



</template>

<script>
import right_corner from '@/assets/cms_logo_small.png'

export default {
  name: 'app' 

}
</script>

<style >
body{
  background: #2c3e50 !important;
  color: #FFF!important;
}
#app{
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
a{
  color: #FFF!important;
}
a:hover {
   color: #FFF!important;
}
button,
.button{
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 10px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  
}

input,
.input{
  color: #2c3e50 !important;
}

textarea,
.textarea{
  color: #2c3e50 !important;
  resize: none;
}
.link:hover{

    text-decoration: underline;
}

.dashboard_txt{
  font-size: 200%;

}
/* add product, category */
.red::-webkit-input-placeholder{
color:red;
}

.client_card{

border: 2px solid #73AD21;
padding: 20px;
width: 275px;
height: 175px;
}


/* */
tr:hover {
    background-color: #1d9a6a;
}

tr:active {
    background-color: #2479a4;
}

tr:focus {
    background-color: #2479a4;
}

tr:visited { 
  background-color:#ccc; 
}

tr:hover td {
    background-color: transparent; /* or #000 */
}
</style>