<template>
    <div class="CategoyAddAll">


        <p class="top_background  "   >
            
            <div class="dashboard_txt">
                
                <router-link to="/dashboard/quote" exact>
            
                <a> <strong class="link underline">Dashboard</strong> </a></router-link> >
                <router-link to="/dashboard/all_product" exact><a><strong class="link">All Products
                <font-awesome-icon icon="fa-solid fa-box-archive" style="color: #ffffff;" />

                </strong></a></router-link> >
                
                Category
                <font-awesome-icon icon="fa-solid fa-elevator" style="color: #ffffff;" />
            </div>
        </p>


        <p class="dashboard_txt" ><router-link to="/dashboard" exact><a><strong class="link">Dashboard</strong></a></router-link>  >
            
            <router-link to="/dashboard/all_product" exact><a><strong class="link">All Products
                <font-awesome-icon icon="fa-solid fa-box-archive" style="color: #ffffff;" />
            </strong></a></router-link> >
            
            Category
            <font-awesome-icon icon="fa-solid fa-elevator" style="color: #ffffff;" />
        </p>

        <from @sumbit.prevent="addCategory">

            <div class="grid gird-cols-2 gap-2">
                
                <br>
                <div>
                    <label ref="category">Category Name </label>
                    <input id="input_category" ref="input_category" type="text" placeholder="enter category here..." required/>
                </div>
                <br>
            </div>

        </from>
        
        <br>
        <br>
            <button @click="createCategory(); " class="btn btn-info" >Add Category Infomation</button>
        <br>
        <br>

        <p>LIST OF CATEGORY</p>
        <div id="category-container" class="px-5 mx-5 grid grid-cols-2 gap-1 border">
            <div  v-for="ca, i in all_categories">

                <p >  #{{ i }}: {{ ca.category_fullname }} </p> 
            </div>
        </div>

        <img alt="" class="position-absolute bottom-0 start-0" src="../assets/design_it/cms-bg.png" style="z-index:-999; ;;" />

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
            console.log("getCategory()======== ");
            var categoryRef = await firebase.firestore().collection("all_categories");
            categoryRef.onSnapshot(snap =>{
                this.all_categories = [];
                snap.forEach(d =>{
                    var category = d.data();

                    console.log("category.category_fullname " + category.category_fullname);

                    this.all_categories.push(category);
                });
            }); 
        },
        scrollable(){
            const categoryContainer = document.getElementById("category-container");
            categoryContainer.scrollTop = categoryContainer.scrollHeight; /* Scroll to the bottom of the container */
        },
        
    },
    created(){
            this.getCategory();
            this.scrollable();
    },
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

<style>
#category-container {
    overflow: auto; /* Make the container scrollable */
    height: 200px; /* Set the maximum height of the container */
}
</style>