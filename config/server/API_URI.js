module.exports = {
    Sys: {
        URI_WX_CODE_LOGIN: "/api/xcx/{0}/{1}/login",
        URI_UPDATE_USER_INFO: "/api/xcx/user/update"
    },
    AMP:{
        //gps坐标转高德坐标
        COVERTGPS: "https://restapi.amap.com/v3/assistant/coordinate/convert?key={0}&locations={1}&coordsys=gps"
    },
    Topic: {
        URI_TOPIC_LIST: "/api/xcx/topic/list",
        URI_TOPIC_DETAIL: "/api/xcx/topic/item/{0}",
    },
    Scenic: {
        URI_SCENIC_CATEGORIES: "/api/web/scenic/categories",
      URI_SCENIC_LIST_CATEGORIES: "/api/xcx/scenic/category/list",
        URI_SCENIC_DETAIL_NOAUTH: "/api/xcx/noauth/scenic/detail/{0}",
        URI_SCENIC_DETAIL_AUTH: "/api/xcx/scenic/detail/{0}",
        URI_SCENIC_KEEPIN: "/api/xcx/keepin",
        URI_SCENIC_CHECKPOINT: "/api/xcx/checkpoint",
        URI_SCENIC_GETCONFIG: "/api/xcx/config",
      URI_SCENIC_LIST: "/api/xcx/scenic/list/distance/?scid={0}&content={1}&destination={2}&pagecount={3}&pagesize={4}"
    },
    // 我的页面接口
    Mine: {
        URI_MINE_GETKEPPIN: '/api/xcx/my/keepin', // 获取我的收藏
        URI_MINE_GETCOUPONS: '/api/xcx/my/coupons', // 获取我的优惠券
        URI_MINE_GETCHECKPOINTS: '/api/xcx/my/checkpoints', // 获取我的打卡点
    },
    // 搜索页面接口
    Search: {
        URI_SEARCH_GETRESULT: '/api/xcx/search'
    },
    // 旅游线路
    Tourist: {
        URI_TOURIST_GETLIST: '/api/xcx/routes/list',
        URI_TOURIST_GETDETAIL: '/api/xcx/tourist/route/{0}',
        URI_TOURIST_AUTH_GETDETAIL: '/api/xcx/tourist/route/auth/{0}',
    },
    //图灵机器人
    Turing: {
        URI_TURING_TXT: "/api/xcx/turing/reply"
    },
    // 活动凭证
    ActVoucher: {
        URI_ACT_INFO: "/api/xcx/topic?t={0}",
        URI_ACT_ISCHECK: "/api/xcx/topic/check/join/{0}?scenicid={1}",
        URI_ACT_JOIN: "/api/xcx/topic/join/{0}",
        URI_ACT_RECEIVE: "/api/xcx/topic/received/{0}/{1}"
    },
    // 活动规则
    ActRule: {
        URI_ACT_JOIN: "/api/xcx/topic/join/{0}",
    },
    // 发现页-商户信息
    MctInfo: {
        URI_MCTINFO: "/api/xcx/{0}/{1}",
    },
    // 发现页-投票
    ActVote: {
        // 候选人列表
        URI_CANDIDATOR_LIST: "/api/xcx/topic/candidator/{0}",
        // 带状态候选人列表
        URI_CANDIDATOR_LIST_FULL: "/api/xcx/vote/list/{0}",
        // 投票
        URI_VOTE: "/api/xcx/vote/to/{0}/{1}"
    },
    //统一下单
        PAY_MENT:"/api/xcx/create/pay/{0}",
    // 小火车
    Train: {
        // 获取信息
        URI_GET_TRAININFO: "/api/xcx/topic/item/{0}",
        // 获取已登录信息
        URI_GET_TRAININFO_AUTH: "/api/xcx/topic/train/{0}",
    }
}

