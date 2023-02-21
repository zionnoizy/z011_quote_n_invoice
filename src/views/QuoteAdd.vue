
<template>

    <div class="QuoteAdd">

        <p>test997</p>
        <p>Empty Redirection Page.</p>



        <button href="@/assets/files/quote_instruction.pdf" download>Downlaod Instruction</button>
        
        <div class="grid grid-cols-1 gap-1">
            <!--1/3-------------------BILL-SHIP-TO-------------------------------------->
            <div> <p class="text-2xl underline">Bill To + Ship To</p> 
            
            <label>BILL TO</label>

                <button class="choose_address_btn border btn btn-secondary btn-square-lg" type="button" data-bs-toggle="modal" data-bs-target="#choose_bill_to" v-on:click="this.getAllClient1();" >

                    <p ref="tmp_b_fullname" id="tmp_b_fullname"></p>
                    <p ref="tmp_b_address1" id="tmp_b_address1"></p>
                    <p ref="tmp_b_address2" id="tmp_b_address2"></p>
                    <p ref="tmp_b_city" id="tmp_b_city"></p>
                    <p ref="tmp_b_postcode" id="tmp_b_postcode"></p>

                </button>

                <!-------------------modal//BillTo------------------------->
                <div class="modal fade" id="choose_bill_to" tabindex="-1" aria-labelledby="" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        
                        <div class="modal-content text-black">

                            <div class="modal-header">
                                <h4 class="modal-title"> Add Bill-To </h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close" v-on:click="showBillToModal=false">X</button>
                            </div>
                            <div class="modal-body">

                                <div class="px-5 mx-5 grid grid-cols-3 gap-2  ">
                                    <div class="" v-for="b, i in all_clients1" >       
                                    <div class="client_card row" @click="ChooseBillTo($event,b, i); " data-bs-dismiss="modal" aria-label="close">
                                        <div>
                                        <strong>{{ b.c_fullname }}</strong>
                                        </div>
                                        <div>
                                        <strong>{{ b.c_address_1 }}</strong>
                                        </div>
                                        <div>
                                        <strong>{{ b.c_address_2 }}</strong>
                                        </div>
                                        <div>
                                        <p>{{ b.c_city }}, {{ b.c_post_code }} </p>
                                        </div>

                                    </div>

                                    


                                    </div>
                                </div>


                            </div>
                            <div class="modal-footer">
                                <button type="submit"  class="btn btn-success" v-on:click="submitManufacturer()" >Submit Bill In </button>
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-------------------modal//BillTo------------------------->

                <label>SHIP TO</label>
                <button class="choose_address_btn border btn btn-secondary btn-square-lg"  type="button " data-bs-toggle="modal" data-bs-target="#choose_ship_to" >Choose Client </button>
                <!-------------------modal//ShipTo------------------------->
                <div class="modal fade" id="choose_ship_to" tabindex="-1" aria-labelledby="" aria-hidden="true">
                    
                    <div class="modal-dialog modal-xl">
                        
                        <div class="modal-content text-black">

                            <div class="modal-header">
                                <h4 class="modal-title"> Add Ship-To </h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close" v-on:click="showShipToModal=false"> X </button>
                            </div>

                            <div class="modal-body">

                                <div class="px-5 mx-5 grid grid-cols-3 gap-2  ">
                                    <div class="" v-for="s, i in all_clients2" >       
                                    <div class="client_card row" @click="ChooseShipTo($event,s, i);">
                                        <div>
                                        <strong>{{ s.c_fullname }}</strong>
                                        </div>
                                        <div>
                                        <strong>{{ s.c_address_1 }}</strong>
                                        </div>
                                        <div>
                                        <strong>{{ s.c_address_2 }}</strong>
                                        </div>
                                        <div>
                                        <p>{{ s.c_city }}, {{ s.c_post_code }} </p>
                                        </div>

                                    </div>

                                    


                                    </div>
                                </div>


                            </div>
                            <div class="modal-footer" style="background-color: #1267aa;">
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
            
                <p>the product code/ category/ cost/ margin/ sell will not shown unless an input element lost its focus </p>

                <input list="s_product" ref="p_enter"  v-model="s_product_name" placeholder="Item Name" id="p_enter" @input="suggesting()" @blur="ChooseProduct();" required/>


                <datalist id="s_product">
                    <!-- <option v-for="(s, i) in s_product">{{s.p_fullname}}</option> -->
                    <option v-for="(s, i) in s_product2" >{{s.p_fullname}}</option>
                </datalist>
                <!----------------------end-suggestion-------------------------------------->
                <div id="s_product" style="margin: 10px">

                </div>


                 <!--only shown if typing-->
                <input ref="p_code" placeholder="Product Code" @input="ChooseProduct" id="p_code"  disabled/>
                <input ref="p_category" placeholder="Product Category" id="p_category" @input="ChooseProduct" disabled/>
                <input ref="p_cost" placeholder="Product Cost (digit only)" id="p_cost" @input="ChooseProduct"  disabled />
                <input ref="p_margin" placeholder="Product Margin (digit only)" id="p_margin" @input="ChooseProduct" disabled />
                <input ref="p_sell" placeholder="Product Sell" id="p_sell1" @input="ChooseProduct(); CalculateTotal()" disabled/>
            
            </div>
            <!--3/3-->
            <div> <p class="text-2xl underline">Final Calculation</p> 

                <input ref="q_subtotal" placeholder="Subtotal" id="q_subtotal"  disabled/>

                <input ref="q_vat" placeholder="Vat" id="q_vat"  />

                <input ref="q_shipping" placeholder="Shipping" id="q_shipping"  />

                <input ref="q_total" placeholder="Total" id="q_total" @input="CalculateTotal" disabled/>
            
            </div>


            <div> 
                <button class="preview_btn btn btn-info btn-lg btn-block" @click.prevent="writePDF" download> Preview </button>
            </div>
        </div>



        


        

    </div>

