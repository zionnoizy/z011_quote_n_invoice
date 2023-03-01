<template>
    <div class="AllQuote">



        <table class="table table-dark mx-auto" >

                    
        <thead>
          <tr class="table-header">

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
              
              <router-link 
                tag="tr"
                :to="{ name: 'OneQuote', params: { id: p.q_quote_number }}">

                  <td scope="col"  > {{ p.q_quote_number }} </td>
                  <td scope="col" > {{ p.q_invoice_number }} </td>
                  <td > {{ p.q_category }} </td>
                  <td > {{ p.q_ref }} </td>
                  <td > {{ p.q_po }} </td>
                  <td > {{ p.q_p1_fullname}} </td>

              </router-link>

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
          each_quote:{
            q_quote_number: null,
            q_invoice_number: null,
            q_category: null,
            q_ref: null,
            q_po: null,

            q_p1_fullname: "test999",
            q_quote_number: null,
            //useful in OneQuote
            q_entry_date: null,
            q_subtotal: null,
            q_vat: null,
            q_total: null,

            q_bill_fullname: null,
            q_bill_address1: null,
            q_bill_address2: null,
            q_bill_city: null,
            q_bill_postcode: null,

            q_ship_fullname: null,
            q_ship_address1: null,
            q_ship_address2: null,
            q_ship_city: null,
            q_ship_postcode: null,


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

                var each_quote = d.data();
                console.log("[getAllQuote] print1");
                this.all_quotes.push(each_quote);
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

<style>
table.table { width:auto;}
</style>