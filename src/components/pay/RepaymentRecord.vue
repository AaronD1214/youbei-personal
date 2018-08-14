<template>
  <div>
      <x-header
              :left-options="{backText: '首页'}"
              :right-options="{showMore: true}"
              on-click-back = "goHome"
              @on-click-title = "goHome"
              @on-click-more="showMenus = true">游呗个人
      </x-header>
      <popup-header left-text="还款记录"></popup-header>
      <div style="margin: 15px 0;">
          <p v-show="this.length==0" style="text-align: center;color: #666;margin-top: 50px;">暂无还款记录</p>
          <card class="cardBox" v-for="(item, index) in recordList" :key="index">
              <div slot="content" style="padding: 10px">
                  <div>
                      <p style="color: #666;margin: 5px 0;">
                          <span style="text-align: left">还款</span>
                          <span style="float:right;text-align: right">{{item.pay_money}}</span>
                      </p>
                      <p style="font-size: 14px;color: #666;margin: 5px 0;">
                          <span style="font-size: 14px;color: #999">2016-09-01 09:00:00</span>
                          <span style="float:right;font-size: 14px;color: #0bb20c">成功</span>
                      </p>
                  </div>
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
        recordList:[],
        length:''
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
            const _this = this;
            this.$axios({
                method: 'post',
                url:httpUrl.sementList,
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.recordList = res.data.retData;
                    this.length = res.data.retData.length;
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
    }

</style>
