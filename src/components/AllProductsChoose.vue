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


            <tr class="choose_product" v-for="p, i in all_products" @click.prevent="chooseOneProduct($event,p, i);" @change="emitEventChanged">
                <td> {{ p.p_code }} </td>
                <td> {{ p.p_fullname }} </td>
                <td> {{ p.p_category }} </td>
                <td> {{ p.p_cost }} </td>
                <td> {{ p.p_margin }} </td>
                <td> {{ p.p_sell }} </td>
                <td> <div><button class="btn btn-info" @click.prevent="chooseOneProduct($event,p, i);" > [+] </button> </div> </td>
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
        choose_products: [],
        choose_product:{
          p_code: null,
          p_fullname: null,
          p_category: null,
          p_cost: null,
          p_margin: null,
          p_sell: null,

          },

        }
    },
    components: {

    },
    methods: {

      async getAllProductsNewest() { 
        var all_product_ref = await firebase.firestore().collection("all_products");
        all_product_ref.orderBy("p_insert_date", "desc")

          .onSnapshot((snapshot) => {
            this.all_products = [];
            snapshot.forEach(d => {


                var product = d.data();
                console.log("[ProductAll]-1 " + product);
                this.all_products.push(product);
            })
          })

        var lastThreeRes = await all_product_ref.orderBy('p_insert_date', 'desc').limit(3).get();

        
      },

      async getAllProductsOldest() { 
        var all_product_ref = await firebase.firestore().collection("all_products");
        all_product_ref.orderBy("p_insert_date", "asc")
          .onSnapshot((snapshot) => {
            this.all_products = [];
            snapshot.forEach(d => {
                var product = d.data();
                console.log("[ProductAll]-1 " + product);
                this.all_products.push(product);
            })
          })
      },

       chooseOneProduct(ev, p, i){
        console.log("[chooseOneProduct] --------------------" + ev + "  "  + i);
        console.log("[chooseOneProduct] you have chosen  " + p.p_fullname);


        var choose_product_ref =  firebase.firestore().collection("all_products").where("p_fullname", "==", p.p_fullname);
        choose_product_ref.onSnapshot((snapshot) => {

            snapshot.docs.forEach(d => {


                console.log("[chooseOneProduct], delete data! clicked->" + p.p_fullname)


                var product = d.data();
                console.log("[chooseOneProduct] called one element from d.data() " + d.data().p_fullname);
                this.choose_products.push(product);


                console.log("[chooseOneProduct] check choose_products: " + choose_products.length);
                this.$root.$emit('CustomEventInputChanged', this.choosen_products);
              
            })
          })
          console.log("[chooseOneProduct] --------------------");
      },

      emitEventChanged () {
            this.$root.$emit('CustomEventInputChanged', this.choosen_products);
      },

    },
    created() {

      this.getAllProductsNewest();

    },
}
</script>

<style>



</style>