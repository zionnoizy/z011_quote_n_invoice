<template>
    <div class="OneQuote">

        <p> coming soon - view specific quote.</p>
        <p> The quote id is {{ $route.params.id }}</p>

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
                <!--NEW-----product-modal---------------------------------------------------------------------->
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
                                    <input placeholder="PO Number" />
                                    <input placeholder="Type Your PO Number Again" />
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal" aria-label="close" v-on:click="this.submitQuotation();">Submit Quotation to Invoice</button>
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
    data(){
        return{
            id: this.$route.params.id, //[change from hash to quote number]
            one_quote_url: '',
        }
    },
    components:{
        EditQuote,
    },
    methods:{

        retrieveOneQuoteInfo(){
            console.log("find quotation pdf url + retrieve all quotation inforamtion in here.")
            // https://www.youtube.com/watch?v=CGrNNGrKCJU&ab_channel=AdnanAfzal    [(9:55)]
        }, 
        submitQuotation(){
            //everything is the same besides the po number

        },

    },

}
</script>

<style>
.check_invoice{
    border: 1px dashed black;
}
</style>