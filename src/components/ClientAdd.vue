<template>
    <!--this page is components only-->
    <div class="ClientAdd">

        
        <h2>Client Name or Company Name</h2>
        <form class="mt-5">
          <div class="grid grid-cols-2 gap-2 " >
            <div><label>Client Company Name*</label></div>
            <div><input ref="client_cpyname" type="text" placeholder="Client Company Name" id="c_fullname" required/></div>
          </div>

          <h2>Client Full Address</h2>

          <div class="grid grid-cols-2 gap-3">
            <div><label>Address Line1* </label> </div><div> <input ref="address_1" placeholder="Address Line1" id="c_address1"  required/></div>
            <div><label>Address Line2 (Optional)</label>  </div><div> <input ref="address_2" placeholder="Address Line2" id="c_address2" /></div>
            <div><label>City*</label> </div><div><input ref="city" placeholder="City" id="c_city" required/></div>
            <div><label>Post Code*</label> </div><div> <input ref="post_code" placeholder="Post Code" id="c_postcode" required/></div>
            <div  class="hidden" ><label>Country*</label> </div><div class="hidden"> <input ref="country" placeholder="Country" id="c_country" required/></div>
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
        let flag = validate_c_input();
        if (flag){
          const db_id = firebase.firestore();
          const get_id = db_id.collection('all_clients');

          
          const ref = collection(db, 'all_clients');
          
          const obj_ref ={
            c_fullname:this.$refs.client_cpyname.value,
            c_address_1:this.$refs.address_1.value,
            c_address_2:this.$refs.address_2.value,
            c_city:this.$refs.city.value,
            c_post_code:this.$refs.post_code.value,
            c_insert_date: serverTimestamp(),

          }

          addDoc(ref, obj_ref)
          .then(docRef => {

              const get_id = firebase.firestore().collection("all_clients").doc(docRef.id);
              get_id
                  .update({
                      client_hashid: docRef.id,
                  })
                  .then(() => {
                      console.log("set doc");

                  });
              ////////////////////////////////////////////////////////////

          })
        }
      },
    }
}

function validate_c_input(){
      let flag = true;
      var cc_1 = document.getElementById('c_fullname').value;
      var cc_2 = document.getElementById('c_address1').value;
      //var cc_3 = document.getElementById('c_address2').value;
      var cc_4 = document.getElementById('c_city').value;
      var cc_5 = document.getElementById('c_postcode').value;
      
      var ccc_1 = document.getElementById('c_fullname');
      var ccc_2 = document.getElementById('c_address1');
      //var ccc_3 = document.getElementById('c_address2');
      var ccc_4 = document.getElementById('c_city');
      var ccc_5 = document.getElementById('c_postcode');


      if (cc_1.length <= 0){
        ccc_1.classList.add("red");
        flag = false;
      }
      if (cc_2.length <= 0){
        ccc_2.classList.add("red");
        flag = false;
      }
      /*
      if (cc_3.length <= 0){
        ccc_3.classList.add("red");
        flag = false;
      }
      */
      if (cc_4.length <= 0){
        ccc_4.classList.add("red");
        flag = false;
      }
      if (cc_5.length <= 0){
        ccc_5.classList.add("red");
        flag = false;
      }
      return flag;
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