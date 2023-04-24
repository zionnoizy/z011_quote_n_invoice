<template>

  <div class="ProductAll">

        <p class="top_background  "   >
            
            <div class="dashboard_txt pt-5 pb-3 mx-6 text-start">
                
                <router-link to="/dashboard/quote" exact>
            
                <a> <strong class="link underline">Dashboard</strong> </a></router-link>  > Product Add
                
                <font-awesome-icon icon="fa-solid fa-box-archive" style="color: #ffffff;" />
            
            </div>
        </p>


        <router-link :to="{name: 'CategoyAddAll'}">
          
          <button class="btn btn-primary btn-lg btn-block mx-auto">Go To Add Category
            <font-awesome-icon icon="fa-solid fa-elevator" style="color: #ffffff;" />
          </button>

        </router-link>

        <product-add></product-add>
        
        <all-products></all-products>  
  </div>

</template>


<script>
import ProductAdd from "@/components/ProductAdd.vue";
import { orderBy, query } from "@firebase/firestore";
import { serverTimestamp } from 'firebase/firestore';
import AllProducts from "@/components/AllProducts.vue";
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
      ProductAdd,
      AllProducts,
    },
    methods: {

      async getAllProducts() { 

        var all_product_ref = await firebase.firestore().collection("all_products");

        all_product_ref.orderBy("p_insert_date", "desc")

          .onSnapshot((snapshot) => {
            this.all_products = [];
            snapshot.forEach(d => {


                var product = d.data();

                this.all_products.push(product);
            })
          })
        //const q = query(all_product_ref, orderBy("p_insert_date", "desc").startAt(1));
        var lastThreeRes = await all_product_ref.orderBy('p_insert_date', 'desc').limit(3).get();
        /*
        all_product_ref.onSnapshot(snap => {
          
            this.all_products = [];
            
            snap.forEach(d => {
                var product = d.data();
                //console.log("[ProductAll] " + product);
                this.all_products.push(product);
            });
        });
        */
        
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
      this.getAllProducts();
    },
}
</script>