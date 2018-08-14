<template>
    <div style="position:relative">
        <!--<x-header-->
                <!--:left-options="{backText: '首页'}"-->
                <!--:right-options="{showMore: true}"-->
                <!--on-click-back = "goHome"-->
                <!--@on-click-title = "goHome"-->
                <!--@on-click-more="showMenus = true">游呗个人-->
        <!--</x-header>-->
        <popup-header left-text="银行卡"></popup-header>

        <card class="cardBox">
            <div slot="content" style="padding: 20px">
                <div style="margin-top: 50px;">
                    <h3>{{bankName}}</h3>
                    <p style="font-size: 14px;color: #666;margin: 10px 0;">银行卡号</p>
                    <p>{{bankNo}}</p>
                    <p style="font-size: 14px;color: #666;margin: 10px 0;">开户人</p>
                    <p>{{userName}}</p>
                    <!--<p style="font-size: 14px;color: #666;margin: 10px 0;">银行卡正面</p>-->
                    <!--<img :src="bankImgFront" class="bankImg" >-->
                    <!--<p style="font-size: 14px;color: #666;margin: 10px 0;">银行卡反面</p>-->
                   <!--<img :src="bankImgBack"  class="bankImg" > -->
                </div>
            </div>
        </card>
        <div class="headerImg">
            <img class="titleImg" src="../../assets/bank_icon.png">
        </div>
        <group style="margin: 40px 0;">
            <cell>
                <span slot="title" class="edit-left">银行卡正面</span>
                <span slot="default">已完善</span>
            </cell>
            <cell>
                <span slot="title" class="edit-left">银行卡反面</span>
                <span slot="default">已完善</span>
            </cell>
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
                bankName:'',
                bankNo:'',
                userName: '',
                bankImgFront:'',
                bankImgBack:'',
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
                        }else if(bankType == 0){
                            this.$vux.alert.show({
                                title: '错误提示',
                                content: '银行卡未验证！',
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
                    page:2
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
                        this.bankName = res.data.retData.bank_name;
                        this.bankNo = res.data.retData.bank_number;
                        this.userName = res.data.retData.bank_usename;
                        this.bankImgFront = res.data.retData.front;
                        this.bankImgBack = res.data.retData.back;
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
        position: relative;
        margin: 63px 15px 20px 15px;
        border: 1px solid #eee;
        border-radius: 6px;
    }
    .titleImg{
        width: 70%;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
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
    .bankImg {
       width: 100%;
        margin: 0 auto;
    }
</style>
