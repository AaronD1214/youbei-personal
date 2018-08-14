<template>
  <div>
      <popup-header left-text="以下信用报告二选一"></popup-header>
      <div class="py_creditBox" v-show="this.pengyuan_reporStatus == 0" @click="getPengyuan">
          <div class="py_credit_fl">
              <img src="../../assets/zhengxin_icon.png" class="zhengxin_icon">
              <span class="py_title">个人信用报告查询</span>
              <span class="py_tips">可立即拿到信用报告</span>
          </div>
          <div class="py_credit_fr">
              <span class="pr_price">¥ 39</span>
              <div class="sanjiao">
                  <span class="sanjiao_text">立即</span>
              </div>
          </div>
      </div>
      <div class="py_creditBox" v-show="this.pengyuan_reporStatus == 1" @click="openPyReport">
          <div class="py_credit_fl">
              <img src="../../assets/zhengxin_icon.png" class="zhengxin_icon">
              <span class="py_title" style="line-height: 120px;margin-top: 0;">查看个人信用报告</span>
          </div>
          <div class="py_credit_fr">
              <img src="../../assets/right2_icon.png" class="right2_icon">
              <div class="sanjiao">
                  <span class="sanjiao_text">立即</span>
              </div>
          </div>
      </div>
      <div class="py_creditBox" @click="goRenhang">
          <div class="py_credit_fl">
              <img src="../../assets/renhangzx_icon.png" class="rengangzx_icon">
              <span class="py_title">人民银行信用报告</span>
              <span class="py_tips" style="font-size: 14px;">需要2-3天才能拿到信用报告</span>
          </div>
          <div class="py_credit_fr">
              <img src="../../assets/right2_icon.png" class="right2_icon">
              <div class="sanjiao2">
                  <span class="sanjiao_text">2-3天</span>
              </div>
          </div>
      </div>


  </div>
</template>

<script>
    import { XHeader, TransferDom, PopupHeader,Actionsheet,XButton,Alert,Toast,Divider  } from 'vux'
    import {httpUrl} from '../../http_url';

export default {
    directives: {
        TransferDom
    },
  data () {
    return {
        show: false,
        menus: {
            menu1: '退出登录'
        },
        PengyuanUrl:'',
        pengyuan_reporStatus:''
    }
  },
    created(){
        let pengyuan_reporStatus = this.$route.query.pengyuan_reporStatus;
        this.pengyuan_reporStatus = pengyuan_reporStatus;
        console.log(pengyuan_reporStatus)
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        XButton,
        Alert,
        Toast,
        Divider
    },
    methods:{
        getPengyuan(){
            const _this = this;
            this.$axios({
                method: 'post',
                url:httpUrl.buildRequest,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.PengyuanUrl = res.data.retData.url;
                    window.location = this.PengyuanUrl;
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
        openPyReport(){
            this.$router.push({
                path:'/py_report',
            });
        },
        goRenhang(){
            if(this.checkIOS()){
                window.location = 'https://ipcrs.pbccrc.org.cn/';
            }else {
                this.$router.push({
                    path:'/renhang_credit_msg',
                    query: {
                        pengyuan_reporStatus: this.pengyuan_reporStatus
                    }
                });
            }

        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .py_creditBox{
        height: 120px;
        margin: 15px 15px;
        background: #ffffff;
        border:1px solid #ebebeb;
        /*border-radius: 6px;*/
        position: relative;
    }
    .py_credit_fl{
        float: left;
        height: 120px;
    }
    .zhengxin_icon{
        float: left;
        width: 80px;
        height: 80px;
        margin: 20px 0;
    }
    .rengangzx_icon{
        float: left;
        width: 48px;
        height: 48px;
        margin: 36px 10px;
    }
    .py_title{
        float: left;
        font-size: 20px;
        color: #325fa5;
        margin-top: 30px;
    }
    .py_credit_fr{
        position: absolute;
        height: 120px;
        width: 60px;
        right: 0;
    }
    .py_tips{
        float: left;
        color: #b5b5b5;
    }
    .pr_price{
        position: absolute;
        right: 20px;
        z-index: 999;
        line-height: 120px;
        font-size: 20px;
        color: #7f7f7f;
    }
    .sanjiao{
        position: absolute;
        height: 0px;
        width: 0px;
        right: 0;
        top: 70px;
        /*border-bottom-right-radius: 6px;*/
        /*border-top: 90px solid transparent;*/
        border-left: 50px solid transparent;
        border-bottom: 50px solid #3889ff;
    }
    .sanjiao2{
        position: absolute;
        height: 0px;
        width: 0px;
        right: 0;
        top: 70px;
        /*border-bottom-right-radius: 6px;*/
        /*border-top: 90px solid transparent;*/
        border-left: 50px solid transparent;
        border-bottom: 50px solid #bc0015;
    }
    .sanjiao_text{
        width: 50px;
        color: #ffffff;
        position: absolute;
        font-size: 14px;
        right: -17px;
        top:14px;
        transform:rotate(-45deg);
        -ms-transform:rotate(-45deg); 	/* IE 9 */
        -moz-transform:rotate(-45deg); 	/* Firefox */
        -webkit-transform:rotate(-45deg); /* Safari 和 Chrome */
        -o-transform:rotate(-45deg);
    }
    .right2_icon{
        width: 24px;
        position: absolute;
        right: 25px;
        top:0;
        bottom: 0;
        margin: auto;
        z-index: 999;
        line-height: 120px;
    }
</style>
