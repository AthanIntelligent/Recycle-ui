import Vue from 'vue'

import ElementUI, {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
// import './element-variables.scss'

// animate动画库
import 'animate.css'

import App from './App'
import router from './router'
import store from './store'

// 自定义的全局组件
import Notification from '@/components/notification'

// 国际化
import i18n from './lang'
// 全局权限检查
import './permission'
// 全局图标
import './icons'
// 全局 Mock 接口
import './mock'

import axios from 'axios'
import {devServer} from '../vue.config'

import vcharts from 'v-charts'
Vue.use(vcharts)

import VueAMap from 'vue-amap'
Vue.use(VueAMap)
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  key: '36945e2c1ec9fcd3ecd5d953d4169592',
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
})

Vue.use(ElementUI, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(Notification)

Vue.prototype.$ajax = axios
axios.defaults.baseURL = 'http://localhost:8082/'
Vue.config.productionTip = false

Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
