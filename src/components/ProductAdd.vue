<template>
  <!--this page is components only-->
  <div class="ProductAdd">
      <p class="pb-2">= Purpose: User can ADD + UPDATE + DELETE products they created, all products will reflect on quote pages </p>
      <p class="pb-20">= *The Sell Will Auto-Generate After Typing Cost & Margin Sessions. </p>

      <form @sumbit.prevent="addProduct">

        <table class="table table-dark" >
          <thead>
            <tr>
              <th scope="col">[Add/ Delete]</th>
              <th scope="col">[Code#]</th>
              <th scope="col">[Name]</th>
              <th scope="col">[Catagory]</th>
              <th scope="col">[&#163; Product Cost]</th>
              <th scope="col">[Product Margin &percnt;]</th>
              <th scope="col">[= *Product Sell]</th>
            </tr>
          </thead>

          <tbody>
              <tr>
              <th scope="row">
                <div><button class="btn btn-info"   @click.prevent="createProduct" > [+] </button> </div>
              </th>


              <td> <input ref="p_code" placeholder="Product Code" id="pi_code" required/> </td>
              <td> <input ref="p_enter" placeholder="Item Name" id="pi_name" required/> </td>
              <td> <input ref="p_category" placeholder="Product Category" id="pi_catrgory" required/> </td>
              <td> <input ref="p_cost" placeholder="Product Cost (digit only)" id="pi_cost" v-on:keypress="NumbersOnly" @input="CalculateSell" required /> </td>
              <td> <input ref="p_margin" placeholder="Product Margin (digit only)" id="pi_margin" onkeypress='return event.charCode >= 48 && event.charCode <= 57' @input="CalculateSell" required /> </td>
              <td> <input ref="p_sell" placeholder="Product Sell" id="pi_sell" @input="CalculateSell" disabled/> </td>

            </tr>

            
            <tr>
              <th scope="row">-</th>
              <td>Example1</td>
              <td>Example2</td>
              <td >Example3</td>
            </tr>
          
        </tbody>
        </table>


        
      </form>
      <!---------------------------------->
      

  </div>
</template>


<script>
import { db, auth, increment, admin } from "@/firebase.js";
import { collection, addDoc, DocumentSnapshot } from "firebase/firestore";
import { ref } from 'vue';
import { serverTimestamp } from 'firebase/firestore';

export default{
  name: 'ProductAdd',
  
  components: {},
  methods:{
    
    async createProduct(){

      validate_p_input();
      console.log("[ProductAdd-createProduct] create new Category.");
      

        console.log("[ProductAdd-createProduct] create new product");

        const db_id = firebase.firestore();
        const get_id = db_id.collection('all_products').doc();
        const p_id = get_id.id;


        
        console.log("[ProductAdd-createProduct] id. " + p_id);


        //const increment = firebase.firestore.FieldValue.increment(1);
        //UPDATE: https://saveyourtime.medium.com/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b
        const ref = collection(db, 'all_products'); //how to add sepcific id
        let aaaaaaaaa;

        const obj_ref = {
          p_code: this.$refs.p_code.value,
          p_fullname: this.$refs.p_enter.value,
          p_category: this.$refs.p_category.value,
          p_cost: this.$refs.p_cost.value,
          p_margin: this.$refs.p_margin.value,
          p_sell: this.$refs.p_sell.value,
          p_quantity: 0,
          p_insert_date: serverTimestamp(),
          p_edit_date: serverTimestamp(),
          pid: p_id,
        }
        //const doc_ref = await   .child(docRef.id)
        addDoc(ref, obj_ref)
        .then(docRef => {
            console.log("[ProductAdd-createProduct] Document has been added successfully" + docRef.id); 
            console.log("[ProductAdd-createProduct] product id?1   "  + docRef.id.toString() + " " + aaaaaaaaa);



        })
        console.log("[ProductAdd-createProduct] product id?2   "  + aaaaaaaaa);

        
        
        
        console.log("[ProductAdd-createProduct] not end. ")

    },
    
    NumbersOnly(e){
      e = (e) ? e : window.event;
      var code = (e.which) ? e.which : e.keyCode;
      if ((code > 31 && (code < 48 || code > 57)) && code !== 46){
        e.preventDefault();;
        
      }
      else{

        return true;
      }

    },
    CalculateSell(){

      const cost = document.getElementById('pi_cost').value;
      const margin = document.getElementById('pi_margin').value;
      const tmp_ans = +cost + (+(cost / 100) * margin);

      console.log("[ProductAdd]" + cost + " " + margin + " " + tmp_ans);


      document.getElementById('pi_sell').value = tmp_ans;

    },
    
  },

}
function validate_p_input(){
      var pc_1 = document.getElementById('pi_code').value;
      var pc_2 = document.getElementById('pi_name').value;
      var pc_3 = document.getElementById('pi_catrgory').value;
      var pc_4 = document.getElementById('pi_cost').value;
      var pc_5 = document.getElementById('pi_margin').value;
      
      var pcc_1 = document.getElementById('pi_code');
      var pcc_2 = document.getElementById('pi_name');
      var pcc_3 = document.getElementById('pi_catrgory');
      var pcc_4 = document.getElementById('pi_cost');
      var pcc_5 = document.getElementById('pi_margin');

      pcc_1.classList.add("red");
      pcc_3.classList.add("red");

      console.log("[ProductAdd]  " + pcc_1 + " " + pc_2.length);

      if (pc_1.length <= 0){
        pcc_1.classList.add("red");
      }
      if (pc_2.length <= 0){
        pcc_2.classList.add("red");
      }
      if (pc_3.length <= 0){
        pcc_3.classList.add("red");
      }
      if (pc_4.length <= 0){
        pcc_4.classList.add("red");
      }
      if (pc_5.length <= 0){
        pcc_5.classList.add("red");
      }
}
</script>

<style>
.red::-webkit-input-placeholder{
color:red;
}
.input:disabled{
  border-color: white;
  background-color: white;
  color: #FFF;
}

</style>