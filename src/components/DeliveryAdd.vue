<template>

    <div class="DeliveryAdd">

     


        
        <!---------------------------------->
        

    </div>
</template>


<script>
import { db, auth } from "@/firebase.js";
import { collection, addDoc, DocumentReference } from "firebase/firestore";
import { serverTimestamp } from 'firebase/firestore'
import { ref } from 'vue';


export default{
    name: 'DeliveryAdd',
    props: ['client_hashid'],

    components: {},
    data(){
        return{
          client_hashid: this.client_hashid,
        }
    },
    methods:{

      
    
    }

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