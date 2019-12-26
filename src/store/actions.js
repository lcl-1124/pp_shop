/*
包含多个通过mutation间接更新state状态的方法的对象模块
*/
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
import {
  reqAddress,
  reqFoodTypes,
  reqShops,
  reqUserInfo,
  sendLogout,
  reqShopGoods,
  reqRatings,
  reqShopInfo,
  reqSearchShops
} from '../api/index'

export default {
  //异步获取地址信息
  getAddress ({commit,state}) {
    //处理拿到的参数
    const {latitude,longitude} = state;
    const geohash = latitude + ',' + longitude;
    //发送ajax请求获取数据
    reqAddress(geohash).then(response => {
      const address = response.data;
      commit(RECEIVE_ADDRESS,{address})
    })
  },
  //异步获取食物种类列表
  async getFoodTypes ({commit}) {
    //发送ajax请求获取数据
    const result = await reqFoodTypes();
    if (result.code === 0) {//获取成功
      const categorys = result.data;
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  //异步获取商铺列表
  async getShops ({commit,state}) {
    //处理拿到的参数
    const {longitude,latitude} = state;
    //发送ajax请求获取数据
    const result = await reqShops(longitude,latitude);
    if (result.code === 0) {//获取成功
      const shops = result.data;
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  //同步保存用户登录信息
  saveUserInfo ({commit},userInfo) {
    commit(RECEIVE_USER_INFO,{userInfo})
  },
  //异步获取用户信息
  async getUserinfo ({commit}) {
    const result = await reqUserInfo();
    if (result.code === 0) {
      const userInfo = result.data;
      commit(RECEIVE_USER_INFO,{userInfo})     
    }
  },
  //异步退出登录
  async logoutSend ({commit}) {
    const result = await sendLogout();
    if (result.code === 0) {
      //提交mutation,重置userInfo状态
      commit(RESET_USER_INFO)
    }
  },
  // 异步搜索商铺列表
  async searchShops ({commit,state},keyword) {
    const geohash = state.latitude + "," + state.longitude;
    const result = await reqSearchShops(geohash,keyword);
    if (result.code === 0) {
      const searchShops = result.data;
      commit(SEARCH_SHOP_LIST,{searchShops})
    }
  },

  /*mock数据*/
  //异步获取点餐食品列表
  async getShopGoods ({commit},callback) {
    const result = await reqShopGoods();
    if (result.code === 0) {
      const goods = result.data;
      commit(RECEIVE_SHOP_GOODS,{goods})
      //在数据后调用回调函数
      callback && callback()
    }
  },
  //异步获取评价信息
  async getRatings ({commit},callback) {
    const result = await reqRatings();
    if (result.code === 0) {
      const ratings = result.data;
      commit(RECEIVE_RATINGS,{ratings})
    }
    callback &&　callback()
  },
  //异步获取商铺信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo();
    if (result.code === 0) {
      const shopInfo = result.data;
      commit(RECEIVE_SHOP_INFO,{shopInfo})
    }
  },

  //同步更新食品个数
  foodCounTupdate ({commit},{isAdd,food}) {
    //判断是增加还是减少
    if (isAdd) { // 增加
      commit(INCREMENT_FOOD_COUNT,{food})
    } else { // 减少
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },
  //同步清空购物车
  clearCartFoods ({commit,state}) {
    if (state.cartFoods.length !== 0) {
      commit(CLEAR_CART_FOODS)
    } else {
      return
    }
  }
}