<template>
    <div class="ClientAll">
        <!--https://pbs.twimg.com/media/DrM0nIdU0AEhG5b.jpg-->
        <p>test21</p>
        <p>Coming Soon. Show all Client Page.</p>

        <ClientAdd></ClientAdd>

      <!--loop message-->
    <div class="grid grid-cols-5">
      <div class="business_card" v-for="c in messages">
        <p :value="c.fullname" type="text"></p>
      </div>
    </div>

        
    </div>
</template>


<script>
import { setDoc } from '@firebase/firestore';

export default{
    name: 'ClientAll',
    components: {},
    methods: {
      /*
      UpdateClient:function(msg){
        setDoc(doc(db, 'msg', msg.id),{
          text: msg.text,
          data: msg.data
        })
      },
      DeleteClient:function(msg){
        deleteDoc(doc(db, 'msg', msg.id),{
          text: msg.text,
          data: msg.data
        })
      }
      */
    }
}
</script>

<style>
.business_card{
  border-radius: 25px;
  border: 2px solid #73AD21;
  padding: 20px;
  width: 200px;
  height: 150px;
}
</style>