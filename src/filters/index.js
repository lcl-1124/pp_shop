/*
vue过滤器
  npm install --save moment
  import moment from 'moment' // js时间格式库
*/
import Vue from 'vue'
// import {format} from 'date-fns'  // js时间管理轻量级库
import format from 'date-fns/format'

Vue.filter('dateFormat',function (value,formatStr='yyyy-MM-dd HH:mm:ss') {
  return format(value,formatStr)
})