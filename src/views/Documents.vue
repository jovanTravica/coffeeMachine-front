<template>
  <div>
      <Navbar/>


      <v-data-table :items="documents"
                    :headers="headers"
                    
    class="elevation-1"
  >
                    
        <template slot="item" slot-scope="row">
<tr v-on:click="showProduct(row.item.id); show=true" >
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

      <td class="text-xs-right"> <v-edit-dialog
          :return-value.sync="row.item.dateFrom"
          large
      persistent>
         {{ row.item.dateFrom }}
          <template v-slot:input>
             <v-text-field
            v-model="row.item.dateFrom"
            label="Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
           <v-date-picker
          v-model="row.item.dateFrom" ></v-date-picker>
          </template>
            </v-edit-dialog></td>

      <td class="text-xs-right"> <v-edit-dialog
          :return-value.sync="row.item.dateTo"
          large
      persistent>
         {{ row.item.dateTo }}
          <template v-slot:input>
             <v-text-field
            v-model="row.item.dateTo"
            label="Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
           <v-date-picker
          v-model="row.item.dateTo" ></v-date-picker>
          </template>
            </v-edit-dialog></td>
            
      <td class="text-xs-right" >  <v-edit-dialog
          :return-value.sync="row.item.storage.name"
           large
      persistent>
          {{ row.item.storage.name}}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.storage.name" ></v-text-field>
          </template>
            </v-edit-dialog>
            </td>

<td class="text-xs-right" >  <v-edit-dialog
          :return-value.sync="row.item.documentType.name"
           large
      persistent>
          {{ row.item.documentType.name}}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.documentType.name" ></v-text-field>
          </template>
            </v-edit-dialog>
            </td>

            <td class="text-xs-right" >  <v-edit-dialog
          :return-value.sync="row.item.documentState.name"
           large
      persistent>
          {{ row.item.documentState.name}}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.documentState.name" ></v-text-field>
          </template>
            </v-edit-dialog>
            </td>


      <td class="text-xs-right"> <router-link to="/documentsedit" class="btn btn-primary" tag="button"  v-on:click.native="Edit(row.item)" value="buttons"> Edit </router-link> <button type="button" class="btn btn-danger" v-on:click="DeleteDocument(row.item.id)">Delete</button>   <button type="button" class="btn btn-danger" v-on:click="EditDocument(row.item.code, row.item.name,row.item.descr,row.item.dateDoc,row.item.dateFrom,row.item.dateTo,row.item.storage,row.item.documentType, documentState)">Save</button></td>
</tr>
    </template>

      </v-data-table>

<div id="inner" class="col-sm-6 col-md-2 col-md-offset-4">
<router-link to="/documentscreate" class="btn btn-dark" tag="button"> Create new document </router-link>
      </div>

      <v-data-table :items="products"
                    :headers="headersItem"
                    v-show="show"
    class="elevation-1"
  >
                    
        <template slot="item" slot-scope="row">
