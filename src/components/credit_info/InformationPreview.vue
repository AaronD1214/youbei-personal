<template>
    <div style="position:relative">
        <!--<x-header-->
                <!--:left-options="{backText: '首页'}"-->
                <!--:right-options="{showMore: true}"-->
                <!--on-click-back = "goHome"-->
                <!--@on-click-title = "goHome"-->
                <!--@on-click-more="showMenus = true">游呗个人-->
        <!--</x-header>-->
        <popup-header left-text="相关资料"></popup-header>

        <card class="cardBox">
            <div slot="content" style="padding: 20px">
                <div style="margin-top: 50px;">
                    <p style="font-size: 14px;color: #666;margin: 10px 0;">单位名称</p>
                    <p>{{companyName}}</p>
                    <p style="font-size: 14px;color: #666;margin: 10px 0;">单位电话</p>
                    <p>{{companyPhone}}</p>
                    <p style="font-size: 14px;color: #666;margin: 10px 0;">单位地址</p>
                    <p>{{companyAddress}}</p>
                </div>
            </div>
        </card>
        <div class="headerImg">
            <img class="titleImg" src="../../assets/company_icon.png">
        </div>

        <p style="margin: 0 20px">通讯地址</p>
        <card class="cardBox2">
            <div slot="content" style="padding: 20px">
                <div style="">
                    <p style="font-size: 14px;color: #666;margin: 10px 0;">联系人</p>
                    <p>{{user_name}}</p>
                    <p style="font-size: 14px;color: #666;margin: 10px 0;">联系电话</p>
                    <p>{{user_phone}}</p>
                    <p style="font-size: 14px;color: #666;margin: 10px 0;">邮箱</p>
                    <p>{{email}}</p>
                    <p style="font-size: 14px;color: #666;margin: 10px 0;">联系地址</p>
                    <p>{{home_adress}}</p>
                </div>
            </div>
        </card>
        <p style="margin: 0 20px">联系人一</p>
        <card class="cardBox2">
            <div slot="content" style="padding: 20px">
                <div style="">
                    <p style="font-size: 14px;color: #666;margin: 10px 0;">联系人</p>
                    <p>{{person_name1}}</p>
                    <p style="font-size: 14px;color: #666;margin: 10px 0;">联系电话</p>
                    <p>{{person_code1}}</p>
                </div>
            </div>
        </card>
        <p style="margin: 0 20px">联系人二</p>
        <card class="cardBox2">
            <div slot="content" style="padding: 20px">
                <div style="">
                    <p style="font-size: 14px;color: #666;margin: 10px 0;">联系人</p>
                    <p>{{person_name2}}</p>
                    <p style="font-size: 14px;color: #666;margin: 10px 0;">联系电话</p>
                    <p>{{person_code2}}</p>
                </div>
            </div>
        </card>
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
                companyName:'',
                companyPhone:'',
                companyAddress: '',
                user_name:'',
                user_phone:'',
                email:'',
                home_adress:'',
                person_name1:'',
                person_code1:'',
                person_name2:'',
                person_code2:''
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
                        let dataType = data.data;
                        if(personType == 0){
                            this.$vux.alert.show({
                                title: '错误提示',
                                content: '未实名认证，请先实名认证',
                                onHide () {
                                    _this.$router.push('/credit_info_list');
                                }
                            })
                            return
                        }else if(dataType == 0){
                            this.$vux.alert.show({
                                title: '错误提示',
                                content: '未提交相关资料',
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
                let postData = this.$qs.stringify({
                    page:3
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
                        this.companyName = res.data.retData.company_name;
                        this.companyPhone = res.data.retData.company_phone;
                        this.companyAddress = res.data.retData.company_adress;
                        this.user_name = res.data.retData.user_name;
                        this.user_phone = res.data.retData.user_phone;
                        this.email = res.data.retData.email;
                        this.home_adress = res.data.retData.home_adress;
                        this.person_name1 = res.data.retData.person_name1;
                        this.person_code1 = res.data.retData.person_code1;
                        this.person_name2 = res.data.retData.person_name2;
                        this.person_code2 = res.data.retData.person_code2;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    .cardBox2{
        margin: 20px 15px;
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
</style>
