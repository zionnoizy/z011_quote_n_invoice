<template>

    <p> Instruction For This Page (Quicker-QuoteIn v0.1) </p>
    <p> This is a easy-version for invoice generator page. There is total 78 input field below,
        Look carefully what input text is displayed because it will reflect on your final invoice positions. For instance, the bill_to_name is the name or company who send the quote. </p>
    
    <!--bill_in-->
    <input id="input0" placeholder="bill_to_name" value="Zion Wong"  />
    <input id="input1" placeholder="bill_to_address1" value="920 West 4th Ave"  />
    <input id="input2" placeholder="bill_to_address2" value="Apt231" />
    <input id="input3" placeholder="bill_to_city" value="Chico" />
    <input id="input4" placeholder="bill_to_post_code" value="95926" />
    <!--ship_to-->
    <input id="input5" placeholder="ship_to_name" value="BigM Ltd." />
    <input id="input6" placeholder="ship_to_address_1" value="77 Lucky Seven Street" />
    <input id="input7" placeholder="ship_to_address_2" value="Unit 11" />
    <input id="input8" placeholder="ship_to_city" value="London" />
    <input id="input9" placeholder="ship_to_postcode" value="Q11 0UN" />

    <input id="input10" placeholder="10" value="Q0000000" />
    <input id="input11" placeholder="11" value="17/02/2023"  />
    <input id="input12" placeholder="12" value="ReferenceNo99" />

    <input id="input13" placeholder="13" value="POPOPO" />

    <input id="input14" placeholder="1_description_of_goods" value="SVP 1m Pipe 110mm - Grey" />
    <input id="input15" placeholder="1_code" value="TY587" />
    <input id="input16" placeholder="1_qty" value="290" />
    <input id="input17" placeholder="1_unit" value="373" />
    <input id="input18" placeholder="1_disocount" value="0" />
    <input id="input19" placeholder="1_total" value="772.11" />

    <input id="input20" placeholder="2_description_of_goods"  />
    <input id="input21" placeholder="2_code"  />
    <input id="input22" placeholder="2_qty"  />
    <input id="input23" placeholder="2_unit"  />
    <input id="input24" placeholder="2_disocount"  />
    <input id="input25" placeholder="2_total"  />

    <input id="input26" placeholder="2"  />
    <input id="input27" placeholder="2"  />
    <input id="input28" placeholder="2"  />
    <input id="input29" placeholder="2"  />
    <input id="input30" placeholder="2"  />
    <input id="input31" placeholder="2"  />
    <input id="input32" placeholder="2"  />
    <input id="input33" placeholder="2"  />
    <input id="input34" placeholder="2"  />
    <input id="input35" placeholder="2"  />
    <input id="input36" placeholder="2"  />
    <input id="input37" placeholder="2"  />
    <input id="input38" placeholder="2"  />
    <input id="input39" placeholder="2"  />
    <input id="input40" placeholder="2"  />
    <input id="input41" placeholder="2"  />
    <input id="input42" placeholder="2"  />
    <input id="input43" placeholder="2"  />
    <input id="input44" placeholder="2"  />
    <input id="input45" placeholder="2"  />
    <input id="input46" placeholder="2"  />
    <input id="input47" placeholder="2"  />
    <input id="input48" placeholder="2"  />
    <input id="input49" placeholder="2"  />
    <input id="input50" placeholder="2"  />
    <input id="input51" placeholder="2"  />
    <input id="input52" placeholder="2"  />
    <input id="input53" placeholder="2"  />
    <input id="input54" placeholder="2"  />
    <input id="input55" placeholder="2"  />
    <input id="input56" placeholder="2"  />
    <input id="input57" placeholder="2"  />
    <input id="input58" placeholder="2"  />
    <input id="input59" placeholder="2"  />
    <input id="input60" placeholder="2"  />
    <input id="input61" placeholder="2"  />
    <input id="input62" placeholder="2"  />
    <input id="input63" placeholder="2"  />
    <input id="input64" placeholder="2"  />
    <input id="input65" placeholder="2"  />
    <input id="input66" placeholder="2"  />
    <input id="input67" placeholder="2"  />
    <input id="input68" placeholder="2"  />
    <input id="input69" placeholder="2"  />
    <input id="input70" placeholder="2"  />
    <input id="input71" placeholder="2"  />
    <input id="input72" placeholder="2"  />
    <input id="input73" placeholder="2"  />
    <input id="input74" placeholder="2"  />
    <input id="input75" placeholder="2"  />
    <input id="input76" placeholder="2"  />
    <input id="input77" placeholder="2"  />


    <button class="btn btn-primary btn-lg mb-3" @click="writePDF2_Q">DOWNLOAD QUOTATION </button>
    <button class="btn btn-warning btn-lg mb-3" @click="writePDF2_I">DOWNLOAD INVOICE </button> 
    <button class="btn btn-warning btn-lg mb-3" @click="test_write">Debug Button </button>   
    <button class="btn btn-warning btn-lg mb-3" @click="test_write2">Debug Button 2 </button>  
