const System = require('../modules/system.js');
const wxTools = require('../utils/wxTools.js');
const STORAGE_KEY = require('../config/page/STORAGE_KEYS.js')

class LOGIN {
    // 缓存用户的年龄和旅行方式
    static cacheUserTravelInfo(data) {
        return wxTools.setStorage(STORAGE_KEY.USER_TRAVEL_INFO, data).then(function () {
            return data;
        });
    }

    static loadCachedWxUserInfo() {
        //获取缓存的user_travel_info 旅游信息
        return wxTools.getStorage(STORAGE_KEY.USER_TRAVEL_INFO).then(function (userTravelInfo) {
            return userTravelInfo;
        }).catch(function (err) {
            return null;
        });
    }


}

module.exports = LOGIN;
