<template>
  <div>
      <Navbar/>



      <v-data-table :items="models"
                    :headers="headers"
    class="elevation-1"
  >
                    
        <template slot="item" slot-scope="row">
<tr>
      <td class="text-xs-right">{{ row.item.code }}</td>
      <td class="text-xs-right">{{ row.item.name }}</td>
      <td class="text-xs-right">{{ row.item.year }}</td>
      <td class="text-xs-right">{{ row.item.descr }}</td>
      <td class="text-xs-right"> <router-link to="/modelsedit" class="btn btn-primary" tag="button"  v-on:click.native="Edit(row.item)" value="buttons"> Edit </router-link> <button type="button" class="btn btn-danger" v-on:click="DeleteModel(row.item.id)">Delete</button> </td>
</tr>
    </template>

      </v-data-table>


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
    models : []
    
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

if(confirm("Do you really want to delete?")){

                axios.delete(`${config.serverURL}/api/v1/models/`+id)
                .then(resp => {
                   alert ('Model deleted');
                   this.$router.go(0);
                })
                .catch(error => {
                    console.log(error);
                })
   }
}
,

Edit(model:{} ){

  this.$store.commit('edit', model);

}


}

  
 }

</script>

<style>


</style>