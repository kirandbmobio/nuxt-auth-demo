<template>
    <div>
        <b-container>
            <h1>Product Details</h1>
            <b-row class="mb-2">
                <b-col class="text-sm-right">
                    <b-button size="sm" @click.prevent="block = !block">Create Product</b-button>
                </b-col>
            </b-row>
            <b-card v-if="block">
                    <b-row class="mb-2" v-if="validate">
                        <b-col sm="5" class="text-sm-right">
                            <p style="color: red">{{validate.message}}</p>
                        </b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Name:</b></b-col>
                        <b-col sm="5"><b-input type="text" placeholder="Enter Product Name" v-model="form.name" /></b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Title:</b></b-col>
                        <b-col sm="5"><b-input type="text" placeholder="Enter Product Title" v-model="form.title" /></b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
                        <b-col sm="5"><b-input type="text" placeholder="Enter Product Description" v-model="form.description" /></b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Price:</b></b-col>
                        <b-col sm="5"><b-input type="text" placeholder="Enter Product Price" v-model="form.price" /></b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col sm="4" class="ml-1 text-sm-right">
                            <b-button size="sm" @click.prevent="createProduct">Create</b-button>
                        </b-col>
                    </b-row>
                </b-card>
            <b-table responsive striped hover :fields="fields" :items="products">
            <template v-slot:cell(action)="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">Edit</b-button>
                <b-button size="sm" @click="deleteProduct(row.item._id)" class="mr-2">Delete</b-button>
                <!-- <b-button size="sm" @click="row.toggleDetails" class="mr-2"></b-button> -->
                <!-- <nuxt-link :to="{name: 'edit-product', params: {id: row.item._id}}">edit</nuxt-link> 
                <a href="#">update</a>
                <a href="#">delete</a> -->
            </template>
            <template v-slot:row-details="row">
                <b-card>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Name:</b></b-col>
                        <b-col><b-input type="text" v-model="row.item.name" /></b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Title:</b></b-col>
                        <b-col><b-input type="text" v-model="row.item.title" /></b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
                        <b-col><b-input type="text" v-model="row.item.description" /></b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Price:</b></b-col>
                        <b-col><b-input type="text" v-model="row.item.price" /></b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col sm="4" class="ml-1 text-sm-right">
                            <b-button size="sm" @click.prevent="editproducts(row)">Update</b-button>
                        </b-col>
                    </b-row>
                </b-card>
            </template>
            </b-table>
        </b-container>
    </div>
</template>

<script>
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            block: false,
            form :{
                name: '',
                title: '',
                description: '',
                price: ''
            },
            validate:{},
            fields: [
                {
                    key: 'name',
                    sortable: true
                }, 
                {
                    key: 'title',
                    sortable: true
                }, 
                {
                    key: 'description',
                    sortable: true
                }, 
                {
                    key: 'price',
                    sortable: true
                },
                'action'
                ]
        }
    },
    computed: {
        ...mapGetters(
            {
                products:'products',
                user: 'user'
            }
            )
    },
    methods: {
        async getProducts() {
            try {
                this.$store.dispatch('getproducts')
            }catch(err) {
                console.log(err)
            }
        },
        async createProduct() {
            if(!this.form.name || !this.form.title || !this.form.description || ! this.form.price) {
                this.validate = {
                    message: 'All field are required'
                }
            } else {
                let response = await axios.post('/products', this.form)
                this.block = false
                this.products.push(response.data.user)
                this.form = {
                    name: '',
                    title: '',
                    description: '',
                    price: ''
                }
            }
        },
        async editproducts(row) {
            row.toggleDetails()
            this.$store.dispatch('updateproduct', row.item)
            this.products.map(product => {
                if(product._id == row.item._id) {
                    product.name = row.item.name
                    product.title = row.item.title
                    product.description = row.item.description
                    product.price = row.item.price
                }
            })
        },
        async deleteProduct(id) {
            this.$store.dispatch('deleteproduct', id)
            for( var i = 0; i < this.products.length; i++){ 
                if ( this.products[i]._id === id) {
                    this.products.splice(i, 1);
                }
            }
        } 
    },
    async mounted() {
        await this.getProducts()
    },
}
</script>

<style lang="">
    
</style>