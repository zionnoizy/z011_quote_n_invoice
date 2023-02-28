
<template>
    <div class="QuoteAdd">

        <p>test997</p>
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
                        data-bs-toggle="modal" data-bs-target="#choose_ship_to" v-on:click="this.getAllClient1();">

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
                                    <h4 class="modal-title"> List of Address </h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close"
                                        v-on:click="showShipToModal = false"> X </button>
                                </div>

                                <div class="modal-body">

                                    <div class="px-5 mx-5 grid grid-cols-3 gap-2  ">
                                        <div class="" v-for="s, i in all_clients2">
                                            <div class="client_card row" @click="ChooseShipTo($event, s, i);"
                                                data-bs-dismiss="modal" aria-label="close">
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
                        <input ref="q_subtotal" placeholder="Subtotal" id="q_subtotal" disabled />
                    </div>
                    <div>
                        <label for="q_vat">VAT</label>
                        <input ref="q_vat" placeholder="Vat" id="q_vat" value="20" disabled />
                    </div>
                    <div>
                        <label for="q_shipping">Shipping</label>
                        <input ref="q_shipping" placeholder="Shipping" id="q_shipping" />
                    </div>
                    <div>
                        <label for="q_total">Total</label>
                        <input ref="q_total" placeholder="Total" id="q_total" class="input-lg" @input="CumulativeTotal"
                            disabled />
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

                                    <all-products-choose v-on:choosen_products="getChoosenProducts($event)">
                                    </all-products-choose>



                                </div>


                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal" aria-label="close">Add Product To Quote</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--show choose products-->
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


                            <tr v-for="p in choosen_products">

                                <td> {{ p.p_fullname }} </td>
                                <td> {{ p.p_code }} </td>
                                <td> {{ p.p_category }} </td>
                                <td> {{ p.p_cost }} </td>
                                <td> {{ p.p_margin }} </td>
                                <td id="add_all_sell"> {{ p.p_sell }} </td>
                                <td> <button class="btn btn-info" @click.prevent="plusProduct"> [+] </button>
                                    <button class="btn btn-danger" @click.prevent="minusProduct"> [-] </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>




            <div>
                <button class="preview_btn btn btn-info btn-lg btn-block" data-bs-toggle="modal"
                    data-bs-target="#preview_quotation" @click.prevent=previewBtn()> Preview Quotation</button>
                <!--@click.prevent="uploadQuotePDF($event)" download -->

                <!------------------modal start-------------------->
                <div class="modal fade" id="preview_quotation" tabindex="-1" aria-labelledby="" aria-hidden="true">

                    <div class="modal-dialog modal-xl">

                        <div class="modal-content text-black">

                            <div class="modal-header">
                                <h4 class="modal-title"> Preview Qutotation, Please make sure all information is correct, we
                                    cannot able to change back later on. </h4>

                            </div>

                            <div class="modal-body">


                                <embed id="preview_quotationPDF" width='100%' height='100%' src='' />




                            </div>
                            <div class="modal-footer" style="background-color: #1267aa;">
                                <button type="button" class="btn btn-success" @click="uploadQuotePDF($event)">Submit
                                    Qutotation </button>
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

import { onMounted, nextTick } from 'vue';

//ref
import { getStorage, uploadBytes, uploadBytesResumable, ref2 as firebaseStorageRef, getDownloadURL } from "firebase/storage";
import { serverTimestamp } from 'firebase/firestore'
import { save_2_storage, test2_storage, fv } from '../firebase';

import autoTable from 'jspdf-autotable';
import AllProductsChoose from "@/components/AllProductsChoose.vue";

import { addDoc, collection } from "@firebase/firestore";

import { app, db, auth } from "@/firebase.js";



