<template>
  <div>
      <popup-header v-if="this.status_type=='1' || this.status_type=='2'" left-text="订单详情" right-text="取消订单"  @on-click-right="cancleBtn"></popup-header>
      <popup-header v-else left-text="订单详情" ></popup-header>

      <div style="margin: 20px 0;">
          <p style="text-align: center;border: 1px solid #eeeeee;padding: 15px 0; margin: 0 15px;background:#ffffcc;color: #ff9900; ">
              {{status_name}}
              <span v-show="this.status_type=='5'" style="display: block;font-size: 14px;color:#767575;">取消原因:{{remark}}</span>
          </p>
          <card class="cardBox">
              <div slot="header" style="padding: 10px;border-bottom: 1px solid #eee;background:#f6f6f6">
                  <p>{{product_data}}</p>
              </div>
              <div slot="content" style="padding: 10px">
                  <p style="font-size: 14px;color: #666;margin: 10px 0;">
                      <span style="width: 80px;display: inline-block">订单金额：</span><span>{{totalprice}}元</span>
                  </p>
                  <p style="font-size: 14px;color: #666;margin: 10px 0;">
                      <span style="width: 80px;display: inline-block">手续费：</span><span style="font-weight: bold">{{fenqi_price}}元</span>
                  </p>
                  <p style="font-size: 14px;color: #666;margin: 10px 0;">
                      <span style="width: 80px;display: inline-block">分期期数：</span><span>{{stage}}期</span>
                  </p>
                  <p style="font-size: 14px;color: #666;margin: 10px 0;">
                      <span style="width: 80px;display: inline-block">合计应还：</span><span>{{amountPrice}}元</span>
                  </p>
              </div>
          </card>
          <card class="cardBox">
              <div slot="header" style="padding:10px;background:#f6f6f6">
                  <h5>订单信息</h5>
              </div>
              <div slot="content" style="padding:0 10px">
                  <div style="font-size: 14px;color: #666;margin: 10px 0;" >
                      <p style="padding: 10px 0;">
                          <span>交易编号</span><span style="margin: 0 15px;">{{orderid}}</span>
                      </p>
                      <p>
                          <span>供应商</span><span style="margin: 0 15px;">{{sellername}}</span>
                      </p>
                  </div>
              </div>
          </card>
          <div v-if="this.status_type=='3'" style="margin: 0 15px">
              <x-button style="color: #409EFF" @click.native="goFenqiInfo"><h4 >查看分期信息 ></h4></x-button>
          </div>
          <card class="cardBox">
              <div slot="header" style="padding:10px;background:#f6f6f6">
                  <h5>机酒副本</h5>
              </div>
              <div slot="content" style="padding:0 10px">
                  <div style="font-size: 14px;color: #666;margin: 10px 0;" >
                      <p style="padding: 10px 0;">
                          <span @click="openHt" style="color: #409EFF;">旅游分期合同.pdf</span>
                          <span style="display: inline-block;float: right">{{pdfTime}}</span>
                      </p>
                      <!--<p style="padding: 10px 0;">-->
                          <!--<span @click="openVideoPlay" style="color: #409EFF;">查看录制视频</span>-->
                          <!--<span style="display: inline-block;float: right"></span>-->
                      <!--</p>-->
                  </div>
              </div>
          </card>
          <card class="cardBox">
              <div slot="header" style="padding:10px;background:#f6f6f6">
                  <h5>出行人信息</h5>
              </div>
              <div slot="content" style="padding:0 10px">
                  <div style="font-size: 14px;color: #666;margin: 10px 0;" v-for="item in cxrInfo">
                      <p style="padding: 10px 0;">
                          <span>{{item.name}}</span>
                          <span>（{{item.engname}}）</span>
                          <span style="float: right;display: inline-block">{{item.tel}}</span>
                      </p>
                     <p>
                         <span>护照号码：</span><span style="width: 80px;display: inline-block">{{item.passportid}}</span>
                     </p>
                  </div>
              </div>
          </card>
          <card class="cardBox">
              <div slot="header" style="padding:10px;background:#f6f6f6">
                  <h5 style="display: inline-block;">机票</h5>
                  <h5 style="display: inline-block;float: right">机票总价：{{flight_price}}元</h5>
              </div>
              <div slot="content" style="padding:10px;min-height: 50px;border-top: 1px solid #e5e5e5;">
                  <div class="hotelInfoBox" v-for="item in flightInfo">
                      <div style="border-bottom: 1px solid #cfcfce;padding-bottom: 10px;">
                          <p style="padding: 10px 0">
                              <span>{{item.flight}}</span>
                              <span style="padding: 0 10px;">{{item.airways}}</span>
                              <span>{{item.grade_name}}</span>
                          </p>
                          <p style="margin: 5px 0;">{{item.qdate}} <span style="padding: 0 5px">起飞</span></p>
                          <p style="margin: 5px 0;">{{item.tdate}} <span style="padding: 0 5px">到达</span></p>
                      </div>
                      <div style="border-bottom: 1px solid #cfcfce;padding: 10px 0;">
                          <div>
                              <span style="margin-right: 10px;">{{item.saddress}}</span>
                              <span>{{item.start_airport}}</span>
                          </div>
                          <img src="../../assets/fly_icon.png" class="icon_flyimg">
                          <div>
                              <span style="margin-right: 10px;">{{item.eaddress}}</span>
                              <span>{{item.end_airport}}</span>
                          </div>
                      </div>
                      <div style="padding: 10px 0;">
                          <p >
                              <span>{{item.people_data}}</span>
                          </p>
                      </div>
                  </div>
              </div>
          </card>
          <card class="cardBox">
              <div slot="header" style="padding:10px;background:#f6f6f6">
                  <h5 style="display: inline-block;">酒店</h5>
                  <h5 style="display: inline-block;float: right">酒店总价：{{hotel_price}}元</h5>
              </div>
              <div slot="content" style="padding:10px;min-height: 50px;border-top: 1px solid #e5e5e5;">
                  <div class="hotelInfoBox" v-for="item in hotelInfo">
                      <div style="border-bottom: 1px solid #cfcfce;padding-bottom: 10px;">
                          <p>
                              <span>{{item.city_name}}</span>
                              <span style="float: right;display: inline-block">{{item.tel}}</span>
                          </p>
                          <p >
                              <span>{{item.hname}}</span>
                          </p>
                      </div>
                      <div style="border-bottom: 1px solid #cfcfce;padding: 10px 0;">
                          <p style="margin: 5px 0;">{{item.sdate}} <span style="padding: 0 5px">入住</span></p>
                          <p style="margin: 5px 0;">{{item.edate}} <span style="padding: 0 5px">离店</span></p>
                          <p >
                              <span>{{item.type}}</span>
                              <span>{{item.num}}</span>
                          </p>
                      </div>
                      <div style="padding: 10px 0;">
                          <p >
                              <span>{{item.people_data}}</span>
                          </p>
                      </div>
                  </div>
              </div>
          </card>
          <card class="cardBox" style="margin-bottom: 120px;">
              <div slot="header" style="padding:10px;background:#f6f6f6">
                  <h5 style="display: inline-block;">其他预定信息</h5>
                  <h5 style="display: inline-block;float: right">其他预定总价：{{other_price}}元</h5>
              </div>
              <div slot="content" style="padding:10px;min-height: 50px;border-top: 1px solid #e5e5e5;">
                  <p style="width: 100%;font-size: 14px;">{{other_info}}</p>
              </div>
          </card>
          <div v-if="this.status_type=='1'">
              <x-button class="signBtn" type="primary" mini @click.native="submit">签署分期合同</x-button>
          </div>
          <div v-else-if="this.status_type=='2'" class="shoufukuan">
              <x-button type="primary" @click.native="getWxPayData">支付首期款</x-button>
          </div>
      </div>

      <!--取消订单弹窗-->
      <div v-transfer-dom>
          <confirm v-model="showCancleOrder"
                   confirm-text="提交"
                   title="取消订单"
                   @on-confirm="CancleOrder">
              <div slots>
                  <x-textarea :max="200"
                              class="cancleReasonInput"
                              :rows="4"
                              placeholder="请输入取消订单原因"
                              v-model="cancleReason">
                  </x-textarea>
              </div>
          </confirm>
      </div>

      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>

