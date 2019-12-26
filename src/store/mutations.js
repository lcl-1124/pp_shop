/*
包含多个直接更新state状态的方法的对象模块
*/
import Vue from "vue";

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_SHOP_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART_FOODS,
  SEARCH_SHOP_LIST
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
  },
  [RECEIVE_USER_INFO] (state,{userInfo}) {
    state.userInfo = userInfo;
  },
  [RESET_USER_INFO] (state) {
    // 重置userInfo状态
    state.userInfo = {};
  },
  [SEARCH_SHOP_LIST] (state,{searchShops}) {
    state.searchShops = searchShops;
  },

  // mock数据
  [RECEIVE_SHOP_GOODS] (state,{goods}) {
    state.goods = goods;
  },
  [RECEIVE_RATINGS] (state,{ratings}) {
    state.ratings = ratings;
  },
  [RECEIVE_SHOP_INFO] (state,{shopInfo}) {
    state.shopInfo = shopInfo;
  },
  [INCREMENT_FOOD_COUNT] (state,{food}) {
    // 判断food是否有count属性
    if (!food.count) { // 没有
      // food.count = 1 // 新增属性(没有数据绑定)
      // 更新界面
      Vue.set(food,'count',1) // 让新增属性也有数据绑定
      //将food添加到cartFoods中
      state.cartFoods.push(food)
    } else {  //有
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state,{food}) {
    //判断count是否为零，为零则不去减少
    if (food.count) { // 不为零
      food.count--
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART_FOODS] (state) {
    //重置food中的count
    state.cartFoods.forEach(food => food.count = 0)
    //清空购物车
    state.cartFoods = [];
  }
}