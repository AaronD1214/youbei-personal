<template>
  <div>
      <popup-header left-text="银行卡认证" right-text="下一步" @on-click-right="nextStep"></popup-header>
      <div style="margin: 15px 10px;overflow: hidden;">
          <masker style="border-radius: 6px;height:60px;line-height: 60px;" color="#faece9">
              <div class="m-title">
                  请上传持卡人为"<span class="tips-BTitle">{{username}}</span>"的银行卡
              </div>
          </masker>
      </div>
      <div class="imgBox">
            <img class="idDemo" src="../../assets/bcf_demo.png">
            <span v-show="show=='true'">
                <VueImgInputer
                        class="idCardImg"
                        v-model="bankCardFrontImg"
                        theme="light"
                        accept="image/*"
                        :imgSrc="bankCardFrontUrl"
                        :onChange="onChangeFront"
                        :maxSize="5242880"
                        placeholder=""
                        noMask
                        size="small">
                </VueImgInputer>
          </span>
           <img v-show="show=='success1'"  class="certifi_icon" src="../../assets/suc_icon.png">
           <img v-show="show=='fail'"  class="certifi_icon" src="../../assets/fail_icon.png">
      </div>
      <div class="imgBox">
         <img class="idDemo" src="../../assets/bcb_demo.png">
         <span  v-show="display=='true'">
            <VueImgInputer
                    class="idCardImg"
                    v-model="bankCardBackImg"
                    theme="light"
                    accept="image/*"
                    :imgSrc="bankCardBackUrl"
                    :onChange="onChangeBack"
                    :maxSize="5242880"
                    placeholder=""
                    noMask
                    size="small">
            </VueImgInputer>
          </span>
           <img v-show="display=='success2'"  class="certifi_icon" src="../../assets/suc_icon.png">
           <img v-show="display=='fail'"  class="certifi_icon" src="../../assets/fail_icon.png">
      </div>
       <group v-show="show=='success1'"  class="group">
            <x-input title="银行卡号：" v-model="bcNo" :max="19" readonly></x-input>
        </group>
      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>

<i18n>

</i18n>
<script>
    import { XHeader, TransferDom, PopupHeader,Actionsheet,XButton,Alert,Toast,Divider,Masker,Group,XInput  } from 'vux'
    import {httpUrl} from '../../http_url';
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
        showMenus: false,
        username:'username',
        bankCardFrontImg:'',
        bankCardFrontUrl:'./static/imgs/photo_icon.png',
        bankCardBackImg:'',
        bankCardBackUrl:'./static/imgs/photo_icon.png',
        display:'true',
        show:'true',
        bcNo:'',
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
        XButton,
        Alert,
        Toast,
        Divider,
        Masker,
        Group,
        XInput
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
                                 _this.$router.push('/certification');
                             }
                         })
                         return
                     }else if(bankType == 1){
                         this.$vux.alert.show({
                             title: '错误提示',
                             content: '银行卡已验证！',
                             onHide () {
                                 _this.$router.push('/credit_info_list');
                             }
                         })
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
                    this.username = res.data.retData.name;
                }else if(res.data.errCode==201){
                    this.$vux.toast.show({
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
                content: '请上传银行卡正面图片',
            })
        },
        showAlert(errText){
            const _this = this
            this.$vux.confirm.show({
                title:'提示',
                content:errText,
                cancelText:'取消',
                confirmText:'手动银行卡认证',
                // 组件除show外的属性
                onCancel () {

                },
                onConfirm () {
                    _this.$router.push('/bank_edit');
                }
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
        // 上传银行卡正面
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
                url:httpUrl.bankUploads,
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
                    })
                    this.bcNo = res.data.retData.bank_number;
                     this.show = 'success1';
                }else if(res.data.errCode==201){
                    this.showAlert(res.data.retMsg);
                    this.bankCardFrontImg = '';
//                    this.show = 'fail';
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
        // 上传银行卡反面
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
                url:httpUrl.bankUploads,
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
                    this.display = "success2";
                }else if(res.data.errCode==201){
                    this.showAlert(res.data.retMsg);
                    this.bankCardBackImg = '';
//                    this.display = 'fail';
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
        nextStep(){
            const step_type = this.$route.query.step_type;
            const orderid = this.$route.query.orderid;
            const _this = this;

            if(this.isEmpty(this.bankCardFrontImg)){
                this.showPlugin();
                return
            }if(this.isEmpty(this.bankCardBackImg)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请上传银行卡反面图片',
                })
                return
            }else {
                if(step_type == '1'){
                    _this.$router.push({
                        path:'/bank_edit',
                        query: {
                            step_type:step_type,
                            orderid:orderid
                        }
                    });
                }else {
                    _this.$router.push({
                        path:'/bank_edit'
                    });
                }

            }
        },
        goHandle(){
            this.$router.push('/handle_certification');
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
    .m-title {
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        /*position: absolute;*/
        /*left: 20px;*/
        /*top: 0;*/
        /*bottom: 0;*/
        /*margin: auto;*/
        z-index: 99;
    }
    .tips-BTitle{
        color: red;
    }
    .imgBox{
        margin: 15px;
        padding: 10px 0;
        height: 48px;
        line-height: 48px;
        position: relative;
        background: #fff;
    }
.imgTitle{
    text-align: left;
    color: #828282;
    font-size: 14px;
    margin: 15px 0;
}
    .idCardImg{
        width:40px;
        height: 40px;
        float: right;
        margin-right: 20px;
        margin-top: 4px;
        background: #def1ff;
    }
    .group {
        margin: 15px;
    }
    .idDemo {
        /* width: 150px; */
        height: 50px;
        margin-left: 10px;
    }
    .certifi_icon {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 20px;
        margin: auto;
    }
</style>
