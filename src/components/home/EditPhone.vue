<template>
  <div style="text-align: center">
      <!--<x-header-->
              <!--:left-options="{backText: '首页'}"-->
              <!--:right-options="{showMore: true}"-->
              <!--on-click-back = "goHome"-->
              <!--@on-click-title = "goHome"-->
              <!--@on-click-more="showMenus = true">游呗个人-->
      <!--</x-header>-->
      <popup-header left-text="修改手机"></popup-header>
      <div style="margin: 15px 10px;overflow: hidden;">
          <masker style="border-radius: 6px;height:70px;text-align: center" color="faece9">
              <div style="padding: 10px 0;font-size: 14px;">
                  <p>更换手机后,下次登录可使用新手机号登录</p>
                  <p>当前手机号:<span style="color: #F50F0C;font-weight: bold">{{oldPhone}}</span></p>
              </div>
          </masker>
      </div>
    <group label-width="4.5em" label-margin-right="1em" label-align="justify" style="margin: 0 10px;">
        <x-input title="手机号"
            mask="999 9999 9999"
            v-model="phone"
            :max="13"
            placeholder="请输入手机号"
            is-type="china-mobile">
        </x-input>
        <x-input title="验证码" placeholder="请输入验证码" class="weui-vcode" v-model="identifyCode">
            <x-button v-show="show" class="identifyCode-btn" slot="right" type="primary" @click.native ="getCode" mini>发送验证码</x-button>
            <x-button v-show="!show" disabled class="identifyCode-btn" slot="right" style="color: #000;font-size: 16px;margin-top: 0" mini>
                <countdown v-model="time" :start="start" @on-finish="finish" style="color: #000;font-size: 16px;"></countdown> s
            </x-button>
        </x-input>
    </group>

      <box gap="25px 10px">
          <x-button class="login-btn" type="primary" @click.native ="submit">更换手机号</x-button>
      </box>

      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>

<script>
  import {XHeader,PopupHeader ,XInput ,XButton ,Alert,Actionsheet,Box,Group ,Countdown ,Masker} from 'vux'
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
        oldPhone:'123456789',
        phone: '',
        identifyCode:'',
    }
  },
  components: {
      XHeader,PopupHeader,Actionsheet,Box,
    Group,
    XInput,
    XButton, Alert,Countdown,Masker
  },
    created(){
        let phone = this.$route.query.phone;
        this.oldPhone = phone;

    },
  methods: {
      getCode(){
          console.log(this.SpaceTransformation(this.phone));
          let postData = this.$qs.stringify({
              phone:this.SpaceTransformation(this.phone),
              type:102
          })
          this.$axios({
              method: 'get',
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
                  this.phone = '';
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
    submit(){
      const _this = this;
      let postData = this.$qs.stringify({
          phone:this.SpaceTransformation(this.phone),
          code:this.identifyCode,
      })
      this.$axios({
        method: 'post',
        url:httpUrl.changePhone,
        data:postData
      }).then((res)=>{
        console.log(res.data)
        if(res.data.errCode==200){
            this.$vux.alert.show({
                title: '提示',
                content: '手机号码修改成功',
                onHide () {
                    _this.LoginOut();
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
    .identifyCode-btn{
        width: 100px;
        height: 36px;
        line-height: 36px;
    }
</style>
