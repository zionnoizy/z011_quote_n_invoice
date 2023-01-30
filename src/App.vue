<template>
<p>test11</p>

<router-view></router-view>
<router-link :to="{name: 'Login'}">Login</router-link>

</template>

<script>

export default {
  name: 'app'

}
</script>