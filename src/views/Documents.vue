<template>
  <div>
    <div  id="bg" v-bind:style="{ backgroundImage: 'url(' + require('../assets/kafa.jpg') + ')' }">
      <Navbar/>

<v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="col-sm-6 col-md-3"
      ></v-text-field>
      <br>

      <v-data-table :items="documents"
                    :headers="headers"
                    :search="search"
                    
    class="transparent"
  >
                    
        <template slot="item" slot-scope="row">
<tr v-on:click="showProduct(row.item.id, row.item.documentType.name);" >
      <td class="text-xs-right">{{ row.item.code }}</td>

      <td class="text-xs-right"><v-edit-dialog 
      large
      persistent
          :return-value.sync="row.item.name">
          {{ row.item.name }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.name" ></v-text-field>
          </template>
            </v-edit-dialog></td>

             

      <td class="text-xs-right"> <v-edit-dialog
          :return-value.sync="row.item.descr"
          large
      persistent>
          {{ row.item.descr }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.descr" ></v-text-field>
          </template>
            </v-edit-dialog></td>


            <td class="text-xs-right"> <v-edit-dialog
          :return-value.sync="row.item.dateDoc"
          large
      persistent>
         {{ row.item.dateDoc }}
          <template v-slot:input>
             <v-text-field
            v-model="row.item.dateDoc"
            label="Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
           <v-date-picker
          v-model="row.item.dateDoc" ></v-date-picker>
          </template>
            </v-edit-dialog></td>

  
            
     
<td  class="text-xs-right" >  <v-edit-dialog
          :return-value.sync="row.item.documentType.name"
           large
      persistent>
          {{ row.item.documentType.name}}
          <template v-slot:input>
         <v-select
        :items="docTypeItems"
        item-text="name"
        item-value="value"
        return-object
        v-model="docType"
        :menu-props="{ top: true, offsetY: true }"
        label="Status"
        @input="row.item.documentType.name = docType.name; row.item.documentType = docType"
      ></v-select>
          </template>
            </v-edit-dialog>
            </td>

<td  class="text-xs-right" >  <v-edit-dialog
          :return-value.sync="row.item.asset.name"
           large
      persistent>
          {{ row.item.asset.name}}
          <template v-slot:input>
         <v-select
        :items="assetItems"
        item-text="name"
        item-value="value"
        return-object
        v-model="assetObject"
        :menu-props="{ top: true, offsetY: true }"
        label="Asset"
        @input="row.item.asset.name = assetObject.name; row.item.asset = assetObject"
      ></v-select>
          </template>
            </v-edit-dialog>
            </td>

          


      <td class="text-xs-right"> <router-link to="/documentsedit" class="btn btn-primary" tag="button"  v-on:click.native="Edit(row.item)" value="buttons"> Edit </router-link> <button type="button" class="btn btn-danger" v-on:click="DeleteDocument(row.item.id)">Delete</button>   <button type="button" class="btn btn-danger" v-on:click="EditDocument(row.item.code, row.item.name,row.item.descr,row.item.dateDoc, row.item.documentType, row.item.asset)">Save</button></td>
</tr>
    </template>

      </v-data-table>

<div id="inner" class="col-sm-6 col-md-2 col-md-offset-4">
<router-link to="/documentscreate" class="btn btn-dark" tag="button"> Create new document </router-link>
      </div>

      <v-data-table :items="products"
                    :headers="headersItem"
                    v-show="show"
                    class="transparent"
  
  >
                    
        <template slot="item" slot-scope="row">
<tr>
      <td class="text-xs-right">{{ row.item.code }}</td>

      <td class="text-xs-right">
         {{ row.item.name }}
             </td>


      <td class="text-xs-right">
       {{ row.item.descr }}</td>


            
      <td class="text-xs-right">
      {{ row.item.quantity }}
             </td>


             <td class="text-xs-right">
        {{ row.item.amount }}
             </td>



               <td class="text-xs-right">
      {{ row.item.grossAmount }}
             </td>

        <td class="text-xs-right">
        {{ row.item.measurement.name }}
             </td>



                <td class="text-xs-right">
        {{ row.item.document.name }}
             </td>

          <td class="text-xs-right"> <router-link to="/documentsitemedit" class="btn btn-primary" tag="button"  v-on:click.native="EditItem(row.item)" value="buttons"> Edit </router-link> <button type="button" class="btn btn-danger" v-on:click="DeleteDocumentItem(row.item.id)">Delete</button>   </td>


        


         
</tr>
        </template>
      </v-data-table>

      <div id="inner" class="col-sm-6 col-md-2 col-md-offset-4">
<router-link to="/documentsitemcreate" class="btn btn-dark lg" tag="button"> Create new item   </router-link>
      </div>
   
  </div>
</div>

</template>


<script lang="ts">
import config from "../config";
import Navbar from "@/components/Navbar.vue"
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import router from "../router";

export default {
  components: { Navbar },
data(){
  return {
   
   
   
    headers: [
          {
            text: 'Code',
            align: 'start',
            sortable: false,
            value: 'code',
          },
          { text: 'Name', value: 'name' },
          { text: 'Description', value: 'descr' },
          { text: 'Date', value: 'dateDoc' },
          {text: 'Document type', value:'documentType'},
           {text: 'Asset', value:'asset.name'},
            {text: 'Actions', value:'buttons'}
    
        ],

         headersItem: [
          {
            text: 'Code',
            align: 'start',
            sortable: false,
            value: 'code',
          },
          { text: 'Name', value: 'name' },
          { text: 'Description', value: 'descr' },
          { text: 'Quantity', value: 'qunatity' },
          { text: 'Amount', value: 'amount' },
          { text: 'Gross amount', value: 'grossAmount' },
           {text: 'Measurement', value:'measurement'},
          { text: 'Document', value: 'document'},
           {text: 'Actions', value:'buttons'}
           
         
    
        ],
    documents : [],
    documentsFilter : [],
    products : [],
    filteredProducts : [],
    documentType: '',
    search: '',
    show: false,
    docTypeItems: [],
    docTypeCode:'',
    docType:{},
    assetItems:[],
    assetCode: '',
    assetObject:{}
  
    
  }
},



created(){
  this.getDocuments();
  this.docTypeFunction();
  this.assetsFunction();
  
},
watch:{
  
'$route.params.name': function (name) {
      this.getDocuments()
      this.$router.go(0)

}},


methods: {

docTypeFunction(){
axios.get(`${config.serverURL}/api/v1/documenttype`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.docTypeItems = response.data;
 })
},

assetsFunction(){
axios.get(`${config.serverURL}/api/v1/assets`, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.assetItems = response.data;
 })
},
  
getDocuments(){
this.documentType =this.$route.params.name
axios.get(`${config.serverURL}/api/v1/document/documenttype/` + this.documentType, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.documents = response.data; }) },


DeleteDocument(id:number){

if(confirm("Are you sure you want to delete document and all its items?")){

                axios.delete(`${config.serverURL}/api/v1/document/`+id)
                .then(resp => {
                   alert ('Document deleted');
                   this.$router.go(0);
                })
                .catch(error => {
                    console.log(error);
                })
   }
}
,

DeleteDocumentItem(id:number){

if(confirm("Do you really want to delete this item?")){

                axios.delete(`${config.serverURL}/api/v1/documentitem/`+id)
                .then(resp => {
                   alert ('Document item deleted');
                   this.$router.go(0);
                })
                .catch(error => {
                    console.log(error);
                })
   }
}
,


Edit(document:{} ){

  this.$store.commit('editDocument', document);

},

EditItem(item:{}) {

this.$store.commit('editDocumentItem', item)
},

 EditDocument(code:string, name:string, descr:string,dateDoc:Date, documentType:{}, asset:{}) {
  
  
    axios
      .put(`${config.serverURL}/api/v1/document`, {
        code: code,
        name: name,
        descr: descr,
        dateDoc: dateDoc,
        documentType: documentType,
        asset: asset
        
     
      })
      .then(resp => {
        alert('Data saved')
       this.$router.go(0);
      })
      .catch(function(error) {
        alert(error.response.data.message);
      });


},
 showProduct (documentId: number, documentType:string){

axios.get(`${config.serverURL}/api/v1/documentitem/document/` + documentId
).

then(response => { 
this.products = response.data; }) 

if(documentType == 'prijemnica')
this.show = true
else
this.show = false

 }


  
    }}


</script>


<style scoped>

#inner {
  margin: 0 auto;
}


  div#bg {
  -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    height: 300vh;
  }
</style>