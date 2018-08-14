<template>
  <div style="text-align: center">
      <!--<x-header-->
              <!--:left-options="{backText: '首页'}"-->
              <!--:right-options="{showMore: true}"-->
              <!--on-click-back = "goHome"-->
              <!--@on-click-title = "goHome"-->
              <!--@on-click-more="showMenus = true">游呗个人-->
      <!--</x-header>-->
      <popup-header left-text="设置密码"></popup-header>
    <group label-width="4.5em" label-margin-right="1em" label-align="justify" style="margin: 0 10px;">
        <x-input title="设置密码" placeholder="设置登录密码" v-model="password" @on-blur="blurPassword" type="password"></x-input>
        <x-input title="确认密码" placeholder="请再次输入登录密码" :equal-with="password" v-model="passwordAgain" @on-blur="blurPasswordAgain" type="password"></x-input>
    </group>

      <box gap="25px 10px">
          <x-button class="login-btn" type="primary" @click.native ="submit">提交</x-button>
      </box>

      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>

<script>
  import {XHeader,PopupHeader ,XInput ,XButton ,Alert,Actionsheet,Box,Group  } from 'vux'
  import {httpUrl} from '../../http_url';

export default {
  name: 'HelloWorld',
  data () {
    return {
        menus: {
            menu1: '退出登录'
        },
        showMenus: false,
        show: true,
        time:60,
        start: false,
        password:'',
        passwordAgain:''
    }
  },
  components: {
      XHeader,PopupHeader,Actionsheet,Box,
    Group,
    XInput,
    XButton, Alert
  },
  methods: {
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
          type:11,
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
                    this.$vux.alert.show({
                        title: '提示',
                        content: '密码设置成功',
                        onHide () {
                            _this.$router.push('/home');
                        }
                    });
                }else if(res.data.errCode==201){
                    this.$vux.toast.show({
                        type:'warn',
                        text: res.data.retMsg
                    })
                }else if(res.data.errCode==401){
                    this.$vux.alert.show({
                        title: '错误提示',
                        content: '未登录，请先登录',
                        onHide () {
                            _this.$router.push('/quick_login');
                        }
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
      goHome(){
          this.$router.push('/home');
      },
      LoginOut(){
          this.$axios({
              method: 'post',
              url:httpUrl.loginOut,
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
          }).then((res)=>{
              console.log(res.data)
              if(res.data.errCode==200){
                  this.$router.push('/quick_login');
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
  },
  filters: {

  }
}
</script>

<style scoped>

</style>
