webpackJsonp([37],{"+IWT":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=c(e("ABCa")),n=c(e("WZtS")),a=c(e("pDNl")),i=c(e("2sLL")),r=c(e("mzja")),u=c(e("Msp2")),d=c(e("QTi7")),l=c(e("rHil")),h=e("E3TW");function c(t){return t&&t.__esModule?t:{default:t}}s.default={name:"HelloWorld",data:function(){return{menus:{menu1:"退出登录"},showMenus:!1,show:!0,time:60,start:!1,password:"",passwordAgain:""}},components:{XHeader:o.default,PopupHeader:n.default,Actionsheet:u.default,Box:d.default,Group:l.default,XInput:a.default,XButton:i.default,Alert:r.default},methods:{blurPassword:function(){var t=this;this.isEmpty(this.password)?this.$vux.alert.show({title:"错误提示",content:"请输入密码",onHide:function(){}}):(!this.Val.isPassWord(this.password)||this.password.length<6)&&this.$vux.alert.show({title:"错误提示",content:"新密码必须为6位以上的英文和数字组成",onHide:function(){t.password=""}})},blurPasswordAgain:function(){var t=this;this.isEmpty(this.passwordAgain)?this.$vux.alert.show({title:"错误提示",content:"请输入密码",onHide:function(){}}):this.passwordAgain!=this.password&&this.$vux.alert.show({title:"错误提示",content:"两次密码输入不一致",onHide:function(){t.passwordAgain=""}})},submit:function(){var t=this,s=this,e=this.$qs.stringify({type:11,password:this.password,ckpassword:this.passwordAgain});this.isEmpty(this.passwordAgain)?this.$vux.alert.show({title:"错误提示",content:"请输入密码",onHide:function(){}}):this.passwordAgain==this.password?this.$axios({method:"post",url:h.httpUrl.setPassword,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},data:e}).then(function(e){console.log(e.data),200==e.data.errCode?t.$vux.alert.show({title:"提示",content:"密码设置成功",onHide:function(){s.$router.push("/home")}}):201==e.data.errCode?t.$vux.toast.show({type:"warn",text:e.data.retMsg}):401==e.data.errCode&&t.$vux.alert.show({title:"错误提示",content:"未登录，请先登录",onHide:function(){s.$router.push("/quick_login")}})}).catch(function(){this.$vux.toast.show({text:"网络异常，请稍后再试",type:"warn"})}):this.$vux.alert.show({title:"错误提示",content:"两次密码输入不一致",onHide:function(){s.passwordAgain=""}})},goHome:function(){this.$router.push("/home")},LoginOut:function(){var t=this;this.$axios({method:"post",url:h.httpUrl.loginOut,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}}).then(function(s){console.log(s.data),200==s.data.errCode?t.$router.push("/quick_login"):201==s.data.errCode&&t.$vux.toast.show({type:"warn",text:s.data.retMsg})}).catch(function(){this.$vux.toast.show({text:"网络异常，请稍后再试",type:"warn"})})}},filters:{}}},"+XVm":function(t,s){},IshE:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=e("gh0H");e.n(o);for(var n in o)"default"!==n&&function(t){e.d(s,t,function(){return o[t]})}(n);var a=e("+IWT"),i=e.n(a),r=e("VwHF");var u=function(t){e("+XVm")},d=e("VU/8")(i.a,r.a,!1,u,"data-v-3ab0edce",null);s.default=d.exports},VwHF:function(t,s,e){"use strict";var o={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticStyle:{"text-align":"center"}},[e("popup-header",{attrs:{"left-text":"设置密码"}}),t._v(" "),e("group",{staticStyle:{margin:"0 10px"},attrs:{"label-width":"4.5em","label-margin-right":"1em","label-align":"justify"}},[e("x-input",{attrs:{title:"设置密码",placeholder:"设置登录密码",type:"password"},on:{"on-blur":t.blurPassword},model:{value:t.password,callback:function(s){t.password=s},expression:"password"}}),t._v(" "),e("x-input",{attrs:{title:"确认密码",placeholder:"请再次输入登录密码","equal-with":t.password,type:"password"},on:{"on-blur":t.blurPasswordAgain},model:{value:t.passwordAgain,callback:function(s){t.passwordAgain=s},expression:"passwordAgain"}})],1),t._v(" "),e("box",{attrs:{gap:"25px 10px"}},[e("x-button",{staticClass:"login-btn",attrs:{type:"primary"},nativeOn:{click:function(s){return t.submit(s)}}},[t._v("提交")])],1),t._v(" "),e("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[e("actionsheet",{attrs:{menus:t.menus,"show-cancel":""},on:{"on-click-menu-menu1":t.LoginOut},model:{value:t.showMenus,callback:function(s){t.showMenus=s},expression:"showMenus"}})],1)],1)},staticRenderFns:[]};s.a=o},gh0H:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=c(e("ABCa")),n=c(e("WZtS")),a=c(e("pDNl")),i=c(e("2sLL")),r=c(e("mzja")),u=c(e("Msp2")),d=c(e("QTi7")),l=c(e("rHil")),h=e("E3TW");function c(t){return t&&t.__esModule?t:{default:t}}s.default={name:"HelloWorld",data:function(){return{menus:{menu1:"退出登录"},showMenus:!1,show:!0,time:60,start:!1,password:"",passwordAgain:""}},components:{XHeader:o.default,PopupHeader:n.default,Actionsheet:u.default,Box:d.default,Group:l.default,XInput:a.default,XButton:i.default,Alert:r.default},methods:{blurPassword:function(){var t=this;this.isEmpty(this.password)?this.$vux.alert.show({title:"错误提示",content:"请输入密码",onHide:function(){}}):(!this.Val.isPassWord(this.password)||this.password.length<6)&&this.$vux.alert.show({title:"错误提示",content:"新密码必须为6位以上的英文和数字组成",onHide:function(){t.password=""}})},blurPasswordAgain:function(){var t=this;this.isEmpty(this.passwordAgain)?this.$vux.alert.show({title:"错误提示",content:"请输入密码",onHide:function(){}}):this.passwordAgain!=this.password&&this.$vux.alert.show({title:"错误提示",content:"两次密码输入不一致",onHide:function(){t.passwordAgain=""}})},submit:function(){var t=this,s=this,e=this.$qs.stringify({type:11,password:this.password,ckpassword:this.passwordAgain});this.isEmpty(this.passwordAgain)?this.$vux.alert.show({title:"错误提示",content:"请输入密码",onHide:function(){}}):this.passwordAgain==this.password?this.$axios({method:"post",url:h.httpUrl.setPassword,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},data:e}).then(function(e){console.log(e.data),200==e.data.errCode?t.$vux.alert.show({title:"提示",content:"密码设置成功",onHide:function(){s.$router.push("/home")}}):201==e.data.errCode?t.$vux.toast.show({type:"warn",text:e.data.retMsg}):401==e.data.errCode&&t.$vux.alert.show({title:"错误提示",content:"未登录，请先登录",onHide:function(){s.$router.push("/quick_login")}})}).catch(function(){this.$vux.toast.show({text:"网络异常，请稍后再试",type:"warn"})}):this.$vux.alert.show({title:"错误提示",content:"两次密码输入不一致",onHide:function(){s.passwordAgain=""}})},goHome:function(){this.$router.push("/home")},LoginOut:function(){var t=this;this.$axios({method:"post",url:h.httpUrl.loginOut,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}}).then(function(s){console.log(s.data),200==s.data.errCode?t.$router.push("/quick_login"):201==s.data.errCode&&t.$vux.toast.show({type:"warn",text:s.data.retMsg})}).catch(function(){this.$vux.toast.show({text:"网络异常，请稍后再试",type:"warn"})})}},filters:{}}}});
//# sourceMappingURL=37.460b62669d0141e09c6d.js.map