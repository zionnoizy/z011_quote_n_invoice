<template>




    <div class="ClientAll">
        <!--https://pbs.twimg.com/media/DrM0nIdU0AEhG5b.jpg-->
        <p>test21</p>

        <p class="dashboard_txt" >
          <router-link to="/dashboard" exact><a><strong class="link">Dashboard</strong></a></router-link>  > All Clients</p>

        <client-add ></client-add>

        <p>...................................................</p>

        <div class="px-5 mx-5 grid grid-cols-2 gap-1 ">
          <div>
          <label>Search Client Name</label>
          <input type="text" v-model="mysearch" placeholder="search here.." />
          </div>
        
        </div>

        <div class="lg:px-5 lg:mx-5 grid grid-cols-5 gap-3 ">

          <div class="client_card"  v-for="c, i in f_all_clients" :key="c.client_hashid"     > 
            
            <div class="row" data-bs-toggle="modal" data-bs-target="#add_delievery_address" @click.prevent="this.passVariable($event, c, i)">

              <div>
                <strong>{{ c.c_fullname }}</strong>
              </div>
              
              <div>
                <strong>{{ c.c_address_1 }}</strong>
              </div>
              
              <div>
                <strong>{{ c.c_address_2 }}</strong>
              </div>

              <div>
                <p>{{ c.c_city }}, {{ c.c_post_code }} </p>
              </div>

              <!-- <div> {{ c.client_hashid }} </div> -->

            </div>

          

          <div class="modal fade" id="add_delievery_address" tabindex="-1" aria-labelledby="" aria-hidden="true" >
            
            <div class="modal-dialog modal-xl">
                <div class="modal-content text-black">

                    
                  <div class="modal-header">
                    
                  </div>

                  <div class="modal-body">


                      <p id="this_is_edit_fullname" class="this_is_edit_fullname"> You Are Adding Client Delivery Address: <b>{{ delivery_fullname }}</b>  </p>
                        <div class="grid grid-cols-2 gap-2" >
                          
                          <div><label>Delievery Company Name*</label></div>
                          <div><input ref="delivery_cpyname" type="text" placeholder="Client Company Name" id="delivery_cpyname" required/></div>

                        </div>

                      <h2>Delivery Full Address</h2>

                      <div class="grid grid-cols-2 gap-3">
                        <div><label>Address Line1 * </label> </div>
                        <div> <input ref="d_address_1" placeholder="Address Line1" id="d_address_1"  required/></div>

                        <div><label>Address Line2 (Optional)</label>  </div>
                        <div> <input ref="d_address_2" placeholder="Address Line2" id="d_address_2" /></div>

                        <div><label>City *</label> </div>
                        <div><input ref="d_city" placeholder="City" id="d_city" required/></div>

                        <div><label>Post Code *</label> </div>
                        <div> <input ref="post_code" placeholder="Post Code" id="d_post_code" required/></div>
                      </div>

                  </div>

                    <div class="modal-footer" style="background-color: #1267aa;">

                      <button @click.prevent="createDelieveryAddress" class="btn btn-info" >Add Delivery Information </button>

                    </div>
                    
                </div>
            </div>

          </div>
        </div>



    </div>

        
    </div>
</template>


