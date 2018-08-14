<template>
  <div>
      <popup-header left-text="资料确认"></popup-header>
      <div style="margin: 20px 10px;">
          <group title="姓名">
              <x-input
                      class="inputStyle"
                      readonly
                      :max="16"
                      placeholder="请输入姓名"
                      v-model="username">
              </x-input>
          </group>
          <group title="银行">
              <x-input
                      class="inputStyle"
                      :max="18"
                      placeholder="请输入银行名称"
                      v-model="bankName">
              </x-input>
          </group>
          <group title="银行卡号">
              <x-input
                      class="inputStyle"
                      :min="16"
                      :max="19"
                      placeholder="请输入银行卡号"
                      v-model="bankNo">
              </x-input>
          </group>
          <group title="银行预留手机号">
              <x-input
                  class="inputStyle"
                  mask="999 9999 9999"
                  is-type="china-mobile"
                  :max="13"
                  placeholder="请输入银行预留手机号码"
                  v-model="phone">
              </x-input>
          </group>

          <x-button class="submitBtn" type="primary" @click.native="submit" :disabled="isDisable">提 交</x-button>
          <div v-transfer-dom>
              <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
          </div>
      </div>

  </div>
</template>

<i18n>

</i18n>
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
        bankName:'',
        bankNo:'',
        phone:'',
        isDisable: false
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
                    if(personType == 0){
                        this.$vux.alert.show({
                            title: '错误提示',
                            content: '未实名认证，请先实名认证',
                            onHide () {
                                _this.$router.push('/credit_info_list');
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
            this.$axios({
                method: 'post',
                url:httpUrl.bankInfo,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.username = res.data.retData.bank_username;
                    this.bankName = res.data.retData.bank_name;
                    this.bankNo = res.data.retData.bank_number;
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
        submit(){
            const step_type = this.$route.query.step_type;
            const orderid = this.$route.query.orderid;
            const _this = this;

            if(this.isEmpty(this.bankName)){
                this.$vux.toast.show({
                    text: '请输入银行名称',
                    type:'warn'
                });
                return
            }
            if(this.isEmpty(this.bankNo)){
                this.$vux.toast.show({
                    text: '请输入银行卡号',
                    type:'warn'
                });
                return
            }
            if(this.isEmpty(this.phone)){
                this.$vux.toast.show({
                    text: '请输入手机号',
                    type:'warn'
                });
                return
            }else {
                this.isDisable = true
                setTimeout(() => {
                    this.isDisable = false
                }, 10000)
                let postData = this.$qs.stringify({
                    phone:this.SpaceTransformation(this.phone),
                    bank_name:this.bankName,
                    bank_number:this.bankNo
                })
                this.$axios({
                    method: 'post',
                    url:httpUrl.checkBank,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    data:postData
                }).then((res)=>{
                    console.log(res.data)
                    if(res.data.errCode==200){
                        this.$vux.alert.show({
                            title: '提示',
                            content: '银行卡认证成功！',
                            onHide () {
                                if(step_type == '1'){
                                    _this.$router.push({
                                        path:'/verify_step',
                                        query: {
                                            step_type:step_type,
                                            orderid:orderid
                                        }
                                    });
                                }else {
                                    _this.$router.push({
                                        path:'/credit_info_list'
                                    });
                                }
                            }
                        });
                    }else if(res.data.errCode==201){
                        this.$vux.alert.show({
                            title: '提示',
                            content: res.data.retMsg
                        });
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
    .weui-cells__title{
        padding-left: 5px;
    }
   .inputStyle{
       border: 1px solid #eee;
       border-radius: 6px;
       font-size: 14px;
   }
    .submitBtn{
        margin-top: 30px;
    }
</style>
