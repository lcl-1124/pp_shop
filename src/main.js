/*
入口js
*/
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import {Button,MessageBox } from 'mint-ui'
import './mock/mockServer'
import './filters/index'

import App from './App.vue'
import router from './router/index'
import store from './store/index'
import loading from './common/image/loading.gif'

// 应用成全局组件
Vue.component(Button.name,Button)

// 图片懒加载
Vue.use(VueLazyload, {  // 使用后内部生成一个lazy
  loading
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
