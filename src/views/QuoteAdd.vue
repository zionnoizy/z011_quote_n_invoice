
<template>

    <div class="QuoteAdd">

        <p>test997</p>
        <p>Empty Redirection Page.</p>



        <button href="@/assets/files/quote_instruction.pdf" download>Downlaod Instruction</button>
        
        <div class="grid grid-cols-1 gap-1">
            <div> <p class="text-2xl underline">Bill To + Ship To</p> 
            <!---------------------BILL-SHIP-TO-------------------------------------->
            <label>BILL TO</label>

                <button class="choose_address_btn border btn btn-secondary btn-square-lg" type="button" data-bs-toggle="modal" data-bs-target="#choose_bill_to" v-on:click="this.getAllClient();" >Choose Address </button>
                <div class="modal fade" id="choose_bill_to" tabindex="-1" aria-labelledby="" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        <!-------------------modal//BillTo------------------------->
                        <div class="modal-content text-black">

                            <div class="modal-header">
                                <h4 class="modal-title"> Add Bill-To </h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close" v-on:click="showBillToModal=false">X</button>
                            </div>
                            <div class="modal-body">

                                <div class="px-5 mx-5 grid grid-cols-3 gap-2  ">
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
                <button class="choose_address_btn border btn btn-secondary btn-square-lg"  type="button " data-bs-toggle="modal" data-bs-target="#choose_ship_to" >Choose Client </button>
                <div class="modal fade" id="choose_ship_to" tabindex="-1" aria-labelledby="" aria-hidden="true">
                    
                    <div class="modal-dialog modal-xl">
                        <!-------------------modal//ShipTo------------------------->
                        <div class="modal-content text-black">

                            <div class="modal-header">
                                <h4 class="modal-title"> Add Bill-To </h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close" v-on:click="showBillToModal=false"> X </button>
                            </div>

                            <div class="modal-body">

                                <div class="px-5 mx-5 grid grid-cols-3 gap-2  ">
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
            <!---------------------[END] BILL-SHIP-TO-------------------------------------->
            </div>
            
            <!--2/3-->
            <div> <p class="text-2xl underline">Add Products of Goods (1/10)</p> 
            
                <input ref="p_code" placeholder="Product Code" id="pi_code" disabled/>
                <input list="s_product" ref="p_enter" v-model="s_product_name" placeholder="Item Name" id="pi_name" @input="suggesting()"  required/>


                <datalist id="s_product">
                    <option v-for="(s, i) in s_product">{{s.p_fullname}}</option> 
                </datalist>

                 <!--only shown if typing-->
                <input ref="p_category" placeholder="Product Category" id="pi_catrgory" disabled/>
                <input ref="p_cost" placeholder="Product Cost (digit only)" id="pi_cost"  disabled />
                <input ref="p_margin" placeholder="Product Margin (digit only)" id="pi_margin" disabled />
                <input ref="p_sell" placeholder="Product Sell" id="pi_sell"  disabled/>
            
            </div>

            <div> <p class="text-2xl underline">Final Calculation</p> 

                <input ref="q_subtotal" placeholder="Subtotal" id="q_subtotal"  disabled/>

                <input ref="q_vat" placeholder="Vat" id="q_vat"  />

                <input ref="q_shipping" placeholder="Shipping" id="q_shipping"  />

                <input ref="q_total" placeholder="Total" id="q_total"  disabled/>
            
            </div>


            <div> 
                <button class="preview_btn" @click.prevent="writePDF" download> Preview </button>
            </div>
        </div>



        


        

    </div>

</template>


<script>
import jsPDF from 'jspdf'
import "jspdf/dist/polyfills.es.js";
import {PDFDocument, StandardFonts, rgb} from 'pdf-lib'
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

          s_product: [],
          s_product_name: '',
          s_flag: false,
          


        }
    },
    methods:{
        

        async getAllClient() { 
            console.log("[QuoteAdd-getAllClient] print-1" );
            var all_client_ref = await firebase.firestore().collection("all_clients");
            all_client_ref.onSnapshot(snap => {
                this.all_clients = [];
                
                snap.forEach(d => {
                    console.log("[QuoteAdd-getAllClient] print" );

                    var client = d.data();
                    this.all_clients.push(client);
                });
            });
        },
        ChooseBillTo(ev, c, i){
            console.log("[QuoteAdd-ChooseBillTo] comming soon, click client and retrieve text." + ev + "  "  + i);
            console.log("[QuoteAdd-ChooseBillTo] you have chosen" + c.c_fullname);
            
        },
        async writePDF(){
            console.log("[QuoteAdd-writePDF] write pdf.");

            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage()
            const { width, height } = page.getSize()
            const fontSize = 30
            page.drawText('Creating PDFs in JavaScript is awesome!', {
                x: 50,
                y: height - 4 * fontSize,
                size: fontSize,

                color: rgb(0, 0.53, 0.71),
            })

            const pdfBytes =  await pdfDoc.save();
            console.log("[QuoteAdd-writePDF] write pdf." + pdfBytes);

        },

        show_typing_product_suggestions(){

            this.show_product_suggestions = true;

        },
        
        async getAllProducts() { 

            var all_product_ref = await firebase.firestore().collection("all_products");

            all_product_ref.onSnapshot((snapshot) => {
                this.s_product = [];

                snapshot.forEach(d => {

                    var s_product_name =d.data();

                    this.s_product.push(s_product_name);

                })
            })
            

        },
        suggestionSelected(i) {

            this.s_product_name = this.s_product[i].s_product_name;
        },
        
        suggesting(){
            console.log("[QuoteAdd]-suggesting  turn on s_flag");
            this.s_flag = true;
        }
    },
    created() {

        this.getAllProducts();
            
    },
}

</script>

<style>

.client_card:hover{
    background-color: #323829;
}

.choose_address_btn{
    width: 250px;
    height: 250px;
}

</style>