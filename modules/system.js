const _ = require('../utils/lodash.js')
const Q = require('../utils/q.js')
const moment = require('../utils/moment.js')
const Tools = require('../utils/tools.js')
const wxTools = require('../utils/wxTools.js')
const Rst = require('../utils/rst.js')
const Req = require('./bizReq.js')

const STORAGE_KEY = require('../config/page/STORAGE_KEYS.js')
const Enum_System_Config = require('../config/page/ENUM_SYSTEM_CONFIG.js');
const Themes = require('../config/page/THEME_CONFIG.js');

const API_URI = require('../config/server/API_URI.js')
const SYSTEM = require('../config/server/SYSTEM.js');
const Error_MAP = require('../config/server/ERROR_MAP.js');

const Sys_Errors = Error_MAP.SYS;
const Wx_Errors = Error_MAP.WX;

// const LanguageHelper = require('./lanHelper.js');



const compareInfoBetweenWxUsers = (existingInfo, newInfo) => {
  if (!existingInfo) {
    //短路，没有缓存数据，直接返回true
    return true;
  }
  let changed = false;
  for (var i in newInfo) {
    if (existingInfo[i] !== newInfo[i]) {
      changed = true;
      break;
    }
  }
  return changed;
}
const catchHandler = (err) => {
  if (err.isRst) {
    throw err;
  }
  throw Rst.from(err);
}

