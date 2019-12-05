// pages/welcome/welcome.js
const app = getApp();
const GlobalDefault = require('../../config/page/GLOBAL_DEFAULT.js');
const System = require('../../modules/system.js');
const SUCCESS_MAP = require('../../config/page/SUCCESS_MAP.js');
const LOGIN_TEXT = SUCCESS_MAP.LOGIN;
import Welcome from './helper'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,    
    navTop: GlobalDefault.navTop,   
    capsuleHeight: GlobalDefault.capsuleHeight,   
    interestList:[
      {
        key:'travelNum',
        title:'共有几人出行？',
        options:[
          { key: 'onlyOne', desc: '独自一人'},
          { key: 'two', desc: '两人同行' },
          { key: 'family', desc: '家庭出游' },
          { key: 'tours', desc: '旅行团队' },
         
        ]
      },
      {
        key: 'travelWay',
        title: '期待的旅行方式？',
        options: [
          { key: 'foodTrail', desc: '美食之旅' },
          { key: 'culturalTour', desc: '文化之旅' },
          { key: 'charmXiAn', desc: '魅力西安' },
          { key: 'all', desc: '我都可以' },

        ]
      },
    ],
    userInterest:[
      { key:'travelNum',value:''},
      { key: 'travelWay', value: '' },
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },
  loadData: function () {
    this.setData({   
      navTop: app.globalData.navTop,     
      capsuleHeight: app.globalData.capsuleHeight,
    });
  },
  changeSelected:function(e){
    var key = e.currentTarget.dataset.key;
    var optkey = e.currentTarget.dataset.optkey;
    var list=this.data.interestList;
    var userInterest = this.data.userInterest;
    userInterest.forEach(function(interest){
      if(interest.key==key){
        interest.value = optkey;
      }
    })
    userInterest.push({ key: key, value: optkey});
      Welcome.cacheUserTravelInfo(userInterest)
    list.forEach(function(item){    
      if (item.key == key) {      
        item.options.forEach(function(optItem){
          if (optItem.key == optkey){
            optItem.selected = true;
          }else{
            optItem.selected=false;
          }
        })
      }
    })
    this.setData({ interestList: list, userInterest: userInterest});
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  startTravel:function(){  
    var canGoHome=true;
    var key="";
    var userInterest = this.data.userInterest;
    for (var i = 0; i < userInterest.length;i++){
      if (userInterest[i].value == "") {
        canGoHome = false;
        key = userInterest[i].key;
        break;
      }
    }   
    if (canGoHome){
      // System.goto('/pages/home/home');
        wx.switchTab({
            url:'/pages/home/home'
        });
    }else{
      wx.showToast({
        title: key == 'travelNum' ? '请选择：共有几人出行？' :'请选择：期待的旅行方式？',
        duration: 2000,
        icon: 'none'
      }); 
    }
    
  }
})