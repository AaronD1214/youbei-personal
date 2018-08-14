<template>
  <div style="text-align: center">
      <!--<popup-header left-text="信用资料"></popup-header>-->
      <grid class="mainBox" style="border-top: 1px solid #eeeeee">
          <grid-item disabled style="background-color: #ffffff;">
              <img class="icon_money" src="../../assets/icon_money.png">
              <span style="display: block;color: #c9aa00;font-weight: bold">{{availableCredit}} 元</span>
              <span class="icon_title" style="color: #a0a0a0">可用额度</span>
          </grid-item>
          <grid-item disabled style="background-color: #ffffff;">
              <img class="icon_money" src="../../assets/icon_zhimafen.png">
              <span style="display: block;color: #2db5a9;font-weight: bold">{{zhima_creditScore}}</span>
              <span class="icon_title" style="color: #a0a0a0">芝麻信用分</span>
          </grid-item>
      </grid>
      <grid class="mainBox" style="border-top: 1px solid #eeeeee">
          <grid-item :link="realNameStatus == 0 ? {path: '/certification'} : {path: '/certification_info'}" style="background-color: #ffffff;">
              <img class="icon" slot="icon" src="../../assets/shim_icon.png">
              <span class="icon_title">实名认证</span>
              <span style="display: block;font-size: 14px;">{{realNameCredit}}元</span>
              <span class="typeInfoStyle" :style="realNameStatus == 0 ? {color:'#F56C6C'} : {color: '#67C23A'}">{{realNameType}}</span>
          </grid-item>
          <grid-item :link="bankStatus == 0 ? {path: '/bank_certify'} : {path: '/bank_info'}" style="background-color: #ffffff;">
              <img class="icon" slot="icon" src="../../assets/bankcard_icon.png">
              <span class="icon_title">银行卡</span>
              <span style="display: block;font-size: 14px;">{{bankCredit}}元</span>
              <span class="typeInfoStyle" :style="bankStatus == 0 ? {color:'#F56C6C'} : {color: '#67C23A'}">{{bankType}}</span>
          </grid-item>
          <grid-item :link="infoStatus == 0 ? {path: '/information_edit'} : {path: '/information_preview'}" style="background-color: #ffffff;">
              <img class="icon" slot="icon" src="../../assets/info_icon.png">
              <span class="icon_title">相关资料</span>
              <span style="display: block;font-size: 14px;">{{infoCredit}}元</span>
              <span class="typeInfoStyle" :style="infoStatus == 0 ? {color:'#F56C6C'} : {color: '#67C23A'}">{{infoType}}</span>
          </grid-item>
      </grid>
      <grid class="mainBox">
          <grid-item @click.native="openCredit" style="border-top: 1px solid #eeeeee;background-color: #ffffff;">
              <img class="icon" slot="icon" src="../../assets/report_icon.png">
              <span class="icon_title">信用报告</span>
              <span style="display: block;font-size: 14px;">{{pengyuan_reportCredit}}元</span>
              <span class="typeInfoStyle" :style="pengyuan_reporStatus == 0 ? {color:'#F56C6C'} : {color: '#67C23A'}">{{pengyuan_reportType}}</span>
          </grid-item>
          <grid-item style="border-top: 1px solid #eeeeee;background-color: #ffffff;" @click.native="openConfirm">
              <img class="icon" slot="icon" src="../../assets/zhima_icon.png">
              <span class="icon_title">芝麻信用</span>
              <span style="display: block;font-size: 14px;">{{zhimaCredit}}元</span>
              <span class="typeInfoStyle" :style="zhimaStatus == 0 ? {color:'#F56C6C'} : {color: '#67C23A'}">{{zhimaType}}</span>
          </grid-item>
          <grid-item style="display: none">

          </grid-item>
      </grid>

      <div v-transfer-dom>
          <confirm v-model="zmshow"
                   title="芝麻信用授权"
                   @on-cancel="onZMCancel"
                   @on-confirm="onZMConfirm">
              <p style="text-align:center;">是否授权获取芝麻信用分？</p>
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
    import { XHeader,PopupHeader,Group,Cell,Actionsheet , TransferDom, Grid, GridItem ,} from 'vux'
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
        availableCredit:'0',
        zhima_creditScore:'???',
        realNameCredit:'0',
        realNameStatus:'0',
        realNameType:'未获取',
        bankCredit:'0',
        bankStatus:'0',
        bankType:'未获取',
        infoCredit:'0',
        infoStatus:'0',
        infoType:'未获取',
        reportCredit:'0',
        reporStatus:'0',
        reportType:'未获取',
        pengyuan_reportCredit:'0',
        pengyuan_reporStatus:'0',
        pengyuan_reportType:'未获取',
        zhimaCredit:'0',
        zhimaStatus:'0',
        zhimaType:'未获取',
        zmshow:false
    }
  },
    created(){
        this.getData();
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        Group,
        Cell,
        Grid,
        GridItem

    },
    methods:{
        getData(){
            const _this = this;
            this.$axios({
                method: 'post',
                url:httpUrl.creditInformation
            }).then((res)=>{
                console.log(res.data)
                let data = res.data.retData;
                if(res.data.errCode==200){
                    this.realNameCredit = data.realName.amount;
                    this.realNameStatus = data.realName.status;
                    this.realNameType = data.realName.status_msg;
                    this.bankCredit = data.bank.amount;
                    this.bankStatus = data.bank.status;
                    this.bankType = data.bank.status_msg;
                    this.infoCredit = data.relevantData.amount;
                    this.infoStatus = data.relevantData.status;
                    this.infoType = data.relevantData.status_msg;
                    this.pengyuan_reportCredit = data.pengyuan_credit.amount;
                    this.pengyuan_reporStatus = data.pengyuan_credit.status;
                    this.pengyuan_reportType = data.pengyuan_credit.status_msg;
                    this.zhimaCredit = data.zhima.amount;
                    this.zhimaStatus = data.zhima.status;
                    this.zhimaType = data.zhima.status_msg;
                    this.availableCredit = data.surplus_amount;

                    if(data.zhima_credit == '1'){
                        this.zhima_creditScore = '600分以下';
                    }else if(data.zhima_credit == '2'){
                        this.zhima_creditScore = '600分以上';
                    }else if(data.zhima_credit == '3'){
                        this.zhima_creditScore = '700分以上';
                    }

                    this.showPlugin();
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
        showPlugin(){
            if(this.realNameStatus==0){
                const _this = this
                this.$vux.confirm.show({
                    title:'提示',
                    content:"请先完成实名认证！",
                    confirmText:'实名认证',
                    // 组件除show外的属性
                    onCancel () {

                    },
                    onConfirm () {
                        _this.$router.push('/certification');
                    }
                })
            }
        },
        openConfirm(){
            if(this.realNameStatus == 0){
                this.$vux.toast.show({
                    type:'warn',
                    text: "请先完成实名认证！"
                })
            }else {
                if(this.zhimaStatus == 0){
                    this.zmshow = true
                }else {
                    this.$vux.toast.show({
                        type:'warn',
                        text: '你已授权！'
                    })
                }
            }

        },
        openCredit(){
            if(this.realNameStatus == 0){
                this.$vux.toast.show({
                    type:'warn',
                    text: "请先完成实名认证！"
                })
            }else {
                if(this.pengyuan_reporStatus == 0){
                    this.$router.push({
                        path:'/py_credit',
                        query: {
                            pengyuan_reporStatus:this.pengyuan_reporStatus
                        }
                    });
                }else if(this.pengyuan_reporStatus == 1){
                    this.$router.push({
                        path:'/py_credit',
                        query: {
                            pengyuan_reporStatus:this.pengyuan_reporStatus
                        }
                    });
                }
            }
        },
        onZMCancel(){

        },
        onZMConfirm(){
            const _this = this;
            this.$vux.loading.show()
            this.$axios({
                method: 'post',
                url:httpUrl.zhimaCredit
            }).then((res)=>{
                console.log(res.data)
                this.$vux.loading.hide()
                if(res.data.errCode==200){
                    this.$vux.toast.show({
                        type:'success',
                        text: '授权成功',
                         onHide () {
                             _this.getData();
//                             _this.$router.push('/credit_info_list');
//                             _this.$router.go(0);
                         }
                    })
                }else if(res.data.errCode==201){
                    this.$vux.toast.show({
                        type:'warn',
                        text: res.data.retMsg
                    })
                }else if(res.data.errCode==401){
                    this.$vux.alert.show({
                        title: '错误提示',
                        content: '未登录，请先登录'
                    })
                }
            });
        },
        goHome(){
            this.$router.push('/home');
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
        }
    }
}
</script>


<style scoped>

    a{
        text-decoration: none;
        color: #000;
    }
    .mainBox{
        margin: 15px;
    }
    .weui-grids:before{
        border-top: none;
    }
    .icon{
        width: 26px;
        height: auto;
        margin: 0 auto;
    }
    .icon_money{
        width: 40px;
        height: 40px;
        margin: 0 auto;
    }
    .icon_title{
        font-size: 14px;
    }
    .typeInfoStyle{
        display: block;
        font-size: 14px;
    }

</style>
