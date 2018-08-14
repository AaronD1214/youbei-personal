<template>
  <div>
      <popup-header left-text="分期订单"></popup-header>
      <div>
          <tab :line-width=1 active-color='#ff9900' v-model="index" custom-bar-width="50px">
              <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @on-item-click="getData(item.id)" :key="index">{{item.title}}</tab-item>
          </tab>
          <p v-if="this.length==0" style="text-align: center;color: #666;margin-top: 50px;">暂无数据</p>
          <div v-else v-model="index" style="margin: 20px 0;">
              <card class="cardBox" v-for="(item, index) in billList" :key="index" :style="(item.status_type == 4 || item.status_type == 5) ? {background:'#f6f6f6'} : {background: '#fff'}">
                  <div slot="header" style="padding: 10px;border-bottom: 1px solid #eee;background:#f6f6f6">
                      <p>{{item.product_data}}</p>
                  </div>
                  <div slot="content" style="padding: 10px">
                      <p style="font-size: 14px;color: #666;margin: 10px 0;">
                          <span>订单类型：</span>
                          <span>{{item.order_type_name}}</span>
                      </p>
                      <p style="font-size: 14px;color: #666;margin: 10px 0;">
                          <span>订单金额：</span>
                          <span style="font-weight: bold">￥{{item.totalprice}}</span>
                      </p>
                      <p style="font-size: 14px;color: #666;margin: 10px 0;">
                          <span>分期期数：</span>
                          <span>{{item.stage}}期</span>
                      </p>
                      <p style="font-size: 14px;color: #666;margin: 10px 0;">
                          <span>创建时间：</span>
                          <span>{{item.buytime}}</span>
                      </p>
                      <p style="font-size: 14px;color: #666;margin: 10px 0;">
                          <span>订单状态：</span>
                          <span v-if="item.status_type == 2" style="color: #409EFF">{{item.status_name}}
                              <span style="text-align: right;"><icon type="info" style="font-size: 18px;"></icon></span>
                          </span>
                          <span v-else-if="item.status_type == 3" style="color: #67C23A">{{item.status_name}}
                              <span style="text-align: right"><icon type="success-no-circle" style="font-size: 18px;"></icon></span>
                          </span>
                          <span v-else-if="item.status_type == 4" style="color: #333">{{item.status_name}}</span>
                          <span v-else-if="item.status_type == 5" style="color: #333">{{item.status_name}}</span>
                          <span v-else style="color: #ff9900">{{item.status_name}}</span>
                      </p>
                  </div>
                  <div slot="footer" style="padding: 10px;text-align: center;border-top:1px solid #eee;color: #409EFF ">
                      <span @click="goBillDetail(item)">查看详情</span>
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
    import { XHeader,PopupHeader,Actionsheet , TransferDom, Card ,Tab, TabItem,} from 'vux'
    import {httpUrl} from '../../http_url';
    const list = () => [
        {title:'全部',id:0},
        {title:'待签署',id:1},
        {title:'待支付',id:2},
        {title:'还款中',id:5},
        {title:'已还清',id:4},
        {title:'已关闭',id:6}
    ]

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
        list2: list(),
        demo2: '全部',
        index:0,
        billList:[],
        length:'',
    }
  },
    created(){
        this.getData(0);
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        Card,
        Tab, TabItem,
    },
    methods:{
        getData(id){
            console.log(id)
            const _this = this;
            this.$vux.loading.show({
                text: '正在加载中...'
            })
            let postData = this.$qs.stringify({
                status:id
            })
            this.$axios({
                method: 'post',
                url:httpUrl.orderList,
                data:postData
            }).then((res)=>{
                console.log(res.data)
                this.$vux.loading.hide();
                if(res.data.errCode==200){
                    this.billList = res.data.retData;
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
        goBillDetail(item){
            this.$router.push({
                path:'/bill_detail',
                query: {
                    orderid:item.orderid
                }
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
        },
        goCreditInfoList(){
            this.$router.push('/credit_info_list');
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
    .weui-panel:before{
        border-top: none;
    }
    .weui-panel:after{
        border-bottom: none;
    }

</style>
