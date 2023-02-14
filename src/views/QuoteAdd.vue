<template>

    <div class="QuoteAdd">

        <p>test997</p>
        <p>Empty Redirection Page.</p>



        <button href="@/assets/files/quote_instruction.pdf" download>Downlaod Instruction</button>
        
        <label>BILL TO</label>
        <button type="button" data-bs-toggle="modal" data-bs-target="#choose_bill_to" v-on:click="this.getAllClient();" >Choose Address </button>
        <div class="modal fade" id="choose_bill_to" tabindex="-1" aria-labelledby="" aria-hidden="true">
            <div class="modal-dialog modal-xl">

                <div class="modal-content">

                    <div class="modal-header">
                        <h4 class="modal-title"> Add Bill-To </h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close" v-on:click="showBillToModal=false">X</button>
                    </div>
                    <div class="modal-body">

                        <div class="px-5 mx-5 grid grid-cols-3 gap-2 text-white ">
                            <div class="" v-for="c, i in all_clients" >       
                            <div class="client_card row" @click="ChooseBillTo($event,c, i)">
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
                    <div class="modal-footer">
                        <button type="submit"  class="btn btn-success" v-on:click="submitManufacturer()" >Submit Manufacturer </button>
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <label>SHIP TO</label>
        <button type="button" data-bs-toggle="modal" data-bs-target="#choose_ship_to" >Choose Client </button>


        

    </div>

</template>


<script>
import jsPDF from 'jspdf'
import "jspdf/dist/polyfills.es.js";
export default{
    name: 'QuoteAdd',
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
          },

        }
    },
    methods:{
        

        async getAllClient() { 
            console.log("[QuoteAdd] print-1" );
        var all_client_ref = await firebase.firestore().collection("all_clients");
        all_client_ref.onSnapshot(snap => {
            this.all_clients = [];
            
            snap.forEach(d => {
                console.log("[QuoteAdd] print" );

                var client = d.data();
                this.all_clients.push(client);
            });
        });
        
        
        },
        ChooseBillTo(ev, c, i){
            console.log("comming soon, click client and retrieve text." + ev + "  "  + i);
            console.log("you have chosen" + c.c_fullname);
            
        },
      created() {
        
      },
    }
}

</script>

<style>

.client_card:hover{
    background-color: #323829;
}

</style>