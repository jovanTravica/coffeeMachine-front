<template>
<div>
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
             v-model="code"
          > </v-text-field>
        </v-col>

        <v-col id="inner" cols="12" sm="6" md="8">
          <v-text-field 
            label="Name"
            outlined
            dense
            id="name"
           v-model="name"
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
            label="Quantity"
            outlined
            dense
           id="quantity"
         v-model="quantity"
     ></v-text-field>
        </v-col>


  <v-col id="inner" cols="12" sm="6" md="8">
          <v-text-field 
            label="Amount"
            outlined
            dense
           id="amount"
         v-model="amount"
     ></v-text-field>
        </v-col>

<v-col id="inner" cols="12" sm="6" md="8">
          <v-text-field 
            label="Gross Amount"
            outlined
            dense
           id="grossAmount"
         v-model="grossAmount"
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
    </v-col>
  </v-row>

  
  <v-row align="center">
    <v-col  id="inner" cols="12" sm="6" md="8" >
      <v-select
      v-on:click.once="documentItemType()"
      :items="documentItemTypeArray"
      item-text="name"
      item-value= "code"
      return-object
        :menu-props="{ top: true, offsetY: true }"
        label="Document item type"
        v-model="documentItemTypeObject"
      ></v-select>
    </v-col>
  </v-row>


  
  <v-row align="center">
    <v-col  id="inner" cols="12" sm="6" md="8" >
      <v-select
      v-on:click.once="product()"
      :items="productArray"
      item-text="name"
      item-value= "code"
      return-object
        :menu-props="{ top: true, offsetY: true }"
        label="Product"
        v-model="productObject"
      ></v-select>
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
    </v-col>
  </v-row>

  <v-row align="center">
    <v-col  id="inner" cols="12" sm="6" md="8" >
      <v-select
      v-on:click.once="asset()"
      :items="assetArray"
      item-text="name"
      item-value= "code"
      return-object
        :menu-props="{ top: true, offsetY: true }"
        label="Asset"
        v-model="assetObject"
      ></v-select>
    </v-col>
  </v-row>

 <button class="btn btn-lg btn-primary btn-block" type="submit">
              Save 
            </button> 
           
            
</div>
  </form>
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
  }
})
export default class DocumentsItemCreate extends Vue {
  

 private code = 0
 private name = ""
 private descr = ""
 private quantity = 0
 private amount = 0
 private grossAmount = 0
 

  private documentArray = []
private documentItemTypeArray = []
private productArray = []
  private measurementArray = [] 
    private assetArray = [] 
   private documentObject ={}
   private documentItemTypeObject = {}
    private productObject = {}
    private measurementObject = {}
    private assetObject = {}

    

  Create() {

    axios
      .post(`${config.serverURL}/api/v1/document`, {
        code: this.code,
        name: this.name,
        descr: this.descr,
        quantity: this.quantity,
        amount: this.amount,
        grossAmount: this.grossAmount,
        document: this.documentObject,
        documentItemType: this.documentItemTypeObject,
        product: this.productObject,
        measurement: this.measurementObject,
        asset: this.assetObject

        
      })
      .then(resp => {
        router.push("/documents");
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

    
};


documentItemType(){

  axios.get(`${config.serverURL}/api/v1/documentitemtype`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.documentItemTypeArray= response.data;

}) 
};


measurement(){
  axios.get(`${config.serverURL}/api/v1/measurements`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.measurementArray= response.data;

}) 
};

products(){
  axios.get(`${config.serverURL}/api/v1/products`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.productArray= response.data;

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
</style>