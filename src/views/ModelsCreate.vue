<template>
<div>
<Navbar/> <br>

<div id= "inner" class="col-sm-6 col-md-3">
  <form  @submit.prevent="Create" method="POST">
<div class="account-wall">
    <v-col id="inner" cols="12" sm="6" md="8">
        
          <v-text-field 
            label="Code"
            outlined
            dense
            id="code"
          @input="code = $event"
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
            v-model="year"
            label="Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="year" @input="menu = false"></v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>

        <v-col id="inner" cols="12" sm="6" md="8">
          <v-text-field 
            label="Description"
            outlined
            dense
           id="descr"
         v-model="descr"
     ></v-text-field>
          
        </v-col>
        
 <button class="btn btn-lg btn-primary btn-block" type="submit">
              Create
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
export default class ModelsCreate extends Vue {
 private menu = null
 private code= 0
 private name = ""
 private year = null
 private descr = ""
  

  Create() {

    axios
      .post(`${config.serverURL}/api/v1/models`, {
        code: this.code,
        name: this.name,
        year: this.year,
        descr: this.descr
      })
      .then(resp => {
        router.push("/models");
      })
      .catch(function(error) {
        alert(error.response.data.message);
      })}
      
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