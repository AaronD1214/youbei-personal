<template>
  <div>
      <!--<x-header-->
              <!--:left-options="{backText: '首页'}"-->
              <!--:right-options="{showMore: true}"-->
              <!--on-click-back = "goHome"-->
              <!--@on-click-title = "goHome"-->
              <!--@on-click-more="showMenus = true">游呗个人-->
      <!--</x-header>-->
      <popup-header left-text="相关资料"></popup-header>
      <div style="margin: 20px 10px;">
          <group title="工作单位" label-width="4.5em" label-margin-right="1em" label-align="justify" style="margin: 20px 0;">
              <x-input title="单位名称" class="inputStyle" placeholder="请输入单位名称"  :max="200" v-model="companyName"></x-input>
              <x-input title="单位电话" class="inputStyle" placeholder="请输入单位电话" @on-blur="BlurCompanyPhone" v-model="companyPhone"></x-input>
              <x-address title="单位地址" class="inputStyle" v-model="companyAddress" placeholder="请选择单位地址" raw-value :list="addressData" value-text-align="left" @on-hide="companyAddressChange"></x-address>
              <x-textarea title="详细地址" class="inputStyle" placeholder="详细地址，例如：1号楼一单元101室" :max="100" v-model="companyDetailAddress"></x-textarea>
          </group>
          <group title="通讯地址" label-width="4.5em" label-margin-right="1em" label-align="justify">
              <x-input title="收件人"
                       class="inputStyle"
                       :max="30"
                       placeholder="请输入收件人姓名"
                       @on-blur="BlurRecipientsName"
                       v-model="recipientsName"></x-input>
              <x-input title="联系电话"
                       class="inputStyle"
                       placeholder="请输入联系电话"
                       mask="999 9999 9999" :max="13"
                       keyboard="number"
                       is-type="china-mobile"
                       @on-blur="BlurRecipientsPhone"
                       v-model="recipientsPhone"></x-input>
              <x-input title="邮箱"
                       name="email"
                       is-type="email"
                       class="inputStyle"
                       placeholder="请输入邮箱"
                       :max="50"
                       @on-blur="BlurRecipientsMail"
                       v-model="recipientsMail"></x-input>
              <x-address title="通讯地址" class="inputStyle" v-model="recipientsAddress" placeholder="请选择通讯地址" raw-value :list="addressData" value-text-align="left" @on-hide="recipientsAddressChange"></x-address>
              <x-textarea title="详细地址" class="inputStyle" placeholder="详细地址，例如：1号楼一单元101室" :max="100" v-model="recipientsDetailAddress"></x-textarea>
          </group>
          <group title="联系人一" label-width="4.5em" label-margin-right="1em" label-align="justify">
              <x-input title="姓名" class="inputStyle" :max="30" placeholder="请输入联系人姓名" v-model="ContactsName1"></x-input>
              <x-input title="手机号码"
                       class="inputStyle"
                       name="mobile"
                       mask="999 9999 9999" :max="13"
                       keyboard="number"
                       is-type="china-mobile"
                       placeholder="请输入联系人手机号码"
                       @on-blur="BlurContactsPhone1"
                       v-model="ContactsPhone1"></x-input>
          </group>
          <group title="联系人二" label-width="4.5em" label-margin-right="1em" label-align="justify">
              <x-input title="姓名" class="inputStyle" :max="30" placeholder="请输入联系人姓名" v-model="ContactsName2"></x-input>
              <x-input title="手机号码"
                       class="inputStyle"
                       name="mobile"
                       mask="999 9999 9999" :max="13"
                       keyboard="number"
                       is-type="china-mobile"
                       placeholder="请输入联系人手机号码"
                       @on-blur="BlurContactsPhone2"
                       v-model="ContactsPhone2"></x-input>
          </group>

          <x-button type="primary" @click.native ="submit" style="margin: 30px 0">提 交</x-button>
          <div v-transfer-dom>
              <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
          </div>
      </div>

  </div>
</template>

<i18n>

