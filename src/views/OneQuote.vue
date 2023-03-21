<template>
    <div class="OneQuote">

        <div class="border">

            <p> debug here only - view specific quote.</p>
            <p> The quote id is= {{ $route.params.id }}</p>
            <p> One Q Hash is= {{ $route.query.this_one_q_hash_number }} <!--cannot pass each quote to here--> </p>

            <p> One PDF Link is= {{ $route.query.this_one_q_pdf_link }}</p>
            <input class="quote_num" id="quote_num"/> <br> {{ copy_q_b_f }}
            <br>
            <input class="ref_num" id="ref_num"/> {{ copy_exact_product }}

            <p> The invoice id is= {{ invoice_hashid }}</p>

        </div>

        <div class="grid grid-cols-3">

            <div>
                <iframe id="preview_quotenPDF"  class="preview_quotenPDF" src="" download="toquotationnumber.pdf" width="800px" height="600px"  ></iframe>
                
                
            </div>

            <div class="grid grid-cols-1 gap-1">

                <!--1-->
                <div>
                    <button class="choose_address_btn border btn btn-secondary" type="button"
                        data-bs-toggle="modal" data-bs-target="#edit_quotation">
                        Edit Quotation
                    </button>
                    <div class="modal fade" id="edit_quotation" tabindex="-1" aria-labelledby="" aria-hidden="true" >
                        <div class="modal-dialog modal-xl" style="width:150%">

                            <div class="modal-content text-black">

                                <div class="modal-header">
                                    <h4 class="modal-title"> Edit Your Quotation Below.</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="close">X</button>
                                </div>
                                <div class="modal-body">
                                    <!--------------------------EDIT QUOTATION START----------------------->
                                    <div class="grid grid-cols-2 gap-1 ">
                                        <div class="mx-auto" style="display: flex;;">
                                            <div class="flex-grow-0 mx-2 px-3">
                                                <label>1.BILL TO (CLIENT)</label>
                                                <select class="form-select" aria-label="Default select example"  >
                                                    <option selected> {{copy_q_b_f}} </option>
                                                    <option v-for="c in all_client" :value="`${c.c_fullname}`">{{c.c_fullname}}</option>
                                                </select>
                                            </div>    
                                            <div class="flex-grow-0 mx-2 px-3">
                                                <label>2.SHIP TO (DELIVERY)</label>
                                                <select class="form-select" aria-label="Default select example"  >
                                                    <option selected> {{ copy_q_s_f }} </option>
                                                    <option v-for="d in all_delivery" :value="`${d.d_fullname}`">{{d.d_fullname}}</option>
                                                </select>

                                            </div>  

                                            <div class="flex-grow-0 mx-2 px-3">
                                                <label>3.REFERENCE NUMBER</label>
                                                <p><strong> {{ showREFERENCE2 }} </strong></p>
                                                <!-- <input ref="i_reference" placeholder="Change Your Reference" id="i_reference" required/>  -->
                                            </div> 
                                        </div>   
                                        <div class="mx-auto" style="display: flex;;">
                                            <label>4. Quote No. </label>
                                            <p><strong> {{ copy_q_number }} </strong></p>
                                        </div>    
                                    </div>    
                                    

                                    <div class="" >
                                        <label>5. Products </label>
                                        <div class="grid grid-cols-5 gap-1">
                      
                                            <div>Items</div>
                                            <div>Code</div>
                                            <div>Qty</div> <!--missing-->
                                            <div>Unit</div>
                                            <div>Discount</div> <!--missing-->
                                        </div>
                                        <div class="grid grid-cols-6 gap-1" v-for="(k, i) in copy_exact_product" >

                                            <div>
                                                <strong>{{ k.p_fullname }}</strong>
                                            </div>

                                            <div>
                                                <strong>{{ k.p_code }}</strong>
                                            </div>
                                            <div>
                                                <input class="form-control" :ref="'i_quality'+i" :id="'i_quality'+i"  placeholder="Qty" v-model="k.p_quantity" >
                                            </div>
                                            <div>
                                                <input class="form-control" :ref="'i_unit'+i" :id="'i_unit'+i"  placeholder="Unit" v-model="k.p_unit" >
                                            </div>
                                            <div>
                                                <input class="form-control" :ref="'i_discount'+i" :id="'i_discount'+i"  placeholder="Discount" v-model="k.p_discount">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    <div class="modal-footer" style="background-color: #1267aa;">
                                        <button type="button" data-bs-dismiss="modal" aria-label="close" class="btn btn-warning" @click="UpdateQuote($event, this.this_one_q_hash_number)">SAVE / CHANGE YOUR QUOTE</button>
                                    </div>
                            </div>




                        </div>
                    </div>
                </div>
                <div>
                    <button class="border btn btn-secondary" type="button"
                        data-bs-toggle="modal" data-bs-target="#add_po_number" >
                        Create New Invoice From This Quotation w/ PO, Don't Add The Invoice Again If you see right-hand-side has one already.
                    </button>
                    <div class="modal fade" id="add_po_number" tabindex="-1" aria-labelledby="" aria-hidden="true">
                        <div class="modal-dialog modal-xl">

                            <div class="modal-content text-black">

                                <div class="modal-header">
                                    <h4 class="modal-title"> After you've checked you quotation has no problem, please type you PO number, PO number is mandetory for an invoice.</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="close">X</button>
                                </div>
                                <div class="modal-body">
                                    <input ref="po_number" id="po_number" placeholder="PO Number" />
                                    
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal" aria-label="close" v-on:click="this.submitQuotation(this.this_one_q_hash_number);">Submit Quotation to Invoice</button>
                                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <embed id="preview_invoicenPDF" class="preview_invoicenPDF" src='' width="800px" height="600px"    />
            </div>
            
        </div>
        <!----------------------------------------------------------------------->

        <!----------------------------------------------------------------------->

    </div>
            