module.exports = {
  //获取settings，兼容已存在的res不必每次都去请求微信接口
  getGrantedPermissions(res) {
    return Q.fcall(function () {
      if (!res) {
        return wxTools.getSetting()
      }
      return res;
    });
  },

  //根据res以及授权key判断特定状态
  checkAuthSettingByScopeKey(res, key) {
    return this.getGrantedPermissions(res).then(function (res) {
      if (res.authSetting[key]) {
        return true;
      }
      return false;
    })
  },

  checkUserInfoPermission(res) {
    return this.checkAuthSettingByScopeKey(res, 'scope.userInfo');
  },

  checkLBSPermissions(res) {
    return this.checkAuthSettingByScopeKey(res, 'scope.userLocation');
  },

  checkRecordPermission(res) {
    return this.checkAuthSettingByScopeKey(res, 'scope.record');
  },

  cacheWxUserInfo: function (wxUserInfo) {
    //保存wx用户数据，并返回之
    // return Q(wxUserInfo);
    return wxTools.setStorage(STORAGE_KEY.WX_USER_INFO, wxUserInfo).then(function () {
      return wxUserInfo;
    });
  },

  loadCachedWxUserInfo: function () {
    //获取缓存的UserInfo
    return wxTools.getStorage(STORAGE_KEY.WX_USER_INFO).then(function (wxUserInfo) {
      return wxUserInfo;
    }).catch(function (err) {
      return null;
    });
  },

  loadCachedUserInfo: function () {
    //获取缓存中的system用户信息
    return wxTools.getStorage(STORAGE_KEY.SYSTEM_USER).then(function (userInfo) {
      return userInfo;
    }).catch(function (err) {
      return null;
    });
  },

  getUserInfo: function(jumpValidation) {
    //@jumpValidation，跳过权限校验检测，直接返回true
    var that = this;
    return Q.fcall(function(){
      if (jumpValidation){
        return true;
      }
      return that.checkUserInfoPermission();
    }).then(function (isGranted) {
      if (isGranted) {
        return wxTools.getUserInfo().then(function (wxUserInfoObj) {
          return wxUserInfoObj.userInfo;
        });
      }
      throw Rst.from(Wx_Errors.NOT_AUTHORIZED_USER);
    });
  },

  autoLoadWxUserInfo: function (jumpValidation) {
    //@jumpValidation,跳过基础校验
    //自动获取微信用户信息
    //如无用户信息，则取获取并缓存之
    let that = this;
    return this.loadCachedWxUserInfo().then(function (userInfo) {
      if (userInfo) {
        return userInfo;
      };
      return that.getUserInfo(jumpValidation).then(function (wxUserInfo) {
        return that.cacheWxUserInfo(wxUserInfo);
      })
    });
  },

  autoCheckAndRedirect: function () {
    //查询微信用户是否已登录，如未登陆，跳转到登录页
    return this.loadCachedWxUserInfo().then(function (userInfo) {
      if (!userInfo) {
        wx.navigateTo({
          url: SYSTEM.LOGIN_PAGE
        })
        return;
      }
    });
  },
  getAuthInfo: function () {
    //获取创建token需要的信息
    return this.autoLoadWxUserInfo().then(function (wxUserInfo) {
      return wxTools.getSystemInfo().then(function (systemInfo) {
        delete systemInfo.errMsg;
        let postData = {
          systemData: {
            deviceID: [systemInfo.brand, systemInfo.model].join("_"),
            deviceType: "miniprogram",
            clientVersion: "1.0",
            extra_data: systemInfo
          },
          userData: wxUserInfo
        };
        return postData;
      });
    })
  },

  loginSystem: function () {
    //系统登陆,通过code请求后台服务器接口，返回系统user的token及openId
    let that = this;
    return this.getAuthInfo().then(function (postData) {
      return wxTools.login().then(function (info) {
        let _uri = Tools.buildUri(API_URI.Sys.URI_WX_CODE_LOGIN, [SYSTEM.APP_KEY, info.code]);
        let _request = new Req();
        return _request.jwt_post_api(_uri, postData);
      }).then(function (d) {
        //开始缓存数据，尤其是token信息
        return wxTools.setStorage(STORAGE_KEY.SYSTEM_USER, d.data).then(function () {
          return d.data;
        });
      });
    }).catch(catchHandler);
  },

  updateUser: function () {
    //重新获取userInfo，将其与缓存中的wxUserInfo比较
    //如二者不一致，则将新信息post到服务器端更新数据
    //服务器端更新后，小程序端缓存新的wxUserInfo
    let that = this;
    return Q.all([
      this.loadCachedWxUserInfo(),
      this.getUserInfo()
    ]).spread(function (cachedUserInfo, curUserInfo) {
      let flag = compareInfoBetweenWxUsers(cachedUserInfo, curUserInfo);
      if (flag) {
        //已发生变化
        let _request = new Req();
        return _request.auth_post_api(API_URI.Sys.URI_UPDATE_USER_INFO, curUserInfo).then(function () {
          return that.cacheWxUserInfo(curUserInfo);
        });
      }
    }).catch(catchHandler);
  },

  getLocation: function (myAmapKey) {
      var _myAmapKey = myAmapKey;
    return wxTools.getLocation().then(function(res){
        const latitude = res.latitude
        const longitude = res.longitude
        const origin = longitude + ',' + latitude;//当前位置
        var amapUrl = Tools.buildUri(API_URI.AMP.COVERTGPS, [_myAmapKey,origin]);
        let _request = new Req();
        return _request.third_get_api(amapUrl);
    })
  },

  getBaseLocation:function(){
    return wxTools.getLocation();
  },

  wxToast: {
    show: function (info) {
      return wxTools.showToast(info);
    },
    hide: function (info) {
      return wxTools.hideToast(info);
    }
  },

  wxLoading: {
    show: function (info) { return wxTools.showLoading(info); },
    hide: function (info) { return wxTools.hideLoading(info); }
  },

  wxModal: {
    show: function (info) { return wxTools.showModal(info); }
  },

  wxActionSheet: {
    show: function (info) { return wxTools.showActionSheet(info); }
  },

    goto: function (url) {
        //页面跳转
        return wxTools.redirectTo(url);
    },

    openTo: function (url) {
        //页面新开
        return wxTools.navigateTo(url);
    },

  backward:function(steps){
    //页面回退
    return wxTools.navigateBack(steps);
  },
    /*获得用户配置信息*/
 getUserConfig: function () {
        //获取系统配置（日夜景，护眼模式等等）
        return Q.fcall(function () {
            //第一步，获取用户配置项
            return wxTools.getStorage(STORAGE_KEY.USER_CONFIG).then(function (cached) {
                return cached;
            }).catch(function (err) {
                return {};
            });
        }).then(function (cached) {
            //返回融合后的全部配置
            return _.extend({}, SYSTEM.GLOBAL_ENV_DEFAULT, cached);
        })
    },

    getTheme: function () {
        //根据用户config返回语言及日夜景信息
        return this.getUserConfig().then(function (userConfig) {
            var _model = userConfig.CONFIG_DAY_NIGHT_MODEL;
            if (_model === Enum_System_Config.CONFIG_DAY_NIGHT_MODEL.AUTO.val) {
                //若用户日夜配置为auto，则需计算日落时间，在此之前为日间主题，反之为夜间主题
                _model = Tools.dayNightTeller().val;
            }
            return {
                lan: _language,
                theme: _model,
                sound: userConfig.CONFIG_SOUND
            }
        });
    },
/*  generateURLWithConfigInfo: function (url) {
    return this.getLanguageAndTheme().then(function (options) {
      var query = [];
      for (var i in options) {
        query.push(i + "=" + options[i].toLowerCase());
      }

      if (query.length === 0) {
        return url;
      }

      if (url.indexOf("?") < 0) {
        query[0] = "?" + query[0];
      } else {
        query[0] = "&" + query[0];
      }
      return url + query.join("&");
    })
  },*/

 /* getTheme: function (config) {
    var that = this;
    return Q.fcall(function () {
      if (config) {
        return config;
      }
      return that.getLanguageAndTheme()
    }).then(function (config) {
      var theme = config.theme;
      if (!Themes[theme]) {
        return {};
      }
      return Themes[theme];
    });
  },*/
/*  getThemeAndLanguageForChat: function (config) {
    var that = this;
    return Q.fcall(function () {
      if (config) {
        return config;
      }
      return that.getLanguageAndTheme()
    }).then(function (config) {
      var theme = config.theme;
      // var theme = 'NIGHT';
      return _.extend({ theme: Themes[theme] || {} }, { lan: config.lan || 'CN' })
    });
  },*/
    autoGetWxUserInfo: function () {
        var that = this;
        //1. 查看用户是否授权访问个人信息
        return this.checkUserInfoPermission().then(function (flag) {
            if (!flag) {
                //未授权
                return null;
            }
            //已授权,尝试直接获取缓存的wx_user_info
            return that.loadCachedWxUserInfo().then(function (userInfo) {
                if (!userInfo) {
                    //未拿到缓存userInfo，登陆系统并缓存userInfo
                    return that.autoLoadWxUserInfo();
                }
                return userInfo;
            });
        });
    },
  autoGetUserToken: function () {
    var that = this;
    //1. 查看用户是否授权访问个人信息
    return this.checkUserInfoPermission().then(function (flag) {
      if (!flag) {
        //未授权
        return null;
      }
      //已授权,尝试直接获取缓存的token
      return that.loadCachedUserInfo().then(function (token) {
        if (!token) {
          //未拿到缓存token，登陆系统并缓存token
          return that.loginSystem();
        }
        return token;
      });
    });
  },

  retryTokenErrorHandler:function(err){
    if(err.code===401){
      //token过期
      return this.autoGetUserToken();
    }
    throw err;
  },

  setNavigationBar: function (fontColor, backgroundColor) {
       return wxTools.setNavigationBar(fontColor, backgroundColor)
  },
}
