<template>
  <div>
    <div  id="bg" v-bind:style="{ backgroundImage: 'url(' + require('../assets/kafa.jpg') + ')' }">
      <Navbar/> <br>

    <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="col-sm-6 col-md-3"
      ></v-text-field>
<br>
      <v-data-table :items="assets"
                    :headers="headers"
                    :search="search"
                    
    class="transparent"
  >
                    
        <template slot="item" slot-scope="row">
<tr  v-on:click="showDays(row.item.id); show=true">
      <td class="text-xs-right">{{ row.item.code }}</td>

      <td class="text-xs-right">
        <v-edit-dialog
          :return-value.sync="row.item.name"
          large
      persistent>
          {{ row.item.name }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.name" ></v-text-field>
          </template>
            </v-edit-dialog>
             </td>


      <td class="text-xs-right">
        <v-edit-dialog
          :return-value.sync="row.item.descr"
          large
      persistent>
          {{ row.item.descr }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.descr" ></v-text-field>
          </template>
            </v-edit-dialog></td>


            <td  class="text-xs-right" >  <v-edit-dialog
          :return-value.sync="row.item.model.name"
           large
      persistent>
          {{ row.item.model.name}}
          <template v-slot:input>
         <v-select
        :items="models"
        item-text="name"
        item-value="value"
        return-object
        v-model="modelObject"
        :menu-props="{ top: true, offsetY: true }"
        label="Status"
        @input="row.item.model.name = modelObject.name; row.item.model = modelObject"
      ></v-select>
          </template>
            </v-edit-dialog>
            </td>

          <td  class="text-xs-right" >  <v-edit-dialog
          :return-value.sync="row.item.location.name"
           large
      persistent>
          {{ row.item.location.name}}
          <template v-slot:input>
         <v-select
        :items="locations"
        item-text="name"
        item-value="value"
        return-object
        v-model="locationObject"
        :menu-props="{ top: true, offsetY: true }"
        label="Status"
        @input="row.item.location.name = locationObject.name; row.item.location = locationObject"
      ></v-select>
          </template>
            </v-edit-dialog>
            </td>
            
      <td class="text-xs-right"> <router-link to="/assetsedit" class="btn btn-primary" tag="button"  v-on:click.native="Edit(row.item)" value="buttons"> Edit </router-link> <button type="button" class="btn btn-danger" v-on:click="DeleteAsset(row.item.id)">Delete</button> <button type="button" class="btn btn-danger" v-on:click="EditAsset(row.item.code, row.item.name,row.item.descr, row.item.model, row.item.location)">Save</button> </td>
</tr>
    </template>

      </v-data-table>
      <div id="inner" class="col-sm-6 col-md-2 col-md-offset-4">
<router-link to="/assetscreate" class="btn btn-dark" tag="button"> Create new </router-link>
      </div>

      <div v-for="stanje in stanje " :key="stanje.id" v-show="show">
        <div v-if="stanje.dani === null">
          There is no data for this asset</div>
          <div v-else>
  Next refill should be in {{stanje.dani}} days
          </div>
</div>
  </div>
  </div>
</template>


<script lang="ts">
import config from "../config";
import Navbar from "@/components/Navbar.vue"
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import router from "../router";

export default {
  components: { Navbar },
data(){
  return {
    

    headers: [
          {
            text: 'Code',
            align: 'start',
            sortable: false,
            value: 'code',
          },
          { text: 'Name', value: 'name' },
          { text: 'Description', value: 'descr' },
           { text: 'Model', value: 'model.name' },
            { text: 'Location', value: 'location.name' },
          {text: 'Actions', value:'buttons'}
    
        ],
    assets : [],
    models:[],
    locations:[],
    stanje : [],
    show: false,
    search: '',
    locationObject: {},
    modelObject:{}
    
  }
},

created(){
axios.get(`${config.serverURL}/api/v1/assets`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.assets = response.data; }) 

axios.get(`${config.serverURL}/api/v1/models`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.models = response.data; }) 


axios.get(`${config.serverURL}/api/v1/locations`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.locations = response.data; }) 


},

methods: {
DeleteAsset(id:number){

if(confirm("Do you really want to delete?")){

                axios.delete(`${config.serverURL}/api/v1/assets/`+id)
                .then(resp => {
                   alert ('Asset deleted');
                   this.$router.go(0);
                })
                .catch(error => {
                    alert('There are still some documents for this asset');
                })
   }
}
,

Edit(asset:{} ){

  this.$store.commit('editAsset', asset);

},

EditAsset(code:string, name:string, descr:string, model:{}, location:{}){

  axios
      .put(`${config.serverURL}/api/v1/assets`, {
        code: code,
        name: name,
        descr: descr,
        model: model,
        location: location
      })
      .then(resp => {
        alert("Data saved");
        this.$router.go(0);
        
      })
      .catch(function(error) {
        alert(error.response.data.message);
      });
},

showDays (assetId: number){
const show = true;
axios.get(`${config.serverURL}/api/v1/stanje/asset/` + assetId
).

then(response => { 
this.stanje = response.data; }) 

 }


}

  
 }

</script>

<style scoped>

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