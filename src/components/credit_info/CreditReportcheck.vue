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
      
       
       <div class="report-content">
           <p>1：2013年01月至2016年07月期间，您办理的所有贷款中，最高一笔贷款额度为多少？</p>
           <checklist :options="list1" :max='1' :min='1' @on-change="change" ></checklist>
           
           <p>2：您于2014年05月在何处办理过贷款？</p>
           <checklist :options="list2" :max='1' :min='1'  @on-change="change" ></checklist>

           <p>3:2013年01月至2016年07月期间，您办理的所有贷款中，最近办理的贷款是以下哪种类型？</p>
           <checklist :options="list3" :max='1' :min='1'  @on-change="change" ></checklist>
           
           <p>4:您的身份证领取地是哪里？</p>
           <checklist :options="list4" :max='1' :min='1'  @on-change="change" ></checklist>

           <p>5:您2014年05月的婚姻状况是什么？</p>
           <checklist :options="list5" :max='1' :min='1'  @on-change="change" ></checklist>
       </div>

        <x-button class="submit-btn" type="primary" @click.native ="submit">提 交</x-button>
      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>
<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom,XButton,Checklist } from 'vux'
    import {httpUrl} from '../../http_url';

    const list = () => [
        {title:'登录',id:0}, 
        {title:'注册',id:1}
    ]
   export default {
    // directives: {
    //     TransferDom
    // },
  data () {
    return {
        menus: {
            menu1: '退出登录'
        },
         showMenus: false,

       list1:['265001-315000','315001-365000','365001-415000','415001-465000','以上都不是'],
       list2:['西藏自治区拉萨市','湖南省株洲市','香港特别行政区','重庆市','以上都不是'],
       list3:['陕西省铜川市','湖南省株洲市','黑龙江省黑河市','山西省朔州市','以上都不是'],
       list4:['西藏自治区拉萨市','湖南省株洲市','香港特别行政区','重庆市','以上都不是'],
       list5:['丧偶','已婚','离婚','未婚','以上都不是'],
       


    }
  },
    created(){
        // this.getData(0);
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        XButton,
        Checklist
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
        change(val,label){
           console.log('change', val, label)
            
        },
        submit(){
            this.$router.push('/cr_suc');
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

.submit-btn{
    position: fixed;
    bottom:0px;
    }

    .report-content{
        margin:20px 10px 60px 10px;
    }
    .report-content p{
        background:#fff;
        margin-top:20px;
        padding: 20px;
    }

  /* .report-content .weui-cell__bd {
    -webkit-box-flex: 1;
    font-size: 12px !important;
    -ms-flex: 1;
    flex: 1;
} */
</style>
