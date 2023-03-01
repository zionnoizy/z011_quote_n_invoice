<template>
    <!--this page is components only-->
    <div class="ClientAdd">

        <p>test20</p>
        <p>Add Client Page.</p>

        <p> client address is in UK / outside of UK</p>
        <!--@sumbit.prevent="addClient"-->

        <form>
          <div class="grid grid-cols-2 gap-2" >
            <div><label>Client Company Name*</label></div>
            <div><input ref="client_cpyname" type="text" placeholder="Client Company Name" required/></div>
          </div>

          <h2>Client Full Address</h2>

          <div class="grid grid-cols-2 gap-3">

            <div><label>Address Line1* </label> </div><div> <input ref="address_1" placeholder="Address Line1" id="txtArea"  required/></div>
            <div><label>Address Line2 (Optional)</label>  </div><div> <input ref="address_2" placeholder="Address Line2" id="txtArea" /></div>
            <div><label>City*</label> </div><div><input ref="city" placeholder="City" id="txtArea" required/></div>
            <div><label>Post Code*</label> </div><div> <input ref="post_code" placeholder="Post Code" id="txtArea" required/></div>
            <div  class="hidden" ><label>Country*</label> </div><div class="hidden"> <input ref="country" placeholder="Country" id="txtArea" required/></div>
          
          </div>
        </form>
        <!---------------------------------->
        <button @click="createClient" class="btn btn-info" >Add Client Information </button>

    </div>
</template>


<script>
import { db, auth } from "@/firebase.js";
import { collection, addDoc, DocumentReference } from "firebase/firestore";
import { serverTimestamp } from 'firebase/firestore'
import { ref } from 'vue';


export default{
    name: 'ClientAdd',
    components: {},
    methods:{
      async createClient() {
        //if ($refs.client_cpyname.value == '' || this.$refs.address_1.value == '' || this.$refs.address_2.value == '' || this.$refs.city.value == '' || this.$refs.post_code.value == ''){

        console.log("[ClientAdd] create new client.");

        const db_id = firebase.firestore();
        const get_id = db_id.collection('all_clients').doc();
        const c_id = get_id.id;
        
        const ref = collection(db, 'all_clients');
        
        const obj_ref ={
          c_fullname:this.$refs.client_cpyname.value,
          c_address_1:this.$refs.address_1.value,
          c_address_2:this.$refs.address_2.value,
          c_city:this.$refs.city.value,
          c_post_code:this.$refs.post_code.value,
          c_insert_date: serverTimestamp(),
          c_cid: c_id,
        }

        const doc_ref = await addDoc(ref, obj_ref);
      }
    },

}

// const addClient = () => {
//   const newClient = {
//     id: '',
//     content: 
//   }
// }
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