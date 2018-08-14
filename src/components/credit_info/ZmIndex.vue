<template>
  <div>
      <popup-header left-text="芝麻信用"></popup-header>
       <div style="margin:20px 10px;color:#656565" >
           <div class="zmImg">
               <img class="zmIcon" src="../../assets/zm_icon.png" >
               <p style="font-size:25px;font-weight:100;">芝麻信用</p>
           </div>
           <check-icon class="checkicon" :value.sync = 'checked' >允许游侠游呗访问您的芝麻信用</check-icon>
           <x-button type= "primary" class="subBtn" @click.native="submit" :disabled="!this.checked">提 交</x-button>
       </div>


      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>
<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom,CheckIcon,XButton } from 'vux'
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
       
        showMenus: false,

        checked:false,
        // length:'',
        status_name:'',
        orderid:''
    }
  },
    created(){

    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        CheckIcon,
        XButton
       
    },
    methods:{
        submit(){
//            const _this = this;
//            this.$axios({
//                method: 'post',
//                url:httpUrl.zhimaCredit
//            }).then((res)=>{
//                console.log(res.data)
//                if(res.data.errCode==200){
//                    this.$vux.toast.show({
//                        type:'success',
//                        text: '授权成功',
//                         onHide () {
//                             _this.$router.push('/verify_step');
//                         }
//                    })
//                }else if(res.data.errCode==201){
//                    this.$vux.toast.show({
//                        type:'warn',
//                        text: res.data.retMsg
//                    })
//                }else if(res.data.errCode==401){
//                    this.$vux.alert.show({
//                        title: '错误提示',
//                        content: '未登录，请先登录'
//                    })
//                }
//            });
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
.zmImg{
 /* border: 1px solid #ddd; */
 background:#fff;
 border-radius: 6px;
 margin:0 auto;
 padding: 40px;
 text-align: center;
}
.zmIcon{
    width: 100px;
}
.checkicon{
    margin-top: 20px;
    font-size: 14px;
}
.subBtn{
    margin-top: 20px;
}
</style>
