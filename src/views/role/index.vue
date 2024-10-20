<template>
    <div class="app-container">
        <h2>Role List</h2>
        <div class="header-content">
            <!-- <el-form>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="Role name">
                            <el-input v-model="searchForm.name" placeholder="Please enter the menu name" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleSearch" :icon="Search">
                                Search
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form> -->
            <el-button type="primary" @click="handleAdd" :icon="Plus">
                New Role
            </el-button>
        </div>

        <el-table :data="list">
            <el-table-column label="Id" prop="id" />
            <el-table-column label="Name" prop="name" />
            <el-table-column label="Update time" prop="updated_at" />
            <el-table-column label="Handle" prop="updated_at" width="240">
                <template #default="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)">
                        Edit
                    </el-button>
                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import { Plus, Search } from '@element-plus/icons-vue'
    import { roleList } from "@/api/role"
    import router from '@/router'

    const list = ref([])

    const handleAdd = () => {
        router.push('/role/role-model')
    }

    const handleEdit = (index, row) => {
        router.push(`/role/role-model?id=${row.id}`)
    }

    onMounted(() => {
        roleList().then(res => {
            console.log(res, 'res')
            list.value = res.data.list
        })
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