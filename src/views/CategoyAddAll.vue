<template>
    <div class="CategoyAddAll">

        <p class="dashboard_txt" ><router-link to="/dashboard" exact><a><strong class="link">Dashboard</strong></a></router-link>  >
            
            <router-link to="/dashboard/all_product" exact><a><strong class="link">All Products</strong></a></router-link> >
            
            Category</p>

        <from @sumbit.prevent="addCategory">

            <div class="grid gird-cols-2 gap-2">
                <div><label>Category Name</label></div>
                <br>
                <div>
                    <label ref="category">Category</label>
                    <input id="input_category" ref="input_category" type="text" placeholder="category input" required/>
                </div>
                <br>
            </div>

        </from>
        
        <br>
        <br>
            <button @click="createCategory(); " class="btn btn-info" >Add Category Infomation</button>
        <br>
        <br>

        <div class="px-5 mx-5 grid grid-cols-2 gap-1" v-for="ca in all_categories">

            <div class=""  >
                {{ ca.category_fullname }}
            </div> 


        </div>
    </div>
</template>

<script>
import { db, auth, fv } from "@/firebase.js";
import { create } from "domain";
import { collection, addDoc, FieldValue, DocumentReference } from "firebase/firestore";
import { serverTimestamp } from 'firebase/firestore';

export default{
    name: 'CategoyAddAll',
    setup() {},
    data(){
        return{
            all_categories: [],
            category:{
                category_fullname: null,
                category_time: null,
            }
        }
    },
    components: {},
    methods:{
        async createCategory(){
            var flag = await validate_category_input();
           //console.log("[CategoryAddAll] create new Category.");

            if (flag){
                const ref = collection(db, 'all_categories');
                var t = document.getElementById('input_category').value;
                //https://fireship.io/snippets/firestore-increment-tips/
                console.log("[CategoryAddAll] update incremented.           " + t);
                const obj_ref ={
                    category_fullname : t,
                    category_time: serverTimestamp(),
                }
                addDoc(ref, obj_ref)
                .then(docRef => {
            
                console.log(docRef.id);
                const get_id = firebase.firestore().collection("all_categories").doc(docRef.id);
                get_id
                    .update({
                        category_hashid: docRef.id,
                    })
                    .then(() => {
                        document.getElementById("input_category").value = "";
                    });
                })
            } //flag

        },
        async getCategory(){

            var categoryRef = await firebase.firestore().collection("all_categories");
            categoryRef.onSnapshot(snap =>{
                this.all_categories = [];
                snap.forEach(d =>{
                    var category = d.data();
                    this.all_categories.push(category);
                });
            }); 
        },
        created(){
            this.getCategory();
        },
    }
}

async function validate_category_input(){
    var flag = true;
      var pc_1 = document.getElementById('input_category').value;
      var pcc_1 = document.getElementById('input_category');
      
      if (pc_1.length <= 0){
        pcc_1.classList.add("red");
        flag = false;
      }
      /*
      const check = firebase.firestore().collection("all_categories").where("category_fullname", "==", pc_1); //b
      await check.querySnapshot((q) => {
        if (q.size >= 0){
            alert("duplication! cannot submit!")
            flag = false;
        }
      })
      */
      return flag;

}
</script>