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
       <div v-show="show">
           <div class="tips">
             您的账户安全等级较高，可直接通过注册时绑定的手机号码验证安全身份。
            </div>
            <div style="margin:0 10px;text-align: center">
                <group label-width="4.5em" label-margin-right="1em" label-align="right">
                    <x-input  mask="999 9999 9999" placeholder="请输入手机校验码" v-model="phoneCode">
                        <x-button v-show="show" class="identifyCode-btn" slot="right" type="primary" @click.native ="getCode" mini>获取手机校验码</x-button>
                        <x-button v-show="!show" disabled class="identifyCode-btn" slot="right" style="color: #000;font-size: 16px;margin-top: 0" mini>
                            <countdown v-model="time" :start="start" @on-finish="finish" style="color: #000;font-size: 16px;"></countdown> s
                        </x-button>
                    </x-input>
                </group>
                <x-button class="submit-btn" type="primary" @click.native ="submit">提 交</x-button>
            </div>
       </div>


      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>
<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom, Card ,Group,XInput,XButton,Countdown } from 'vux'
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
        phoneCode:'',
        show:true,
        time:60,
        start:false,
        showMenus: false,
       
        // length:'',
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
        Group,XInput,XButton,Countdown
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
        submit(){
             this.$router.push('/cr_reportcheck');
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
.tips {
    background: rgb(255, 246, 230);
    text-align: center;
    color: rgb(255, 124, 78);
    padding: 10px;
}
.submit-btn{
    margin-top: 30px;
    /*background: #409EFF;*/
    }
.identifyCode-btn{
    /* width: 100px; */
    height: 36px;
    line-height: 36px;
}

</style>
