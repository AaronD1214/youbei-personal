<template>
  <div>
      <popup-header left-text="实名认证" right-text="提交" @on-click-right="submit"></popup-header>
      <group title="真实姓名">
          <x-input is-type="china-name" :max="16" placeholder="请输入你的真实姓名" v-model="username"></x-input>
      </group>
      <group title="身份证号码">
          <x-input :max="18" placeholder="请输入身份证号码" v-model="cardNo" @on-blur="checkCardNo"></x-input>
      </group>
      <div class="imgBox">
          <p class="imgTitle">身份证正面</p>
          <VueImgInputer
                  class="idCardImg"
                  v-model="idCardFrontImg"
                  theme="light"
                  accept="image/*"
                  :imgSrc="idCardFrontUrl"
                  :onChange="onChangeFront"
                  :maxSize="5242880"
                  placeholder="请上传身份证正面图片(头像那一面)"
                  noMask
                  size="small">
          </VueImgInputer>
      </div>
      <div class="imgBox">
          <p class="imgTitle">身份证反面</p>
          <VueImgInputer
                  class="idCardImg"
                  v-model="idCardBackImg"
                  theme="light"
                  accept="image/*"
                  :imgSrc="idCardBackUrl"
                  :onChange="onChangeBack"
                  :maxSize="5242880"
                  placeholder="请上传身份证反面图片(国徽那一面)"
                  noMask
                  size="small">
          </VueImgInputer>
      </div>
      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>

<script>
    import { XHeader, TransferDom, PopupHeader,Actionsheet,XButton,Alert,Toast,Divider ,XInput, Group, } from 'vux'
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
        showMenus: false,
        username:'',
        cardNo:'',
        idCardFrontImg:'',
        idCardFrontImgBase64:'',
        idCardFrontUrl:'',
        idCardBackImg:'',
        idCardBackImgBase64:'',
        idCardBackUrl:'',
    }
  },
    created(){
        this.infoCheck();
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        XButton,
        Alert,
        Toast,
        Divider,
        XInput,
        Group,
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
                    if(personType == 1){
                        this.$vux.alert.show({
                            title: '错误提示',
                            content: '已实名认证',
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
        showPlugin () {
            this.$vux.alert.show({
                title: '错误提示',
                content: '请上传身份证正面图片',
            })
        },
        onChangeFront(file){
            const self = this;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                let result = reader.result;
                let img = new Image();
                img.src = result;
                //判断图片是否小于100K,是就直接上传，反之压缩图片
                if (this.result.length <= (100 * 1024)) {
                    self.idCardFrontImgBase64 = reader.result
                }else {
                    img.onload = function () {
                        let src = self.compress(img);
                        self.idCardFrontImgBase64 = src
                    }
                }
            };
        },
        onChangeBack(file){
            const self = this;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                let result = reader.result;
                let img = new Image();
                img.src = result;
                //判断图片是否小于100K,是就直接上传，反之压缩图片
                if (this.result.length <= (100 * 1024)) {
                    self.idCardBackImgBase64 = reader.result
                }else {
                    img.onload = function () {
                        let src = self.compress(img);
                        self.idCardBackImgBase64 = src
                    }
                }
            };
        },
        checkCardNo(){
            if(this.isEmpty(this.cardNo)){
                this.$vux.toast.show({
                    text: '请输入身份证号',
                    type:'warn'
                })
                return
            }
            if(!this.Val.isIdCardNo(this.cardNo)){
                this.$vux.toast.show({
                    text: '请输入正确的身份证号',
                    type:'warn'
                })
                this.cardNo = '';
                return
            }
        },
        submit(){
            const step_type = this.$route.query.step_type;
            const orderid = this.$route.query.orderid;
            const _this = this;

            if(this.isEmpty(this.username)){
                this.$vux.toast.show({
                    text: '请输入姓名',
                    type:'warn'
                })
                return
            }
            if(this.isEmpty(this.cardNo)){
                this.$vux.toast.show({
                    text: '请输入身份证号',
                    type:'warn'
                })
                return
            }
            if(!this.Val.isIdCardNo(this.cardNo)){
                this.$vux.toast.show({
                    text: '请输入正确的身份证号',
                    type:'warn'
                })
                this.cardNo = '';
                return
            }
            if(this.isEmpty(this.idCardFrontImg)){
                this.showPlugin();
                return
            }
            if(this.isEmpty(this.idCardBackImg)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请上传身份证反面图片',
                })
                return
            }else {
                this.$vux.loading.show({
                    text: '正在上传...'
                });
                let postData = this.$qs.stringify({
                    name:this.username,
                    idcard:this.cardNo,
                    img_front:this.idCardFrontImgBase64,
                    img_back:this.idCardBackImgBase64
                })
                this.$axios({
                    method: 'post',
                    url:httpUrl.manualIdcard,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    data:postData
                }).then((res)=>{
                    console.log(res.data)
                    this.$vux.loading.hide();
                    if(res.data.errCode==200){
                        this.$vux.alert.show({
                            title: '提示',
                            content: '实名认证成功！',
                            onHide () {
                                if(step_type == '1'){
                                    _this.$router.push({
                                        path:'/verify_step',
                                        query: {
                                            orderid:orderid
                                        }
                                    });
                                }else {
                                    _this.$router.push('/credit_info_list');
                                }
                            }
                        });
                    }else if(res.data.errCode==201){
                        this.$vux.alert.show({
                            title: '提示',
                            content: res.data.retMsg,
                        });
                        this.username  = "";
                        this.cardNo = "";
                        this.idCardFrontImg = '';
                        this.idCardBackImg = '';
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
            }
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
    .imgBox{
        margin: 15px;
    }
.imgTitle{
    text-align: left;
    color: #828282;
    font-size: 14px;
    margin: 15px 0;
}
    .idCardImg{
        width: 100%;
        max-width: 400px;
        height: 200px;
    }
</style>
