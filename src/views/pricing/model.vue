<template>
    <div class="app-container">
        <h2>Pricing {{ id ? 'Edit': 'Create'}}</h2>
        <div class="model-input">
            <el-form :model="form" inline size="large" label-width="auto" :rules="rules" ref="formRef">
                <el-form-item label="Name" prop="name">
                    <el-input v-model="form.name" placeholder="Please input name" clearable />
                </el-form-item>
                <el-form-item label="Original Price" prop="original_price">
                    <el-input v-model="form.original_price" placeholder="Please input original price" clearable />
                </el-form-item>
                <el-form-item label="Price" prop="price">
                    <el-input v-model="form.price" placeholder="Please input price" clearable />
                </el-form-item>
                <el-form-item label="Discount" prop="discount">
                    <el-input v-model="form.discount" placeholder="Please input discount" clearable />
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
    import { useRoute } from 'vue-router'
    import router from '@/router'
    import { getPricingList, createPricing, updatePricing, getPricingDetail } from '@/api/pricing';
    const route = useRoute()
    const id = route.query.id
    const formRef = ref(null)
    const form = ref({
        name: '',
        path: '',
        pid: '',
        icon: '',
    })

    const navList = ref([])

    const rules = ref({
        name: [
            { required: true, message: 'Please input name', trigger: 'blur' }
        ],
        original_price: [
            { required: true, message: 'Please input original price', trigger: 'blur' }
        ],
        price: [
            { required: true, message: 'Please input price', trigger: 'blur' }
        ],
        discount:[
            { required: true, message: 'Please input discount', trigger: 'blur' }
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
                    updatePricing(form.value).then(res => {
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
                    createPricing(form.value).then((res) => {
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
                return false
            }
        })
    }

    onMounted(() => {
        if (id) {
            // edit
            // get navigation info
            getPricingDetail(id).then(res=>{
                if(res.code === 200){
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