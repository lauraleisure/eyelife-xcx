// components/app-nav/app-nav.js
const App = getApp();
const Q = require('../../utils/q.js');
const _ = require('../../utils/lodash.js');
const Helper = require('./helper.js');
const GlobalDefault = require('../../config/page/GLOBAL_DEFAULT.js');
const System = require('../../modules/system.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      showNav: {//是否显示当前自定义标题栏
          type: Boolean,
          value: true
      },
      showBack: {//是否显示“返回”图标
          type: Boolean,
          value: true
      },
      showHome: {//是否显示home图标
          type: Boolean,
          value: true
      },
      pageKey:{//页面标识
          type:String,
          value:''
      },
      backUrl:{//返回的页面标识
          type:String,
          value:''
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      navHeight:GlobalDefault.navHeight,
      navTop: GlobalDefault.navTop,
      windowHeight:GlobalDefault.windowHeight,
      capsuleHeight: GlobalDefault.capsuleHeight,
      theme:{}
  },
  attached: function () {
        this.onLoad();
  },
  /**
   * 组件的方法列表
   */
  methods: {
      //加载
      onLoad:function(){
          var that = this;
          return Q.all([
              Q.fcall(function () {
                  if (that.data.showNav && that.data.pageKey) {
                      return Helper.getTitle(that.data.pageKey)
                  }
                  return '';
              })
          ]).spread(function (title) {
              that.setData({
                  navHeight: App.globalData.navHeight,
                  navTop: App.globalData.navTop,
                  windowHeight: App.globalData.windowHeight,
                  capsuleHeight: App.globalData.capsuleHeight,
                  pageTitle: title
              })
          }).catch(function(err){
              System.wxToast.show({
                  title: err.message,
                  icon: 'none',
                  duration: 2000
              })
          })

      },
      //回退
      onBackTap: function () {
          if(this.data.backUrl){
              return Helper.goBack(this.data.backUrl);
          }
          return Helper.goBackByKey(this.data.pageKey);
      },
      //回主页
      onHomeTap: function () {
          // System.goto('/pages/mapview/mapview');
          System.goto('/pages/home/home');
      },

      updateText:function(txt){
          this.setData({
              pageTitle:txt
          })
      }
  }
})
