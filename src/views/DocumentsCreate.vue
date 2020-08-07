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
      v-on:click.once="storages()"
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
      v-on:click.once="documentType()"
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
      v-on:click.once="state()"
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
export default class DocumentsCreate extends Vue {
  
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

  Create() {

console.log(this.storageItem)

if(this.dateFrom > this.dateTo)
alert("'Date from' has to be lower  than 'date to'")
else
{
    axios
      .post(`${config.serverURL}/api/v1/document`, {
        code: this.code,
        name: this.name,
        descr: this.descr,
        dateDoc: this.dateDoc,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        storage: this.storageItem,
         documentType: this.documentTypeItem,
          documentState: this.stateItem

        
      })
      .then(resp => {
        router.push("/documents");
      })
      .catch(function(error) {
        alert(error.response.data.message);
      });
  }
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