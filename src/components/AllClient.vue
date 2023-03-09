<template>
    <div class="AllClient">

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
    name: 'AllClient',
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
    },
    created() {
        this.getAllClient();
    },
}
</script>

<style>
</style>