<template>
<div>
  <div  id="bg" v-bind:style="{ backgroundImage: 'url(' + require('../assets/kafa.jpg') + ')' }">
<Navbar/> <br>

<div id= "inner" class="col-sm-6 col-md-3">
  <form  @submit.prevent="Edit" method="POST">
<div class="account-wall">
    <v-col id="inner" cols="12" sm="6" md="8">
        
          <v-text-field 
            label="Code"
            outlined
            dense
            id="code"
          v-model="code"
          readonly
          > </v-text-field>
        </v-col>

        <v-col id="inner" cols="12" sm="6" md="8">
          <v-text-field 
            label="Name"
            outlined
            dense
            id="name"
           v-model="name"
           required
          ></v-text-field>
        </v-col>


        <v-col id="inner" cols="12" sm="6" md="8">
          <v-text-field 
            label="Description"
            outlined
            dense
           id="descr"
         v-model="descr"
     ></v-text-field>
          
        </v-col>


        <v-row align="center">
    <v-col  id="inner" cols="12" sm="6" md="8" >
      <v-select
      :items="modelArray"
      item-text="name"
      item-value= "code"
       return-object
        :menu-props="{ top: true, offsetY: true }"
        label="Model"
        v-model="modelItem"
      ></v-select>
    </v-col>
  </v-row>


  <v-row align="center">
    <v-col  id="inner" cols="12" sm="6" md="8" >
      <v-select
      :items="locationArray"
      item-text="name"
      item-value= "code"
       return-object
        :menu-props="{ top: true, offsetY: true }"
        label="Location"
        v-model="locationItem"
      ></v-select>
    </v-col>
  </v-row>
        
 <button class="btn btn-lg btn-primary btn-block" type="submit">
              Save
            </button> 
            
              <button class="btn btn-lg btn-secondary btn-block" v-on:click="back()">
              Cancel
              </button> 
           
            
</div>
  </form>
   
</div>
</div>
</div>
</template>


<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import axios from "axios"
import router from "../router"
import config from "../config"
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Navbar
  }
})
export default class AssetEdit extends Vue {
  

 private code = 0
 private name = ""
 private descr = ""
 


private modelArray = []
private locationArray = []
   private modelItem ={}
   private locationItem = {}


     created() {

  this.code = this.$store.getters.asset.code
  this.name = this.$store.getters.asset.name
  this.descr = this.$store.getters.asset.descr
  this.modelItem = this.$store.getters.asset.model
  this.locationItem = this.$store.getters.asset.location


 axios.get(`${config.serverURL}/api/v1/models`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.modelArray= response.data;


axios.get(`${config.serverURL}/api/v1/locations`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.locationArray= response.data;

})
}) 


  
}

Edit() {

    axios
      .put(`${config.serverURL}/api/v1/assets`, {
        code: this.code,
        name: this.name,
        descr: this.descr,
        model: this.modelItem,
        location: this.locationItem
      })
      .then(resp => {
        alert("Edited");
        this.$router.go(-1)
      })
      .catch(function(error) {
        alert(error.response.data.message);
      });
                                              
     this.$store.getters.asset.code = this.code
     this.$store.getters.asset.name = this.name
     this.$store.getters.asset.descr = this.descr
      this.$store.getters.asset.model = this.modelItem
       this.$store.getters.asset.location = this.locationItem
  }




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

  div#bg {
  -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
  }
</style>