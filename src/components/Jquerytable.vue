<template>
  <div>
      <h2>Sequences</h2>
      <table class="table" id="datatable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Header info</th>
            <th>Full sequence</th>
            <th>Thermalstability</th>
                        <th>Key seq</th>


          </tr>
        </thead>
        <tbody>
          <tr v-for="seq in seqs" :key="seq.seq_id">
            <td>{{seq.seq_id}}</td>
            <td>{{seq.header_info}}</td>
            <td>{{seq.full_sequence}}</td>
            <td>{{seq.thermalstability}}</td>
            <td>{{seq.key_seq}}</td>

          </tr>
          
        </tbody>
      </table>    
  </div>
</template>
 
<script>
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import "datatables.net-dt/js/dataTables.dataTables.min.js"
import 'datatables.net-searchbuilder-dt'
import 'datatables.net-searchbuilder-dt/css/searchBuilder.dataTables.min.css'

import "datatables.net-dt/css/jquery.dataTables.min.css"
import axios from 'axios';
import $ from 'jquery'; 

export default {

  mounted(){
    axios
    .get("http://localhost:5000/get")

    .then((response)=>
    {
      this.seqs = response.data;
      setTimeout(() => $('#datatable').DataTable({

      dom: 'Qlfrtip',


      searchBuilder: {
          depthLimit: 2
      }



      }), 100);
    })
  },
  data: function() {
        return {
            seqs:[]
        }
    }

}
</script>