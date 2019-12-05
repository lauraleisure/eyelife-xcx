import LOGIN from '../../modules/Login'
const System = require('../../modules/system.js');

class Welcome {
    // 存储用户年龄以及旅游数据到缓存中
    static cacheUserTravelInfo(data) {
       return LOGIN.cacheUserTravelInfo(data)
    }
}

module.exports = Welcome;
