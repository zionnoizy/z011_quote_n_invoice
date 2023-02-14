<template>
    <div class="ClientAll">
        <!--https://pbs.twimg.com/media/DrM0nIdU0AEhG5b.jpg-->
        <p>test21</p>

        <p class="dashboard_txt" ><router-link to="/dashboard" exact><a><strong class="link">Dashboard</strong></a></router-link>  > All Clients</p>

        <client-add></client-add>

      <p>...................................................</p>

      <div class="px-5 mx-5 grid grid-cols-2 gap-1 ">
      <div>
      <label>Search Engine</label>
      <input placeholder="search here.." />
      </div>
      <div>
      <!---->
      <div class="grid grid-cols-3">
        
        <div>Sort By: A-Z</div>
        <div>Date Added</div>
        <div>Country</div>

      </div>
      <!---->
      </div>
      </div>

    <div class="px-5 mx-5 grid grid-cols-5 gap-3 ">

      <div class="client_card" v-for="c in all_clients" > 
        
        <div class="row">
          <div>
            <strong>{{ c.c_fullname }}</strong>
          </div>
          <div>
          <strong>{{ c.c_address_1 }}</strong>
          </div>
          <div>
          <strong>{{ c.c_address_2 }}</strong>
          </div>
          <div>
          <p>{{ c.c_city }}, {{ c.c_post_code }} </p>
          </div>

        </div>

        


      </div>
    </div>

        
    </div>
</template>


<script>
import { setDoc } from '@firebase/firestore';
import ClientAdd from "@/components/ClientAdd.vue";
import { app, db2, auth } from "@/firebase.js";
import { onMounted, reactive } from "vue";

export default{
    name: 'ClientAll',
    setup() {},
    data(){
      
        return{
          all_clients: [],
          client:{
            c_fullname: null,
            c_address_1: null,
            c_address_2: null,
            c_city: null,
            c_insert_date: null,
            c_post_code: null,
            c_cid: null,
          }
        }
    },
    components: {
      ClientAdd,
    },
    methods: {

      async getAllClient() { 
        var all_client_ref = await firebase.firestore().collection("all_clients");

        all_client_ref.onSnapshot(snap => {
            this.all_clients = [];
            
            snap.forEach(d => {
                var client = d.data();
                this.all_clients.push(client);
            });
        });
        
        
      },

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

    },
    created() {
    this.getAllClient();
    },
}
</script>

<style>

</style>