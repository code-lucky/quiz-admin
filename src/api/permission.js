import requestMethod from '@/utils/request'

// 获取权限列表
export function permissionList() {
    return requestMethod.get('/permission/list')
}