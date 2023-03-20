<template>
    <div class="OneInvoice">

        <div class="border">
        <p> debug here only - view specific INVOICE.</p>
        <p> The quote id is= {{ $route.params.id }}</p>
        <p> One Q Hash is= {{ $route.query.this_one_i_hash_number }} <!--cannot pass each quote to here--> </p>

        <p> One PDF Link is= {{ $route.query.this_one_i_pdf_link }}</p>

        </div>

        <div class="mx-auto">

            
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
        
        showInvoicePDF(){
            const z = document.getElementById('preview_invoicenPDF');

            console.log("[debug99]" + z + " " + this.this_one_i_pdf_link);

            z.setAttribute('src', this.this_one_i_pdf_link);

            z.parentNode.replaceChild(clone1, z);
        },
    },
    created() {

        this.showInvoicePDF();
        
    },
}
</script>