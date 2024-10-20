<template>
    <div class="logo-content">Logo</div>
    <el-menu default-active="2" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
        <template v-for="(item, index) in menuList" :key="item.index">
            <el-sub-menu v-if="hasVisibleChildren(item)" :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.icon || Setting"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </template>
                <el-menu-item-group v-for="(child, idx) in visibleChildren(item)" :key="idx">
                    <el-menu-item :index="child.path" @click="goPath(child.path)">
                        <el-icon v-if="child.icon">
                            <component :is="child.icon"></component>
                        </el-icon>
                        {{ child.name }}
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>

            <el-menu-item v-else @click="goPath(item.path)" :index="item.path">
                <el-icon>
                    <component :is="item.icon || Setting"></component>
                </el-icon>
                <span>{{ item.name }}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import eventBus from "@/utils/event-bus"
import { Setting } from '@element-plus/icons-vue'
import router from "@/router/index"
import { useUserStore } from "@/store/user"
import pinia from "@/store/index"

const store = useUserStore(pinia)
const menuList = ref([])
const isCollapse = ref(false)

const handleOpen = (key, keyPath) => {
    // Handle menu open
}

const handleClose = (key, keyPath) => {
    // Handle menu close
}

const goPath = (path) => {
    router.push(path)
}

const hasVisibleChildren = (item) => {
    return item.children.some(child => !child.hide)
}

const visibleChildren = (item) => {
    return item.children.filter(child => !child.hide)
}

useUserStore().$subscribe((mutation) => {
    if (mutation.events.key === 'menuList') {
        nextTick(() => {
            menuList.value = mutation.events.newValue
        })
    }
})

onMounted(() => {
    eventBus.$on('collapseStatus', (status) => {
        isCollapse.value = status
    })
    menuList.value = store.menuList
})
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.logo-content {
    height: 60px;
    background-color: #fff;
    box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>