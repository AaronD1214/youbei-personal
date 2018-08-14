<template>
  <div  class="content">
      <div class="logo">
          <img src="../../assets/logo.png">
      </div>
      <p class="logoTitle">游呗个人</p>
    <group class="inputBox" label-width="4.5em" label-margin-right="1em" label-align="justify">
      <x-input mask="999 9999 9999"
               v-model="phone"
               :max="13"
               style="padding-left: 20px;"
               placeholder="请输入手机号"
               is-type="china-mobile">
      </x-input>
      <x-input placeholder="请输入验证码" class="weui-vcode" style="padding-left: 20px;" v-model="identifyCode">
          <x-button v-show="show" class="identifyCode-btn" slot="right" type="primary" @click.native ="getCode" mini>发送验证码</x-button>
          <x-button v-show="!show" disabled class="identifyCode-btn" slot="right" style="color: #000;font-size: 16px;margin-top: 0" mini>
              <countdown v-model="time" :start="start" @on-finish="finish" style="color: #000;font-size: 16px;"></countdown> s
          </x-button>
      </x-input>
        <x-input placeholder="设置登录密码" v-model="password" style="padding-left: 20px;" @on-blur="blurPassword" type="password"></x-input>
        <x-input placeholder="请再次输入登录密码" :equal-with="password" style="padding-left: 20px;" v-model="passwordAgain" @on-blur="blurPasswordAgain" type="password"></x-input>
    </group>
    <x-button class="login-btn" type="primary" @click.native ="submit">完 成</x-button>
      <p style="font-size: 14px;color: #666;margin-top: 15px">密码格式为6-16位数字，字母或符号，不允许有空格。新密码不能与旧密码相同</p>
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
        time:60,
        start: false,
        phone: '',
        identifyCode:'',
        password:'',
        passwordAgain:''
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
        type:101
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
      blurPassword(){
          const _this = this;
        if(this.isEmpty(this.password)){
            this.$vux.alert.show({
                title: '错误提示',
                content: '请输入密码',
                onHide () {

                }
            })
            return
        }else if(!this.Val.isPassWord(this.password) || this.password.length<6){
            this.$vux.alert.show({
                title: '错误提示',
                content: '新密码必须为6位以上的英文和数字组成',
                onHide () {
                    _this.password = ''
                }
            })
        }
      },
      blurPasswordAgain(){
          const _this = this;
          if(this.isEmpty(this.passwordAgain)){
              this.$vux.alert.show({
                  title: '错误提示',
                  content: '请输入密码',
                  onHide () {

                  }
              })
              return
          }else if(this.passwordAgain != this.password){
              this.$vux.alert.show({
                  title: '错误提示',
                  content: '两次密码输入不一致',
                  onHide () {
                      _this.passwordAgain = ''
                  }
              })
          }
      },
    submit(){
          const _this = this;
          let postData = this.$qs.stringify({
          type:10,
          phone:this.SpaceTransformation(this.phone),
          code:this.identifyCode,
          password:this.password,
          ckpassword:this.passwordAgain,
      })

        if(this.isEmpty(this.passwordAgain)){
            this.$vux.alert.show({
                title: '错误提示',
                content: '请输入密码',
                onHide () {

                }
            })
            return
        }else if(this.passwordAgain != this.password){
            this.$vux.alert.show({
                title: '错误提示',
                content: '两次密码输入不一致',
                onHide () {
                    _this.passwordAgain = ''
                }
            })
            return
        }else {
            this.$axios({
                method: 'post',
                url:httpUrl.setPassword,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data:postData
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.$vux.toast.show({
                        text: '密码设置成功',
                        type:'success',
                        time:2000
                    });
                    this.$router.push('/login');
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
    /*background: #409EFF;*/
    }
    .goLogin{
        font-size:14px;
        height:30px;
        line-height:30px;
        color:#999;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 30%;
        margin: auto;
        cursor:pointer
    }
</style>
