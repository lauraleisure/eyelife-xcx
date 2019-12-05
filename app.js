//app.js
App({
    onLaunch: function () {
        let menuButtonObject = wx.getMenuButtonBoundingClientRect();
        wx.getSystemInfo({
            success: res => {
                let statusBarHeight = res.statusBarHeight,
                    navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
                    navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;//导航高度
                this.globalData.navHeight = navHeight;
                this.globalData.navTop = navTop;
                this.globalData.windowHeight = res.windowHeight;
                this.globalData.capsuleHeight = menuButtonObject.height;//小程序中胶囊的高度
            },
            fail(err) {
                console.log(err);
            }
        });

    },

    globalData: {
        tabArr: {  // 个人信息页面默认显示我的收藏
            curTitleIndex: 0,
            curBodyIndex: 0
        },

    },
    onError:function(err){

    }
})
