<template>

<div class="client_card"  v-for="c, i in all_client_card"     > 
            
            <div class="row" data-bs-toggle="modal" data-bs-target="#add_delievery_address" @click.prevent="this.passVariable($event, c, i)">

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

              <div> {{ c.client_hashid }} </div>

            </div>
</div>
</template>

<script>
export default{
    name: 'ClientCard',
    setup() {},
    data(){
    
        return{
            all_client_card: [],
        
        }
    },
    methods:{
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
    }

}
</script>