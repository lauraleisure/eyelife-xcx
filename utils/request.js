/* 用于请求数据 */
const Q = require('./q.js')
const Rst = require('./rst.js')
const ErrorMap = require('../config/server/ERROR_MAP.js')

module.exports = {
    send: function (url, method, data, token, tokenPrifix) {
        let deferred = Q.defer();
        let params = {
            url: url,
            method: method,
            dataType: 'json',
            responseType: 'text',
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                deferred.resolve(res);
            },
            fail: err => {
                deferred.reject(err);
            }
        }

        if (data) {
            params.data = data;
        }

        if (token) {
            params.header.Authorization = tokenPrifix + token;
        }

        wx.request(params);
        return deferred.promise.then(function (res) {
            //微信的request最终会返回一个对象，无论请求成功与否，这里做基础适配
            /*
                 {
                   "data": {
                       "statusCode": 404,
                       "message": "Not Found",
                       "error": true,
                       "code": 404
                   },
                   "header": {
                       "X-Powered-By": "Express",
                       "Content-Type": "application/json; charset=utf-8",
                       "Content-Length": "64",
                       "ETag": "W/\"40-HqozK0tlrYQdLdwU89UBC0kF4Oo\"",
                       "Date": "Thu, 15 Aug 2019 06:41:45 GMT",
                       "Connection": "keep-alive"
                   },
                   "statusCode": 404,
                   "cookies": [],
                   "errMsg": "request:ok"
               }
            */
            //第一层容错，先处理微信封装这一层
            let _wxResponseData = res.data;
            let _httpResponseCode = res.statusCode;
            if (_httpResponseCode >= 400) {
                //error属性为true，需要处理错误
                //已知api错误
                if (ErrorMap.API[_httpResponseCode]) {
                    throw Rst.from(ErrorMap.API[_httpResponseCode]);
                }
                throw Rst.from(ErrorMap.API.COMMON);
            }

            //第二层容错，处理业务错误
            let _bizData = _wxResponseData.data;
            if (!_bizData) {
                //短路处理，如无data，说明后台未返回任何信息，直接返回null
                return null;
            }
            //此时bizData存在
            if (_bizData.error) {
                //{ "code": 200, "error": false, "message": "登陆成功", "statusCode": 200000, "data": "e8873030452040ce004be8710e6e26c038db70be" }
                //error=true,业务返回显示有错误
                let _statusCode = _bizData.statusCode;
                if (ErrorMap.SYS[_statusCode]) {
                    throw Rst.from(ErrorMap.SYS[_statusCode]);
                }
                throw Rst.from({CN: _bizData.message, statusCode: _statusCode});
            }
            return _wxResponseData;
        }).catch(function (err) {
            throw Rst.from(ErrorMap.WX.REQUEST_FAILUER);
        });
    },

    third_send:function (url, method, data, token) {
        let deferred = Q.defer();
        let params = {
            url: url,
            method: method,
            dataType: 'json',
            responseType: 'text',
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                deferred.resolve(res);
            },
            fail: err => {
                deferred.reject(err);
            }
        }

        if (data) {
            params.data = data;
        }

        if (token) {
            params.header.Authorization = token;
        }

        wx.request(params);
        return deferred.promise.then(function (res) {
            return res;
        }).catch(function (err) {
            throw Rst.from(ErrorMap.WX.REQUEST_FAILUER);
        });
    },

    Post: function (url, data, token, tokenPrifix) {
        return this.send(url, 'POST', data, token, tokenPrifix);
    },

    Get: function (url, token, tokenPrifix) {
        return this.send(url, 'GET', null, token, tokenPrifix);
    },

    Put: function (url, data, token, tokenPrifix) {
        return this.send(url, 'PUT', data, token, tokenPrifix);
    },

    third_Get: function (url, token) {
        return this.third_send(url, 'GET', null, token);
    },
}
