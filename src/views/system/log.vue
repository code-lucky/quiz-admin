<template>
    <div class="app-container">
        <h2>System Log List</h2>

        <el-table :data="list">
            <el-table-column label="Id" prop="id" />
            <el-table-column label="Api address" prop="api_address" />
            <el-table-column label="Request param" prop="request_param">
                <template #default="{ row }">
                    <el-link type="primary" v-if="row.request_param" @click="preview(row.request_param)">
                        {{ row.request_param.length > 20 ? row.request_param.substring(0, 20) + '...' :
                        row.request_param}}
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column label="Request method" prop="request_method" />
            <el-table-column label="Response param" prop="response_param">
                <template #default="{ row }">
                    <el-link type="primary" v-if="row.response_param" @click="preview(row.response_param)">
                        {{ row.response_param.length > 20 ? row.response_param.substring(0, 20) + '...' :
                        row.response_param}}
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column label="Request ip" prop="request_ip" />
            <el-table-column label="Create time" prop="create_time" />
        </el-table>

        <el-pagination background layout="total, sizes,prev, pager, next" v-model:current-page="pageData.page"
            :page-size="pageData.pageSize" :total="pageData.total" class="page-content"
            @current-change="handlePageChange" @size-change="handleSizeChange" :page-sizes="[10,15,20,30,50,100]" />

        <el-dialog v-model="dialogVisible" title="Params" width="70%">
            <vue-json-pretty :data="previewData" class="preview-content" />
        </el-dialog>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import { ElMessage } from 'element-plus'
    import { Plus, Search } from '@element-plus/icons-vue'
    import { logList } from "@/api/systemLog"
    import router from '@/router'
    import VueJsonPretty from 'vue-json-pretty'
    import 'vue-json-pretty/lib/styles.css'

    const list = ref([])
    const pageData = ref({
        page: 1,
        pageSize: 15,
        total: 0
    })

    const dialogVisible = ref(false)
    const previewData = ref({})

    const handlePageChange = (newPage) => {
        pageData.value.page = newPage
        getList()
    }

    const handleSizeChange = (newPageSize) => {
        pageData.value.pageSize = newPageSize
        getList()
    }

    const getList = async () => {
        const { data } = await logList(pageData.value)
        list.value = data.list
        pageData.value.total = data.total
    }

    const preview = (data) => {
        previewData.value = JSON.parse(data)
        dialogVisible.value = true
    }

    onMounted(() => {
        getList()
    })
</script>
<style scoped>
    :deep(.el-table__inner-wrapper:before) {
        height: 0;
    }

    .header-content {
        padding: 15px 0px;
    }

    .preview-content {
        height: 60vh;
        overflow: auto;
    }
</style>