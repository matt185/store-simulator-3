import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import users from "./users";
import items from "./items";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    items,
  },
  plugins: [createPersistedState()],
});
