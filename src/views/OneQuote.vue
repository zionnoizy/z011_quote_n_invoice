<template>
    <div class="OneQuote">

        <p> coming soon - view specific quote.</p>
        <p> The quote id is {{ $route.params.id }}</p>
    </div>

</template>


<script>

export default{
    name: "OneQuote",
    data(){
        return{
            id: this.$route.params.id
        }
    },
    methods:{

        downloadOneQuote(){
            // https://www.youtube.com/watch?v=CGrNNGrKCJU&ab_channel=AdnanAfzal    [(9:55)]
        }, 

    },

}
</script>