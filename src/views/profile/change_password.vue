<template>
    <div class="app-container">
        <div class="profile-box">
            <h1>Change Password</h1>
            <el-form :model="form" label-width="150px" :rules="rules" ref="formRef">
                <el-form-item label="Old Password" prop="old_password">
                    <el-input v-model="form.old_password" size="large"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="form.password" size="large"></el-input>
                </el-form-item>
                <el-form-item label="Confirm Password" prop="confirm_password">
                    <el-input v-model="form.confirm_password" size="large"></el-input>
                </el-form-item>
                <el-form-item label>
                    <el-button type="primary" @click="submitForm">Submit</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
    import { ref, nextTick, reactive } from 'vue'
    import { ElMessage } from 'element-plus'
    import { updatePassword } from "@/user";

    const formRef = ref(null)

    const form = ref({
        old_password: '',
        password: '',
        confirm_password: ''
    })

    const checkPassword = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('Please input the confirm password'))
        } else if (form.value.password !== form.value.confirm_password) {
            callback(new Error('The password and confirm password are not the same'))
        }
        return true
    }

    const rules = reactive({
        old_password: [
            { required: true, message: 'Please input the old password', trigger: 'blur' }
        ],
        password: [
            { required: true, message: 'Please input the new password', trigger: 'blur' }
        ],
        confirm_password: [
            { required: true, validator: checkPassword, trigger: 'blur' }
        ]
    })



    const submitForm = () => {
        formRef.value.validate((valid) => {
            if (valid) {
                updatePassword(form.value).then(res => {
                    if (res.code === 200) {
                        ElMessage.success('Change password successfully')
                    }
                })
            } else {
                console.log('error submit!')
            }
        })
    }
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
</style>