/*微信工具，主要用于将回调转为q*/
const Q = require('./q.js')
const _ = require('./lodash.js')
const moment = require('./moment.js')
const Rst = require('../utils/rst.js')
const Wx_Errors = require('../config/server/ERROR_MAP.js').WX
const WxFuncCall = (func, info) => {
    //通用方法，调用微信的页面交互方法：toast，modal，loading
    let deferred = Q.defer();
    let handlers = {};
    if (info.success) {
        handlers.success = info.success;
    }
    if (info.fail) {
        handlers.fail = info.fail;
    }

    func.call(wx, _.extend(info, {
        success: res => {
            handlers.successThis = this;
            deferred.resolve(res);
        },
        fail: err => {
            handlers.failThis = this;
            deferred.reject(err);
        }
    }));

    return deferred.promise.then(function (res) {
        if (handlers.success) {
            return handlers.success.call(handlers.successThis, res);
        }
        return res;
    }).catch(function (err) {
        if (handlers.fail) {
            return handlers.fail.call(handlers.failThis, err);
        }
        throw err;
    });
}

module.exports = {
    getAccountInfoSync: () => {
        //同步获取账号信息
        return wx.getAccountInfoSync();
    },

    login: () => {
        //登陆
        let deferred = Q.defer();
        wx.login({
            success: res => {
                deferred.resolve(res);
            },
            fail: err => {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    },

    checkSession: () => {
        //检查session是否过期
        let deferred = Q.defer();
        wx.checkSession({
            success: res => {
                deferred.resolve(res);
            },
            fail: err => {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    },


    getUserInfo: () => {
        //获取用户信息
        let deferred = Q.defer();
        wx.getUserInfo({
            success: res => {
                deferred.resolve(res);
            },
            fail: err => {
                deferred.reject(err);
            }
        });
        return deferred.promise.catch(function (err) {
            throw Rst.from(Wx_Errors.NOT_AUTHORIZED_USER);
        });
    },

    getLocation: () => {
        //获取位置
        let deferred = Q.defer();
        wx.getLocation({
            type: 'wgs84',
            success: res => {
                deferred.resolve(res);
            },
            fail: err => {
                deferred.reject(err);
            }
        });
        return deferred.promise.catch(function (err) {
            throw Rst.from(Wx_Errors.NOT_AUTHORIZED_LBS);
        });
    },

    getSetting: () => {
        //获取配置信息
        let deferred = Q.defer();
        wx.getSetting({
            success: (res) => {
                deferred.resolve(res);
            },
            fail: (err) => {
                deferred.reject(err);
            }
        });
        return deferred.promise.catch(function (err) {
            throw Rst.from(Wx_Errors.GET_SETTINGS_ERR);
        });
        ;
    },

    getStorage: (key) => {
        //取缓存数据
        let deferred = Q.defer();
        wx.getStorage({
            key: key,
            success: res => {
                deferred.resolve(res.data);
            },
            fail: err => {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    },

    setStorage: (key, val) => {
        //缓存数据
        let deferred = Q.defer();
        wx.setStorage({
            key: key,
            data: val,
            success: res => {
                deferred.resolve(res);
            },
            fail: err => {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    },

    removeStorage: (key) => {
        //清除指定key的缓存
        let deferred = Q.defer();
        wx.removeStorage({
            key: key,
            success: res => {
                deferred.resolve(res);
            },
            fail: err => {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    },

    clearStorage: () => {
        //清除所有缓存
        let deferred = Q.defer();
        wx.clearStorage({
            success: res => {
                deferred.resolve(res);
            },
            fail: err => {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    },

    getSystemInfo: () => {
        let deferred = Q.defer();
        wx.getSystemInfo({
            success: res => {
                deferred.resolve(res);
            },
            fail: err => {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    },

    showToast: (info) => {
        return WxFuncCall(wx.showToast, info);
    },
    showModal: (info) => {
        return WxFuncCall(wx.showModal, info);
    },
    showLoading: (info) => {
        return WxFuncCall(wx.showLoading, info);
    },
    showActionSheet: (info) => {
        return WxFuncCall(wx.showActionSheet, info);
    },
    hideToast: (info) => {
        return WxFuncCall(wx.hideToast, info);
    },
    hideLoading: (info) => {
        return WxFuncCall(wx.hideLoading, info);
    },

    navigateTo: (url, events) => {
        let deferred = Q.defer();
        let info = {
            url: url
        }
        if (events) {
            info.events = events;
        }

        info.success = res => {
            deferred.resolve(res);
        }

        info.fail = err => {
            deferred.reject(err);
        }

        wx.navigateTo(info);
        return deferred.promise;
    },

    redirectTo: (url) => {
        //关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
        let deferred = Q.defer();
        let info = {
            url: url
        }

        info.success = res => {
            deferred.resolve(res);
        }

        info.fail = err => {
            deferred.reject(err);
        }

        wx.redirectTo(info);
        return deferred.promise;
    },

    reLaunch: (url) => {
        let deferred = Q.defer();
        let info = {
            url: url
        }

        info.success = res => {
            deferred.resolve(res);
        }

        info.fail = err => {
            deferred.reject(err);
        }

        wx.reLaunch(info);
        return deferred.promise;
    },

    navigateBack: (delta) => {
      let deferred = Q.defer();
      let info = {
        delta: delta
      }

      info.success = res => {
        deferred.resolve(res);
      }

      info.fail = err => {
        deferred.reject(err);
      }

      wx.navigateBack(info);
      return deferred.promise;
    },

    authorize: (scope) => {
        let deferred = Q.defer();
        wx.authorize({
            scope: scope,
            success (res) {
                deferred.resolve(res);
            },
            fail(err){
                deferred.reject(err);
            }
        });
        return deferred.promise;
    },
    setNavigationBar: (fontColor, backgroundColor) => {
        let deferred = Q.defer();
        wx.setNavigationBarColor({
            frontColor: fontColor,
            backgroundColor: backgroundColor,
            success (res) {
                deferred.resolve(res);
            },
            fail(err){
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

}
