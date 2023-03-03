<template>
    <div class="OneQuote">

        <p> debug here only - view specific quote.</p>
        <p> The quote id is= {{ $route.params.id }}</p>
        <p> One Q Hash is= {{ $route.query.this_one_q_hash_number }} <!--cannot pass each quote to here--> </p>

        <div class="grid grid-cols-3">

            <div>
                <iframe src="https://firebasestorage.googleapis.com/v0/b/quote-n-invoice.appspot.com/o/all_quote%2Fco8jIw0vF8xiPspa8CWf%2Ftext4.pdf?alt=media&token=df3af25f-3c10-4877-84ba-65c355d2c76c" download="toquotationnumber.pdf" width="400px" height="300px"  ></iframe>
            </div>

            <div class="grid grid-cols-1 gap-1">
                <div>

                <button class="choose_address_btn border btn btn-secondary" type="button"
                    data-bs-toggle="modal" data-bs-target="#edit_quotation">
                    Edit Quotation
                </button>


                <!--NEW-----EDIT QUOTATION MODAL---------------------------------------------------------------------->
                <div class="modal fade" id="edit_quotation" tabindex="-1" aria-labelledby="" aria-hidden="true">
                        <div class="modal-dialog modal-xl">

                            <div class="modal-content text-black">

                                <div class="modal-header">
                                    <h4 class="modal-title"> Edit Your Quotation Below.</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="close">X</button>
                                </div>
                                <!---->
                                <div class="modal-body">
                                    <edit-quote></edit-quote>

   
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal" aria-label="close">Add Product To Quote</button>
                                </div>
                            </div>
                        </div>
                </div>

                </div>
                <div>

                    
                <button class="border btn btn-secondary" type="button"
                    data-bs-toggle="modal" data-bs-target="#add_po_number">
                    Create New Invoice From This Quotation
                </button>
                <!--modal for PO-->
                <div class="modal fade" id="add_po_number" tabindex="-1" aria-labelledby="" aria-hidden="true">
                        <div class="modal-dialog modal-xl">

                            <div class="modal-content text-black">

                                <div class="modal-header">
                                    <h4 class="modal-title"> After you've checked you quotation has no problem, please type you PO number, PO number is mandetory for an invoice.</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="close">X</button>
                                </div>
                                <!---->
                                <div class="modal-body">
                                    <input ref="po_number" id="po_number" placeholder="PO Number" />
                                    
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal" aria-label="close" v-on:click="this.submitQuotation(this.this_one_q_hash_number);">Submit Quotation to Invoice</button>
                                </div>
                            </div>
                        </div>
                </div>
                <!--End modal for PO-->
                </div>

            </div> <!--end grid-1-->

            <div>
                <iframe class=" check_invoice"></iframe>
            </div>


            <div>

            </div>

        </div>
        
        
        
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
            copy_q_invoice: '',

            copy_tmp_ff: {
                q_fullname: null,
                q_address_1: null,
                q_address_2: null,
                q_city: null,
                q_insert_date: null,
                q_post_code: null,
                quote_hashid: null,
            },

        }
    },
    components:{
        EditQuote,
    },
    methods:{

        retrieveOneQuoteInfo(){
            console.log("find quotation pdf url + retrieve all quotation inforamtion in here." + this.this_one_q_hash_number)
            // https://www.youtube.com/watch?v=CGrNNGrKCJU&ab_channel=AdnanAfzal    [(9:55)]
            const findQuoteInfo = firebase.firestore().collection('ALL_quote').where("quote_hashid", "==", this.this_one_q_hash_number); 
            findQuoteInfo.onSnapshot(snap => {
                this.oneqdata = [];
                
                snap.forEach(d => {
                    console.log("print111");
                    this.oneqdata.push(d.data());
                    var find_one_quote_info = d.data(); //undefined?
                    /*
                    console.log("->" + oneqdata.obj_ref.q_bill_fullname);
                    console.log("->" + oneqdata.obj_ref.q_bill_address1);
                    console.log("->" + oneqdata.obj_ref.q_bill_address2);
                    console.log("->" + oneqdata.obj_ref.q_bill_city);
                    console.log("->" + oneqdata.obj_ref.q_bill_postcode);
                    
                    console.log("->" + oneqdata.obj_ref.q_bill_fullname);
                    
                    */
                });
                });  
                const obj_ref ={
                    i_quotation_no:this.$refs.address_1.value,
                }
        }, 

        async submitQuotation(use_this_hash){
            let po_number = document.getElementById('po_number').value;

            await firebase.firestore().collection("ALL_quote").doc(use_this_hash)
            .onSnapshot(doc => {
                var copycat = doc.data();
                this.copy_q_b_f = copycat.obj_ref.q_bill_fullname;
                this.copy_q_b_a1 = copycat.obj_ref.q_bill_address1;
                this.copy_q_b_a2 = copycat.obj_ref.q_bill_address2;
                this.copy_q_b_c = copycat.obj_ref.q_bill_city;
                this.copy_q_b_pc = copycat.obj_ref.q_bill_postcode;

                this.copy_q_b_f = copycat.obj_ref.q_ship_fullname;
                this.copy_q_b_a1 = copycat.obj_ref.q_ship_address1;
                this.copy_q_b_a2 = copycat.obj_ref.q_ship_address2;
                this.copy_q_b_c = copycat.obj_ref.q_ship_city;
                this.copy_q_b_pc = copycat.obj_ref.q_ship_postcode;
                
                this.copy_q_ref = copycat.obj_ref.q_ref;
                this.copy_q_invoice = copycat.obj_ref.q_quote_number;


                //this.copy_tmp_ff.add({ tmp_ff: doc.data().tmp_ff }); //is not defined?
            });
            
           
            const myTimestamp = firebase.firestore.Timestamp.now();
            let today = myTimestamp.toDate().toLocaleDateString("en-UK");    
            let i_number = await auto_invoice_no_generator3(this.copy_q_invoice);    

            const ref = collection(db, "ALL_invoice");
            const obj_ref = {
                qi_bill_fullname: "qi_bill_fullname",
                qi_bill_address1: "qi_bill_address1",
                qi_bill_address2: "qi_bill_address2", 
                qi_bill_city: "qi_bill_city",
                qi_bill_postcode: "qi_bill_postcode",
                qi_ship_fillname: "qi_ship_fillname",
                qi_ship_address1: "qi_ship_address1",
                qi_ship_address2: "qi_ship_address2", 
                qi_ship_city: "qi_ship_city",
                qi_ship_postcode: "qi_ship_postcode", 
                
                qi_invoice_number: i_number, 
                qi_uploaded_date: today,
                qi_po: po_number,
                
                qi_ref: "qi_ref",

                
                
            }
            /*
            const tmp_ff = Object.fromEntries(
                this.choosen_products.flatMap((element, index) => [
                    [`qi_p${index + 1}_fullname`, element.p_fullname],
                    [`qi_p${index + 1}_code`, element.p_code],
                    [`qi_p${index + 1}_category`, element.p_category],
                    [`qi_p${index + 1}_cost`, element.p_cost],
                    [`qi_p${index + 1}_margin`, element.p_margin],
                    [`qi_p${index + 1}_sell`, element.p_sell],
                ])
            );
            */
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

            addDoc(ref, {obj_ref, price_ref, copy_tmp_ff}) //copy_tmp_ff
            .then(docRef => {
            const get_id = firebase.firestore().collection("ALL_invoice").doc(docRef.id);
            const string = "/all_invoice/" + use_this_hash + "/" + docRef.id + "/";
            test2_storage( docRef.id, string, this.return_base64);
            get_id
                .update({
                    invoice_hashid: docRef.id,
                    qi_q_hashid: use_this_hash,
                    tmp_ff: copy_tmp_ff,
                })
                .then(() => {
                    const allInvoiceRef = firebase.firestore().collection('ALL_invoice');
                    console.log("set doc");

                    get_id.get().then((d) => {
                        console.log("updated data:", d.data());
                    });
                });
            })
            ///jspdf time!
            const doc = new jsPDF(); 
            doc.addImage(cms_empty_invoice_no_table, "JPEG", 0, 0, 210, 297);

            
            doc.setFontSize(10);
            doc.text(this.copy_q_b_f, 6, 93);
            doc.text(this.copy_q_b_a1, 6, 98);
            doc.text(this.copy_q_b_a2, 6, 103);
            doc.text(this.copy_q_b_c, 6, 108);
            doc.text(this.copy_q_b_pc, 6, 113);

            doc.setFontSize(10);
            doc.text(this.copy_q_b_f, 72, 93);
            doc.text(this.copy_q_b_a1, 72, 98);
            doc.text(this.copy_q_b_a2, 72, 103);
            doc.text(this.copy_q_b_c, 72, 108);
            doc.text(this.copy_q_b_pc, 72, 113);      

            doc.text(i_number, 159, 91);
            doc.text(today, 159, 97);
            doc.text(copy_q_ref, 159, 103);
            doc.text(po_number, 159, 109);  

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
                body: [bodyData]
            })
            doc.setFontSize(14);
            doc.text('SUB TOTAL', 42, doc.lastAutoTable.finalY + 20)
            doc.text('100', 152, doc.lastAutoTable.finalY + 20)
            doc.text('VAT', 42, doc.lastAutoTable.finalY + 25)
            doc.text('50', 152, doc.lastAutoTable.finalY + 25)
            doc.text('SHIPPING. HANDLING', 42, doc.lastAutoTable.finalY + 30)
            doc.text('150', 152, doc.lastAutoTable.finalY + 30)

            var finalY2 = doc.lastAutoTable.finalY;
            doc.text('Quote only valid for 30 days', 6, finalY2 + 15)


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
                body: [bodyData]
            })
            doc.setFontSize(14);
            doc.text('SUB TOTAL', 42, doc.lastAutoTable.finalY + 20)
            doc.text('100', 152, doc.lastAutoTable.finalY + 20)
            doc.text('VAT', 42, doc.lastAutoTable.finalY + 25)
            doc.text('50', 152, doc.lastAutoTable.finalY + 25)
            doc.text('SHIPPING. HANDLING', 42, doc.lastAutoTable.finalY + 30)
            doc.text('150', 152, doc.lastAutoTable.finalY + 30)

            var finalY2 = doc.lastAutoTable.finalY;
            doc.text('Quote only valid for 30 days', 6, finalY2 + 15)


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