import requestMethod from '@/utils/request'

//获取用户信息
export function userInfo() {
    return requestMethod.get('/user/info')
}


// 修改用户
export function updateUser(data) {
    return requestMethod.post('/user/update', data)
}

// 修改密码
export function updatePassword(data) {
    return requestMethod.post('/user/updatePassword', data)
}

// 修改邮箱
export function updateEmail(data) {
    return requestMethod.post('/user/updateEmail', data)
}

// 修改邮箱发送验证码
export function updateEmailSendCode(email) {
    return requestMethod.get(`/user/updateEmailSendCode?email=${email}`)
}

// 重置密码验证码
export function resetPasswordCode(email) {
    return requestMethod.get(`/user/resetPasswordCode?email=${email}`)
}


// 重置密码
export function resetPassword(data) {
    return requestMethod.post(`/user/resetPassword?email=${data.email}&captcha=${data.captcha}`)
}

// 获取用户列表
export function userList(params) {
    return requestMethod.get('/user/userList', params)
}

// 用户授权
export function auth(data) {
    return requestMethod.post(`/user/auth/${data.id}?role_id=${data.role_id}`)
}