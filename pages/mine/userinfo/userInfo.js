// pages/mine/userinfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'小星星',
    username:'13811451722',
    phone: '13811451722',
    password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   updateUser:function(e){   
     var user = e.detail.value;
    console.log(e.detail.value);
     if (e.detail.value.password=='') {
       wx.showModal({
         title: '提示',
         content: '请输入新密码！',
       });
       return;
     }
     if (e.detail.value.confirmPassword == '') {
       wx.showModal({
         title: '提示',
         content: '请输入确认密码！',
       });
       return;
     }
     if (e.detail.value.password != e.detail.value.confirmPassword) {
       wx.showModal({
         title: '提示',
         content: '两次输入的密码不一致！',
       });
       return;
     }
      this.setData({
        username: e.detail.value.username,
        password: e.detail.value.password
      })
      wx.showModal({
        title: '提示',
        content: '修改成功！',
      });
   
  },
})