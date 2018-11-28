// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
// MyBread其实是组件选项所在的对象
import MyBread from '@/components/cuscom/myBread.vue'

import MyServerHttp from '@/plugins/http.js'
import moment from 'moment'
// 回顾axios
// import axios from 'axios'
// Vue.prototype.$http = axios

// 不要忘记引入css文件
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'

import router from './router'

// 适用vue插件
Vue.use(ElementUI)
Vue.use(MyServerHttp)


Vue.config.productionTip = false

// 全局过滤器 - 处理日期
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

// 全局自定义组件
Vue.component(MyBread.name, MyBread)

/* eslint-disable no-new */
new Vue({

  el: '#app',
  router,
  // render:(h)=>h(App)
  components: {
    App
  },
  template: '<App/>'
})
