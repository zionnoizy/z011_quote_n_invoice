<template>
    <div class="AllInvoice">
        
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
                <!--not exist yet! this_one_i_pdf_link-->
                <tr v-for="i in all_invoices">
                
                <router-link 
                    tag="tr"
                    :to="{ name: 'OneInvoice', 
                    params: { id: i.obj_ref.qi_invoice_number, },
                    query: {this_one_i_hash_number: p.invoice_hashid, this_one_i_pdf_link: p.q_pdf_link}}">

                    <td scope="col" style="width: 150px;"  > {{ i.obj_ref.qi_quote_number }} </td>
                    <td scope="col" style="width: 150px;"> INVOICE_NUMBER_HERE </td>  
                    <td scope="col" style="width: 150px;"> {{ i.obj_ref.qi_ref}} </td>
                    <td scope="col" style="width: 150px;"> REF_NUM_HERE </td> 
                    <td scope="col" style="width: 150px;"> {{ i.obj_ref.qi_po}} </td>
                    <td scope="col" style="width: 200px;"> {{ p.obj_ref.qi_uploaded_date }} </td>
                </router-link>

                </tr>



            </tbody>

        </table> 

    </div>
</template>
    
    
    
<script>
export default {
    name: "AllInvoice",
    setup() {},
    data(){
      
        return{
          all_invoices: [],
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

      
      async getAllInvoice_Newest() { 

        var all_invoice_ref = await firebase.firestore().collection("ALL_invoice");
        //all_invoice_ref.orderBy("obj_ref.qi_uploaded_date_timestamp", "asc")
        all_invoice_ref.onSnapshot(snap => {
            this.all_invoices = [];
            
            snap.forEach(i => {
                var each_invoice = i.data();
                
                this.all_invoices.push(each_invoice);
            });
        });

        
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
    },
    created() {
      this.getAllInvoice_Newest();
    },
}
</script>