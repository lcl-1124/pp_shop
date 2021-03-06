/*
包含多个基于state的计算属性对象的模块
*/
export default {
  totalCount (state) {
    return state.cartFoods.reduce((preCount,food) => preCount + food.count,0)
  },
  totalPrice (state) {
    return state.cartFoods.reduce((preCount,food) => preCount + food.count*food.price,0)
  },
  godReview (state) {
    return state.ratings.reduce((preCount,rating) => preCount + (rating.rateType === 0 ? 1 : 0),0)
  },
}