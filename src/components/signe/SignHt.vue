<template>
  <div>
      <popup-header left-text="签署合同" right-text="签署" @on-click-right="goSignature"></popup-header>
      <p @click="openHt" style="text-align: center;margin-top: 50px;color: #409EFF">
          <img src="../../assets/PDF.png" class="icon_img">点击预览合同
      </p>
      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>

<i18n>

</i18n>
<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom, Card ,Tab, TabItem } from 'vux'
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
        pdfurls:'',
    }
  },
    created(){
        this.getData();
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet
    },
    methods:{
        goSignature(){
            let orderid = this.$route.query.orderid;
            this.$router.push({
                path:'/txr_signature',
                query: {
                    orderid:orderid
                }
            });
        },
        getData(){
            let orderid = this.$route.query.orderid;
            const _this = this;
            let postData = this.$qs.stringify({
                orderid:orderid,
                type:2
            })
            this.$axios({
                method: 'post',
                url:httpUrl.orderInfo,
                data:postData
            }).then((res)=>{
                console.log(res.data)
                let data =res.data.retData;
                if(res.data.errCode==200){
                    this.pdfurls = data.orderInfo.ht_url;
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
    .icon_img{
        width: 36px;
        height: 36px;
        display: block;
        text-align: center;
        margin: 0 auto;
        padding: 5px 0;
    }

</style>
