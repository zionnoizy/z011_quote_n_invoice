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
                    <div class="modal fade" id="edit_quotation" tabindex="-1" aria-labelledby="" aria-hidden="true">
                        <div class="modal-dialog modal-xl">

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
                                                    <option >{{ showAllClient }}</option>
                                                </select>
                                            </div>    
                                            <div class="flex-grow-0 mx-2 px-3">
                                                <label>2.SHIP TO (DELIVERY)</label>
                                                <select class="form-select" aria-label="Default select example"  >
                                                    <option >{{ showAllDelivery }}</option>
                                                </select>

                                            </div>  
                                        </div>   
                                        <div class="mx-auto" style="display: flex;;">
                                            <label>Quote No. </label>
                                            <p> {{ copy_q_number }} </p>
                                        </div>    
                                    </div>    
                                    

                                    <div class="" v-for="pp, i in copy_exact_product">
                                            <div>
                                                <strong>{{ pp.p_fullname }}</strong>
                                            </div>
                                            <div>
                                                <strong>{{ pp.p_code }}</strong>
                                            </div>
                                            <div>
                                                <label>Qty</label>
                                                <input ref="i_quality" id="i_quality" placeholder="Qty">
                                            </div>
                                            <div>
                                                <label>Discount</label>
                                                <input ref="i_discount" id="i_discount" placeholder="Discount">
                                            </div>
                                    </div>
                                </div>
                                    <div class="modal-footer" style="background-color: #1267aa;">
                                        <button type="button" data-bs-dismiss="modal" aria-label="close" class="btn btn-success" @click="ClickEditQuote($event)">SAVE</button>
                                    </div>
                            </div>




                        </div>
                    </div>
                </div>
                <!--2-->
                <div>
                    <button class="border btn btn-secondary" type="button"
                        data-bs-toggle="modal" data-bs-target="#add_po_number">
                        Create New Invoice From This Quotation w/ PO
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
                <embed id="preview_invoicenPDF" width="800px" height="600px"   src='' />
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
import { test2_storage } from '../firebase';
import { onSnapshot, query, collection, collectionGroup, getDocs, where, doc, updateDoc, getDoc, orderBy, addDoc, limit } from 'firebase/firestore'
import { threadId } from "worker_threads";
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

            copy_exact_product: {}, //
            invoice_hashid: '',
            //[NEW FACE]
            all_previous_products: [], //
            showAllClient: [],
            showAllDelivery: [],
        }
    },
    components:{
        EditQuote,
    },
    methods:{
        
        async showQuotePDF(){
            await console.log(this.this_one_q_pdf_link);

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
                
                this.copy_q_ref = copycat.obj_ref.q_ref;
                this.copy_q_number = copycat.obj_ref.q_quote_number;

                this.copy_exact_product = copycat.tmp_ff;
                

                console.log("[debug3] " + this.copy_q_b_f);

                this.showAllClient.push(this.copy_q_b_f);
                this.showAllDelivery.push(this.copy_q_s_f);


                
            });
            //[DEBUG]
            console.log("=====>     " + this.copy_q_b_f );
            await document.getElementById('quote_num').setAttribute('value', this.copy_q_ref);
            await document.getElementById('ref_num').setAttribute('value', "debug");


        }, 

        async submitQuotation(use_this_hash){

            console.log(" " + this.copy_q_b_f + " " +  this.copy_q_b_a1 + " " + this.copy_q_s_f + " " +  this.copy_q_ref+ " " + this.copy_exact_product);


            let po_number = document.getElementById('po_number').value;

            

            const myTimestamp = firebase.firestore.Timestamp.now();
            let today = myTimestamp.toDate().toLocaleDateString("en-UK");    
            let i_number = await auto_invoice_no_generator3(this.copy_q_number);    

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
                qi_uploaded_date: today,
                qi_po: po_number,
                
                qi_ref: "qi_ref",

                
                
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
                        //console.log("set doc");

                        get_id.get().then((d) => {
                            //console.log("updated data:", d.data());
                        });
                    });
            })
            ///jspdf time!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
            let necessary_only = [];
            console.log("a-a-a-a-a-a-a" + this.copy_exact_product);
            for (const [index, [key, value]] of Object.entries(Object.entries(this.copy_exact_product))) {
            console.log(`${index}: ${key} = ${value}`);
                const s1 = `${index}`+"_fullname";
                const s2 = `${index}`+"_code";
                const s3 = `${index}`+"_quantity";
                const s4 = "";
                const s5 = "";
                const s6 = `${index}`+"_sell";
                if ( key.indexOf(s1) > -1 ) {
                    necessary_only[`${index}`] = `${value}`;
                } 
            }
            /*
            for (var [index, key] in this.copy_exact_product) {
                console.log("lopp # " + index + key);

                const s1 = "_fullname";
                const s2 = "_code";
                const s3 = "_quantity";
                const s4 = "";
                const s5 = "";
                const s6 = "_sell";
                
                if ( key.indexOf(s1) > -1 ) {
                    necessary_only[index] = this.copy_exact_product[key];
                } 
                else if ( key.indexOf(s2) > -1 ){
                    necessary_only[index] = this.copy_exact_product[key];
                }
                else if ( key.indexOf(s3) > -1 ){
                    necessary_only[index] = this.copy_exact_product[key];
                }
                else if ( key.indexOf(s4) > -1 ){
                    necessary_only[index] = this.copy_exact_product[key];
                }
                else if ( key.indexOf(s5) > -1 ){
                    necessary_only[index] = this.copy_exact_product[key];
                }
                else if ( key.indexOf(s6) > -1 ){
                    necessary_only[index] = this.copy_exact_product[key];
                }
                console.log("necessary_only[i]     " + necessary_only[index]);
                bodyData.push(necessary_only);
                console.log("necessary_only[i]     " + bodyData);
            }
            */
            
            
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
                body: [this.copy_exact_product]
            })
            doc.setFontSize(12);
            doc.text('SUB TOTAL', 42, doc.lastAutoTable.finalY + 20)
            doc.text('100', 152, doc.lastAutoTable.finalY + 20)
            doc.text('VAT', 42, doc.lastAutoTable.finalY + 25)
            doc.text('50', 152, doc.lastAutoTable.finalY + 25)
            doc.text('SHIPPING. HANDLING', 42, doc.lastAutoTable.finalY + 30)
            doc.text('150', 152, doc.lastAutoTable.finalY + 30)

            doc.setFontSize(9);
            doc.text('Terms & Instructions', 6,  doc.lastAutoTable.finalY + 40).setFont(undefined, 'bold');
            doc.text('Quote only valid for 30 days', 6, doc.lastAutoTable.finalY + 44)

            var string = doc.output('datauristring');
            console.log("string><" + string);

            var embed = "<embed src='" + string + "'/>"
            const a = document.getElementById('preview_invoicenPDF');
            var clone = a.cloneNode(true);
            clone.setAttribute('src', string);
            a.parentNode.replaceChild(clone, a);
            var base64 = doc.output('datauri');
            this.return_base64 = base64;
            //
            console.log("calling  test2_storage1     " + this.invoice_hashid + " ");
            test2_storage( this.invoice_hashid, string, this.return_base64);
            console.log("calling  test2_storage2     ");

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
            
        }

    },
    created() {

        this.retrieveOneQuoteInfo();
        this.showQuotePDF();
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

</script>

<style>
.check_invoice{
    border: 1px dashed black;
}
</style>