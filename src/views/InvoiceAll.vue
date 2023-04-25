<template>
    <div class="AllInvoice">
        

      <div class="mx-2 grid grid-cols-5 gap-3" style="display: flex; justify-content:center;">
          <div>
            <button class="btn btn-primary " @click.prevent="getAllInvoiceNewest()">Sort From Newest </button>
          </div>
          <div>
            <button class="btn btn-primary " @click.prevent="getAllInvoiceOldest()">Sort From Oldest </button>
          </div>

          <div>
            <select id="so_client" class="form-select" aria-label="select client from quote list below, and it will do sorting." 
            @change="doSort2();" onfocus="this.selectedIndex = 1;">
              <option selected>Select Client Here</option>
              <option v-for="c in all_clients" :value="`${c}`"  > {{ c }} </option>
            </select>
          </div>
          <div>
            <label>Search Invoice Number</label>
            <input id="search_in" type="text" v-model="myIsearch" placeholder="ex. I-CMS00032" />
          </div>
          <div>
            <button class="btn btn-warning" @click.prevent="ResetNgetAllInvoiceNewest()"> Clear Searched List </button>
          </div>
      </div>

      <figcaption class="blockquote-footer">
          <p> Point to the "Text", and it will redirect to invoice page. </p>
      </figcaption>

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

            <tbody >
                
                <tr   v-for="i in f_all_invoices.slice(0, (page + 1) * perPage)">
                    <td scope="col" style="width: 150px;"> 
                    <router-link 
                    tag="tr"
                    :to="{ name: 'OneInvoice', 
                    params: { id: i.obj_ref.qi_invoice_number, },
                    query: {this_one_i_hash_number: i.invoice_hashid, this_one_i_pdf_link: i.i_pdf_link}}">
                    {{ i.obj_ref.qi_quote_number}}  
                    </router-link>
                    </td>
                    <td scope="col" style="width: 150px;"> 
                      <router-link 
                      tag="tr"
                      :to="{ name: 'OneInvoice', 
                      params: { id: i.obj_ref.qi_invoice_number, },
                      query: {this_one_i_hash_number: i.invoice_hashid, this_one_i_pdf_link: i.i_pdf_link}}">
                      {{ i.obj_ref.qi_invoice_number }}
                      </router-link>
                    </td>   
                    <td scope="col" style="width: 150px;"> 
                      <router-link 
                      tag="tr"
                      :to="{ name: 'OneInvoice', 
                      params: { id: i.obj_ref.qi_invoice_number, },
                      query: {this_one_i_hash_number: i.invoice_hashid, this_one_i_pdf_link: i.i_pdf_link}}">
                      {{ i.bill_ship.qi_bill_fullname }} 
                    </router-link>
                    </td>
                    <td scope="col" style="width: 150px;"> 
                      <router-link 
                      tag="tr"
                      :to="{ name: 'OneInvoice', 
                      params: { id: i.obj_ref.qi_invoice_number, },
                      query: {this_one_i_hash_number: i.invoice_hashid, this_one_i_pdf_link: i.i_pdf_link}}">
                      {{ i.obj_ref.qi_ref}} 
                      </router-link>
                    
                    </td>

                    <td scope="col" style="width: 150px;"> 
                      <router-link 
                      tag="tr"
                      :to="{ name: 'OneInvoice', 
                      params: { id: i.obj_ref.qi_invoice_number, },
                      query: {this_one_i_hash_number: i.invoice_hashid, this_one_i_pdf_link: i.i_pdf_link}}">
                      {{ i.obj_ref.qi_po}} 
                      </router-link>
                    </td>
                    <td scope="col" style="width: 200px;"> 
                      <router-link 
                      tag="tr"
                      :to="{ name: 'OneInvoice', 
                      params: { id: i.obj_ref.qi_invoice_number, },
                      query: {this_one_i_hash_number: i.invoice_hashid, this_one_i_pdf_link: i.i_pdf_link}}">
                      {{ i.obj_ref.qi_uploaded_date }} 
                      </router-link>
                    
                    </td>

                    <!-- <td scope="col" style="width: 200px;"> 
                      <router-link 
                      tag="tr"
                      :to="{ name: 'OneInvoice', 
                      params: { id: i.obj_ref.qi_invoice_number, },
                      query: {this_one_i_hash_number: i.invoice_hashid, this_one_i_pdf_link: i.i_pdf_link}}">
                      {{ i.i_pdf_link }} 
                    </router-link>
                    </td> -->
                
                  
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
      
      const all_invoice = reactive([]);

      onMounted(async () => {
        try {
            const type_filter = await firebase
              .firestore() 
              .collection("ALL_invoice")
              .orderBy("obj_ref.qi_uploaded_date_timestamp", "asc")
              .get();
              type_filter.forEach((doc) => {
                all_invoice.push(doc.data());
            });
        } catch (e) {
            console.log("Error Typing all_invoices" + e);
        }
          
      });
    
      return { all_invoice  };
    },
    data(){
      
      return{
        myIsearch: '',
        all_invoices: [],
        f_all_invoices: [],
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
          All_invoice: [],

          s_invoice_num: '',
          all_invoice: [],
          all_i_clients: [],
          
        },

        page: 0,
        perPage: 10,
        
      }
    },

    components: {},
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
     
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      async getAllInvoiceOldest() { //not check yet
        var all_invoice_ref = await firebase.firestore().collection("ALL_invoice");
        all_invoice_ref.orderBy("obj_ref.qi_uploaded_date_timestamp", "asc")

          .onSnapshot((snapshot) => {
            this.all_invoices = [];
            snapshot.forEach(d => {
                var o_invoice = d.data();
                this.all_invoices.push(o_invoice);
            })
          })
      },
      async getAllInvoiceNewest() { 
        var all_invoice_ref = await firebase.firestore().collection("ALL_invoice");
        all_invoice_ref.orderBy("obj_ref.qi_uploaded_date_timestamp", "desc")
          .onSnapshot((snapshot) => {
            this.all_invoices = [];
            snapshot.forEach(d => {
                var o_invoice = d.data();
                this.all_invoices.push(o_invoice);
            })
          })
      },
      async getAllInvoice_Newest() { 
        var all_invoice_ref = await firebase.firestore().collection("ALL_invoice");
        all_invoice_ref.orderBy("obj_ref.qi_uploaded_date_timestamp", "asc")
        all_invoice_ref.onSnapshot(snap => {
          this.all_invoices = [];
          this.all_clients = [];

          snap.forEach(i => {
            var n_invoice = i.data();
            var n_invoice_cleint = i.data();
            this.all_invoices.push(n_invoice);
            console.log("print1");
            console.log("ipad2    " + n_invoice_cleint.bill_ship.qi_bill_fullname);
            
            if(!this.all_clients.includes(n_invoice_cleint.bill_ship.qi_bill_fullname))
              this.all_clients.push(n_invoice_cleint.bill_ship.qi_bill_fullname);
            
          });
        });

        
      },

      async getAllQuoteOldest() { 
        var all_product_ref = await firebase.firestore().collection("ALL_quote");
        all_product_ref.orderBy("obj_ref.q_uploaded_date_timestamp", "desc")
          .onSnapshot((snapshot) => {
            this.all_invoices = [];
            snapshot.forEach(d => {
                var product = d.data();

                this.all_invoices.push(product);
            })
          })
      },
      async ResetNgetAllInvoiceNewest(){

        document.getElementById("search_in").value= "";  
        document.getElementById("so_client").selectedIndex = 0;


        var all_invoice_ref = await firebase.firestore().collection("ALL_invoice");
        all_invoice_ref.orderBy("obj_ref.qi_uploaded_date_timestamp", "desc")
          .onSnapshot((snapshot) => {
            this.all_invoices = [];
            snapshot.forEach(d => {
                var o_invoice = d.data();

                this.all_invoices.push(o_invoice);
            })
          })
      },
      async searchI_N(){
        console.log("search...")
        const typed_invoice_num = document.getElementById('search_invoice_num').value;
        var one_product_ref = await firebase.firestore().collection("ALL_invoice").where("obj_ref.qi_invoice_number", "==", typed_invoice_num);
            one_product_ref.get()
            .then((snapshot) => {
                this.all_invoices = [];
                this.all_quotes = [];

                
                snapshot.forEach(d => {
                    var one_inv = d.data();
                    this.all_invoices.push(one_inv);
                })
            })

      },
      async doSort2(){
        var optionValue = document.getElementById("so_client").value;

        var sort_client = await firebase.firestore().collection("ALL_invoice").where("obj_ref.qi_bill_fullname", "==", optionValue);
        sort_client.onSnapshot(snap => {
          this.all_invoices = [];
          snap.forEach(d => {

            var sort_invoice= d.data();
            this.all_invoices.push(sort_invoice);
          
          });
        })

      },
      handleScroll() {
          const bottomOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight
          if (bottomOfPage) {
            this.perPage += 10
          }
      },
    },
    computed: {
      currentPageItems(){
        return this.f_all_invoices.slice(this.pageNumber*this.perpage,this.pageNumber*this.perpage+1+this.perpage);
      },

      f_all_invoices(){
        return this.all_invoices.filter(all_invoices => 

          all_invoices.obj_ref.qi_invoice_number.toLowerCase().includes(this.myIsearch.toLocaleLowerCase())
          
        );

      }
    },
    created() {
      this.getAllInvoice_Newest();
    },
}
</script>