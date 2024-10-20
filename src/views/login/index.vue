<template>
    <el-container class="container">
        <el-card class="card login-container">
            <div class="login-title">Sign in</div>
            <el-form class="form" ref="loginFormRef" :model="loginForm" :rules="rules">
                <el-form-item label="" prop="user_name">
                    <el-input size="large" v-model="loginForm.user_name" :prefix-icon="User"
                        placeholder="Please enter username"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input size="large" v-model="loginForm.password" :prefix-icon="Lock"
                        placeholder="Please enter password" type="password" show-password>
                    </el-input>
                </el-form-item>
                <div class="login-toast">
                    <div class="remember"><el-switch v-model="loginForm.remember" active-text="Remember me" /></div>
                    <div class="forgot" @click="forgot">Forgot password?</div>
                </div>
                <el-form-item>
                    <el-button size="large" type="primary" @click="submitForm" class="login-btn">Sign in</el-button>
                </el-form-item>
                <div>Don't have an account? <span class="sign" @click="signUp">Sign up</span></div>
            </el-form>
        </el-card>
    </el-container>
</template>
<script setup>
    import { ref } from 'vue';
    import router from '@/router'
    import { User, Lock, View, Hide } from '@element-plus/icons-vue'
    import { login } from '@/api/login'
    import { TOKEN } from '@/utils/constant'
    const loginForm = ref({
        user_name: '',
        password: '',
        remember: false
    });
    const loginFormRef = ref(null);

    // 使用 ref 创建验证规则
    const rules = ref({
        user_name: [
            { required: true, message: 'Please enter username', trigger: 'blur' }
        ],
        password: [
            { required: true, message: 'please enter password', trigger: 'blur' }
        ]
    });

    // 提交表单
    const submitForm = () => {
        loginFormRef.value.validate(valid => {
            if (valid) {
                login(loginForm.value).then(res => {
                    localStorage.setItem(TOKEN, res.data.token)
                    router.push('/dashboard/index')
                })
            } else {
                console.log('表单验证失败');
                return false;
            }
        });
    };

    const signUp = () => {
        router.push('/sign-up')
    }

    const forgot = () => {
        router.push('/forgot-password')
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
        color: #5157c5;
    }
</style>