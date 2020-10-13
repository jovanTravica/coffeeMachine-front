import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
state: {
  model: {},
  location: {},
  document: {},
  asset:{},
  status: 0,
  documentType: ''

},
mutations: {
    editModel (state, model ){
       state.model = model;
    },

    editLocation (state, location ){
      state.location = location;
   },
   editDocument (state, document ){
      state.document = document;
   },

   editAsset (state, asset ){
      state.asset = asset;
   },

   login(state, status){
      state.status = status;
   },

   docType(state, documentType) {
     state.documentType = documentType;
   }

},

getters: {
    model: state => state.model,
    location: state => state.location,
    document: state => state.document,
    status: state => state.status,
    documentType: state => state.documentType,
    asset: state => state.asset
},


})