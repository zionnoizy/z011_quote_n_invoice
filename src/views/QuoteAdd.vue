
<template>

    <div class="QuoteAdd">

        <p>test997</p>
        <p>Empty Redirection Page.</p>



        <button href="@/assets/files/quote_instruction.pdf" download>Downlaod Instruction</button>
        
        <div class="grid grid-cols-1 gap-1 ">
            <!--1/3-------------------BILL-SHIP-TO-------------------------------------->
            <div> <p class="text-2xl underline">Bill To + Ship To</p> 
            
            <label>BILL TO</label>

                <button class="choose_address_btn border btn btn-secondary btn-square-lg" type="button" data-bs-toggle="modal" data-bs-target="#choose_bill_to" v-on:click="this.getAllClient1();" >

                    <p ref="tmp_b_fullname" id="tmp_b_fullname"></p>
                    <p ref="tmp_b_address1" id="tmp_b_address1"></p>
                    <p ref="tmp_b_address2" id="tmp_b_address2"></p>
                    <p ref="tmp_b_city" id="tmp_b_city"></p>
                    <p ref="tmp_b_postcode" id="tmp_b_postcode"></p>

                </button>

                <!-------------------modal//BillTo------------------------->
                <div class="modal fade" id="choose_bill_to" tabindex="-1" aria-labelledby="" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        
                        <div class="modal-content text-black">

                            <div class="modal-header">
                                <h4 class="modal-title"> Add Bill-To </h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close" v-on:click="showBillToModal=false">X</button>
                            </div>
                            <div class="modal-body" style="background-color: #1267aa;">

                                <div class="px-5 mx-5 grid grid-cols-3 gap-2  ">
                                    <div class="" v-for="b, i in all_clients1" >       
                                    <div class="client_card row" @click="ChooseBillTo($event,b, i); " data-bs-dismiss="modal" aria-label="close">
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
                                <button type="submit"  class="btn btn-success" v-on:click="submitManufacturer()" >Submit Bill In </button>
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-------------------modal//BillTo------------------------->

                <label>SHIP TO</label>
                <button class="choose_address_btn border btn btn-secondary btn-square-lg"  type="button " data-bs-toggle="modal" data-bs-target="#choose_ship_to" >Choose Client 

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
                                <h4 class="modal-title"> Add Ship-To </h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close" v-on:click="showShipToModal=false"> X </button>
                            </div>

                            <div class="modal-body">

                                <div class="px-5 mx-5 grid grid-cols-3 gap-2  ">
                                    <div class="" v-for="s, i in all_clients2" >       
                                    <div class="client_card row" @click="ChooseShipTo($event,s, i);" data-bs-dismiss="modal" aria-label="close">
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
                                <button type="submit"  class="btn btn-success" v-on:click="submitManufacturer()" >Submit Manufacturer </button>
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                        

                    </div>
                </div>
                <!---------------------[END] BILL-SHIP-TO-------------------------------------->
            </div>
            
            <!--2/3--------------------------------------------------------------------->
            <div> <p class="text-2xl underline">Add Products of Goods (1/10)</p> 
            
                <p>the product code/ category/ cost/ margin/ sell will not shown unless an input element lost its focus </p>

                <input list="s_product" ref="p_enter"  v-model="s_product_name" placeholder="Item Name" id="p_enter" @input="suggesting()" @blur="EnterProduct();" @change="CumulativeTotal();" required/>


                <datalist id="s_product">
                    <!-- <option v-for="(s, i) in s_product">{{s.p_fullname}}</option> -->
                    <option v-for="(s, i) in s_product2" >{{s.p_fullname}}</option>
                </datalist>
                <!----------------------end-suggestion-------------------------------------->
                <div id="s_product" style="margin: 10px">

                </div>


                 <!--only shown if typing-->
                <input ref="p_code" placeholder="Product Code" @input="EnterProduct" id="p_code"  disabled/>
                <input ref="p_category" placeholder="Product Category" id="p_category" @input="EnterProduct" disabled/>
                <input ref="p_cost" placeholder="Product Cost (digit only)" id="p_cost" @input="EnterProduct"  disabled />
                <input ref="p_margin" placeholder="Product Margin (digit only)" id="p_margin" @input="EnterProduct" disabled />
                <input ref="p_sell" placeholder="Product Sell" id="p_sell1" @input="EnterProduct();" @change="CumulativeTotal();" disabled/>
            
            </div>
            <!--3/3-->
            <div> <p class="text-2xl underline">Final Calculation</p> 

                <input ref="q_subtotal" placeholder="Subtotal" id="q_subtotal"  disabled/>

                <input ref="q_vat" placeholder="Vat" id="q_vat"  />

                <input ref="q_shipping" placeholder="Shipping" id="q_shipping"  />

                <input ref="q_total" placeholder="Total" id="q_total" @input="CumulativeTotal" disabled/>
            
            </div>


            <div> 
                <button class="preview_btn btn btn-info btn-lg btn-block" data-bs-toggle="modal" data-bs-target="#preview_quotation" @click.prevent=previewBtn()> Preview </button>
                <!--@click.prevent="uploadQuotePDF($event)" download -->
                <!------------------modal start-------------------->
                <div class="modal fade" id="preview_quotation" tabindex="-1" aria-labelledby="" aria-hidden="true">
                    
                    <div class="modal-dialog modal-xl">
                        
                        <div class="modal-content text-black">

                            <div class="modal-header">
                                <h4 class="modal-title"> Preview Qutotation, Please make sure all information is correct, we cannot able to change back later on. </h4>
                                
                            </div>

                            <div class="modal-body">

 
                                <embed id="preview_quotationPDF" width='100%' height='100%' src=''/>




                            </div>
                            <div class="modal-footer" style="background-color: #1267aa;">
                                <button type="button"  class="btn btn-success" @click="uploadQuotePDF($event)" >Submit Qutotation </button>
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                        

                    </div>
                </div>
                <!------------------modal end---------------------->
            </div>
        </div>



        


        

    </div>

