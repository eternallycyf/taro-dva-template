export default {
  pages: [
    'pages/index/index',
    // 'pages/form/index',
    // 'pages/echarts/index',
    // 'pages/list/index',
  ],
  window: {
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    backgroundColor: '#fff',
    backgroundTextStyle: 'dark',
  },
  subpackages: [
    {
      root: 'pages/echarts',
      pages: ['index'],
    },
    {
      root: 'pages/form',
      pages: ['index'],
    },
    {
      root: 'pages/list',
      pages: ['index'],
    },
  ],
  tabBar: {
    custom: true,
    color: '#D1D5DB',
    selectedColor: '#2D313A',
    backgroundColor: '#fff',
    borderStyle: 'white',
    // list: [
    //   {
    //     pagePath: 'pages/home/index',
    //     text: '充电',
    //     iconPath: './static/icon/home_1.png',
    //     selectedIconPath: './static/icon/home_2.png',
    //   },
    // ],
  },
  usingComponents: {},
  // permission: {
  //   'scope.userLocation': {
  //     desc: '为保障您的服务权益，需要获取充电的地理位置信息', // 高速公路行驶持续后台定位
  //   },
  // },
};
