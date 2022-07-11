import { create } from 'dva-core';
import createLoading from 'dva-loading';
import Taro from '@tarojs/taro';

let app;
let store;
let dispatch;

function createApp(opt) {
  // redux日志
  app = create(opt);
  app.use(createLoading({}));

  // 注入model
  if (!global.registered) opt.models.forEach((model) => app.model(model));
  global.registered = true;
  app.start();

  // 设置store
  store = app._store;
  app.getStore = () => store;
  app.use({
    onError(err) {
      // console.log(err, 'reer')
      err.preventDefault();
      Taro.showToast({
        title: err?.message || '系统错误',
        icon: 'none',
        duration: 2000,
      });
    },
  });

  // 设置dispatch
  dispatch = store.dispatch;

  app.dispatch = dispatch;
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  },
};
