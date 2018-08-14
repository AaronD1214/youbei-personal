<template>
  <div class="content">
      <div class="logo">
          <img src="../../assets/logo.png">
      </div>
      <p class="logoTitle">游呗个人</p>
    <group class="inputBox" label-width="4.5em" label-margin-right="1em" label-align="right">
      <x-input style="height: 36px;" title="" mask="999 9999 9999" placeholder="请输入手机号" v-model="phone" :max="13" is-type="china-mobile"></x-input>
      <x-input style="height: 36px;" title="" mask="" placeholder="请输入登录密码" v-model="password" type="password"></x-input>
    </group>
      <x-button class="login-btn" type="primary" @click.native ="submitLogin">登 录</x-button>
      <p class="forgetPsd" @click="forgetPassword">忘记密码？设置新密码</p>
      <p class="goQuickLogin" @click="goQuickLogin">手机验证码登录</p>
      <!--<div class="line"></div>-->
      <!--<img class="wx-logo" src="../../assets/wx_icon3.png">-->
  </div>
</template>

<script>
  import { Group,Cell ,XInput ,XButton  } from 'vux'
  import {httpUrl} from '../../http_url';

export default {
  name: 'HelloWorld',
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  components: {
    Group,
    Cell,
    XInput,
    XButton
  },
  methods:{
      goQuickLogin(){
          this.$router.push('/quick_login');
      },
    submitLogin(){
        const phone = this.SpaceTransformation(this.phone);
        let postData = this.$qs.stringify({
            phone:this.SpaceTransformation(this.phone),
            password:this.password
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
        }else if(this.isEmpty(this.password)){
            this.$vux.toast.show({
                type:'warn',
                text: '请输入登录密码'
            })
            return
        }else {
            this.$axios({
                method: 'post',
                url:httpUrl.passwordLogin,
                data:postData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
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

    },
      forgetPassword(){
          this.$router.push('/forget_psd');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
a {
  color: #42b983;
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
  .forgetPsd{
      text-align: left;
      font-size: 14px;
      color: #666;
      margin: 20px 10px;
  }
.login-btn{
  margin-top: 30px;
}
.goQuickLogin{
    font-size:18px;
    height:30px;
    line-height:30px;
    color:#3c69af;
    margin-top: 40px;
    margin-bottom: 6px;
    cursor:pointer
}
.weui-cells:before{
    border-top: none!important;
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
