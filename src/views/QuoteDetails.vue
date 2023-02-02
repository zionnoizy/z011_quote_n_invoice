<template>
    <div class="QuoteDetails">

        <p> coming soon - view specific quote.</p>
        <p> The quote id is {{ $route.params.id }}</p>
    </div>

</template>


<script>

export default{
    name: "QuoteDetails",
    data(){
        return{
            id: this.$route.params.id
        }
    }

}
</script>