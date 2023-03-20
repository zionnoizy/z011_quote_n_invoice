<template>
    <div class="AllInvoice">
        
        <button class="btn btn-primary " @click.prevent="getAllInvoiceOldest()">Sort From Oldest Invoice </button>
        <button class="btn btn-primary " @click.prevent="getAllInvoiceNewest()">Sort From Newest Invoice </button>
        
        <input type="text" class="search_invoice_num" id="search_invoice_num" placeholder="Search from invoice number..." v-model="s_invoice_num" @input="searchI_N"/>

        <table class="table table-dark mx-auto" >

                    
            <thead>
            <tr class="table-header">
                <th scope="col"> QUOTE NUMBER </th>
                <th scope="col"> INVOICE NUMBER </th>
                <th scope="col"> CLIENT </th>
                <th scope="col"> REF </th>
                <th scope="col"> PO </th>
                <th scope="col"> ADDED DATE </th>


            </tr>
            </thead>

            <tbody>
                <tr v-for="i in include_search_all_invoice">
                <router-link 
                    tag="tr"
                    :to="{ name: 'OneInvoice', 
                    params: { id: i.obj_ref.qi_invoice_number, },
                    query: {this_one_i_hash_number: i.invoice_hashid, this_one_i_pdf_link: i.i_pdf_link}}">
                

                    <td scope="col" style="width: 150px;">  i.obj_ref.qi_quote_number  </td>
                    <td scope="col" style="width: 150px;"> {{ i.obj_ref.qi_invoice_number }} </td>   
                    <td scope="col" style="width: 150px;"> {{ i.obj_ref.qi_bill_fullname}} </td>
                    <td scope="col" style="width: 150px;"> {{ i.obj_ref.qi_ref}} </td>

                    <td scope="col" style="width: 150px;"> {{ i.obj_ref.qi_po}} </td>
                    <td scope="col" style="width: 200px;"> {{ i.obj_ref.qi_uploaded_date }} </td>
                </router-link>

                </tr>
                


            </tbody>

        </table> 
    </div>
</template>
    
    
    
<script>
import AllProducts from '../components/AllProducts.vue';
import { computed, onMounted, reactive, ref } from "vue";
export default {
    name: "AllInvoice",
    setup() {
      
      const include_search_all_invoice = reactive([]);

      onMounted(async () => {
        try {
            const type_filter = await firebase
              .firestore() 
              .collection("ALL_invoice")
              .orderBy("obj_ref.qi_uploaded_date_timestamp", "asc")
              .get();
              type_filter.forEach((doc) => {
                include_search_all_invoice.push(doc.data());
            });
        } catch (e) {
            console.log("Error Typing all_invoices" + e);
        }
          
      });
    
      return { include_search_all_invoice  };
    },
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
            All_invoice: [],

            s_invoice_num: '',
            include_search_all_invoice: [],
          }
        }
    },

    components: {},
    
    methods: {
      async getAllInvoiceNewest() { //not check yet
        var all_invoice_ref = await firebase.firestore().collection("ALL_invoice");
        all_invoice_ref.orderBy("obj_ref.qi_uploaded_date_timestamp", "asc")

          .onSnapshot((snapshot) => {
            this.all_quotes = [];
            snapshot.forEach(d => {


                var product = d.data();

                this.all_quotes.push(product);
            })
          })
      },
      async getAllInvoiceOldest() { 
        var all_invoice_ref = await firebase.firestore().collection("ALL_invoice");
        all_invoice_ref.orderBy("obj_ref.qi_uploaded_date_timestamp", "desc")
          .onSnapshot((snapshot) => {
            this.all_quotes = [];
            snapshot.forEach(d => {
                var product = d.data();

                this.all_quotes.push(product);
            })
          })
      },

      
      async getAllInvoice_Newest() { 

        var all_invoice_ref = await firebase.firestore().collection("ALL_invoice");
        all_invoice_ref.orderBy("obj_ref.qi_uploaded_date_timestamp", "asc")
        all_invoice_ref.onSnapshot(snap => {
            this.all_invoices = [];
            
            snap.forEach(i => {
                var e_invoice = i.data();
                
                this.all_invoices.push(e_invoice);
                console.log("e invoice" + this.all_invoices);
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

      async searchI_N(){
        console.log("search...")
        const typed_invoice_num = document.getElementById('search_invoice_num').value;
        var one_product_ref = await firebase.firestore().collection("ALL_invoice").where("obj_ref.qi_invoice_number", "==", typed_invoice_num);
            one_product_ref
            .get()
            .then((snapshot) => {
                this.include_search_all_invoice = [];
                snapshot.forEach(d => {
                    var one_inv = d.data();
                    this.include_search_all_invoice.push(one_inv);
                })
            })

      },
    },
    created() {
      //this.getAllInvoice_Newest();
    },
}
</script>