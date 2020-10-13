<template>
<div>
  <div  id="bg" v-bind:style="{ backgroundImage: 'url(' + require('../assets/kafa.jpg') + ')' }">
<Navbar/> 
<div id= "inner" class=" col-md-3">
  <form  @submit.prevent="Edit" method="POST">
<div class="account-wall">
    <v-col id="inner" cols="12" sm="6" md="8">
        
          <v-text-field 
            label="Code"
            outlined
            dense
            id="code"
             v-model="code"
          readonly
          > </v-text-field>
        </v-col>

        <v-col id="inner" cols="12" sm="6" md="8">
          <v-text-field 
            label="Name"
            outlined
            dense
            id="name"
           v-model="name"
           required
          ></v-text-field>
        </v-col>


        <v-col id="inner" cols="12" sm="6" md="8">
          <v-text-field 
            label="Description"
            outlined
            dense
           id="descr"
         v-model="descr"
     ></v-text-field>
          
        </v-col>

         <v-col  id="inner" cols="12" sm="6" md="8" >
          <v-text-field  
            label="Adress"
            outlined
            dense
          id="adress"
          v-model="adress"
          required
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
            v-model="dateFrom"
            label="Date from"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateFrom" @input="menu = false"></v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>


         <v-col  id="inner" cols="12" sm="6" md="8" >
          <v-menu
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateTo"
            label="Date to"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateTo" @input="menu1 = false"></v-date-picker>
      </v-menu>
        </v-col>

  <v-row align="center">
    <v-col  id="inner" cols="12" sm="6" md="8" >
      <v-select
        :items="items"
        :menu-props="{ top: true, offsetY: true }"
        label="Status"
        v-model.lazy="selectedItem"
      ></v-select>
    </v-col>
  </v-row>

 <button class="btn btn-lg btn-primary btn-block" type="submit">
              Save 
            </button> 
           <button class="btn btn-lg btn-secondary btn-block" v-on:click="back()">
              Cancel
              </button>  
            
</div>
  </form>
</div>
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
export default class LocationsEdit extends Vue {
 private menu = false
 private menu1 = false
 private code = 0
 private name = ""
 private descr = ""
 private adress = ""
  private dateFrom = new Date().toISOString().substr(0, 10)
   private dateTo = new Date().toISOString().substr(0, 10)
  private items = ['active', 'not active']
  private selectedItem = ""

  Edit() {
if(this.dateFrom > this.dateTo)
alert("'Date from' has to be lower  than 'date to'")

else {
    axios
      .put(`${config.serverURL}/api/v1/locations`, {
        code: this.code,
        name: this.name,
        descr: this.descr,
        adress: this.adress,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        active: this.options()
      })
      .then(resp => {
        alert("Edited");
        router.push("/locations");
      })
      .catch(function(error) {
        alert(error.response.data.message);
      });

     this.$store.getters.location.code = this.code
     this.$store.getters.location.name = this.name
     this.$store.getters.location.descr = this.descr
     this.$store.getters.location.adress = this.adress
     this.$store.getters.location.dateFrom = this.dateFrom
     this.$store.getters.location.dateTo = this.dateTo
     this.$store.getters.location.active = this.options()
}
  }

  created() {
  this.code = this.$store.getters.location.code
  this.name = this.$store.getters.location.name
  this.descr = this.$store.getters.location.descr
  this.adress = this.$store.getters.location.adress
  this.dateFrom = this.$store.getters.location.dateFrom
  this.dateTo = this.$store.getters.location.dateTo
  if(this.$store.getters.location.active == true)
  this.selectedItem = 'active'
  else
  this.selectedItem = 'not active'
}
back() {
  this.$router.go(-1);
}

options(){
    if (this.selectedItem == 'active')
    return true
    else
    return false
}
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


  div#bg {
  -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
  
  }
</style>