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


      <v-col  id="inner" cols="12" sm="6" md="8" >
          <v-menu
        v-model="menu0"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateDoc"
            label="Date "
            prepend-icon="event"
            readonly
            v-on="on"
            required
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateDoc" @input="menu0 = false"></v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
          
  

  <v-row align="center">
    <v-col  id="inner" cols="12" sm="6" md="8" >
      <v-select
      v-on:click.once="documentType()"
      :items="documentTypeArray"
      item-text="name"
      item-value= "code"
       return-object
        :menu-props="{ top: true, offsetY: true }"
        label="Document type"
        v-model="documentTypeItem"
      ></v-select>
      <span v-show="showDocumentType" style="color:red"> Invalid Document type </span>
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
        v-model="assetItem"
      ></v-select>
      <span v-show="showAsset" style="color:red"> Invalid Asset </span>
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
export default class DocumentsCreate extends Vue {
  
  private menu0 = false
  private menu = false
  private menu1 = false
 private code = 0
 private name = ""
 private descr = ""
  private dateDoc = new Date().toISOString().substr(0, 10)


  private document = []
  private assetArray = [] 
private documentTypeArray = []

private showAsset = false
private showDocumentType = false

   private assetItem ={}
   private documentTypeItem = {}
  

  Create() {

{
  if(Object.keys(this.assetItem).length === 0 )
  this.showAsset = true;

else if (Object.keys(this.documentTypeItem).length === 0)
this.showDocumentType = true;

  else

    axios
      .post(`${config.serverURL}/api/v1/document`, {
        code: this.code,
        name: this.name,
        descr: this.descr,
        dateDoc: this.dateDoc,
         documentType: this.documentTypeItem,
         asset: this.assetItem
      

        
      })
      .then(resp => {
         alert('Created');
         this.$router.go(-1)
      })
      .catch(function(error) {
        alert(error.response.data.message);
      });
  }
  }




documentType(){

  axios.get(`${config.serverURL}/api/v1/documenttype`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.documentTypeArray= response.data;

}) 
}
back() {
  this.$router.go(-1);
}

asset(){
  axios.get(`${config.serverURL}/api/v1/assets`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.assetArray= response.data;

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
   
  }
</style>