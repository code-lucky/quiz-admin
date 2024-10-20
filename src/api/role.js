import requestMethod from '@/utils/request'

// 获取角色列表
export function roleList() {
    return requestMethod.get('/role/list')
}

// 新增角色
export function create(data) {
    return requestMethod.post('/role/create', data)
}

// 更新角色
export function update(id, data) {
    return requestMethod.post(`/role/update/${id}`, data)
}

// 获取角色信息
export function detail(id) {
    return requestMethod.get(`/role/detail/${id}`)
}