<template>
    <div class="AllQuote">

        <button class="btn btn-primary " @click.prevent="getAllQuoteNewest()">Sort From Oldest </button>
        <button class="btn btn-primary " @click.prevent="getAllQuoteOldest()">Sort From Newest </button>
        <!--if (this.selectedIndex)   onfocus="this.selectedIndex = 1;"-->
        <div class="mx-2 grid grid-cols-2 gap-1">
          <div>
          <select id="so_client" class="form-select" aria-label="select client from quote list below, and it will do sorting." @change="doSort1();" onfocus="this.selectedIndex = 1;">
          <option selected>Select Client Here</option>
          <option v-for="c in all_clients" :value="`${c.obj_ref.q_bill_fullname}`" > {{ c.obj_ref.q_bill_fullname }} </option>
          </select>
          </div>
          <div>
          <button class="btn btn-warning" @click.prevent="getAllQuoteOldest()"> Clear List </button>
        </div>
        </div>
        <table class="table table-dark mx-auto" >

                    
        <thead>
          <tr class="table-header">

            <th scope="col"> QUOTE NUMBER </th>
            <th scope="col"> INVOICE NUMBER </th>
            <th scope="col"> CLIENT </th>

            <th scope="col"> REF </th>
            <th scope="col"> PO </th>
            <th scope="col"> ADDED DATE </th>
            <th scope="col"> - </th>

          </tr>
        </thead>

        <tbody>

            <tr v-for="p in all_quotes">
              
              <router-link 
                tag="tr"
                :to="{ name: 'OneQuote', params: 
                
                { id: p.obj_ref.q_quote_number, 
                  //[that's a lot to pass]
                }, query: {this_one_q_hash_number: p.quote_hashid, this_one_q_pdf_link: p.q_pdf_link}}">

                  <td scope="col" style="width: 150px;"  > {{ p.obj_ref.q_quote_number }} </td>
                  <td scope="col" style="width: 150px;"> {{ p.obj_ref.q_invoice_number }}  </td>  <!--{{ p.q_invoice_number }}-->
                  <td scope="col" style="width: 150px;"> {{ p.obj_ref.q_bill_fullname}} </td>
                  <td scope="col" style="width: 150px;"> {{ p.obj_ref.q_ref }} </td> <!--{{ p.q_ref }}-->
                  <td scope="col" style="width: 150px;"> {{ p.obj_ref.q_po }} </td> <!--{{ p.q_po }}-->
                  <td scope="col" style="width: 200px;"> {{ p.obj_ref.q_uploaded_date }} </td>


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
          all_clients: [],
          each_quote:{

              q_quote_number: null,

            q_invoice_number: null,

            q_ref: null,
            q_po: null,

            q_p1_fullname: null,

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

            quote_hashid: null,
          }
        }
    },

    components: {},
    methods: {
      async getAllQuoteNewest() { //not check yet
        var all_product_ref = await firebase.firestore().collection("ALL_quote");
        all_product_ref.orderBy("obj_ref.q_uploaded_date_timestamp", "asc")

          .onSnapshot((snapshot) => {
            this.all_quotes = [];
            snapshot.forEach(d => {
                var product = d.data();

                this.all_quotes.push(product);
            })
          })
      },
      async getAllQuoteOldest() { 
        var all_product_ref = await firebase.firestore().collection("ALL_quote");
        all_product_ref.orderBy("obj_ref.q_uploaded_date_timestamp", "desc")
          .onSnapshot((snapshot) => {
            this.all_quotes = [];
            snapshot.forEach(d => {
                var product = d.data();

                this.all_quotes.push(product);
            })
          })
      },
      async getAllQuoteNClient() { 

        //console.log("[getAllQuote]=====================");
        var all_quote_ref = await firebase.firestore().collection("ALL_quote");

        all_quote_ref.onSnapshot(snap => {
            this.all_quotes = [];
            this.all_clients = [];
            snap.forEach(d => {

                var e_quote = d.data();
                var e_quote_cleint = d.data();

                this.all_quotes.push(e_quote);
                console.log(e_quote_cleint);
                //if(!all_clients.includes(e_quote_cleint))
                  this.all_clients.push(e_quote_cleint);
            });
        });

        //console.log("[getAllQuote]=====================");
        
      },

      async doSort1(){
        var optionValue = document.getElementById("so_client").value;
        console.log("sort list from choosen cleint: " + optionValue);
        var sort_client = await firebase.firestore().collection("ALL_quote").where("obj_ref.q_bill_fullname", "==", optionValue);
        sort_client.onSnapshot(snap => {
          this.all_quotes = [];
          snap.forEach(d => {
            
          var sort_quote = d.data();
          this.all_quotes.push(sort_quote);
          });
        })

      },

    },
    created() {
      this.getAllQuoteNClient();

    },
}
</script>

<style>
table.table { width:auto;}
</style>