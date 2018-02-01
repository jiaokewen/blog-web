// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'vis/dist/vis.css'
import store from '@/store'
import indicator from '@/components/index'
// 引入echarts
import echarts from 'echarts'
import vis from 'vis'

Vue.prototype.$vis = vis
Vue.prototype.$echarts = echarts

Vue.use(indicator)
Vue.use(VueResource)
Vue.use(iView)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
