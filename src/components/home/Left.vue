<template>
    <div :class="{dra: showDrawer}" style="height: 100%;position: fixed;z-index: 999;">
        <drawer
                width="200px;"
                :show.sync="showDrawer"
                show-mode="overlay"
                placement="left"
                :drawer-style="{'background':'#314360', width: '200px','text-align':'left'}">

            <!-- drawer content -->
            <div slot="drawer" class="drawer_content">
                <group title="" style="margin-top:20px;">
                    <cell title="首页" link="/home" is-link  value="" @click.native="showDrawer = false">
                        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/home_icon.png">
                    </cell>
                    <cell title="账单" link="/order_list" is-link  value="" @click.native="showDrawer = false">
                        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/bill_white_icon.png">
                    </cell>
                    <cell title="同行人签名" link="/signe_list" is-link  @click.native="showDrawer = false">
                        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/sign_white_icon.png">
                    </cell>
                    <cell title="分期订单" link="/bill_list" is-link  value="" @click.native="showDrawer = false">
                        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/order_white_icon.png">
                    </cell>
                    <cell title="信用资料" link="/credit_info_list" is-link  value="" @click.native="showDrawer = false">
                        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/creditInfo_white_icon.png">
                    </cell>
                    <cell title="消息" link="/message_list" is-link  value="" @click.native="showDrawer = false">
                        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/messege_white_icon.png">
                    </cell>
                    <!--<cell title="七牛上传" link="/qiniu_upload" is-link  value="" @click.native="showDrawer = false">-->
                        <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/phone_white_icon.png">-->
                    <!--</cell>-->
                    <!--<cell title="微信登录授权" is-link  value="" @click.native="showDrawer = false">-->
                        <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/shouquan_white_icon.png">-->
                    <!--</cell>-->
                    <cell title="登录密码" link="/set_password" is-link  value="" @click.native="showDrawer = false">
                        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/lock_white_icon.png">
                    </cell>
                </group>
            </div>
        </drawer>
    </div>
</template>

<script>
    import { Radio, Group, Cell, Badge, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom } from 'vux'
    import { mapState, mapActions } from 'vuex'
    export default {
        data () {
            return {
                showMode: 'overlay',
                showPlacement: 'left',
                showPlacementValue: 'left'
            }
        },
        directives: {
            TransferDom
        },
        components: {
            Radio,
            Group,
            Cell,
            Badge,
            Drawer,
            ButtonTab,
            ButtonTabItem,
            ViewBox,
            XHeader,
            Tabbar,
            TabbarItem,
            Loading,
            Actionsheet
        },
        methods: {

        },
        mounted () {

        },
        beforeDestroy () {

        },
        watch: {

        },
        computed: {
            showDrawer: {    //  使用了 计算属性来设置 showDrawer
                get () {       //  值变化了通过这个获取
                    return this.$store.getters.drawer
                },
                set () {        // 值变化了 通过这个设置
                    return this.$store.dispatch('changeDrawer').then(() => {
                        console.log(this.$store.getters.drawer)
                    })
                }
            }
        }
    }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import '~vux/src/styles/1px.less';
    @import '~vux/src/styles/tap.less';
    body {
        background-color: #fbf9fe;
    }
    html, body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }
    .dra{
        position: fixed;
        /*height: 100%;*/
        z-index: 9999;
    }
    .drawer_content{

    }
    .drawer_content .weui-cells{
        background-color: #314360!important;
        color: #fff;
    }
    .drawer_content .weui-cells:after{
        border-bottom:none;
    }
    .drawer_content .weui-cell:before{
        border-top: none!important;
    }
    .demo-icon-22 {
        font-family: 'vux-demo';
        font-size: 22px;
        color: #888;
    }
    .weui-tabbar.vux-demo-tabbar {
        /** backdrop-filter: blur(10px);
        background-color: none;
        background: rgba(247, 247, 250, 0.5);**/
    }
    .vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
        color: #F70968;
    }
    .vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
        color: rgb(53, 73, 94);
    }
    .demo-icon-22:before {
        content: attr(icon);
    }
    .vux-demo-tabbar-component {
        background-color: #F70968;
        color: #fff;
        border-radius: 7px;
        padding: 0 4px;
        line-height: 14px;
    }
    .weui-tabbar__icon + .weui-tabbar__label {
        margin-top: 0!important;
    }
    .vux-demo-header-box {
        z-index: 100;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }
    @font-face {
        font-family: 'vux-demo';  /* project id 70323 */
        src: url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.eot');
        src: url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.woff') format('woff'),
        url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_70323_wlronpvr565yiudi.svg#iconfont') format('svg');
    }
    .demo-icon {
        font-family: 'vux-demo';
        font-size: 20px;
        color: #04BE02;
    }
    .demo-icon-big {
        font-size: 28px;
    }
    .demo-icon:before {
        content: attr(icon);
    }
    .router-view {
        width: 100%;
        top: 46px;
    }
    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
        will-change: transform;
        transition: all 500ms;
        height: 100%;
        top: 46px;
        position: absolute;
        backface-visibility: hidden;
        perspective: 1000;
    }
    .vux-pop-out-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
    .vux-pop-out-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .vux-pop-in-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .vux-pop-in-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
    .menu-title {
        color: #888;
    }
</style>