<template>
  <!--this page is components only-->
  <div class="ProductAdd mx-7">
      
    <div class="container " >
      <form @sumbit.prevent="addProduct" class=" rounded p-3 "  >

        <p>Add New Product Here:</p>
        <table class="table table-custom" >
          <thead>
            <tr>
              <th scope="col">[Add]</th>
              <th scope="col">[Code#]</th>
              <th scope="col">[Name]</th>
              <th scope="col">[Catagory]</th>
              <th scope="col">[&#163; Product Cost]</th>
              <th scope="col">[Product Margin &percnt;]</th>
              <th scope="col">[=*Product Sell]</th>
            </tr>
          </thead>

          <tbody>
              <tr>
              <th scope="row">
                <div><button class="btn btn-info"   @click.prevent="createProduct" > ADD PRODUCT + </button> </div>
              </th>
              
              <td> <input ref="p_code" placeholder="Product Code" id="pi_code" class="custom_input_2" required/> </td>
              
              <td> <input ref="p_enter" placeholder="Item Name" id="pi_name" class="custom_input_4" required style="width: 300px;"/> </td>
              
              <td> 
                <select id="pi_category" class="form-select" aria-label="Default select example">
                  <option selected>Select Category Here</option>
                  <option   v-for="c in all_category" :value="`${c.category_fullname}`" > {{c.category_fullname}} </option>
                </select>
              </td>
              

              <!--@input="CalculateSell"   ; NumbersOnly($event);  v-on:keypress="NumbersOnly"-->
              <td> <input ref="p_cost" placeholder="Product Cost (number only)" id="pi_cost" @input="CalculateSell()" v-on:keypress="NoEnglishLetter" class="custom_input_3" required /> </td>           
              <td> <input ref="p_margin"  placeholder="Product Margin (number only)" id="pi_margin"  @input="CalculateSell" required /> </td>
              <td> <input ref="p_sell"  placeholder="Product Sell" id="pi_sell" @input="CalculateSell" /> </td>

            </tr>

            
            
          
        </tbody>
        </table>


        
      </form>
      <!---------------------------------->
    </div> 

      <p id="complain_text" class="mb-2" style="color: red;">  </p>
      <p id="complain_text_2" class="mb-2" style="color: red;">  </p>
      
  </div>
</template>


<script>
import { db, auth, increment, admin } from "@/firebase.js";
import { collection, addDoc, DocumentSnapshot } from "firebase/firestore";

import { serverTimestamp } from 'firebase/firestore';

export default{

  name: 'ProductAdd',
  
  components: {},
  data() {
    return {
      all_category: [],
      messageTimeout: null,
    }
  },
  computed: {
    showWarning() {
      // Check if input value is invalid
      return this.inputValue.trim() !== '' && !/^[0-9]+(\.[0-9]{1,2})?$/.test(this.inputValue);
    }
  },
  methods:{
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
    async createProduct(){
      
      let flag = await validate_p_input();
      console.log("flag1");
      let flag_2 = await validate_p_fullname();
      console.log("flag2" + flag_2);


      if (flag && flag_2 ){
        const db_id = firebase.firestore();

        const pcategory = document.getElementById("pi_category").value;
        console.log(pcategory);
        
        const ref = collection(db, 'all_products'); //how to add sepcific id
        const obj_ref = {
          p_code: this.$refs.p_code.value,
          p_fullname: this.$refs.p_enter.value,
          p_category: pcategory,
          p_cost: this.$refs.p_cost.value,
          p_margin: this.$refs.p_margin.value,
          p_sell: this.$refs.p_sell.value,
          //NEW NEW
          p_quantity: 1,
          p_unit: '',
          p_discount: 0,
          p_final_total: this.$refs.p_sell.value,
          p_insert_date: serverTimestamp(),
          p_edit_date: serverTimestamp(),

        }

        await addDoc(ref, obj_ref)
        .then(docRef => {
            const get_id = firebase.firestore().collection("all_products").doc(docRef.id);
            get_id
              .update({
                  pid: docRef.id,
              })
              .then(() => {
                  console.log("set doc");

              });
        })
        this.clearFields();
      }
      else{
        var paragraph = document.getElementById("complain_text");
        if (paragraph.textContent <=0 || paragraph.textContent == null || paragraph.textContent == ''){
            paragraph.textContent += "Product Insert Has Error!";
        }    
      }
      
    },
    
    NumbersOnly(e){
      console.log("run numbersonly");
      var input = e.target;
      // Remove all non-numeric characters except decimal point
      input.value = input.value.replace(/[^\d.]/g, '');
      if (/^\d+\.\d{3,}/.test(input.value)) {
        input.value = input.value.slice(0, -1);
      }
      // Format the input with two decimal places
      input.value = Number(input.value).toFixed(2);
      // Show message for a few seconds if input is invalid
      
    },
    NoEnglishLetter(e){
      console.log("run noEnglishLetter");
      var input = e.target;
      if (!/^\d+(\\.\d{0,2})?$/.test(input.value)) {
        var paragraph = document.getElementById("complain_text");
        if (paragraph.textContent <=0 || paragraph.textContent == null || paragraph.textContent == ''){
            paragraph.textContent += "Please Only Type Valid Numbers!";
        }  
        clearTimeout(this.messageTimeout);
        this.messageTimeout = setTimeout(() => {
          paragraph.textContent = '';
        }, 5000);
      }
    },
    CalculateSell(){

      const cost = document.getElementById('pi_cost').value;

      const margin = document.getElementById('pi_margin').value;

      const tmp_ans = +cost + (+(cost / 100) * margin);

      //console.log("[ProductAdd]" + cost + " " + margin + " " + tmp_ans);
      let sell_final = Number(tmp_ans).toFixed(2);

      document.getElementById('pi_sell').value = sell_final;

    },
    clearFields() {
      // Reset the input fields to empty strings
      document.getElementById('pi_code').value = '';
      document.getElementById('pi_name').value = '';
      document.getElementById('pi_cost').value = '';
      document.getElementById('pi_margin').value = '';
      document.getElementById('pi_sell').value = '';

      // Reset the select option to the default (first) option
      const categoryDropdown = document.getElementById('pi_category');
      categoryDropdown.selectedIndex = 0;

      document.getElementById('pi_code').classList.remove('red-text');
      document.getElementById('pi_name').classList.remove('red-text');
      document.getElementById('pi_cost').classList.remove('red-text');
      document.getElementById('pi_margin').classList.remove('red-text');
      document.getElementById('pi_margin').classList.remove('red-text');
      categoryDropdown.classList.remove('red-text');
    },



  },
  created() {


    this.getAllCategory();


  },

}
function validate_p_input(){
  let flag = true;
  var pc_1 = document.getElementById('pi_code').value;
  var pc_2 = document.getElementById('pi_name').value;
  var pc_3 = document.getElementById('pi_category').value;
  var pc_4 = document.getElementById('pi_cost').value;
  var pc_5 = document.getElementById('pi_margin').value;
  
  var pcc_1 = document.getElementById('pi_code');
  var pcc_2 = document.getElementById('pi_name');
  var pcc_3 = document.getElementById('pi_category');
  var pcc_4 = document.getElementById('pi_cost');
  var pcc_5 = document.getElementById('pi_margin');
  var category = document.getElementById('pi_category').value;

  console.log("[ProductAdd]  " + pc_3 + " " + pc_2.length);

  if (pc_1.length <= 0){
    pcc_1.classList.add("red");
    flag = false;
  }
  if (pc_2.length <= 0){
    pcc_2.classList.add("red");
    flag = false;
  }
  if (pc_3.length <= 0){
    pcc_3.classList.add("red");
    flag = false;
  }
  if (pc_4.length <= 0){
    pcc_4.classList.add("red");
    flag = false;
  }
  if (pc_5.length <= 0){
    pcc_5.classList.add("red");
    flag = false;
  }
  if (category === 'Select Category Here'){
    document.getElementById('pi_category').classList.add('red-text');
    flag = false;
  }
  return flag;
}

async function validate_p_fullname(){
  let flag = true;
  var pc_2 = document.getElementById('pi_name').value;
  var vpc_2 = document.getElementById('pi_name');
  console.log("validate_p_fullname" + pc_2);
  
  var all_client_ref = firebase.firestore().collection("all_products").where("p_fullname", "==", pc_2);
  await all_client_ref.get().then(function(doc) {
    if (!doc.empty) {
      var input = document.getElementById("p_enter");
      input.style.color = "red";

        flag = false;
        var paragraph = document.getElementById("complain_text_2");
        if (paragraph.textContent <=0 || paragraph.textContent == null || paragraph.textContent == ''){
            paragraph.textContent += "Product pre-exist! Please type your product name in search bar in order to prevent name conflict.";
        } 

        
        vpc_2.style.color = '#FF0000';
        console.log("1Document data NOT Empty:");
        return flag;
    } else {
        console.log("2No such document!");
        return flag;
    }
    }).catch(function(error) {
        console.log("3Error getting document:", error);
    });
    return flag;  
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
.red-text {
    color: red;
}
.round_input_box{

  border-radius: 18px;
  -moz-border-radius: 5px;

}
form {
  border-radius: 10px;
}
.curved-form {
  border-radius: 10px;
  overflow: hidden; /* hide overflow content to prevent clipping */
}

.custom_input_2 {
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 5px 10px;
}

.custom_input_3 {
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 5px 10px;
  font-size: 20px;
}

.custom_input_4 {
  border-radius: 10px;
  width: 150%;
  border: 1px solid #ccc;
  padding: 5px 10px;
}
</style>