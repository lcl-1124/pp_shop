/*
入口js
*/
import Vue from 'vue'
import {Button,MessageBox } from 'mint-ui'

import App from './App.vue'
import router from './router/index'
import store from './store/index'

//应用成全局组件
Vue.component(Button.name,Button)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
