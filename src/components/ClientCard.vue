<template>
  <div class="ClientCard">
    

    <div class="lg:px-5 lg:mx-5 grid grid-cols-5 gap-3 ">
          <!--[new_task] on click client-->


          <div class="client_card row col-span-1 flex-col text-center"  v-for="c, i in all_client_card"
            data-bs-toggle="modal" data-bs-target="#show_delievery_address" @click.prevent="this.passVariable($event, c, i)"> 
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
          <div class="modal fade" id="add_delievery_address" tabindex="-1" aria-labelledby="" aria-hidden="true" >
            
            <div class="modal-dialog modal-xl">
                <div class="modal-content text-black">

                    
                  <div class="modal-header">
                    
                  </div>

                  <div class="modal-body">


                      <p id="" class=""> Show Client <b>{{ delivery_fullname }}</b> Delivery Address   </p>
                        <div class="grid grid-cols-2 gap-2" >
                      </div>

                        <h2>Delivery Full Address</h2>

                      <div class="grid grid-cols-2 gap-3">
                        <div><label>Address Line1 * </label> </div>
                        <div> <input ref="d_address_1" placeholder="Address Line1" id="d_address_1"  required/></div>

                        <div><label>Address Line2 (Optional)</label>  </div>
                        <div> <input ref="d_address_2" placeholder="Address Line2" id="d_address_2" /></div>

                        <div><label>City *</label> </div>
                        <div><input ref="d_city" placeholder="City" id="d_city" required/></div>

                        <div><label>Post Code *</label> </div>
                        <div> <input ref="post_code" placeholder="Post Code" id="d_post_code" required/></div>
                      </div>
                  </div>
                    <div class="modal-footer" style="background-color: #1267aa;">
                      <button @click.prevent="createDelieveryAddress" class="btn btn-info" >Add Delivery Information </button>
                    </div>
                    
                </div>
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
            delivery_fullname: '',
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