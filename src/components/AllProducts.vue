<template>

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
            </tr>
            </thead>
            <tbody>
            <tr>



            </tr>


            <tr  v-for="p in all_products">
                <td> {{ p.p_code }} </td>
                <td> {{ p.p_fullname }} </td>
                <td> {{ p.p_category }} </td>
                <td> {{ p.p_cost }} </td>
                <td> {{ p.p_margin }} </td>
                <td> {{ p.p_sell }} </td>
            </tr>
            </tbody>

        </table>  



</template>

<script>
import ProductAdd from "@/components/ProductAdd.vue";
import { orderBy, query } from "@firebase/firestore";
import { serverTimestamp } from 'firebase/firestore';

export default{
    name: 'ProductAll',
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

        }

        }
    },
    components: {

    },
    methods: {

      async getAllProductsNewest() { 
        var all_product_ref = await firebase.firestore().collection("all_products");
        all_product_ref.orderBy("p_insert_date", "asc")

          .onSnapshot((snapshot) => {
            this.all_products = [];
            snapshot.forEach(d => {


                var product = d.data();

                this.all_products.push(product);
            })
          })

        var lastThreeRes = await all_product_ref.orderBy('p_insert_date', 'asc').limit(3).get();

        
      },

      async getAllProductsOldest() { 
        var all_product_ref = await firebase.firestore().collection("all_products");
        all_product_ref.orderBy("p_insert_date", "desc")
          .onSnapshot((snapshot) => {
            this.all_products = [];
            snapshot.forEach(d => {
                var product = d.data();

                this.all_products.push(product);
            })
          })
      },

      UpdateClient:function(msg){
        setDoc(doc(db, 'all_products', msg.id),{
          text: msg.text,
          data: msg.data
        })
      },
      deleteClient(id){
        if (window.confirm("do you really want to delete? The system cannot undo.")){
          db.child(id).remove().then(() =>{
            alert("successully deleted.");
          }).catch((error) => {
            //console.log(error);
          })
        }
      }

    },
    created() {
      this.getAllProductsNewest();
    },
}
</script>