<template>
    <div class="app-container">
        <h2>Article List</h2>
        <div class="header-content">
            <el-button type="primary" @click="handleAdd" :icon="Plus">
                New Article
            </el-button>
        </div>

        <custom-table v-if="dataList.length>0" :data="dataList" :columns="tableColumns" @edit="handleEdit"
            @delete="handleDelete" :isPagination="true" :pageData="pageData" @update:pageData="pageChange"/>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import { getArticleList, deleteArticle } from '@/api/article';
    import CustomTable from '@/components/custom-table.vue';
    import { useRouter } from 'vue-router';
    import { ElMessage } from 'element-plus'
    const router = useRouter();
    const dataList = ref([]);

    const tableColumns = ref([
        { prop: 'id', label: 'ID', width: '80' },
        { prop: 'title', label: 'Title' },
        { prop: 'name', label: 'Name' },
        { prop: 'create_time', label: 'Create Time' },
        { prop: 'actions', label: 'Actions', type: 'action' },
    ]);

    const pageData = ref({
        page: 1,
        pageSize: 10,
        total: 0,
    });

    const handleAdd = () => {
        router.push({ path: '/article/article-model' });
    };

    const handleEdit = (idnex, data) => {
        router.push(`/article/article-model?id=${data.id}`)
    }

    const handleDelete = (index, data) => {
        const id = data.id

        if (id) {
            deleteArticle(id).then(res => {
                getList()
                ElMessage.success('Delete success')
            })
        }
    }

    const pageChange = (val) => {
        console.log(val)
        pageData.value = val;
        getList();
    }

    const getList = () => {
        getArticleList(pageData.value).then((res) => {
            if (res.code === 200) {
                dataList.value = res.data.list;
                pageData.value.total = res.data.total;
            } else {
                dataList.value = [];
            }
        });
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
</style>