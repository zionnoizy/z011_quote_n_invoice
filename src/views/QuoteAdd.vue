
<template>
    <div class="QuoteAdd">

        <div class="border">
            calculate tmp_sell: {{ tmp_sell }}
            list of choosen product: <p>{{choosen_products}}</p>
            choosen_client_fullname(not bill to):: {{ choosen_client_fullname }}
        </div>
        <p class="dashboard_txt pt-5" ><router-link to="/dashboard" exact>
            
            <a><strong class="link">Dashboard</strong></a></router-link>  > Quote Add
          
        </p>



        <button href="@/assets/files/quote_instruction.pdf" download>Downlaod Instruction</button>

        <div class="grid grid-cols-1 gap-1 ">
            <!--1/3-------------------BILL-SHIP-TO-------------------------------------->
            <div class="mx-auto" style="display: flex;;">
                <!--1/3-->
                <div class="flex-grow-0 mx-2 px-3">
                    <label>1.BILL TO</label>
                    <button class="choose_address_btn border btn btn-secondary btn-square-lg" type="button"
                        data-bs-toggle="modal" data-bs-target="#choose_bill_to" v-on:click="this.getAllClient1();">

                        <p ref="tmp_b_fullname" id="tmp_b_fullname"></p>
                        <p ref="tmp_b_address1" id="tmp_b_address1"></p>
                        <p ref="tmp_b_address2" id="tmp_b_address2"></p>
                        <p ref="tmp_b_city" id="tmp_b_city"></p>
                        <p ref="tmp_b_postcode" id="tmp_b_postcode"></p>

                    </button>
                </div>    
                <!-------------------modal//BillTo------------------------->
                <div class="modal fade" id="choose_bill_to" tabindex="-1" aria-labelledby="" aria-hidden="true">
                    <div class="modal-dialog modal-xl">

                        <div class="modal-content text-black">

                            <div class="modal-header">
                                <h4 class="modal-title"> Add Bill-To </h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close"
                                    v-on:click="showBillToModal = false">X</button>
                            </div>
                            <div class="modal-body" style="background-color: #1267aa;">

                                <div class="px-5 mx-5 grid grid-cols-3 gap-2  ">
                                    <div class="" v-for="b, i in all_clients1">
                                        <div class="client_card row" @click="ChooseBillTo($event, b, i); "
                                            data-bs-dismiss="modal" aria-label="close">
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
                                <button type="submit" class="btn btn-success" v-on:click="submitManufacturer()">Submit Bill
                                    In </button>
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-----------------------------------modal//BillTo------------------------------------->

                <!--1/3-->
                <div class="float-to-bottom">
                    <label>2.SHIP TO</label>
                    <button class="choose_address_btn border btn btn-secondary btn-square-lg" type="button "
                        data-bs-toggle="modal" data-bs-target="#choose_ship_to" v-on:click="this.getAllDelivery();">

                        <p ref="tmp_s_fullname" id="tmp_s_fullname"></p>
                        <p ref="tmp_s_address1" id="tmp_s_address1"></p>
                        <p ref="tmp_s_address2" id="tmp_s_address2"></p>
                        <p ref="tmp_s_city" id="tmp_s_city"></p>
                        <p ref="tmp_s_postcode" id="tmp_s_postcode"></p>
                    </button>
                    <!-------------------modal//ShipTo------------------------->
                    <div class="modal fade" id="choose_ship_to" tabindex="-1" aria-labelledby="" aria-hidden="true">

                        <div class="modal-dialog modal-xl">

                            <div class="modal-content text-black">

                                <div class="modal-header">
                                    <h4 class="modal-title"> List of Address from Client <b>{{ choosen_client_fullname }}</b></h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close"
                                        v-on:click="showShipToModal = false"> X </button>
                                </div>
                                <div class="modal-body" style="background-color: #1267aa;">
                                    <div class="px-5 mx-5 grid grid-cols-3 gap-2  ">
                                        <div class="" v-for="s, i in this_client_delivey">
                                            <div class="client_card row" @click="ChooseShipTo($event, s, i);"
                                                data-bs-dismiss="modal" aria-label="close">
                                                <div>
                                                    <strong>{{ s.d_fullname }}</strong>
                                                </div>
                                                <div>
                                                    <strong>{{ s.d_address_1 }}</strong>
                                                </div>
                                                <div>
                                                    <strong>{{ s.d_address_2 }}</strong>
                                                </div>
                                                <div>
                                                    <p>{{ s.d_city }}, {{ s.d_post_code }} </p>
                                                </div>

                                            </div>




                                        </div>
                                    </div>


                                </div>
                                <div class="modal-footer" style="background-color: #1267aa;">

                                </div>
                            </div>


                        </div>
                    </div>
                    <!---------------------[END] BILL-SHIP-TO-------------------------------------->
                </div>


                <!--3/3-->
                <p class="text-2xl underline">Final Calculation</p>
                <div class="grid grid-cols-1 gap-1 ">

                    <div>
                        <label for="q_subtotal">Subtotal</label>
                        <!--disabled @change="CalculateSubtotal"-->

                        <input ref="q_subtotal" placeholder="Subtotal"  id="q_subtotal" @input="addVatSHip($event.target.value)" disabled  />
                    </div>


                    <div>
                        <label for="q_vat">VAT</label>
                        <input ref="q_vat" placeholder="Vat" id="q_vat" min="1" max="100" value="20" disabled />
                    </div>
                    <div class="d-lg-none">
                        <label for="q_shipping">Shipping</label>
                        <input ref="q_shipping" placeholder="Shipping" id="q_shipping" @input="addVatSHip"/>
                    </div>
                    <div>
                        <label for="q_total">Total</label>
                        <!--@input="CalculateTotal"-->
                        <input ref="q_total" placeholder="Total" id="q_total" class="input-lg"  @input="addVatSHip($event)"
                            disabled />
                    </div>
                    <div>-----------------------------</div>
                    <div>
                        <label for="q_total">Reference Number</label>
                        <input ref="q_reference_number" placeholder="Reference" id="q_reference_number" class="input-lg" />
                    </div>
                </div>


            </div>
            <!--2/3--------------------------------------------------------------------->
            
            <div class="mx-auto grid grid-cols-2 gap-2" style="display: flex;;">
                <div>
                    <button class="choose_address_btn border btn btn-secondary btn-square-lg" type="button "
                        data-bs-toggle="modal" data-bs-target="#choose_products" v-on:click="this.getAllProducts();">
                        Add Products of Goods
                    </button>
                    <!--NEW-----product-modal---------------------------------------------------------------------->
                    <div class="modal fade" id="choose_products" tabindex="-1" aria-labelledby="" aria-hidden="true">
                        <div class="modal-dialog modal-xl">

                            <div class="modal-content text-black">

                                <div class="modal-header">
                                    <h4 class="modal-title"> Choose From Product Below</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="close">X</button>
                                </div>
                                <!---->
                                <div class="modal-body">
                                    <!--v-on:tmp_sell="getChoosenProducts($event);"     -->
                                    <all-products-choose 

                                        v-on:choosen_products="getChoosenProducts($event); " 

                                        :tmp_sell="getTmpSell"

                                    >
                                     
                                    </all-products-choose>

                                    <!--all-rpducts-choose -->
                                    <th>PRODUCT IN DATABASE:</th>
                                    <button class="btn btn-primary " @click.prevent="getAllProductsNewest()">Sort From Oldest </button>
                                    <button class="btn btn-primary " @click.prevent="getAllProductsOldest()">Sort From Newest </button>
                                    <table class="table table-dark" >
                                        <thead>
                                        <tr>
                                        <th scope="col"> - </th>
                                        <th scope="col">Code</th>
                                        <th scope="col">Name</th>

                                        <th scope="col">&#163; Cost</th>
                                        <th scope="col">Margin &percnt;</th>
                                        <th scope="col">Sell</th>
                                        <th scopr="col">choose</th>
                                        </tr>

                                        </thead>

                                        <tbody>
                                        <!--choosenProductSell($event,p, i);-->
                                        <tr class="choose_product" v-for="p, i in all_products"  @click.prevent="choosenOneProduct($event,p, i); ">
                                            <td> {{ p.p_code }} </td>
                                            <td> {{ p.p_fullname }} </td>
                                            <td> {{ p.p_category }} </td>
                                            <td> {{ p.p_cost }} </td>
                                            <td> {{ p.p_margin }} </td>
                                            <td> {{ p.p_sell }} </td>
                                            <td> <div><button class="btn btn-info" @click.prevent="choosenOneProduct($event,p, i); " > [+] </button> </div> </td>
                                        </tr>
                                        
                                        </tbody>

                                        
                                    </table>  


                                    <!--all products choose end-->


                                </div>


                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal" aria-label="close">Add Product To Quote</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--show choosen products-->
                <div>
                    <table class="table table-dark">
                        <thead>
                            <tr class="d-flex">
                                <th class="col-5" scope="col">Choosen Product Name</th>
                                <th class="col-5" scope="col">Product Code</th>
                                <th scope="col">Product Category</th>
                                <th scope="col">Product Cost</th>
                                <th scope="col">Product Margin</th>
                                <th scope="col">Product Sell</th>
                                <th scope="col">Add/ Delete</th>
                            </tr>
                        </thead>


                        <tbody>


                            <tr v-for="p, i in choosen_products" >

                                <td> {{ p.p_fullname }} </td>
                                <td> {{ p.p_code }} </td>
                                <td> {{ p.p_category }} </td>
                                <td> {{ p.p_cost }} </td>
                                <td> {{ p.p_margin }} </td>

                                <td :ref="'add_all_sell'+i" :id="'add_all_sell'+i" th:onload="CalculateSubtotal(i)"> 
                                    {{ p.p_sell }} 
                                </td>

                                <td> 
                                    <button class="btn btn-danger" @click.prevent="minusProduct(i, p.p_fullname)"> [-] </button>
                                </td>
                            </tr>


                            
                    
                        </tbody>
                    </table>
                </div>
            </div>

            <buttons @navigate="navigateTo" ></buttons>

            
            <div>
                <button class="preview_btn btn btn-info btn-lg btn-block" data-bs-toggle="modal"
                    data-bs-target="#preview_quotation" @click.prevent=previewBtn()> Preview Quotation</button>
                <!--@click.prevent="uploadQuotePDF($event)" download -->

                <!------------------modal start-------------------->
                <div class="modal fade" id="preview_quotation" tabindex="-1" aria-labelledby="" aria-hidden="true" >

                    <div class="modal-dialog modal-xl">

                        <div class="modal-content text-black" style="height:1000px;">

                            <div class="modal-header">
                                <h4 class="modal-title"> Preview Qutotation, Please make sure all information is correct </h4>

                            </div>

                            <div class="modal-body">


                                <embed id="preview_quotationPDF" width='100%' height='100%' src='' />




                            </div>
                            <div class="modal-footer" style="background-color: #1267aa;">

                                <button type="button" class="btn btn-success" @click="uploadQuotePDF($event)">
                                    Submit Qutotation 
                                </button>

                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </div>


                    </div>
                </div>
                <!------------------modal end---------------------->

                <button class="preview_btn btn btn-info btn-lg btn-block"> Comming Soon. </button>
            </div>
        </div>








    </div>
