<template>
  <div>
      <popup-header left-text="游呗个人视频认证"></popup-header>
      <div style="margin: 20px;">
          <div style="background: rgba(255,255,204,0.6);border: 1px dashed #ffccd6;padding: 10px;border-radius: 6px;" >
              <p style="margin: 10px 0;font-size: 13px;opacity: 0.7"><span style="color: red">提示：</span>请记住下面这段文字，确认记住后点击'开始录制视频'按钮，出示身份证正面，对着镜头录制下面这段文字 ——</p>
              <p style="font-weight: bold;margin: 10px 0;font-size: 15px;color: red;">"我叫<span>{{name}}</span>，我在深圳游侠公司购买旅游产品，我申请分期付款。我已阅读合同并签字。"</p>
          </div>
          <a href="javascript:;" class="a-upload">
              <input type="file" class="videoBtn" id="video" @change="onUpload"  accept="video/*" capture="user">
              开始录制视频
          </a>
      </div>

      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
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
        height:(document.documentElement.clientHeight - 220)+ 'px',
        option:{
            penColor:"rgb(0, 0, 0)",
            backgroundColor:"rgb(255,255,255)"
        },

        idCardBackImg:'',
        idCardBackUrl:'',
        name:''

    }
  },
    created(){
        if(this.checkIOS()){
            this.getData();
        }else {
            this.$router.push('/home');
        }
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        XButton
    },
    methods:{
        // 获取用户名字
        getData(){
            const _this = this;
            let postData = this.$qs.stringify({
                page:1
            })
            this.$axios({
                method: 'post',
                url:httpUrl.userInformation,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data:postData
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.name = res.data.retData.idcard_name;
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
        onUpload(event){
            var _this = this;
            let orderid = this.$route.query.orderid;
            console.log(event)
            var reader = new FileReader();
            var video = event.target.files[0];
            reader.readAsDataURL(video);
            reader.onloadend = function () {
                _this.upLoadVideo(reader.result, orderid)
            }
        },
        upLoadVideo(file, orderid){
            const _this = this;
            this.$vux.loading.show({
                text: '正在上传...'
            })
            let postData = this.$qs.stringify({
                orderid:orderid,
                file:file
            })
            this.$axios({
                method: 'post',
                url:httpUrl.setVideo,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data:postData
            }).then((res)=>{
                console.log(res.data);
                this.$vux.loading.hide();
                if(res.data.errCode==200){
                    this.$vux.toast.show({
                        text: '上传成功',
                        type:'success',
                        onHide(){
                            _this.getWxPayData();
                        }
                    })
                    this.updatedata();
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
            })
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
        onCancel(){
            this.$router.push('/bill_list');
        },
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
    .a-upload {
        width: 100%;
        padding: 4px 0;
        height: 42px;
        line-height:42px;
        font-size: 18px;
        text-align: center;
        position: relative;
        cursor: pointer;
        margin: 20px 0;
        color: #fff;
        background-color: #325fa5;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        overflow: hidden;
        display: inline-block;
        *display: inline;
        *zoom: 1
    }
    .a-upload  input {
        position: absolute;
        width: 100%;
        height: 100%;
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer
    }

    .a-upload:hover {
        color: #fff;
        background: #179b16;
        border-color: #158b14;
        text-decoration: none
    }


</style>
