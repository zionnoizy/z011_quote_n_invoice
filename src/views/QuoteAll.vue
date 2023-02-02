<template>
    <div class="AllQuote">
        comming soon - will show all quote.

        <div v-for="q in quotes" :key="q.id">
            <h2> {{ q.test_quote_number }}</h2>
        </div>
        
    </div>
</template>
    
    
<script>
export default {
    name: "AllQuote",
    data(){
        return{
            quotes: [
                {test_quote_number: 'Q-CMS0001', id: 1},
                {test_quote_number: 'Q-CMS0002', id: 2},
            ]
        }
    }
}
</script>