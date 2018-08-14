<template>
  <div>
      <!--<x-header-->
              <!--:left-options="{backText: '首页'}"-->
              <!--:right-options="{showMore: true}"-->
              <!--on-click-back = "goHome"-->
              <!--@on-click-title = "goHome"-->
              <!--@on-click-more="showMenus = true">游呗个人-->
      <!--</x-header>-->
      <popup-header left-text="芝麻信用"></popup-header>
       <div class="cardBox" >
             <div  class="cricle" >
                  <x-circle class="circleImg" :percent="zmPercent"
                   :stroke-width="5"
                   :trail-width="5"
                   stroke-color="#ff7c4e" 
                   trail-color="#f2f2f2"
                   anticlockwise="true">
                    <!-- <span style="color: #36D1DC">{{percent}}%</span> -->
                  </x-circle>

                  <div class="circle_content">
                    <p style="color:#656565">芝麻信用分</p>
                    <p  style="color: #ff7c4e;font-size:20px;font-weight:900">{{zmScore}}</p>
                </div>
              </div>
       </div>
      


        <!-- 图标 -->
        <div class="headerImg">
            <img class="titleImg" src="../../assets/zhima_icon.png">
        </div>

      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>
<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom,Card,XCircle } from 'vux'
    import {httpUrl} from '../../http_url';

    const list = () => [
        {title:'登录',id:0}, 
        {title:'注册',id:1}
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
       
        showMenus: false,
        // length:'',
        status_name:'',
        orderid:'',
        zmScore:700,
    }
  },
    created(){
        // this.getData(0);
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
       Card,XCircle
       
    },
    computed: {
        // 计算属性的 getter
        zmPercent: function () {
            return (this.zmScore)/9.5 * 0.5;
        }
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
        height: 265px;
        background:#fff;
        border: 1px solid #eee;
        border-radius: 6px;
        position: relative;
}



.cricle{
    padding-top:60px;
    text-align: center;
    width:200px;
    height:200px;
    margin: 0 auto;
    position: relative;
    
}

.circleImg{
    transform:rotate(-90deg);
    -ms-transform:rotate(-90deg); 	/* IE 9 */
    -moz-transform:rotate(-90deg); 	/* Firefox */
    -webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
    -o-transform:rotate(-90deg);
   
}
.circle_content {
    text-align: center;
    width: 100%;
    position: absolute;
    top: 40%;
    /* left: -10%; */
}
.circle_content::after {
    content: '';
    display: block;
    height:104px;
    background: #fff;
}


</style>
