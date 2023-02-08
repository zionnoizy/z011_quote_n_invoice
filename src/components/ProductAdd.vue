<template>
  <div class="ProductAdd">

      <p>test29</p>
      <p>Add Client Page.</p>

      <p> The Sell Will Auto-Generate After Typing Cost & Margin Sessions. </p>

      <form @sumbit.prevent="addClient">

        

        <h2>Product Full List</h2>
        <button class="" @click="createProduct" > New Product[+] </button>
        
        <table class="table table-dark" >


          <thead >
  <tr>
    <th scope="col">Add/ Delete</th>
    <th scope="col">Code#</th>
    <th scope="col">Name</th>
    <th scope="col">Catagory</th>
    <th scope="col">Product Cost</th>
    <th scope="col">Product Margin</th>
    <th scope="col">Product Sell</th>
  </tr>
</thead>
<tbody>
  <tr >

    <th scope="row">

      <div><button class="btn btn-info"   @click="createProduct" > [+] </button> </div>
     </th>


     <td> <input ref="Code" placeholder="Product Code" id="pi_code" required/> </td>

      <td> <input  ref="Item Name" placeholder="Item Name" id="pi_name" required/> </td>
    <td> <input ref="Category" placeholder="Product Category" id="pi_catrgory" required/> </td>
    <td> <input ref="Product Cost (£)" placeholder="Product Cost (digit only)" id="pi_cost" v-on:keypress="NumbersOnly" required /> </td>
    <td> <input ref="Product Margin (%)" placeholder="Product Margin (digit only)" id="pi_margin" onkeypress='return event.charCode >= 48 && event.charCode <= 57' required /> </td>
    <td> <input ref="Product Sell (£)" placeholder="Product Sell" id="pi_sell" disabled /> </td>

  </tr>

  <tr v-for="p in all_products" >
    <th scope="row"> {{ p.p_code }} </th>
    <td> {{ p.p_fullname }} </td>
    <td> {{ p.p_catagory }} </td>
    <td> {{ p.p_cost }} </td>
    <td><div contenteditable>BB  {{ p.p_margin }} </div></td>
    <td> {{ p.p_sell }} </td>
  </tr>
  <tr>
    <th scope="row">-</th>
    <td>Example1</td>
    <td>Example2</td>
    <td>Example3</td>
  </tr>
</tbody>
</table>


        
      </form>
      <!---------------------------------->
      

  </div>
</template>


<script>
import { db, auth } from "@/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { ref } from 'vue';


export default{
  name: 'ProductAdd',
  components: {},
  methods:{
    
    async createProduct(){
      validate_p_input();
      /*
      if (ture){
        console.log("[ProductAdd] create new product");

        const db_id = firebase.firestore();
        const get_id = db_id.collection('all_products');
        const p_id = get_id.id;

        const ref = collection(db, 'all_products');
        const obj_pro = {

          p_fullname
        }
      }
      */
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

    }
    
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
</style>