</template>


<script>
import jsPDF from 'jspdf';
import "jspdf/dist/polyfills.es.js";
import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';
import { reactive, computed, ref } from 'vue'

import { onMounted, nextTick  } from 'vue';

//ref
import { getStorage,  uploadBytes, uploadBytesResumable, ref2 as firebaseStorageRef, getDownloadURL } from "firebase/storage";
import { serverTimestamp } from 'firebase/firestore'
import { save_2_storage, test2_storage } from '../firebase';


export default{
    name: 'QuoteAdd',
    setup() {

        

        const s_product2 = reactive([]);
        onMounted(async () => {
            
            try{
            const typing_product = await firebase
            .firestore()
            .collection("all_products")
            .get();
            typing_product.forEach((doc) =>{
                s_product2.push(doc.data());

            });
        } catch (e){
            console.log("Error Typing s_product2");
        }
        });
        

        
        
        return {s_product2};
    
    },
    data(){
        
        return{
            //, 
            convert_to_month: ["01.JAN", "02.FEB", "03.MAR", "04.APR", "05.MAY", "06.JUN", "07.JUL", "08.AUG", "09.SEP", "10.OCT", "11.NOV", "12.DEC"],
            //
            showBillToModal:false,
          all_clients1: [],
          all_clients2: [],
          hidden_bill_fullname: null,
          hidden_bill_address_1: null,
          hidden_bill_address_2: null,
          hidden_bill_city: null,
          hidden_bill_insert_date: null,
          hidden_bill_post_code: null,

          client:{
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
        }
    },
    methods:{
        

        async getAllClient1() { 
            console.log("[QuoteAdd-getAllClient] print-1" );
            var all_client_ref = await firebase.firestore().collection("all_clients");
            all_client_ref.onSnapshot(snap => {
                this.all_clients1 = [];
                
                snap.forEach(d => {
                    console.log("[QuoteAdd-getAllClient] print" );

                    var client = d.data();
                    this.all_clients1.push(client);
                });
            });
        },
        ChooseBillTo(ev, b, i){
            console.log("[QuoteAdd-ChooseBillTo] comming soon, click client and retrieve text." + ev + "  "  + i);
            console.log("[QuoteAdd-ChooseBillTo] you have chosen  " + b.c_fullname);
            
            document.getElementById('tmp_b_fullname').innerHTML = b.c_fullname;
            document.getElementById('tmp_b_address1').innerHTML = b.c_address_1;
            document.getElementById('tmp_b_address2').innerHTML = b.c_address_2;
            document.getElementById('tmp_b_city').innerHTML = b.c_city;
            document.getElementById('tmp_b_postcode').innerHTML = b.c_post_code;


            console.log("[QuoteAdd-ChooseBillTo]@ you have chosen" );

            this.showBillToModal = false;
        },
        ChooseShipTo(ev, s, i){
            console.log("[QuoteAdd-ChooseShipTo] comming soon, click client and retrieve text." + ev + "  "  + i);
            console.log("[QuoteAdd-ChooseShipTo] you have chosen" + s.c_fullname);
            document.getElementById('tmp_s_fullname').innerHTML = s.c_fullname;
            document.getElementById('tmp_s_address1').innerHTML = s.c_address_1;
            document.getElementById('tmp_s_address2').innerHTML = s.c_address_2;
            document.getElementById('tmp_s_city').innerHTML = s.c_city;
            document.getElementById('tmp_s_postcode').innerHTML = s.c_post_code;

            
        },
        async EnterProduct(){

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
        async CumulativeTotal(){

        const pi_sell1 = document.getElementById('p_sell1').value;

        //const pi_sell2 = document.getElementById('p_sell2').value;    
        //const tmp_ans = +pi_sell1 +pi_sell2;

        console.log("[CumulativeTotal] " + pi_sell1 );


        document.getElementById('q_total').value = pi_sell1;

        },
        
        async writePDF(){
            console.log("[QuoteAdd-writePDF] write pdf.");

            const doc = new jsPDF();  
            doc.addImage(cms_empty_quote, "JPEG",0,0,210,297);
            console.log("[QuoteAdd-writePDF] write pdf.");
            //
            doc.save("quote.pdf");
        },

        show_typing_product_suggestions(){

            this.show_product_suggestions = true;

        },
        
        async getAllProducts() { 

            var all_product_ref = await firebase.firestore().collection("all_products");

            all_product_ref.onSnapshot((snapshot) => {
                this.s_product = [];

                snapshot.forEach(d => {

                    var s_product_name =d.data();

                    this.s_product.push(s_product_name);

                })
            })
            

        },
        suggestionSelected(i) {

            this.s_product_name = this.s_product[i].s_product_name;
        },
        
        suggesting(){
            console.log("[QuoteAdd]-suggesting  turn on s_flag");
            this.s_flag = true;
        },
        previewBtn(){
            console.log("[previewBtn] --" );
            const doc = new jsPDF();  //'l', 'mm', 'a4'
            doc.addImage(cms_empty_quote, "JPEG",0,0,210,297);
            //add all48 text
            const oo_b_fullname = document.getElementById('tmp_b_fullname').innerHTML;
            const oo_b_a1 = document.getElementById('tmp_b_address1').innerHTML;
            const oo_b_a2 = document.getElementById('tmp_b_address2').innerHTML;
            const oo_b_city = document.getElementById('tmp_b_city').innerHTML;
            console.log("[previewBtn] -------" + oo_b_fullname);
            doc.setFontSize(10);
            doc.text(oo_b_fullname, 6, 93);
            //doc.text(oo_b_fullname, 120, 20);

            //add all48 text
            var string = doc.output('datauristring');
            var embed = "<embed width='100%' height='100%' src='" + string + "'/>"

            const a = document.getElementById('preview_quotationPDF');
            var clone = a.cloneNode(true);
            clone.setAttribute('src',string);
            a.parentNode.replaceChild(clone,a);

            var base64 = doc.output('datauri');
            this.return_base64 = base64;




        },
        //https://medium.com/runthatline/uploading-files-to-firebase-cloud-storage-using-vue-3-and-the-composition-api-d8370d1c03f7
        uploadQuotePDF(e){
            //[1]generate PDF
            
            

            //document.getElementById('preview_quotation').appendChild(embed);
            /*
            var x = window.open();
            x.document.open();
            x.document.write(embed);
            x.document.close();
            */
            //doc.save("./tmp/a4.pdf");

            //const file = e.target.files[0];
            const storage = getStorage();


            const myTimestamp = firebase.firestore.Timestamp.now();
            const today_year = myTimestamp.toDate().getFullYear();
            const tmp_today_month = myTimestamp.toDate().getMonth();

            //const t = firebase.firestore.serverTimestamp.fromDate(new Date());
            //const today_year = ts.toDate().getYear();
            //const today_month = ts.toDate().getMonth();
            console.log("[uploadQuotePDF] " + myTimestamp + " " + today_year + " " + tmp_today_month);
            const month_folder = this.convert_to_month[tmp_today_month];

            //const today_month = convert_month(tmp_today_month);
            const path_string = "/all_quote/" + today_year + "/" + month_folder + "/"
            console.log();
            console.log("[uploadQuotePDF] + ");
            test2_storage(path_string, this.return_base64); 

            console.log("[uploadQuotePDF] ++ ");
            
            // storage ref + upload task
            const storageref = ref(storage, path_string);
            const uploadtask = uploadBytesResumable(storageref, DATA_HERE);

            uploadtask.on(
                'state_changed',
                (snapshot)=>{
                    console.log("[uploadQuotePDF]  uploaded");
                //this.uploadValue = ( snapshot.bytesTransferred / snapshot.totalBytes )*100;

            }, 
            error=>{
                console.log(error.message)
            },
            ()=>{
                this.uploadValue= 'upload success';

                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                    this.picture =url;
                    });
            },
            async () =>{
                console.log("[uploadQuotePDF] 2 uploaded");
                downloadUrl.value = await getDownloadURL(uploadtask.snapshot.ref)

            },   
            );

            

        },
        
    },
    created() {

        this.getAllProducts();
            
    },
}


</script>

<style>

.client_card:hover{
    background-color: #323829;
}

.choose_address_btn{
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

input[disabled] {pointer-events:none}
</style>