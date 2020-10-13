<template>
  <div>
    <div  id="bg" v-bind:style="{ backgroundImage: 'url(' + require('../assets/kafa.jpg') + ')' }">
      <Navbar/>

<v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="col-sm-6 col-md-3"
      ></v-text-field>
      <br>

      <v-data-table :items="locations"
                    :headers="headers"
                    :search="search"
    class="transparent"
  >
                    
        <template slot="item" slot-scope="row">
<tr>
      <td class="text-xs-right">{{ row.item.code }}</td>

      <td class="text-xs-right"><v-edit-dialog 
      large
      persistent
          :return-value.sync="row.item.name">
          {{ row.item.name }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.name" ></v-text-field>
          </template>
            </v-edit-dialog></td>

             <td class="text-xs-right"><v-edit-dialog
          :return-value.sync="row.item.adress"
          large
      persistent>
          {{ row.item.adress }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.adress" ></v-text-field>
          </template>
            </v-edit-dialog></td>

      <td class="text-xs-right"> <v-edit-dialog
          :return-value.sync="row.item.descr"
          large
      persistent>
          {{ row.item.descr }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.descr" ></v-text-field>
          </template>
            </v-edit-dialog></td>

      <td class="text-xs-right"> <v-edit-dialog
          :return-value.sync="row.item.dateFrom"
          large
      persistent>
         {{ row.item.dateFrom }}
          <template v-slot:input>
             <v-text-field
            v-model="row.item.dateFrom"
            label="Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
           <v-date-picker
          v-model="row.item.dateFrom" ></v-date-picker>
          </template>
            </v-edit-dialog></td>

      <td class="text-xs-right"> <v-edit-dialog
          :return-value.sync="row.item.dateTo"
          large
      persistent>
         {{ row.item.dateTo }}
          <template v-slot:input>
             <v-text-field
            v-model="row.item.dateTo"
            label="Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
           <v-date-picker
          v-model="row.item.dateTo" ></v-date-picker>
          </template>
            </v-edit-dialog></td>
            
      <td class="text-xs-right" >  <v-edit-dialog
          :return-value.sync="row.item.active"
           large
      persistent>
          {{ row.item.active ? 'active': 'not active' }}
          <template v-slot:input>
          <v-select
        :items="items"
        item-text="name"
        item-value="value"
        return-object
        :menu-props="{ top: true, offsetY: true }"
        label="Status"
        v-model="value"
        @input="row.item.active = value.value"
      ></v-select>
          </template>
            </v-edit-dialog>
            </td>
      <td class="text-xs-right"> <router-link to="/locationsedit" class="btn btn-primary" tag="button"  v-on:click.native="Edit(row.item)" value="buttons"> Edit </router-link> <button type="button" class="btn btn-danger" v-on:click="DeleteLocation(row.item.id)">Delete</button>   <button type="button" class="btn btn-danger" v-on:click="EditLocation(row.item.code, row.item.name,row.item.adress,row.item.descr,row.item.dateFrom,row.item.dateTo)">Save</button></td>
</tr>
    </template>

      </v-data-table>

   <div id="inner" class="col-sm-6 col-md-2 col-md-offset-4">
<router-link to="/locationscreate" class="btn btn-dark" tag="button"> Create new </router-link>
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
    value: { "name": "active", "value": "true"},
    
    items  : [{ "name": "active", "value": true}, {"name":"not active",  "value":false}],
    headers: [
          {
            text: 'Code',
            align: 'start',
            sortable: false,
            value: 'code',
          },
          { text: 'Name', value: 'name' },
          { text: 'Adress', value: 'adress' },
          { text: 'Description', value: 'descr' },
          { text: 'Date from', value: 'dateFrom' },
          { text: 'Date to', value: 'dateTo' },
          { text: 'Status', value: 'status', sortable:false },
          {text: 'Actions', value:'buttons'}
    
        ],
    locations : [],
    search:''
    
  }
},

created(){
axios.get(`${config.serverURL}/api/v1/locations`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.locations = response.data; }) 


},

methods: {
DeleteLocation(id:number){

if(confirm("Do you really want to delete?")){

                axios.delete(`${config.serverURL}/api/v1/locations/`+id)
                .then(resp => {
                   alert ('Location deleted');
                   this.$router.go(0);
                })
                .catch(error => {
                    console.log(error);
                })
   }
}
,


Edit(location:{} ){

  this.$store.commit('editLocation', location);

},

 EditLocation(code:string, name:string, adress:string, descr:string, dateFrom:Date, dateTo:Date) {
  
    axios
      .put(`${config.serverURL}/api/v1/locations`, {
        code: code,
        name: name,
        descr: descr,
        adress: adress,
        dateFrom: dateFrom,
        dateTo: dateTo,
        active: this.value.value
     
      })
      .then(resp => {
        this.$router.push("/locations");
      })
      .catch(function(error) {
        alert(error.response.data.message);
      });


},



  
    }}


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