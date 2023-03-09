<template>

    <div class="mx-auto">

        <embed id="preview_invoicenPDF" width="800px" height="600px"   src='' />

    </div>
    
</template>
<script>
export default{
    name: 'OneInvoice',
    data(){
        return{

            this_one_i_hash_number: this.$route.query.this_one_i_hash_number,
            this_one_i_pdf_link: this.$route.query.this_one_i_pdf_link,
        }
    },
    components:{},
    methods:{
        
        showQuotePDF(){
            const z = document.getElementById('preview_quotenPDF');

            console.log("[debug99]" + z + " " + this.this_one_i_pdf_link);

            z.setAttribute('src', this.this_one_i_pdf_link);

            z.parentNode.replaceChild(clone1, z);
        },
    },
}
</script>