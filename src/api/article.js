import requestMethod from '@/utils/request'

// Get Articles
export function getArticleList(params) {
    return requestMethod.get('/article/list', params)
}

// update Article
export function updateArticle(data) {
    return requestMethod.post('/article/update', data)
}

// create Article
export function createArticle(data) {
    return requestMethod.post('/article/create', data)
}

// delete Article
export function deleteArticle(id) {
    return requestMethod.post(`/article/delete/${id}`)
}

// get detail Article
export function getArticleDetail(id) {
    return requestMethod.get(`/article/detail/${id}`)
}