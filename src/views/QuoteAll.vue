<template>
    <div class="AllQuote">
        comming soon - will show all quote.


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
            <tr v-for="p in all_quotes">
                <td> {{ p.q_quote_number }} </td>
                <td> {{ p.q_invoice_number }} </td>
                <td> {{ p.q_category }} </td>
                <td> {{ p.q_ref }} </td>
                <td> {{ p.q_po }} </td>
                <td> {{ p.q_p1_fullname}} </td>
            </tr>
        
        </tbody>

        </table> 
        
    </div>
</template>
    
    
<script>
export default{
    name: 'ClientAll',
    setup() {},
    data(){
      
        return{
          all_quotes: [],
          quote:{
            q_quote_number: null,
            q_invoice_number: null,
            q_category: null,
            q_ref: null,
            q_po: null,

            q_p1_fullname: "test999",
            q_quote_number: null,

          }
        }
    },
    components: {},
    methods: {

      async getAllQuote() { 
        console.log("[getAllQuote]=====================");
        var all_quote_ref = await firebase.firestore().collection("ALL_quote");

        all_quote_ref.onSnapshot(snap => {
            this.all_quotes = [];
            
            snap.forEach(d => {

                var quote = d.data();
                console.log("[getAllQuote] print1");
                this.all_quotes.push(quote);
            });
        });

        console.log("[getAllQuote]=====================");
        
      },

      UpdateClient:function(msg){
        setDoc(doc(db, 'all_clients', msg.id),{
          text: msg.text,
          data: msg.data
        })
      },
      deleteClient(id){
        if (window.confirm("do you really want to delete? The system cannot undo.")){
          db.child(id).remove().then(() =>{
            alert("successully deleted.");
          }).catch((error) => {
            console.log(error);
          })
        }
      }

    },
    created() {
    this.getAllQuote();
    },
}
</script>