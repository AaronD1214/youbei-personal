<template>
    <div>
        <popup-header left-text="人脸识别"></popup-header>
        <div style="margin: 20px 20px 0 20px;">
            <div style="background: rgba(255,255,204,0.6);border: 1px dashed #ffccd6;padding: 15px 10px;border-radius: 6px;position: relative;" >
                <p style="margin: 10px 0;font-size: 13px;opacity: 0.7">
                    <span style="color: red">提示：</span>请本人录制一段3~5秒的自拍视频，需用普通话高声朗读以下数字
                </p>
                <div class="num num1Bg">{{num1}}</div>
                <div class="num num2Bg">{{num2}}</div>
                <div class="num num3Bg">{{num3}}</div>
                <div class="num num4Bg">{{num4}}</div>
            </div>
            <a href="javascript:;" class="a-upload" v-show="videoBtnShow">
                <input type="file" class="videoBtn" id="video" @change="onUpload"  accept="video/*" capture="user">
                开始录制视频
            </a>
        </div>
        <div class="tips">
            <p>录制须知：</p>
            <div style="margin: 10px 0;">
                <img class="iconImg" src="../../assets/avatar_icon.png">
                <p style="margin-left: 40px;">
                    <span class="title">面部完整</span>
                    <span class="text">确保人脸完全处于镜头内</span>
                </p>

            </div>
            <div style="margin: 10px 0;">
                <img class="iconImg" src="../../assets/camera_icon.png">
                <p style="margin-left: 40px;">
                    <span class="title">轮廓清晰</span>
                    <span class="text">保证精准对焦，使人像清晰可见</span>
                </p>

            </div>
            <div style="margin: 10px 0;">
                <img class="iconImg" src="../../assets/light_icon.png">
                <p style="margin-left: 40px;">
                    <span class="title">亮度均匀</span>
                    <span class="text">避免视频出现遮挡光线、发光等现象</span>
                </p>

            </div>
            <div style="margin: 10px 0;">
                <img class="iconImg" src="../../assets/voice_icon.png" style="width: 20px;height: 20px;margin-left: 5px;">
                <p style="margin-left: 40px;">
                    <span class="title">环境安静</span>
                    <span class="text">普通话缓速高声朗读数字</span>
                </p>
            </div>
        </div>

        <div v-transfer-dom>
            <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
        </div>
    </div>
</template>


