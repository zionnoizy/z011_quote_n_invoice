<template>

    <div class="grid grid-cols-1 gap-1 ">
        <div class="mx-auto" style="display: flex;;">
            <div class="flex-grow-0 mx-2 px-3">
                <label>EDIT BILL TO</label>
                <select class="form-select" aria-label="Default select example" v-model="selectedAnotherClient" >
                    <option value="" disabled selected>Marital Status</option>
                    <option >{{ selectedAnotherClient }}</option>
                </select>
            </div>    


            <!-----------------------------------modal//BillTo------------------------------------->

            <!--1/3-->
            <div class="float-to-bottom">
                <label>2.SHIP TO</label>
                <button class="choose_address_btn border btn btn-secondary btn-square-lg" type="button "
                    data-bs-toggle="modal" data-bs-target="#choose_ship_to" v-on:click="this.getAllClient1();">

                    <p ref="old_s_fullname" id="old_s_fullname"></p>
                    <p ref="old_s_address1" id="old_s_address1"></p>
                    <p ref="old_s_address2" id="old_s_address2"></p>
                    <p ref="old_s_city" id="old_s_city"></p>
                    <p ref="old_s_postcode" id="old_s_postcode"></p>
                </button>
                <!-------------------modal//ShipTo------------------------->
                <div class="modal fade" id="choose_ship_to" tabindex="-1" aria-labelledby="" aria-hidden="true">

                    <div class="modal-dialog modal-xl">

                        <div class="modal-content text-black">

                            <div class="modal-header">
                                <h4 class="modal-title"> Select Delivery Address From the Client</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close"
                                    > X </button>
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
            
        </div>
        <!--2/3--------------------------------------------------------------------->
        <div class="mx-auto grid grid-cols-2 gap-2" style="display: flex;;">
            <div>
                <button class="choose_address_btn border btn btn-secondary btn-square-lg" type="button "
                    data-bs-toggle="modal" data-bs-target="#choose_products" v-on:click="this.getAllProducts();">
                    Edit Products of Goods
                </button>
                <!--NEW-----product-modal---------------------------------------------------------------------->
                <table>
                    <thead>
                        <tr>Items</tr>
                        <tr>Code</tr>
                        <tr>Quality</tr>
                        <tr>Unit</tr>
                    </thead>
                <tbody>
                    <tr>
                    <td contenteditable='true'>
                        <select class="form-select" aria-label="Default select example" v-on:click="this.getAllProducts();" >
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </td>
                    <td contenteditable='false'>TEST9</td>
                    </tr>
                    <tr>
                    <td contenteditable='false'>TEST9</td>
                    <td contenteditable='false'>TEST9</td>
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
                            <button type="button" class="btn btn-success" @click="ResubmitQuote($event)">Edit
                                Qutotation </button>
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>


                </div>
            </div>
            <!------------------modal end---------------------->


        </div>
    </div>


</template>
<script>



export default{
    name: "EditQuote",
    data(){
        return{

            client: {
                c_fullname: null,
                c_address_1: null,
                c_address_2: null,
                c_city: null,
                c_insert_date: null,
                c_post_code: null,
                c_cid: null,
            },
            selectedAnotherClient: [],
        }
    },
    components:{

    },
    methods:{
        showPrevious(){
            
            //release all old information pe-insert in oneQuote

        },
        ResubmitQuote(){
            console.log("edited quotation, now 1.re-upload invoice and change the firestore data.")
            // https://www.youtube.com/watch?v=CGrNNGrKCJU&ab_channel=AdnanAfzal    [(9:55)]
        }, 

        async EditAllClient() {
 
            var all_client_ref = await firebase.firestore().collection("all_clients");
            all_client_ref.onSnapshot(snap => {


                snap.forEach(d => {
                    this.selectedAnotherClient = d.data().c_fullname;
                    console.log("[ ]" + d.data().c_fullname);
                });
            });
            //this.selectedAnotherClient = "";
        },


    },
    created() {
        this.EditAllClient();
    },

    watch:{
        selectedAnotherClient:function(){
            console.log('selected is ' +this.selected+" do you logic here");
        },

    },

}
function retrieve_old_stuff(){
    document.getElementById('old_b_fullname').innerHTML = "THIS_IS_OLD_CLIENT_NAME";
    document.getElementById('old_b_address1').innerHTML = "THIS_IS_OLD_ADDRESS1";
    document.getElementById('old_b_address2').innerHTML = "THIS_IS_OLD_ADDRESS2";
    document.getElementById('old_b_city').innerHTML = "THIS_IS_OLD_CITY";
    document.getElementById('old_b_postcode').innerHTML = "THIS_IS_OLD_POSTCODE";

    document.getElementById('old_s_fullname').innerHTML = "THIS_IS_OLD_SHIPPING_NAME";
    document.getElementById('old_s_address1').innerHTML = "THIS_IS_OLD_ADDRESS1";
    document.getElementById('old_s_address2').innerHTML = "THIS_IS_OLD_ADDRESS2";
    document.getElementById('old_s_city').innerHTML = "THIS_IS_OLD_CITY";
    document.getElementById('old_s_postcode').innerHTML = "THIS_IS_OLD_POSTCODE";
}
</script>