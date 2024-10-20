<template>
    <div class="app-container">
        <h2>User List</h2>
        <!-- <div class="header-content">
            <el-button type="primary" @click="handleAdd" :icon="Plus">
                New User
            </el-button>
        </div> -->

        <el-table :data="list">
            <el-table-column label="Id" prop="id" />
            <el-table-column label="Name" prop="user_name" />
            <el-table-column label="Role name" prop="role_name" />
            <el-table-column label="Create time" prop="create_time" />
            <el-table-column label="Handle" prop="update_time" width="280">
                <template #default="scope">
                    <el-button @click="handleDialog(scope.row)">
                        Auth
                    </el-button>
                    <!-- <el-button @click="handleEdit(scope.$index, scope.row)">
                        Edit
                    </el-button> -->
                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogVisible" title="Auth" width="50%">
            <el-form :model="roleForm" ref="roleRef" size="large" :rules="roleRules">
                <el-form-item label="Role" prop="role_id">
                    <el-select v-model="roleForm.role_id" placeholder="Select">
                        <el-option v-for="item in roles" :key="item.role_name" :label="item.role_name" :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="userAuth">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import { ElMessage } from 'element-plus'
    import { Plus, Search } from '@element-plus/icons-vue'
    import { userList, auth } from "@/user"
    import { roleList } from "@/role"
    import router from '@/router'

    const list = ref([])
    const roles = ref([])
    const dialogVisible = ref(false)
    const pageData = ref({
        page: 1,
        pageSize: 10,
        total: 0
    })

    const roleForm = ref({
        id: '',
        role_id: ''
    })

    const roleRules = ref({
        role_id: [
            { required: true, message: 'Please select role', trigger: 'blur' }
        ]
    })

    const handleAdd = () => {
        router.push('/role/role-model')
    }

    const handleEdit = (index, row) => {
        router.push(`/role/role-model?id=${row.id}`)
    }

    const getList = () => {
        userList(pageData.value).then(res => {
            list.value = res.data.list
        })
    }

    const handleDialog = (row) => {
        dialogVisible.value = true
        if (row.id) {
            roleForm.value.id = row.id
            roleForm.value.role_id = row.role_id
        }else{
            dialogVisible.value = false
        }
    }

    const userAuth = () => {
        auth(roleForm.value).then(res => {
            console.log(res, 'res....')
            if (res.code == 200) {
                ElMessage.success('Auth success')
                dialogVisible.value = false
                getList()
            }
        })
    }

    const getRoleList = () => {
        roleList().then(res => {
            roles.value = res.data
        })
    }
    onMounted(() => {
        getList()
        getRoleList()
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