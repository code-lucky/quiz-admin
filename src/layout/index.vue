<template>
    <div class="layout-container">
        <div class="layout-sidebar">
            <sidebar></sidebar>
        </div>
        <div class="layout-right">
            <div class="layout-header">
                <headers></headers>
            </div>
            <div class="lay-content">
                <router-view :key="currentRoute" />
            </div>
        </div>
    </div>
</template>
<script setup>
    import { onMounted, ref } from 'vue'
    import Sidebar from '@/layout/sidebar/index.vue'
    import Headers from '@/layout/header/index.vue'
    import { useRouter } from 'vue-router';
    const route = useRouter()
    const currentRoute = ref(route.currentRoute.value.fullPath)
</script>
<style lang="scss" scoped>
    .layout-container {
        display: flex;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .layout-sidebar {
        max-width: 260px;
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
        background-color: #fff;
    }

    .layout-right {
        flex: 1;
        overflow: auto;
        background-color: #f5f5f5;
    }

    .lay-content {
        margin: 20px 20px 0 20px;
    }

    :deep(.el-menu) {
        border: 0;
    }
</style>