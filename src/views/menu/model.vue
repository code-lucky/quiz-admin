<template>
    <div class="app-container">
        <h2>Menu {{ id ? 'Edit': 'Create'}}</h2>
        <div class="model-input">
            <el-form :model="form" inline size="large" label-width="auto" :rules="rules" ref="formRef">
                <el-form-item label="Name" prop="label">
                    <el-input v-model="form.label" placeholder="Please input menu name" clearable />
                </el-form-item>
                <el-form-item label="Parent menu" prop="parent_id">
                    <el-tree-select v-model="form.parent_id" :data="menuList" check-strictly :render-after-expand="false" />
                </el-form-item>
                <el-form-item label="Path" prop="path">
                    <el-input v-model="form.path" placeholder="Please input menu path" clearable />
                </el-form-item>
                <el-form-item label="Component" prop="component">
                    <el-input v-model="form.component" placeholder="Please input component path" clearable />
                </el-form-item>
                <el-form-item label="Icon" prop="icon">
                    <el-input v-model="form.icon" placeholder="Select icon" readonly @click="openIconDialog" />
                </el-form-item>
                <el-form-item label="Hide" prop="hide">
                    <el-switch v-model="form.hide" :active-value="true" :inactive-value="false"></el-switch>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitForm()">Save</el-button>
                    <el-button @click="goback">Back</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-dialog v-model="iconDialog" title="Select icon" width="80%" :before-close="handleClose">
            <div class="icon-list">
                <div class="icon-list-item" v-for="item in iconList" :key="item.key"
                    @click="selectIcon(item.component)">
                    <el-icon>
                        <component :is="item.component"></component>
                    </el-icon>
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="iconDialog = false">
                        Cancel
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
    import { ref, onMounted, markRaw } from 'vue'
    import { ElMessage } from 'element-plus'
    import * as ElementPlusIconsVue from '@element-plus/icons-vue'
    import { treeMenu, createMenu, detail, updateMenu } from "@/api/menu"
    import { useRoute } from 'vue-router'
    import router from '@/router'
    const form = ref({
        label: '',
        parent_id: 0,
        path: '',
        component: '',
        sort: 0,
        icon: '',
        hide: 0,
    })
    const route = useRoute()
    const id = Number(route.query.id) ? Number(route.query.id) : 0
    const formRef = ref(null)
    const iconList = ref([])
    const iconDialog = ref(false)
    const menuList = ref([])

    const rules = ref({
        label: [
            { required: true, message: 'Please input menu name', trigger: 'blur' }
        ],
        path: [
            { required: true, message: 'Please input menu path', trigger: 'blur' }
        ],
        component: [
            { required: true, message: 'Please input component path', trigger: 'blur' }
        ],
        hide: [
            { required: true, message: 'Please Select Hide', trigger: 'blur' }
        ]
    })

    const openIconDialog = () => {
        iconDialog.value = true
    }

    const handleClose = () => {
        iconDialog.value = false
    }

    // 获取所有的一级菜单
    const getMenuList = () => {
        treeMenu().then(res => {
            menuList.value = res.data.map(item => ({
                value: item.id,
                label: item.label
            }))
            menuList.value.unshift({
                value: 0,
                label: 'Top menu'
            })
        })
    }

    const selectIcon = (item) => {
        form.value.menu_icon = item.name
        iconDialog.value = false
    }

    const submitForm = () => {
        formRef.value.validate(valid => {
            if (valid) {
                if (id) {
                    form.value.id = id
                    updateMenu(form.value).then(res => {
                        if (res.code === 200) {
                            ElMessage.success('Save success')
                            setTimeout(() => {
                                router.go(-1)
                            }, 500)
                        }
                    })
                } else {
                    createMenu(form.value).then(res => {
                        if (res.code === 200) {
                            ElMessage.success('Save success')
                            setTimeout(() => {
                                router.go(-1)
                            }, 500)
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

    onMounted(() => {
        getMenuList()
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            iconList.value.push({
                name: key,
                component: markRaw(component)
            })
        }
        if (id) {
            console.log('id', id)
            detail(id).then(res => {
                const data = res.data
                for (const key in form.value) {
                    form.value[key] = data[key]
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