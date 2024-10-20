<template>
    <div class="app-container">
        <div class="profile-box">
            <h1>Change Email</h1>
            <el-form :model="form" label-width="150px" :rules="rules" ref="formRef">
                <el-form-item label="Current Email" prop="current_email">
                    <el-input v-model="form.current_email" size="large" clearable disabled></el-input>
                </el-form-item>
                <el-form-item label="New Email" prop="email">
                    <el-input v-model="form.email" size="large" clearable></el-input>
                </el-form-item>
                <el-form-item label="Captcha" prop="captcha">
                    <div class="flex-column">
                        <el-input v-model="form.captcha" size="large" clearable></el-input>
                        <el-button type="primary" @click="getCaptcha" :disabled="isDisabled" size="large">{{ captchaText
                            }}</el-button>
                    </div>
                </el-form-item>
                <el-form-item label>
                    <el-button type="primary" @click="submitForm">Submit</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
    import { ref, nextTick, reactive, watchEffect } from 'vue'
    import { ElMessage } from 'element-plus'
    import { updateEmailSendCode, updateEmail } from "@/user";
    import { storeToRefs } from 'pinia'
    import { useUserStore } from "@/store/user";
    const useUser = useUserStore()
    const { userInfo } = storeToRefs(useUser)
    useUser.getUserInfo()
    const captchaText = ref('Get Captcha')

    const isDisabled = ref(false)

    const formRef = ref(null)

    const form = ref({
        current_email: '',
        email: '',
        captcha: ''
    })

    const checkEmail = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('Please input the email'))
        } else if (form.value.password !== form.value.confirm_password) {
            callback(new Error('The new email address and current email address cannot be the same'))
        }
        return true
    }

    const rules = reactive({
        current_email: [
            { required: true, message: 'Please input the email', trigger: 'blur' }
        ],
        email: [
            { required: true, validator: checkEmail, trigger: 'blur' }
        ],
        captcha: [
            { required: true, message: 'Please input the captcha', trigger: 'blur' }
        ],
    })



    const submitForm = () => {
        formRef.value.validate((valid) => {
            if (valid) {
                updateEmail(form.value).then(res => {
                    if (res.code === 200) {
                        ElMessage.success('Change email successfully')
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500)
                    }
                })
            } else {
                console.log('error submit!')
            }
        })
    }

    const getCaptcha = () => {
        let count = 60
        isDisabled.value = true
        const timer = setInterval(() => {
            count--
            if (count > 0) {
                captchaText.value = `${count}s`
            } else {
                clearInterval(timer)
                captchaText.value = 'Get Captcha'
                isDisabled.value = false
            }
        }, 1000)

        updateEmailSendCode(form.value.email).then(res => {
            if (res.code === 200) {
                ElMessage.success(res.data)
            }
        })
    }


    watchEffect(() => {
        if (userInfo.value) {
            form.value.current_email = userInfo.value.email
        }
    })
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

    .flex-column {
        display: flex;
        width: 100%;
        gap: 10px;
    }
</style>