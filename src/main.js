import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 1.引入 axios
import axios from "@/myaxios/myaxios";
// 2.将axios 挂载到 Vue 原型上
Vue.prototype.$http = axios;

new Vue({
  render: h => h(App),
}).$mount('#app')
