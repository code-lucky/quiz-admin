import router from "@/router";
import pinia from "./store/index"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import eventBus from "@/utils/event-bus";
import { useUserStore } from "./store/user";
import { TOKEN } from '@/utils/constant'
import { nextTick } from 'vue'
const store = useUserStore(pinia)
const whiteList = ['/login', '/404', '/sign-up', '/forgot-password']
router.beforeEach(async (to, form, next) => {
    await store.setRoutes()
    NProgress.start();
    const Token = localStorage.getItem(TOKEN)
    const hasRoutes = store.hasRoutes
    const menuList = store.menuAll
    console.log(menuList, 'menuList')
    if (Token) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else if (to.path === '/') {
            next({ path: '/dashboard/index' })
        } else {
            if (!hasRoutes && menuList.filter(item => item.path === to.path).length === 0) {
                await store.setRoutes()
                router.addRoute({
                    path: '/:catchAll(.*)',
                    name: 'not-found',
                    component: () => import('@/views/components/404.vue'),
                    hidden: true
                })
                next({ ...to, replace: true }) // 确保路由被替换
                store.hasRoutes = true
            } else {
                await store.setRoutes()
                const currentRouter = to
                eventBus.$emit('route-list', currentRouter)
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
    NProgress.done()
})