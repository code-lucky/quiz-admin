import requestMethod from '@/utils/request'

//獲取列表
export function login(params) {
    return requestMethod.post('/user/login', params)
}

// 用户注册
export function register(params) {
    return requestMethod.post('/user/register', params)
}

// 用户注册验证码
export function registerCode(email) {
    return requestMethod.get(`/user/registerCode?email=${email}`)
}