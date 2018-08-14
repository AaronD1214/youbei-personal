<template>
  <div>
      <!--<popup-header left-text="查看视频"></popup-header>-->
      <div style="margin: 20px;">
          <div class="my-video">
              <video-player  class="video-player vjs-custom-skin"
                             ref="videoPlayer"
                             :options="playerOptions"
                             :playsinline="true"
                             @play="onPlayerPlay($event)"
                             @pause="onPlayerPause($event)">
              </video-player>
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
    import { videoPlayer } from 'vue-video-player'
    import 'video.js/dist/video-js.css'
    import 'vue-video-player/src/custom-theme.css'


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

        // videojs options
        playerOptions: {
            height: '200',
            autoplay: false, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [{
                type: "video/mp4",
                src: "",
            }],
            poster: "",
            notSupportedMessage: '视频加载失败！', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
            }
        }
    }
  },
    created(){
        this.getData();
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        XButton,
        videoPlayer
    },
    methods:{
        getData(){
            let billdetail = this.$route.query.billdetail;
            let orderid = this.$route.query.orderid;
            const _this = this;
            let postData = this.$qs.stringify({
                orderid :orderid
            })
            this.$axios({
                method: 'post',
                url:httpUrl.guideInfo,
                data:postData
            }).then((res)=>{
                console.log(res.data)
                let data = res.data.retData;
                if(res.data.errCode==200){
                   this.playerOptions.sources[0].src = data.sp_url;
                   this.playerOptions.poster = data.videoPoster;
                   let spUrl = this.playerOptions.sources[0].src;
                    console.log(spUrl)

                    if(billdetail == 1){                               //从账单详情页点进来
                        if(this.isEmpty(spUrl)){
                            this.$vux.toast.show({
                                type:'warn',
                                text: '未获取到视频资源！',
                                onHide(){
                                    _this.$router.push({
                                        path:'/bill_detail',             //返回账单详情页
                                        query: {
                                            orderid:orderid
                                        }
                                    });
                                }
                            })
                        }
                    }else {                                          //从电子签名流程页点进来
                        if(this.isEmpty(spUrl)){
                            this.$vux.toast.show({
                                type:'warn',
                                text: '未获取到视频资源！',
                                onHide(){
                                    _this.$router.push({
                                        path:'/verify_step',             //返回电子签名页
                                        query: {
                                            orderid:orderid,
                                            billdetail:1
                                        }
                                    });
                                }
                            })
                        }
                    }
                }else {
                    this.$vux.toast.show({
                        text: '视频获取失败，请稍后再试',
                        type:'warn'
                    })
                }
            }).catch(function () {
                this.$vux.toast.show({
                    text: '网络异常，请稍后再试',
                    type:'warn'
                })
            });
        },
        // listen event
        onPlayerPlay(player){
            // console.log('player play!', player)
        },
        onPlayerPause(player) {
            // console.log('player pause!', player)
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
.my-video{
    width: 100%;
    height: 200px;
    border: 1px solid #e6e6e6;
    margin: 20px 0;
}
.vjs-poster{
     background-repeat: repeat!important;
}

</style>
