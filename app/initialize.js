import 'vueify/lib/insert-css'
import Vue from 'vue/dist/vue.common.js'
import VueRouter from 'vue-router'
import store from 'js/store'
import VueSocketio from 'vue-socket.io'

//Component
import home from "js/components/Home"
import room from "js/components/Room"

Vue.use(VueRouter)
Vue.use(VueSocketio, 'http://127.0.0.1:5000/', store)

const routes = [
   {path: '/', component: home},
   {path: '/room', component: room},
   {path: '/room', query: {join: ':join'}, component: room}
];

const router = new VueRouter({
   mode: 'history',
         routes
});


const app = new Vue({
   router,
   store
}).$mount("#app");
