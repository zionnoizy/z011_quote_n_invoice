<template>
  <div class="ClientCard">
    

    <div class="lg:px-5 lg:mx-5 grid grid-cols-5 gap-3 ">
          <!--[new_task] on click client-->


          <div class="client_card row col-span-1 flex-col text-center"  v-for="c, i in all_client_card"     > 
            
            <div class="row" >

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
            this.all_client_card = [];
            
            snap.forEach(d => {
                var client = d.data();
                this.all_client_card.push(client);
            });
        });
        
        
      },
    },
    created(){
      this.getAllClient();
    }

}
</script>