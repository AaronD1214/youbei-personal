<template>
  <div>
      <!--<x-header-->
              <!--:left-options="{backText: '首页'}"-->
              <!--:right-options="{showMore: true}"-->
              <!--on-click-back = "goHome"-->
              <!--@on-click-title = "goHome"-->
              <!--@on-click-more="showMenus = true">游呗个人-->
      <!--</x-header>-->
      <popup-header left-text="当月待还" right-text="还款记录" @on-click-right="goRepaymentRecord"></popup-header>
      <p v-if="this.length==0" style="text-align: center;color: #666;margin-top: 50px;">暂无数据</p>
      <div v-else>
          <card class="cardBox" style="margin-top: 20px;background:#ffffcc">
              <div slot="content" style="padding: 20px;text-align: center">
                  <p style="font-size: 14px;color: #666;">待还款金额</p>
                  <p style="font-size: 20px;color: #F56C6C;">￥{{all_price}}</p>
              </div>
          </card>
          <p style="margin: 10px 20px">账单详情</p>
          <card class="cardBox" v-for="(item, index) in orderList" :key="index">
              <div slot="header" style="padding: 10px;border-bottom: 1px solid #eee;background:#f6f6f6">
                  <p>{{item.product_data}}</p>
              </div>
              <div slot="content" style="padding: 10px">
                  <p style="font-size: 14px;color: #666;margin: 10px 0;">
                      <span>订单类型：</span>
                      <span>{{item.order_type_name}}</span>
                  </p>
                  <p style="font-size: 14px;color: #666;margin: 10px 0;">
                      <span>还款金额：</span>
                      <span style="font-weight: bold">￥{{item.order_pre_price}}</span>
                  </p>
                  <p style="font-size: 14px;color: #666;margin: 10px 0;">
                      <span>分期期数：</span>
                      <span>{{item.stage}} / {{item.order_stage}} 期</span>
                  </p>
                  <p style="font-size: 14px;color: #666;margin: 10px 0;">
                      <span>还款日期：</span>
                      <span>每月{{item.dates}}日</span>
                  </p>
              </div>
          </card>
      </div>

      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>

<i18n>

</i18n>
<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom, FormPreview ,Card    } from 'vux'
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
        all_price:0
    }
  },
    created(){
        this.getData();
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        Card ,
        FormPreview,
    },
    methods:{
        getData(){
            const _this = this;
            this.$axios({
                method: 'post',
                url:httpUrl.billList
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.all_price = res.data.retData.all_price;
                    this.orderList = res.data.retData.list;
                    this.length = res.data.retData.list.length;
                    for(var index in this.orderList){
                        _this.payMoney.push(this.orderList[index].order_pre_price);
                    }
                    this.repayMoneySum = this.moneySum(_this.payMoney);
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
        moneySum(arr){
            var s = 0;
            arr.forEach(function(val, index, arr) {
                s += val;
            }, 0);
            return s;
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
        goRepaymentRecord(){
            this.$router.push('/repayment_record');
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
