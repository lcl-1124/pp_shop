/*
包含多个mutation的type名称常量的模块
*/
export const RECEIVE_ADDRESS = 'receive_address';   // 接收位置信息
export const RECEIVE_CATEGORYS = 'receive_categorys'  // 接收食物分类列表
export const RECEIVE_SHOPS = 'receive_shops'        // 接收商铺列表
export const RECEIVE_USER_INFO = 'receive_user_info'  // 接收用户信息
export const RESET_USER_INFO = 'reset_user_info'  // 重置userInfo

//mock数据
export const RECEIVE_SHOP_GOODS = 'receive_shop_goods'  // 获取点餐食品信息
export const RECEIVE_RATINGS = 'receive_goods'  // 获取评价信息
export const RECEIVE_SHOP_INFO = 'receive_shop_info'  // 获取商铺信息
export const INCREMENT_FOOD_COUNT = 'increment_food_count' // 添加食品个数
export const DECREMENT_FOOD_COUNT = 'decrement_food_count' // 减少食品个数
export const CLEAR_CART_FOODS = 'clear_cart_foods' // 清空购物车