<template>
  <div id="app">
    <NavBar/>

    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue"
export default {
  components:{NavBar}
}
</script>


<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";
@import "../node_modules/bootstrap-vue/src/index.scss";
@import "./assets/scss/vendors/bootstrap-vue/_custom.scss";

html, body {
    height:100%; /*both html and body*/
}
body {
    margin: 0; /*reset default margin*/
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -ss-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
  height: 100%;
  width: 100%;
  background-color: $gray-200;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
