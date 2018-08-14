<template>
  <div>
      <popup-header left-text="实名认证" right-text="提交" @on-click-right="submit"></popup-header>
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
                  accept="image/jpeg, image/png, image/jpg, image/gif"
                  :imgSrc="idCardBackUrl"
                  :onChange="onChangeBack"
                  :maxSize="5242880"
                  placeholder="请上传身份证反面图片(国徽那一面)"
                  noMask
                  size="small">
          </VueImgInputer>
      </div>

      <divider style="margin: 30px 10px">身份证识别失败？请<span style="color: #409EFF" @click="goHandle">手动认证</span></divider>
      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>

<i18n>

</i18n>
<script>
    import { XHeader, TransferDom, PopupHeader,Actionsheet,XButton,Alert,Toast,Divider  } from 'vux'
    import {httpUrl} from '../../http_url';
    import { setTimeout } from 'timers';
    import 'vue-img-inputer/dist/index.css'

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
        phone:'',
        showMenus: false,
        idCardFrontImg:'',
        idCardFrontUrl:'',
        idCardBackImg:'',
        idCardBackUrl:'',
        name:'',
        idCard:''
    }
  },
    created(){
//        this.infoCheck();
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
                    self.upLoadFrontImg(reader.result,2)
                }else {
                    img.onload = function () {
                        let src = self.compress(img);
                        self.upLoadFrontImg(src,2)
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
                    self.upLoadBackImg(reader.result,3)
                }else {
                    img.onload = function () {
                        let src = self.compress(img);
                        self.upLoadBackImg(src,3)
                    }
                }
            };
        },
        //        上传身份证正面
        upLoadFrontImg(base64, type){
            const _this = this;
            this.$vux.loading.show({
                text: '正在上传...'
            })
            let postData = this.$qs.stringify({
                typeid:type,
                image:base64
            })
            this.$axios({
                method: 'post',
                url:httpUrl.idcardUploads,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data:postData
            }).then((res)=>{
                console.log(res.data);
                this.$vux.loading.hide();
                if(res.data.errCode==200){
                    this.$vux.toast.show({
                        text: '上传成功',
                        type:'success',
                        time:2000
                    });
                    this.name = res.data.retData.name;
                    this.idCard = res.data.retData.idcard;
                }else if(res.data.errCode==201){
                    this.$vux.toast.show({
                        text: res.data.retMsg + '，请重新上传',
                        type:'warn'
                    })
                    this.idCardFrontImg = ''
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
        //        上传身份证反面
        upLoadBackImg(base64, type){
            const _this = this;
            this.$vux.loading.show({
                text: '正在上传...'
            })
            let postData = this.$qs.stringify({
                typeid:type,
                image:base64
            })
            this.$axios({
                method: 'post',
                url:httpUrl.idcardUploads,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data:postData
            }).then((res)=>{
                console.log(res.data);
                this.$vux.loading.hide();
                if(res.data.errCode==200){
                    this.$vux.toast.show({
                        text: '上传成功',
                        type:'success'
                    })
                }else if(res.data.errCode==201){
                    this.$vux.toast.show({
                        text: res.data.retMsg + '，请重新上传',
                        type:'warn'
                    })
                    this.idCardBackImg = ''
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
        submit(){
            const step_type = this.$route.query.step_type;
            const orderid = this.$route.query.orderid;
            const _this = this;

            if(this.isEmpty(this.idCardFrontImg)){
                this.showPlugin();
                return
            }if(this.isEmpty(this.idCardBackImg)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请上传身份证反面图片',
                })
                return
            }else {
                let postData = this.$qs.stringify({
                    name :this.name,
                    idcard :this.idCard
                })
                this.$axios({
                    method: 'post',
                    url:httpUrl.checkDishonest,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    data:postData
                }).then((res)=>{
                    console.log(res.data)
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
        goHandle(){
            const step_type = this.$route.query.step_type;
            const orderid = this.$route.query.orderid;
            const _this = this;

            if(step_type == '1'){
                _this.$router.push({
                    path:'/handle_certification',
                    query: {
                        step_type: '1',
                        orderid:orderid
                    }
                });
            }else {
                _this.$router.push('/handle_certification');
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
