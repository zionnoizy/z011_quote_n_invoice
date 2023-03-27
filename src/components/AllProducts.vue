<template>

    <th>PRODUCT IN DATABASE:</th>
    <div class="d-flex justify-content-between">
      <div class="grid grid-cols-3 gap-3" style="display: flex; justify-content: center;">
        <div>
          <label>Search Product Name</label>
          <input type="text" v-model="mysearch" placeholder="search here.." />
        </div>
        <div> <button class="btn btn-primary " @click.prevent="getAllProductsNewest()">Sort From Oldest </button> </div>
        <div> <button class="btn btn-primary " @click.prevent="getAllProductsOldest()">Sort From Newest </button> </div>
      </div>
        
        
        
      </div>
        <!-- <button @click.prevent="ChangingProduct">EDIT ALL</button> -->
        <p>click eith one field on the table to edit, please type sometinhg on it otherwise will have a chance to hit a bug return '0'</p>
        <p>edit, search and, input cannot preform at the same time, please refresh the page if you do so.</p>
        <p> status: <strong> {{ statuss }}</strong> </p>
        <table class="table table-dark" id="store_to_excel" >
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
                <td contenteditable="true" data-field="p_category" :id= "`ep_category_${i}`"> {{ p.p_category }} </td>
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

export default{
    name: 'ProductAll',
    setup() {
        let statuss = ref("NO ANY CHANGE YET");

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
          console.log("handleFocusout: " + "updated_field" + updated_field +  tdText);


          var sortOrder = e.target.getAttribute("data-field");
          console.log("handleFocusout: " + sortOrder);
          if (sortOrder == "p_cost"){
            var dynamic1 = "ep_margin_"+i;
            var dynamic2 = "ep_sell_"+i;

            var margin = document.getElementById(dynamic1).innerText;
            var b = document.getElementById(dynamic2).innerText;

            var sell = +(tdText / 100) * +margin;

            console.log("update new sell?      " );

            var new_sell = Number(sell).toFixed(2);
            console.log("df?      " + df );
            const edit_this_product_col = firebase.firestore().collection("all_products");
            edit_this_product_col.doc(pid).update({
              [sortOrder] : tdText,

              "p_sell" : new_sell,
            }).then(function(){
              statuss = "UPDATED OK";
            }).catch(function(error) {
              console.log("DEBUG" + error);
              statuss = "ERROR!" + error;
            });


          }
          if (sortOrder == "p_margin"){
            var dynamic_0 = "ep_cost_"+i;
            var dynamic_2 = "ep_sell_"+i;

            var cost = document.getElementById(dynamic_0).innerText;
            var c = document.getElementById(dynamic_2).innerText;

            var sell = +(cost / 100) * +tdText;
            var new_sell = Number(sell).toFixed(2);
            const edit_this_product_col = firebase.firestore().collection("all_products");
            edit_this_product_col.doc(pid).update({
              
              [sortOrder] : tdText,
              "p_sell" : new_sell,
            }).then(function(){
              statuss = "UPDATED OK";
            }).catch(function(error) {
              console.log("DEBUG" + error);
              statuss = "ERROR!" + error;
            });


          
          
          }
          if (sortOrder == "p_hash"){
            console.log("Make Sure Hash MUST BE random and Unique digits different than other products to prevent data corruption;  20 digits recommand.");
            alert("Make Sure Hash MUST BE random and Unique digits different than other products to prevent data corruption;  20 digits recommand.");
            const edit_this_product_col = firebase.firestore().collection("all_products");
            edit_this_product_col.doc(pid).update({
              [sortOrder] : tdText,
            }).then(function(){
              this.statuss = "UPDATED OK";
            }).catch(function(error) {
              console.log("DEBUG" + error);
              this.statuss = "ERROR!" + error;
            });
          }
          else{
            console.log("here? ");
            const edit_this_product_col = firebase.firestore().collection("all_products");
            edit_this_product_col.doc(pid).update({
              [sortOrder] : tdText,
            }).then(function(){
              this.statuss = "UPDATED OK";
            }).catch(function(error) {
              console.log("DEBUG" + error);
              this.statuss = "ERROR!" + error;
            });
          }
          /*
          const edit_this_product_col = firebase.firestore().collection("all_products");
          edit_this_product_col.doc(pid).update({
            [sortOrder] : tdText,

          })
          */
        }

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
        statuss: 'NO ANY CHANGE YET',
        mysearch: '',
        }
    },
    computed:{
        currentPageItems(){
          return this.perguntas.slice(this.pageNumber*this.perpage, this.pageNumber*this.perpage+1+this.perpage)
        }
    },

    methods: {

      async getAllProductsNewest() { 
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

      async getAllProductsOldest() { 
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
    },
    computed: {
      f_all_products(){

        return this.all_products.filter(all_products => 
        all_products.p_fullname.toLowerCase().includes(this.mysearch.toLocaleLowerCase())
        );
      }
    },

    created() {

      this.getAllProductsNewest();
      
    },
}
/*
var editable_elements = document.querySelectorAll("[contenteditable]").forEach(function(el) 
{ 
  alert("You edit this field with index with data-field");
});
*/




</script>