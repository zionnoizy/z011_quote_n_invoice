<template>
    <div class="empty">

        <p>test20</p>
        <p>Add Client Page.</p>

        <p> client address is in UK / outside of UK</p>
        <label>Client Company Name</label>
        <input type="text" />

        <label>Full Address</label>
        <textarea placeholder="Address Line1&#10Address Line2&#10City + Post Code" id="txtArea" rows="100" cols="100"></textarea>


        <!---------------------------------->
        <p>------------------------------</p>

        <label class="hidden">County</label>
        <input class="hidden" type="text" />
    </div>
</template>


<script>
export default{
    name: 'empty',
}

</script>

<style>
[type=text] {
  background-image: url(https://image.flaticon.com/icons/svg/131/131155.svg);
  background-position: calc(100% - 8px)  center;
  background-repeat: no-repeat;
  background-size: 16px 16px;
  padding: 1em 16px 1em 1em;
  border: 1px solid;
}
[type=text]:not(:placeholder-shown) {
  background-image: none;
}
</style>