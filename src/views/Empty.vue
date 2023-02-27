<template>
    <div class="empty">

        <p>[unknown99]</p>
        <p>Empty Redirection Page.</p>

        <!--QuoteAdd line315-->
        <!--typeing product and will show rest-->
        <div class="grid grid-cols-1">
                <div>
                    <input list="s_product" ref="p_enter"  v-model="s_product_name" placeholder="Item Name" id="p_enter" @input="suggesting()" @blur="EnterProduct();" @change="CumulativeTotal();" required/>
                    <datalist id="s_product">
                        <!-- <option v-for="(s, i) in s_product">{{s.p_fullname}}</option> -->
                        <option v-for="(s, i) in s_product2" >{{s.p_fullname}}</option>
                    </datalist>
                    <input ref="p_code" placeholder="Product Code" @input="EnterProduct" id="p_code"  disabled/>
                    <input ref="p_category" placeholder="Product Category" id="p_category" @input="EnterProduct" disabled/>
                    <input ref="p_cost" placeholder="Product Cost (digit only)" id="p_cost" @input="EnterProduct"  disabled />
                    <input ref="p_margin" placeholder="Product Margin (digit only)" id="p_margin" @input="EnterProduct" disabled />
                    <input ref="p_sell" placeholder="Product Sell" id="p_sell1" @input="EnterProduct();" @change="CumulativeTotal();" disabled/>   
                </div>

                <div>
                    <input list="s_product" ref="p_enter"  v-model="s_product_name" placeholder="Item Name" id="p_enter" @input="suggesting()" @blur="EnterProduct();" @change="CumulativeTotal();" required/>
                    <datalist id="s_product">
                        <!-- <option v-for="(s, i) in s_product">{{s.p_fullname}}</option> -->
                        <option v-for="(s, i) in s_product2" >{{s.p_fullname}}</option>
                    </datalist>
                    <input ref="p_code" placeholder="Product Code" @input="EnterProduct" id="p_code"  disabled/>
                    <input ref="p_category" placeholder="Product Category" id="p_category" @input="EnterProduct" disabled/>
                    <input ref="p_cost" placeholder="Product Cost (digit only)" id="p_cost" @input="EnterProduct"  disabled />
                    <input ref="p_margin" placeholder="Product Margin (digit only)" id="p_margin" @input="EnterProduct" disabled />
                    <input ref="p_sell" placeholder="Product Sell" id="p_sell1" @input="EnterProduct();" @change="CumulativeTotal();" disabled/>   
                </div>

            </div>

    </div>
</template>


<script>
export default{
    name: 'empty',
}
</script>