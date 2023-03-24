<template>
  

</template>

<script>
import ProductAdd from "@/components/ProductAdd.vue";
import { orderBy, query } from "@firebase/firestore";
import { serverTimestamp } from 'firebase/firestore';



export default{
  name: 'all-products-choose',
  props:{
    choosen_products:{
      type: Object,
      required: true

    },
    tmp_sell:{
      type: Number,
      required: true

    },
  },
  setup() {},
  data(){
      return{
      all_products: [],
      product:{
          p_code: null,
          p_fullname: null,
          p_category: null,
          p_cost: null,
          p_margin: null,
          p_sell: null,

      },
      ///////////////////////
      choosen_products: [],
      choose_product:{
        p_code: null,
        p_fullname: null,
        p_category: null,
        p_cost: null,
        p_margin: null,
        p_sell: null,

      },
      tmp_sell: 0,

      }
  },
  components: {},
  methods: {

    async getAllProductsNewest() { 
      var all_product_ref = await firebase.firestore().collection("all_products");
      all_product_ref.orderBy("p_insert_date", "desc")
        .onSnapshot((snapshot) => {
          if (snapshot.empty) {
            //console.log("[getAllProductsNewest] all_products not exist.")
            
          }
          else{
            this.all_products = [];
            snapshot.forEach(d => {


                var product = d.data();
                //console.log("[ProductAll]-2 " + product);
                this.all_products.push(product);
            })
          }  
        })
      var lastThreeRes = await all_product_ref.orderBy('p_insert_date', 'desc').limit(3).get();
    },

    async getAllProductsOldest() { 
      var all_product_ref = await firebase.firestore().collection("all_products");
      all_product_ref.orderBy("p_insert_date", "asc")
        .onSnapshot((snapshot) => {
          if (snapshot.empty) {
            //console.log("[getAllProductsNewest] all_products not exist.")
            
          }
          else{
            this.all_products = [];
            snapshot.forEach(d => {
                var product = d.data();
                //console.log("[ProductAll]-3 " + product);
                this.all_products.push(product);
            })
          }  
        })
    },

    async choosenOneProduct(ev, p, i){
      var size = Object.size(this.choosen_products);
      console.log("size   " + size);
      if (size > 2){
        alert("maximum item in v1.0 at this moment.");
      }
      else{
      var choose_product_ref = await firebase.firestore().collection("all_products").where("p_fullname", "==", p.p_fullname);
       choose_product_ref.onSnapshot((snapshot) => {

          snapshot.docs.forEach(d => {
              var product = d.data();
              this.choosen_products.push(product);
              var tmp_one_sell = parseFloat(d.data().p_sell);  
              this.tmp_sell = this.tmp_sell + tmp_one_sell;

              console.log("!!!!!!!!!!!!!!!!!!!!!!!updateing this.tmp_sell     " + this.tmp_sell);

          })
        })
      }
    },
    async choosenProductSell(ev, p, i){
      var choose_product_ref =  firebase.firestore().collection("all_products").where("p_fullname", "==", p.p_fullname);
      await choose_product_ref.onSnapshot((snapshot) => {

          snapshot.docs.forEach(d => {

              

              this.tmp_sell = this.tmp_sell + tmp_one_sell;

              this.$emit("tmp_sell", this.tmp_sell);

             
            
          })
        })

    },
    emitEventChanged () {
          this.$root.$emit('choosenOneProduct', this.choosen_products);

          this.$emit("tmp_sell", this.tmp_sell);
    },
    emptyChoosenProduct(){
      
      //console.log("[emptyChoosenProduct] empty--------------------");
    },
    TmpSell: function(str){
            console.log(str);
          }

  },
  created() {

    this.getAllProductsNewest();
    this.emptyChoosenProduct();
  },
  mounted () {
    this.$emit('choosen_products', this.choosen_products);

    this.$emit('tmp_sell', this.tmp_sell);

    //console.log("[AllProductsChoose] + mounted");
  },
}
</script>

<style>



</style>