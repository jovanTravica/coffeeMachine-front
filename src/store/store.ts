import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
state: {
  model: {},
  location: {},
  document: {},
  asset:{},
  documentItem:{},
  isAuthenticated: false,
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

   editDocumentItem (state, documentItem ){
      state.documentItem = documentItem;
   },

   editAsset (state, asset ){
      state.asset = asset;
   },

   login(state, isAuthenticated){
   
      state.isAuthenticated = isAuthenticated;
   },

   docType(state, documentType) {
     state.documentType = documentType;
   }

},

getters: {
    model: state => state.model,
    location: state => state.location,
    document: state => state.document,
    documentItem: state=> state.documentItem,
    isAuthenticated: state => state.isAuthenticated,
    documentType: state => state.documentType,
    asset: state => state.asset
},


})