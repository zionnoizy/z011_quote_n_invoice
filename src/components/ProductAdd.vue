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
      
    },

}
</script>

<style>

</style>