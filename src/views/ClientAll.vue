<template>
    <div class="ClientAll">
        <!--https://pbs.twimg.com/media/DrM0nIdU0AEhG5b.jpg-->
        <p>test21</p>
        <p ><router-link to="{name: './'}" exact><a><strong class="link">Dashboard</strong></a></router-link>  > All Clients</p>

        <client-add></client-add>

        <button>CHANGE</button>
      <!--loop message vv-bind:key="all_clients.c_cid"-->
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

    <div class="px-5 mx-5 grid grid-cols-5 gap-2 ">

      <div class="business_card" v-for="c in all_clients" > 
        
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

        <div class="btn-group" role="group" aria-label="section preference">
  <input
    type="radio"
    class="btn-check"
    name="section"
    id="option1"


  />
  <label class="btn btn-secondary" for="option1">
    Edit
  </label>

  <input
    type="radio"
    class="btn-check"
    name="section"
    id="option2"

  />
  <label class="btn btn-secondary" for="option2">
    Delete
  </label>
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
      async getTodos() { 
        var todosRef = await firebase.firestore().collection("all_clients");
        /*
        firebase.firestore().collection("all_clients").get().then(function(querySnapshot){
          this.all_clients = querySnapshot;
          querySnapshot.forEach(function(doc){
            console.log("1.");
            this.all_clients.push(doc.data());
          });
        });
        */
        
        todosRef.onSnapshot(snap => {
            this.all_clients = [];
            
            snap.forEach(d => {
                var client = d.data();
                // client.c_fullname = d.c_fullname,
                // client.c_address_1 = d.c_address_1,
                // client.c_address_2 = d.c_address_2,
                // client.c_city = d.c_city,
                // client.c_insert_date = d.c_insert_date,
                // client.c_post_code = d.c_post_code,
                // client.c_cid = d.data();


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
    this.getTodos();
    },
}
</script>

<style>
.business_card{
  border-radius: 25px;
  border: 2px solid #73AD21;
  padding: 20px;
  width: 275px;
  height: 175px;
}
</style>