</template>




<script>
import { jsPDF } from "jspdf";
import "jspdf/dist/polyfills.es.js"; //for old prowser
import { PDFDocument } from 'pdf-lib';
import autoTable from 'jspdf-autotable'

import { app, db, auth, fv } from "@/firebase.js";
import { addDoc, collection } from "@firebase/firestore";


//import {firebase} from "firebase/app";
export default{
    name: 'empty',
    methods:{
        async writePDF2_Q(){
            //bill_in
            let input0 = document.getElementsByTagName("input")[0].value;
            let input1 = document.getElementsByTagName("input")[1].value;
            let input2 = document.getElementsByTagName("input")[2].value;
            let input3 = document.getElementsByTagName("input")[3].value;
            let input4 = document.getElementsByTagName("input")[4].value;
            //ship_to
            let input5 = document.getElementsByTagName("input")[5].value;
            let input6 = document.getElementsByTagName("input")[6].value;
            let input7 = document.getElementsByTagName("input")[7].value;
            let input8 = document.getElementsByTagName("input")[8].value;
            let input9 = document.getElementsByTagName("input")[9].value;
            //ship_to
            let input10 = document.getElementsByTagName("input")[10].value;
            let input11 = document.getElementsByTagName("input")[11].value;
            let input12 = document.getElementsByTagName("input")[12].value;
            //PO
            //let input13 = document.getElementsByTagName("input")[13].value;
            //ship_to
            let input14 = document.getElementsByTagName("input")[14].value;
            let input15 = document.getElementsByTagName("input")[15].value;
            let input16 = document.getElementsByTagName("input")[16].value;
            let input17 = document.getElementsByTagName("input")[17].value;
            let input18 = document.getElementsByTagName("input")[18].value;
            let input19 = document.getElementsByTagName("input")[19].value;
            //https://www.base64-image.de/
            //https://www.youtube.com/watch?v=GHTrsUtmQTo&ab_channel=RedStapler
            console.log("[QuickerQuoteIn-writePDF2 ]" + "   " + input5);
            const doc = new jsPDF();  
            doc.addImage(cms_empty_quote, "JPEG",0,0,210,297);
            
            //1_set one addresses font
            doc.setFontSize(8);
            doc.text(input0, 19, 97);
            doc.text(input1, 19, 101); //+5
            doc.text(input2, 19, 105);
            doc.text(input3, 19, 109);
            doc.text(input4, 19, 113);
            
            //6_set two addresses font
            doc.setFontSize(8);
            doc.text(input5, 75, 97);
            doc.text(input6, 75, 101); 
            doc.text(input7, 75, 105);
            doc.text(input8, 75, 109);
            doc.text(input9, 75, 113);

            
            //11_set InvoiceNo.
            doc.setFontSize(9);
            doc.text(input10, 151, 92);
            doc.text(input11, 151, 99); //+5
            doc.text(input12, 151, 107);

            
            //14_PO.
            doc.setFontSize(14);
            doc.text("N/A", 151, 117);

            //15_Product Description *6
            doc.setFontSize(8);
            doc.text(input14, 20, 132);
            doc.text(input15, 75, 132); 
            doc.text(input16, 99, 132, { align: 'center' });
            doc.text(input17, 126, 132, { align: 'center' });
            doc.text(input18, 163, 132);
            doc.text(input19, 185, 132, { align: 'right' });;

            

            //
            doc.save("a4.pdf");
        },
        async writePDF2_I(){
            //bill_in
            let input0 = document.getElementsByTagName("input")[0].value;
            let input1 = document.getElementsByTagName("input")[1].value;
            let input2 = document.getElementsByTagName("input")[2].value;
            let input3 = document.getElementsByTagName("input")[3].value;
            let input4 = document.getElementsByTagName("input")[4].value;
            //ship_to
            let input5 = document.getElementsByTagName("input")[5].value;
            let input6 = document.getElementsByTagName("input")[6].value;
            let input7 = document.getElementsByTagName("input")[7].value;
            let input8 = document.getElementsByTagName("input")[8].value;
            let input9 = document.getElementsByTagName("input")[9].value;
            //ship_to
            let input10 = document.getElementsByTagName("input")[10].value;
            let input11 = document.getElementsByTagName("input")[11].value;
            let input12 = document.getElementsByTagName("input")[12].value;
            //PO[*]
            let input13 = document.getElementsByTagName("input")[13].value;
            //ship_to
            let input14 = document.getElementsByTagName("input")[14].value;
            let input15 = document.getElementsByTagName("input")[15].value;
            let input16 = document.getElementsByTagName("input")[16].value;
            let input17 = document.getElementsByTagName("input")[17].value;
            let input18 = document.getElementsByTagName("input")[18].value;
            let input19 = document.getElementsByTagName("input")[19].value;
            const doc = new jsPDF();  
            doc.addImage(cms_empty_quotein, "JPEG",0,0,210,297);
            doc.save("quicker_invoice.pdf");

        },
        async test_write(){
            const doc = new jsPDF()

            // It can parse html:
            // <table id="my-table"><!-- ... --></table>
            var finalY = doc.lastAutoTable.finalY || 10;
            doc.addImage(cms_empty_quote, "JPEG",0,0,210,297);
            autoTable(doc, { html: '#my-table' });
            autoTable(doc, {
                theme: 'striped',
                startY: doc.autoTableEndPosY() + 105, //important
                columnStyles: {
                0: {cellWidth: 20},
                1: {cellWidth: 80},
                2: {cellWidth: 80},
                // etc
            },
            tableWidth: 'auto',
            margin: {top: 0, right: 2, bottom: 0, left: 2}, //important2
            head: [['DESCRIPTION', 'CODE', 'QTY', 'UNIT', 'DISCOUNT', 'TOTAL']],
            body: [
                ['David', 'david@example.com', 'Sweden'],
                ['Castille', 'castille@example.com', 'Spain'],
                ['Castille', 'castille@example.com', 'Spain'],
                ['Castille', 'castille@example.com', 'Spain'],
                ['Castille', 'castille@example.com', 'Spain'],
                ['Castille', 'castille@example.com', 'Spain'],
                ['Castille', 'castille@example.com', 'Spain'],
                ['Castille', 'castille@example.com', 'Spain'],
                ['Castille', 'castille@example.com', 'Spain'],
                ['Castille', 'castille@example.com', 'Spain'],
                // ...
            ],
            })
            doc.text('SUB TOTAL', 42, doc.lastAutoTable.finalY + 20)
            doc.text('100', 152, doc.lastAutoTable.finalY + 20)

            doc.text('VAT', 42, doc.lastAutoTable.finalY + 25)
            doc.text('50', 152, doc.lastAutoTable.finalY + 25)

            doc.text('SHIPPING. HANDLING', 42, doc.lastAutoTable.finalY + 30)
            doc.text('150', 152, doc.lastAutoTable.finalY + 30)
            doc.save('table.pdf')

        },
        test_write2(){
            const ref = collection(db, 'test_purpose');
            const documentID = ref.documentID;
            //const Id = data.thisId;
            const increment = fv.increment(1);
            
            const obj_ref ={
                test_1: "Q-CMS000",
                test_2: "print_this_only",
            }

            //const doc = collection.doc(docRef.id);

            

            addDoc(ref, obj_ref)
            .then(function(docRef) {
                const get_id = firebase.firestore().collection('test_purpose').doc(docRef.id);
                console.log("Document written with ID: ", docRef.id);

                get_id
                .update({
                    count: firebase.firestore.FieldValue.increment(0),

                    doc_id: docRef.id,
                })
                .then(() => {
                    console.log("set doc");

                    get_id.get().then((d) => {
                        console.log("updated data:", d.data());
                    });
                });
            })
            
        }
    }
}

</script>