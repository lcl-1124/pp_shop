/*
包含多个通过mutation间接更新state状态的方法的对象模块
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'
import {
  reqAddress,
  reqFoodTypes,
  reqShops
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
  }
}