// pages/mine/mine.js
const App = getApp();
const GlobalDefault = require('../../config/page/GLOBAL_DEFAULT.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'小星星',
    signature:'阳光总在风雨后，加油向上吧！',
    navTop: GlobalDefault.navTop,
    capsuleHeight: GlobalDefault.capsuleHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.loadData();
  },
  loadData:function(){
    this.setData({
      navTop: App.globalData.navTop,
      capsuleHeight: App.globalData.capsuleHeight,   
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

  }
  ,
  toUserInfo: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log("toDetail", id);
    wx.navigateTo({
      url: '/pages/mine/userinfo/userInfo?id=' + id,
    })
  },
  toLearnRecord: function (e) {//学习记录
    var id = e.currentTarget.dataset.id;
    console.log("toLearnRecord", id);
    wx.navigateTo({
      url: '/pages/mine/myrecord/myRecord?id=' + id,
    })
  },
  toExamRecord: function (e) {//考试记录
    var id = e.currentTarget.dataset.id;
    console.log("toDetail", id);
    wx.navigateTo({
      url: '/pages/mine/mytest/myTest?id=' + id,
    })
  }
})