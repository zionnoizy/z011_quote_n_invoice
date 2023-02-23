<template>
    <div class="ProductAll">

        <p class="dashboard_txt pt-5" ><router-link to="/dashboard" exact><a><strong class="link">Dashboard</strong></a></router-link>  > 
            
          <router-link to="/dashboard/all_product" exact><a><strong class="link">Product Add</strong></a></router-link>
        
        </p>

        <product-add></product-add>

        <th>PRODUCT IN DATABASE:</th>
        <button>Sort From Oldest (comming soon)</button>
        <button>Sort From Newest (comming soon)</button>

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
                </div>
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
      ProductAdd,
    },
    methods: {

      async getAllProducts() { 

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
        //const q = query(all_product_ref, orderBy("p_insert_date", "desc").startAt(1));
        var lastThreeRes = await all_product_ref.orderBy('p_insert_date', 'desc').limit(3).get();
        /*
        all_product_ref.onSnapshot(snap => {
          
            this.all_products = [];
            
            snap.forEach(d => {
                var product = d.data();
                console.log("[ProductAll] " + product);
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
            console.log(error);
          })
        }
      }

    },
    created() {
      this.getAllProducts();
    },
}
</script>