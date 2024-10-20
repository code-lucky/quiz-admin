<template>
    <div class="app-container">
        <h2>Pricing List</h2>
        <div class="header-content">
            <el-button type="primary" @click="handleAdd" :icon="Plus">
                New Pricing
            </el-button>
        </div>

        <custom-table :data="dataList" :columns="tableColumns" @edit="handleEdit" @delete="handleDelete" />
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import { getPricingList, deletePricing } from '@/api/pricing';
    import CustomTable from '@/components/custom-table.vue';
    import { useRouter } from 'vue-router';
    import { ElMessage } from 'element-plus'
    const router = useRouter();
    const dataList = ref([]);

    const tableColumns = ref([
        { prop: 'id', label: 'ID', width: '80' },
        { prop: 'name', label: 'Name' },
        { prop: 'original_price', label: 'Original Price' },
        { prop: 'price', label: 'Price' },
        { prop: 'discount', label: 'Discount' },
        { prop: 'create_time', label: 'Create Time' },
        { prop: 'actions', label: 'Actions', type: 'action' },
    ]);

    const pageData = ref({
        page: 1,
        pageSize: 10,
        total: 0,
    });

    const handleAdd = () => {
        router.push({ path: '/pricing/pricing-model' });
    };

    const handleEdit = (idnex, data) => {
        router.push(`/pricing/pricing-model?id=${data.id}`)
    }

    const handleDelete = (index, data) => {
        const id = data.id

        if (id) {
            deletePricing(id).then(res => {
                getList()
                ElMessage.success('Delete success')
            })
        }
    }

    const getList = () => {
        getPricingList().then((res) => {
            if (res.code === 200) {
                dataList.value = res.data;
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