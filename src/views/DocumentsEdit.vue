<template>
<div>
  <div  id="bg" v-bind:style="{ backgroundImage: 'url(' + require('../assets/kafa.jpg') + ')' }">
<Navbar/> 
<div id= "inner" class="col-sm-6 col-md-3">
  <form  @submit.prevent="Edit" method="PUT">
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
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateDoc" @input="menu0 = false"></v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
          


  <v-row align="center">
    <v-col  id="inner" cols="12" sm="6" md="8" >
      <v-select
      :items="documentTypeArray"
      item-text="name"
      item-value= "code"
       return-object
        :menu-props="{ top: true, offsetY: true }"
        label="Document type"
        v-model="documentTypeItem"
      ></v-select>
    </v-col>
  </v-row>


  <v-row align="center">
    <v-col  id="inner" cols="12" sm="6" md="8" >
      <v-select
      :items="assetArray"
      item-text="name"
      item-value= "code"
       return-object
        :menu-props="{ top: true, offsetY: true }"
        label="Asset"
        v-model="assetItem"
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
export default class DocumentsEdit extends Vue {
  
  private menu0 = false
  private menu = false
  private menu1 = false
 private code = 0
 private name = ""
 private descr = ""
  private dateDoc = new Date().toISOString().substr(0, 10)


  private document = []
private documentTypeArray = []
private assetArray = []
   private storageItem ={}
   private documentTypeItem = {}
    private assetItem = {}

     created() {

  this.code = this.$store.getters.document.code
  this.name = this.$store.getters.document.name
  this.descr = this.$store.getters.document.descr
  this.dateDoc = this.$store.getters.document.dateDoc
  this.documentTypeItem = this.$store.getters.document.documentType
  this.assetItem = this.$store.getters.document.asset


 axios.get(`${config.serverURL}/api/v1/documenttype`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.documentTypeArray= response.data;


axios.get(`${config.serverURL}/api/v1/assets`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.assetArray= response.data;

})
}) 


  
}

Edit() {

if(Object.keys(this.assetItem).length === 0 || Object.keys(this.documentTypeItem).length === 0 )
  alert("Asset and document type are required fields")
  
    axios
      .put(`${config.serverURL}/api/v1/document`, {
        code: this.code,
        name: this.name,
        descr: this.descr,
        dateDoc: this.dateDoc,
        documentType: this.documentTypeItem,
        asset: this.assetItem
      })
      .then(resp => {
        alert("Edited");
        this.$router.go(-1)
      })
      .catch(function(error) {
        alert(error.response.data.message);
      });
                                              
     this.$store.getters.document.code = this.code
     this.$store.getters.document.name = this.name
     this.$store.getters.document.descr = this.descr
     this.$store.getters.document.dateDoc = this.dateDoc
      this.$store.getters.document.documentType = this.documentTypeItem
       this.$store.getters.document.asset = this.assetItem
  }


back() {
  this.$router.go(-1);
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