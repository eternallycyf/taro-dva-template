export default {
  pages: [
    'pages/index/index',
    // 'pages/form/index',
    // 'pages/echarts/index',
    // 'pages/list/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  "subpackages": [
    {
      "root": 'pages/echarts',
      "pages": [
        'index'
      ]
    },
    {
      "root": 'pages/form',
      "pages": [
        'index'
      ],
    },
    {
      "root": 'pages/list',
      "pages": [
        'index'
      ],
    },
  ],
}
