// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import vuex from 'vuex'
import "babel-polyfill";
import axios from 'axios';
import qs from 'qs';
import { AjaxPlugin ,TransferDom,Alert,AlertPlugin ,Toast ,ToastPlugin ,Loading, LoadingPlugin ,Confirm  ,ConfirmPlugin,Icon } from 'vux';
import util from './util';
import store from './store';
import VueImgInputer from 'vue-img-inputer';
import vueSignature from "vue-signature"
import 'videojs-contrib-hls'

Vue.use(vuex);
Vue.use(vueSignature)
Vue.use(util);

Vue.component('VueImgInputer', VueImgInputer);
Vue.component('alert', Alert);
Vue.component('toast', Toast);
Vue.component('loading', Loading);
Vue.component('confirm', Confirm);
Vue.component('icon', Icon)

Vue.use(AlertPlugin);
Vue.use(AjaxPlugin);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin)

Vue.directive('transfer-dom', TransferDom);
Vue.config.productionTip = false;


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;      //让ajax携带cookie
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

const FastClick = require('fastclick');
FastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
