<template>
    <div class="CategoyAddAll">

        <p class="dashboard_txt" ><router-link to="/dashboard" exact><a><strong class="link">Dashboard</strong></a></router-link>  > 
            
            <router-link to="/dashboard/all_product" exact><a><strong class="link">All Products</strong></a></router-link> > 
            
            Category</p>

        <from @sumbit.prevent="addCategory">
            <div class="grid gird-cols-2 gap-2">
                <div><label>Category Name</label></div>
                <div><input id="category_id" ref="category_enter" type="text" placeholder="category input" required/></div>
            </div>
        </from>
        

        <button @click="createCategory(); " class="btn btn-info" >Add Category Infomation</button>
    
        <br>
        <br>

        <div class="px-5 mx-5 grid grid-cols-2 gap-1" v-for="ca in all_categorys">
            <div class=""  >
                {{ ca.cat_fullname }}
            </div> 

            <div class="">
                
            </div> 
        </div>
    </div>
</template>

<script>
import { db, auth, fv } from "@/firebase.js";
import { create } from "domain";
import { collection, addDoc, FieldValue, DocumentReference } from "firebase/firestore";
export default{
    name: 'CategoyAddAll',
    setup() {},
    data(){
        return{
            all_categorys: [],
            category:{
                cat_fullname: null,
                cat_counter: null,
            }
        }
    },
    components: {},
    methods:{
        //
        async createCategory(){
            validate_category_input();
           console.log("[CategoryAddAll] create new Category.");

           const db_id = firebase.firestore();
           const get_id = db_id.collection('all_categorys').doc();
           const category_id = get_id.id; 

           console.log("[CategoryAddAll] id.");

           const increment = firebase.firestore.FieldValue.increment(1);

           console.log("[CategoryAddAll] id2.");
           const ref = collection(db, 'all_categorys');
           const ref2 = db_id.collection('all_categorys');
           //get_id.update({ reads: increment });
           

           //https://fireship.io/snippets/firestore-increment-tips/
           console.log("[CategoryAddAll] update incremented. " + this.$refs.category_enter.value);
           const obj_ref ={

                category_fullname : this.$refs.category_enter.value,
                category_increment : increment,


           }
            const doc_ref = await addDoc(ref, obj_ref);
            const batch = db_id.batch();
            batch.set(get_id, {category_increment: increment}, { merge: true });
            batch.commit();
        //get_id.update({ category_increment: increment });
        },
        async getCategory(){

            var categoryRef = await firebase.firestore().collection("all_categorys");
            categoryRef.onSnapshot(snap =>{
                this.all_category = [];
                snap.forEach(d =>{
                    var category = d.data();
                    this.all_clients.push(category);
                });
            }); 
        },
        created(){
            this.getCategory();
        },
    }
}

function validate_category_input(){
      var pc_1 = document.getElementById('category_id').value;
      var pcc_1 = document.getElementById('category_id');

      console.log("[CategoryAddAll]  " + pcc_1 + " ");

      if (pc_1.length <= 0){
        pcc_1.classList.add("red");
      }

}
</script>