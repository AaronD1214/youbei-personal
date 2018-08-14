<template>
  <div>
      <!--<x-header-->
              <!--:left-options="{backText: '首页'}"-->
              <!--:right-options="{showMore: true}"-->
              <!--on-click-back = "goHome"-->
              <!--@on-click-title = "goHome"-->
              <!--@on-click-more="showMenus = true">游呗个人-->
      <!--</x-header>-->
      <popup-header left-text="央行信用报告"></popup-header>
      <div  style="margin:0 10px;text-align: center">
          <tab :line-width=1 active-color='#ff9900' v-model="index" class="tabs" >
              <tab-item v-for="(item,index) in list2" :selected="demo1 ===item" :key="index" @on-item-click="getData(item.id)" >{{item.title}}</tab-item>
          </tab>

        <!-- 登录 -->
          <div v-if="this.index==0">
                <group label-width="4.5em" label-margin-right="1em" label-align="right">
                    <x-input title="" mask="999 9999 9999" placeholder="请输入央行征信用户名" v-model="yhUserName"></x-input>
                    <x-input title="" mask="" placeholder="请输入央行征信密码" v-model="password" type="password"></x-input>
                </group>
                <x-button class="login-btn" type="primary" @click.native ="creditLogin">登 录</x-button>
                <p class="forgetPsd"><span>忘记用户名？</span>&nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;<span>忘记密码？</span></p>
          </div>

            <!-- 注册1 -->
            <div v-else>
                <group label-width="4.5em" label-margin-right="1em" label-align="right">
                    <x-input title="" mask="" placeholder="请输入您的真实姓名" v-model="yhUserName" ></x-input>
                    <x-input title="" mask="" placeholder="请输入您的真实身份证号" :max="18" v-model="IDNum"></x-input>
                    <x-input title="" mask="" placeholder="请输入验证码" :max="4" class="weui_vcode" v-model="identifyCode" @on-blur="blurIdentifyCode">
                        <input slot="right" type="button" id="code" @click="createCode" v-model="checkCode">
                    </x-input>

                </group>
                <div style="text-align: left;margin: 25px 0;height: 25px;line-height: 25px;font-size:12px; ">
                    <check-icon :value.sync="checkValue">我已经阅读并同意</check-icon><router-link style="color: #409EFF" to="xieyi">&nbsp;&nbsp;服务协议</router-link>
                </div>
                <x-button class="login-btn" type="primary" @click.native ="registerNext">下一步</x-button>
            </div>
      </div>

       <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>

      
</div>


     
 
</template>
<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom, Card ,Tab, TabItem,Group,XInput,XButton,CheckIcon,Countdown,CellBox  } from 'vux'
    import {httpUrl} from '../../http_url';

    const list = () => [
        {title:'登录',id:0}, 
        {title:'注册',id:1}
    ]

export default {

 directives: {
     TransferDom
 },

  data () {
    return {
        menus: {
            menu1: '退出登录'
        },
        yhUserName:'',
        password:'',
        showMenus: false,
        list2:list(),
        demo1:'登录',
        creditList:[],
        length:'',
        status_name:'',
        index:0,
        orderid:'',

        IDNum:'',
       checkValue:false,
       identifyCode:'',

            IDNum:'',
            checkValue:false,
            identifyCode:'',
            checkCode:'',

        }
   },
    created(){
        this.createCode();
        // this.getData(0);
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        Card,
        Tab,
        TabItem,
        Group,XInput,XButton,CheckIcon,Countdown,CellBox
    },
    methods:{
        getData(id){
            console.log(id);
            const _this = this;
            let postData = this.$qs.stringify({
                status:id
            });
            this.$axios({
                method: 'post',
                url:httpUrl.txorderList,
                data:postData
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                   
                    this.signeList = res.data.retData;
                    this.length = res.data.retData.length;
                    this.status_name = res.data.retData.status_name;
                }else if(res.data.errCode==201){
                    this.$vux.toast.show({
                        type:'warn',
                        text: res.data.retMsg
                    })
                }else if(res.data.errCode==401){
                    this.$vux.alert.show({
                        title: '错误提示',
                        content: '未登录，请先登录',
                        // onHide () {
                        //     _this.$router.push('/quick_login');
                        // }
                    })
                }
            });
        },
        //登录：先判断有没有注册过，若没有则先注册再登录
        creditLogin(){
            this.$router.push('/credit_report');//临时跳转

            const _this = this;
            let postData = this.$qs.stringify({
                userName:this.yhUserName,
                password:this.password
            });
            this.$axios({
                method: 'post',
                url: '',
                data: postData
            }).then( (res)=>{
                console.log(res.data);
                if(res.data.errCode==200){
                    this.$router.push('/credit_report'); 

                }else {
                    this.index = 1;
                }
            }).catch( function(){
                this.$vux.toast.show({
                    text: '网络异常，请稍后再试',
                    type:'warn'
                })
            })
        },
        registerNext(){
            this.$router.push('/credit_register2');
        },

        // 生成图片验证码
        createCode(){
            var code ;
            code = "";
            var codeLength = 4;//验证码的长度
            var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
                'S','T','U','V','W','X','Y','Z');//随机数
            for(var i = 0; i < codeLength; i++) {//循环操作
                var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
                code += random[index];//根据索引取得随机数加到code上
            }
            this.checkCode = code;//把code值赋给验证码
        },

        blurIdentifyCode(){
            const _this = this;
            var identifyCode = _this.identifyCode.toUpperCase();

            if (this.isEmpty(identifyCode)) {
                _this.$vux.toast.show({
                    type:'warn',
                    text: '请输入验证码'
                });
            }else if(identifyCode != _this.checkCode) { //若输入的验证码与产生的验证码不一致时
                _this.$vux.toast.show({
                    type:'warn',
                    time:1000,
                    text: '验证码输入错误，请重新输入',
                    onHide(){
                        _this.createCode();                                          //刷新验证码
//                        _this.identifyCode = '';
                    }
                });
            }
        },

       
        finish (index) {
          this.start = false;
          this.time = 60;
          this.show = true;
        },
        
        LoginOut(){
            this.$axios({
                method: 'post',
                url:httpUrl.loginOut,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }).then((res)=>{
                // console.log(res.data)
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
    .tabs {
        margin-top: 20px;
    }
    .login-btn{
        margin-top: 30px;
        /*background: #409EFF;*/
    }
    .forgetPsd {
        margin-top: 30px;
        font-size: 14px;
    }
    /*****
    ***图片验证码
    *****/
    #code{
        width: 80px;
        font-size: 18px;
        letter-spacing:3px;
        color: #053d84;
        background: #f2f2f5;
        outline: none;
        height:36px;
        float: right;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        margin-left: 5px;
    }
</style>
