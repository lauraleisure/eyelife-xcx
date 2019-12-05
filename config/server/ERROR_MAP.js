let output = {
    API: {
        404: {
            EN: 'Service not found',
            CN: '未找到服务',
            code: 404
        },
        401: {
            EN: 'Unauthorized',
            CN: '未授权访问服务',
            code: 401
        },
        503: {
            EN: 'Service is restarting, please try later',
            CN: '服务重启中，请稍后重试',
            code: 503
        },
        500: {
            EN: 'Service Error, we\'ll have it fixed soon',
            CN: '服务出错，我们将尽快处理',
            code: 500
        },
        COMMON: {
            EN: 'Unexpected Error, we\'ll have it fixed soon',
            CN: '未知错误，我们将尽快处理',
            code: -1
        }
    },
    WX: {
        NOT_AUTHORIZED_USER: {
            EN: 'Please authorize WeChat to get your basic user profile',
            CN: '请授权微信获取用户基本信息',
            code: 9201
        },
        NOT_AUTHORIZED_LBS: {
            EN: 'Please authorize WeChat to get your location',
            CN: '请授权获取用户位置信息',
            code: 9202
        },
        NOT_AUTHORIZED_RECORD: {
            EN: 'Please authorize WeChat to record voice',
            CN: '请授权微信使用录音功能',
            code: 9202
        },
        GET_SETTINGS_ERR: {
            EN: 'Error encountered when getting settings info',
            CN: '获取配置信息时出错',
            code: 9203
        },
        REQUEST_FAILUER: {
            EN: 'Reqeust data failed',
            CN: '请求数据时被拒绝',
            code: 9204
        }
    },
    SYS: {
        NO_TOKEN: {
            EN: '',
            CN: '用户未登陆',
            code: 9301
        },
        INVALID_TOKEN: {
            EN: 'Invalid token',
            CN: '无效Token',
            code: 9302
        },
        USER_NOT_FOUND: {
            EN: 'User not found',
            CN: '未找到用户',
            code: 9304
        },
        CONFIG_NOT_CHANGED: {
            EN: "Nothing has changed",
            CN: "未更新任何配置",
            code: 9304
        }
    }
}

module.exports = output;
