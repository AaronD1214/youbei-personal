<template>
  <div>
      <x-header
              :left-options="{backText: '首页'}"
              :right-options="{showMore: true}"
              on-click-back = "goHome"
              @on-click-title = "goHome"
              @on-click-more="showMenus = true">游呗个人
      </x-header>

      <div style="margin: 25px 10px">
          <x-button type="primary" class="login-out" @click.native ="weixinPay">立即支付</x-button>
      </div>

      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>

<i18n>

</i18n>
<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom, FormPreview ,Card  ,XButton  } from 'vux'
    import {httpUrl} from '../../http_url';

export default {
    directives: {
        TransferDom
    },
  data () {
    return {
        menus: {
            menu1: '退出登录'
        },
        showMenus: false,
        product_data:'',
        orderList:[],
        length:'',
        payMoney:[],
        repayMoneySum:'',

    }
  },
    created(){

    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        Card ,
        FormPreview,XButton
    },
    methods:{
//        getWxPayData(){
//            var vm = this;
//            this.$axios({
//                method: 'post',
//                url:'http://ybuser.youxia.com/Pay/wxPay',
//                headers: {
//                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//                },
//            }).then((res)=>{
//                vm.weixinPay(JSON.parse(res.data));
//            });
//        },
        weixinPay(data){
            var vm= this;
            if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data));
                    document.attachEvent('onWeixinJSBridgeReady',vm.onBridgeReady(data));
                }
            }else{
                vm.onBridgeReady(data);
            }
        },
        onBridgeReady:function(data) {
            var vm = this;
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
//                    "appId": data.appId,     //公众号名称，由商户传入
//                    "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
//                    "nonceStr": data.nonceStr, //随机串
//                    "package": data.package,
//                    "signType": data.signType, //微信签名方式：
//                    "paySign": data.paySign //微信签名
                    "appId":"wx2fe7dde2e20bf8d0",
                    "nonceStr":"giff2n6s9k7j31u35pr8cmf9dhwspmr0",
                    "package":"prepay_id=wx18213154034241f01e8dd3a00439197487",
                    "signType":"MD5",
                    "timeStamp":"1524058314",
                    "paySign":"03EE05155155E6ADD5FA10682E38681D"
                },
                function (res) {
                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        vm.$vux.toast.show({
                            text: '支付成功',
                            type:'success'
                        })
                    } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                        vm.$vux.toast.show({
                            text: '支付失败' + res.err_msg,
                            type:'warn'
                        })
                    }
                }
            );
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
        goHome(){
            this.$router.push('/home');
        }
    }
}
</script>

<style scoped>
    a{
        text-decoration: none;
        color: #000;
    }
    .cardBox{
        margin: 20px 15px;
        border: 1px solid #eee;
        border-radius: 6px;
        position: relative;
    }
</style>
