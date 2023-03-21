<template>
  <div class="ClientCard">
    

    <div class="lg:px-5 lg:mx-5 grid grid-cols-5 gap-3 ">
          <!--[new_task] on click client-->


          <div class="client_card row col-span-1 flex-col text-center"  v-for="c, i in all_client_card"
            data-bs-toggle="modal" data-bs-target="#show_delievery_address" @click.prevent="this.showDelivery($event, c, i)"> 
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
          <div class="modal fade" id="show_delievery_address" tabindex="-1" aria-labelledby="" aria-hidden="true">
          <div class="modal-dialog modal-xl">
              <div class="modal-content text-black">
                  <div class="modal-header">
                      <h4 class="modal-title"> List of Address From Client <b>{{ delivery_fullname }} </b></h4>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close"> X </button>
                  </div>
                  <div class="modal-body" style="background-color: #1267aa;">
                      <div class="px-5 mx-5 grid grid-cols-3 gap-2  ">
                          <div class="" v-for="d, i in this_client_delivey">
                              <div class="delivery_card row">
                                  <div>
                                      <strong>{{ d.d_fullname }}</strong>
                                  </div>
                                  <div>
                                      <strong>{{ d.d_address_1 }}</strong>
                                  </div>
                                  <div>
                                      <strong>{{ d.d_address_2 }}</strong>
                                  </div>
                                  <div>
                                      <p>{{ d.d_city }}, {{ d.d_post_code }} </p>
                                  </div>

                              </div>




                          </div>
                      </div>


                  </div>
                  
    </div>


</div>
          
</div> <!--modal-->
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
            delivery_fullname: '',
            this_client_delivey: [],
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
      async showDelivery(e, c, i) {
        this.delivery_fullname = c.c_fullname;
        const delivey_ref = await firebase.firestore().collection("all_delivery").doc(c.client_hashid).collection("this_client_delivery");
        delivey_ref.onSnapshot(snap => {
            this.this_client_delivey = [];
            snap.forEach(d => {
                var delivery = d.data();
                this.this_client_delivey.push(delivery);

            });
        });

      },
    },
    created(){
      this.getAllClient();
    }

}
</script>