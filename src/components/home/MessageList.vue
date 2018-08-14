<template>
  <div>
      <!--<popup-header left-text="最新消息"></popup-header>-->
      <div style="margin: 15px 0;">
          <p v-if="this.messagesList.length == '0'" style="text-align: center;color: #666;margin-top: 50px;">暂无最新消息</p>
          <div v-else v-for="(item, index) in messagesList" :key="index">
              <p style="text-align: center;color: #9b9b9b;">{{item.time}}</p>
              <card @click.native="clickMessage(item)"
                    class="cardBox"
                    :footer="(item.message_type == '2') ? {title: '查看详情'} : {}">
                  <div slot="content" style="padding: 10px">
                      <p style="color: #666;margin: 5px 0;">
                          <span style="text-align: left">{{item.content}}</span>
                      </p>
                  </div>
                  <img v-show="item.message_type == '2'" class="lock-icon" slot="footer" src="../../assets/right_icon.png">
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
        showMenus: false,
        messagesList:[],
        message_type:''
    }
  },
    created(){
        this.getMessage();
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
        getMessage(){
            const _this = this;
            this.$axios({
                method: 'get',
                url:httpUrl.messageList,
            }).then((res)=>{
                console.log(res.data)
                console.log(res.data.retData.list.length)
                if(res.data.errCode==200){
                    this.messagesList = res.data.retData.list;
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
        clickMessage(item){
            if(item.message_type == '2'){
                this.$router.push({
                    path:'/verify_step',
                    query: {
                        orderid:item.orderid
                    }
                });
            }
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
        margin:10px 15px;
        border: 1px solid #eee;
        border-radius: 6px;
        position: relative;
    }
    .lock-icon{
        width: 16px;
        height: 16px;
        position: absolute;
        bottom: 15px;
        right: 15px;
    }
</style>
