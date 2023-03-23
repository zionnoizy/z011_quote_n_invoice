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

            <p>Subtotal? {{copy_ft_sub_total}}</p>
            <p>$ {{ copy_ft  }}</p>
        </div>

        <div class="grid grid-cols-3">

            <div>

                <embed id="pdf_quote"  class="pdf_quote" width="800px" height="600px"   src='' />
                
                
            </div>

            <div class="grid grid-cols-1 gap-1">

                <!--1-->
                <div>
                    <button class="choose_address_btn border btn btn-secondary" type="button"
                        id="m_edit_quotation" data-bs-toggle="modal" data-bs-target="#edit_quotation">
                        Edit Quotation
                    </button>
                    <div class="modal fade" id="edit_quotation" tabindex="-1" aria-labelledby="" aria-hidden="true" >
                        <div class="modal-dialog modal-xl" style="width:150%">

                            <div class="modal-content text-black" style="width:1338px;">

                                <div class="modal-header">
                                    <h4 class="modal-title"> Edit Your Quotation Below. </h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="close">X</button>
                                </div>

                                <div class="modal-body">
                                    <!--------------------------EDIT QUOTATION START----------------------->
                                    
                                    <div class="grid grid-cols-2 gap-1 ">
                                        <div class="mx-auto" style="display: flex;;">
                                            <div class="flex-grow-0 mx-2 px-3">
                                                <label>1.BILL TO (CLIENT)</label>
                                                <select id="select_bill_to" class="form-select" aria-label="Default select example" 
                                                @change="doSort3();" >
                                                    <option selected> {{copy_q_b_f}} </option>
                                                    <option v-for="c in all_clients" :value="`${c.c_fullname}`">{{c.c_fullname}}</option>
                                                </select>
                                            </div> 
                                            <p class="hidden" id="select_a1"></p>   
                                            <p class="hidden" id="select_a2"></p>   
                                            <p class="hidden" id="select_city"></p>   
                                            <p class="hidden" id="select_postcode"></p>   

                                            <div class="flex-grow-0 mx-2 px-3">
                                                <label>2.SHIP TO (DELIVERY)</label>
                                                <select id="select_ship_to" class="form-select" aria-label="Default select example"  >
                                                    <option selected> {{ copy_q_s_f }} </option>
                                                    <!--:value="`${d.d_fullname}`"-->
                                                    <option v-for="d in all_deliverys" >{{d.d_fullname}}</option>
                                                </select>
                                                <p class="hidden" id="select_b_a1"></p>   
                                                <p class="hidden" id="select_b_a2"></p>   
                                                <p class="hidden" id="select_b_city"></p>   
                                                <p class="hidden" id="select_b_postcode"></p>   
                                            </div>  

                                        </div>

                                        <div class="mx-auto" style="display: flex;">    
                                            <div class=" mx-2 px-3">
                                                <label>3.Referecne Number</label>
                                                <p><strong> {{ showREFERENCE2 }} </strong></p>
                                                
                                            </div>   
                                            <div class=" mx-2 px-3 " style="display: flex;;">
                                            <label>4. Quote No. </label>
                                            <p><strong> {{ copy_q_number }} </strong></p>
                                            </div> 
                                        </div>    
                                    </div>    
                                    

                                    <div class="" >
                                        <label>5. Products Edit </label>
                                        <div class="grid grid-cols-8 gap-1">
                      
                                            <div>ProductName</div>
                                            <div>ProductCode</div>
                                            <div>ProductSell</div>
                                            <div>Qty</div> 
                                            <div>Unit</div>
                                            <div>Discount%</div>
                                            <div>Discount£</div>
                                            <div>FInal Total</div>
                                        </div>
                                        <div class="grid grid-cols-8 gap-1" v-for="(k, i) in copy_exact_product" @focusout="handleFocusout($event,  i  )" >
                                            <div>
                                                <select id="so_product" class="form-select" aria-label="select client from quote list below, and it will do sorting." 
                                                    @change="clearRest(i);" onfocus="this.selectedIndex = 0;">
                                                    <option selected>{{ k.p_fullname }}</option>
                                                    <option v-for="ep in e_all_product_list" :value="`${ep.p_fullname}`" > {{ ep.p_fullname }} </option>
                                                </select>
                                            </div>


                                            <div>
                                                <p :id="'i_code'+i" style="color:grey;">  {{ k.p_code }} </p>
                                            </div>
                                            <div>
                                                <p :id="'i_sell'+i" :ref="'i_sell'+i"  style="color:grey;"> {{ k.p_sell }} </p>
                                            </div>
                                            
                                            <div>
                                                <input class="form-control" :ref="'i_quantity'+i" :id="'i_quantity'+i"  placeholder="Enter #Quantity" v-model="k.p_quantity" 
                                                 data-field="i_quantity">
                                            </div>
                                            
                                            <div>
                                                <input class="form-control" :ref="'i_unit'+i" :id="'i_unit'+i"  placeholder="Enter Unit (box,mm)" v-model="k.p_unit"
                                                 data-field="i_input"> 
                                            </div>
                                            
                                            <div>
                                                <input class="form-control" :ref="'i_discount'+i" :id="'i_discount'+i" placeholder="Enter %Discount" v-model="k.p_discount" /> 
                                            </div>

                                            <div>
                                                <p  :ref="'i_discount_m'+i" :id="'i_discount_m'+i" style="color:grey;">{{ k.p_discount }} </p> 
                                            </div>

                                            <div>
                                                <p :id="'i_final_total'+i" :ref="'i_final_total'+i"  style="color:grey;"> {{ k.p_final_total }} </p>
                                            </div>

                                        </div>

                                    </div>
                                    <div class="">
                                        <label>6. Edited Final Total </label>
                                        <div class="grid grid-cols-4 gap1" >
                                            <div><label>Subtotal</label></div>
                                            <div><label>VAT</label></div>
                                            <div><label>Shipping</label></div>
                                            <div><label>Total</label></div>
                                        </div>

                                        <div class="grid grid-cols-4 gap1" v-for="ft in copy_ft"  >

                                            <div>    
                                                <p  id="e_q_subtotal" style="color:grey;"> {{ ft.tf_sub_total }} </p> 
                                            </div>

                                            <div> 
                                                <p  id="e_q_vat" style="color:grey;"> {{ ft.tf_vat }} </p> 
                                            </div>
                                            <div> 
                                                <p  id="e_q_shipping" style="color:grey;"> {{ ft.tf_shipping }} </p> 
                                            </div>
                                            <div> 
                                                <p  id="e_q_final" style="color:grey;"> {{ ft.tf_total }} </p> 

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
                        id="m_new_invoice" data-bs-toggle="modal" data-bs-target="#add_po_number" >
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

            <div class="show-invoice-area">
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
    setup(){
        const handleFocusout = (e, i, df) => {
            console.log("HF-0 ");
          var updated_field = document.getElementById(e.target.id);

          let dynamic_sell_id = "i_sell"+i;
          let dynamic_quality_id = "i_quantity"+i;
          let dynamic_discount_id = "i_discount"+i;
          let dynamic_each_p_total_id = "i_final_total"+i;

          let cum0 = document.getElementById(dynamic_sell_id).innerText;
          let cum1 = document.getElementById(dynamic_quality_id).value;
          let cum3 = document.getElementById(dynamic_discount_id).value;
          console.log("HF1 ");
          console.log("HF2 "+ cum0 + "     " + cum1 + "      " + cum3);  

          let s_times_q = cum0 * cum1;

          console.log("what is discount     " + s_times_q);
          if(cum3 != 0){
            let s_minus_d = s_times_q - (+(s_times_q / 100) * +cum3);;
            let get_discount_m = +(s_times_q / 100) * +cum3;
            let dynamic_m_discount_id = "i_discount_m"+i;
            let cum4 = document.getElementById(dynamic_m_discount_id).innerHTML;
            cum4 = get_discount_m;
            console.log("HF3 " + get_discount_m) ;  
            let double_underline = +s_times_q - +cum4  ;
            document.getElementById(dynamic_each_p_total_id).innerHTML = double_underline;
          }
          else{
            console.log("HF4 " + s_times_q);  
            let double_underline = +s_times_q;
            document.getElementById(dynamic_each_p_total_id).innerHTML = double_underline;
          }

            let cimulat_du = 0;

            var x = this.copy_exact_product.length;
            for (let rs=0; rs < x; ++rs){
                
                let dynamic_ = "i_final_total";

                var one_du = document.getElementById(dynamic_).innerHTML;
                cimulat_du = +cimulat_du + +one_du;

            }
            console.log("e_q_subtotal" + cimulat_du);  
            console.log("HF5 " + s_times_q);  
            document.getElementById('e_q_subtotal').value = cimulat_du;

            console.log("ipad check first if cimulate ecist?  " + cimulat_du);
            addVatSHip(cimulat_du);
          
        }

        return {  handleFocusout };

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

            all_clients: [],
            all_deliverys: [],

            copy_q_pdf_link: '',
            e_all_product_list: [],
            copy_ft: [],
        }
    },
    components:{
        EditQuote,
    },
    methods:{

        async loadInvoicePDF(){
            console.log(this.this_one_q_hash_number);
            const find_invoice_pdf = firebase.firestore().collection("ALL_invoice").where("quote_hashid", "==", this.this_one_q_hash_number);
            await find_invoice_pdf.onSnapshot((ss) => {
                ss.docs.forEach(d => {

                    
                    var invoice_pdf = d.data().i_pdf_link;  //p_final_total

                    console.log("d.data().i_pdf_link" +d.data().i_pdf_link);

                    if (invoice_pdf){ //i.i_pdf_link !== 'undefined'
                        document.getElementById('preview_invoicenPDF').src = invoice_pdf;
                    }

                    if (invoice_pdf == undefined){ 
                        var div = document.getElementById('show-invoice-area');
                        div.innerHTML += 'Added Your Invoice in middle button';

                    }
                
                })

            })
        },
        
        async showQuotePDF(){
            console.log("??!" + this.copy_q_pdf_link);
            document.getElementById('pdf_quote').src = this.copy_q_pdf_link; 
        },
        async retrieveOneQuoteInfo(){

            console.log(this.this_one_q_hash_number);

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
                
                this.copy_ft = copycat.final_tt;
                this.copy_ft_sub_total = copycat.final_tt.tf_sub_total;
                this.copy_ft_vat = copycat.final_tt.tf_vat;
                this.copy_ft_shipping = copycat.final_tt.tf_shipping;
                this.copy_ft_total = copycat.final_tt.tf_total;
                //document.getElementById('e_q_subtotal').value = this.copy_ft_sub_total;
                //document.getElementById('e_q_vat').value = this.copy_ft_vat;
                //document.getElementById('e_q_shipping').value = this.copy_ft_shipping;
                //document.getElementById("e_q_final").value = this.copy_ft_total;


                this.copy_q_pdf_link = copycat.q_pdf_link;
                document.getElementById('pdf_quote').src = this.copy_q_pdf_link; 

                

            });
            //[DEBUG]
            
            await document.getElementById('quote_num').setAttribute('value', this.copy_q_ref);
             
            console.log("??!!!" + this.copy_ft );

        }, 

        async submitQuotation(use_this_hash){
            let i_number = await auto_invoice_no_generator3(this.copy_q_number);   
            const myTimestamp = firebase.firestore.Timestamp.now();
            let today = myTimestamp.toDate().toLocaleDateString("en-UK");     
            let po_number = document.getElementById('po_number').value;

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
                qi_subtotal: this.copy_ft_sub_total,
                qi_vat: this.copy_ft_vat,
                qi_shipping: this.copy_ft_shipping,
                qi_extra_1: 0,
                qi_extra_2: 0,
                qi_extra_3: 0,
                qi_extra_4: 0,
                qi_total: this.copy_ft_total,
            }

            const pro_ref = this.copy_exact_product;

            await addDoc(ref, {obj_ref, pro_ref, price_ref}) 
            .then(docRef => {
                const get_id = firebase.firestore().collection("ALL_invoice").doc(docRef.id);
                const string = "/ALL_invoice/" + use_this_hash + "/" + docRef.id + "/";
                this.invoice_hashid = docRef.id;
                console.log(docRef.id + "     " + use_this_hash);

                get_id
                .update({
                    invoice_hashid: docRef.id,
                    quote_hashid: use_this_hash,
                })
                .then(() => {
                    const allInvoiceRef = firebase.firestore().collection('ALL_invoice');
                    console.log("set doc");
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
            const string = await this.jspdftime(i_number, today, po_number);

            

            
            document.getElementById("m_edit_quotation").disabled = true;
            document.getElementById("m_new_invoice").disabled = true;
        },




        async jspdftime(i_number, today, po_number){

            console.log("what " + " what" );
            console.log(this.copy_ft_sub_total + "--" + this.copy_ft_vat + "--" + this.copy_ft_shipping + "--" + this.copy_ft_total);
            
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

            console.log(i_number + "what" + today + "what" + po_number);
            doc.text(i_number, 159, 94);
            doc.text(today, 159, 100);
            doc.text(this.copy_q_ref, 159, 105);
            doc.text(po_number, 159, 110);  
            let bodyData = [];

            console.log("what is this? " + this.copy_exact_product);

            const cp = JSON.parse(JSON.stringify(this.copy_exact_product));

            console.log("what is this now? " + cp);    

            cp.forEach(element => {   
 
                var tmp = [element.p_fullname, element.p_code, element.p_quantity, element.p_unit, element.p_discount, "£"+element.p_sell];

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
                margin: { top: 0, right: 3, bottom: 0, left: 5 }, //important2
                head: [['DESCRIPTION', 'CODE', 'QTY', 'UNIT', 'DISCOUNT', 'TOTAL']],
                body: bodyData,
            })
            
            doc.setFontSize(12);
            doc.text('Sub-Total', 139, doc.lastAutoTable.finalY + 20, {align: 'right'})
            doc.text("£"+this.copy_ft_sub_total, 182, doc.lastAutoTable.finalY + 20 , {align: 'right'})

            doc.text('VAT', 139, doc.lastAutoTable.finalY + 25 , {align: 'right'})
            doc.text("£"+this.copy_ft_vat, 182, doc.lastAutoTable.finalY + 25 , {align: 'right'})

            doc.text('Shipping', 139, doc.lastAutoTable.finalY + 30 , {align: 'right'})
            doc.text("£"+this.copy_ft_shipping, 182, doc.lastAutoTable.finalY + 30 , {align: 'right'})

            doc.text('Total', 139, doc.lastAutoTable.finalY + 35 , {align: 'right'})
            doc.text("£"+this.copy_ft_total , 182, doc.lastAutoTable.finalY + 35 , {align: 'right'})

            doc.setFontSize(9);
            doc.text('Terms & Instructions', 6,  doc.lastAutoTable.finalY + 40).setFont(undefined, 'bold');
            doc.text('Quote only valid for 30 days', 6, doc.lastAutoTable.finalY + 44)
            
            var string = await doc.output('datauristring');
            var embed = "<embed src='" + string + "'/>"
            const a = document.getElementById('preview_invoicenPDF');
            var clone = a.cloneNode(true);
            clone.setAttribute('src', string);
            a.parentNode.replaceChild(clone, a);
            
            var base64 = doc.output('datauri');
            this.return_base64 = base64;
            
            //
            console.log("calling  test2_storage1     " + this.invoice_hashid + "      " + this.return_base64);
            const path = "/all_invoice/" + this.invoice_hashid + "/";
            test_storage( this.invoice_hashid, path, this.return_base64);


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
            var select_product = document.getElementById("so_product").value;
            let d0 = "i_code"+i;
            let d1 = "i_quality"+i;
            let d2 = "i_unit"+i;
            let d3 = "i_discount_m"+i;
            let d4 = "i_sell"+i;

            const a = document.getElementById(d1);
            const b = document.getElementById(d2);
            const c = document.getElementById(d3);

            console.log("=====edit and upoad another quote:0 ");
            const cp = JSON.parse(JSON.stringify(this.copy_exact_product));
            console.log(cp);
            for (var key in cp) {
                if (cp.hasOwnProperty(key)) {

                    let d_qty = "i_quality"+key;
                    let d_unit = "i_unit"+key;
                    let d_discount_m = "i_discount_m"+key;
                    let d_sell = "i_sell"+key;
                    let d_final_total = "i_final_total"+key;

                    let cum1 = document.getElementById(d_qty).value; //
                    let cum2 = document.getElementById(d_unit).value;
                    let cum3 = document.getElementById(d_discount_m).value;
                    let cum4 = document.getElementById(d_sell).value;
                    let cum5 = document.getElementById(d_final_total).value;
                    //console.log(cum1 + "=====" + cum2);
                    cp[key].p_fullname = select_product;
                    cp[key].p_quantity = cum1;
                    cp[key].p_unit = cum2;
                    cp[key].p_discount = cum3;
                    cp[key].p_sell = cum4;
                    cp[key].p_final_total = cum5;
                    //console.log(cp[key].p_quantity + "======" + cp[key].p_discount);

                }
            }

            final_tt= {
                tf_subtotal: document.getElementById('e_q_subtotal').value,
                tf_vat: document.getElementById('e_q_vat').value;,
                tf_shipping: document.getElementById('e_q_shipping').value,
                tf_total: document.getElementById("e_q_final").value,
            }

            //updated
            console.log("this.this_one_q_hash_number" + this.this_one_q_hash_number);
            const find_invoice_pdf = firebase.firestore().collection("ALL_quote").doc(this.this_one_q_hash_number);
            await find_invoice_pdf.onSnapshot((ss) => {
                ss.docs.forEach(d => {
                    var update_quote = d.data();
                    update_quote.final_tt.tf_sub_total = i_subtotal;
                    update_quote.final_tt.tf_vat = i_vat;
                    update_quote.final_tt.tf_shipping = i_shipping;
                    update_quote.final_tt.tf_total = i_final_total;
                })
            })
            await setDoc(ref, {cp}, { merge:true })
            .then(docRef => { 
                var choosen_product_qty = Object.keys(this.cp).length;
                cp["choosen_product_qty"] = choosen_product_qty;
            })
            
            
            
            //another jspdf
            const string = await jspdftime();
            var embed = "<embed src='" + string + "'/>"
            if (string == undefined || string == null){
                Oh_error_exist("OneQuote.vue! jspdf cannot return src string in Page!");
            }

            console.log("=====edit and upoad another quote:1 ");

            const bb = document.getElementById('pdf_quote');
            var clone = bb.cloneNode(true);
            clone.setAttribute('src', string);
            bb.parentNode.replaceChild(clone, bb);
            var base64 = doc.output('datauri');
            this.return_base64 = base64;

            console.log("=====edit and upoad another quote:2 " + this.copy_q_number + " " + path + " " + this.return_base64 );
            
            const path = "/all_quote/" + this.copy_q_number + "/";

            test2_storage( this.copy_q_number, path, this.return_base64);

            console.log("=====edit and upoad another quote:3 ");
            await setDoc(ref, {cp}, { merge:true })
            .then(docRef => { 
                var choosen_product_qty = Object.keys(this.cp).length;
                cp["choosen_product_qty"] = choosen_product_qty;
            })
            

        },

        async getAllClient(){
        var all_client_ref = await firebase.firestore().collection("all_clients");
            all_client_ref.onSnapshot(snap => {
                this.all_clients = [];

                snap.forEach(d => {

                    var c = d.data();
                    console.log("ipad?A " + c.c_fullname);

                    this.all_clients.push(c);

                });
            });
        },

        async getAllDelivery(){
            console.log("=======" + this.this_one_q_hash_number);
            var all_delivery_ref = await firebase.firestore().collection("all_delivery").doc(this.this_one_q_hash_number).collection("this_client_delivery");
            all_delivery_ref.onSnapshot(snap => {
                this.all_deliverys = [];

                snap.forEach(d => {

                    var delivery = d.data();
                    console.log("ipad?B " + d.d_fullname);

                    this.all_deliverys.push(delivery);

                });
            });
        },

        async IFInvoiceExist(){

            console.log( this.this_one_q_hash_number);
            let flag = false;
            const if_invoice = firebase.firestore().collection("ALL_invoice").where("quote_hashid", "==", this.this_one_q_hash_number).get().then((qSnap) => {
            if (qSnap.empty) {
                console.log("No cart found for user")
                flag = false;
                return flag;
            } else {

                document.getElementById("m_edit_quotation").disabled = true; //always run this?
                document.getElementById("m_new_invoice").disabled = true; //always run this?
                flag = true;
                return flag;
            }
            }) 
            
        },
        async getAllProductsName() { 
            var all_product_ref = await firebase.firestore().collection("all_products");
            all_product_ref.onSnapshot((snapshot) => {
            this.e_all_product_list = [];
            snapshot.forEach(d => {
                var product = d.data();

                this.e_all_product_list.push(product);
            })
            })     
        },
        async clearRest(i){ //uncheck
            console.log("clear reset. 1" );
            var select_product = document.getElementById("so_product").value;
            let d1 = "i_quantity"+i;
            let d2 = "i_unit"+i;
            let d3 = "i_discount"+i;
            let d4 = "i_code"+i;
            let d5 = "i_sell"+i;
            let d6 = "i_final_total"+i;
            document.getElementById(d1).value = "1";
            document.getElementById(d2).value = "";
            document.getElementById(d3).value = "0";
            //no d5 is ok
            let sell_is = document.getElementById(d5).innerText;
            document.getElementById(d6).innerText = sell_is;
            console.log("clear reset. 2" + select_product);
            var one_product_ref = await firebase.firestore().collection("all_products").where("p_fullname", "==", select_product);
            one_product_ref.get()
            .then((snapshot) => {


                
                snapshot.forEach(d => {
                    var select_p_code = d.data().p_code;
                    var select_p_sale = d.data().p_sell;


                    console.log("clear reset. 3" + select_p_code + "   " + select_p_sale);
                    document.getElementById(d4).innerText = select_p_code;
                    document.getElementById(d5).innerText = select_p_sale;
                })
            })
        },

        async doSort3(){
            var optionValue = document.getElementById("select_bill_to").value;
            document.getElementById("select_ship_to").selectedIndex = -1;

            var sort_client = await firebase.firestore().collection("all_clients").where("c_fullname", "==", optionValue);

            sort_client.onSnapshot(snap => {
                
                snap.forEach(d => {

                    var a1= d.data().c_address_1;
                    var a2= d.data().c_address_2;
                    var a3= d.data().c_city;
                    var a4= d.data().c_post_code;

                    console.log("did I found new bill address? " + a1 + " " +a2 + " " + a3 + " " + a4)
                    select_a1.value = a1;
                    select_a2.value = a2;
                    select_a3.value = a3;
                    select_a4.value = a4;

                
                });
            })

        },


        async doSort4(){
            var optionValue = document.getElementById("select_bill_to").value;
            document.getElementById("select_ship_to").selectedIndex = -1;

            var sort_client = await firebase.firestore().collection("all_delivery").doc(this.this_one_q_hash_number).collection("this_client_delivery");
            sort_client.onSnapshot(snap => {
                
                snap.forEach(d => {

                    var a1= d.data().d_address_1;
                    var a2= d.data().d_address_2;
                    var a3= d.data().d_city;
                    var a4= d.data().d_post_code;

                    console.log("did I found new bill address? " + a1 + " " +a2 + " " + a3 + " " + a4)
                    select_b_a1.value = a1;
                    select_b_a2.value = a2;
                    select_b_a3.value = a3;
                    select_b_a4.value = a4;

                
                });
            })

        },


        
    },
    created() {

        this.retrieveOneQuoteInfo();

        let flag = this.IFInvoiceExist();
        if (flag)
            this.loadInvoicePDF();
        
        

        this.getAllClient();
        this.getAllDelivery();

        this.getAllProductsName();


        
        
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
    doc.text(this.copy_ft_vat, 182, doc.lastAutoTable.finalY + 25 , {align: 'right'})
    doc.text('Shipping', 139, doc.lastAutoTable.finalY + 30 , {align: 'right'})
    doc.text(this.copy_ft_shipping, 182, doc.lastAutoTable.finalY + 30 , {align: 'right'})
    doc.text('Total', 139, doc.lastAutoTable.finalY + 35 , {align: 'right'})
    doc.text( this.copy_ft_total , 182, doc.lastAutoTable.finalY + 35 , {align: 'right'})

    doc.setFontSize(9);
    doc.text('Terms & Instructions', 6,  doc.lastAutoTable.finalY + 40).setFont(undefined, 'bold');
    doc.text('Quote only valid for 30 days', 6, doc.lastAutoTable.finalY + 44)

    var string = doc.output('datauristring');
}


async function addVatSHip(i_subtotal){

    //let i_subtotal = document.getElementById('q_subtotal').value;
    let i_vat = document.getElementById('e_q_vat').value;
    let i_shipping = document.getElementById('e_q_shipping').value;

    let added_vat = 0;
    let find_vat = 0;
    let added_shipping = 0;
    let final = 0;
    added_vat = i_subtotal * 1.20; 

    find_vat = +added_vat - +i_subtotal;
    document.getElementById("e_q_vat").value = find_vat;
    

    added_shipping = await +added_vat + +i_shipping;
    final = added_shipping;

    let r_final = Number(final).toFixed(2);
    document.getElementById("e_q_final").value = r_final;


    return final;
}



</script>

<style>
.check_invoice{
    border: 1px dashed black;
}
</style>