<script>
import { setDoc, addDoc } from '@firebase/firestore';
import ClientAdd from "@/components/ClientAdd.vue";
import DeliveryAdd from "@/components/DeliveryAdd.vue";
import { db, db2, auth } from "@/firebase.js";
import { onMounted, reactive } from "vue";
import { ref } from 'vue';
import { serverTimestamp } from 'firebase/firestore';
import { collection, doc } from "@firebase/firestore";
export default{

    name: 'ClientAll',
    setup() {
        const s_product2 = reactive([]);
        onMounted(async () => {
            try {
                const typing_product = await firebase
                    .firestore()
                    .collection("all_client")
                    .get();
                typing_product.forEach((doc) => {
                    s_product2.push(doc.data());
                });
            } catch (e) {
                console.log("Error Typing s_product2");
            }
        });
        return { s_product2 };
    },
    data(){
      
        return{
          all_clients: [],
          client:{
            c_fullname: null,
            c_address_1: null,
            c_address_2: null,
            c_city: null,
            c_insert_date: null,
            c_post_code: null,
            c_cid: null,
            client_hashid: null,
          },
          delivery_client_hashid: '',
          delivery_fullname: '',

          delivery_cpyname: '',
          d_address_1: '',
          mysearch: '',
        }
    },
    components: {
      ClientAdd,
      DeliveryAdd,
    },
    methods: {
      passVariable(ev, c, i){
        this.delivery_client_hashid = c.client_hashid;
        console.log("you are adding delivery address in  " + c.c_fullname);
        this.delivery_fullname = c.c_fullname;

      },
      client_hashid(client_hashid) {
          this.client_hashid = client_hashid
      },

      async getAllClient() { 
        var all_client_ref = await firebase.firestore().collection("all_clients");

        all_client_ref.onSnapshot(snap => {
            this.all_clients = [];
            
            snap.forEach(d => {
                var client = d.data();
                this.all_clients.push(client);
            });
        });
        
        
      },

      UpdateClient:function(msg){
        setDoc(doc(db, 'all_clients', msg.id),{
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
      },

      createDelieveryAddress(){

        const d_fullname = document.getElementById("delivery_cpyname").value; //okay
        const d_address_1 = document.getElementById("d_address_1").value;
        const d_address_2 =  document.getElementById("d_address_2").value;
        const d_city =  document.getElementById("d_city").value;
        const d_post_code =  document.getElementById("d_post_code").value;

        console.log(d_fullname + " " + d_address_1 + " " + d_address_2 + " " + d_city + " " + d_post_code);
        
        //if (d_fullname == '' || d_address_1 == '' || d_address_2 == '' || d_city == '' || d_post_code == ''){
        const ref = collection(db, 'all_delivery', this.delivery_client_hashid,'this_client_delivery');
        const get_id2 = firebase.firestore().collection('all_delivery').doc();

        const obj_ref ={

          d_fullname: d_fullname,
          d_address_1: d_address_1,
          d_address_2: d_address_2,
          d_city: d_city,
          d_post_code: d_post_code,

          d_client_hash_id: this.delivery_client_hashid,
          d_insert_date: serverTimestamp(),

        }
        //, "this_client_delivery" , c_id2
        //const docref = doc (collection(db, 'all_delivery'));
        //const colref = collection (docref, 'this_client_delivery');

        console.log("deliver address adding..." + this.delivery_client_hashid);


        addDoc(ref , obj_ref )
        .then(docRef => {
          
          console.log(docRef.id);
          const get_id = firebase.firestore().collection("all_delivery").doc(this.delivery_client_hashid).collection("this_client_delivery").doc(docRef.id);
          get_id
              .update({
                  delivery_hashid: docRef.id,
              })
              .then(() => {
                alert("Added, delivery address for client: " + this.delivery_fullname );
                document.getElementById("delivery_cpyname").value = ''
                document.getElementById("d_address_1").value= ''
                document.getElementById("d_address_2").value = ''
                document.getElementById("d_city").value = ''
                document.getElementById("d_post_code").value = ''
                
              });
        })
        console.log("deliver address adding2...");

      },

      async findSpecific() { 
            var all_product_ref = await firebase.firestore().collection("all_products");
            all_product_ref.onSnapshot((snapshot) => {
                this.s_product = [];
                snapshot.forEach(d => {
                    var s_product_name =d.data();
                    this.s_product.push(s_product_name);
                })
            })
            
        },
    },
    computed: {
      f_all_clients(){

        return this.all_clients.filter(all_clients => 
          all_clients.c_fullname.toLowerCase().includes(this.mysearch.toLocaleLowerCase())
        );
      }
    },
    created() {
      this.getAllClient();
      this.getUser();
    },
}
</script>

<style>

</style>