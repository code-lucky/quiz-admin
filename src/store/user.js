import { defineStore } from "pinia"
import router from "@/router";
import Layout from '@/layout/index.vue';
import { nextTick } from "vue";
import { userInfo } from "@/api/user";
const modules = import.meta.glob('../views/*/*.vue')
export const useUserStore = defineStore('user', {
    state: () => ({
        hasRoutes: false,
        routes: [],
        menuList: [],
        userInfo: {},
        menuAll: []
    }),
    actions: {
        async setRoutes() {
            const data = await userInfo()
            this.routes = data.data.permissions
            nextTick(async () => {
                // 构建树形结构
                this.menuList = await this.generateMenuTree(this.routes, 0)
                this.menuAll = this.routes
                this.hasRoutes = true
            })
        },
        async generateMenuTree(menuList, parent_id) {
            let list = []

            for (const item of menuList) {
                if (item.parent_id === parent_id) {
                    const route = {
                        path: item.path,
                        name: item.label,
                        icon: item.icon,
                        children: [],
                        component: item.parent_id === 0 ? Layout : modules[`../views${item.component}.vue`],
                        hide: item.hide == 1 ? true : false
                    }
                    const children = await this.generateMenuTree(menuList, item.id)

                    if (children.length > 0) {
                        route.children = children
                    } else {
                        route.children = [
                            {
                                path: item.path,
                                name: item.label,
                                icon: item.icon,
                                component: modules[`../views${item.component}.vue`],
                                hide: true
                            }
                        ]
                    }

                    router.addRoute(route)
                    list.push(route)
                }
            }

            return list
        },
        async getUserInfo() {
            userInfo().then(res => {
                this.userInfo = res.data
            })
        }
    }
})