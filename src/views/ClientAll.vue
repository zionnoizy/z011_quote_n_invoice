<template>
    <div class="ClientAll">
        <!--https://pbs.twimg.com/media/DrM0nIdU0AEhG5b.jpg-->
        <p>test21</p>
        <p>Coming Soon. Show all Client Page.</p>

        
    <div class="grid grid-cols-5">
      <div class="business_card">
        <div class="c_name">[ClientName]</div>
        <div class="c_address">[ClientAddress]</div>
        <div class="c_email">[ClientEmail]</div>
        <div class="c_phone">[ClientPhone]</div>
      </div>

      <!-- ... -->
      <div class="business_card" >02</div>
      <div class="business_card">09</div>
      <div class="business_card">18</div>

    </div>

        
    </div>
</template>


<script>
export default{
    name: 'ClientAll',
}
</script>

<style>
.business_card{
  border-radius: 25px;
  border: 2px solid #73AD21;
  padding: 20px;
  width: 200px;
  height: 150px;
}
</style>