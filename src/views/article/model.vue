<template>
    <div class="app-container">
        <h2>Article {{ id ? 'Edit': 'Create'}}</h2>
        <div class="model-input">
            <el-form :model="form" inline size="large" label-width="auto" :rules="rules" ref="formRef">
                <el-form-item label="Title" prop="title">
                    <el-input v-model="form.title" placeholder="Please input title" clearable />
                </el-form-item>
                <el-form-item label="Name" prop="name">
                    <el-input v-model="form.name" placeholder="Please input name" clearable />
                </el-form-item>
                <el-form-item label="Content" prop="content">
                    <Editor v-model="form.content" />
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitForm()">Save</el-button>
                    <el-button @click="goback">Back</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted, markRaw } from 'vue'
    import Editor from '@/components/editor.vue'
    import { ElMessage } from 'element-plus'
    import * as ElementPlusIconsVue from '@element-plus/icons-vue'
    import { useRoute } from 'vue-router'
    import router from '@/router'
    import { createArticle, updateArticle, getArticleDetail } from '@/api/article';
    const route = useRoute()
    const id = route.query.id
    const formRef = ref(null)
    const form = ref({
        title: '',
        name: '',
        content: '',
        type: '0',
        cover_img: '',
    })

    const rules = ref({
        title: [
            { required: true, message: 'Please input title', trigger: 'blur' }
        ],
        name: [
            { required: true, message: 'Please input name', trigger: 'blur' }
        ],
        content: [
            { required: true, message: 'Please input content', trigger: 'blur' }
        ]
    })

    const goback = () => {
        router.go(-1)
    }

    const submitForm = () => {
        formRef.value.validate(valid => {
            if (valid) {
                if (id) {
                    // update
                    updateArticle(form.value).then(res => {
                        if (res.code === 200) {
                            ElMessage.success('Success')
                            setTimeout(() => {
                                router.go(-1)
                            }, 500);
                        } else {
                            ElMessage.error(res.message)
                        }
                    })
                } else {
                    // create
                    createArticle(form.value).then((res) => {
                        if (res.code === 200) {
                            ElMessage.success('Success')
                            setTimeout(() => {
                                router.go(-1)
                            }, 500);
                        } else {
                            ElMessage.error(res.message)
                        }
                    })
                }

            } else {
                console.log('Validation failed')
                return false
            }
        })
    }

    onMounted(() => {
        if (id) {
            // get article info
            getArticleDetail(id).then(res => {
                if (res.code === 200) {
                    form.value = res.data
                }
            })
        }
    })
</script>
<style scoped lang="scss">
    .icon-list {
        overflow: hidden;
        list-style: none;
        padding: 0 !important;
        border: 1px solid var(--el-border-color);
        border-radius: 4px;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        height: 60vh;
        overflow-y: auto;
        padding: 20px;
    }

    .icon-list-item {
        text-align: center;
        color: var(--el-text-color-regular);
        height: 90px;
        font-size: 13px;
        border-right: 1px solid var(--el-border-color);
        border-bottom: 1px solid var(--el-border-color);
        transition: background-color var(--el-transition-duration);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :deep(.icon-list-item .el-icon) {
        font-size: 30px;
        margin-top: 10px;
    }
</style>