</i18n>
<script>
    import {
        XHeader, TransferDom, PopupHeader,
        Actionsheet,XButton,Alert,Toast,Divider ,
        XInput, Group,XAddress,ChinaAddressData,XTextarea , Value2nameFilter as value2name } from 'vux'
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
        companyName:'',
        companyPhone:'',
        addressData: ChinaAddressData,
        companyAddress:[],
        company_province:'',
        company_city:'',
        company_district:'',
        companyDetailAddress:'',
        recipientsName:'',
        recipientsPhone:'',
        recipientsMail:'',
        recipientsAddress:[],
        recipients_province:'',
        recipients_city:'',
        recipients_district:'',
        recipientsDetailAddress:'',
        ContactsName1:'',
        ContactsPhone1:'',
        ContactsName2:'',
        ContactsPhone2:''
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
        Divider,
        XInput,
        Group,
        XAddress,
        XTextarea
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
                    let dataType = data.data;
                    if(personType == 0){
                        this.$vux.alert.show({
                            title: '错误提示',
                            content: '未实名认证，请先实名认证',
                            onHide () {
                                _this.$router.push('/certification');
                            }
                        })
                        return
                    }else if(dataType == 1){
                        this.$vux.alert.show({
                            title: '错误提示',
                            content: '已提交相关资料',
                            onHide () {
                                _this.$router.push('/credit_info_list');
                            }
                        })
                    }else if(personType == 1){
                        _this.getData();
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
        //获取基本信息
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
                    this.recipientsName = res.data.retData.name;
                    this.recipientsPhone = res.data.retData.phone;
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
        BlurCompanyPhone(){
            const _this = this;
            if(this.isEmpty(this.companyPhone)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入单位电话',
                })
                return
            }else if(this.Val.isChnEng(this.companyPhone)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入正确的联系电话',
                    onHide () {
                        _this.companyPhone = ''
                    }
                })
                return
            }
        },
        BlurRecipientsPhone(){
            const _this = this;
            const recipientsPhone = this.SpaceTransformation(this.recipientsPhone);
            if(this.isEmpty(recipientsPhone)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入单位电话',
                })
                return
            }else if(!this.Val.isPhoneNum(recipientsPhone)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入正确的联系电话',
                    onHide () {
                        _this.recipientsPhone = ''
                    }
                })
                return
            }
        },
        BlurRecipientsMail(){
            const _this = this;
            if(this.isEmpty(this.recipientsMail)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入邮箱',
                })
                return
            }else if(!this.Val.isEmail(this.recipientsMail)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入正确的邮箱',
                    onHide () {
                        _this.recipientsMail = ''
                    }
                })
                return
            }
        },
        BlurRecipientsName(){

        },
        BlurContactsPhone1(){
            const _this = this;
            const ContactsPhone1 = this.SpaceTransformation(this.ContactsPhone1);
            if(this.isEmpty(ContactsPhone1)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入联系人一手机号码',
                })
                return
            }else if(!this.Val.isPhoneNum(ContactsPhone1)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入正确的手机号码',
                    onHide () {
                        _this.ContactsPhone1 = ''
                    }
                })
                return
            }
        },
        BlurContactsPhone2(){
            const _this = this;
            const ContactsPhone2 = this.SpaceTransformation(this.ContactsPhone2);
            if(this.isEmpty(ContactsPhone2)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入联系人二手机号码',
                })
                return
            }else if(!this.Val.isPhoneNum(ContactsPhone2)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入正确的手机号码',
                    onHide () {
                        _this.ContactsPhone2 = ''
                    }
                })
                return
            }
        },
        getName (value) {
            return value2name(value, ChinaAddressData)
        },
        companyAddressChange () {
            this.company_province = this.getName(this.companyAddress).split(" ")[0];
            this.company_city = this.getName(this.companyAddress).split(" ")[1];
            this.company_district = this.getName(this.companyAddress).split(" ")[2];
        },
        recipientsAddressChange(){
            this.recipients_province = this.getName(this.recipientsAddress).split(" ")[0];
            this.recipients_city = this.getName(this.recipientsAddress).split(" ")[1];
            this.recipients_district = this.getName(this.recipientsAddress).split(" ")[2];
        },
        submit(){
            const _this = this;
            const orderid = this.$route.query.orderid;
            const step_type = this.$route.query.step_type;
            const recipientsPhone = this.SpaceTransformation(this.recipientsPhone);
            const ContactsPhone1 = this.SpaceTransformation(this.ContactsPhone1);
            const ContactsPhone2 = this.SpaceTransformation(this.ContactsPhone2);

            if(this.isEmpty(this.companyName)){
                this.$vux.toast.show({
                    text: '请输入单位名称',
                    type:'warn'
                });
                return
            }else if(this.isEmpty(this.companyPhone)){
                this.$vux.toast.show({
                    text: '请输入单位联系电话',
                    type:'warn'
                });
                return
            }else if(this.Val.isChnEng(this.companyPhone)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入正确的联系电话',
                    onHide () {
                        _this.companyPhone = ''
                    }
                })
                return
            }else if(this.isEmpty(this.companyDetailAddress)){
                this.$vux.toast.show({
                    text: '请输入单位详细地址',
                    type:'warn'
                });
                return
            }else if(this.isEmpty(this.recipientsName)){
                this.$vux.toast.show({
                    text: '请输入收件人姓名',
                    type:'warn'
                });
                return
            }else if(this.isEmpty(this.recipientsPhone)){
                this.$vux.toast.show({
                    text: '请输入收件人联系电话',
                    type:'warn'
                });
                return
            }else if(!this.Val.isPhoneNum(recipientsPhone)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入正确的联系电话',
                    onHide () {
                        _this.recipientsPhone = ''
                    }
                })
                return
            }else if(this.isEmpty(this.recipientsMail)){
                this.$vux.toast.show({
                    text: '请输入收件人邮箱',
                    type:'warn'
                });
                return
            }else if(!this.Val.isEmail(this.recipientsMail)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入正确的邮箱',
                    onHide () {
                        _this.recipientsMail = ''
                    }
                })
                return
            }else if(this.isEmpty(this.recipientsDetailAddress)){
                this.$vux.toast.show({
                    text: '请输入收件人详细地址',
                    type:'warn'
                });
                return
            }else if(this.isEmpty(this.ContactsName1)){
                this.$vux.toast.show({
                    text: '请输入联系人一姓名',
                    type:'warn'
                });
                return
            }else if(this.isEmpty(this.ContactsPhone1)){
                this.$vux.toast.show({
                    text: '请输入联系人一手机号码',
                    type:'warn'
                });
                return
            }else if(!this.Val.isPhoneNum(ContactsPhone1)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入正确的联系人一手机号码',
                    onHide () {
                        _this.ContactsPhone1 = ''
                    }
                })
                return
            }else if(this.isEmpty(this.ContactsName2)){
                this.$vux.toast.show({
                    text: '请输入联系人二姓名',
                    type:'warn'
                });
                return
            }else if(this.isEmpty(this.ContactsPhone2)){
                this.$vux.toast.show({
                    text: '请输入联系人二手机号码',
                    type:'warn'
                });
                return
            }else if(!this.Val.isPhoneNum(ContactsPhone2)){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '请输入正确的联系人二手机号码',
                    onHide () {
                        _this.ContactsPhone2 = ''
                    }
                })
                return
            }
            else {
                let postData = this.$qs.stringify({
                    work_company:this.companyName,
                    work_phone:this.companyPhone,
                    company_province:this.company_province,
                    company_city:this.company_city,
                    company_district:this.company_district,
                    company_adress:this.companyDetailAddress,
                    home_sjname:this.recipientsName,
                    home_phone:this.SpaceTransformation(this.recipientsPhone),
                    email:this.recipientsMail,
                    home_province:this.recipients_province,
                    home_city:this.recipients_city,
                    home_district:this.recipients_district,
                    home_adress:this.recipientsDetailAddress,
                    person_jj_name1:this.ContactsName1,
                    person_jj_code1:this.SpaceTransformation(this.ContactsPhone1),
                    person_jj_name2:this.ContactsName2,
                    person_jj_code2:this.SpaceTransformation(this.ContactsPhone2)
                })
                this.$axios({
                    method: 'post',
                    url:httpUrl.relevantData,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    data:postData
                }).then((res)=>{
                    console.log(res.data)
                    if(res.data.errCode==200){
                        if(step_type=='1'){
                            _this.$router.push({
                                path:'/verify_step',
                                query: {
                                    orderid:orderid
                                }
                            });
                        }else {
                            this.$vux.alert.show({
                                title: '提示',
                                content: '资料添加成功！',
                                onHide () {
                                    _this.$router.push('/credit_info_list');
                                }
                            });
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
        },
    }
}
</script>

<style scoped>
   .inputStyle{
       font-size: 14px;
       border:none;
   }
   .weui-cells:before{
       border-top: none;
   }
   .weui-cell:before{
       border-top: none;
   }
   .weui-cell:after{
       border-bottom: none;
   }
   .vux-cell-box:not(:first-child):before{
       border-top: none;
   }
   .vux-cell-value{
       color: #000;
   }
</style>
