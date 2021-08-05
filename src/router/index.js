// ===========这里是路由的配置=============

// 1.引入 vue-router
import VueRouter from "vue-router"

// 2.引入 一级路由组件
import LoginPage from '../layout/LoginPage.vue'
import HomePage from '../layout/HomePage.vue'

// 3.引入 二级路由组件
import ShowListPage from "../components/subpage/ShowListPage.vue"

// 4.引入 三级路由组件
import List from "../components/subpage/subpart/List.vue"

// 解决重复路由报错
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

// 3.形成 路由关系并导出
const router = new VueRouter({
    routes: [
        // 登录页
        {
            name: 'login',
            path: '/login',
            component: LoginPage
        },
        // 主页
        {
            name: 'home',
            path: '/home',
            component: HomePage,
            children: [
                //  建议书列表页
                {
                    name: 'showlist',
                    path: 'showlist',
                    component: ShowListPage,
                    children: [
                        {
                            // 列表组件
                            name: 'list',
                            path: 'list',
                            component: List,
                        }
                    ]
                }
            ]
        }
    ]
})

export default router