/*
包含多个接口请求函数的模块
  返回的还是promise
*/

import ajax from './ajax'

/*
使用后启用代理服务器解决跨域
*/
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api';

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodTypes = () => ajax(BASE_URL + '/index_category')
// 3、根据经纬度获取商铺列表>
export const reqShops = (longitude,latitude) => ajax(BASE_URL + '/shops',{longitude,latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShops = (geohash,keyword) => ajax(BASE_URL + '/search_shops',{geohash,keyword})
// 5、获取一次性验证码
export const reqCaptcha = () => ajax(BASE_URL + '/captcha')
// 6、用户名密码登陆
export const sendPwdLogin = ({name,pwd,captcha}) => ajax(BASE_URL + '/login_pwd',{name,pwd,captcha},'POST')
// 7、发送短信验证码
export const sendcode = (phone) => ajax(BASE_URL + '/sendcode',{phone})
// 8、手机号验证码登陆
export const sendSmsLogin = (phone,code) => ajax(BASE_URL + '/login_sms',{phone,code},'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
// 10、用户登出
export const sendLogout = () => ajax(BASE_URL + '/logout')

//mock、获取点餐列表
export const reqShopGoods = () => ajax('/goods')
//mock、获取评价信息
export const reqRatings = () => ajax('/ratings')
//mock、获取商铺详情
export const reqShopInfo = () => ajax('/info')