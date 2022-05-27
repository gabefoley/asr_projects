<template>
<div class="container mt-4">
<form @submit.prevent="addGood">

<input 
type="text" 
class="form-control" 
placeholder="Name of good" 
v-model="good_name"

/>
<br/>

<!-- <select class="form-control" @change="changeJobTitle($event)"> -->
	<select v-model="good_type">
<option disabled value="">Please select one</option>

    <option value="Product"  >Product</option>
    <option value="Service"  >Service</option>
    <option value="Process"  >Process</option>

  </select>
  <br><br>
  <!-- <p><span>Selected job title: {{ selectedJobTitle  }}</span></p> -->



<textarea rows="5"
class="form-control"
placeholder="Enter description of good"
v-model="good_description"
>

</textarea>


<button
class = "btn btn-success mt-4"
>
CREATE GOOD

</button>
</form>

<div v-if="error"

class="alert alert-warning alert-dismissible fade show mt-5"
role="alert"
>

<strong> {{error}} </strong>


</div>

<div v-if="created"

class="alert alert-success alert-dismissible fade show mt-5"
role="alert"
>

<strong> {{created}} </strong>


</div>

</div>

</template>

<script>
import axios from 'axios';


export default {

	data() {
	return {
	good_id:null,
	good_name: null,
	good_type:null,
	good_description: null,
	error: null,
	created: null

 


	}


	},

//   mounted(){
//     axios
//     .get("http://localhost:5000/key")

//     .then((response)=>
//     {
//       this.seqs = response.data;
     
//     })
//   },

created(){

},

	methods : {


		addGood() {
		console.log('add good called')
		if(! this.good_name) {

		this.error = "Please add all fields"
		console.log(this.error)
		} else {

		console.log('got here')

		const good = JSON.stringify({good_name:this.good_name, good_type: this.good_type,
		good_description:this.good_description})

		console.log(good)
				console.log(good)

		
		// axios.post("http://localhost:5000/add", good);

		axios.post("http://localhost:5000/add",good,{headers:{"Content-Type" : "application/json"}})
		.then(response => {
			console.log(response)
			this.$forceUpdate();
			this.created = "New good created"
			this.good_name = ""
			this.good_description = ""

		})

		// fetch("http://localhost:5000/add", {
		// method: "POST",
		// headers: {
		// "Content-Type" : "application/json"
		// },
		// body: good
		// })
		// .then((response) => response.json())
		// .then(() => {this.$router.push({
		// name: 'creategood'
		// })
		// })

		}
	
}
}
};


</script>

<style>

</style>
