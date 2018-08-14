<template>
  <div>
      <!--<x-header-->
              <!--:left-options="{backText: '首页'}"-->
              <!--:right-options="{showMore: true}"-->
              <!--on-click-back = "goHome"-->
              <!--@on-click-title = "goHome"-->
              <!--@on-click-more="showMenus = true">游呗个人-->
      <!--</x-header>-->
      <popup-header left-text="分期信息"></popup-header>
      <div style="margin: 15px 0;">
          <p v-if="this.length==0" style="text-align: center;color: #666;margin-top: 50px;">暂无还款记录</p>
          <div v-else>
              <p style="text-align: right;margin-right: 20px;font-size: 14px;">已还{{state_money}}元，待还{{dh_money}}元</p>
              <card class="cardBox" v-for="(item, index) in fenqiList" :key="index">
                  <div slot="content" style="padding: 10px">
                      <div>
                          <p style="color: #666;margin: 5px 0;">
                              <span style="text-align: left">{{index+1}}</span>/<span>{{length}}期</span>
                              <span style="float:right;text-align: right"><span v-if="item.state=='1'" style="margin-right: 10px;">{{item.return_time}}</span>{{item.state_name}}</span>
                          </p>
                          <p style="font-size: 14px;color: #666;margin: 5px 0;">
                              <span style="font-size: 14px;color: #999">还款日 {{item.repay_time}}</span>
                              <span v-if="item.state == 1" style="float:right;font-size: 14px;color: #0bb20c">{{item.stage_price}}元</span>
                              <span v-else="item.state == 0" style="float:right;font-size: 14px;color: red">{{item.stage_price}}元</span>
                          </p>
                      </div>
                  </div>
              </card>
          </div>
      </div>

      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>

<i18n>

</i18n>
<script>
    import { XHeader,PopupHeader,Group,Cell,CellBox ,XInput,XButton,Actionsheet , TransferDom, Masker ,Box, Grid, GridItem ,Badge, Card  } from 'vux'
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
        fenqiList:[],
        length:'',
        state_money:0,
        all_money:0,
        dh_money:0,
    }
  },
    computed: {

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
        CellBox,
        XInput,
        XButton,
        Masker,
        Box,
        Grid,
        GridItem,
        Badge,
        Card
    },
    methods:{
        getData(){
            let orderid = this.$route.query.orderid;
            let postData = this.$qs.stringify({
                orderid:orderid
            })
            const _this = this;
            this.$axios({
                method: 'post',
                url:httpUrl.orderInfo,
                data:postData
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.fenqiList = res.data.retData.fenqi.list;
                    this.length = res.data.retData.fenqi.list.length;
                    this.all_money = res.data.retData.fenqi.all_money;
                    this.state_money = res.data.retData.fenqi.state_money;
                    this.dh_money = res.data.retData.fenqi.dh_money;
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
    .cardBox{
        margin: 20px 15px;
        border: 1px solid #eee;
        border-radius: 6px;
        position: relative;
        font-size: 14px;
    }

    .weui-panel:before{
        border-top: none;
    }
    .weui-panel:after{
        border-bottom: none;
    }
</style>
