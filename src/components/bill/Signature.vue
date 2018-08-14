<template>
  <div class="wrap" style="text-align: center">
      <div class="btnBox">
          <x-button class="clearBtn" @click.native="clear" type="warn" mini>清 空</x-button>
          <x-button class="saveBtn" @click.native="save" type="primary" mini>保 存</x-button>
      </div>
      <p class="tips">注意：请使用正楷签名</p>
      <div class="vueSignatureBox">
          <vueSignature class="vueSignature" ref="signature" :sigOption="option" :w="'100%'" :h="'100vh'"></vueSignature>
      </div>
      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>

      <loading class="loading" :show="showLoading" :text="loadText"></loading>
      <toast class="toastMsg" v-model="showToast" :type="toastType" :is-show-mask="showMask">{{toastMsg}}</toast>

  </div>
</template>

<i18n>

</i18n>
<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom,XButton } from 'vux'
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
        height:(document.documentElement.clientHeight-3)+ 'px',
        option:{
            penColor:"rgb(0, 0, 0)",
            backgroundColor:"rgb(255,255,255)"
        },
        isShowCover: false,
        showToast:false,
        showMask:true,
        toastMsg:'',
        toastType:'',
        showLoading:false,
        loadText:'',

        sm_status:'',
        bank_status:'',
        people_status:'',
        ht_status:''
    }
  },
    created(){
        this.getGuideInfoStatus();
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        XButton
    },

    methods:{
        getGuideInfoStatus(){
            let orderid = this.$route.query.orderid;
            const _this = this;
            let postData = this.$qs.stringify({
                orderid :orderid
            })
            this.$axios({
                method: 'post',
                url:httpUrl.guideInfo,
                data:postData
            }).then((res)=>{
                console.log(res.data)
                let data = res.data.retData;
                if(res.data.errCode==200){
                    this.sm_status = data.sm_status;
                    this.bank_status = data.bank_status;
                    this.people_status = data.people_status;
                    this.ht_status = data.ht_status;
                    this.orderid = data.orderid;
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
        save(){
            var _this = this;
            var png = _this.$refs.signature.save()
            var isEmpty = _this.$refs.signature.isEmpty()

            if(isEmpty){
                this.showToast = true;
                this.toastMsg = '您未签名，请先签名';
                this.toastType = 'warn';
                return
            }else {
//                this.getGuideInfoStatus();
                if(this.sm_status == 0){
                    this.$vux.toast.show({
                        type:'warn',
                        text: "请先完成实名认证！"
                    })
                    return
                }
                if(this.bank_status == 0){
                    this.$vux.toast.show({
                        type:'warn',
                        text: "请先完成银行卡认证！"
                    })
                    return
                }
                if(this.people_status == 0){
                    this.$vux.toast.show({
                        type:'warn',
                        text: "请先完成联系人认证！"
                    })
                    return
                }else if(this.ht_status == 1){
                    this.$vux.toast.show({
                        type:'warn',
                        text: "您已签过名，请勿重复提交！"
                    })
                    return
                }else {
                    this.uploadSign(png)
                }
            }
        },
        clear(){
            var _this = this;
            _this.$refs.signature.clear();
        },
        uploadSign(signBase64){
            const _this = this;
            this.showLoading = true;
            this.loadText = '正在保存签名，生成合同...';

            const orderid = this.$route.query.orderid;
            const transfinite = this.$route.query.transfinite;

            let postData = this.$qs.stringify({
                orderid:orderid,
                file:signBase64,
                is_apple:1,
                type:2                  //出行人类型
            })
            this.$axios({
                method: 'post',
                url:httpUrl.signUpload,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data:postData
            }).then((res)=>{
                console.log(res.data)
                this.showLoading = false;
                this.loadText = '';
                if(res.data.errCode==200){
                    this.$vux.alert.show({
                        content: '签名成功',
                        onHide () {
                            _this.getWxPayData();
                        }
                    })
                }else if(res.data.errCode==201){
                    this.showToast = true;
                    this.toastMsg = res.data.retMsg;
                    this.toastType = 'warn';
                }else if(res.data.errCode==401){
                    this.$vux.alert.show({
                        title: '错误提示',
                        content: '未登录，请先登录',
                        onHide () {
                            _this.$router.push('/quick_login');
                        }
                    })
                }

            });

        },
        //更新订单状态
        updatedata(){
            let orderid = this.$route.query.orderid;
            const _this = this;
            let postData = this.$qs.stringify({
                orderid:orderid,
                is_sign:1
            })
            this.$axios({
                method: 'post',
                url:httpUrl.updatedata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data:postData
            }).then((res)=>{
                console.log(res.data);
                this.$vux.loading.hide();
                if(res.data.errCode==200){
//                    _this.$router.push('/home');
                }else if(res.data.errCode==201){
                    this.$vux.toast.show({
                        text: res.data.retMsg,
                        type:'warn',
                        onHide(){

                        }
                    });
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
        //安卓手机直接调微信支付
        getWxPayData(){
            var vm = this;
            let orderid = this.$route.query.orderid;
            console.log(orderid);
            let postData = this.$qs.stringify({
                orderid:orderid
            })
            this.$axios({
                method: 'post',
                url:'http://ybuser.youxia.com/Pay/wxPay',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data:postData
            }).then((res)=>{
                if(res.data.errCode==201){
                    this.$vux.toast.show({
                        type:'warn',
                        text: res.data.retMsg
                    })
                }else {
                    vm.weixinPay(JSON.parse(res.data));
                }
            });
        },
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
                    "appId": data.appId,     //公众号名称，由商户传入
                    "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
                    "nonceStr": data.nonceStr, //随机串
                    "package": data.package,
                    "signType": data.signType, //微信签名方式：
                    "paySign": data.paySign //微信签名
                },
                function (res) {
                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        vm.$vux.toast.show({
                            text: '支付成功',
                            type:'success',
                            onHide () {
                                vm.$router.push('/home');
                            }
                        })
                    } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                        vm.$vux.toast.show({
                            text: '支付失败' + res.err_msg,
                            type:'warn',
                            onHide () {
                                vm.$router.push('/home');
                            }
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
        },
        goCreditInfoList(){
            this.$router.push('/credit_info_list');
        }
    }
}
</script>

<style scoped>
    .vueSignatureBox{
        /*border: 1px solid #e9e9e9;*/
        position: relative;
    }
    .clearBtn,.saveBtn{
        width: 80px;
        height: 36px;
        margin: 0 5px;
    }

    /*竖屏（portrait）：*/
    @media screen and (orientation:portrait){
        .btnBox{
            -webkit-transform:rotate(90deg);
            -moz-transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            transform: rotate(90deg);
            position: absolute;
            left: -40px;
            top: 47%;
            z-index: 999;
        }
        .toastMsg{
            -webkit-transform:rotate(90deg);
            -moz-transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            transform: rotate(90deg);
            position: fixed;
            top:0;
            left: 40%;
            bottom: 0;
            margin: auto;
            z-index: 999;
        }
        .loading{
            -webkit-transform:rotate(90deg);
            -moz-transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            transform: rotate(90deg);
            position: fixed;
            top:0;
            left: 30%;
            bottom: 0;
            margin: auto;
            z-index: 999;
        }
        .tips{
            -webkit-transform:rotate(90deg);
            -moz-transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            transform: rotate(90deg);
            font-weight: bold;
            position: fixed;
            top: 100px;
            right: -50px;
            z-index: 999;
            align-items:center;
        }
    }

    /*横屏（landscape）：*/
    @media screen and (orientation:landscape){
        .btnBox{
            -webkit-transform:rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
            position: absolute;
            bottom:15px;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 999;
        }
        .toastMsg{
            -webkit-transform:rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
            position: fixed;
            top:-110px;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 999;
        }
        .loading{
            -webkit-transform:rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
            position: fixed;
            top:-110px;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 999;
        }
        .tips{
            -webkit-transform:rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
            font-weight: bold;
            position: fixed;
            top:5px;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 999;
        }
    }

</style>
