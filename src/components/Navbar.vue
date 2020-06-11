<template>
  <nav>
    <v-toolbar flat >
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

    <v-navigation-drawer app v-model="drawer" class="secondary" width="200" >
      <v-list>
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

<script>
export default {
  data() {
    return {
      drawer: false,
       links: [
        { icon: 'dashboard', text: 'Models', route: '/models' },
        { icon: 'folder', text: 'Locations', route: '/locations' },
        
      ]
    };
  },
  methods: {
    Logout(){
      this.$store.commit('login', 0) ;
    }
  }
};
</script>

<style></style>
