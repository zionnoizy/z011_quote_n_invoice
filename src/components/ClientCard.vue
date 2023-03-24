<template>
  <div class="ClientCard">
    

    <div class="lg:px-5 lg:mx-5 grid grid-cols-5 gap-3 ">
      <div>
        <label>Search Client Name</label>
        <input type="text" v-model="myCsearch" placeholder="search here.." />
      </div>
          <div class="client_card row col-span-1 flex-col text-center"  v-for="c, i in f_all_client_card"
            data-bs-toggle="modal" data-bs-target="#show_delievery_address" @click.prevent="this.showDelivery($event, c, i)" > 
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
          <div class="modal fade" id="show_delievery_address" tabindex="-1" aria-labelledby="" aria-hidden="true" @close="resetPages()" @hide="resetPages()">
          <div class="modal-dialog modal-xl">
              <div class="modal-content text-black">

                  <div class="modal-header">
                      <h4 class="modal-title"> List of Address From Client <b> {{ delivery_fullname }} </b></h4>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close" > X </button>
                  </div>

                  <div class="modal-body" style="background-color: #1267aa;">
                      <div class="px-5 mx-5 grid grid-cols-3 gap-2  ">
                          <div class="" v-for="d in all_client_delivey" :key="d">
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
                      <button id="previous_btn" @click="previous()">previous</button>
                      <button id="next_btn" @click="next()">next</button>

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
            all_client_delivey: [],

            
            start:0,
            end: 3,
            record_end: 3,
            toRender: [],

            perpage: 3,
            pageNumber:0,
            myCsearch: '',
        }
    },
    mounted () {

     
    },
    methods:{

        async getAllClient() { 
        var all_client_ref = await firebase.firestore().collection("all_clients");

        await all_client_ref.onSnapshot(snap => {
            this.all_client_card = [];
            
            snap.forEach(d => {
                var client = d.data();
                this.all_client_card.push(client);
            });
        });
        
        
        },
        async showDelivery(e, c, i) {
          document.getElementById('previous_btn').style.visibility = 'hidden';
          this.delivery_fullname = c.c_fullname;

          const delivey_ref = await firebase.firestore().collection("all_delivery").doc(c.client_hashid).collection("this_client_delivery");
          await delivey_ref.onSnapshot(snap => {
              this.all_client_delivey = [];
              snap.forEach(d => {
                  var delivery = d.data();
                  this.all_client_delivey.push(delivery);

              });
              console.log("ipad3 check if this_client_delivery" +this.all_client_delivey);
              this.toRender = [];
              const no_proxy = JSON.parse(JSON.stringify(this.all_client_delivey)); //

              console.log("ipad3 check " + no_proxy);

              for (let i = this.start; i < this.end; i++){
                if (no_proxy[i] !== undefined){
                  this.toRender.push(no_proxy[i])
                  console.log("what to push1: " + no_proxy[i] );
                  
                }
                
              }
              console.log("what to push2: " + this.toRender.length);
              this.start = this.start + this.toRender.length;
              this.end =  this.start + this.toRender.length;
          });
          
        },


        loadnext() {
          console.log("===============loadnext");
          document.getElementById('previous_btn').style.visibility = 'visible';
          this.toRender = [];
          const no_proxy = JSON.parse(JSON.stringify(this.all_client_delivey)); //
          console.log(">   " + no_proxy );
          for (let i = this.start; i < this.end; i++){
            console.log("no_proxy[i]" + no_proxy[i]);
            if (no_proxy[i] !== undefined){
              this.toRender.push(no_proxy[i])
              console.log("what to push3: " + no_proxy[i] );
              
            }
            if (no_proxy[i] == undefined){
              document.getElementById('next_btn').style.visibility = 'hidden';
              this.start = this.start + this.record_end;
              this.end =  this.start + this.record_end;
              console.log("start2/end2 " + this.start + "    " + this.end  );
              return;
            }

            
          }

          this.start = this.start + this.toRender.length;
          this.end =  this.start + this.toRender.length;

          console.log("start/end " + this.start + "    " + this.end  );

        },
        loadprevious() {
          console.log("===============loadprevious");
          this.start = this.start - this.toRender.length;
          this.end =  this.start - this.toRender.length;
          console.log("what to push4: " + this.start +"    "+ this.end);
          this.toRender = [];
          const no_proxy = JSON.parse(JSON.stringify(this.all_client_delivey)); //
          for (let j = this.end; j < this.start; j++){
            if (no_proxy[j] !== undefined){
              this.toRender.push(no_proxy[j])
              console.log("what to push5: " + no_proxy[j] );
              
            }
          }
          console.log("what to push6: " + this.toRender.length);


        },
        resetPages(){
          console.log("reset start/ end / toRender to origional");
          this.toRender = [];
        },
        next(){
            this.pageNumber++;
        },
        previous(){
        this.pageNumber--;
        },
    },
    created(){
      this.getAllClient();
    },
    computed:{
        currentPageItems(){
          return this.all_client_delivey.slice(this.pageNumber*this.perpage,this.pageNumber*this.perpage+1+this.perpage)
        },
        f_all_client_card(){
        return this.all_client_card.filter(all_client_card => 
          all_client_card.c_fullname.toLowerCase().includes(this.myCsearch.toLocaleLowerCase())
        );
        }

    },

}
</script>