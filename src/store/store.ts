import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
state: {
  model: {},
  location: {},
  status: 0

},
mutations: {
    editModel (state, model ){
       state.model = model;
    },

    editLocation (state, location ){
      state.location = location;
   },

   login(state, status){
      state.status = status;
   }

},

getters: {
    model: state => state.model,
    location: state => state.location,
    status: state => state.status
},


})