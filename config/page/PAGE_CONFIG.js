module.exports = {
  mapview:{
    title: "快速导航",
    url: "/pages/mapview/mapview",
  },
  discovery:{
    title:"发现",
    url: "/pages/discovery/discovery",
    backKey:'mapview'
  },
  discoveryDetail:{
    title:"加载中...",
    url: "/pages/discoveryDetail/discoveryDetail",
    backKey: 'discovery'
  },
  config:{
    title:"页面配置",
    url: "/pages/config/config",
    backKey: 'mine'
  },
  home:{
        title:  "首页" ,
        url: "/pages/home/home",
        backKey: 'mine'
    },
  mine:{
      title:  "我的",
      url: "/pages/mine/mine",
      backKey: 'mapview'
  },
  search:{
      title: "搜索",
      url: "/pages/search/search",
      backKey: 'mapview'
  },
    turing: {
        title:  "店小二",
        url: "/pages/truing/turing",
        backKey: 'mapview'
    },
    detail: {
        title: "护眼百科",
        url: "/pages/detail/detail",
        backKey: 'touristlist',
        isNavigationBack:true
    }


}
