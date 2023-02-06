<template>
    <div class="ClientAll">
        <!--https://pbs.twimg.com/media/DrM0nIdU0AEhG5b.jpg-->
        <p>test21</p>
        <p>Coming Soon. Show all Client Page.</p>

        <client-add></client-add>

        <button>CHANGE</button>
      <!--loop message-->
    <div class="grid grid-cols-5">

      <div class="business_card" v-for="c in messages" v-bind:key="c['.key']"> 
        
        <div>
          <p>{{ c.c_fullname }}</p>
          <p contenteditable :value="c.c_fullname" type="text"></p>
        </div>

        <button @click="editClient(c['.key'])">Edit</button>
        <button>Delete</button>
      </div>
    </div>

        
    </div>
</template>


<script>
import { setDoc } from '@firebase/firestore';
import ClientAdd from "@/components/ClientAdd.vue";
export default{
    name: 'ClientAll',
    components: {
      ClientAdd,
    },
    methods: {

      UpdateClient:function(msg){
        setDoc(doc(db, 'all_clients', msg.id),{
          text: msg.text,
          data: msg.data
        })
      },
      deleteClient(id){
        if (window.confirm("do you really want to delete? The system cannot undo.")){
          db.child(id).remove().then(() =>{
            alert("successully deleted.");
          }).catch((error) => {
            console.log(error);
          })
        }
      }

    }
}
</script>

<style>
.business_card{
  border-radius: 25px;
  border: 2px solid #73AD21;
  padding: 20px;
  width: 200px;
  height: 150px;
}
</style>