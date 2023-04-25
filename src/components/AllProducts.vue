<template>


    <div class="mx-7">

      <div class="grid grid-cols-4 gap-3 mx-auto" style="display: flex; justify-content: center;">

        <div>
          <label>Search Product Name</label>
          <input type="text" class="form-control" v-model="mysearch" placeholder="search here.." />
        </div>

        <div>
          <label>Search Product Name</label>
          <select :id= "`ep_category_${i}`" class="my-3 form-select form-select bg-dark text-white" data-field="p_category" v-model="myselectedcategory">
            <option selected>Find Product Category..</option>
            <option   v-for="c in all_category" :value="`${c.category_fullname}`" > {{c.category_fullname}} </option>
          </select>
        </div>

        <div> <button id="sort_oldest" class=" btn btn-primary  mx-1" @click.prevent="getAllProductsNewest()">Sort From Oldest </button> </div>
        <div> <button id="sort_newest" class=" btn btn-primary  mx-1" @click.prevent="getAllProductsOldest()">Sort From Newest </button> </div>
      
        <div> <button class="btn btn-success" @click="exportToExcel()">SAVE TO EXCEL</button> </div>
      </div>
        
        
      {{statuss}}
      </div>
        <!-- <button @click.prevent="ChangingProduct">EDIT ALL</button> -->
        
         status: <strong> <p ref="statuss"> {{statuss.value}} </p></strong>
        <table class="table table-dark" id="my_table" >
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Code</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>

            <th scope="col">&#163; Cost</th>
            <th scope="col">Margin &percnt;</th>
            <th scope="col">Sell</th>
            <th scope="col">Hash</th>
            </tr>
            </thead>
            <tbody>
            <tr>



            </tr>
            <tr id="list_of_productss" v-for="p, i in f_all_products" @blur="handleBlur" @focusout="handleFocusout( $event,  p.pid, data-field, i   )">
                
                <td style="color: grey;"> {{i}} </td>
                <td contenteditable="true" data-field="p_code" :id= "`ep_code_${i}`" > {{ p.p_code }} </td>
                <td contenteditable="true" data-field="p_fullname" :id= "`ep_fn_${i}`" > {{ p.p_fullname }} </td>
                <td> {{ p.p_category }} 
                  <td contenteditable="true"  > 
                  <select :id= "`ep_category_${i}`" class="form-select form-select bg-dark text-white" data-field="p_category">
                    <option selected>Re-Select Category</option>
                    <option   v-for="c in all_category" :value="`${c.category_fullname}`" > {{c.category_fullname}} </option>
                  </select>
                  </td>
                </td> 
                
                <td contenteditable="true" data-field="p_cost" :id= "`ep_cost_${i}`" > {{ p.p_cost }} </td>
                <td contenteditable="true" data-field="p_margin" :id= "`ep_margin_${i}`" > {{ p.p_margin }} </td>
                <td contenteditable="true" data-field="p_sell" :id= "`ep_sell_${i}`" disabled> {{ p.p_sell }} </td>
                <td contenteditable="true" data-field="p_hash" :id= "`ep_hash_${i}`" > {{ p.pid }} </td>
            </tr>
            </tbody>

        </table>  

        
        <figure class="text-center">
          <blockquote class="blockquote">
            <p>option2: EXPORT + IMPORT, Please refer to 
              <a class="font-weight-bold" style="text-decoration:underline; "  target="_blank"
              href="https://rowy.app/p/quote-n-invoice/table/allProducts#searchPage=0">this link</a> 
               . Login in as CMS IT gmail. </p>
          </blockquote>
          <figcaption class="blockquote-footer">
             <cite title="Source Title"> </cite>
          </figcaption>
        </figure>
</template>

<script>
import ProductAdd from "@/components/ProductAdd.vue";
import { orderBy, query } from "@firebase/firestore";
import { serverTimestamp } from 'firebase/firestore';
import { onMounted, ref, reactive } from "vue";

