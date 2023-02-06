<template>
    <div class="ProductAdd">

        <p>test29</p>
        <p>Add Client Page.</p>

        <p> The Sell Will Auto-Generate After Typing Cost & Margin Sessions.</p>

        <form @sumbit.prevent="addClient">

          <div>
            <label>Client Company Name</label>
            <input ref="client_cpyname" type="text" />
          </div>

          <h2>Product Full List</h2>

          <div class="grid grid-cols-7 gap-0">
            
            <div> <input ref="product_item" placeholder="Item" id="txtArea" required/></div>
            <div> <input ref="product_category" placeholder="Category" id="txtArea" /></div>
            <div> <input ref="product_code" placeholder="City" id="txtArea" required/></div>
            <div> <input ref="product_cost" placeholder="Post Code" id="txtArea" required/></div>
            <div style="background-color: grey;"> 
                <input ref="product_margin" placeholder="Margin" id="txtArea" readonly/>
            </div>
            <div><button @click="createProduct" >+</button></div>
          </div>
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
      async createClient() {
        console.log("[ClientAdd] create new client.");
        const ref = collection(db, 'all_products')
        
        const obj_ref ={
          p_itemname:this.$refs.client_cpyname.value,
          p_category:this.$refs.address_1.value,
          p_code:this.$refs.address_2.value,
          p_cost:this.$refs.city.value,
          p_margin:this.$refs.post_code.value,

        }

        const doc_ref = await addDoc(ref, obj_ref);
      }
    },

}
</script>

<style>
[type=text] {
  background-image: url(https://image.flaticon.com/icons/svg/131/131155.svg);
  background-position: calc(100% - 8px)  center;
  background-repeat: no-repeat;
  background-size: 16px 16px;
  padding: 1em 16px 1em 1em;
  border: 1px solid;
}
[type=text]:not(:placeholder-shown) {
  background-image: none;
}
</style>