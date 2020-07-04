import Vue from 'vue'
import App from './App'
import { MyRequest } from '@/utils/request';

// 注册插件
Vue.use(MyRequest)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
