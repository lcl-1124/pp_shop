<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul class="content">
          <li class="menu-item " v-for="(good,index) in goods" :key="index" 
            :class="{'current': currentIndex === index}"  @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul class="content" ref="foodsUL">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index" @click="toggleFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                    :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <FoodInfo :food="food" ref="food"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  import CartControl from '../../../components/CartControl/CartControl'
  import FoodInfo from '../../../components/FoodInfo/FoodInfo'

  export default {
    data () {
      return {
        scrollY: 0, // 实时记录手指滑动的距离 
        tops: [],   // 保存以此叠加每一个li高度的数组
        food: {},   // 需要显示的food
      }
    },
    mounted() {
      this.$store.dispatch('getShopGoods',() => { // 数据以保存但界面还未更新
        this.$nextTick(() => {
          // 在界面更新完成后创建BScroll对象
          this._initCrollY()
          this._initTops()
        })
      })
    },
    computed: {
      ...mapState(['goods']),
      currentIndex () {
        /*
        拿到滑动前后距离
        判断滑动距离是在tops的哪个范围内
        选中这个左侧的type
        */
        const {scrollY,tops} = this;
        return tops.findIndex((top,index) => (scrollY >= top && scrollY < tops[index+1]))
      }
    },
    methods: {
      // 初始化滚动
      _initCrollY () {
        // 左侧滚动
        new BScroll(".menu-wrapper",{
          click: true
        })
        // 右侧滚动
        this.foodScroll = new BScroll(".foods-wrapper",{
          // probeType: 3  //解决快速滑动不会获取scrollY的问题
          probeType: 2  // 因为惯性滚动不会触发
        })
        // 右侧滚动监听
        this.foodScroll.on('scroll',({x,y})　=> {
          this.scrollY = Math.abs(y);
        })
        // 绑定右侧滚动结束监听  解决快速滑动不会获取scrollY的问题
        this.foodScroll.on('scrollEnd',({x,y}) => {
          this.scrollY = Math.abs(y);
        })
      },
      // 初始化tops
      _initTops () {
        const tops = [];
        /* 向数组里添加数据 */
        // 拿到右侧所有的li
        let lis = this.$refs.foodsUL.children;
        // 定义初始化li高度
        let top = 0;
        tops.push(top)
        // 遍历所有li
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight;
          tops.push(top) 
        })
        /* 更新data */
        this.tops = tops;
      },
      // 点击食品type自动跳转
      clickMenuItem (index) {
        const {tops} = this;
        // 令左侧样式先改变
        this.scrollY = tops[index];
        // 右侧自动滑动
        this.foodScroll.scrollTo(0,-tops[index],300)
      },
      toggleFood (food) {
        this.food = food;
        // 显示foodInfo组件   (父组件调用子组件方法)
        this.$refs.food.showFood()
      }
    },
    components: {
      CartControl,
      FoodInfo
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $blue
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
