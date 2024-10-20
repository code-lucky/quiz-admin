<template>
    <el-container class="container">
        <el-card class="card login-container">
            <div class="login-title">Forgot password</div>
            <el-form class="form" ref="formRef" :model="form" :rules="rules">
                <el-form-item label="" prop="email">
                    <el-input size="large" v-model="form.email" :prefix-icon="Message"
                        placeholder="Please enter email"></el-input>
                </el-form-item>
                <el-form-item label="" prop="captcha">
                    <div class="flex-column">
                        <el-input size="large" v-model="form.captcha" placeholder="please enter captcha"></el-input>
                        <el-button color="#626aef" size="large" @click="getCaptcha"
                            :disabled="isDisabled">{{captchaText}}</el-button>
                    </div>
                </el-form-item>
                <div class="reset-hint">
                    The reset password is <span>123456</span>
                </div>
                <el-form-item>
                    <el-button size="large" type="primary" @click="submitForm" class="login-btn">Reset
                        password</el-button>
                </el-form-item>
                <div>Password reset successfully? <span class="sign" @click="signIn">Sign in</span></div>
            </el-form>
        </el-card>
    </el-container>
</template>
<script setup>
    import { ref } from 'vue';
    import router from '@/router'
    import { ElMessage } from 'element-plus'
    import { Message } from '@element-plus/icons-vue'
    import { resetPasswordCode, resetPassword } from '@/user'
    import { TOKEN } from '@/utils/constant'
    const form = ref({
        email: '',
        captcha: ''
    });

    const captchaText = ref('Get Captcha')
    const isDisabled = ref(false)
    const formRef = ref(null);

    // 使用 ref 创建验证规则
    const rules = ref({
        email: [
            { required: true, message: 'Please enter email', trigger: 'blur', type: 'email' }
        ],
        captcha: [
            { required: true, message: 'please enter captcha', trigger: 'blur' }
        ]
    });

    // 提交表单
    const submitForm = () => {
        formRef.value.validate(valid => {
            if (valid) {
                resetPassword(form.value).then(res => {
                    ElMessage.success('Reset password successfully')
                    setTimeout(() => {
                        router.push('/login')
                    }, 1000)
                })
            } else {
                console.log('表单验证失败');
                return false;
            }
        });
    };

    const signIn = () => {
        router.push('/login')
    }

    const getCaptcha = () => {
        let count = 60
        isDisabled.value = true

        resetPasswordCode(form.value.email).then(res => {
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
        }).catch(err => {
            isDisabled.value = false
            captchaText.value = 'Get Captcha'
        })
    }
</script>
<style scoped lang="scss">
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        padding: 0 20px;
    }

    .login-container {
        max-width: 500px;
        width: 100%;
        height: 460px;
    }

    .login-title {
        text-align: left;
        font-size: 24px;
        font-weight: bold;
        padding: 20px 3rem;
    }

    .form {
        margin-top: 20px;
        padding: 0 3rem;
    }

    .login-btn {
        width: 100%;
    }

    .login-toast {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .remember,
    .forgot {
        cursor: pointer;
    }

    .remember {
        color: #2d2d2d;
    }

    .forgot {
        color: #2d2d2d;
        font-weight: bold;
    }

    .forgot:hover {
        color: #616161;
    }

    .sign {
        color: #2d2d2d;
        font-weight: bold;
        cursor: pointer;
    }

    .sign:hover {
        color: #616161;
    }

    .reset-hint {
        padding: 0 0 20px 0;
    }

    .reset-hint span {
        color: #b53c3c;
        font-weight: bold;
    }
</style>