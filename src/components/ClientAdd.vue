<template>
    <div class="ClientAdd">

        <p>test20</p>
        <p>Add Client Page.</p>

        <p> client address is in UK / outside of UK</p>

        <form @sumbit.prevent="addClient">
          <div>
            <label>Client Company Name</label>
            <input ref="client_cpy" type="text" />
          </div>

          <h2>Client Full Address</h2>
          <div class="grid grid-cols-1 ">
            
            <div><label>Address Line1 </label> <textarea ref="address_1" placeholder="Address Line1" id="txtArea" ></textarea></div>
            <div><label>Address Line2 (Optional)</label> <textarea ref="address_2" placeholder="Address Line2" id="txtArea" ></textarea></div>
            <div><label>City</label> <textarea ref="city" placeholder="City" id="txtArea" ></textarea></div>
            <div><label>Post Code</label> <textarea ref="post_code" placeholder="Post Code" id="txtArea" ></textarea></div>
            <div  class="hidden" ><label>Counrty</label> <textarea ref="country" placeholder="Post Code" id="txtArea" ></textarea></div>
          
          </div>
        </form>
        <!---------------------------------->
        <button :disabled="!typedClientInfo">Add Client Information </button>

    </div>
</template>


<script>
import { db, auth } from "@/firebase.js";
import { ref } from 'vue';
export default{
    name: 'empty',
    components: {},
    methods:{
      AddNewClient:function(){
        addDoc(collection(db, 'messages'),{
          text:this.$refs.client_cpy.value,
          data:Date.now()
        });
      }
    },
    data:()=>{
      return{
        c_company: ref([])
      }
    },
    mounted(){
      const lastestQuery = query(collection(db, "company"),orderBy('date'));
      onSnapshot(latesrQuery, (snapshot)=>{
        this.c_comapny = snapshot.docs.map((doc=>{
          return{

          }
        }))
      })
    }
}

const addClient = () => {
  const newClient = {
    id: '',
    content: 
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