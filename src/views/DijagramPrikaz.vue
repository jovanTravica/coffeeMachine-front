<template>
  <div>
    <Navbar/> <br>

    <line-chart
      v-if="loaded"
     :chartData="dani"
     :chartLabels="asset"/>
  </div>
</template>

<script>
import LineChart from './Dijagram.vue'
 import config from "../config";
import Navbar from "@/components/Navbar.vue"
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import router from "../router";

export default {
  name: 'LineChartContainer',
  components: { LineChart, Navbar },
  
  data: () => ({
    loaded: false,
           dani: [],
  asset: [],
  }),
  async mounted () {
    this.loaded = false
    try {
   await axios.get(`${config.serverURL}/api/v1/dijagram`, {headers: {
	  'Access-Control-Allow-Origin': '*'}})
 .then(response => {
   this.dani = response.data.map(item => item.dani)
   this.asset = response.data.map(item => item.asset.name)

   this.asset.sort()
 
 })
      this.loaded = true
    } catch (e) {
      console.error(e)
    }

    
  },
}
</script>
