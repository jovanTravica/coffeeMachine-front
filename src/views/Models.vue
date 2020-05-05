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
      <td class="text-xs-right"> <router-link to="/edit" class="btn btn-primary" tag="button" value="buttons"> Edit </router-link>  <router-link to="/delete" class="btn btn-danger" tag="button" value="buttons"> Delete </router-link> </td>
</tr>
    </template>

      </v-data-table>


  </div>
</template>

<script lang="ts">
import config from "../config";
import Navbar from "@/components/Navbar"
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

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
this.models = response.data; console.log(this.models);   }) 


}

  
 }

</script>

<style>


</style>