export default {
    name: 'QuoteAdd',
    props: ['choosen_products'],
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
                console.log("Error Typing s_product2");
            }
        });
        return { s_product2 };
    },
    data() {

        return {
            //, 
            convert_to_month: ["01.JAN", "02.FEB", "03.MAR", "04.APR", "05.MAY", "06.JUN", "07.JUL", "08.AUG", "09.SEP", "10.OCT", "11.NOV", "12.DEC"],
            //
            showBillToModal: false,
            all_clients1: [],
            all_clients2: [],
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

            bodyData: [],

            tmp_url: '',

            merged : {},

            final_merch: {},
        }
    },
    components: {
        AllProductsChoose,

    },
    methods: {
        getChoosenProducts(e) {
            this.choosen_products = e;
            console.log("#[QuoteAdd-------]");
            console.log("choosen_products changes.");
            console.log("#[QuoteAdd-------]");
        },

        async getAllClient1() {

            console.log("[QuoteAdd-getAllClient] print-1");
            var all_client_ref = await firebase.firestore().collection("all_clients");
            all_client_ref.onSnapshot(snap => {
                this.all_clients1 = [];
                this.all_clients2 = [];
                snap.forEach(d => {
                    console.log("[QuoteAdd-getAllClient] print");

                    var client = d.data();
                    this.all_clients1.push(client);
                    this.all_clients2.push(client);
                });
            });

        },


        ChooseBillTo(ev, b, i) {
            console.log("[QuoteAdd-ChooseBillTo] comming soon, click client and retrieve text." + ev + "  " + i);
            console.log("[QuoteAdd-ChooseBillTo] you have chosen  " + b.c_fullname);

            document.getElementById('tmp_b_fullname').innerHTML = b.c_fullname;
            document.getElementById('tmp_b_address1').innerHTML = b.c_address_1;
            document.getElementById('tmp_b_address2').innerHTML = b.c_address_2;
            document.getElementById('tmp_b_city').innerHTML = b.c_city;
            document.getElementById('tmp_b_postcode').innerHTML = b.c_post_code;


            console.log("[QuoteAdd-ChooseBillTo]@ you have chosen");

            this.showBillToModal = false;
        },
        ChooseShipTo(ev, s, i) {
            console.log("[QuoteAdd-ChooseShipTo] comming soon, click client and retrieve text." + ev + "  " + i);
            console.log("[QuoteAdd-ChooseShipTo] you have chosen" + s.c_fullname);
            document.getElementById('tmp_s_fullname').innerHTML = s.c_fullname;
            document.getElementById('tmp_s_address1').innerHTML = s.c_address_1;
            document.getElementById('tmp_s_address2').innerHTML = s.c_address_2;
            document.getElementById('tmp_s_city').innerHTML = s.c_city;
            document.getElementById('tmp_s_postcode').innerHTML = s.c_post_code;


        },
        async EnterProduct() {

            const typed_product = document.getElementById('p_enter').value;
            console.log("[><QuoteAdd-EnterProduct] ");
            console.log("[><QuoteAdd-EnterProduct] typed_product" + typed_product);

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

                        console.log("[><QuoteAdd-EnterProduct]loop=1 " + one_product);

                        this.o_products.push(one_product);
                    })
                })



        },
        async CumulativeTotal() {

            const pi_sell1 = document.getElementById('p_sell1').value;

            //const pi_sell2 = document.getElementById('p_sell2').value;    
            //const tmp_ans = +pi_sell1 +pi_sell2;

            console.log("[CumulativeTotal] " + pi_sell1);


            document.getElementById('q_total').value = pi_sell1;

        },

        async writePDF() {
            console.log("[QuoteAdd-writePDF] write pdf.");

            const doc = new jsPDF();
            doc.addImage(cms_empty_quote, "JPEG", 0, 0, 210, 297);
            console.log("[QuoteAdd-writePDF] write pdf.");
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
            console.log("[QuoteAdd]-suggesting  turn on s_flag");
            this.s_flag = true;
        },
        previewBtn() {

            console.log("[previewBtn] +++++++++++++++++++++++++++++++++++++++++++=--");
            const doc = new jsPDF(); 
            doc.addImage(cms_empty_invoice_no_table, "JPEG", 0, 0, 210, 297);

            //A-add all48 text
            const oo_b_fullname = document.getElementById('tmp_b_fullname').innerHTML;
            const oo_b_a1 = document.getElementById('tmp_b_address1').innerHTML;
            const oo_b_a2 = document.getElementById('tmp_b_address2').innerHTML;
            const oo_b_city = document.getElementById('tmp_b_city').innerHTML;
            const oo_b_postcode = document.getElementById('tmp_b_postcode').innerHTML;
            console.log("[previewBtn] -------bill-in");
            doc.setFontSize(10);
            doc.text(oo_b_fullname, 6, 93);
            doc.text(oo_b_a1, 6, 98);
            doc.text(oo_b_a2, 6, 103);
            doc.text(oo_b_city, 6, 108);
            doc.text(oo_b_postcode, 6, 113);


            //B-add all48 text
            const oo_s_fullname = document.getElementById('tmp_s_fullname').innerHTML;
            const oo_s_a1 = document.getElementById('tmp_s_address1').innerHTML;
            const oo_s_a2 = document.getElementById('tmp_s_address2').innerHTML;
            const oo_s_city = document.getElementById('tmp_s_city').innerHTML;
            const oo_s_postcode = document.getElementById('tmp_s_postcode').innerHTML;

            console.log("[previewBtn] -------ship-to");
            doc.setFontSize(10);
            doc.text(oo_s_fullname, 72, 93);
            doc.text(oo_s_a1, 72, 98);
            doc.text(oo_s_a2, 72, 103);
            doc.text(oo_s_city, 72, 108);
            doc.text(oo_s_postcode, 72, 113);

            //let bodyData = [];

            

            //$this is for autoTable
            let bodyData = [];
            this.choosen_products.forEach((element, index, array) => {
                console.log("[previewBtn-choosen_products1]" + element.p_fullname + " " + index + " " + array); // 100, 200, 300
                console.log(index); // 0, 1, 2
                console.log(array); // same myArray object 3 times
                bodyData.push(element);
                console.log("[previewBtn-choosen_products1]" + bodyData[0].p_fullname);
            });

            //$this is for firebase firestore
            let ff = {};
            let tmp_ff = {};

            this.choosen_products.forEach((element, index, array) => {
                //q_p1_fullname
                let tmp1 = "q_p"+(index+1)+"_fullname";
                let tmp2 = "q_p"+(index+1)+"_code";
                let tmp3 = "q_p"+(index+1)+"_category";
                let tmp4 = "q_p"+(index+1)+"_cost";
                let tmp5 = "q_p"+(index+1)+"_margin";
                let tmp6 = "q_p"+(index+1)+"_sell";
                console.log(element.p_fullname + " " + element.p_category + "       "  +  tmp1);
                /*
                ff.this.tmp1 = element.p_fullname,
                ff.this.tmp2 = element.p_code,
                ff.this.tmp3 = element.p_category,
                ff.this.tmp4 = element.p_cost,
                ff.this.tmp5 = element.p_margin,
                ff.this.tmp6 = element.p_sell,
                */
                tmp_ff = {
                    [tmp1]: element.p_fullname,
                    [tmp2]: element.p_code,
                    [tmp3]: element.p_category,
                    [tmp4]: element.p_cost,
                    [tmp5]: element.p_margin,
                    [tmp6]: element.p_sell,
                };
                let merged = { tmp_ff, ff }; 

                Object.keys(tmp_ff).forEach(key => {
                    console.log("[previewBtn-choosen_products2]" + key, tmp_ff[key]); //not cimulative
                });


                console.log("[previewBtn-choosen_products2]        " ); // 100, 200, 300
                console.log(index); // 0, 1, 2
                console.log(array); // same myArray object 3 times
                bodyData.push(element);

                console.log("[previewBtn-choosen_products2]" + Object.keys(merged).tmp1);
            });



            //https://github.com/simonbengtsson/jsPDF-AutoTable/blob/master/examples/examples.js
            var finalY = doc.lastAutoTable.finalY || 10
            autoTable(doc, {
                //html: '#cms-quote-table',
                theme: 'striped',
                startY: finalY + 109, //important
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
                body: [
                    //[bodyData[0].p_fullname, bodyData[0].p_code, bodyData[0].p_quantity,"£"+bodyData[0].p_sell, "discount", bodyData[0].p_sell]

                ]
            })



            //////////////////////////////////////////////////////////////////////
            var string = doc.output('datauristring');
            var embed = "<embed width='100%' height='100%' src='" + string + "'/>"

            const a = document.getElementById('preview_quotationPDF');
            var clone = a.cloneNode(true);
            clone.setAttribute('src', string);
            a.parentNode.replaceChild(clone, a);

            var base64 = doc.output('datauri');
            this.return_base64 = base64;



            console.log("[previewBtn] +++++++++++++++++++++++++++++++++++++++++++=--");


        },
        //https://medium.com/runthatline/uploading-files-to-firebase-cloud-storage-using-vue-3-and-the-composition-api-d8370d1c03f7
        uploadQuotePDF(e) {

            
            const a = getStorage();
            const myTimestamp = firebase.firestore.Timestamp.now();
            const today_year = myTimestamp.toDate().getFullYear();
            const tmp_today_month = myTimestamp.toDate().getMonth();

            console.log("[uploadQuotePDF] " + myTimestamp + " " + today_year + " " + tmp_today_month);
            const month_folder = this.convert_to_month[tmp_today_month];

            //const today_month = convert_month(tmp_today_month);
            const path_string = "/all_quote/" + today_year + "/" + month_folder + "/"
            console.log();
            
            
            let tmp3 = '';
            let tmp2 = test2_storage( tmp3, path_string, this.return_base64);
            console.log("[uploadQuotePDF] final_pdf url + " + tmp2 + " " + tmp3);    

            // storage ref + upload task

            //[new_task] create all pic of information push to firestore.
            //https://www.koderhq.com/tutorial/vue/firestore-database/

            const ref = collection(db, "ALL_quote");

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

                q_quote_number: "THIS_IS_QUOTE_NUMBER",
                q_invoice_number: "THIS_IS_INVOICE_NUMBER",
                q_category: null,
                q_ref: null,
                q_po: null,

                //q_pdf_link: 'THIS_IS_FIRESTORE_URL',
            }

            let hash_id = '';
            addDoc(ref, obj_ref)
                .then(docRef => {

                    const get_id = firebase.firestore().collection("ALL_quote").doc(docRef.id);
                    console.log("[QuoteAdd] Document written with ID: ", docRef.id);

                    const string = "/all_quote/" + docRef.id + "/";
                    test2_storage( docRef.id, string, this.return_base64);//use this    
                    get_id
                        .update({
                            quote_hashid: docRef.id,
                        })
                        .then(() => {
                            console.log("set doc");

                            get_id.get().then((d) => {
                                console.log("updated data:", d.data());
                            });
                        });
                    ////////////////////////////////////////////////////////////
                    /*
                    const storage = getStorage(app);
                    const storage_ref = ref(storage, "tex5.txt");
                    uploadString(storage_ref, pdf_base64, 'data_url')
                    .then((snapshot) => {

                        getDownloadURL(snapshot.ref).then(async (url) => {
                        
                        get_id
                        .update({
                            q_pdf_link: url,
                        })
                        .then(() => {
                            console.log("set doc");

                            get_id.get().then((d) => {
                                console.log("updated data:", d.data());
                            });
                        });
                        tmp = url.toString();


                        return { tmp };


                        })

                        console.log('Uploaded a base64 string pdf version!');
                    });
                    */
                    ////////////////////////////////////////////////////////////
                })
                
                 
        },

        doSomenthing(data) {
            this.$root.$on('ChooseOneProduct', function (choosen_products) {
                console.log(choosen_products)
            })
        },


        firebaseStorageUpload() {
            console.log("[firebaseStorageUpload]==================");
            const storage = getStorage();
            const myTimestamp = firebase.firestore.Timestamp.now();
            const today_year = myTimestamp.toDate().getFullYear();
            const tmp_today_month = myTimestamp.toDate().getMonth();
            console.log("[firebaseStorageUpload] " + myTimestamp + " " + today_year + " " + tmp_today_month);
            const month_folder = this.convert_to_month[tmp_today_month];

            //const today_month = convert_month(tmp_today_month);
            const path_string = "/all_quote/" + today_year + "/" + month_folder + "/"
            console.log();
            console.log("[firebaseStorageUpload] + ");
            test2_storage(path_string, this.return_base64);

            console.log("[firebaseStorageUpload] ++ ");

            // storage ref + upload task
            const storageref = ref(storage, path_string);
            const uploadtask = uploadBytesResumable(storageref, DATA_HERE);

            uploadtask.on(
                'state_changed',
                (snapshot) => {
                    console.log("[firebaseStorageUpload]  uploaded");
                    //this.uploadValue = ( snapshot.bytesTransferred / snapshot.totalBytes )*100;
                },
                error => {
                    console.log(error.message)
                },
                () => {
                    this.uploadValue = 'upload success';
                    storageRef.snapshot.ref.getDownloadURL().then((url) => {
                        this.picture = url;
                    });
                },
                async () => {
                    console.log("[firebaseStorageUpload] 2 uploaded");
                    downloadUrl.value = await getDownloadURL(uploadtask.snapshot.ref)

                },
            );
            console.log("[firebaseStorageUpload]==================");
        }
    },
    created() {

        this.getAllProducts();

    },
}


</script>

<style>
.client_card:hover {
    background-color: #323829;
}

.choose_address_btn {
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

input[disabled] {
    pointer-events: none
}</style>