// pages/mine/myrecord/myRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchName:'',
    courseList: [{
      _id: '001', cover_image: 'https://res.51huanche.com/bjaid/knowledge/thumb01.png', thumbnail: 'https://res.51huanche.com/bjaid/knowledge/thumb01.png',
      courseName: '国家自然灾害救助应急预案',
      courseBrief: '本课程以文档的形式呈现',
      courseIntroduce: '市中医局，市医管局，各区卫生计生委，各相关公共卫生机构，各三级医院：\n' +
        '为做好各类突发事件紧急医学救援工作，提高卫生应急反应能力和急救水平，我委组织编制了《北京市卫生健康委员会突发事件紧急医学救援应急预案》，现印发给你们，请遵照执行。'
    },
      {
        _id: '002', cover_image: 'https://res.51huanche.com/bjaid/knowledge/thumb02.png', thumbnail: 'https://res.51huanche.com/bjaid/knowledge/thumb02.png',
        courseName: '急救VR手册',
        courseBrief: '本课程以文档的形式呈现',
        courseIntroduce: '建立健全应对突发重大自然灾害救助体系和运行机制，规范应急救助行为，提高应急救助能力，最大程度地减少人民群众生命和财产损失，维护灾区社会稳定。'
      },
      {
        _id: '003', cover_image: 'https://res.51huanche.com/bjaid/knowledge/thumb03.png', thumbnail: 'https://res.51huanche.com/bjaid/knowledge/thumb03.png',
        courseName: '国家自然灾害救助应急预案',
        courseBrief: '本课程以文档的形式呈现',
        courseIntroduce: '建立健全应对突发重大自然灾害救助体系和运行机制，规范应急救助行为，提高应急救助能力，最大程度地减少人民群众生命和财产损失，维护灾区社会稳定。'
      },
      {
        _id: '001', cover_image: 'https://res.51huanche.com/bjaid/knowledge/thumb01.png', thumbnail: 'https://res.51huanche.com/bjaid/knowledge/thumb01.png',
        courseName: '国家自然灾害救助应急预案',
        courseBrief: '本课程以文档的形式呈现',
        courseIntroduce: '市中医局，市医管局，各区卫生计生委，各相关公共卫生机构，各三级医院：\n' +
          '为做好各类突发事件紧急医学救援工作，提高卫生应急反应能力和急救水平，我委组织编制了《北京市卫生健康委员会突发事件紧急医学救援应急预案》，现印发给你们，请遵照执行。'
      },
      {
        _id: '002', cover_image: 'https://res.51huanche.com/bjaid/knowledge/thumb02.png', thumbnail: 'https://res.51huanche.com/bjaid/knowledge/thumb02.png',
        courseName: '急救VR手册',
        courseBrief: '本课程以文档的形式呈现',
        courseIntroduce: '建立健全应对突发重大自然灾害救助体系和运行机制，规范应急救助行为，提高应急救助能力，最大程度地减少人民群众生命和财产损失，维护灾区社会稳定。'
      },
      {
        _id: '003', cover_image: 'https://res.51huanche.com/bjaid/knowledge/thumb03.png', thumbnail: 'https://res.51huanche.com/bjaid/knowledge/thumb03.png',
        courseName: '国家自然灾害救助应急预案',
        courseBrief: '本课程以文档的形式呈现',
        courseIntroduce: '建立健全应对突发重大自然灾害救助体系和运行机制，规范应急救助行为，提高应急救助能力，最大程度地减少人民群众生命和财产损失，维护灾区社会稳定。'
      },
      {
        _id: '001', cover_image: 'https://res.51huanche.com/bjaid/knowledge/thumb01.png', thumbnail: 'https://res.51huanche.com/bjaid/knowledge/thumb01.png',
        courseName: '国家自然灾害救助应急预案',
        courseBrief: '本课程以文档的形式呈现',
        courseIntroduce: '市中医局，市医管局，各区卫生计生委，各相关公共卫生机构，各三级医院：\n' +
          '为做好各类突发事件紧急医学救援工作，提高卫生应急反应能力和急救水平，我委组织编制了《北京市卫生健康委员会突发事件紧急医学救援应急预案》，现印发给你们，请遵照执行。'
      },
      {
        _id: '002', cover_image: 'https://res.51huanche.com/bjaid/knowledge/thumb02.png', thumbnail: 'https://res.51huanche.com/bjaid/knowledge/thumb02.png',
        courseName: '急救VR手册',
        courseBrief: '本课程以文档的形式呈现',
        courseIntroduce: '建立健全应对突发重大自然灾害救助体系和运行机制，规范应急救助行为，提高应急救助能力，最大程度地减少人民群众生命和财产损失，维护灾区社会稳定。'
      },
      {
        _id: '003', cover_image: 'https://res.51huanche.com/bjaid/knowledge/thumb03.png', thumbnail: 'https://res.51huanche.com/bjaid/knowledge/thumb03.png',
        courseName: '国家自然灾害救助应急预案',
        courseBrief: '本课程以文档的形式呈现',
        courseIntroduce: '建立健全应对突发重大自然灾害救助体系和运行机制，规范应急救助行为，提高应急救助能力，最大程度地减少人民群众生命和财产损失，维护灾区社会稳定。'
      },
    ]
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
  onSearch: function (e) {
    wx.showModal({
      title: '提示',
      content: e.detail,
    });
    this.setData({
      searchName: e.detail
    })
  },
  toDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log("toDetail", id);
    wx.navigateTo({
      url: '/pages/knowledge/detail/detail?id=' + id,
    })
  }
})