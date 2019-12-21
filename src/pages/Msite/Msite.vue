<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="this.address.name">
      <span class="header_search" slot="left">
        <i class="iconfont iconsousou"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </section>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  import {mapState} from 'vuex'

  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from "../../components/ShopList/ShopList";

  export default {
    data () {
      return {
        baseImgUrl: 'https://fuss10.elemecdn.com'
      }
    },
    mounted () {
      this.$store.dispatch('getFoodTypes')

      
    },
    computed:{
      ...mapState(['address','categorys']),

      categorysArr () {
        //拿到数据
        const {categorys} = this;
        //定义初始化外数组
        const arr = [];
        /*
        //定义初始化内数组
        let smallArr = [];
        //遍历数据
        categorys.forEach((category,index) => {
          if (smallArr.length === 0) {
            arr.push(smallArr)
          }
          smallArr.push(category)
          if (smallArr.length === 8) {
            smallArr = [];
          }
        })
        */
        let num = categorys.length%8;
        for (let i = 0; i < (categorys.length/8-num); i++) {
          arr[i] = categorys.slice(i*8,i*8+8)
        }
        if (num) {//余数不为零
          arr.push(categorys.slice(-1,num-2))
        }
        return arr
      }
    },
    watch: {
      //界面更新就立即创建Swiper对象
      categorys (value) {//categorys数组中有数据了  在异步更新界面之前执行
        this.$nextTick(() => {//将回调延迟到下次 DOM 更新循环之后执行
          let mySwiper = new Swiper('.swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      }
    },
    components: {
      HeaderTop,
      ShopList
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl" 
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #358FCB
</style>