<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom,XButton } from 'vux'
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
                height:(document.documentElement.clientHeight - 220)+ 'px',
                option:{
                    penColor:"rgb(0, 0, 0)",
                    backgroundColor:"rgb(255,255,255)"
                },
                validate_data:'9526',
                arrNum:[],
                num1:'',
                num2:'',
                num3:'',
                num4:'',
                transfinite:'',                     //人脸识别接口调用次数
                realNameStatus:'',
                bankStatus:'',
                infoStatus:'',
                videoBtnShow:false
            }
        },
        created(){
            if(this.checkIOS()){
                this.getStatus();
            }else {
                this.$router.push('/home');
            }
        },
        components: {
            XHeader,
            PopupHeader,
            Actionsheet,
            XButton
        },
        methods:{
            //获取身份证、银行卡 认证状态
            getStatus(){
                const _this = this;
                this.$axios({
                    method: 'post',
                    url:httpUrl.creditInformation
                }).then((res)=>{
                    let data = res.data.retData;
                    if(res.data.errCode==200){
                        this.realNameStatus = data.realName.status;
                        this.bankStatus = data.bank.status;
                        this.infoStatus = data.relevantData.status;
                        if(this.realNameStatus == 0){
                            this.$vux.confirm.show({
                                title:'提示',
                                content:"请完成实名认证！",
                                confirmText:'实名认证',
                                onCancel () {
                                    _this.$router.push('/credit_info_list');
                                },
                                onConfirm () {
                                    _this.$router.push('/credit_info_list');
                                }
                            })
                        }else if(this.bankStatus==0){
                            this.$vux.confirm.show({
                                title:'提示',
                                content:"请完成银行卡认证！",
                                confirmText:'去认证',
                                onCancel () {
                                    _this.$router.push('/credit_info_list');
                                },
                                onConfirm () {
                                    _this.$router.push('/credit_info_list');
                                }
                            })
                        }else if(this.infoStatus==0){
                            this.$vux.confirm.show({
                                title:'提示',
                                content:"请完成相关资料认证！",
                                confirmText:'去认证',
                                onCancel () {
                                    _this.$router.push('/credit_info_list');
                                },
                                onConfirm () {
                                    _this.$router.push('/credit_info_list');
                                }
                            })
                        }else {
                            this.getData();
                            this.videoBtnShow = true;
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
            // 获取唇语验证码
            getData(){
                const _this = this;
                let orderid = this.$route.query.orderid;
                let postData = this.$qs.stringify({
                    orderid:orderid
                })

                this.$axios({
                    method: 'post',
                    url:httpUrl.getLipCode,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    data:postData
                }).then((res)=>{
                    console.log(res.data)
                    if(res.data.errCode==200){
                        this.validate_data = res.data.retData.code;
                        this.arrNum = this.validate_data.split('');
                        this.num1 = this.arrNum[0];
                        this.num2 = this.arrNum[1];
                        this.num3 = this.arrNum[2];
                        this.num4 = this.arrNum[3];
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
            onUpload(event){
                var _this = this;
                var reader = new FileReader();
                var video = event.target.files[0];
                reader.readAsDataURL(video);
                reader.onloadend = function (
                ) {
                    _this.upLoadVideo(reader.result)
                }
            },
            upLoadVideo(file){
                const _this = this;
                const step_type = this.$route.query.step_type;
                let orderid = this.$route.query.orderid;

                this.$vux.loading.show({
                    text: '正在进行数据分析...'
                })
                let postData = this.$qs.stringify({
                    video:file,
                    orderid:orderid
                })
                this.$axios({
                    method: 'post',
                    url:httpUrl.lipCodeCheck,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    data:postData
                }).then((res)=>{
                    console.log(res.data);
                    _this.transfinite = res.data.retData.transfinite;
                    this.$vux.loading.hide();
                    if(res.data.errCode==200){
                        this.$vux.toast.show({
                            text: '验证成功',
                            type:'success',
                            onHide(){
                                _this.$router.push({
                                    path:'/live_face_suc',
                                    query: {
                                        orderid:orderid,
                                        step_type:step_type
                                    }
                                });
                            }
                        })
                    }else if(res.data.errCode==201){
                        if(this.transfinite == 1){     //人脸识别校验失败大于两次
                            this.$vux.toast.show({
                                text: res.data.retMsg+'请联系客服：0755-22211333',
                                type: 'warn',
                                onHide () {
                                    _this.$router.push('/home');
//                                    _this.$router.push({
//                                        path:'/signature',
//                                        query: {
//                                            orderid:orderid,
//                                            transfinite:_this.transfinite
//                                        }
//                                    });
                                }
                            })
                        }else {
                            this.$router.push({
                                path:'/live_face_fail',
                                query: {
                                    orderid:orderid,
                                    step_type:step_type,
                                    retMsg:res.data.retMsg,
                                    transfinite:this.transfinite
                                }
                            });
                        }
                    }else if(res.data.errCode==401){
                        this.$vux.alert.show({
                            title: '错误提示',
                            content: '未登录，请先登录',
                            onHide () {
                                _this.$router.push('/quick_login');
                            }
                        })
                    }
                })
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
//                    _this.$router.push('/home');
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

            goHome(){
                this.$router.push('/home');
            }
        }
    }
</script>

<style scoped>
    .a-upload {
        width: 100%;
        padding: 4px 0;
        height: 30px;
        line-height:30px;
        font-size: 16px;
        text-align: center;
        position: relative;
        cursor: pointer;
        margin: 20px 0 0 0;
        color: #fff;
        background-color: #325fa5;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        overflow: hidden;
        display: inline-block;
        *display: inline;
        *zoom: 1
    }
    .a-upload  input {
        position: absolute;
        width: 100%;
        height: 100%;
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer
    }

    .a-upload:hover {
        color: #fff;
        background: #517ec4;
        border-color: #3889ff;
        text-decoration: none
    }
    .validateData{
        font-weight: bold;
        margin: 10px 0;
        font-size: 40px;
        color: #f97038;
        text-align: center;
        letter-spacing: 30px;
        position: relative;
        z-index: 999;
    }
    .tips{
        background: #ffffff;
        padding: 5px 20px;
        font-family: '微软雅黑';
        margin-top: 20px;
    }
    .tips span{
        display: block;
    }
    .tips .text{
        font-size: 12px;
        color: #666666;
    }
    .iconImg{
        width: 24px;
        height: 24px;
        float: left;
        margin-top: 10px;
    }
    .num{
        font-weight: bold;
        font-size: 40px;
        color: #f97038;
        text-align: center;
        position: relative;
        z-index: 999;
    }
    .num1Bg{
        width: 42px;
        height: 42px;
        line-height: 42px;
        display: inline-block;
        background: #ffffff;
        border: 1px solid #f97038;
        position: relative;
        left: 17%;
        z-index: 2;
    }
    .num2Bg{
        width: 42px;
        height: 42px;
        line-height: 42px;
        display: inline-block;
        background: #ffffff;
        border: 1px solid #f97038;
        position: relative;
        left: 19%;
        z-index: 2;
    }
    .num3Bg{
        width: 42px;
        height: 42px;
        line-height: 42px;
        display: inline-block;
        background: #ffffff;
        border: 1px solid #f97038;
        position: relative;
        left: 21%;
        z-index: 2;
    }
    .num4Bg{
        width: 42px;
        height: 42px;
        line-height: 42px;
        display: inline-block;
        background: #ffffff;
        border: 1px solid #f97038;
        position: relative;
        left: 23%;
        z-index: 2;
    }
</style>
