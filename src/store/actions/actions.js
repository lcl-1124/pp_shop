/*
包含多个action creator函数模块
*/

import {
  reqAddress,
  reqFoodTypes,
  reqShops,
  reqSearchShops,
  reqCaptcha,
  sendLoginPwd,
  reqSendcode,
  sendLoginSms,
  reqUserinfo,
  reqLogout
} from '../../api/index'

// export function getAddress (geohash) {
//   return async dispatch => {
//     const result = await reqAddress(geohash)
//     if (result.code === 0) {//获取成功
//       //分发一个mutation
//     }
//   }
// } 