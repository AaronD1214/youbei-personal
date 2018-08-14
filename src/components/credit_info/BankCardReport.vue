<template>
  <div>
      <!--<x-header-->
              <!--:left-options="{backText: '首页'}"-->
              <!--:right-options="{showMore: true}"-->
              <!--on-click-back = "goHome"-->
              <!--@on-click-title = "goHome"-->
              <!--@on-click-more="showMenus = true">游呗个人-->
      <!--</x-header>-->
      <popup-header left-text="银行卡">
         
      </popup-header>
     
     <div class="cardBox">
         <card>
           <div slot="header" class="card_header">信用卡</div>
           <div slot="content" class="card-demo-flex card-demo-content01" >
               <div class="vux-1px-r">
                    <p class="record">00000</p>
                    <p class="re_title">信用卡</p>
               </div>
               <div class="vux-1px-r">
                    <p class="record">00000</p>
                    <p class="re_title">逾期次数</p>
               </div>
               <div class="vux-1px-r">
                    <p class="record">00000</p>
                    <p class="re_title">为他人担保</p>
               </div>
              <div>
                    <p class="record">00000</p>
                    <p class="re_title">未销户账户</p>
               </div>
           </div>
    </card>
     <card >
           <div slot="header" class="card_header2">房贷</div>
           <div slot="content" class="card-demo-flex card-demo-content01" >
               <div class="vux-1px-r">
                    <p class="record">00000</p>
                    <p class="re_title">购房贷款</p>
               </div>
               <div class="vux-1px-r">
                    <p class="record">00000</p>
                    <p class="re_title">逾期次数</p>
               </div>
               <div class="vux-1px-r">
                    <p class="record">00000</p>
                    <p class="re_title">为他人担保</p>
               </div>
              <div>
                    <p class="record">00000</p>
                    <p class="re_title">未销户账户</p>
               </div>
           </div>
    </card>
     <card >
           <div slot="header" class="card_header2">其他贷款</div>
           <div slot="content" class="card-demo-flex card-demo-content01" >
               <div class="vux-1px-r">
                    <p class="record">00000</p>
                    <p class="re_title">贷款账户</p>
               </div>
               <div class="vux-1px-r">
                    <p class="record">00000</p>
                    <p class="re_title">严重逾期</p>
               </div>
               <div class="vux-1px-r">
                    <p class="record">00000</p>
                    <p class="re_title">为他人担保</p>
               </div>
              <div>
                    <p class="record">00000</p>
                    <p class="re_title">未销户账户</p>
               </div>
           </div>
    </card>
     </div>
    
   
    <div class="headerImg">
            <img class="titleImg" src="../../assets/cd_report_icon.png">
        </div>

       


      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>
<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom, Card ,XButton } from 'vux'
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
        // length:'',
        status_name:'',
        orderid:''
    }
  },
    created(){
        // this.getData(0);
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        XButton,
        Card,
        
    },
    methods:{
        getData(id){
            console.log(id);
            const _this = this;
            let postData = this.$qs.stringify({
                status:id
            });
            this.$axios({
                method: 'post',
                url:httpUrl.txorderList,
                data:postData
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.signeList = res.data.retData;
                    this.length = res.data.retData.length;
                    this.status_name = res.data.retData.status_name;
                }else if(res.data.errCode==201){
                    this.$vux.toast.show({
                        type:'warn',
                        text: res.data.retMsg
                    })
                }else if(res.data.errCode==401){
                    this.$vux.alert.show({
                        title: '错误提示',
                        content: '未登录，请先登录',
                        // onHide () {
                        //     _this.$router.push('/quick_login');
                        // }
                    })
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
                // console.log(res.data)
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
        finish (index) {
          this.start = false;
          this.time = 60;
          this.show = true;
      },


        goHome(){
            this.$router.push('/home');
        }
    }
}


</script>
<style scoped>
 .headerImg{
        width: 80px;
        height: 80px;
        background: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 50%;
        text-align: center;
        position: absolute;
        top: 110px;
        left: 0;
        right: 0;
        margin: auto;
}
.titleImg{
        width: 70%;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
.cardBox{
        margin: 63px 10px 20px 10px;
        border: 1px solid #eee;
        border-radius: 6px;
        position: relative;
}
.card_header{
    margin: 15px;
    margin-top: 40px;
    border-bottom:1px solid #eee;
}
.card_header2{
    margin: 15px;
    margin-top: 10px;
    border-bottom:1px solid #eee;
}

.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.weui-panel:before {
    border-top: none;
}

</style>
