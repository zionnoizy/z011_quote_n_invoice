<template>
    <div class="AllQuote">

        
        
        <!--if (this.selectedIndex)   onfocus="this.selectedIndex = 1;"-->
        <div class="mx-2 grid grid-cols-6 gap-3 mb-2" style="display: flex; justify-content:center;">
          <div>
            <button class="btn btn-primary " @click.prevent="getAllQuoteNewest()">Sort From Newest </button>
          </div>

          <div>
            <button class="btn btn-primary " @click.prevent="getAllQuoteOldest()">Sort From Oldest </button>
          </div>

          <div>
            <button class="btn btn-primary " @click.prevent="getExistInvoice()">Invoice Number Exist </button>
          </div>

          <div>
          <select id="so_client" class="form-select" aria-label="select client from quote list below, and it will do sorting." 
          @change="doSort1();" onfocus="this.selectedIndex = 1;">
            <option selected>Select Client Here</option>
            <option v-for="c in all_clients" :value="`${c}`" > {{ c }} </option>
          </select>
          </div>


          <div>
          <label>Search Quote Number</label>
            <input id="search_qn" type="text" v-model="myQsearch" placeholder="ex. Q-CMS00042" />
          </div>


          <div>
          <button class="btn btn-warning" @click.prevent="ResetNgetAllQuoteOldest()"> Clear Searched List </button>
          </div>
        </div>


        <table class="table table-dark mx-auto" >         
        <thead>
          <tr class="table-header">

            <th scope="col" style="text-decoration:underline;">QUOTE NUMBER</th>
            <th scope="col"> INVOICE NUMBER </th>
            <th scope="col"> CLIENT </th>

            <th scope="col"> REF </th>
            <th scope="col"> PO </th>
            <th scope="col"> ADDED DATE </th>
            <th scope="col"> - </th>

          </tr>
        </thead>

        <tbody>

            <tr v-for="p in f_all_quotes.slice(0, (page + 1) * perPage)">
              
              <td scope="col" style="width: 150px;"> 
                <router-link 
                tag="tr"
                :to="{ name: 'OneQuote', 
                params: 
                { id: p.obj_ref.q_quote_number, 
                  //[that's a lot to pass]
                }, query: { this_one_q_hash_number: p.quote_hashid, this_one_q_pdf_link: p.q_pdf_link}}">
                
                
                {{ p.obj_ref.q_quote_number }} 
                </router-link>
              
              </td>

              <td scope="col" style="width: 150px;"> 
                <router-link 
                tag="tr"
                :to="{ name: 'OneQuote', 
                params: 
                { id: p.obj_ref.q_quote_number, 
                  //[that's a lot to pass]
                }, query: { this_one_q_hash_number: p.quote_hashid, this_one_q_pdf_link: p.q_pdf_link}}">
                
                {{ p.obj_ref.q_invoice_number }}  
                </router-link>
              </td>  <!--{{ p.q_invoice_number }}-->
              
              <td scope="col" style="width: 150px;"> 
                <router-link 
                tag="tr"
                :to="{ name: 'OneQuote', 
                params: 
                { id: p.obj_ref.q_quote_number, 
                  //[that's a lot to pass]
                }, query: { this_one_q_hash_number: p.quote_hashid, this_one_q_pdf_link: p.q_pdf_link}}">
                
                {{ p.bill_ship.q_bill_fullname}} 
                </router-link>
              </td>

              <td scope="col" style="width: 150px;"> 
                <router-link 
                tag="tr"
                :to="{ name: 'OneQuote', 
                params: 
                { id: p.obj_ref.q_quote_number, 
                  //[that's a lot to pass]
                }, query: { this_one_q_hash_number: p.quote_hashid, this_one_q_pdf_link: p.q_pdf_link}}">
                
                {{ p.obj_ref.q_ref }} 
                </router-link>
              </td> <!--{{ p.q_ref }}-->

              <td scope="col" style="width: 150px;"> 
                <router-link 
                tag="tr"
                :to="{ name: 'OneQuote', 
                params: 
                { id: p.obj_ref.q_quote_number, 
                  //[that's a lot to pass]
                }, query: { this_one_q_hash_number: p.quote_hashid, this_one_q_pdf_link: p.q_pdf_link}}">
                {{ p.obj_ref.q_po }} 
                </router-link>
              </td> <!--{{ p.q_po }}-->

              <td scope="col" style="width: 200px;"> 
                <router-link 
                tag="tr"
                :to="{ name: 'OneQuote', 
                params: 
                { id: p.obj_ref.q_quote_number, 
                  //[that's a lot to pass]
                }, query: { this_one_q_hash_number: p.quote_hashid, this_one_q_pdf_link: p.q_pdf_link}}">
                
                {{ p.obj_ref.q_uploaded_date }} 
                {{ p.quote_hashid }}
                </router-link>
              </td>
              <!-- <td scope="col" style="width: 200px;"> {{ p.q_pdf_link }} </td> -->
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
          f_all_quotes: [],
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
            
          },
          myQsearch: '',
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
      async getAllQuoteNewest() { //not check yet
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
      async getAllQuoteOldest() { 
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

      async getExistInvoice() { 
        var all_product_ref = await firebase.firestore().collection("ALL_quote");

        all_product_ref.orderBy("obj_ref.q_uploaded_date_timestamp", "desc")
          .onSnapshot((snapshot) => {
            this.all_quotes = [];
            snapshot.forEach(d => {
                var product = d.data();
                console.log("d.data().obj_ref.q_invoice_number?" + d.data().q_invoice_number);
                if(d.data().obj_ref.q_invoice_number != "")
                  this.all_quotes.push(product);
            })
          })

      },
      async ResetNgetAllQuoteOldest(){

        document.getElementById("search_qn").value= "";  
        document.getElementById("search_qn").text = "";
        document.getElementById("so_client").selectedIndex = 0;

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
      async getAllQuoteNClient() { 

        //console.log("[getAllQuote]=====================");
        var all_quote_ref = await firebase.firestore().collection("ALL_quote");
        all_quote_ref.orderBy("obj_ref.q_uploaded_date_timestamp", "desc")
        .onSnapshot(snap => {
            this.all_quotes = [];
            this.all_clients = [];
            snap.forEach(d => {

                var e_quote = d.data();
                var e_quote_cleint = d.data();

                this.all_quotes.push(e_quote);

                if(! this.all_clients.includes(e_quote_cleint.bill_ship.q_bill_fullname))
                  this.all_clients.push(e_quote_cleint.bill_ship.q_bill_fullname);
            });
        });
        //console.log("[getAllQuote]=====================");
      },

      async doSort1(){
        var optionValue = document.getElementById("so_client").value;
        
        if (optionValue !== "Select Client Here"){
          console.log("sort list from choosen cleint: " + optionValue);
          var sort_client = await firebase.firestore().collection("ALL_quote").where("bill_ship.q_bill_fullname", "==", optionValue);
          sort_client.onSnapshot(snap => {
            this.all_quotes = [];
            snap.forEach(d => {
              
            var sort_quote = d.data();
            this.all_quotes.push(sort_quote);
            });
          })
        }
        else{
          this.getAllQuoteNClient();
        }

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
        return this.f_all_quotes.slice(this.pageNumber * this.perpage,this.pageNumber*this.perpage+1+this.perpage);
      },
      f_all_quotes(){
        return this.all_quotes.filter(all_quotes => 
          all_quotes.obj_ref.q_quote_number.toLowerCase().includes(this.myQsearch.toLocaleLowerCase())
        );

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