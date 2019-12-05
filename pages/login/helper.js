import LOGIN from '../../modules/Login'
const System = require('../../modules/system.js');

class Login {
    // 存储用户年龄以及旅游数据到缓存中
    static cacheUserTravelInfo(data) {
       return LOGIN.cacheUserTravelInfo(data)
    }


    static getUserInitInfo() {
        let that = this;
        return System.autoGetWxUserInfo().then(function (userInfo) {
            if (userInfo){
                //用户授权 继续获取用户的旅游信息并返回
                return LOGIN.loadCachedWxUserInfo()
            }else{
                //没有userInfo表示用户未授权
                return null;
            }


        })



    }



}

module.exports = Login;
