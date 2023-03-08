<template>

        <button class="choose_address_btn border btn btn-secondary btn-square-lg" type="button"
                        data-bs-toggle="modal" data-bs-target="#add_category" v-on:click="this.getAllCateogry();">
                        Add Category IN Here
        </button>

        <!--NEW-----Category-modal---------------------------------------------------------------------->
        <div class="modal fade" id="add_category" tabindex="-1" aria-labelledby="" aria-hidden="true">
            <div class="modal-dialog modal-xl">

                <div class="modal-content text-black">

                    <div class="modal-header">
                        <h4 class="modal-title"> Add Category Here</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="close">X</button>
                    </div>
                    <!---->
                    <div class="modal-body">
                        <input ref="c_category" placeholder="Enter Category" id="c_category" required/> 
                        
                    </div>


                    <div class="modal-footer">
                        <button class="btn btn-primary" data-bs-dismiss="modal" aria-label="close">Add Category</button>
                    </div>
                </div>
            </div>
        </div>
</template>


<script>
export default{
    name: 'CategoryAdd',
    setup() {},
    data(){
        return{
            all_categorys: [],
            category:{
                c_category: null,
            }
        }
    },
    components: {},
    methods: {

        async getAllCategory(){
            
            var all_client_ref = await firebase.firestore().collection("all_categorys");
            all_client_ref.onSnapshot(snap => {
            this.all_categorys = [];
            
            snap.forEach(d => {
                var category = d.data();
                this.all_categorys.push(category);
            });
        });
        }

    }
}
</script>