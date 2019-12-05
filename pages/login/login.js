// pages/login/login.js
const System = require('../../modules/system.js');
const SUCCESS_MAP = require('../../config/page/SUCCESS_MAP.js');
const LOGIN_TEXT = SUCCESS_MAP.LOGIN;
import Longin from './helper'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    showModal:false,
    wayOfTravel: [
      { name: '旅行团', value: 'tourGroup' },
      { name: '个人游', value: 'personalTour'}
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    System.wxLoading.show({
      title: LOGIN_TEXT.LOADING,
    });
    that.loadData();
    //检测用户是否登录且填写过旅行方式等信息 如果登录并填写了直接跳转至首页
    return Longin.getUserInitInfo().then(function (userTravelInfo) {   
      let isLogin = !!userTravelInfo;
      wx.hideLoading()
      if (isLogin) {       
        // System.goto('/pages/home/home');
          wx.switchTab({
              url:'/pages/home/home'
          });
        that.setData({        
          isLogin: isLogin
        });
      }else{
        that.setData({
          loading: false,
          isLogin: isLogin
        });
      }
    
    }).catch(function(err){
      console.error(err);
    })
   
  },
  loadData: function () {
    this.setData({
      navTop: app.globalData.navTop,
      capsuleHeight: app.globalData.capsuleHeight,
    });
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

  tapLogin: function (evt) {
    //授权微信访问
    System.wxLoading.show({
      title: LOGIN_TEXT.LANDING,
    });
    let that = this;
    // 用户授权
    if (evt.detail.userInfo) {
      return System.autoLoadWxUserInfo().then(function (userInfo) {
        if (userInfo) {
          that.setData({
            userInfo: evt.detail.userInfo,
            isLogin: true          
          })
          System.goto('/pages/welcome/welcome');
          wx.hideLoading()
        }
      })
    }
    //用户拒绝授权
    return System.wxToast.show({
      title: LOGIN_TEXT.NEED_PERMISSION,
      icon: 'none',
    });

  },

  radioChange: function (e) {
    //用户选择的旅行方式  tourGroup旅行团  personalTour个人游
    this.setData({
      userWayOfTravel: e.detail.value,
    })
  },

  userAge: function (e){
    //录入用户的年龄
    this.setData({
      userAge: e.detail.value,
    })
  },

  submitWayOfTravel: function (){
    //校验用户年龄和旅行方式是否填写
    let that = this;
    if (that.data.userWayOfTravel&&that.data.userAge) {
      let userTravelInfo = {
        userWayOfTravel:that.data.userWayOfTravel,
        userAge:that.data.userAge
      };
      Longin.cacheUserTravelInfo(userTravelInfo).then(()=>{
        //信息缓存成功后关闭弹窗并跳转到首页
        that.closeModalDlg();
        System.goto('/pages/home/home');
      });
    }else {
      System.wxToast.show({
        title: LOGIN_TEXT.NEED_COMPLETE_USERINFO,
        icon: 'none',
      });
    }

  }, 
  goHome:function(e){
    System.goto('/pages/home/home');
  }
})