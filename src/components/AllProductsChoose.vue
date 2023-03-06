<template>
  <div class="all-products-choose">

    <th>PRODUCT IN DATABASE:</th>

    <button class="btn btn-primary " @click.prevent="getAllProductsNewest()">Sort From Oldest </button>
    <button class="btn btn-primary " @click.prevent="getAllProductsOldest()">Sort From Newest </button>

    <table class="table table-dark" >
        <thead>
        
          <tr>
          <th scope="col"> - </th>
          <th scope="col">Code</th>
          <th scope="col">Name</th>

          <th scope="col">&#163; Cost</th>
          <th scope="col">Margin &percnt;</th>
          <th scope="col">Sell</th>
          <th scopr="col">choose</th>
        </tr>

        </thead>

        <tbody>
        <tr>



        </tr>

        
        <tr class="choose_product" v-for="p, i in all_products" @click.prevent="choosenOneProduct($event,p, i); choosenProductSell($event,p, i);" @change="emitEventChanged">
            <td> {{ p.p_code }} </td>
            <td> {{ p.p_fullname }} </td>
            <td> {{ p.p_category }} </td>
            <td> {{ p.p_cost }} </td>
            <td> {{ p.p_margin }} </td>
            <td> {{ p.p_sell }} </td>
            <td> <div><button class="btn btn-info" @click.prevent="choosenOneProduct($event,p, i); choosenProductSell($event,p, i);" @change="emitEventChanged"> [+] </button> </div> </td>
        </tr>
        
        </tbody>

          
      </table>  

  </div>

</template>

<script>
import ProductAdd from "@/components/ProductAdd.vue";
import { orderBy, query } from "@firebase/firestore";
import { serverTimestamp } from 'firebase/firestore';



export default{
  name: 'all-products-choose',
  props:['choosen_products', 'tmp_sell'],
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

     choosenOneProduct(ev, p, i){
      var choose_product_ref =  firebase.firestore().collection("all_products").where("p_fullname", "==", p.p_fullname);
      choose_product_ref.onSnapshot((snapshot) => {

          snapshot.docs.forEach(d => {
              var product = d.data();
              this.choosen_products.push(product);
              this.$root.$emit('choosenOneProduct', this.choosen_products);
          })
        })
    },
    choosenProductSell(ev, p, i){
      var choose_product_ref =  firebase.firestore().collection("all_products").where("p_fullname", "==", p.p_fullname);
      choose_product_ref.onSnapshot((snapshot) => {

          snapshot.docs.forEach(d => {

              var tmp_one_sell = parseFloat(d.data().p_sell);   
              this.tmp_sell = this.tmp_sell + tmp_one_sell;
              this.$root.$emit("choosenProductSell", this.tmp_sell);
            
          })
        })

    },
    emitEventChanged () {
          this.$root.$emit('choosenOneProduct', this.choosen_products);
          this.$root.$emit('choosenProductSell', this.tmp_sell);
    },
    emptyChoosenProduct(){
      
      //console.log("[emptyChoosenProduct] empty--------------------");
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