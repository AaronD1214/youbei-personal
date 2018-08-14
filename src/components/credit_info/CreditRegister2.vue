<template>
  <div>
      <!--<x-header-->
              <!--:left-options="{backText: '首页'}"-->
              <!--:right-options="{showMore: true}"-->
              <!--on-click-back = "goHome"-->
              <!--@on-click-title = "goHome"-->
              <!--@on-click-more="showMenus = true">游呗个人-->
      <!--</x-header>-->
      <popup-header left-text="央行信用报告"></popup-header>
      <div style="margin:0 10px;text-align: center">
          <tab :line-width=1 active-color='#ff9900' v-model="index" class="tabs" >
              <tab-item v-for="(item,index) in list2" :selected="demo1 ===item" :key="index">{{item.title}}</tab-item>
          </tab>

        <group label-width="4.5em" class="inputBox" label-margin-right="1em" label-align="right">
            <x-input title="" mask="999 9999 9999" placeholder="请输入您的真实姓名" v-model="yhUserName" is-type="china-name"></x-input>
            <x-input title="" mask="" placeholder="请输入登录密码，6-20位数字字母组合" v-model="password"  @on-blur="blurPassword" type="password"></x-input>
            <x-input title="" mask="" placeholder="请再次填写登录密码" :equal-with="password" v-model="passwordAgain" @on-blur="blurPassword" type="password"></x-input>
            <x-input title="" mask="" placeholder="请输入手机号" :max="11" is-type="china-mobile" v-model="phone" ></x-input>
            <x-input placeholder="请输入验证码" class="weui-vcode" v-model="identifyCode">
                <x-button v-show="show" class="identifyCode-btn" slot="right" type="primary" @click.native ="getCode" mini>发送验证码</x-button>
                <x-button v-show="!show" disabled class="identifyCode-btn" slot="right" style="color: #000;font-size: 16px;margin-top: 0" mini>
                    <countdown v-model="time" :start="start" @on-finish="finish" style="color: #000;font-size: 16px;"></countdown> s
                </x-button>
            </x-input>
        </group>
         
        <x-button class="submit-btn" type="primary" @click.native ="submit">提 交</x-button>

      </div>
       

      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>
<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom, Card ,Tab, TabItem,Group,XInput,XButton,CheckIcon,Countdown } from 'vux'
    import {httpUrl} from '../../http_url';

    const list = () => [
        {title:'登录',id:0}, 
        {title:'注册',id:1}
    ]
   export default {
    // directives: {
    //     TransferDom
    // },
  data () {
    return {
        menus: {
            menu1: '退出登录'
        },
        yhUserName:'',
        password:'',
        passwordAgain:'',
        phone:'',
        index:1,
        demo1:'注册',
        show:true,
        time:60,
        start: false,
        list2:list(),
        identifyCode:'',
       
        showMenus: false,
        length:'',
        status_name:'',
        orderid:''
    }
  },
    created(){
        // this.getData(0);
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        Card,
        Tab,
        TabItem,
        Group,XInput,XButton,CheckIcon,Countdown
    },
    methods:{
        getData(id){
            console.log(id);
            const _this = this;
            let postData = this.$qs.stringify({
                status:id
            });
            this.$axios({
                method: 'post',
                url:httpUrl.txorderList,
                data:postData
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.signeList = res.data.retData;
                    this.length = res.data.retData.length;
                    this.status_name = res.data.retData.status_name;
                }else if(res.data.errCode==201){
                    this.$vux.toast.show({
                        type:'warn',
                        text: res.data.retMsg
                    })
                }else if(res.data.errCode==401){
                    this.$vux.alert.show({
                        title: '错误提示',
                        content: '未登录，请先登录',
                        // onHide () {
                        //     _this.$router.push('/quick_login');
                        // }
                    })
                }
            });
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
        //提交
        submit(){
            const _this = this;
            let postData = this.$qs.stringify({
                userName:this.yhUserName,
                code:this.identifyCode,
                password:this.password,
                ckpassword:this.passwordAgain,
                phone:this.SpaceTransformation(this.phone),
            });
            this.$axios({
                method: 'post',
                url: '',
                data: postData
            }).then( (res)=>{
                console.log(res.data);
                if(res.data.errCode==200){
                    this.$router.push('/credit_login'); 

                }else {
                    this.index = 1;
                }
            }).catch( function(){
                this.$vux.toast.show({
                    text: '网络异常，请稍后再试',
                    type:'warn'
                })
            }) 
        },
        
        LoginOut(){
            this.$axios({
                method: 'post',
                url:httpUrl.loginOut,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }).then((res)=>{
                // console.log(res.data)
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
         finish (index) {
          this.start = false;
          this.time = 60;
          this.show = true;
      },
        goHome(){
            this.$router.push('/home');
        }
    }
}


</script>
<style scoped>
.tabs {
    margin-top: 20px;
    
}
.submit-btn{
    margin-top: 30px;
    /*background: #409EFF;*/
}
.inputBox{
    margin-top: 50px;
}
.identifyCode-btn{
    width: 100px;
    height: 36px;
    line-height: 36px;
}
</style>
