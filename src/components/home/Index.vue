<template>
  <div class="content" :class="{fix: this.$store.getters.drawer}">
      <x-header
              :left-options="{showBack: false}"
              :right-options="{showMore: false}"
              @on-click-more="showMenus = true">游呗个人
          <span slot="overwrite-left" @click="showDrawer" >
              <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-10px;"></x-icon>
          </span>
      </x-header>
      <my-drawer></my-drawer>
      <div class="wrap-content">
          <router-view></router-view>
      </div>
      <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="LoginOut"></actionsheet>
      </div>
  </div>
</template>

<script>
    import { XHeader,Drawer,PopupHeader,Actionsheet , TransferDom } from 'vux'
    import {httpUrl} from '../../http_url';
    import myDrawer from './Left.vue';

export default {
    directives: {
        TransferDom
    },
  data () {
    return {
        menus: {
            menu1: '退出登录'
        },
        phone:'',
        showMenus: false
    }
  },
    created(){
        this.getData();
    },
    components: {
        XHeader,
        Drawer,
        PopupHeader,
        Actionsheet,
        myDrawer
    },

    methods:{
        getData(){
            const _this = this;
            this.$axios({
                method: 'post',
                url:httpUrl.homePage,
            }).then((res)=>{
                // console.log(res.data)
                if(res.data.errCode==200){
                    this.phone = res.data.retData.phone;
                    this.msg_type = res.data.retData.msg_type;
                    this.surplus_amount = res.data.retData.surplus_amount;
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

        showDrawer() {
            this.$store.dispatch('changeDrawer').then(() => {
//                console.log(this.$store.getters.drawer)
            })
        }
    }
}
</script>

<style scoped>
    .content{
        height: 100vh;
        background: #f2f2f2;
        /*text-align: center*/
    }

    a{
        text-decoration: none;
        color: #000;
    }


</style>
