<template>
    <div class="app-container">
        <h2>Menu List</h2>
        <div class="header-content">
            <el-button type="primary" @click="handleAdd" :icon="Plus">
                New menu
            </el-button>
        </div>

        <el-table :data="menuList" row-key="id">
            <el-table-column label="Id" prop="id" />
            <el-table-column label="Name" prop="label" />
            <el-table-column label="Path" prop="path" />
            <el-table-column label="Component path" prop="component" />
            <el-table-column label="Icon" prop="icon" />
            <el-table-column label="Update time" prop="updated_at" />
            <el-table-column label="Handle" prop="updated_at" width="240">
                <template #default="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)">
                        Edit
                    </el-button>
                    <el-popover :visible="visible == scope.row.id" placement="bottom" :width="160">
                        <p>Are you sure to delete this?</p>
                        <div>
                            <el-button size="small" text @click="visible = 0">cancel</el-button>
                            <el-button size="small" type="primary" @click="handleDelete(scope.$index, scope.row)">
                                confirm
                            </el-button>
                        </div>
                        <template #reference>
                            <el-button type="danger" @click="visible = scope.row.id">
                                Delete
                            </el-button>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import { ElMessage } from 'element-plus'
    import { Plus, Search } from '@element-plus/icons-vue'
    import { useRouter } from 'vue-router'
    import { treeMenu, deleteMenu } from "@/api/menu"
    import pinia from "@/store/index"
    import { useUserStore } from "@/store/user";
    const userStore = useUserStore(pinia)

    const router = useRouter()
    const visible = ref(0)
    const searchForm = ref({
        menu_name: ''
    })

    const menuList = ref([])

    const handleAdd = () => {
        router.push({
            path: '/menu/menu-model'
        })
    }

    const handleDelete = (index, row) => {
        const id = row.id
        deleteMenu(id).then(res => {
            if (res.code === 200) {
                getTreeMenuList()
                ElMessage.success('Delete success')
                // 重新调用store中的方法
                setTimeout(() => {
                    userStore.setRoutes()
                }, 1000)
            }
        })
    }

    const getTreeMenuList = () => {
        treeMenu().then(res => {
            menuList.value = res.data
        })
    }

    const handleEdit = (index, row) =>{
        router.push(`/menu/menu-model?id=${row.id}`)
    }

    onMounted(() => {
        getTreeMenuList()
    })
</script>
<style scoped>
    :deep(.el-table__inner-wrapper:before) {
        height: 0;
    }

    .header-content {
        padding: 15px 0px;
    }
</style>