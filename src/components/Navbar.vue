<template>
  <nav>
    <v-toolbar flat color="transparent" >
      <v-icon
        @click="drawer = !drawer"
        class="grey--text"
      >list</v-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Coffee</span>
        <span>Machines</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
        <router-link class="btn btn-secondary" to="/" tag="button" v-on:click.native = Logout()>Sign Out
        <v-icon right>exit_to_app</v-icon></router-link>
    
    </v-toolbar>

    <v-navigation-drawer  app v-model="drawer" class="secondary" width="250" >
      <v-list>
        <v-list-group no-action  >
        <template v-slot:activator>
          <v-list-item-action>
           <v-icon  class="white--text">folder</v-icon>
           </v-list-item-action>
           <v-list-item-content>
          <v-list-item-title class="white--text">Documents</v-list-item-title>
           </v-list-item-content>
        </template>
          <v-list-item   @click="Documents(document.name)" v-for="document in dt" :key="document.id" >
            <v-list-item-content>
            <v-list-item-title  class="white--text"> {{ document.name }}</v-list-item-title> 
          </v-list-item-content>
          </v-list-item>
        </v-list-group>
        

        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title> 
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    
  </nav>
</template>

<script lang="ts">
import axios from "axios"
import config from "../config"
import router from '../router';

export default {
  data() {
    return {
      drawer: false,
       links: [
        { icon: 'dashboard', text: 'Models', route: '/models' },
        { icon: 'mdi-earth', text: 'Locations', route: '/locations' },
        { icon: 'mdi-fridge-top', text: 'Assets', route: '/assets' },
        { icon: 'mdi-chart-line', text: 'Diagram', route: '/dijagram' },
        
      ],
      dt: []
    };
  },
  methods: {
    Logout(){
     sessionStorage.setItem('logged', '') ;
    },
    
  Documents(name:string)
  {
//this.$store.commit('docType', name)
router.push({name: 'Documents', params: {name}})

  }
  },

  created(){
    axios.get(`${config.serverURL}/api/v1/documenttype`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.dt= response.data;

}) 
  },
  

};
</script>

<style></style>
