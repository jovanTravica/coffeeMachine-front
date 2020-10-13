<template>
<div>
  <div  id="bg" v-bind:style="{ backgroundImage: 'url(' + require('../assets/kafa.jpg') + ')' }">
<Navbar/> <br>

<div id= "inner" class="col-sm-6 col-md-3">
  <form  @submit.prevent="Create" method="POST">
<div class="account-wall">
    <v-col id="inner" cols="12" sm="6" md="8">
        
          <v-text-field 
            label="Code"
            outlined
            dense
            id="code"
          @input="code = $event"
          required
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
      v-on:click.once="model()"
      :items="modelArray"
      item-text="name"
      item-value= "code"
       return-object
        :menu-props="{ top: true, offsetY: true }"
        label="Model"
        v-model="modelItem"
      ></v-select>
       <span v-show="showModel" style="color:red"> Invalid Model </span>
    </v-col>
  </v-row>


  <v-row align="center">
    <v-col  id="inner" cols="12" sm="6" md="8" >
      <v-select
      v-on:click.once="location()"
      :items="locationArray"
      item-text="name"
      item-value= "code"
       return-object
        :menu-props="{ top: true, offsetY: true }"
        label="Location"
        v-model="locationItem"
      ></v-select>
       <span v-show="showLocation" style="color:red"> Invalid Location </span>
    </v-col>
  </v-row>
        
 <button class="btn btn-lg btn-primary btn-block" type="submit">
              Create
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
export default class AssetCreate extends Vue {
 private code= 0
 private name = ""
 private descr = ""
 private modelArray = []
 private locationArray = []
private  modelItem = {}
 private locationItem = {}

private showModel = false
private showLocation = false


  

  Create() {

  if(Object.keys(this.modelItem).length === 0 )
  this.showModel = true;

else if (Object.keys(this.locationItem).length === 0)
this.showLocation = true;

else

    axios
      .post(`${config.serverURL}/api/v1/assets`, {
        code: this.code,
        name: this.name,
        descr: this.descr,
        model: this.modelItem,
        location: this.locationItem
      })
      .then(resp => {
         alert('Created');
        router.push("/assets");
      })
      .catch(function(error) {
        alert(error.response.data.message);
      })}
      

      location(){
  axios.get(`${config.serverURL}/api/v1/locations`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.locationArray= response.data;

}) 
}

back() {
  this.$router.go(-1);
}


      model(){
  axios.get(`${config.serverURL}/api/v1/models`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.modelArray= response.data;

}) 
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