//import * as XLSX from 'vue3-xlsx'
import * as XLSX from 'xlsx';
export default{
    name: 'ProductAll',
    setup() {
      const statuss = ref('');


        onMounted(async () => {

          let el = document.getElementsByClassName('list_of_productss');
          for(var i = 0; i< el.length; i++) {
            el[i].addEventListener('focusout', function(e) {
              //how to know which id I am typing for i here
              console.log("product_things changed: " + e.target.id);
            });      
          }
            

        });
        
        const handleBlur = (e) => {
          console.log("handleBlur: " + e.target.id)


        }


        const handleFocusout = (e, pid, df, i) => {
          
          console.log("handleFocusout: " + e.target.id + "   pid= " + pid + " data-field=" + df );

          var updated_field = document.getElementById(e.target.id);
          var tdText = updated_field.innerText
          console.log("handleFocusout: " + "updated_field " + updated_field + "//" + tdText);


          var sortOrder =  e.target.getAttribute("data-field");
          var real_df = sortOrder.toString();
          console.log("handleFocusout:  " + typeof sortOrder.toString());
          
          if (real_df == "p_cost"){
            var dynamic0 = "ep_cost_"+i;
            var dynamic1 = "ep_margin_"+i;
            var dynamic2 = "ep_sell_"+i;
            var cost = document.getElementById(dynamic0).innerText;
            var margin = document.getElementById(dynamic1).innerText;
            var b = document.getElementById(dynamic2).innerText;

            var sell = +(tdText / 100) * +margin;
            var tmp_ans = +cost + +sell;
            console.log("update new sell?      " );

            var new_sell = Number(tmp_ans).toFixed(2);
            console.log("df?      " + df );
            const edit_this_product_col = firebase.firestore().collection("all_products");
            edit_this_product_col.doc(pid).update({
              [sortOrder] : tdText,

              "p_sell" : new_sell,
            }).then(function(){
              statuss.value = "UPDATED " + sortOrder + " OK.";

            }).catch(function(error) {
              console.log("DEBUG" + error);
              statuss.value = "ERROR! " + error;
            });


          }
          if (sortOrder == "p_margin"){
            var dynamic_0 = "ep_cost_"+i;
            var dynamic_2 = "ep_sell_"+i;

            var cost = document.getElementById(dynamic_0).innerText;
            var c = document.getElementById(dynamic_2).innerText;

            var sell = +(cost / 100) * +tdText;
            var tmp_ans = +cost + +sell;
            var new_sell = Number(tmp_ans).toFixed(2);

            const edit_this_product_col = firebase.firestore().collection("all_products");
            edit_this_product_col.doc(pid).update({
              
              [sortOrder] : tdText,
              "p_sell" : new_sell,
            }).then(function(){
              statuss.value = "UPDATED"  + sortOrder + " OK.";
            }).catch(function(error) {
              console.log("DEBUG" + error);
              statuss.value = "ERROR! " + error;
            });


          
          
          }
          if (sortOrder == "p_hash"){
            console.log("Make Sure Hash MUST BE random and Unique digits different than other products to prevent data corruption;  20 digits recommand.");
            alert("Make Sure Hash MUST BE random and Unique digits different than other products to prevent data corruption;  20 digits recommand.");
            const edit_this_product_col = firebase.firestore().collection("all_products");
            edit_this_product_col.doc(pid).update({
              [sortOrder] : tdText,
            }).then(function(){
              statuss.value = "UPDATED"  + sortOrder + " OK.";

            }).catch(function(error) {
              console.log("DEBUG" + error);
              statuss.value = "ERROR! " + error;
            });
          }
          if (real_df == "p_category"){

            const dynamic = "ep_category_"+i;
            const pcategory = document.getElementById(dynamic).value;

            console.log("selected category?  " + pcategory);

              document.getElementById(e.target.id).style.background='#990000';

            const edit_this_product_col = firebase.firestore().collection("all_products");

            edit_this_product_col.doc(pid).update({
              [sortOrder] : pcategory,
            }).then(function(){

              statuss.value = "UPDATED CATEGORY"  + sortOrder + " OK.";

            }).catch(function(error) {

              console.log("DEBUG" + error);
              statuss.value = "ERROR! " + error;
            });
          
          }
          else{
            console.log("here? ");
            const edit_this_product_col = firebase.firestore().collection("all_products");
            edit_this_product_col.doc(pid).update({
              [sortOrder] : tdText,
            }).then(function(){
              
              statuss.value = "UPDATED"  + sortOrder + " OK.";
              console.log("statuss   " + statuss + " " + statuss.value);

            }).catch(function(error) {
              console.log("DEBUG" + error);
              statuss.value = "ERROR! " + error;
            });
          }
          /*
          const edit_this_product_col = firebase.firestore().collection("all_products");
          edit_this_product_col.doc(pid).update({
            [sortOrder] : tdText,

          })
          */
        }
        //, statuss
        return { handleBlur, handleFocusout, statuss };
    },
    data(){
        return{
          all_products: [],
          product:{

              p_code: null,
              p_fullname: null,
              p_category: null,
              p_cost: null,
              p_margin: null,
              p_sell: null,

          },
          //statuss: 'NOTHING CHANGE',
          mysearch: '',
          myselectedcategory: '',
          all_category: [],
        }
    },
    mounted() {
    const btn = document.getElementById("sort_newest");
    if (btn) {
      btn.disabled = true;
    }
    },
    computed:{
        currentPageItems(){
          return this.perguntas.slice(this.pageNumber*this.perpage, this.pageNumber*this.perpage+1+this.perpage)
        }
    },

    methods: {

      async getAllProductsOldest() { 
        var btn_o = await document.getElementById("sort_oldest");
        var btn_n = await document.getElementById("sort_newest");
        if (btn_o) {
        btn_o.disabled = true;
        }
        if (btn_n){
        btn_n.disabled = false;
        }

        var all_product_ref = await firebase.firestore().collection("all_products");
        all_product_ref.orderBy("p_insert_date", "asc")

          .onSnapshot((snapshot) => {
            this.all_products = [];
            snapshot.forEach(d => {


                var product = d.data();

                this.all_products.push(product);
            })
          })

        var lastThreeRes = await all_product_ref.orderBy('p_insert_date', 'asc').limit(3).get();

        
      },

      async getAllProductsNewest() { 
        var btn_n = await document.getElementById("sort_newest");
        var btn_o = await document.getElementById("sort_oldest");
        if (btn_n) 
        btn_n.disabled = true;
        if (btn_o) 
        btn_o.disabled = false;

        var all_product_ref = await firebase.firestore().collection("all_products");
        all_product_ref.orderBy("p_insert_date", "desc")
          .onSnapshot((snapshot) => {
            this.all_products = [];
            snapshot.forEach(d => {
                var product = d.data();

                this.all_products.push(product);
            })
          })
      },

      UpdateClient:function(msg){
        setDoc(doc(db, 'all_products', msg.id),{
          text: msg.text,
          data: msg.data
        })
      },
      deleteClient(id){
        if (window.confirm("do you really want to delete? The system cannot undo.")){
          db.child(id).remove().then(() =>{
            alert("successully deleted.");
          }).catch((error) => {
            //console.log(error);
          })
        }
      },
      ChangingProduct(){
        

      },
      to_excel(tableID){

        var dataType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById(tableID);
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

        // Create download link element
        console.log(tableSelect);

        const myTimestamp = firebase.firestore.Timestamp.now();
        let today = myTimestamp.toDate().toLocaleDateString("en-UK");    

        let filename = "QuoteIn_Product_" + today;
        let downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        
        if(navigator.msSaveOrOpenBlob){
            var blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob( blob, filename);

        }else{

            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
            downloadLink.download = filename;
            downloadLink.click();

        }
      },

      async getAllCategory(){
        var all_client_ref = await firebase.firestore().collection("all_categories");
          all_client_ref.onSnapshot(snap => {
              this.all_category = [];

              snap.forEach(d => {

                  var c = d.data();
                  
                  this.all_category.push(c);

              });
          });
      },
      async sortProductsByCategory(selectedCategory) {
        
        const productsRef = firebase.firestore().collection('all_products');

        let query = productsRef;

        if (selectedCategory) {
          query = query.where('p_category', '===', selectedCategory);
        }
        query = query.orderBy('p_fullname');

        const snapshot = await query.get();
        const sortedProducts = snapshot.docs.map(doc => doc.data());
        
        return sortedProducts;
      },
      async exportToExcel() {
        const table = document.getElementById('my_table')
        // Get the table data
        const data = []
        const rows = table.rows

        for (let i = 0; i < rows.length; i++) {
          const row = []
          const cells = rows[i].cells

          for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];

            

            if (!cells[j].textContent.includes('Re-Select') ) {
              console.log("cell.nodeName:" + cell.textContent );

              row.push(cells[j].textContent);
            }
          }

          data.push(row)
        }

        // Format the data (if necessary)

        // Create the worksheet
        const worksheet = XLSX.utils.json_to_sheet(data)

        // Create the workbook
        const workbook = XLSX.utils.book_new()

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

        // Write the Excel file and trigger the download
        XLSX.writeFile(workbook, 'table_data.xlsx')
      },
    },
    computed: {
      f_all_products(){
        let filteredProducts = this.all_products;

        if (this.myselectedcategory) {
          filteredProducts =  this.all_products.filter(all_products => 
          all_products.p_category.toLowerCase() === this.myselectedcategory.toLowerCase());
          console.log("sort category");

        }
        
        if (this.mysearch) {
          filteredProducts =  this.all_products.filter(all_products => 
          all_products.p_fullname.toLowerCase().includes(this.mysearch.toLocaleLowerCase()));
         
        }
        /*
        if (this.mysearch)
          return this.all_products.filter(all_products => 
          all_products.p_fullname.toLowerCase().includes(this.mysearch.toLocaleLowerCase())
        
        );
        */
       return filteredProducts;
      }
    },

    created() {

      this.getAllProductsNewest();
      this.getAllCategory();
      
    },
} 
/*
var editable_elements = document.querySelectorAll("[contenteditable]").forEach(function(el) 
{ 
  alert("You edit this field with index with data-field");
});
*/




</script>