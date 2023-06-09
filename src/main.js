// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import Vuex from 'vuex';
import store from './vuex/store.js';
import moment from 'moment';
import jquery from 'jquery'
// import VueEditor from "vue-word-editor"
Vue.use(Vuex);
Vue.prototype.$axios=axios;
Vue.prototype.$jquery=jquery;
Vue.use(ElementUI);
// Vue.component('VueEditor',VueEditor)
//全局过滤器
Vue.filter('dateFmt', (input, formatString = "YYYY-MM-DD") => {
    //es5函数参数设置默认值
    //const lastFormatString = formatString || ''

    
     // moment(input) 把时间字符串转成时间对象
     // format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
    if(input){
      return moment(input).format(formatString)
    }else{
      return 'null'
    }
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
