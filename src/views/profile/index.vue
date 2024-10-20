<template>
    <div class="app-container">
        <div class="profile-box">
            <h1>Profile</h1>
            <el-form :model="form" label-width="120px">
                <el-form-item label="User Name">
                    <el-input v-model="form.user_name" size="large" disabled></el-input>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="form.email" size="large" disabled></el-input>
                </el-form-item>
                <el-form-item label="Profile Photo">
                    <el-upload class="avatar-uploader" :action="$uploadUrl" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="form.head_pic" :src="$fileUrl + form.head_pic" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label>
                    <el-button type="primary" @click="submitForm">Submit</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted, nextTick, watch } from 'vue'
    import { ElMessage } from 'element-plus'
    import { storeToRefs } from 'pinia'
    import { useUserStore } from "@/store/user";
    import { updateUser } from "@/api/user";
    const useUser = useUserStore()
    const { userInfo } = storeToRefs(useUser)
    useUser.getUserInfo()

    const form = ref({
        id: 0,
        user_name: '',
        email: '',
        head_pic: ''
    })

    const imageUrl = ref('')
    const submitForm = () => {
        updateUser(form.value).then(res => {
            if (res.code === 200) {
                ElMessage.success(res.data)
                useUser.getUserInfo()
            }
        })
    }

    const handleAvatarSuccess = (res, file) => {
        form.value.head_pic = res.data.file
    }

    // Watch userInfo and update the form when userInfo changes
    watch(userInfo, (newUserInfo) => {
        if (newUserInfo) {
            form.value = {
                id: newUserInfo.id,
                user_name: newUserInfo.user_name,
                email: newUserInfo.email,
                head_pic: newUserInfo.head_pic
            }
        }
    }, { immediate: true })
</script>
<style scoped lang="scss">
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
    }

    .profile-box {
        max-width: 600px;
        position: relative;
        margin: 0 auto;
    }

    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        width: 178px;
        font-size: 28px;
        color: #8c939d;
        height: 178px;
        text-align: center;
    }
</style>