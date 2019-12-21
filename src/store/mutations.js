/*
包含多个直接更新state状态的方法的对象模块
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state,{address}) {
    state.address = address;
  },
  [RECEIVE_CATEGORYS] (state,{categorys}) {
    state.categorys = categorys;
  },
  [RECEIVE_SHOPS] (state,{shops}) {
    state.shops = shops;
  }
}