<tr>
      <td class="text-xs-right">{{ row.item.code }}</td>

      <td class="text-xs-right">
        <v-edit-dialog
          :return-value.sync="row.item.name"
          large
      persistent>
          {{ row.item.name }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.name" ></v-text-field>
          </template>
            </v-edit-dialog>
             </td>


      <td class="text-xs-right">
        <v-edit-dialog
          :return-value.sync="row.item.descr"
          large
      persistent>
          {{ row.item.descr }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.descr" ></v-text-field>
          </template>
            </v-edit-dialog></td>


            
      <td class="text-xs-right">
        <v-edit-dialog
          :return-value.sync="row.item.quantity"
          large
      persistent>
          {{ row.item.quantity }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.quantity" ></v-text-field>
          </template>
            </v-edit-dialog>
             </td>


             <td class="text-xs-right">
        <v-edit-dialog
          :return-value.sync="row.item.amount"
          large
      persistent>
          {{ row.item.amount }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.amount" ></v-text-field>
          </template>
            </v-edit-dialog>
             </td>



               <td class="text-xs-right">
        <v-edit-dialog
          :return-value.sync="row.item.grossAmount"
          large
      persistent>
          {{ row.item.grossAmount }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.grossAmount" ></v-text-field>
          </template>
            </v-edit-dialog>
             </td>


                <td class="text-xs-right">
        <v-edit-dialog
          :return-value.sync="row.item.document.name"
          large
      persistent>
          {{ row.item.document.name }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.document.name" ></v-text-field>
          </template>
            </v-edit-dialog>
             </td>


                   <td class="text-xs-right">
        <v-edit-dialog
          :return-value.sync="row.item.documentItemType.name"
          large
      persistent>
          {{ row.item.documentItemType.name }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.documentItemType.name" ></v-text-field>
          </template>
            </v-edit-dialog>
             </td>


                <td class="text-xs-right">
        <v-edit-dialog
          :return-value.sync="row.item.product.name"
          large
      persistent>
          {{ row.item.product.name }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.product.name" ></v-text-field>
          </template>
            </v-edit-dialog>
             </td>


                <td class="text-xs-right">
        <v-edit-dialog
          :return-value.sync="row.item.measurement.name"
          large
      persistent>
          {{ row.item.measurement.name }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.measurement.name" ></v-text-field>
          </template>
            </v-edit-dialog>
             </td>


                <td class="text-xs-right">
        <v-edit-dialog
          :return-value.sync="row.item.asset.name"
          large
      persistent>
          {{ row.item.asset.name }}
          <template v-slot:input>
           <v-text-field
          v-model="row.item.asset.name" ></v-text-field>
          </template>
            </v-edit-dialog>
             </td>
</tr>
        </template>
      </v-data-table>

      <div id="inner" class="col-sm-6 col-md-2 col-md-offset-4">
<router-link to="/documentsitemcreate" class="btn btn-dark lg" tag="button"> Create new item   </router-link>
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
          { text: 'Date', value: 'date' },
          { text: 'Date from', value: 'dateFrom' },
          { text: 'Date to', value: 'dateTo' },
          { text: 'Storage', value: 'storage'},
          {text: 'Document type', value:'documentType'},
           {text: 'State', value:'state'},
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
          { text: 'Document', value: 'document'},
          {text: 'Document item type', value:'documentItemType'},
           {text: 'Product', value:'product'},
            {text: 'Measurement', value:'measurement'},
            {text: 'Asset', value:'asset'}
    
        ],
    documents : [],
    documentsFilter : [],
    products : [],
    filteredProducts : [],
    documentType: ''
    
  }
},



created(){
  this.getDocuments()
},
watch:{
  
'$route.params.name': function (name) {
      this.getDocuments()

}},


methods: {

  
getDocuments(){
this.documentType =this.$route.params.name
axios.get(`${config.serverURL}/api/v1/document/documenttype/` + this.documentType, {headers: {
	  'Access-Control-Allow-Origin': '*',
	},}).

then(response => { 
this.documents = response.data; }) },


DeleteDocument(id:number){

if(confirm("Do you really want to delete?")){

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


Edit(document:{} ){

  this.$store.commit('editDocument', document);

},

//  EditDocument(code:string, name:string, adress:string, descr:string,dateDoc:Date, dateFrom:Date, dateTo:Date) {
  
//     axios
//       .post(`${config.serverURL}/api/v1/document`, {
//         code: code,
//         name: name,
//         descr: descr,
//         adress: adress,
//         dateFrom: dateFrom,
//         dateTo: dateTo,
        
     
//       })
//       .then(resp => {
//         this.$router.push("/document");
//       })
//       .catch(function(error) {
//         alert(error.response.data.message);
//       });


// },
 showProduct (documentId: number){
const show = true;
axios.get(`${config.serverURL}/api/v1/documentitem/document/` + documentId
).

then(response => { 
this.products = response.data; }) 

 }


  
    }}


</script>


<style scoped>

#inner {
  margin: 0 auto;
}
</style>