</template>


<script>
import jsPDF from 'jspdf';
import "jspdf/dist/polyfills.es.js";
import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';
import { reactive, computed } from 'vue'

import { onMounted } from 'vue';
export default{
    name: 'QuoteAdd',
    setup() {
        const s_product2 = reactive([]);
        onMounted(async () => {
            try{
            const typing_product = await firebase
            .firestore()
            .collection("all_products")
            .get();
            typing_product.forEach((doc) =>{
                s_product2.push(doc.data());

            });
        } catch (e){
            console.log("Error Typing s_product2");
        }
        });
        return {s_product2};
    },
    data(){
      
        return{
            showBillToModal:false,
          all_clients1: [],



          all_clients2: [],
          hidden_bill_fullname: null,
          hidden_bill_address_1: null,
          hidden_bill_address_2: null,
          hidden_bill_city: null,
          hidden_bill_insert_date: null,
          hidden_bill_post_code: null,

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
          // choose
          hidden_b_fullname: null,
          hidden_b_address1: null,
          hidden_b_address2: null,
          hidden_b_city: null,
          hidden_b_post_code: null,
          // choose
          s_fullname: null,
          s_address1: null,
          s_address2: null,
          s_city: null,
          s_post_code: null,
          // choose
          o_products: [],
          p_fullname: null,
          p_code: null,
          p_cost: null,
          p_sell: null,
          p_category: null,

        }
    },
    methods:{
        

        async getAllClient1() { 
            console.log("[QuoteAdd-getAllClient] print-1" );
            var all_client_ref = await firebase.firestore().collection("all_clients");
            all_client_ref.onSnapshot(snap => {
                this.all_clients1 = [];
                
                snap.forEach(d => {
                    console.log("[QuoteAdd-getAllClient] print" );

                    var client = d.data();
                    this.all_clients1.push(client);
                });
            });
        },
        ChooseBillTo(ev, b, i){
            console.log("[QuoteAdd-ChooseBillTo] comming soon, click client and retrieve text." + ev + "  "  + i);
            console.log("[QuoteAdd-ChooseBillTo] you have chosen  " + b.c_fullname);
            
            document.getElementById('tmp_b_fullname').innerHTML = b.c_fullname;
            document.getElementById('tmp_b_address1').innerHTML = b.c_address_1;
            document.getElementById('tmp_b_address2').innerHTML = b.c_address_2;
            document.getElementById('tmp_b_city').innerHTML = b.c_city;
            document.getElementById('tmp_b_postcode').innerHTML = b.c_post_code;


            console.log("[QuoteAdd-ChooseBillTo]@ you have chosen" );

            this.showBillToModal = false;
        },
        ChooseShipTo(ev, s, i){
            console.log("[QuoteAdd-ChooseShipTo] comming soon, click client and retrieve text." + ev + "  "  + i);
            console.log("[QuoteAdd-ChooseShipTo] you have chosen" + s.c_fullname);
            s_fullname.value = s.c_fullname;
            s_address1.value = s.c_address_1;
            s_address2.value = s.c_address_2;
            s_city.value = s.c_city;
            s_post_code.value = s.c_post_code;
            
        },
        async ChooseProduct(){

            const typed_product = document.getElementById('p_enter').value;
            console.log("[><QuoteAdd-ChoosePRODUCT] ");
            console.log("[><QuoteAdd-ChoosePRODUCT] typed_product" + typed_product);

            var one_product_ref = await firebase.firestore().collection("all_products").where("p_fullname", "==", typed_product);
            one_product_ref
            .get()
            .then((snapshot) => {
                this.one_product = [];
                snapshot.forEach(d => {

                    var one_product = d.data();

                    document.getElementById('p_code').value = d.data().p_code;
                    document.getElementById('p_category').value = d.data().p_category;
                    document.getElementById('p_cost').value = d.data().p_cost;
                    document.getElementById('p_margin').value = d.data().p_margin;
                    document.getElementById('p_sell1').value = d.data().p_sell;

                    console.log(d.data().p_code);

                    console.log("[><QuoteAdd-ChoosePRODUCT]loop=1 " + one_product);

                    this.o_products.push(one_product);
                })
            })

            
            
        },
        CalculateTotal(){

        const pi_sell1 = document.getElementById('p_sell1').value;
        const pi_sell2 = document.getElementById('p_sell2').value;    
        const tmp_ans = +pi_sell1 +pi_sell2;

        console.log("[CalculateTotal]" + pi_sell1 + " " + pi_sell2 + " " + tmp_ans);


        document.getElementById('q_total').value = tmp_ans;

        },
        
        async writePDF(){
            console.log("[QuoteAdd-writePDF] write pdf.");

            const doc = new jsPDF();  
            doc.addImage(cms_empty_quote, "JPEG",0,0,210,297);
            console.log("[QuoteAdd-writePDF] write pdf.");
            //
            doc.save("quote.pdf");
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
/* ** */
datalist {
  position: absolute;
  max-height: 20em;
  border: 0 none;
  overflow-x: hidden;
  overflow-y: auto;
}

datalist option {
  font-size: 0.8em;
  padding: 0.3em 1em;
  background-color: #ccc;
  cursor: pointer;
}

/* option active styles */
datalist option:hover,
datalist option:focus {
  color: #fff;
  background-color: #036;
  outline: 0 none;
}

#browserdata option {
  font-size: 1.8em;
  padding: 0.3em 1em;
  background-color: #ccc;
  cursor: pointer;
}
</style>