// ===========这里是路由的配置=============

// 1.引入 vue-router
import VueRouter from "vue-router"

// 2.引入 一级路由组件
import LoginPage from '../layout/LoginPage.vue'
import HomePage from '../layout/HomePage.vue'

// 3.引入 二级路由组件
import ShowListPage from "../components/subpage/ShowListPage.vue"
import Other from "../components/subpage/Other.vue"

// 4.引入 三级路由组件
import List from "../components/subpage/subpart/List.vue"
import Add from "../components/subpage/subpart/Add.vue"
import Complete from "../components/subpage/subpart/Complete.vue"
import Edit from "../components/subpage/subpart/Edit.vue"

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
            component: LoginPage,
            meta: { isAuth: false }
        },
        // 主页
        {
            name: 'home',
            path: '/home',
            component: HomePage,
            meta: { isAuth: true },
            children: [
                //  建议书列表页
                {
                    name: 'showlist',
                    path: 'showlist',
                    component: ShowListPage,
                    meta: { isAuth: true },
                    children: [
                        {
                            // 列表组件
                            name: 'list',
                            path: 'list',
                            component: List,
                            meta: { isAuth: true }
                        },
                        {
                            // 新增组件
                            name: 'add',
                            path: 'add',
                            component: Add,
                            meta: { isAuth: true }
                        },
                        {
                            // 完善组件
                            name: 'complete',
                            path: 'complete',
                            component: Complete,
                            meta: { isAuth: true }
                        },
                        {
                            // 编辑组件
                            name: 'edit',
                            path: 'edit',
                            component: Edit,
                            meta: { isAuth: true }
                        },
                    ]
                },
                // OtherPage
                {
                    name: 'other',
                    path: '/other',
                    component: Other,
                    meta: { isAuth: true }
                },
            ]
        },
        //跳转到404页面
        {
            path: '*',
            component: () => import("../components/Errors"),
            hidden: true
        }
    ]
})

// 全局前置路由守卫做权限限制
router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {
        if (localStorage.getItem("token") == null) {
            alert("您没有权限访问")
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router