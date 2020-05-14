import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
state: {
  model: 0 

},
mutations: {
    edit (state, model ){
       state.model = model;
    },

},

getters: {
    model: state => state.model
}

})