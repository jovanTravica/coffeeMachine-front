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

      <v-data-table :items="models"
                    :headers="headers"
                    :search="search"
    class="transparent"
  >
                    
        <template slot="item" slot-scope="row">
<tr>
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
          :return-value.sync="row.item.year"
          large
      persistent>
         {{ row.item.year }}
          <template v-slot:input>
             <v-text-field
            v-model="row.item.year"
            label="Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
           <v-date-picker
          v-model="row.item.year" ></v-date-picker>
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
            
      <td class="text-xs-right"> <router-link to="/modelsedit" class="btn btn-primary" tag="button"  v-on:click.native="Edit(row.item)" value="buttons"> Edit </router-link> <button type="button" class="btn btn-danger" v-on:click="DeleteModel(row.item.id)">Delete</button> <button type="button" class="btn btn-danger" v-on:click="EditModel(row.item.code, row.item.name,row.item.year,row.item.descr)">Save</button> </td>
</tr>
    </template>

      </v-data-table>
      <div id="inner" class="col-sm-6 col-md-2 col-md-offset-4">
<router-link to="/modelscreate" class="btn btn-dark" tag="button"> Create new </router-link>
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
          { text: 'Year', value: 'year' },
          { text: 'Description', value: 'descr' },
          {text: 'Actions', value:'buttons'}
    
        ],
    models : [],
    search: ''
    
  }
},

created(){
axios.get(`${config.serverURL}/api/v1/models`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.models = response.data; }) 


},

methods: {
DeleteModel(id:number){

if(confirm("Do you really want to delete this model?")){

                axios.delete(`${config.serverURL}/api/v1/models/`+id)
                .then(resp => {
                   alert ('Model deleted');
                   this.$router.go(0);
                })
                .catch(error => {
                   alert('Assest with this model still exists');
                })
   }
}
,

Edit(model:{} ){

  this.$store.commit('editModel', model);

},

EditModel(code:number, name:string, year:Date, descr:string){

  axios
      .put(`${config.serverURL}/api/v1/models`, {
        code: code,
        name: name,
        year: year,
        descr: descr
      })
      .then(resp => {
        alert("Data saved");
        this.$router.go(0);
        
      })
      .catch(function(error) {
        alert(error.response.data.message);
      });
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