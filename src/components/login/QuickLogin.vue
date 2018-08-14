<template>
  <div class="content">
      <div class="logo">
          <img src="../../assets/logo.png">
      </div>
      <p class="logoTitle">游呗个人</p>
    <group class="inputBox" label-width="3em" label-margin-right="1em" label-align="right" >
      <x-input mask="999 9999 9999"
               style="height: 36px;"
               v-model="phone"
               :max="13"
               placeholder="请输入手机号"
               is-type="china-mobile">
      </x-input>
      <x-input placeholder="请输入验证码" class="weui-vcode" style="height: 36px;" v-model="identifyCode">
        <x-button v-show="show" class="identifyCode-btn" slot="right" type="primary" @click.native ="getCode" mini>发送验证码</x-button>
          <x-button v-show="!show" disabled class="identifyCode-btn" slot="right" style="color: #000;font-size: 16px;margin-top: 0" mini>
              <countdown v-model="time" :start="start" @on-finish="finish" style="color: #000;font-size: 16px;"></countdown> s
          </x-button>
      </x-input>
    </group>
    <x-button class="login-btn" type="primary" @click.native ="loginSubmit">登 录</x-button>
    <p type="text" class="goLogin" @click="goLogin">账号密码登录</p>
      <!--<div class="line"></div>-->
      <!--<img class="wx-logo" src="../../assets/wx_icon3.png">-->
  </div>
</template>

<script>
  import { Group,Cell ,XInput ,XButton ,Alert,Countdown  } from 'vux'
  import {httpUrl} from '../../http_url';

export default {
  name: 'HelloWorld',
  data () {
    return {
        show: true,
        phone: '',
        identifyCode:'',
        time:60,
        start: false
    }
  },
  components: {
    Group,
    Cell,
    XInput,
    XButton, Alert,Countdown
  },
  methods: {
    getCode(){
      console.log(this.SpaceTransformation(this.phone));
      let postData = this.$qs.stringify({
        phone:this.SpaceTransformation(this.phone),
        type:100
      })
      this.$axios({
        method: 'post',
        url:httpUrl.getCode,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data:postData
      }).then((res)=>{
        console.log(res.data)
        if(res.data.errCode==200){
            this.$vux.toast.show({
                text: '验证码发送成功'
            });
            this.show = false;
            this.start = true;
        }else if(res.data.errCode==201){
            this.$vux.toast.show({
                type:'warn',
                text: res.data.retMsg
            })
        }
      }).catch(function () {
          this.$vux.toast.show({
              text: '网络异常，请稍后再试',
              type:'warn'
          })
      });
    },
      finish (index) {
          this.start = false;
          this.time = 60;
          this.show = true;
      },
      goLogin(){
          this.$router.push('/login');
      },
    loginSubmit(){
        const phone = this.SpaceTransformation(this.phone);

      let postData = this.$qs.stringify({
          phone:this.SpaceTransformation(this.phone),
          code:this.identifyCode
      })

        if(this.isEmpty(phone)){
            this.$vux.toast.show({
                type:'warn',
                text: '请输入手机号'
            })
            return
        }else if(!this.Val.isPhoneNum(phone)){
            this.$vux.toast.show({
                type:'warn',
                text: '请输入正确手机号'
            })
            return
        }else if(this.isEmpty(this.identifyCode)){
            this.$vux.toast.show({
                type:'warn',
                text: '请输入验证码'
            })
            return
        }else {
            this.$axios({
                method: 'post',
                url:httpUrl.codeLogin,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data:postData
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.$router.push('/home');
                }else if(res.data.errCode==201){
                    this.$vux.toast.show({
                        type:'warn',
                        text: res.data.retMsg
                    })
                }
            }).catch(function () {
                this.$vux.toast.show({
                    text: '网络异常，请稍后再试',
                    type:'warn'
                })
            });
        }


    }
  },
  filters: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .weui-cells:after{
        border-bottom: none;
    }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.content{
    height: 100vh;
    background: #f2f2f2;
    padding:0 10px;
    text-align: center
}
    .logo{
        width: 80px;
        height: 80px;
        position: relative;
        top:40px;
        border-radius: 100%;
        background: #fff;
        margin: 0 auto;
    }
  .logo img{
      width: 50px;
      height: 50px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
  }
    .logoTitle{
        font-size: 22px;
        color:#3c69af;
        margin-top: 50px;
    }
.inputBox{
    margin-top: 30px;
}
.identifyCode-btn{
    width: 100px;
  height: 36px;
  line-height: 36px;
}
    .login-btn{
    margin-top: 30px;
    }

    .goLogin{
        font-size:18px;
        height:30px;
        line-height:30px;
        color:#3c69af;
        margin-top: 82px;
        margin-bottom: 6px;
        cursor:pointer
    }
.line{
    width: 50%;
    border-top: 1px solid #dcdcdc;
    margin: 0 auto;
}
.wx-logo{
    width: 40px;
    height: 40px;
    margin-top: 10px;
}
</style>
