import requestMethod from '@/utils/request'

// Get Navigations
export function getNavigationList() {
    return requestMethod.get('/api/navigation/list')
}

// update Navigation
export function updateNavigation(data) {
    return requestMethod.post('/api/navigation/update', data)
}

// create Navigation
export function createNavigation(data) {
    return requestMethod.post('/api/navigation/create', data)
}

// delete Navigation
export function deleteNavigation(id) {
    return requestMethod.post(`/api/navigation/delete/${id}`)
}

// get detail Navigation
export function getNavigationDetail(id) {
    return requestMethod.get(`/api/navigation/detail/${id}`)
}