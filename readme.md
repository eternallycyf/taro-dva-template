### 简介


由于原生语法开发小程序效率较低，而且功能性组件不全，需要三方框架支撑提效小程序开发体系。
最终决定采用taro小程序开发框架，完美支持react动态语法，并且可集成dva等状态管理库，开发思维模式与umi基本保持一致，减少学习成本。
demo现只考虑h5和微信小程序。
#### 
#### 安装依赖
```shell
npm install
# 或yarn tyarn
```
#### 
#### 本地开发
##### h5页面开发
```shell
npm run dev:h5 
#或 yarn dev:h5
```
即可在浏览器打开，修改文件实时更新
##### 小程序开发
```shell
npm run dev:weapp 
#或 yarn dev:weapp
```
运行后打开微信开发者工具，选择小程序模式，选择文件路径到该项目的dist文件夹，即可看到效果。
修改文件实时更新
##### h5打包
```shell
npm run build:h5 
#或 yarn build:h5
```
##### 小程序打包
```shell
npm run build:weapp 
#或 yarn build:weapp
```


### 已集成功能
### dva
项目已集成dva,用法和umi基本完全一致。
以下为需要注意点：

- 文件结构，没有umi自动集成model文件，新增页面model文件需要在models文件夹下手动引入
- 不能在Subscriptions中监听路由变化来发请求，小程序内没有路由，而是在组件内根据组件生命周期或者hook来发请求。



### mock
已经集成mock,在dev本地开发会默认根据mock文件夹下文件内容启动mock服务，会启动在本地9527端口。小程序默认请求mock端口。
插件详见[https://github.com/NervJS/taro-plugin-mock](https://github.com/NervJS/taro-plugin-mock)
注意事项如下：

- 小程序如果需要使用本地mock需要在小程序项目配置里面开启不校验合法域名、业务域名、TLS版本以及https证书
- 小程序测试环境如果切换链接服务端而不是mock，需要在配置文件夹dev.js修改minProgramBaseUrl为测试环境地址。
- 小程序线上地址域名配置需要在配置文件夹config里面修改prod.js的minProgramBaseUrl为线上环境地址。
- h5本地默认请求mock服务，如需要联调测试环境修改配置文件夹dev.js的proxy代理



### request
不同环境发起网络请求的API不一致，通过taro.request统一APi。
API详见[https://nervjs.github.io/taro/docs/apis/network/request/request](https://nervjs.github.io/taro/docs/apis/network/request/request)

- 已经对request做统一封装，做到请求错误后统一封装提示错误，业务数据逻辑中只需要关注请求的正常流处理逻辑，不需要在dva去每个请求做错误提示。
- 现默认请求的code为200为请求成功，其他为请求失败。40x为未登录或权限不足需要用户登陆或者微信授权，需要进一步写具体业务流程。如需要更改数据格式或者需要写具体业务逻辑，在utils下http下interceptors拦截器中修改。
- post请求默认contentType为"application/json"，请求方法第三个参数为自定义contentType



### taro-ui
组件尽可能使用标准taro-ui提供的UI库的组件，提供一致标准的体验
[https://taro-ui.jd.com/#/docs/introduction](https://taro-ui.jd.com/#/docs/introduction)

- UI库的css没有自动按需加载配置，需要根据判断是引入全部css还是根据组件手动引入css
- UI整体主题的修改配置需要关注



### 后续开发
根据具体业务内容需要关注以下业务场景，参考文档如下

- 和服务端调通用户鉴权以及自己的业务用户体系 [https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
- 无限长列表性能: [https://nervjs.github.io/taro/docs/virtual-list](https://nervjs.github.io/taro/docs/virtual-list)
- 性能优化相关需要关注 [https://nervjs.github.io/taro/docs/optimized](https://nervjs.github.io/taro/docs/optimized)
- 可视化相关场景需要使用echarts小程序版或者f2小程序版 
   - f2: [https://github.com/xioxin/taro-f2](https://github.com/xioxin/taro-f2)
   - echarts: [https://github.com/WsmDyj/echarts-for-taro](https://github.com/WsmDyj/echarts-for-taro)
