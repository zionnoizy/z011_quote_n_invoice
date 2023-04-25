<template>

        <p class="top_background  "   >
            
            <div class="dashboard_txt pt-5 pb-3 mx-6 text-start">
                
                <router-link to="/dashboard/quote" exact>
            
                <a> <strong class="link underline">Dashboard</strong> </a></router-link>  > All Clients
                <font-awesome-icon icon="fa-solid fa-user" style="color: #ffffff;" />
            </div>
        </p>

        <div class="">
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <a href="#step1">Products + Products Category + Client Info + Client Delivery</a>
                </div>
                <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <a href="#step2">Create Quotation</a>
                </div>
                <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <a href="#step2">Create Invoice with PO Number</a>
                </div>
            </div>
        </div>

        <div class="mx-6">
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <p class="text-left my-3 mx-auto mb-1" id="step1"  style="font-size: 24px; max-width: 99%;">
                        1:Before it comes to creating a quotation for your products or services, it's important to have all the necessary information at hand. This includes information about your products, product categories, clients, and delivery options. By having this information readily available, you can easily generate a quotation and invoice.
                    </p>
                    <p class="text-left my-3 mx-auto mb-1"   style="font-size: 24px; max-width: 99%;">
                        To start, you will need to add all of your up-to-date products to your system. This includes information such as the product name, description, price, and any other relevant details. It's also helpful to organize your products into categories, as this can make it easier to find and select the right products when creating a quotation.
                    </p>
                    <p class="text-left my-3 mx-auto mb-1"  style="font-size: 24px; max-width: 99%;"> 
                        Next, you will need to add your clients to your system. This includes their name, contact information, and any other details that may be relevant.
                    </p>
                </div>
                <div>
                    <img alt="" class=" " src="../assets/design_it/2AdminPanel.svg" style="" />
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <img alt="" class=" " src="../assets/design_it/1.svg" style="" />
                </div>
                <div>
                    <p class="text-left my-3 mx-auto mb-1" id="step2" style="font-size: 24px; max-width: 99%;">
                        2:Once you have all of this information in your system, you can start creating quotations. This involves selecting the appropriate products and quantities, applying any discounts or special pricing, and adding the client's delivery details. With all of this information in place, you can then generate a quotation that includes all of the necessary information, such as the products, pricing, and delivery information.
                    </p>
                    <p class="text-left my-3 mx-auto mb-1"  style="font-size: 24px; max-width: 99%;">
                        3:Storing your quotations in HTML format can be helpful for easy access and organization. You can create a template that includes all of the necessary information, and simply fill in the specific details for each quotation as needed. This can save you time and ensure that all of your quotations are consistent and professional-looking.
                    </p>
                </div>
            </div>
            
            
            

        </div>

</template>

<script>
export default{
    name: 'NoName',
    setup() {
    },
    data(){
        return{
            email: '',
        }
    },
    method(){

    },
}
</script>
<style>
</style>