</template>


<script>
import EditQuote from "@/components/EditQuote.vue";
import { ref } from 'vue'

import { app, db, auth } from "@/firebase.js";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { test_storage } from '../firebase';
import { onSnapshot, query, collection, collectionGroup, getDocs, where, doc, updateDoc, getDoc, orderBy, addDoc, limit } from 'firebase/firestore'
import { threadId } from "worker_threads";
import { serverTimestamp } from 'firebase/firestore'
export default{
    name: "OneQuote",
    each_quote:{
        type: Object,
        required: true,
    },
    data(){
        return{
            id: this.$route.params.id, //[change from hash to quote number]
            this_one_q_hash_number: this.$route.query.this_one_q_hash_number,
            this_one_q_pdf_link: this.$route.query.this_one_q_pdf_link,
            this_one_i_pdf_link: '',    
            one_quote_url: '',

            oneqdata: [],
            find_one_quote_info:{
                q_fullname: null,
                q_address_1: null,
                q_address_2: null,
                q_city: null,
                q_insert_date: null,
                q_post_code: null,
                quote_hashid: null,
            },
            use_this_hash: '',
            
            copy_q_b_f: '',
            copy_q_b_a1: '',
            copy_q_b_a2: '',
            copy_q_b_c: '',
            copy_q_b_pc: '',

            copy_q_s_f: '',
            copy_q_s_a1: '',
            copy_q_s_a2: '',
            copy_q_s_c: '',
            copy_q_s_pc: '',

            copy_q_ref: '',
            copy_q_number: '',

            copy_exact_product: [], //
            copy_exact_product_size: '',
            invoice_hashid: '',
            //
            copy_subtotal: '',
            copy_vat: '',
            copy_total: '',
            //[NEW FACE]
            all_previous_products: [], //
            s_cur_client: '',
            s_cur_delivery: '',
            showREFERENCE: [],
            showREFERENCE2: '',

            copy_ft_sub_total: '',
            copy_ft_vat: '',
            copy_ft_shipping: '',
            copy_ft_total: '',

            all_client: [],
            all_delivery: [],
        }
    },
    components:{
        EditQuote,
    },
    methods:{

        async loadInvoicePDF(){
            const find_invoice_pdf = firebase.firestore().collection("ALL_invoice").where("quote_hashid", "==", this.this_one_q_hash_number);
            await find_invoice_pdf.onSnapshot((snapshot) => {

            snapshot.docs.forEach(d => {

                var i = d.data();

                //console.log("=======find existed invoice pdf" + i.i_pdf_link);

                if ( typeof i.i_pdf_link !== 'undefined'){
                    this.this_one_i_pdf_link = i.i_pdf_link;
                    document.getElementById('preview_invoicenPDF').src = this.this_one_i_pdf_link;

                }
                
            })
            })
            


        },
        
        async showQuotePDF(){
            

            document.getElementById('preview_quotenPDF').src = this.this_one_q_pdf_link;
        },
        async retrieveOneQuoteInfo(){
            await firebase.firestore().collection("ALL_quote").doc(this.this_one_q_hash_number)
            .onSnapshot(doc => {
                var copycat = doc.data();
                
                this.copy_q_b_f = copycat.obj_ref.q_bill_fullname;
                this.copy_q_b_a1 = copycat.obj_ref.q_bill_address1;
                this.copy_q_b_a2 = copycat.obj_ref.q_bill_address2;
                this.copy_q_b_c = copycat.obj_ref.q_bill_city;
                this.copy_q_b_pc = copycat.obj_ref.q_bill_postcode;

                this.copy_q_s_f = copycat.obj_ref.q_ship_fillname;
                this.copy_q_s_a1 = copycat.obj_ref.q_ship_address1;
                this.copy_q_s_a2 = copycat.obj_ref.q_ship_address2;
                this.copy_q_s_c = copycat.obj_ref.q_ship_city;
                this.copy_q_s_pc = copycat.obj_ref.q_ship_postcode;
                
                
                this.copy_q_number = copycat.obj_ref.q_quote_number;
                this.copy_q_ref = copycat.obj_ref.q_ref;

                this.copy_exact_product = copycat.cp; //
                this.copy_exact_product_size = copycat.choosen_product_qty;



                

                this.showREFERENCE.push(this.copy_q_ref);
                this.showREFERENCE2 = this.copy_q_ref;
                document.getElementById('i_reference').value = this.showREFERENCE2;

                this.copy_ft_sub_total = copycat.obj_ref.tf_sub_total;
                this.copy_ft_vat = copycat.obj_ref.tf_vat;
                this.copy_ft_shipping = copycat.obj_ref.tf_shipping;
                this.copy_ft_total = copycat.obj_ref.tf_total;
                
            });
            //[DEBUG]
            //console.log("=====>     " + this.copy_q_b_f );
            await document.getElementById('quote_num').setAttribute('value', this.copy_q_ref);
            await document.getElementById('ref_num').setAttribute('value', "debug");


        }, 

        async submitQuotation(use_this_hash){

            //console.log(" " + this.copy_q_b_f + " " +  this.copy_q_b_a1 + " " + this.copy_q_s_f + " " +  this.copy_q_ref+ " " + this.copy_exact_product);


            

            

            
            let i_number = await auto_invoice_no_generator3(this.copy_q_number);   
            const myTimestamp = firebase.firestore.Timestamp.now();
            let today = myTimestamp.toDate().toLocaleDateString("en-UK");     
            let po_number = document.getElementById('po_number').value;
            //console.log("i_number      " + i_number);

            const ref = collection(db, "ALL_invoice");
            const obj_ref = {
                qi_bill_fullname: this.copy_q_b_f,
                qi_bill_address1: this.copy_q_b_a1,
                qi_bill_address2: this.copy_q_b_a2, 
                qi_bill_city: this.copy_q_b_c,
                qi_bill_postcode: this.copy_q_b_pc,

                qi_ship_fillname: this.copy_q_s_f,
                qi_ship_address1: this.copy_q_s_a1,
                qi_ship_address2: this.copy_q_s_a2, 
                qi_ship_city: this.copy_q_s_c,
                qi_ship_postcode: this.copy_q_s_pc, 
                    
                qi_invoice_number: i_number, 
                qi_quote_number: this.copy_q_number, 
                qi_uploaded_date: today,
                qi_ref: this.copy_q_ref,
                qi_po: po_number,
                qi_uploaded_date_timestamp: serverTimestamp(), //
                qi_extra_space_1: '',
                qi_extra_space_2: '',
                qi_extra_space_3: '',
                qi_extra_space_4: '',
                


                
                
            }
            const price_ref = {
                qi_subtotal: "subtotal",
                qi_vat: "vat",
                qi_shipping: "ship1",
                qi_extra_1: 0,
                qi_extra_2: 0,
                qi_extra_3: 0,
                qi_extra_4: 0,
                qi_total: "total",
            }

            const pro_ref = this.copy_exact_product;

            await addDoc(ref, {obj_ref, pro_ref, price_ref}) 
            .then(docRef => {
                const get_id = firebase.firestore().collection("ALL_invoice").doc(docRef.id);
                const string = "/ALL_invoice/" + use_this_hash + "/" + docRef.id + "/";

                this.invoice_hashid = docRef.id;
                //
    
                get_id
                    .update({
                        invoice_hashid: docRef.id,
                        quote_hashid: use_this_hash,

                    })
                    .then(() => {
                        const allInvoiceRef = firebase.firestore().collection('ALL_invoice');
                        ////console.log("set doc");

                        get_id.get().then((d) => {
                            ////console.log("updated data:", d.data());
                        });
                    });
            })
            //update to Invoice Number in Quote
            const get_id = firebase.firestore().collection("ALL_quote").doc(this.this_one_q_hash_number);
            get_id
                .update({
                    "obj_ref.q_invoice_number": i_number,
                })
                .then(() => {
                    //console.log("set doc?");

                });


            ///jspdf time!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            const string = await jspdftime();

            
            //console.log("string><" + string);

            var embed = "<embed src='" + string + "'/>"
            const a = document.getElementById('preview_invoicenPDF');
            var clone = a.cloneNode(true);
            clone.setAttribute('src', string);
            a.parentNode.replaceChild(clone, a);
            var base64 = doc.output('datauri');
            this.return_base64 = base64;
            //
            //console.log("calling  test2_storage1     " + this.invoice_hashid + " ");
            const path = "/all_invoice/" + this.invoice_hashid + "/";
            test_storage( this.invoice_hashid, path, this.return_base64);
            //console.log("calling  test2_storage2     ");

        },
        async jspdftime(i_number, today, po_number){
            const doc = new jsPDF(); 
            doc.addImage(cms_empty_invoice_no_table, "JPEG", 0, 0, 210, 297);
            doc.setFontSize(10);
            doc.text(this.copy_q_b_f, 6, 93);
            doc.text(this.copy_q_b_a1, 6, 98);
            if (this.copy_q_b_a2 == '' || this.copy_q_b_a2 == null){
                doc.text(this.copy_q_b_c, 6, 103);
                doc.text(this.copy_q_b_pc, 6, 108);
            }
            else{
                doc.text(this.copy_q_b_a2, 6, 103);
                doc.text(this.copy_q_b_c, 6, 108);
                doc.text(this.copy_q_b_pc, 6, 113);
            }

            doc.setFontSize(10);
            doc.text(this.copy_q_s_f, 72, 93);
            doc.text(this.copy_q_s_a1, 72, 98);
            if (this.copy_q_s_a2 == '' || this.copy_q_s_a2 == null){
                doc.text(this.copy_q_s_c, 72, 103);
                doc.text(this.copy_q_s_pc, 72, 108);  
            }    
            else{
                doc.text(this.copy_q_s_a2, 72, 103);
                doc.text(this.copy_q_s_c, 72, 108);
                doc.text(this.copy_q_s_pc, 72, 113); 
            }

            doc.text(i_number, 159, 94);
            doc.text(today, 159, 100);
            doc.text(this.copy_q_ref, 159, 105);
            doc.text(po_number, 159, 110);  
            let bodyData = [];
            this.copy_exact_product.forEach(element => {      
                var tmp = [element.p_fullname, element.p_code, element.p_quantity, element.p_unit, element.p_discount, element.p_sell];
                bodyData.push(tmp);
            });    
            var finalY = doc.lastAutoTable.finalY || 10
            autoTable(doc, {
                //html: '#cms-quote-table',
                theme: 'striped',
                startY: finalY + 109, 
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
                body: [this.copy_exact_product],
            })
            doc.setFontSize(12);
            doc.text('Sub-Total', 139, doc.lastAutoTable.finalY + 20, {align: 'right'})
            doc.text(this.copy_ft_sub_total, 182, doc.lastAutoTable.finalY + 20 , {align: 'right'})
            doc.text('VAT', 139, doc.lastAutoTable.finalY + 25 , {align: 'right'})
            doc.text(this,copy_ft_vat, 182, doc.lastAutoTable.finalY + 25 , {align: 'right'})
            doc.text('Shipping', 139, doc.lastAutoTable.finalY + 30 , {align: 'right'})
            doc.text(this.copy_ft_shipping, 182, doc.lastAutoTable.finalY + 30 , {align: 'right'})
            doc.text('Total', 139, doc.lastAutoTable.finalY + 35 , {align: 'right'})
            doc.text( this.copy_ft_total , 182, doc.lastAutoTable.finalY + 35 , {align: 'right'})

            doc.setFontSize(9);
            doc.text('Terms & Instructions', 6,  doc.lastAutoTable.finalY + 40).setFont(undefined, 'bold');
            doc.text('Quote only valid for 30 days', 6, doc.lastAutoTable.finalY + 44)

            var string = await doc.output('datauristring');
            return string;
        },
        generatePDFSecret(q_number, today){
            const doc = new jsPDF(); 
            doc.addImage(cms_empty_invoice_no_table, "JPEG", 0, 0, 210, 297);

            const oo_b_fullname = document.getElementById('tmp_b_fullname').innerHTML;
            const oo_b_a1 = document.getElementById('tmp_b_address1').innerHTML;
            const oo_b_a2 = document.getElementById('tmp_b_address2').innerHTML;
            const oo_b_city = document.getElementById('tmp_b_city').innerHTML;
            const oo_b_postcode = document.getElementById('tmp_b_postcode').innerHTML;
            doc.setFontSize(10);
            doc.text(oo_b_fullname, 6, 93);
            doc.text(oo_b_a1, 6, 98);
            doc.text(oo_b_a2, 6, 103);
            doc.text(oo_b_city, 6, 108);
            doc.text(oo_b_postcode, 6, 113);

            const oo_s_fullname = document.getElementById('tmp_s_fullname').innerHTML;
            const oo_s_a1 = document.getElementById('tmp_s_address1').innerHTML;
            const oo_s_a2 = document.getElementById('tmp_s_address2').innerHTML;
            const oo_s_city = document.getElementById('tmp_s_city').innerHTML;
            const oo_s_postcode = document.getElementById('tmp_s_postcode').innerHTML;
            doc.setFontSize(10);
            doc.text(oo_s_fullname, 72, 93);
            doc.text(oo_s_a1, 72, 98);
            doc.text(oo_s_a2, 72, 103);
            doc.text(oo_s_city, 72, 108);
            doc.text(oo_s_postcode, 72, 113);      
            
            doc.text(q_number, 159, 91);
            doc.text(today, 159, 97);
            doc.text(input_reference_number, 159, 103);
            doc.text(input_reference_number, 159, 119);  //try 119

            let bodyData = [];
            this.choosen_products.forEach((element, index, array) => {
                necessary_only = [
                    element.p_fullname,
                    element.p_code,
                    element.p_quantity,
                    element.p_sell,
                    "discoun999t",
                    element.p_sell,

                ]  
                bodyData.push(necessary_only);
            });
            var finalY = doc.lastAutoTable.finalY || 10
            autoTable(doc, {
                //html: '#cms-quote-table',
                theme: 'striped',
                startY: finalY + 109, 
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
            doc.setFontSize(14);
            doc.text('SUB TOTAL', 42, doc.lastAutoTable.finalY + 20)
            doc.text('100', 152, doc.lastAutoTable.finalY + 20)
            doc.text('VAT', 42, doc.lastAutoTable.finalY + 25)
            doc.text('50', 152, doc.lastAutoTable.finalY + 25)
            doc.text('SHIPPING. HANDLING', 42, doc.lastAutoTable.finalY + 30)
            doc.text('150', 152, doc.lastAutoTable.finalY + 30)

            var finalY2 = doc.lastAutoTable.finalY;
            doc.setFontSize(9);
            doc.text('Terms & Instructions', 6,  doc.lastAutoTable.finalY + 36).setFont(undefined, 'bold');
            doc.text('Quote only valid for 30 days', 6, doc.lastAutoTable.finalY + 39)


            //debug for preview
            var string = doc.output('datauristring');
            var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
            const a = document.getElementById('preview_quotationPDF');
            var clone = a.cloneNode(true);
            clone.setAttribute('src', string);
            a.parentNode.replaceChild(clone, a);
            var base64 = doc.output('datauri');
            this.return_base64 = base64;
            
        },

        async UpdateQuote(i, q_hash){
            let d1 = "i_quality"+i;
            let d2 = "i_unit"+i;
            let d3 = "i_discount"+i;

            const a = document.getElementById(d1);
            const b = document.getElementById(d2);
            const c = document.getElementById(d3);
            const cep = JSON.parse(JSON.stringify(this.copy_exact_product));
            console.log(cep);
            for (var key in cep) {
                if (cep.hasOwnProperty(key)) {

                    let d_qty = "ep_qty_"+key;
                    let d_unit = "ep_unit_"+key;
                    let d_discount = "ep_discount_"+key;
                    let cum1 = document.getElementById(d_qty).innerHTML;
                    let cum2 = document.getElementById(d_unit).innerHTML;
                    let cum3 = document.getElementById(d_discount).innerHTML;
                    //console.log(cum1 + "=====" + cum2);
                    cep[key].p_quantity = cum1;
                    cep[key].p_unit = cum2;
                    cep[key].p_discount = cum3;
                    //console.log(cp[key].p_quantity + "======" + cp[key].p_discount);

                }
            }
            //another jspdf
            const string = await jspdftime();
            var embed = "<embed src='" + string + "'/>"
            const z = document.getElementById('preview_invoicenPDF');
            var clone = z.cloneNode(true);
            clone.setAttribute('src', string);
            z.parentNode.replaceChild(clone, z);
            var base64 = doc.output('datauri');
            this.return_base64 = base64;

            const path = "/all_quote/" + this.copy_q_number + "/";
            test2_storage( this.copy_q_number, path, this.return_base64);

            /*
            await addDoc(ref, {cep})
            .then(docRef => {
                console.log("update" + docRef.id);
                const get_id = firebase.firestore().collection("ALL_quote").doc(docRef.id);
                const string = "/all_quote/" + docRef.id + "/";
                test2_storage( docRef.id, string, this.return_base64);//use this   
                var choosen_product_qty = Object.keys(this.choosen_products).length;
                cp["choosen_product_qty"] = choosen_product_qty;
                get_id
                    .update({

                        choosen_product_qty: choosen_product_qty,
                    })
                    .then(() => {
                        //console.log("set doc1");

                        get_id.get().then((d) => {
                        });
                });
                    
                

            }),
            */
            

        },

        async getAllClient(){
        var all_client_ref = await firebase.firestore().collection("all_client");
            all_client_ref.onSnapshot(snap => {
                this.all_client = [];

                snap.forEach(d => {

                    var c = d.data();
                    //console.log("client: " + c);
                    this.all_client.push(c);

                });
            });
        },

        async getAllDelivery(){
        var all_delivery_ref = await firebase.firestore().collection("all_delivery").doc(this.this_one_q_hash_number).collection("this_client_delivery");
            all_delivery_ref.onSnapshot(snap => {
                this.all_delivery = [];

                snap.forEach(d => {

                    var delivery = d.data();
                    //console.log("delivery: " + d);
                    this.all_delivery.push(delivery);

                });
            });
        },

    },
    created() {
        this.loadInvoicePDF();
        this.showQuotePDF();
        this.retrieveOneQuoteInfo();

        this.getAllClient();
        this.getAllDelivery();
        
    },
}
function add_zero(num){

    const  onez= "0";
    const twoz= "00";
    const threez = "000";
    const fourz = "0000";

    if (num > 0 && num < 10){

    let returnans = fourz + num;
    
    return returnans;
    }
    else if (num > 10 && num < 100){
    
    let returnans = threez + num;

    return returnans;
    }
    else if (num > 100 && num < 1000){

    let returnans = twoz + num;

    return returnans;
    }
    else if (num > 1000 && num < 10000){

    let returnans = onez + num;

    return returnans;
    }

}
async function auto_invoice_no_generator3(old_quote_num){
    let i_number = await old_quote_num.replace(old_quote_num.charAt(0), "I");
    return i_number;
}

async function renewjspdf(){
    const doc = new jsPDF(); 
    doc.addImage(cms_empty_invoice_no_table, "JPEG", 0, 0, 210, 297);
    doc.setFontSize(10);
    doc.text(this.copy_q_b_f, 6, 93);
    doc.text(this.copy_q_b_a1, 6, 98);
    if (this.copy_q_b_a2 == '' || this.copy_q_b_a2 == null){
        doc.text(this.copy_q_b_c, 6, 103);
        doc.text(this.copy_q_b_pc, 6, 108);
    }
    else{
        doc.text(this.copy_q_b_a2, 6, 103);
        doc.text(this.copy_q_b_c, 6, 108);
        doc.text(this.copy_q_b_pc, 6, 113);
    }

    doc.setFontSize(10);
    doc.text(this.copy_q_s_f, 72, 93);
    doc.text(this.copy_q_s_a1, 72, 98);
    if (this.copy_q_s_a2 == '' || this.copy_q_s_a2 == null){
        doc.text(this.copy_q_s_c, 72, 103);
        doc.text(this.copy_q_s_pc, 72, 108);  
    }    
    else{
        doc.text(this.copy_q_s_a2, 72, 103);
        doc.text(this.copy_q_s_c, 72, 108);
        doc.text(this.copy_q_s_pc, 72, 113); 
    }

    doc.text(i_number, 159, 94);
    doc.text(today, 159, 100);
    doc.text(this.copy_q_ref, 159, 105);
    doc.text(po_number, 159, 110);  
    let bodyData = [];
    this.copy_exact_product.forEach(element => {      
        var tmp = [element.p_fullname, element.p_code, element.p_quantity, element.p_unit, element.p_discount, element.p_sell];

        bodyData.push(tmp);
    });    
    var finalY = doc.lastAutoTable.finalY || 10
    autoTable(doc, {
        //html: '#cms-quote-table',
        theme: 'striped',
        startY: finalY + 109, 
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
        body: [this.copy_exact_product],
    })
    doc.setFontSize(12);
    doc.text('Sub-Total', 139, doc.lastAutoTable.finalY + 20, {align: 'right'})
    doc.text(this.copy_ft_sub_total, 182, doc.lastAutoTable.finalY + 20 , {align: 'right'})
    doc.text('VAT', 139, doc.lastAutoTable.finalY + 25 , {align: 'right'})
    doc.text(this,copy_ft_vat, 182, doc.lastAutoTable.finalY + 25 , {align: 'right'})
    doc.text('Shipping', 139, doc.lastAutoTable.finalY + 30 , {align: 'right'})
    doc.text(this.copy_ft_shipping, 182, doc.lastAutoTable.finalY + 30 , {align: 'right'})
    doc.text('Total', 139, doc.lastAutoTable.finalY + 35 , {align: 'right'})
    doc.text( this.copy_ft_total , 182, doc.lastAutoTable.finalY + 35 , {align: 'right'})

    doc.setFontSize(9);
    doc.text('Terms & Instructions', 6,  doc.lastAutoTable.finalY + 40).setFont(undefined, 'bold');
    doc.text('Quote only valid for 30 days', 6, doc.lastAutoTable.finalY + 44)

    var string = doc.output('datauristring');
}
</script>

<style>
.check_invoice{
    border: 1px dashed black;
}
</style>