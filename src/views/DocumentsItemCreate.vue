<template>
<div>
  <div  id="bg" v-bind:style="{ backgroundImage: 'url(' + require('../assets/kafa.jpg') + ')' }">
<Navbar/> 
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

  <v-col id="inner" cols="12" sm="6" md="8">
          <v-text-field 
          v-bind:pattern="regex.source"
            label="Quantity"
            outlined
            dense
           id="quantity"
         v-model="quantity"
          required
     ></v-text-field>
        </v-col>


  <v-col id="inner" cols="12" sm="6" md="8">
          <v-text-field 
          v-bind:pattern="regex.source"
            label="Amount"
            outlined
            dense
           id="amount"
         v-model="amount"
          required
     ></v-text-field>
        </v-col>

<v-col id="inner" cols="12" sm="6" md="8">
          <v-text-field 
          v-bind:pattern="regex.source"
            label="Gross Amount"
            outlined
            dense
           id="grossAmount"
         v-model="grossAmount"
         required
     ></v-text-field>
        </v-col>
        


  <v-row align="center">
    <v-col  id="inner" cols="12" sm="6" md="8" >
      <v-select
      v-on:click.once="document()"
      :items="documentArray"
      item-text="name"
      item-value= "code"
      return-object
        :menu-props="{ top: true, offsetY: true }"
        label="Document"
        v-model="documentObject"
      ></v-select>
       <span v-show="showAsset" style="color:red"> Invalid Document </span>
    </v-col>
  </v-row>

  

  <v-row align="center">
    <v-col  id="inner" cols="12" sm="6" md="8" >
      <v-select
      v-on:click.once="measurement()"
      :items="measurementArray"
      item-text="name"
      item-value= "code"
       return-object
        :menu-props="{ top: true, offsetY: true }"
        label="Measurement"
        v-model="measurementObject"
      ></v-select>
       <span v-show="showAsset" style="color:red"> Invalid Measurement </span>
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
import DocumentsCreate from './DocumentsCreate.vue';

@Component({
  components: {
    Navbar
  },
 
})
export default class DocumentsItemCreate extends Vue {
  

 private code = 0
 private name = ""
 private descr = ""
 private quantity = 0
 private amount = 0
 private grossAmount = 0
 
  regex = /^[0-9]+$/

private showAsset = false
private showDocument = false
private showMeasurement = false

  private documentArray = []

  private measurementArray = [] 
    private assetArray = [] 
   private documentObject ={}
    private measurementObject = {}
    private assetObject = {}

    

  Create() {

 if (Object.keys(this.documentObject).length === 0)
this.showDocument = true;

else if (Object.keys(this.measurementObject).length === 0)
this.showMeasurement = true;

else 

    axios
      .post(`${config.serverURL}/api/v1/documentitem`, {
        code: this.code,
        name: this.name,
        descr: this.descr,
        quantity: this.quantity,
        amount: this.amount,
        grossAmount: this.grossAmount,
        document: this.documentObject,
        measurement: this.measurementObject,
        

        
      })
      .then(resp => {
         alert('Created');
         this.$router.go(-1)
      })
      .catch(function(error) {
        alert(error.response.data.message);
      });
  };


  document(){

axios.get(`${config.serverURL}/api/v1/document`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.documentArray= response.data;

}) 

    
}
back() {
  this.$router.go(-1);
};




measurement(){
  axios.get(`${config.serverURL}/api/v1/measurements`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.measurementArray= response.data;

}) 
};




asset(){
  axios.get(`${config.serverURL}/api/v1/assets`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.assetArray= response.data;

}) 
};


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
    
  }
</style>