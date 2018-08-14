<template>
    <div>
        <popup-header left-text="人脸识别失败"></popup-header>
        <div class="content">
            <img class="suc_icon" src="../../assets/fail_icon.png">
            <p style="font-weight: bold;">抱歉，人脸识别失败！</p>
            <p>失败原因：{{failReason}}</p>
            <p>需要帮助？拨打客服热线：0755-22211333</p>
        </div>
        <x-button class="signBtn" type="primary" @click.native="goLiveFace">返回重新识别</x-button>
    </div>
</template>


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
                failReason:'失败'
            }
        },
        created(){
            let retMsg = this.$route.query.retMsg;
            this.failReason = retMsg;
//            if(this.checkIOS()){
//                let retMsg = this.$route.query.retMsg;
//                this.failReason = retMsg;
//            }else {
//                this.$router.push('/home');
//            }
        },
        components: {
            XHeader,
            PopupHeader,
            Actionsheet,
            XButton
        },
        methods:{
            goLiveFace(){
                let orderid = this.$route.query.orderid;
                let transfinite = this.$route.query.transfinite;
                if(transfinite == 1){
                    this.$router.push({
                        path:'/signature',
                        query: {
                            orderid:orderid,
                            transfinite:transfinite
                        }
                    });
                }else {
                    this.$router.push({
                        path:'/qiniu_upload',
                        query: {
                            orderid:orderid
                        }
                    });
                }

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
            //微信支付
            getWxPayData(){
                var vm = this;
                let orderid = this.$route.query.orderid;
                console.log(orderid);
                let postData = this.$qs.stringify({
                    is_apple:1,
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
                let step_type = this.$route.query.step_type;
                let orderid = this.$route.query.orderid;
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
                                    if(step_type=='1'){
                                        vm.$router.push({
                                            path:'/verify_step',
                                            query: {
                                                orderid:orderid
                                            }
                                        });
                                    }else {
                                        vm.$router.push('/home');
                                    }

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
            }
        }
    }
</script>

<style scoped>
    .content{
        width: 90%;
        margin: 0 auto;
        text-align: center;
    }
    .content p{
        margin: 20px 0;
    }
    .suc_icon{
        width: 100px;
        height: 100px;
        margin-top: 30px;
    }
    .signBtn{
        width: 90%;
        margin: 0 auto;
    }
</style>
