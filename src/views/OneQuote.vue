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
                                    <input ref="po_number" placeholder="PO Number" />
                                    
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal" aria-label="close" v-on:click="this.submitQuotation(use_this_hash);">Submit Quotation to Invoice</button>
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

            oneqdata: '',
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
            console.log("find quotation pdf url + retrieve all quotation inforamtion in here." + q_hash_num)
            // https://www.youtube.com/watch?v=CGrNNGrKCJU&ab_channel=AdnanAfzal    [(9:55)]
            const findQuoteInfo = firebase.firestore().collection('ALL_quote').id(q_hash_num); //how can I find hashid
            findQuoteInfo.onSnapshot(snap => {
                this.find_one_quote_info = [];
                
                snap.forEach(d => {
                    var oneqdata = d.data();
                    this.find_one_quote_info.push(oneqdata);
                });
                });  
                const obj_ref ={
                    i_quotation_no:this.$refs.address_1.value,
                }
        }, 

        submitQuotation(use_this_hash){
            //everything is the same besides the po number
            let po_number = document.getElementById('po_number').value;

            const ref = collection(db, 'all_clients');
            
            //.where("obj_ref.account_id", "==", "qgZ564nfEaNP3Nt4cW1K3jCeVlY2");
            const find_q_hashid = firebase.firestore().collection('ALL_quote').where("quote_hashid", "==", use_this_hash); //q_hash_id how to find it
            let find_q_b_fullname = "";

            const invoice_obj_ref = {
                
                qi_bill_fullname: "",
                qi_bill_address1: "",
                qi_bill_address2: "", 
                qi_bill_city: "",
                qi_bill_postcode: "",

                qi_ship_fillname: "",
                qi_ship_address1: "",
                qi_ship_address2: "", 
                qi_ship_city: "",
                qi_ship_postcode: "", 

                qi_quote_number: "q_number", //cannot retrieve quote_number!
                qi_uploaded_date: "",
                qi_ref: "",
                qi_po: po_number,

                //q_pdf_link: 'THIS_IS_FIRESTORE_URL',
            }



            ///jspdf time!

        },

    },
    created() {

        this.retrieveOneQuoteInfo();
        if(this.$route.query.this_one_q_hash_number)
            this.this_one_q_hash_number = this.$route.query.this_one_q_hash_number;
        this.use_this_hash = this.$route.query.this_one_q_hash_number;
    },
}
</script>

<style>
.check_invoice{
    border: 1px dashed black;
}
</style>