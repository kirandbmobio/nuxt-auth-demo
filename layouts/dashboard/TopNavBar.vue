<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info" position="sticky">
    <b-navbar-brand v-if="$auth.loggedIn"><nuxt-link to="/" class="topbar">CMS</nuxt-link></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="$auth.loggedIn">
        <b-nav-item><nuxt-link to="/product" class="topbar">Product Management</nuxt-link></b-nav-item>
        <b-nav-item><nuxt-link to="/notifications/user_notification" class="topbar">Notification</nuxt-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->
        <b-navbar-nav v-if="!$auth.loggedIn">
          <b-button variant="info"><nuxt-link to="/auth/login" style="color: white">Login</nuxt-link></b-button>
          <b-button variant="info"><nuxt-link to="/auth/signup" style="color: white">Sign Up</nuxt-link></b-button>
        </b-navbar-nav>
        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <b-nav-item-dropdown v-if="$auth.loggedIn" right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>{{ $auth.user.username }}</em>
          </template>
          <b-dropdown-item href="/user/profile">Profile</b-dropdown-item>
          <b-dropdown-item @click.prevent="signout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
        // 'auth',
        'user'
        // ...
        ])
    },
    methods: {
        signout() {
            localStorage.removeItem('id')
            this.$store.dispatch('logout', false)
        }
    }
}
</script>

<style>
    .topbar {
        text-decoration: none;
        color: white;
    }
</style>