// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// rem响应式
require("./assets/js/flexible")
import {Const_Api_Root} from '../static/data/apiRoot'

// axios
import axios from "axios";
axios.defaults.baseURL = Const_Api_Root;
Vue.prototype.$axios=axios;

// vuex状态管理
import Vuex from 'Vuex';
Vue.use(Vuex);

// 解决m3u8视频
import Videojs from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Videojs

// swiper插件（轮播banner）
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios';
Vue.use(ElementUI)

// axios兼容IE
import promise from 'es6-promise';
import 'babel-polyfill'
promise.polyfill();

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})