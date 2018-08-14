<template>
  <div>
      <popup-header left-text="实名认证" right-text="提交" @on-click-right="submit"></popup-header>
      <!-- <div class="imgBox">
          <p class="imgTitle">身份证正面</p>
          <VueImgInputer
                  class="idCardImg"
                  v-model="idCardFrontImg"
                  theme="light"
                  accept="image/*,"
                  :imgSrc="idCardFrontUrl"
                  :onChange="onChangeFront"
                  :maxSize="5242880"
                  placeholder="请上传身份证正面图片(头像那一面)"
                  noMask
                  size="small">
          </VueImgInputer>
      </div> -->

        <div class="imgBox">
              <img class="idDemo" src="../../assets/idCardDemo_02.png">
                <span v-show="show=='true'">
                    <VueImgInputer
                        id='idCardFront'
                        class="idCardImg"
                        v-model="idCardFrontImg"
                        theme="light"
                        accept="image/*,"
                        :capture="false"
                        :imgSrc="idCardFrontUrl"
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
        <img class="idDemo" src="../../assets/idCardDemo_01.png">
         <span  v-show="display=='true'">
              <VueImgInputer
                    id='idCardBack'
                    class="idCardImg"
                    v-model="idCardBackImg"
                    theme="light"
                    accept="image/*"
                    :imgSrc="idCardBackUrl"
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
       <group v-show="show=='success1'" class="group" label-width="5.5em" label-margin-right="1em" label-align="justify">
           <x-input title="姓名" v-model="name" readonly></x-input>
           <x-input title="身份证号码" v-model="idCard" :max="18" readonly></x-input>
        </group>

      <divider style="margin: 30px 10px">身份证识别失败？请<span style="color: #409EFF" @click="goHandle">手动认证</span></divider>
      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>

<script>
    import { XHeader,Group, TransferDom, PopupHeader,Actionsheet,XButton,Alert,Toast,Divider,XInput } from 'vux'
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
        idCardFrontUrl:'./static/imgs/photo_icon.png',
        idCardBackImg:'',
        idCardBackUrl:'./static/imgs/photo_icon.png',
        name:'',
        idCard:'',
        display:'true',
        show:'true',
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
            this.show = 'false';
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
                    this.show = 'success1';
                }else if(res.data.errCode==201){
                    this.$vux.toast.show({
                        text: res.data.retMsg + '，请重新上传',
                        type:'warn'
                    })
                    this.idCardFrontImg = '';
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
        //        上传身份证反面
        upLoadBackImg(base64, type){
            const _this = this;
            this.$vux.loading.show({
                text: '正在上传...'
            })
            this.display = 'false';
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
                    this.display = 'success2';
                }else if(res.data.errCode==201){
                    this.$vux.toast.show({
                        text: res.data.retMsg + '，请重新上传',
                        type:'warn'
                    })
                    this.idCardBackImg = '';
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
    .group {
        margin: 15px;
    }
    .imgBox{
        margin: 15px;
        padding: 10px 0;
        height: 48px;
        line-height: 48px;
        position: relative;
        background: #fff;
    }

    .idCardImg{
        width:40px;
        height: 40px;
        float: right;
        margin-right: 20px;
        margin-top: 4px;
        background: #def1ff;
    }
    .idDemo {
        /* width: 150px; */
        height: 48px;
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
    .img-inputer__preview-box{
        background: #fff;
        border: none;
    }

</style>
