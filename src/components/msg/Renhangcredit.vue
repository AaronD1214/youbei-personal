<template>
  <div>
      <msg :title="title" :description="description" :icon="icon"></msg>
      <input type="text" v-model="message" v-show="false">
      <button class="tag-read" :data-clipboard-text="message" @click="copy">复制链接</button>
      <button class="goLast" @click="goLast">返回上一步</button>
  </div>
</template>

<i18n>

</i18n>
<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom, FormPreview ,Msg  ,XButton  } from 'vux'
    import Clipboard from 'clipboard';

export default {
    directives: {
        TransferDom
    },
  data () {
    return {
        title:'操作提示',
        description: '请复制以下网址https://ipcrs.pbccrc.org.cn/在手机浏览器打开',
        icon: 'warn',
        message:'https://ipcrs.pbccrc.org.cn/'
    }
  },
    created(){

    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        Msg ,
        FormPreview,XButton
    },
    methods:{
        copy() {
            var clipboard = new Clipboard('.tag-read')
            clipboard.on('success', e => {
                this.$vux.toast.show({
                    text: '复制成功',
                    type:'success'
                })
                // 释放内存
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                // 不支持复制
                this.$vux.toast.show({
                    text: '该浏览器不支持自动复制',
                    type:'warn'
                })
                // 释放内存
                clipboard.destroy()
            })
        },
        goLast(){
            let pengyuan_reporStatus = this.$route.query.pengyuan_reporStatus;
            this.$router.push({
                path:'/py_credit',
                query: {
                    pengyuan_reporStatus: pengyuan_reporStatus
                }
            });
        }
    }
}
</script>

<style scoped>
    .tag-read{
        width: 90%;
        height: 42px;
        line-height: 42px;
        display: block;
        color: #ffffff;
        font-size: 18px;
        background-color: #3c69af;
        border: none;
        outline: none;
        border-radius: 4px;
        margin: 0 auto;
        text-align: center;
    }
    .goLast{
        width: 90%;
        height: 42px;
        line-height: 42px;
        display: block;
        color: #000000;
        font-size: 18px;
        background-color: #ffffff;
        border: 1px solid #dfdfdf;
        outline: none;
        border-radius: 4px;
        margin: 0 auto;
        text-align: center;
        margin-top: 15px;
    }
</style>
