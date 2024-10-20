import requestMethod from '@/utils/request'

//獲取列表
export function menuList() {
    return requestMethod.get('/menu/list')
}

// 获取树形菜单
export function treeMenu() {
    return requestMethod.get('/menu/tree')
}

// 添加菜单
export function createMenu(data) {
    return requestMethod.post('/menu/create', data)
}

// 删除菜单
export function deleteMenu(id) {
    return requestMethod.post(`/menu/delete/${id}`)
}

// 获取菜单信息
export function detail(id) {
    return requestMethod.get(`/menu/detail/${id}`)
}

// 更新菜单信息
export function updateMenu(data) {
    return requestMethod.post(`/menu/update`, data)
}