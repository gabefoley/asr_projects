<template>
<div>
	<h1> Papers </h1>

			<div class="card">
				<Toast/>
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
							<Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
							<Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
						</div>
					</template>

					<template v-slot:end>
						<FileUpload mode="basic" accept="*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="paper_id" :paginator="true" :rows="10" :filters="filters"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
							currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Papers</h5>
							<span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 8%"></Column>
					<Column field="paper_id" header="ID" :sortable="true" headerStyle="width:8%; min-width:2rem">
					<template #body="slotProps">
						<a :href="'paper/' + slotProps.data.paper_id" v-text="slotProps.data.paper_id" />
					</template>
					</Column>


					<Column field="paper_name" header="Name" :sortable="true" headerStyle="width:14%; min-width:10rem;"></Column>
					<!-- <Column field="good_description" header="Description" :sortable="true" headerStyle="width:14%; min-width:10rem;"></Column> -->
					<!-- <Column field="good_type" header="Status" :sortable="true" headerStyle="width:14%; min-width:10rem;"></Column> -->


                    <Column field="paper_short_info" header="Info" :sortable="true" headerStyle="width:42%; min-width:10rem;"></Column>
					<!-- <Column field="paper_description" header="Description" :sortable="true" headerStyle="width:14%; min-width:10rem;"></Column> -->


					<Column field="paper_status" header="Status" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Status</span>
							<span :class="'product-badge status-' + (slotProps.data.paper_status ? slotProps.data.paper_status.toLowerCase() : '')">{{slotProps.data.paper_status}}</span>
						</template>
					</Column>


					<Column headerStyle=" width:14%; min-width:10rem;">
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteProduct(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Paper Details" :modal="true" class="p-fluid">
					<img :src="'images/product/' + product.image" :alt="product.image" v-if="product.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
					<div class="field">
						<label for="paper_name">Name</label>
						<InputText id="name" v-model.trim="product.paper_name" required="true" autofocus :class="{'p-invalid': submitted && !product.paper_name}" />
						<small class="p-invalid" v-if="submitted && !product.paper_name">Name is required.</small>
					</div>
					<div class="field">
						<label for="paper_short_info">Short Info</label>
						<Textarea id="paper_short_info" v-model="product.paper_short_info" required="true" rows="1" cols="20" />
					</div>
					<div class="field">
						<label for="description">Full Description</label>
						<Textarea id="description" v-model="product.paper_description" required="true" rows="3" cols="20" />
					</div>

					<div class="field">
						<label for="inventoryStatus" class="mb-3">Paper Status</label>
						<Dropdown id="inventoryStatus" v-model="product.paper_status" :options="statuses" optionLabel="label" placeholder="Select a Type">
							<template #value="slotProps">
								<div v-if="slotProps.value && slotProps.value.value">
									<span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
								</div>
								<!-- <div v-else-if="slotProps.value && !slotProps.value.value">
									<span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
								</div> -->
								<span v-else>
									{{slotProps.placeholder}}
								</span>
							</template>
						</Dropdown>
					</div>


					<template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="product">Are you sure you want to delete <b>{{product.good_name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="product">Are you sure you want to delete the selected papers?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
					</template>
				</Dialog>
			</div>
	</div>

</template>

<script>
import {FilterMatchMode} from 'primevue/api';
import ProductService from '../service/ProductService';
import axios from 'axios';

export default {
	data() {
		return {
			products: null,
			productDialog: false,
			deleteProductDialog: false,
			deleteProductsDialog: false,
			product: {},
			selectedProducts: null,
			filters: {},
			submitted: false,
			statuses: [
				{label: 'REVIEW', value: 'review'},
				{label: 'PLANNING', value: 'planning'},
				{label: 'PUBLISHED', value: 'published'}
			]
		}
	},
	productService: null,
	created() {
		this.productService = new ProductService();
		this.initFilters();
	},
	mounted() {
		// this.productService.getProducts().then(data => this.products = data);
        axios.get("http://localhost:5000/papers/get").then((response)=>
        {
			console.log('got the paper response')
            console.log(response.data)
            this.products = response.data
        })

	},
	methods: {
		formatCurrency(value) {
			if(value)
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			return;
		},
		openNew() {
			this.product = {};
			this.submitted = false;
			this.productDialog = true;
		},
		hideDialog() {
			this.productDialog = false;
			this.submitted = false;
		},
		saveProduct(event) {
			this.submitted = true;

            event.preventDefault()
            console.log('saving product')
			if (this.product.paper_name.trim()) {
			if (this.product.paper_id) {
                console.log("ID exists")
                console.log('CHECK VLUES HERE')
                console.log(this.product)
				this.product.paper_status = this.product.paper_status.value ? this.product.paper_status.value: this.product.paper_status;
				// this.products[this.findIndexById(this.product.good_id)] = this.product;
                console.log(this.product.paper_status)
                const good = JSON.stringify({paper_name:this.product.paper_name, paper_short_info:this.product.paper_short_info, paper_description: this.product.paper_description, paper_status: this.product.paper_status})
                console.log(good)
                axios.put("http://localhost:5000/papers/update/" + this.product.paper_id, good,{headers:{"Content-Type" : "application/json"}                  // <== add this field
 }).then(response => {
                        console.log(response)})
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
				}
				else {
                    console.log('Creating a new paper')
                    console.log(this.product)
					// this.product.id = this.createId();
					this.product.paper_status = this.product.paper_status.value ? this.product.paper_status.value: this.product.paper_status;
					const good = JSON.stringify({paper_name:this.product.paper_name, paper_short_info : this.product.paper_short_info, paper_description: this.product.paper_description, paper_status: this.product.paper_status})
                    console.log(good)
                    axios.post("http://localhost:5000/papers/add",good,{headers:{"Content-Type" : "application/json"}}).then(response => {
                        console.log(response)


		})
					// this.product.good_type = this.product.good_type ? this.product.good_type.value : 'INSTOCK';
					this.products.push(this.product);
					this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
				}
				this.productDialog = false;
				this.product = {};
			}
		},
		editProduct(product) {
			this.product = {...product};
			this.productDialog = true;
		},
		confirmDeleteProduct(product) {
			this.product = product;
			this.deleteProductDialog = true;
		},
		deleteProduct() {
			this.products = this.products.filter(val => val.id !== this.product.id);
			this.deleteProductDialog = false;
	
			console.log('delete stuff')
			axios.delete("http://localhost:5000/papers/delete/" + this.product.paper_id,{headers:{"Content-Type" : "application/json"}                  // <== add this field
 }).then(response => {
                        console.log(response)})

			this.product = {};
			this.$toast.add({severity:'success', summary: 'Successful', detail: 'Paper Deleted', life: 3000});
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.products.length; i++) {
				if (this.products[i].id === id) {
					index = i;
					break;
				}
			}
			return index;
		},
		createId() {
			let id = '';
			var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			for ( var i = 0; i < 5; i++ ) {
				id += chars.charAt(Math.floor(Math.random() * chars.length));
			}
			return id;
		},
		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			this.deleteProductsDialog = true;
		},
		deleteSelectedProducts() {
			console.log('delete selected products')
			this.products = this.products.filter(val => !this.selectedProducts.includes(val));
			this.deleteProductsDialog = false;
			this.selectedProducts = null;
			this.$toast.add({severity:'success', summary: 'Successful', detail: 'Papers Deleted', life: 3000});
		},
		initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }
	}
}
</script>

<style scoped lang="scss">
@import '../assets/demo/badges.scss';
</style>
