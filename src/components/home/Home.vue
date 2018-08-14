<template>
  <div :class="{fix: this.$store.getters.drawer}">
      <div class="bacisInfo">
          <!--<img class="setting_icon" src="../../assets/setting_icon.png"/>-->
          <div @click="goMessageList">
              <img class="messege_icon" src="../../assets/messege_icon.png"/>
              <badge v-show="this.messagesNum != '0'" class="badge-text" :text="messagesNum"></badge>
          </div>
          <div class="user-basic">
              <div class="user-name-box" v-show="this.name !==''">
                  <img class="people_icon" src="../../assets/people_icon.png"/>
                  <span class="user-name">{{name}}</span>
              </div>
              <div class="user-phone-box">
                  <img class="phone_icon" src="../../assets/phone_icon.png"/>
                  <p class="user-phone">{{phone}}</p>
              </div>
          </div>
          <div class="price-circle" @click="goEdu">
              <div class="amountInfo"></div>
              <x-circle
                      :percent="amountPercent"
                      :stroke-width="5"
                      :trail-width="5"
                      stroke-color="#ffffff"
                      trail-color="rgba(255, 255, 255, .3)">
                  <h3 style="color: #245a9b;display: inline-block">{{ surplus_amount }}</h3>
                  <span style="color: #245a9b;font-size: 14px;">元</span>
                  <p style="color: #245a9b;font-size: 14px">总额度</p>
              </x-circle>
          </div>
      </div>
      <masker v-show="this.msg_type!='4'" style="height:50px;line-height: 50px;" color="fff6e6">
          <div v-show="this.msg_type=='1'">
              <div class="m-title">
                  <icon type="warn"></icon>
                  <span class="tips-STitle">开通游呗，获取分期额度</span>
                  <router-link :to="'credit_info_list'" style="color: #ff7c4e;font-size: 14px;text-decoration: underline">>>去完成</router-link>
              </div>
          </div>
          <div v-show="this.msg_type=='2'">
              <div class="m-title">
                  <icon type="warn"></icon>
                  <span class="tips-STitle">开通游呗失败,请联系客服 0755-22211333</span>
              </div>
          </div>
          <div v-show="this.msg_type=='3'">
              <div class="m-title">
                  <icon type="warn"></icon>
                  <span class="tips-STitle">补全信用资料，获取更高额度</span>
                  <router-link :to="'credit_info_list'" style="color: #ff7c4e;font-size: 14px;text-decoration: underline">>>去完成</router-link>
              </div>
          </div>
          <!--<div v-show="this.msg_type=='4'">-->
              <!--<div class="m-title">-->
                  <!--<icon type="success"></icon>-->
                  <!--<span class="tips-STitle" style="color: #09bb07">您的信用资料已去全部提交</span>-->
                  <!--<router-link :to="'credit_info_list'" style="color: #09bb07;font-size: 14px;text-decoration: underline">>>去查看</router-link>-->
              <!--</div>-->
          <!--</div>-->
      </masker>
      <div v-show="this.on_order=='1'">
          <div class="arrows" v-show="this.bill_list.length>1">
              <img class="left-arrow" src="../../assets/left0_icon.png" @click="golast"/>
              <img class="right-arrow" src="../../assets/right0_icon.png" @click="gonext"/>
          </div>
          <swiper :show-dots="false"
                  :show-desc-mask="false"
                  :auto="true"
                  :loop="true"
                  :duration="duration"
                  :height="'200px'"
                  v-model="bill_index"
                  @on-index-change="onIndexChange">
              <swiper-item v-for="(item, index) in bill_list" :key="index">
                  <div class="bill-box-tips">
                      <span class="span1">账单{{index+1}}</span>
                      <img class="calendar_icon" src="../../assets/calendar_icon.png"/>
                      <span>还款日期：{{item.hktime}}</span>
                  </div>
                  <grid :cols="2" :show-lr-borders="false" style="text-align: center;">
                      <grid-item style="height: 80px;">
                          <p :style="(item.hk_status == 1) ? {color:'#90c320'} : {color: '#ff7c4e'}">{{item.bydaihai}}<span style="font-size: 12px;">元</span></p>
                          <p class="daihuan_tips" :style="(item.hk_status == 1) ? {backgroundColor:'#90c320'} : {backgroundColor: '#ff7c4e'}" >
                              <span class="icon_title" v-show="item.hk_status == 0">本月待还</span>
                              <span class="icon_title" v-show="item.hk_status == 1">本月已还</span>
                          </p>
                          <div style="width: 100%;border-bottom: 1px solid #eeeeee;margin-top: 15px;"></div>
                      </grid-item>
                      <grid-item style="height: 80px;">
                          <p style="color: #90c320;">{{item.yhnum}}/{{item.stage}}</p>
                          <span class="icon_title" style="color: #7f7f7f;">已还款期数</span>
                          <div style="width: 100%;border-bottom: 1px solid #eeeeee;margin-top: 15px;"></div>
                      </grid-item>
                      <grid-item style="height: 80px;">
                          <p style="color: #26599a;">{{item.totalprice}}<span style="font-size: 12px;">元</span></p>
                          <span class="icon_title" style="color: #7f7f7f;">还款总金额</span>
                      </grid-item>
                      <grid-item style="height: 80px;">
                          <p style="color: #90c320;">{{item.yhmoney}}<span style="font-size: 12px;">元</span></p>
                          <span class="icon_title" style="color: #7f7f7f;">已还款金额</span>
                      </grid-item>
                  </grid>
              </swiper-item>
          </swiper>
      </div>

      <grid :show-lr-borders="false" :show-vertical-dividers="false" class="menu-row">
          <grid-item :link="this.msg_type=='2' ? '' : '/bill_list'">
              <img class="icon" slot="icon" src="../../assets/bill_icon.png">
              <span class="icon_title">分期订单</span>
          </grid-item>
          <grid-item :link="this.msg_type=='2' ? '' : '/signe_list'">
              <img class="icon" slot="icon" src="../../assets/sign_icon.png">
              <span class="icon_title">同行人签名</span>
          </grid-item>
          <grid-item :link="this.msg_type=='2' ? '' : '/order_list'">
              <img class="icon" slot="icon" src="../../assets/order_icon.png">
              <span class="icon_title">账单</span>
          </grid-item>
          <grid-item :link="this.msg_type=='2' ? '' : '/credit_info_list'" >
              <img class="icon" slot="icon" src="../../assets/creditInfo_icon.png">
              <span class="icon_title">信用资料</span>
          </grid-item>
      </grid>
      <div class="bank-info">
          <img class="bank-icon" src="../../assets/bankcard_white_icon.png">
          <span style="color: #ffffff;position: absolute;float: left;left:50px;">管理我的银行卡</span>
          <img class="plus_icon"
               :style="(this.is_bank == 1) ? {width:'120px',top:'0'} : {width:'22px',top:'13px'}"
               @click="goBank"
               :src="bankUrl">
      </div>
      <group>
          <cell >
              <img class="lock-icon" slot="icon" src="../../assets/shouquan_icon.png">
              <span slot="title" class="edit-left">微信登录授权</span>
              <span slot="default">
                  <img v-if="this.weixin_status==0" class="icon" slot="icon" src="../../assets/wx_icon.png">
                  <img v-else="this.weixin_status==1" class="icon" slot="icon" src="../../assets/wx_icon3.png">
              </span>
          </cell>
          <cell link="/set_password" is-link :disabled="this.msg_type=='2'">
              <img class="lock-icon" slot="icon" src="../../assets/lock_icon.png">
              <span slot="title" class="edit-left">设置密码</span>
              <span slot="default"></span>
          </cell>
      </group>

      <div style="height: 20px;"></div>
      <!--<box gap="25px 10px">-->
          <!--<x-button type="warn" class="login-out" @click.native ="LoginOut">退出登录</x-button>-->
      <!--</box>-->

      <!--微信解绑弹窗-->
      <!--<div v-transfer-dom>-->
          <!--<confirm v-model="openUnbind_show"-->
                   <!--title="确认解绑"-->
                   <!--@on-cancel="onCancelUnbind"-->
                   <!--@on-confirm="onConfirmUnbind">-->
              <!--<p style="text-align:center;">解绑微信账号后无法继续使用它登录该游侠游呗账号</p>-->
          <!--</confirm>-->
      <!--</div>-->

      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>


