import requestMethod from '@/utils/request'

// 获取日志列表
export function logList(params) {
    return requestMethod.get('/systemLog/list', params)
}
