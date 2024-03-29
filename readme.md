### 简介

- taro3
- react 版本
- 集成
  - dva
  - taroUI
  - echarts
  - mock
- 适用于 微信小程序 或 h5
- 修改文件实时更新
- 已封装基本拦截器(taro.request)

### 安装 运行 打包

```shell
yarn
yarn dev:h5
yarn dev:weapp
yarn build:weapp
运行后打开微信开发者工具 选择小程序模式 导入dist文件夹 即可看到效果
```

### 注意点

- [dva](https://dvajs.com/guide/#%E7%89%B9%E6%80%A7)
  - ~~文件结构，没有 umi 自动集成 model 文件，新增页面 model 文件需要在 models 文件夹下手动引入~~
  - 已支持自动引入 使用 node 脚本读取文件实现
  - 不能在 Subscriptions 中监听路由变化来发请求，小程序内没有路由，而是在组件内根据组件生命周期或者 hook 来发请求。
- [mock](https://github.com/NervJS/taro-plugin-mock)
  - 小程序如果需要使用本地 mock 需要在小程序项目配置里面开启不校验合法域名、业务域名、TLS 版本以及 https 证书
  - 小程序测试环境如果切换链接服务端而不是 mock，需要在配置文件夹 dev.js 修改 minProgramBaseUrl 为测试环境地址。
  - 小程序线上地址域名配置需要在配置文件夹 config 里面修改 prod.js 的 minProgramBaseUrl 为线上环境地址。
  - h5 本地默认请求 mock 服务，如需要联调测试环境修改配置文件夹 dev.js 的 proxy 代理
- [request](https://taro-docs.jd.com/taro/docs/apis/network/request/request)
  - 已经对 request 做统一封装，做到请求错误后统一封装提示错误，业务数据逻辑中只需要关注请求的正常流处理逻辑，不需要在 dva 去每个请求做错误提示。
  - 现默认请求的 code 为 200 为请求成功，其他为请求失败。40x 为未登录或权限不足需要用户登陆或者微信授权，需要进一步写具体业务流程。如需要更改数据格式或者需要写具体业务逻辑，在 utils 下 http 下 interceptors 拦截器中修改。
  - post 请求默认 contentType 为"application/json"，请求方法第三个参数为自定义 contentType
- [taro-ui](https://taro-ui.jd.com/#/docs/introduction)
  - UI 库 css 没有自动按需加载配置，需要根据判断是引入全部 css 还是根据组件手动引入 css
- [无限长列表](https://nervjs.github.io/taro/docs/virtual-list)
- [性能优化](https://nervjs.github.io/taro/docs/optimized)
- [echarts](https://github.com/ecomfe/echarts-for-weixin)
  - [可定制主题](https://echarts.apache.org/zh/builder.html)
