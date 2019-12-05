const moment = require('../utils/moment.js')
const Sun = require('./sun.js')
const Common = require('../config/COMMON.js')
const Enum_System_Config = require('../config/page/ENUM_SYSTEM_CONFIG.js')

module.exports = {
    buildUri: function (uriStr, params) {
        for (var i = 0; i < params.length; i++) {
            uriStr = uriStr.replace("{" + i + "}", params[i]);
        }
        return uriStr;
    },

    dayNightTeller: function () {
        let sunRiseTime = moment(Sun.getSunrise(Common.BEIJING_LATITUDE, Common.BEIJING_LONGITUDE));
        let sunSetTime = moment(Sun.getSunset(Common.BEIJING_LATITUDE, Common.BEIJING_LONGITUDE));
        let now = moment();
        if (now.isAfter(sunSetTime) && now.isBefore(sunRiseTime)) {
            //日落之后，日出之前
            return Enum_System_Config.CONFIG_DAY_NIGHT_MODEL.NIGHT;
        }
        return Enum_System_Config.CONFIG_DAY_NIGHT_MODEL.DAY;
    },

    buildString: function (str, target) {
        for (var i = 0; i < target.length; i++) {
            str = str.replace("{" + i + "}", target[i]);
        }
        return str;
    }
}
