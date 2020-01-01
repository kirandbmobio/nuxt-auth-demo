<template>
  <div>
    <b-container>
        <b-row>
          <b-col></b-col>
          <b-col>
            <div v-if="errors.length">
                <div v-for="(error,id) in errors" :key="id">
                    <b-alert variant="danger" show>{{error}}</b-alert>
                </div>
            </div>
            <b-card style="margin-top:20px">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                    id="input-group-1"
                    label="Full Name"
                    label-for="input-1"
                >
                    <b-form-input
                    id="input-1"
                    v-model="form.username"
                    required
                    placeholder="Full Name"
                    ></b-form-input>
                </b-form-group>

                <!-- <b-form-group id="input-group-2" label="Your Email:" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter Email"
                    ></b-form-input>
                </b-form-group> -->
                <b-form-group id="input-group-3" label="Your Password:" label-for="input-3">
                    <b-form-input
                    id="input-3"
                    v-model="form.password"
                    type="password"
                    required
                    placeholder="Enter password"
                    ></b-form-input>
                </b-form-group>
                <!-- <b-form-group id="input-group-4">
                    <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
                    <b-form-checkbox value="me">Check me out</b-form-checkbox>
                    <b-form-checkbox value="that">Check that out</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group> -->

                <b-button type="submit" variant="primary">Sign Up</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
                <p></p>
                <p>If You are already sign up <nuxt-link to="/">Click Here</nuxt-link></p>
            </b-form>
            </b-card>
            <!-- <b-card class="mt-3" header="Form Data Result">
                <pre class="m-0">{{ form }}</pre>
            </b-card> -->
          </b-col>
          <b-col></b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
        //   name: ''
        },
        show: true,
        message: ''
      }
    },
    computed: {
        ...mapGetters([
            'errors'
        ])
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault()
        try {
            this.$store.dispatch('signup', this.form)
        } catch (err) {
            this.message = "Please Enter Valid Data"
        }
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
        
      }
    }
}
</script>

<style>
    
</style>