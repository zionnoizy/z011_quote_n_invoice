<template>
    <div class="ProductAll">


        <product-add></product-add>
    </div>
</template>


<script>
import ProductAdd from "@/components/ProductAdd.vue";
export default{
    name: 'ProductAll',
    components: {
      ProductAdd,
    },
}
</script>