<template>
    <div class="AllQuote">
        comming soon - will show all quote.

        <div v-for="q in quotes" :key="q.id">
            <h2> {{ q.test_quote_number }}</h2>
        </div>

        <table class="table table-dark" >

                    
        <thead>
        <tr>
        <th scope="col"> QUOTE NUMBER </th>
        <th scope="col"> INVOICE NUMBER </th>
        <th scope="col"> CLIENT </th>

        <th scope="col"> REF </th>
        <th scope="col"> PO </th>
        <th scope="col"> - </th>
        </tr>
        </thead>
        <tbody>
        <tr>



        </tr>


        <tr  v-for="p in quotes">
            <td> {{ p.test_quote_number }} </td>
            <td> {{ p.id }} </td>
        </tr>
        
        </tbody>

        </table> 
        
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