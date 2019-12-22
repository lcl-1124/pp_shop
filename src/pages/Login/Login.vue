<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">FoodShop</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: isSMSLogin}" @click="isSMSLogin = true">短信登录</a>
          <a href="javascript:;" :class="{on: !isSMSLogin}" @click="isSMSLogin = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.passive="login">
          <div :class="{on: isSMSLogin}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!isRightGetPhone" class="get_verification" :class="{rightPhone: isRightGetPhone}" 
                @click.prevent="getSendcode">{{computeTime? `已发送(${computeTime})`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册FoodShop帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !isSMSLogin}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-if="!showPwd">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button" @click="showPwd = !showPwd" :class="showPwd?'on':'off'">
                  <div class="switch_circle" :class="showPwd?'right':''"></div>
                  <span class="switch_text">{{showPwd? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="breakCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont iconxiangyoujiantouarrowleft-copy"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" @closeTip="closeTip" v-show="alertShow"/>
  </section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {sendcode,sendSmsLogin,sendPwdLogin} from '../../api/index'
  export default {
    data () {
      return {
        isSMSLogin: true,   //短信登录： true；账号密码登录：false
        showPwd: false,     //是否显示密码
        computeTime:0,      //倒计时
        phone: '' ,         //手机号
        code:'',            //短信验证码
        name:'',            //用户名
        pwd: '',            //密码 
        captcha: '',        //图形验证码
        alertText: '',      //警告文本
        alertShow: false,   //是否显示警告框
      }
    },
    computed: {
      isRightGetPhone () {//符合返回true，不符合返回false
        const {phone} = this;
        return /^1\d{10}$/.test(phone)
      }
    },
    methods: {
      //异步获取短信验证码
      async getSendcode () {
        if (!this.computeTime) {
          //进行前台表单验证
          this.computeTime = 30;
          this.intervalId = setInterval(() => {
            this.computeTime--
            if (!this.computeTime) {
              clearInterval(this.intervalId)
            }
          },1000)
          //发送ajax请求，获取SMS验证码
          const result = await sendcode(this.phone);
          if (result.code === 1) {//失败
            //弹出警告提示框
            this.showAlert(result.msg)
            //停止倒计时
            if (this.computeTime) {
              this.computeTime = 0;
              clearInterval(this.intervalId)
              this.intervalId = undefined;
            }
          }
        }
      },
      //显示警告框
      showAlert (Text) {
        this.alertShow = true;
        this.alertText = Text;
      },
      //关闭警告框
      closeTip () {
        this.alertShow = false;
        this.alertText = '';
      },
      //异步登录
      login () {
        /*前台表单验证*/
        const {isRightGetPhone,code,name,pwd,captcha} = this;
        if (this.isSMSLogin) {//手机短信验证
          if (!isRightGetPhone) {
            //请正确输入手机号
            this.showAlert('请正确输入手机号')
          } else if (!/^\d{6}$/.test(code)) {
            //请正确输入验证码
            this.showAlert('请正确输入验证码')
          }
        } else {//用户名密码登录
          if (!name) {
            //用户名必须指定
            this.showAlert('用户名必须指定')
          } else if (!pwd) {
            //密码必须指定
            this.showAlert('密码必须指定')
          } else if (!captcha) {
            //请输入图片验证码
            this.showAlert('请输入图片验证码')
          }
        }
      },
      //刷新图片验证码
      breakCaptcha (event) {
        //只有src不同时才会刷新，添加一个query请求参数
        event.target.src = 'http://localhost:4000/captcha?time=' + Date.now();
      }
    },
    components: {
      AlertTip
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #358FCB
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #358FCB
              font-weight 700
              border-bottom 2px solid #358FCB
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #358FCB
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.rightPhone
                  color black 
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #358FCB
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #358FCB
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #61AFEF
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
