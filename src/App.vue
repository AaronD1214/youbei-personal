<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
    font-size: 16px;
    line-height: 1.6;
    margin: 0;
    background:#f2f2f2!important;
}
input{
    outline: none;
}
input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
    color:#b8b8b8;
}
input::-moz-placeholder,textarea::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#b8b8b8;
}
input:-moz-placeholder,textarea::-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#b8b8b8;
}
input:-ms-input-placeholder,textarea::-moz-placeholder{  /* Internet Explorer 10-11 */
    color:#b8b8b8;
}
.weui-cells:before{
    border-top: none!important;
}
.vux-cell-value{
    color: #000!important;
}
.vux-popup-header{
    background-color: #def1ff!important;
}
.vux-popup-header-left{
    color:#305fa5!important;
}
</style>
<style lang="less">
    @import '~vux/src/styles/1px.less';
    @import '~vux/src/styles/reset.less';
</style>
