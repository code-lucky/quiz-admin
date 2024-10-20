<template>
    <div class="app-container">
        <h2>Role {{ id ? 'Edit': 'Create'}}</h2>
        <div class="model-input">
            <el-form :model="form" inline size="large" label-width="auto" :rules="rules" ref="formRef">
                <el-form-item label="Name" prop="role_name">
                    <el-input v-model="form.role_name" placeholder="Please input role name" clearable />
                </el-form-item>
                <el-form-item label="Menu" prop="menu_ids">
                    <el-tree-select v-model="form.menu_ids" :data="menuList" :render-after-expand="false" show-checkbox
                        multiple check-strictly />
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
    import { ElMessage } from 'element-plus'
    import * as ElementPlusIconsVue from '@element-plus/icons-vue'
    import { useRoute } from 'vue-router'
    import { treeMenu } from "@/api/menu"
    import { create, update, detail } from '@/api/role'
    import router from '@/router'
    const form = ref({
        role_name: '',
        menu_ids: []
    })
    const route = useRoute()
    const id = route.query.id
    const formRef = ref(null)
    const menuList = ref([])

    const rules = ref({
        role_name: [
            { required: true, message: 'Please input menu name', trigger: 'blur' }
        ]
    })

    const submitForm = () => {
        formRef.value.validate(valid => {
            if (valid) {
                if (id) {
                    update(id, form.value).then(res => {
                        if (res.code === 200) {
                            ElMessage.success('Update success')
                            setTimeout(() => {
                                router.push('/role/index')
                            }, 1000)
                        } else {
                            ElMessage.error(res.message)
                        }
                    })
                } else {
                    create(form.value).then(res => {
                        if (res.code === 200) {
                            ElMessage.success('Create success')

                            setTimeout(() => {
                                router.push('/role/index')
                            }, 1000)
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

    const goback = () => {
        router.go(-1)
    }

    const getTreeMenu = () => {
        treeMenu().then(res => {
            if (res.code === 200) {
                const list = res.data
                menuList.value = list.map(item => {
                    console.log(item.children, 'item')
                    return {
                        value: item.id,
                        label: item.menu_name,
                        children: item.children ? item.children.map(child => {
                            return {
                                value: child.id,
                                label: child.menu_name
                            }
                        }) : []
                    }
                })
            }
        })
    }

    onMounted(() => {
        getTreeMenu()
        if (id) {
            detail(id).then(res => {
                form.value = res.data
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