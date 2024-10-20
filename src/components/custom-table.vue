<template>
    <div>
        <el-table :data="data">
            <el-table-column v-for="(column, index) in columns" :key="index" :prop="column.prop" :label="column.label"
                :width="column.width">
                <template #default="scope" v-if="column.type == 'action'">
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

        <el-pagination v-if="isPagination" background layout="total, sizes, prev, pager, next" v-model:current-page="pageData.page"
            :page-size="pageData.pageSize" :total="pageData.total" class="page-content"
            @current-change="handlePageChange" @size-change="handleSizeChange" :page-sizes="[10,15,20,30,50,100]" />
    </div>
</template>

<script setup>
    import { defineProps, defineEmits, onMounted, ref } from 'vue';

    const props = defineProps({
        data: {
            type: Array,
            default: () => [],
        },
        columns: {
            type: Array,
            default: () => [],
        },
        pageData: {
            type: Object,
            default: () => ({
                page: 1,
                pageSize: 10,
                total: 0,
            }),
        },
        isPagination: {
            type: Boolean,
            default: false,
        },
    });

    const visible = ref(0);

    const emit = defineEmits(['update:pageData', 'edit', 'delete']);

    const handlePageChange = (newPage) => {
        emit('update:pageData', { ...props.pageData, page: newPage });
    };

    const handleSizeChange = (newSize) => {
        emit('update:pageData', { ...props.pageData, pageSize: newSize });
    };

    const handleEdit = (index, row) => {
        emit('edit', index, row);
    };

    const handleDelete = (index, row) => {
        emit('delete', index, row);
    };
    onMounted(() => {
        console.log('Custom Table Mounted');
        console.log('Data:', props.data);
    })
</script>