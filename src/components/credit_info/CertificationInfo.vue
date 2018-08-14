<template>
  <div style="position:relative">
      <popup-header left-text="实名认证"></popup-header>

      <card class="cardBox">
          <div slot="content" style="height: 140px;position: relative">
              <div style="position: absolute;left: 10px;bottom: 20px;">
                  <p>{{name}}</p>
                  <p>{{idCardNo}}</p>
              </div>
              <div style="width: 100px;height: 100px;position:absolute;right: 5px;bottom: 0;">
                  <img style="width: 90%;position: relative;top: 50%;transform: translateY(-50%);" src="../../assets/yishim_icon.png">
              </div>
          </div>
      </card>
      <div class="headerImg">
          <img class="titleImg" src="../../assets/shim_icon.png">
      </div>
      <group style="margin: 40px 0;">
          <cell>
              <span slot="title" class="edit-left">身份证正面</span>
              <span slot="default">已完善</span>
          </cell>
              <!--<img :src="idImgFront"  class="IDcard_img">-->
          <cell>
              <span slot="title" class="edit-left">身份证反面</span>
              <span slot="default">已完善</span>
          </cell>
              <!--<img :src="idImgBack" class="IDcard_img" >-->
      </group>
      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>

<script>
    import { XHeader, TransferDom, PopupHeader,Actionsheet,Card,Group, Cell } from 'vux'
    import {httpUrl} from '../../http_url';

export default {
    directives: {
        TransferDom
    },
  data () {
    return {
        show: false,
        showMenus: false,
        menus: {
            menu1: '退出登录'
        },
        name:'',
        idCardNo: '',
        idImgFront:'',
        idImgBack:'',
        bankImg:'',
    }
  },
    created(){
        this.infoCheck();
        this.getData();
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        Card,
        Group,
        Cell
    },
    methods:{
        infoCheck(){
            const _this = this;
            this.$axios({
                method: 'post',
                url:httpUrl.informationCheck,
            }).then((res)=>{
                console.log(res.data)
                let data = res.data.retData;
                if(res.data.errCode==200){
                    let personType = data.person;
                    let bankType = data.bank;
                    if(personType == 0){
                        this.$vux.alert.show({
                            title: '错误提示',
                            content: '未实名认证，请先实名认证',
                            onHide () {
                                _this.$router.push('/credit_info_list');
                            }
                        })
                        return
                    }
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
        getData(){
            const _this = this;
            let postData = this.$qs.stringify({
                page:1
            })
            this.$axios({
                method: 'post',
                url:httpUrl.userInformation,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data:postData
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.name = res.data.retData.idcard_name;
                    this.idCardNo = res.data.retData.idcard_num;
                    this.idImgFront = res.data.retData.front;
                    this.idImgBack = res.data.retData.back;
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
        goHome(){
            this.$router.push('/home');
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
        top: 65px;
        left: 0;
        right: 0;
        margin: auto;
    }
    .cardBox{
        margin: 63px 15px 20px 15px;
        border: 1px solid #eee;
        border-radius: 6px;
        position: relative;
    }
    .titleImg{
        width: 70%;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
    .IDcard_img {
        display: block;
        margin:10px auto;
        width: 90%;
       /* transform:rotate(90deg); */
    /* -ms-transform:rotate(90deg); 	IE 9 */
    /* -moz-transform:rotate(90deg); 	Firefox */
    /* -webkit-transform:rotate(90deg); Safari 和 Chrome */
    /* -o-transform:rotate(90deg);  */
    }
</style>
