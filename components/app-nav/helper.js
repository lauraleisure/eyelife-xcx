const Q = require('../../utils/q.js');
const PageConfig = require('../../config/page/PAGE_CONFIG.js');
const System = require('../../modules/system.js');

module.exports = {
  getTitle: function (pageKey){
    if (!pageKey || !PageConfig[pageKey] || !PageConfig[pageKey].title){
      //若pageKey不存在或配置中没有找到当前pageKey的匹配值
      //返回空字符串
      return Q('');
    }
    return PageConfig[pageKey].title;
  },

  getBackUrlByKey:function(curPageKey){
    //根据key获取返回url
    var that = this;
    return Q.fcall(function(){
      if (!curPageKey || !PageConfig[curPageKey] || !PageConfig[curPageKey].backKey) {
        //若pageKey不存在或配置中没有找到当前pageKey的匹配值，或有匹配值但未配置返回key
        //返回空字符串
        return ''
      }

      var cfg = PageConfig[curPageKey];
      var output = {
        isNavigationBack: !!cfg.isNavigationBack,
        backUrl:''
      }
      var backKey = cfg.backKey;
      if (PageConfig[backKey]){
        //正确读取到配置信息，返回
        output.backUrl= PageConfig[backKey].url;
      }
      return output;
    });
  },

  goBack: function (url) {
    if (url) {
      // return System.goto(url);
        return System.backward({});
    }
    //空字符串，navigateBack
    return Q("");
  },

  goBackWithInfo:function(info){
    if(info.isNavigationBack){
      //如果强制退回上一页
      if(getCurrentPages().length>0){
        //在可以回退的时候回退
        return System.backward(1);
      }
    }
    //不可退回时，尝试直接跳转
    return this.goBack(info.backUrl);
  },
  goBackByKey:function(curPageKey){
    var that = this;
    return this.getBackUrlByKey(curPageKey).then(function(info){
      return that.goBackWithInfo(info);
    })
  }
}
