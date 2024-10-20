<template>
    <div class="header-container">
        <img src="../../assets/images/pack-up.svg" class="pick-left" alt="" v-if="collapseStatus"
            @click="changeCollapse" />
        <img src="../../assets/images/pack-up.svg" class="pick-right" alt="" v-else @click="changeCollapse" />
        <div class="header-pic">
            <el-dropdown>
                <img v-if="userInfo.head_pic" :src="$fileUrl + userInfo.head_pic" alt="" @click="profile()" />
                <img v-else src="../../assets/images/header-pic.svg" alt="" @click="profile()" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="changePassword">Change Password</el-dropdown-item>
                        <el-dropdown-item @click="changeEmail">Change Email</el-dropdown-item>
                        <el-dropdown-item @click="changeUserName">Change User Name</el-dropdown-item>
                        <el-dropdown-item @click="logout">LogOut</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
    import { ref, provide, onMounted, onUnmounted } from 'vue'
    import { useRouter } from 'vue-router'
    import eventBus from "@/utils/event-bus"
    import { storeToRefs } from 'pinia'
    import { useUserStore } from "@/store/user";
    import { getAssetURL } from "@/utils/load_assets.js";

    const useUser = useUserStore()
    const { userInfo } = storeToRefs(useUser)
    useUser.getUserInfo()
    const router = useRouter()
    const collapseStatus = ref(false)

    const pageChange = () => {
        if (window.innerWidth < 768) {
            collapseStatus.value = true
            eventBus.$emit('collapseStatus', collapseStatus.value)
        } else {
            collapseStatus.value = false
            eventBus.$emit('collapseStatus', collapseStatus.value)
        }
    }

    const changeCollapse = () => {
        collapseStatus.value = !collapseStatus.value
        eventBus.$emit('collapseStatus', collapseStatus.value)
    }

    // 登出
    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    const profile = () => {
        router.push('/profile/index')
    }

    const changePassword = () => {
        router.push('/profile/change-password')
        console.log('changePassword')
    }

    const changeEmail = () => {
        router.push('/profile/change-email')
        console.log('changeEmail')
    }

    const changeUserName = () => {
        // router.push('/profile/change-user-name')
        console.log('changeUserName')
    }

    onMounted(() => {
        pageChange()
        // 监听页面大小变化
        window.addEventListener('resize', pageChange)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', pageChange)
    })
</script>
<style scoped lang="scss">
    .header-container {
        background-color: #fff;
        box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.1);
        height: 60px;
        display: flex;
        align-items: center;
        padding: 0 20px;
    }

    .header-pic {
        margin-left: auto;
        cursor: pointer;
    }

    :deep(.el-tooltip__trigger:focus-visible) {
        outline: unset;
    }

    .pick-left,
    .pick-right {
        width: 24px;
        cursor: pointer;
    }

    .pick-right {
        transform: rotate(180deg);
    }

    .header-pic img{
        width: 32px;
        height: 32px;
        border-radius: 32px;
    }
</style>