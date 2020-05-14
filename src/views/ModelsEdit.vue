<template>
<div>
<Navbar/> <br>
<div id= "inner" class="col-sm-6 col-md-3">
  <form  @submit.prevent="Edit" method="POST">
<container class="account-wall">
    <v-col id="inner" cols="12" sm="6" md="8">
        
          <v-text-field :value="$store.getters.model.code"
            label="Code"
            outlined
            dense
          
            id="code"
           
          > </v-text-field>
        </v-col>
        <v-col id="inner" cols="12" sm="6" md="8">
          <v-text-field :value="$store.getters.model.name"
            label="Name"
            outlined
            dense
            id="name"
         
          ></v-text-field>
        </v-col>
        <v-col  id="inner" cols="12" sm="6" md="8" >
          <v-text-field  :value="$store.getters.model.year"
            label="Year"
            outlined
            dense
          id="year"
          
          ></v-text-field>
        </v-col>
        <v-col id="inner" cols="12" sm="6" md="8">
          <v-text-field :value="$store.getters.model.descr"
            label="Description"
            outlined
            dense
           id="descr"
         v-model="descr"
     ></v-text-field>
          
        </v-col>
        
 <button class="btn btn-lg btn-primary btn-block" type="submit">
              Save 
            </button> 
           
            
</container>
  </form>
</div>
</div>

</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import axios from "axios"
import router from "../router"
import config from "../config"

export default {
  data(){
  return {
  code :  null,
  name : null,
  year: null,
  descr: null
  
  }
},
methods: {
  Edit() {
  
     

    axios
      .post(`${config.serverURL}/api/v1/models`, {
        code: this.code,
        name: this.name,
        year: this.year,
        descr: this.descr
      })
      .then(resp => {
        router.push("/modelsedit");
      })
      .catch(function(error) {
        alert(error.response.data.message);
      });
  }
}
,



    components: { Navbar }

    
}
</script>

<style scoped>
.account-wall {
  margin-top: 20px;
  padding: 40px 0px 20px 0px;
  background-color: #ebc0800a;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);}
  #inner {
  margin: 0 auto;
}
</style>