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
import { addDoc, collection } from "@firebase/firestore";
import { app, db, auth } from "@/firebase.js";

const hashid = ref('')
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
        }
    },
    components:{
        EditQuote,
    },
    methods:{

        retrieveOneQuoteInfo(){
            console.log("find quotation pdf url + retrieve all quotation inforamtion in here." + this.this_one_q_hash_number)
            // https://www.youtube.com/watch?v=CGrNNGrKCJU&ab_channel=AdnanAfzal    [(9:55)]
            const findQuoteInfo = firebase.firestore().collection('ALL_quote').where("quote_hashid", "==", this.this_one_q_hash_number); //how can I find hashid
            findQuoteInfo.onSnapshot(snap => {
                this.find_one_quote_info = [];
                
                snap.forEach(d => {
                    var find_one_quote_info = d.data(); //undefined?
                    console.log("->" + oneqdata.obj_ref.q_bill_fullname);
                    console.log("->" + oneqdata.obj_ref.q_bill_address1);
                    console.log("->" + oneqdata.obj_ref.q_bill_address2);
                    console.log("->" + oneqdata.obj_ref.q_bill_city);
                    console.log("->" + oneqdata.obj_ref.q_bill_postcode);
                    
                    console.log("->" + oneqdata.obj_ref.q_bill_fullname);
                    this.oneqdata.push(find_one_quote_info);
                });
                });  
                const obj_ref ={
                    i_quotation_no:this.$refs.address_1.value,
                }
        }, 

        async submitQuotation(use_this_hash){
            //everything is the same besides the po number
            let po_number = document.getElementById('po_number').value;


            const find_q_all_info = firebase.firestore().collection('ALL_quote').where("quote_hashid", "==", use_this_hash); //q_hash_id how to find it
            find_q_all_info.onSnapshot((snapshot) => {
            snapshot.docs.forEach(d => {
                var product = d.data();
                var tmp_one_sell = parseFloat(d.data().p_sell);   
                this.tmp_sell = this.tmp_sell + tmp_one_sell;
                this.choosen_products.push(product);
                console.log("[choosenOneProduct] tmp sell is " + this.tmp_sell + " " + this.choosen_products);

                this.$root.$emit('submitQuotation', this.choosen_products);
                this.$root.$emit("submitQuotation", this.tmp_sell);
            
            })
            })



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
                
                qi_quote_number: "qi_quote_number", 
                qi_uploaded_date: "qi_uploaded_date",
                qi_ref: "qi_ref",

                qi_po: po_number,
                qi_q_hashid: use_this_hash,
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

            addDoc(ref, {obj_ref, price_ref})
            .then(docRef => {
            const get_id = firebase.firestore().collection("ALL_invoice").doc(docRef.id);
            const string = "/all_invoice/" + use_this_hash + "/" + docRef.id + "/";
            //test2_storage( docRef.id, string, this.return_base64);
            get_id
                .update({
                    invoice_hashid: docRef.id,
                })
                .then(() => {
                    console.log("set doc");

                    get_id.get().then((d) => {
                        console.log("updated data:", d.data());
                    });
                });
            })
            ///jspdf time!

        },

    },
    created() {

        this.retrieveOneQuoteInfo();

    },
}
</script>

<style>
.check_invoice{
    border: 1px dashed black;
}
</style>