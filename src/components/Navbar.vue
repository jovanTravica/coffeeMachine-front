<template>
  <nav>
    <v-toolbar flat app>
      <v-icon
        @click="drawer = !drawer"
        class="grey--text"
      >list</v-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Coffee</span>
        <span>Machines</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="grey">
        <router-link to="/">Sign Out</router-link>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
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
  }
};
</script>

<style></style>
