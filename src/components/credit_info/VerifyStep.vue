<template>
  <div>
      <div class="tips">
          <span>为了确保客户的权益，请客户仔细阅读并知晓如下每一项内容！</span>
      </div>
      <div class="step-box">
          <div class="step-num" :style="sm_status == 1 ? {color: '#1fbb23',border:'1px solid #1fbb23'} : {color: '#ff7c4e',border:'1px solid #ff7c4e'}">
              1
          </div>
          <div class="step-box-fl">
              <p>实名认证</p>
              <img class="verify_icon" src="../../assets/info_lignt_icon.png"/>
              <div v-show="this.sm_status == '0'"  class="marks">未认证</div>
              <div v-show="this.sm_status == '1'"  class="marks_check">
                  <span class="span1">已认证</span>
                  <router-link class="span2" to="certification_info">点击查看</router-link>
              </div>
          </div>
          <div class="step-box-fr">
              <p v-show="this.sm_status == '0'" >
                  <router-link :to="{ path: 'certification', query: { step_type: '1' }}" style="color:#ff7c4e">去认证 ></router-link>
              </p>
              <p v-show="this.sm_status == '1'" ><icon type="success-no-circle"></icon></p>
          </div>
      </div>
      <div class="step-box">
          <div class="step-num" :style="bank_status == 1 ? {color: '#1fbb23',border:'1px solid #1fbb23'} : {color: '#ff7c4e',border:'1px solid #ff7c4e'}">
              2
          </div>
          <div class="step-box-fl">
              <p>银行卡认证</p>
              <img class="verify_icon" src="../../assets/bankcard_light_icon.png"/>
              <div v-show="this.bank_status == '0'"  class="marks">未认证</div>
              <div v-show="this.bank_status == '1'"  class="marks_check">
                  <span class="span1">已认证</span>
                  <router-link class="span2" to="bank_info">点击查看</router-link>
              </div>
          </div>
          <div class="step-box-fr">
              <p v-show="this.bank_status == '0'" >
                  <span @click="goBankCertify" style="color:#ff7c4e">去认证 ></span>
              </p>
              <p v-show="this.bank_status == '1'" ><icon type="success-no-circle"></icon></p>
          </div>
      </div>
      <div class="step-box">
          <div class="step-num" :style="people_status == 1 ? {color: '#1fbb23',border:'1px solid #1fbb23'} : {color: '#ff7c4e',border:'1px solid #ff7c4e'}">
              3
          </div>
          <div class="step-box-fl">
              <p>联系人认证</p>
              <img class="verify_icon" src="../../assets/humen_icon.png"/>
              <div v-show="this.people_status == '0'"  class="marks">未认证</div>
              <div v-show="this.people_status == '1'"  class="marks_check">
                  <span class="span1">已认证</span>
                  <router-link class="span2" to="information_preview">点击查看</router-link>
              </div>
          </div>
          <div class="step-box-fr">
              <p v-show="this.people_status == '0'" >
                  <span @click="goInformationEdit" style="color:#ff7c4e">去认证 ></span>
              </p>
              <p v-show="this.people_status == '1'" ><icon type="success-no-circle"></icon></p>
          </div>
      </div>
      <div class="step-box">
          <div class="step-num" :style="liveface_status == 1 ? {color: '#1fbb23',border:'1px solid #1fbb23'} : {color: '#ff7c4e',border:'1px solid #ff7c4e'}">
              4
          </div>
          <div class="step-box-fl">
              <p>人脸识别认证</p>
              <img class="verify_icon" src="../../assets/video_icon.png"/>
              <div v-show="this.liveface_status == '0'"  class="marks">未认证</div>
              <div v-show="this.liveface_status == '1'"  class="marks_check">
                  <span class="span1">已认证</span>
              </div>
              <div v-show="this.liveface_status == '2'"  class="marks">认证失败</div>
          </div>
          <div class="step-box-fr">
              <p v-show="this.liveface_status == '0'" >
                  <span style="color:#ff7c4e" @click="goLiveFace">去认证 ></span>
              </p>
              <p v-show="this.liveface_status == '1'" ><icon type="success-no-circle"></icon></p>
              <p v-show="this.liveface_status == '2' && this.transfinite == '1'" >
                  <span style="color:#ff7c4e">认证失败</span>
              </p>
              <p v-show="this.liveface_status == '2' && this.transfinite == '0'" >
                  <span style="color:#ff7c4e" @click="goLiveFace">去认证 ></span>
              </p>
          </div>
      </div>
      <div class="step-box">
          <div class="step-num" :style="ht_status == 1 ? {color: '#1fbb23',border:'1px solid #1fbb23'} : {color: '#ff7c4e',border:'1px solid #ff7c4e'}">
              5
          </div>
          <div class="step-box-fl">
              <p>《分期合同》签名认证</p>
              <img class="verify_icon" src="../../assets/sign_light_icon.png"/>
              <div v-show="this.ht_status == '0'"  class="marks">未签名</div>
              <div v-show="this.ht_status == '1'"  class="marks_check">
                  <span class="span1">已签名</span>
                  <span class="span2" @click="openHt">点击查看</span>
              </div>
          </div>
          <div class="step-box-fr">
              <p v-show="this.ht_status == '0'" >
                  <span @click="goSignature" style="color:#ff7c4e">去签名 ></span>
              </p>
              <p v-show="this.ht_status == '1'" ><icon type="success-no-circle"></icon></p>
          </div>
      </div>
      <div style="width:100%;height: 20px;"></div>

  </div>
</template>

<i18n>

