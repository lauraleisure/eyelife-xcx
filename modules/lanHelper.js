const Rst = require('../utils/rst.js');
const Samples = require('../config/page/ENUM_SYSTEM_CONFIG.js');

function Helper(config) {
    this.initCfg(config);
}

Helper.prototype.initCfg = function (config) {
    if (config) {
        this.config = config;
    }
}

Helper.prototype.getStr = function (obj) {
    if (!this.config) {
        throw Rst.create("config未初始化", 99000);
    }
    //根据配置信息拿语言信息，根据以下顺序返回
    //1. 指定语言内容， 2. 中文内容, 3. 英文内容 ，4. 空字符串
    return obj[this.config.lan] ||obj[this.config.CONFIG_LANGUAGE] || obj[Samples.CONFIG_LANGUAGE.CN.val] || obj[Samples.CONFIG_LANGUAGE.EN.val] || obj.message || '';
}

module.exports = Helper;
