import Vue from "vue/dist/vue.common.js"
import Vuex from "vuex"

import socket from "./modules/socket"

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      socket
   },
})