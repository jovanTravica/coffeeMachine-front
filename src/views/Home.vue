<template>
  <v-app class="grey lighten-4">
      <div  id="bg" v-bind:style="{ backgroundImage: 'url(' + require('../assets/kafa.jpg') + ')' }">
    <Navbar />


    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
  </v-app>
  
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  components: { Navbar },
  name: "App",
  data() {
    return {};
  }
};
</script>

<style scoped>

  div#bg {
  -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
  }
</style>