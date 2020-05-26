import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
state: {
  model: {},
  location: {}

},
mutations: {
    editModel (state, model ){
       state.model = model;
    },

    editLocation (state, location ){
      state.location = location;
   }

},

getters: {
    model: state => state.model,
    location: state => state.location
}

})