<script>
    import { XHeader,Drawer,PopupHeader,XCircle,Range,Icon,Group,Cell,CellBox ,XInput,XButton,Actionsheet , TransferDom, Masker ,Box, Grid, GridItem ,Badge, Card,numberComma ,Swiper  } from 'vux'
    import {httpUrl} from '../../http_url';
    import myDrawer from './Left.vue';
    import SwiperItem from "../../../node_modules/vux/src/components/swiper/swiper-item.vue";

export default {
    directives: {
        TransferDom
    },
  data () {
    return {
        menus: {
            menu1: '退出登录'
        },
        messagesNum:'0',
        name:'',
        phone:'',
        showMenus: false,
        msg_type:'',
        surplus_amount: 0,
        is_bank:'',
        bankUrl:'',
        weixin_status:'',
        openUnbind_show:false,
        on_order:'',          //是否又账单
        bill_list:[],
        bill_index:0,
        duration:1000

    }
  },
    created(){
        this.getData();
        this.getfenqiInfo();
        this.getMessage();
    },
    components: {
        SwiperItem,
        XHeader,
        Drawer,
        PopupHeader,
        XCircle,
        Range,
        Icon,
        Actionsheet,
        Group,
        Cell,
        CellBox,
        XInput,
        XButton,
        Masker,
        Box,
        Grid,
        GridItem,
        Badge,
        Card,
        myDrawer,
        Swiper
    },
    computed: {
        // 计算属性的 getter
        amountPercent: function () {
            return (this.surplus_amount)/2000;       //总额度最大为20万
        }
    },
    methods:{
        getData(){
            const _this = this;
            this.$axios({
                method: 'post',
                url:httpUrl.homePage,
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.name = res.data.retData.name;
                    this.phone = res.data.retData.phone;
                    this.msg_type = res.data.retData.msg_type;
                    this.surplus_amount = res.data.retData.surplus_amount;
                    this.is_bank = res.data.retData.is_bank;
                    this.bankUrl = res.data.retData.bank_url;
                    this.weixin_status = res.data.retData.weixin_status;
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
        getfenqiInfo(){
            const _this = this;
            this.$axios({
                method: 'post',
                url:httpUrl.fenqiInfo,
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.on_order = res.data.retData.on_order;
                    this.bill_list = res.data.retData.list;
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
        getMessage(){
            const _this = this;
            this.$axios({
                method: 'get',
                url:httpUrl.messageList,
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.messagesNum = res.data.retData.count;
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
        goMessageList(){             //清除消息数字
            this.$axios({
                method: 'post',
                url:httpUrl.updatemessage,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }).then((res)=>{
                console.log(res.data)
                this.$router.push('/message_list');
            })

        },
        onIndexChange(index){
            this.bill_index = index
        },
        golast(){
            this.bill_index = this.bill_index-1
        },
        gonext(){
            this.bill_index = this.bill_index+1
        },
        goBank(){
            if(this.is_bank == 0){
                this.$router.push('/bank_certify');
            }else {

            }
        },
        goEdu(){
            this.$router.push('/quotas');
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
        goCreditInfoList(){
            this.$router.push('/credit_info_list');
        },
        goEditPhone(){
            if(this.msg_type=='2'){

            }else {
                this.$router.push({
                    path:'/edit_phone',
                    query: {
                        phone:this.phone
                    }
                });
            }
        },
//        openUnbindwx(){
//            if(this.weixin_status == 1){
//                this.openUnbind_show = true;
//            }else {
//                this.$vux.toast.show({
//                    type:'warn',
//                    text: "您未绑定微信，无法解绑！"
//                })
//            }
//
//        },
//        onCancelUnbind(){
//
//        },
//        onConfirmUnbind(){
//            this.$axios({
//                method: 'post',
//                url:httpUrl.cancelAuthorization,
//                headers: {
//                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//                },
//            }).then((res)=>{
//                console.log(res.data)
//                if(res.data.errCode==200){
//
//                }else if(res.data.errCode==201){
//                    this.$vux.toast.show({
//                        type:'warn',
//                        text: res.data.retMsg
//                    })
//                }
//
//            }).catch(function () {
//                this.$vux.toast.show({
//                    text: '网络异常，请稍后再试',
//                    type:'warn'
//                })
//            });
//        },
        showDrawer() {
            this.$store.dispatch('changeDrawer').then(() => {
//                console.log(this.$store.getters.drawer)
            })
        }
    }
}
</script>

<style scoped>
    .content{
        height: 100vh;
        background: #f2f2f2;
        text-align: center
    }
    .bacisInfo{
        width: 100%;
        height: 200px;
        background: url("../../assets/infoBg.jpg") no-repeat center bottom;
        background-size: cover;
        position: relative;
    }
    .setting_icon{
        width: 20px;
        height: 20px;
        float: left;
        position: relative;
        top: 20px;
        left: 20px;
    }
    .messege_icon{
        width: 24px;
        height: 24px;
        float: right;
        position: relative;
        top: 20px;
        right: 25px;
    }
    .badge-text{
        float: right;
        position: relative;
        top: 15px;
        right: -8px;
    }
    .amountInfo{
        width: 85px;
        height: 85px;
        border-radius: 50%;
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: #ffffff;
    }
    .price-circle {
        width:110px;
        height:110px;
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
    .user-basic{
        position: absolute;
        bottom: 40px;
        left: 20px;
    }
    .user-name-box{
        height: 30px;
        line-height: 30px;
        margin-bottom: 6px;
    }
    .people_icon{
        width: 22px;
        height: 22px;
        float: left;
        margin-right: 5px;
    }
    .user-name{
        color: #ffffff;
        font-size: 16px;
        position: relative;
        float: left;
        top:-3px;
    }
    .user-phone-box{
        width: 130px;
        height: 30px;
        line-height: 30px;
        background: #ffffff;
        border-radius: 20px;
    }
    .phone_icon{
        width: 18px;
        height: 18px;
        float: left;
        position: relative;
        top:6px;
        left: 10px;
    }
    .user-phone{
        float: left;
        margin-left: 10px;
        color: #245a9b;
    }
    .m-title {
        font-weight: 500;
        font-size: 16px;
        position: absolute;
        left: 20px;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 99;
    }
    .tips-STitle {
        font-size: 14px;
        color: #ff7c4e;
        margin-right: 10px;
    }
    .menu-row{
        margin: 8px 0 15px 0;
        background: #ffffff;
        text-align: center;
    }
    .arrows{
        position: relative;
        z-index: 1;
    }
    .left-arrow{
        width: 22px;
        position: absolute;
        left: 25px;
        top:9px;
        z-index: 99;
    }
    .right-arrow{
        width: 22px;
        position: absolute;
        right: 25px;
        top:9px;
        z-index: 99;
    }
    .bill-box-tips{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        background: #ffffff;
        color: #235a9b;
        text-align: center;
        position: relative;
    }
    .bill-box-tips .span1{
        border:1px solid #235a9b;
        border-radius: 4px;
        padding: 2px 10px;
        margin-right: 5px;
    }
    .calendar_icon{
        width: 22px;
        position: relative;
        top: 6px;
    }
    .daihuan_tips{
        width:80px;
        height: 24px;
        line-height: 24px;
        color: #fff;
        border-radius: 12px;
        margin: 0 auto;
    }
    .bank-info{
        margin: 0 10px;
        height: 50px;
        line-height: 50px;
        border-radius: 8px;
        position: relative;
        background: -webkit-linear-gradient(left, #4274b7 , #365ea7); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #4274b7, #365ea7); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #4274b7, #365ea7); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #4274b7 , #365ea7); /* 标准的语法（必须放在最后） */
    }
    .bank-icon{
        width: 36px;
        height: 36px;
        position: absolute;
        left: 10px;
        top: 10px;
    }
    .plus_icon{
        position: absolute;
        right: 10px;
    }
    .lock-icon{
        width: 18px;
        height: 20px;
        margin-top: 4px;
    }
    .chinaEMS-icon{
        width: 150px;
        position: absolute;
        right: 0;
    }
    .main-info{
        margin: 10px;
        background: #e2e2e2;
        border-radius: 6px;
    }
    .info-icon{
        width: 36px;
        height: 36px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
    .imgBg{
        width: 60px;
        height: 60px;
        background: #fff;
        border-radius: 50%;
        text-align: center;
        margin: 0 auto;
    }
    .card-padding {
        padding: 20px 0;
    }
    .login-btn{
        height: 36px;
        position: absolute;
        top:0;
        bottom: 0;
        right: 20px;
        margin: auto;
        z-index: 99;
    }
    a{
        text-decoration: none;
        color: #000;
    }
    .icon{
        width: 25px;
        height: 25px;
        margin: 0 auto;
    }
    .icon_title{
        font-size: 14px;
    }
    .edit-left{
        height: 24px;
        line-height: 24px;
        float: left;
        margin-left: 10px;
        text-align: left;
        font-size: 16px;
    }

    .grid-center {
        display: block;
        text-align: center;
        color: #666;
    }
    .weui-grids {
        background-color: #fff;
    }
    .weui-grid{
        padding: 15px 10px;
    }
    .weui-grid:before{
        width: 1px;
        height: 80%;
        content: " ";
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border-right: 1px solid #D9D9D9;
        color: #D9D9D9;
        -webkit-transform-origin: 100% 0;
        transform-origin: 100% 0;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);

    }
    .weui-grid:after {
        width: 85%;
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 1px;
        border-bottom: none;
        color: #D9D9D9;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }

</style>
