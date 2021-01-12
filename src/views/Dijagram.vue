


<script>
  import { Line } from 'vue-chartjs'
  import config from "../config";
import Navbar from "@/components/Navbar.vue"
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import router from "../router";
  export default {
    extends: Line,
    props: {
      chartData: {
        type: Array,
        required: true,
      
      },
      chartLabels: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              
              gridLines: {
                display: true
              },
              ticks: {
                display:true,
                
                
              }
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart({
        labels: this.chartLabels,
        datasets: [
          {
            label: 'days after last refill',
            borderColor: '#249EBF',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: 'transparent',
            data: this.chartData,
           
          }
        ]
      }, this.options)
    },
  
  }
</script>