</i18n>
<script>
    import { XHeader,PopupHeader,Group,Cell,Actionsheet , TransferDom, Grid, GridItem ,Icon} from 'vux'
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
        sm_status:'',
        bank_status:'',
        people_status:'',
        pengyuan_status:'',
        liveface_status:'',
        sp_status:'',
        ht_status:'',
        orderid:'',
        ht_url:'',
        isIOS:true,
        transfinite:''      //活体检测次数  0:没有超过校验次数  1:超过校验次数

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
        GridItem,
        Icon
    },
    methods:{
        getData(){
            let orderid = this.$route.query.orderid;
            const _this = this;
            let postData = this.$qs.stringify({
                orderid :orderid
            })
            this.$axios({
                method: 'post',
                url:httpUrl.guideInfo,
                data:postData
            }).then((res)=>{
                console.log(res.data)
                let data = res.data.retData;
                if(res.data.errCode==200){
                    this.sm_status = data.sm_status;
                    this.bank_status = data.bank_status;
                    this.people_status = data.people_status;
                    this.ht_status = data.ht_status;
                    this.pengyuan_status = data.pengyuan_status;
                    this.liveface_status = data.liveface_status;
                    this.sp_status = data.sp_status;
                    this.ht_url = data.ht_url;
                    this.transfinite = data.transfinite;
                    this.orderid = data.orderid;
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
        goBankCertify(){
            if(this.sm_status == 0){
                this.$vux.toast.show({
                    type:'warn',
                    text: "请先完成实名认证！"
                })
            }else {
                this.$router.push({
                    path:'/bank_certify',
                    query: {
                        step_type: '1',
                        orderid:this.orderid
                    }
                });
            }
        },
        goInformationEdit(){
            if(this.bank_status == 0){
                this.$vux.toast.show({
                    type:'warn',
                    text: "请先完成银行卡认证！"
                })
            }else {
                this.$router.push({
                    path:'/information_edit',
                    query: {
                        step_type: '1',
                        orderid:this.orderid
                    }
                });
            }
        },
        goLiveFace(){
            let _this = this;
            if(this.people_status == 0){
                this.$vux.toast.show({
                    type:'warn',
                    text: "请先完成联系人认证！"
                })
            }else {
                if(this.transfinite == 1){
                    this.$vux.alert.show({
                        title: '错误提示',
                        content: '失败次数过多，请联系客服：0755-22211333',
                        onHide () {
                            _this.$router.push('/home');
                        }
                    })
                }else {
                    this.$router.push({
                        path:'/qiniu_upload',
                        query: {
                            step_type: '1',
                            orderid:this.orderid
                        }
                    });
                }
            }
        },
        goSignature(){
            let _this = this;
            if(this.liveface_status == 0){
                this.$vux.toast.show({
                    type:'warn',
                    text: "请先完成人脸识别认证！"
                })
            }else if(this.liveface_status == 2 ) {
                if(this.transfinite == 1){
                    this.$vux.alert.show({
                        title: '错误提示',
                        content: '人脸识别失败次数过多，请联系客服：0755-22211333',
                        onHide () {
                            _this.$router.push('/home');
                        }
                    })
                }else {
                    this.$vux.toast.show({
                        type:'warn',
                        text: "请先完成人脸识别认证！"
                    })
                }
            }else {
                this.$router.push({
                    path:'/signature',
                    query: {
                        step_type: '1',
                        orderid:this.orderid
                    }
                });
            }
        },
        openHt(){
            window.open(this.ht_url);
        },
        goHome(){
            this.$router.push('/home');
        }
    }
}
</script>


<style scoped>

    a{
        text-decoration: none;
        color: #000;
    }
    .tips{
        position: relative;
        height: 50px;
        line-height: 50px;
        background: #fff6e7;
        color:#a6a39e;
        font-size: 14px;
        padding: 0 15px;
        margin-bottom: 15px;
    }
    .tips span{
        display: inline-block;
        line-height: 16px;
        text-align: justify;
        vertical-align: middle;
    }
    .step-box{
        position: relative;
        height: 100px;
        margin: 5px 10px;
        background: #ffffff;
        border:1px solid #eeeeee;
        border-radius: 4px;
        padding-left: 40px;
    }
    .step-num{
        position: absolute;
        width: 24px;
        height: 24px;
        line-height: 26px;
        background: #ffffff;
        border-radius: 50%;
        font-size: 24px;
        text-align: center;
        top:20px;
        left: 28px;
        z-index: 99;
    }
    .step-box-fl{
        position: relative;
        float: left;
        height: 100px;
        border-left: 1px solid #eeeeee;
        padding-left: 20px;
    }
    .step-box-fl p{
        margin: 20px 0 10px 0;
    }
    .verify_icon{
        width: 24px;
        height: 20px;
        display: inline-block;
        float: left;
    }
    .marks{
        display: inline-block;
        width: 55px;
        height: 20px;
        line-height: 20px;
        border-radius: 16px;
        background: #ff7c4e;
        color: #fff;
        font-size: 12px;
        text-align: center;
        float: left;
        margin-left: 8px;
    }
    .marks_check{
        display: inline-block;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        float: left;
        margin-left: 8px;
    }
    .marks_check .span1{
        width: 55px;
        border-radius: 16px;
        background: #1fbb23;
        color: #fff;
        text-align: center;
        float: left;
    }
    .marks_check .span2{
        color:#1fbb23;
        font-size: 14px;
        margin-left: 10px;
    }
    .step-box-fr{
        position: relative;
        float: right;
        height: 100px;
        line-height: 100px;
        right: 20px;
    }
    .step-box-fr p{
        color: #ff7c4e;
    }

    .mainBox{
        margin: 15px;
        text-align: center;
    }
    .weui-grids:before{
        border-top: none;
    }
    .icon{
        width: 26px;
        height: auto;
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