</template>


<script>
import jsPDF from 'jspdf';
import "jspdf/dist/polyfills.es.js";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { reactive, computed, ref } from 'vue'

import { onMounted, nextTick, watch } from 'vue';

//ref
import { getStorage, uploadBytes, uploadBytesResumable, ref2 as firebaseStorageRef, getDownloadURL } from "firebase/storage";
import { serverTimestamp } from 'firebase/firestore'
import { save_2_storage, test2_storage, fv, auto_quote_no_generator } from '../firebase';

import autoTable from 'jspdf-autotable';
import AllProductsChoose from "@/components/AllProductsChoose.vue";

import { addDoc, collection } from "@firebase/firestore";

import { app, db, auth } from "@/firebase.js";






export default {
    name: 'QuoteAdd',

    props:{
        tmp_sell: Number

    },
    setup() {
        



        const s_product2 = reactive([]);
        onMounted(async () => {
            try {
                const typing_product = await firebase
                    .firestore() 
                    .collection("all_products")
                    .get();
                typing_product.forEach((doc) => {
                    s_product2.push(doc.data());

                });
            } catch (e) {
                //console.log("Error Typing s_product2");
            }
            

        });
        return { s_product2};

       


    },

    data() {

        return {
            //, 
            convert_to_month: ["01.JAN", "02.FEB", "03.MAR", "04.APR", "05.MAY", "06.JUN", "07.JUL", "08.AUG", "09.SEP", "10.OCT", "11.NOV", "12.DEC"],
            //
            showBillToModal: false,
            all_clients1: [],
            this_client_delivey: [],
            hidden_bill_fullname: null,
            hidden_bill_address_1: null,
            hidden_bill_address_2: null,
            hidden_bill_city: null,
            hidden_bill_insert_date: null,
            hidden_bill_post_code: null,

            client: {
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

            return_base64: null,

            choosen_products: [],
            tmp_sell: 0,

            bodyData: [],

            tmp_url: '',

            merged : {},

            final_merch: {},

            //ALLPRODUCTSHOOSE.VUE
            all_products: [],
            product:{
                p_code: null,
                p_fullname: null,
                p_category: null,
                p_cost: null,
                p_margin: null,
                p_sell: null,
            },
            choosen_products: [],
            choose_product:{
                p_code: null,
                p_fullname: null,
                p_category: null,
                p_cost: null,
                p_margin: null,
                p_sell: null,

            },
            tmp_sell: 0,
            //ALLPRODUCTSHOOSE.VUE
            store_bill_2_info: '',
            choosen_client_fullname: '',
            this_client_delivey: [],
            choose_product:{
                p_code: null,
                p_fullname: null,
                p_category: null,
                p_cost: null,
                p_margin: null,
                p_sell: null,

            },

        }
    },
    components: {
        AllProductsChoose,

    },
    
    methods: {

        getChoosenProducts(e) { //call when new page
            this.choosen_products = e;

        },
        getTmpSell(tmp_sell){ //call when new page ONLY
            alert(e);
            this.tmp_sell = tmp_sell;

            
            document.getElementById('q_subtotal').value = this.tmp_sell;

        },   

        async getAllClient1() {

            //console.log("[QuoteAdd-getAllClient] print-1");
            var all_client_ref = await firebase.firestore().collection("all_clients");
            all_client_ref.onSnapshot(snap => {
                this.all_clients1 = [];

                snap.forEach(d => {
                    //console.log("[QuoteAdd-getAllClient] print");

                    var client = d.data();
                    
                    this.all_clients1.push(client);

                });
            });

        },


        async getAllDelivery() {

        console.log("[QuoteAdd-getAllClient] print-1" + this.store_bill_2_info);

        const all_client_s_delivey_ref = await firebase.firestore().collection("all_delivery").doc(this.store_bill_2_info).collection("this_client_delivery");
        all_client_s_delivey_ref.onSnapshot(snap => {

            //if snap onSnapshot empty()
            this.this_client_delivey = [];
            snap.forEach(d => {
                //console.log("[QuoteAdd-getAllClient] print");

                var delivery = d.data();
                this.this_client_delivey.push(delivery);
 
            });
        });

        },

        ChooseBillTo(ev, b, i) {
            //console.log("[QuoteAdd-ChooseBillTo] comming soon, click client and retrieve text." + ev + "  " + i);
            //console.log("[QuoteAdd-ChooseBillTo] you have chosen  " + b.c_fullname);

            document.getElementById('tmp_b_fullname').innerHTML = b.c_fullname;
            document.getElementById('tmp_b_address1').innerHTML = b.c_address_1;
            document.getElementById('tmp_b_address2').innerHTML = b.c_address_2;
            document.getElementById('tmp_b_city').innerHTML = b.c_city;
            document.getElementById('tmp_b_postcode').innerHTML = b.c_post_code;

            this.store_bill_2_info = b.client_hashid;
            console.log("[QuoteAdd-ChooseBillTo]store_bill_2_info   " + this.store_bill_2_info);

            this.choosen_client_fullname = b.c_fullname;

            //clearn ship to
            document.getElementById('tmp_s_fullname').innerHTML = '';
            document.getElementById('tmp_s_address1').innerHTML = '';
            document.getElementById('tmp_s_address2').innerHTML = '';
            document.getElementById('tmp_s_city').innerHTML = '';
            document.getElementById('tmp_s_postcode').innerHTML = '';
        },
        ChooseShipTo(ev, s, i) {
            //console.log("[QuoteAdd-ChooseShipTo] comming soon, click client and retrieve text." + ev + "  " + i);
            //console.log("[QuoteAdd-ChooseShipTo] you have chosen" + s.c_fullname);
            document.getElementById('tmp_s_fullname').innerHTML = s.d_fullname;
            document.getElementById('tmp_s_address1').innerHTML = s.d_address_1;
            document.getElementById('tmp_s_address2').innerHTML = s.d_address_2;
            document.getElementById('tmp_s_city').innerHTML = s.d_city;
            document.getElementById('tmp_s_postcode').innerHTML = s.d_post_code;


        },
        async EnterProduct() {

            const typed_product = document.getElementById('p_enter').value;
            //console.log("[><QuoteAdd-EnterProduct] ");
            //console.log("[><QuoteAdd-EnterProduct] typed_product" + typed_product);

            var one_product_ref = await firebase.firestore().collection("all_products").where( 'p_fullname', '==', typed_product );
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

                        //console.log(d.data().p_code);

                        //console.log("[><QuoteAdd-EnterProduct]loop=1 " + one_product);

                        this.o_products.push(one_product);
                    })
                })



        },
        async CumulativeTotal() {

            const pi_sell1 = document.getElementById('p_sell1').value;

            //const pi_sell2 = document.getElementById('p_sell2').value;    
            //const tmp_ans = +pi_sell1 +pi_sell2;

            //console.log("[CumulativeTotal] " + pi_sell1);


            document.getElementById('q_total').value = pi_sell1;

        },

        async writePDF() {
            //console.log("[QuoteAdd-writePDF] write pdf.");

            const doc = new jsPDF();
            doc.addImage(cms_empty_quote, "JPEG", 0, 0, 210, 297);
            //console.log("[QuoteAdd-writePDF] write pdf.");
            //
            doc.save("quote.pdf");
        },

        show_typing_product_suggestions() {

            this.show_product_suggestions = true;

        },

        async getAllProducts() {

            var all_product_ref = await firebase.firestore().collection("all_products");

            all_product_ref.onSnapshot((snapshot) => {
                this.s_product = [];

                snapshot.forEach(d => {

                    var s_product_name = d.data();

                    this.s_product.push(s_product_name);

                })
            })


        },
        suggestionSelected(i) {

            this.s_product_name = this.s_product[i].s_product_name;
        },

        suggesting() {
            //console.log("[QuoteAdd]-suggesting  turn on s_flag");
            this.s_flag = true;
        },
        async previewBtn() {

            //console.log("[previewBtn] +++++++++++++++++++++++++++++++++++++++++++=--");
            const doc = new jsPDF(); 
            doc.addImage(cms_empty_quote_no_table, "JPEG", 0, 0, 210, 297);

            //A-add all48 text
            const oo_b_fullname = document.getElementById('tmp_b_fullname').innerHTML;
            const oo_b_a1 = document.getElementById('tmp_b_address1').innerHTML;
            const oo_b_a2 = document.getElementById('tmp_b_address2').innerHTML;
            const oo_b_city = document.getElementById('tmp_b_city').innerHTML;
            const oo_b_postcode = document.getElementById('tmp_b_postcode').innerHTML;
            doc.setFontSize(10);
            doc.text(oo_b_fullname, 6, 94);
            doc.text(oo_b_a1, 6, 99);
            if (oo_b_a2 == "" || oo_b_a2 == null|| oo_b_a2 == ''){
                doc.text(oo_b_city, 6, 104);
                doc.text(oo_b_postcode, 6, 109);

            }
            else{
                doc.text(oo_b_a2, 6, 104);
                doc.text(oo_b_city, 6, 109);
                doc.text(oo_b_postcode, 6, 114);
            }
            
            //B-add all48 text
            const oo_s_fullname = document.getElementById('tmp_s_fullname').innerHTML;
            const oo_s_a1 = document.getElementById('tmp_s_address1').innerHTML;
            const oo_s_a2 = document.getElementById('tmp_s_address2').innerHTML;
            const oo_s_city = document.getElementById('tmp_s_city').innerHTML;
            const oo_s_postcode = document.getElementById('tmp_s_postcode').innerHTML;
            doc.setFontSize(10);
            doc.text(oo_s_fullname, 72, 94);
            doc.text(oo_s_a1, 72, 99);
            if (oo_s_a2 == "" || oo_s_a2 == null|| oo_s_a2 == ''){
                doc.text(oo_s_city, 72, 104);
                doc.text(oo_s_postcode, 72, 109);  
            }
            else{
                doc.text(oo_s_a2, 72, 104);
                doc.text(oo_s_city, 72, 109);
                doc.text(oo_s_postcode, 72, 114);   

            }

            //C-quote no + invoice date + ref
            const quote_number = await auto_quote_no_generator2();
            const input_reference_number = document.getElementById('q_reference_number').value;
            const myTimestamp = firebase.firestore.Timestamp.now();
            let todayDateTime = myTimestamp.toDate().toLocaleDateString("en-UK");
            doc.text(quote_number, 159, 94);
            doc.text(todayDateTime, 159, 100);
            doc.text(input_reference_number, 159, 105);
            let bodyData = [];
            this.choosen_products.forEach(element => {      
                var tmp = [element.p_fullname, element.p_code, element.p_quantity, element.p_sell,"discoun999t", element.p_sell];
  
                bodyData.push(tmp);


            });    
            
            //https://github.com/simonbengtsson/jsPDF-AutoTable/blob/master/examples/examples.js
            var finalY = doc.lastAutoTable.finalY || 10
            autoTable(doc, {
                //html: '#cms-quote-table',
                theme: 'striped',
                startY: finalY + 112, //important
                columnStyles: {
                    0: { cellWidth: 65 },
                    1: { cellWidth: 18 },
                    2: { cellWidth: 15 },
                    3: { cellWidth: 15 },
                    4: { cellWidth: 23 },
                    5: { cellWidth: 30 },
                    // etc
                },
                tableWidth: 'auto',

                margin: { top: 0, right: 10, bottom: 0, left: 10 }, //important2
                head: [['DESCRIPTION', 'CODE', 'QTY', 'UNIT', 'DISCOUNT', 'TOTAL']],
                body: bodyData
            })
            var string = doc.output('datauristring');
            var embed = "<embed width='100%' height='100%' src='" + string + "'/>"

            const a = document.getElementById('preview_quotationPDF');
            var clone = a.cloneNode(true);
            clone.setAttribute('src', string);
            a.parentNode.replaceChild(clone, a);

            var base64 = doc.output('datauri');
            this.return_base64 = base64;



            //console.log("[previewBtn] +++++++++++++++++++++++++++++++++++++++++++=--");


        },
        //https://medium.com/runthatline/uploading-files-to-firebase-cloud-storage-using-vue-3-and-the-composition-api-d8370d1c03f7
        async uploadQuotePDF(e) {

            const myTimestamp = firebase.firestore.Timestamp.now(); //
            let todayDateTime = myTimestamp.toDate().toLocaleDateString("en-UK"); //
            /*
            const today_year = myTimestamp.toDate().getFullYear();
            const tmp_today_month = myTimestamp.toDate().getMonth();
            const month_folder = this.convert_to_month[tmp_today_month];
            const path_string = "/all_quote/" + today_year + "/" + month_folder + "/"
            */
            


            // storage ref + upload task

            //[new_task] create all pic of information push to firestore.
            //https://www.koderhq.com/tutorial/vue/firestore-database/
            

            

            

            const quote_number = await auto_quote_no_generator2();

            let reference_number = document.getElementById('q_reference_number').value;

            const ref = collection(db, "ALL_quote");
            const ref2 = collection(db, "ALL_quote");    

            var choosen_product_qty = Object.keys(this.choosen_products).length;
            let tmp_ff = Object.fromEntries(
                
                
                this.choosen_products.flatMap((element, index) => [
                    [`q_p${index + 1}_fullname`, element.p_fullname],
                    [`q_p${index + 1}_code`, element.p_code],
                    [`q_p${index + 1}_category`, element.p_category],
                    [`q_p${index + 1}_cost`, element.p_cost],
                    [`q_p${index + 1}_margin`, element.p_margin],
                    [`q_p${index + 1}_sell`, element.p_sell],
                    
                ]),
                
                
            
            );
            
            tmp_ff["choosen_product_qty"] = choosen_product_qty;

            console.log("tmp_ff  " + tmp_ff);

            
            
            //upload multi doc
            ///////////////////////////////////////////////////////////////////////////
            const obj_ref = {          
                q_bill_fullname: document.getElementById('tmp_b_fullname').innerHTML,
                q_bill_address1: document.getElementById('tmp_b_address1').innerHTML,
                q_bill_address2: document.getElementById('tmp_s_address2').innerHTML, 
                q_bill_city: document.getElementById('tmp_b_city').innerHTML,
                q_bill_postcode: document.getElementById('tmp_b_postcode').innerHTML,

                q_ship_fillname: document.getElementById('tmp_s_fullname').innerHTML,
                q_ship_address1: document.getElementById('tmp_s_address1').innerHTML,
                q_ship_address2: document.getElementById('tmp_s_address2').innerHTML, 
                q_ship_city: document.getElementById('tmp_s_city').innerHTML,
                q_ship_postcode: document.getElementById('tmp_s_postcode').innerHTML, 

                q_quote_number: quote_number, 
                q_invoice_number: '', 
                q_uploaded_date: todayDateTime,
                q_ref: reference_number,
                q_po: null,
                q_uploaded_date_timestamp: serverTimestamp(), //
                q_extra_space_1: '',
                q_extra_space_2: '',
                q_extra_space_3: '',
                q_extra_space_4: '',
            }

            let hash_id = '';
            addDoc(ref, {obj_ref, tmp_ff})
            .then(docRef => {
                console.log(docRef.id);
                const get_id = firebase.firestore().collection("ALL_quote").doc(docRef.id);
                const string = "/all_quote/" + docRef.id + "/";
                test2_storage( docRef.id, string, this.return_base64);//use this    
                get_id
                    .update({
                        quote_hashid: docRef.id,
                    })
                    .then(() => {
                        //console.log("set doc");

                        get_id.get().then((d) => {
                        });
                    });

            })

        },


        //seperate function
        firebaseStorageUpload() {
            //console.log("[firebaseStorageUpload]==================================");
            const storage = getStorage();
            const myTimestamp = firebase.firestore.Timestamp.now();
            const today_year = myTimestamp.toDate().getFullYear();
            const tmp_today_month = myTimestamp.toDate().getMonth();
            //console.log("[firebaseStorageUpload] " + myTimestamp + " " + today_year + " " + tmp_today_month);
            const month_folder = this.convert_to_month[tmp_today_month];

            //const today_month = convert_month(tmp_today_month);
            const path_string = "/all_quote/" + today_year + "/" + month_folder + "/"
            //console.log();
            //console.log("[firebaseStorageUpload] + ");
            test2_storage(path_string, this.return_base64);
            const storageref = ref(storage, path_string);
            const uploadtask = uploadBytesResumable(storageref, DATA_HERE);

            uploadtask.on(
                'state_changed',
                (snapshot) => {
                    //console.log("[firebaseStorageUpload]  uploaded");
                    //this.uploadValue = ( snapshot.bytesTransferred / snapshot.totalBytes )*100;
                },
                error => {
                    //console.log(error.message)
                },
                () => {
                    this.uploadValue = 'upload success';
                    storageRef.snapshot.ref.getDownloadURL().then((url) => {
                        this.picture = url;
                    });
                },
                async () => {
                    //console.log("[firebaseStorageUpload] 2 uploaded");
                    downloadUrl.value = await getDownloadURL(uploadtask.snapshot.ref)

                },
            );
            //console.log("[firebaseStorageUpload]==================================");
        },
        danny(){
            let q_number = auto_quote_no_generator2();
            const myTimestamp = firebase.firestore.Timestamp.now();
            let today = myTimestamp.toDate().toLocaleDateString("en-UK");
            const input_ref = document.getElementById('q_reference_number').value;
            
            const q_subtotal = document.getElementById('q_subtotal').value
            const vat = document.getElementById('q_vat').value;
            const input_shipping = document.getElementById('q_shipping').value;
            let cal_total = addVatSHip(q_subtotal, vat, input_shipping);
            let po = "";

            //generatePDFSecurantly()



            //fbAddAllInfo2Quote()

            
            //firebaseStorageUpload()
        },
        CalculateSubtotal(i){

            choosen_products.forEach(element => {      

            this.tmp_sell = this.tmp_sell + element.p_sell;

            document.getElementById('q_subtotal').value = this.tmp_sell;
            console.log("print");

            });    

            console.log("[calculateSubtotal?] print         ");

            let ans = 0;
            let dynamic = "add_all_sell"+i;
            let cum = document.getElementById(dynamic).value;
            let b = td.getElementById(dynamic).innerText;

            for(let z=0; z<i; ++z){
                ans = ans + cum;
                console.log("[calculateSubtotal?]" + ans);
            }
            const one_p_money = document.getElementById(dynamic).value;
            //console.log("[CalculateSubtotal]       " + one_p_money);

            document.getElementById('q_subtotal').value = this.tmp_ans;

        },
        CalculateTotal(){
            document.getElementById('q_total').value = tmp_ans;
        },
        minusProduct(i, p_fullname){
            var find_i = this.choosen_products.indexOf(this.choosen_products.p_fullname);
            this.choosen_products.splice(i, 1);

        },
        createSHipping(){
            var input = document.createElement("input");
            input.setAttribute('type', 'text');
            input.appendChildinout;
        },
        ////////////////////////////ALLPRODCUTSCHOOSE
        async getAllProductsNewest() { 
        var all_product_ref = await firebase.firestore().collection("all_products");
        all_product_ref.orderBy("p_insert_date", "desc")
            .onSnapshot((snapshot) => {
            if (snapshot.empty) {
                //console.log("[getAllProductsNewest] all_products not exist.")
                
            }
            else{
                this.all_products = [];
                snapshot.forEach(d => {


                    var product = d.data();
                    //console.log("[ProductAll]-2 " + product);
                    this.all_products.push(product);
                })
            }  
            })
        var lastThreeRes = await all_product_ref.orderBy('p_insert_date', 'desc').limit(3).get();
        },

        async getAllProductsOldest() { 
        var all_product_ref = await firebase.firestore().collection("all_products");
        all_product_ref.orderBy("p_insert_date", "asc")
            .onSnapshot((snapshot) => {
            if (snapshot.empty) {
                //console.log("[getAllProductsNewest] all_products not exist.")
                
            }
            else{
                this.all_products = [];
                snapshot.forEach(d => {
                    var product = d.data();
                    //console.log("[ProductAll]-3 " + product);
                    this.all_products.push(product);
                })
            }  
            })
        },

        async choosenOneProduct(ev, p, i){
        var choose_product_ref = await firebase.firestore().collection("all_products").where("p_fullname", "==", p.p_fullname);
        choose_product_ref.onSnapshot((snapshot) => {

            snapshot.docs.forEach(d => {
                var product = d.data();
                this.choosen_products.push(product);
                var tmp_one_sell = parseFloat(d.data().p_sell);  
                this.tmp_sell = this.tmp_sell + tmp_one_sell;


                //this.$root.$emit('choosenOneProduct', this.choosen_products);
                console.log("!!!!!!!!!!!!!!!!!!!!!!!updateing this.tmp_sell     " + this.tmp_sell);
                let input2 = document.getElementById('q_subtotal').value; 
                console.log("!!!!!!!!!2" +input2 )

                document.getElementById('q_subtotal').setAttribute('value', this.tmp_sell);
                addVatSHip();

                //this.$root.$emit('choosenOneProduct', this.tmp_sell);
            })
            })
        },
    },
    created() {


        this.getAllProductsNewest();

        this.getAllProducts();

    },
}
////////////////////////////////////////////////////////////////////////////////////
function add_zero(num){

    const  onez= "0";
    const twoz= "00";
    const threez = "000";
    const fourz = "0000";

    if (num > 0 && num < 10){

    let returnans = fourz + num;
    
    return returnans;
    }
    else if (num => 10 && num < 100){
    
    let returnans = threez + num;

    return returnans;
    }
    else if (num => 100 && num < 1000){

    let returnans = twoz + num;

    return returnans;
    }
    else if (num => 1000 && num < 10000){

    let returnans = onez + num;

    return returnans;
    }

}
async function auto_quote_no_generator2(){

    let ans = "";
    let first_half =  "Q-CMS";

    const q = firebase.firestore().collection('ALL_quote');
    await firebase.firestore().collection("ALL_quote").get().then( function(querySnapshot) {

    
    const dSize = querySnapshot.size;

    if (dSize === undefined){
        dSize = "0";
    }
    const docSize = dSize.toString();


    let addedz = add_zero(docSize);
    

     ans =  first_half + addedz;
     //console.log("auto_quote_no_generator5 " + ans);
    
    
     

    });
    
    return ans.toString();
}

function addVatSHip(){
    console.log("SUBtotal input tag changed " );
    let i_subtotal = document.getElementById('q_subtotal').value;
    let i_vat = document.getElementById('q_vat').value;
    let i_shipping = document.getElementById('q_shipping').value;

    
    
    //let i_extra = document.getElementById('q_e1').value;
    let added_vat = +i_subtotal + (+(i_subtotal / 100) * +i_vat); 

    console.log("SUBtotal input tag changed " + i_subtotal +" "+ i_vat +" "+ added_vat);


    let ans = +added_vat + +i_shipping;

    document.getElementById('q_total').setAttribute('value', ans);


    console.log("SUBtotal input tag changed2 " + ans);
    return ans;

}


</script>

<style>
</style>