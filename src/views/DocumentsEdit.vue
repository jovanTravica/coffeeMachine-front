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
          

        
         <v-col  id="inner" cols="12" sm="6" md="8" >
          <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateFrom"
            label="Date from"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateFrom" @input="menu = false"></v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
  
  

         <v-col  id="inner" cols="12" sm="6" md="8" >
        <v-menu
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateTo"
            label="Date to"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateTo" @input="menu1 = false"></v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>




  <v-row align="center">
    <v-col  id="inner" cols="12" sm="6" md="8" >
      <v-select
      
      :items="storagesArray"
      item-text="name"
      item-value= "code"
      return-object
        :menu-props="{ top: true, offsetY: true }"
        label="Storage"
        v-model="storageItem"
      ></v-select>
    </v-col>
  </v-row>

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
      
      :items="stateArray"
      item-text="name"
      item-value= "code"
      return-object
        :menu-props="{ top: true, offsetY: true }"
        label="State"
        v-model="stateItem"
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
  private dateFrom = new Date().toISOString().substr(0, 10)
   private dateTo = new Date().toISOString().substr(0, 10)

  private document = []
  private storagesArray = [] 
private documentTypeArray = []
private stateArray = []
   private storageItem ={}
   private documentTypeItem = {}
    private stateItem = {}

     created() {

  this.code = this.$store.getters.document.code
  this.name = this.$store.getters.document.name
  this.descr = this.$store.getters.document.descr
  this.dateDoc = this.$store.getters.document.dateDoc
  this.dateFrom = this.$store.getters.document.dateFrom
  this.dateTo = this.$store.getters.document.dateTo
  this.storageItem = this.$store.getters.document.storage
  this.documentTypeItem = this.$store.getters.document.documentType
  this.stateItem = this.$store.getters.document.documentState

  axios.get(`${config.serverURL}/api/v1/documentstate`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.stateArray= response.data;

}) 

 axios.get(`${config.serverURL}/api/v1/documenttype`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.documentTypeArray= response.data;

}) 

axios.get(`${config.serverURL}/api/v1/storage`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.storagesArray= response.data;

}) 
  
}

state(){

axios.get(`${config.serverURL}/api/v1/documentstate`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.stateArray= response.data;

}) 


    
};

documentType(){

  axios.get(`${config.serverURL}/api/v1/documenttype`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.documentTypeArray= response.data;

}) 
}

storages(){
  axios.get(`${config.serverURL}/api/v1/storage`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.storagesArray= response.data;

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
</style>