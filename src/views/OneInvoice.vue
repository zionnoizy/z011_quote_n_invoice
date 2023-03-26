<template>
    <div class="OneInvoice">

        <!-- <div class="border">
        <p> debug here only - view specific INVOICE.</p>
        <p> The quote id is= {{ $route.params.id }}</p>
        <p> One Q Hash is= {{ $route.query.this_one_i_hash_number }}  </p>

        <p> One PDF Link is= {{ $route.query.this_one_i_pdf_link }}</p>

        </div> -->

        <div class="d-flex justify-content-center">

            
            <embed id="preview_invoicenPDF" width="800px" height="600px"   src='' />

        </div>

    </div>
</template>
<script>
export default{
    name: 'OneInvoice',
    data(){
        return{
            id: this.$route.params.id,
            this_one_i_hash_number: this.$route.query.this_one_i_hash_number,
            this_one_i_pdf_link: this.$route.query.this_one_i_pdf_link,
        }
    },
    components:{},

    methods:{
        
        async showInvoicePDF(){

            await console.log("[debug99]" +  " " + this.this_one_i_pdf_link);

            document.getElementById('preview_invoicenPDF').src = this.this_one_i_pdf_link;
        },
    },
    created() {

        this.showInvoicePDF();
        
    },
}
</script>