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
       <!-- 央行验证码 -->
       <div>
           <div class="tips" v-if="this.msg_type==0">
             征信中心将会在24小时内，将申请结果短信发送到您注册账号时预留的手机上，请收到验证码后返回获取征信报告。
            </div>

            <div class="tips" v-else>
                <p> 您的报告已生成，快去看看吧！</p>
                <p>24小时仍未收到验证码？<span style="color:#3c69af">点击重新获取</span></p>
            </div>

            <div style="margin:0 10px;text-align: center">
                <group label-width="4.5em" label-margin-right="1em" label-align="right">
                    <x-input  mask="999 9999 9999" placeholder="请输入央行验证码" v-model="YhCode"></x-input>
                </group>
                <x-button class="submit-btn" type="primary" @click.native ="goCr_suc2">下一步</x-button>
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
        YhCode:'',
        showMenus: false,
       msg_type:0,

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
        goCr_suc2(){
            this.$router.push('/cr_suc2');
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
