<template>
    <div>
        <popup-header left-text="人脸识别成功"></popup-header>
        <div class="content">
            <img class="suc_icon" src="../../assets/suc_icon.png">
            <p>恭喜您，人脸识别通过！</p>
        </div>
        <div style="text-align: center;margin-bottom: 15px;">
            <countdown v-model="time" @on-finish="finish" v-show="show"></countdown>秒后自动跳转至签署合同
        </div>

        <x-button class="signBtn" type="primary" @click.native="goSign">下一步签署合同</x-button>
    </div>
</template>


<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom,XButton,Countdown  } from 'vux'
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
                show: true,
                time: 3,
            }
        },
        created(){

        },
        components: {
            XHeader,
            PopupHeader,
            Actionsheet,
            XButton,
            Countdown
        },
        methods:{
            goSign(){
                let orderid = this.$route.query.orderid;
                let step_type = this.$route.query.step_type;
                if(step_type == '1'){
                    this.$router.push({
                        path:'/verify_step',
                        query: {
                            orderid:orderid
                        }
                    });
                }else {
                    this.$router.push({
                        path:'/signature',
                        query: {
                            orderid:orderid
                        }
                    });
                }
            },
            finish (index) {
                this.show = false
                this.goSign();
            },
            //更新订单状态
            updatedata(){
                let orderid = this.$route.query.orderid;
                const _this = this;
                let postData = this.$qs.stringify({
                    orderid:orderid,
                    is_sign:1
                })
                this.$axios({
                    method: 'post',
                    url:httpUrl.updatedata,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    data:postData
                }).then((res)=>{
                    console.log(res.data);
                    this.$vux.loading.hide();
                    if(res.data.errCode==200){

                    }else if(res.data.errCode==201){
                        this.$vux.toast.show({
                            text: res.data.retMsg,
                            type:'warn',
                            onHide(){

                            }
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
            },

        }
    }
</script>

<style scoped>
    .content{
        width: 90%;
        margin: 0 auto;
        text-align: center;
    }
    .content p{
        margin: 20px 0;
    }
    .suc_icon{
        width: 100px;
        height: 100px;
        margin-top: 30px;
    }
    .signBtn{
        width: 90%;
        margin: 0 auto;
    }
</style>
