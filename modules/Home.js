const System = require('../modules/system.js');
const wxTools = require('../utils/wxTools.js');
const STORAGE_KEY = require('../config/page/STORAGE_KEYS.js');
const Tools = require('../utils/tools.js');
const API_URI = require('../config/server/API_URI.js')
const Req = require('./bizReq.js')


class HOME {
    // 获取设备相关的信息
    static getSystemInfo() {
        return wxTools.getSystemInfo().then(function (res) {
            return res;
        });
    }

    static getArticleInfo() {
        let _uri = Tools.buildUri(API_URI.Home.URI_HOME_ARTICLE, []);
        let _request = new Req();
        return _request.jwt_get_api(_uri).then(function (d) {
            return d
        }).catch(function (err) {
            console.error(err)
        });

    }



}

module.exports = HOME;
