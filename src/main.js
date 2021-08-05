// 基础两件套,Vue App组件
import Vue from 'vue'
import App from './App.vue'

// 引入路由
import VueRouter from "vue-router"
Vue.use(VueRouter)
import router from "./router"

// 引入Element-UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
  el:"#demo",
  router,
  render: createElement => createElement(App),
})
