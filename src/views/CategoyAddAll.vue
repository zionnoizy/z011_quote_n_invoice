<template>
    <div class="CategoyAddAll">

        <from @sumbit.prevent="addCategory">
            <div class="grid gird-cols-2 gap-2">
                <div><label>Category Name</label></div>
                <div><input ref="category_name" type="text" required/></div>
            </div>
        
        </from>

        <button @click="createCategory" class="btn btn-info" id="category_enter">Add Category Infomation </button>
    
        <br>
        <br>

        <div class="px-5 mx-5 grid grid-cols-2 gap-1" v-for="ca in all_categorys">
            <div class=""  >
                {{ ca.category_fullname }}
            </div> 

            <div class=""  >
                
            </div> 
        </div>
    </div>
</template>

<script>
import { db, auth } from "@/firebase.js";
import { create } from "domain";
import { collection, addDoc, DocumentReference } from "firebase/firestore";

export default{
    name: 'CategoyAddAll',
    setup() {},
    data(){
        return{
            all_clients: [],
            client:{
                category_fullname: null,
                category_counter: null,
            }
        }
    },
    components: {},
    methods:{
        async createCategory(){
           console.log("[CategoryAddAll] create new Category.");

           const db_id = firebase.firestore();
           const get_id = db_id.collection('all_categorys').doc();
           const category_id = get_id.id; 
           console.log("[CategoryAddAll] id.");
           const increment = firebase.firestore.FieldValue.increment(1);

           console.log("[CategoryAddAll] id2.");
           const ref = collection(db, 'all_categorys');
           const ref2 = db_id.collection('all_categorys');


           //https://fireship.io/snippets/firestore-increment-tips/
           const batch = db_id.batch();
           batch.set(get_id, {category_count: increment}, { merge: true });
           batch.commit();

           console.log("[CategoryAddAll] update incremented.");
           const obj_ref ={

                category_fullname : this.$refs.category_enter.value,
                catrgory_id: increment,
           }
           const doc_ref = await addDoc(ref, obj_ref);
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
</script>