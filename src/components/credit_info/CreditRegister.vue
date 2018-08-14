<template>
  <div>
      <x-header
              :left-options="{backText: '首页'}"
              :right-options="{showMore: true}"
              on-click-back = "goHome"
              @on-click-title = "goHome"
              @on-click-more="showMenus = true">游呗个人
      </x-header>
      <popup-header left-text="央行信用报告"></popup-header>
      <div style="margin:0 10px;text-align: center">
          <tab :line-width=1 active-color='#ff9900' v-model="index" class="tabs" >
              <tab-item v-for="(item,index) in list2" :key="index">{{item.title}}</tab-item>
          </tab>

        <group label-width="4.5em" label-margin-right="1em" label-align="right">
            <x-input title="" mask="999 9999 9999" placeholder="请输入您的真实姓名" v-model="yhUserName" ></x-input>
            <x-input title="" mask="" placeholder="请输入您的真实身份证号" v-model="IDNum"></x-input>
            <x-input title="" mask="" placeholder="请输入验证码" class="weui_vcode" v-model="identifyCode" >
                <img slot="right" src="" >
            </x-input>
        </group>
         <div style="text-align: left;margin: 25px 0;height: 25px;line-height: 25px;font-size:12px; ">
            <check-icon :value.sync="checkValue">我已经阅读并同意</check-icon><router-link style="color: #409EFF" to="xieyi">《服务协议》</router-link>
        </div>
        <x-button class="login-btn" type="primary" @click.native ="creditLogin">下一步</x-button>

      </div>
       

      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>
<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom, Card ,Tab, TabItem,Group,XInput,XButton,CheckIcon } from 'vux'
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
        IDNum:'',
        showMenus: false,
        list2:list(),
       checkValue:false,
       identifyCode:'',
        length:'',
        status_name:'',
        index:1,
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
        Group,XInput,XButton,CheckIcon
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
.login-btn{
    margin-top: 30px;
    /*background: #409EFF;*/
    }
    .forgetPsd {
        margin-top: 30px;
        font-size: 14px;
    }
</style>