<i18n>

</i18n>
<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom, Card ,Tab, TabItem,XButton ,XTextarea ,FormPreview,Divider  } from 'vux'
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
        phone:'',
        showMenus: false,
        showCancleOrder:false,
        showInput:true,
        cancleReason:'',
        status_name:'',
        totalprice:'',
        product_data:'',
        flight_price:'',
        hotel_price:'',
        other_price:'',
        fenqi_price:'',
        stage:'',
        paymoney:'',
        orderid:'',
        sellername:'',
        cxrInfo:[],
        flightInfo:[],
        hotelInfo:[],
        status_type:'',
        remark:'',
        other_info:'',
        pdfurls:'',
        pdfTime:''

    }
  },
    created(){
        this.getData();
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        Card,
        Tab, TabItem,XButton,XTextarea,FormPreview,Divider
    },
    computed: {
        amountPrice: function () {
            let sum = parseFloat(this.totalprice) + parseFloat(this.fenqi_price);
            return sum.toFixed(2);
        },
    },
    methods:{
        getData(){
            let orderid = this.$route.query.orderid;
            const _this = this;
            let postData = this.$qs.stringify({
                orderid:orderid
            })
            this.$axios({
                method: 'post',
                url:httpUrl.orderInfo,
                data:postData
            }).then((res)=>{
                console.log(res.data)
                let data =res.data.retData;
                if(res.data.errCode==200){
                    this.status_name = data.orderInfo.status_name;
                    this.status_type = data.orderInfo.status_type;
                    this.product_data = data.orderInfo.product_data;
                    this.other_price = data.orderInfo.other_price;
                    this.flight_price = data.orderInfo.flight_price;
                    this.hotel_price = data.orderInfo.hotel_price;
                    this.fenqi_price = data.orderInfo.fenqi_price;
                    this.stage = data.orderInfo.stage;
                    this.paymoney = data.orderInfo.paymoney;
                    this.orderid = data.orderInfo.orderid;
                    this.sellername = data.orderInfo.sellername;
                    this.cxrInfo = data.people;
                    this.totalprice = data.orderInfo.totalprice;
                    this.hotelInfo = data.hotel;
                    this.flightInfo = data.flight;
                    this.other_info = data.orderInfo.other_info;
                    this.pdfurls = data.fuben.ht_url;
                    this.pdfTime = data.fuben.create_time;
                    this.remark = data.orderInfo.remark;
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
        openHt(){
            window.open(this.pdfurls);
        },
        openVideoPlay(){
            let orderid = this.$route.query.orderid;
            this.$router.push({
                path:'/video_play',
                query: {
                    orderid:orderid,
                    billdetail:1           //从账单详情页进入视频查看
                }
            });
        },
        goFenqiInfo(){
            let orderid = this.$route.query.orderid;
            this.$router.push({
                path:'/fenqi_info',
                query: {
                    orderid:orderid
                }
            });
        },
        cancleBtn(){
            this.showCancleOrder =true;
        },
        CancleOrder(){
            let _this = this;
            let orderid = this.$route.query.orderid;
            let postData = this.$qs.stringify({
                orderid:orderid,
                status:0,
                remark:this.cancleReason
            })
            _this.$axios({
                method: 'post',
                url:httpUrl.cancelorder,
                data:postData
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    _this.$vux.toast.show({
                        type:'success',
                        text: '订单取消成功',
                        onHide () {
                            _this.$router.push('/bill_list');
                        }
                    })
                }else if(res.data.errCode==201){
                    _this.$vux.toast.show({
                        type:'warn',
                        text: res.data.retMsg
                    })
                }else if(res.data.errCode==401){
                    _this.$vux.alert.show({
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
        submit(){
            let orderid = this.$route.query.orderid;
            this.$router.push({
                path:'/ht_preview',
                query: {
                    orderid:orderid
                }
            });
        },

        onCancel(){
            this.$router.push('/bill_list');
        },
        getWxPayData(){
            var vm = this;
            let orderid = this.$route.query.orderid;
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
            })
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
    .weui-panel:before{
        border-top:none;
    }
    .weui-panel:after{
        border-bottom:none;
    }
    .weui-form-preview:before{
        border-top:none;
    }
    .weui-form-preview::after{
        border-bottom:none;
    }
    .cardBox{
        margin: 20px 15px;
        border: 1px solid #eee;
        border-radius: 6px;
    }
    .previewBox{
        margin: 20px 15px;
        border: 1px solid #eee;
        border-radius: 6px;
    }
    .btn{
        /*width: 120px;*/
        height: 36px;
        margin: 0 10px;
    }
    .cancleReasonInput{
        border: 1px solid #999;
    }
    .hotelInfoBox{
        border: 1px solid #eeeeee;
        background: #F2F6FC;
        padding: 10px;
        margin-bottom: 10px;
        font-size: 14px;
    }
    .icon_flyimg{
        width: 36px;
        height: 36px;
        display: block;
        text-align: center;
        padding: 5px 0;
    }
    .signBtn{
        width: 90%;
        height: 36px;
        position: fixed;
        z-index: 9999;
        bottom: 15px;
        left: 0;
        right:0;
        margin: auto;
        text-align: center;
    }
    .shoufukuan{
        width: 90%;
        text-align: center;
        position: fixed;
        bottom: 20px;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 999;
    }
</style>
