<template>
  <b-navbar type="dark" variant="info" fixed="top">
      <b-navbar-nav>
        <b-nav-item-dropdown left no-caret>
          <template #button-content>
            <b-icon class="menu-icon" icon="list"></b-icon>
          </template>
          <b-dropdown-item to="/"
            ><b-icon class="menu-icon" icon="house-door"></b-icon
            >Home</b-dropdown-item
          >
          <b-dropdown-item v-if="auth" to="/manager-view"
            ><b-icon class="menu-icon" icon="command"></b-icon
            >Manager</b-dropdown-item
          >
          <b-dropdown-item v-if="isLogged" to="/account"
            ><b-icon class="menu-icon" icon="person"></b-icon
            >Setting</b-dropdown-item
          >
          <b-dropdown-item v-if="!isLogged" to="/login" 
            ><b-icon class="menu-icon" icon="box-arrow-in-right"></b-icon
            >Login/Register</b-dropdown-item
          >
          <b-dropdown-item v-if="isLogged" to="/" @click="logout"
            ><b-icon class="menu-icon" icon="box-arrow-in-right"></b-icon
            >Logout</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-brand to="/">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
import menuList from "../utils/menuList";
export default {
  computed: {
    menuList() {
      return menuList;
    },
    isLogged() {
      return this.$store.state.users.isLogged;
    },
    auth() {
      if (!this.isLogged){
        return false
      }
      return this.$store.state.users.auth;
    },
  },
  methods:{
    logout(){
      this.$store.dispatch('users/logout')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../node_modules/bootstrap/scss/bootstrap";
@import "../../node_modules/bootstrap-vue/src/index.scss";

btn .b-icon.bi,
.nav-link .b-icon.bi,
.dropdown-toggle .b-icon.bi,
.input-group-text .b-icon.bi {
  font-size: 2rem !important;
  color: $gray-400 !important;
}
.dropdown-item .b-icon.bi {
  font-size: 1.2rem !important;
  margin: 5px;
}
.dropdown-item {
  display: flex;
  align-items: center;
}

.bg-info {
  background-color: $gray-900 !important;
}
</style>