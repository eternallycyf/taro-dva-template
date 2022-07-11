import Taro from '@tarojs/taro';
import { pageToLogin } from './utils';
import { HTTP_STATUS } from './config';
import http from '@/utils/http';

import { store } from '../../store';

let isRequesting = false;

function reRequest() {
  return new Promise(async (resolve, reject) => {
    if (!isRequesting) {
      isRequesting = true;
      const uuid = Taro.getStorageSync('uuid');
      const { code } = await Taro.login({ timeout: 8000 });
      let {
        data: {
          access_token,
          phoneNumber,
          uid: memberId,
          avatarUrl,
          licensePlate,
        },
      } = await http.post('/passport/mini-program/re-board', { uuid, code });
      store.dispatch({
        type: 'me/save',
        payload: { licensePlate },
      });

      store.dispatch({
        type: 'login/save',
        payload: {
          authorization: access_token,
          phoneNumber,
          avatar: avatarUrl,
          memberId,
        },
      });

      // 缓存用户token
      Taro.setStorageSync('Authorization', access_token);
      Taro.setStorageSync('memberId', memberId);

      Taro.setStorageSync('licensePlate', licensePlate);
      Taro.setStorageSync('avatar', avatarUrl);
      Taro.setStorageSync('phoneNumber', phoneNumber);

      isRequesting = false;
      resolve();
    }
    if (isRequesting) {
      const T = setInterval(() => {
        if (!isRequesting) {
          clearInterval(T);
          resolve();
        }
      }, 100);
    }
  });
}

const reRequestProcess = async (api, postData, method) => {
  let newApi = api;
  if (newApi.includes('?')) {
    let arr = newApi.split('?');
    newApi = arr[0];
  }
  await reRequest();
  const apiData = await http[method](newApi, postData);
  return apiData;
};

const customInterceptor = (chain) => {
  const requestParams = chain.requestParams;
  const { data: postData } = requestParams;
  const pageUrl = postData.pageUrl;
  let method = requestParams.method;
  let pictureStream = !!postData.pictureStream; // 对图片数据流单独处理
  delete postData.pageUrl;
  if (pictureStream) {
    requestParams.responseType = 'arraybuffer';
    delete postData.pictureStream;
  }

  return chain.proceed(requestParams).then(async (res) => {
    // 对图片流单独处理
    if (pictureStream) {
      return res.data;
    }

    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.data.code == HTTP_STATUS.SUCCESS) {
      return res.data;
    } else if (res.data.code == HTTP_STATUS.NOT_FOUND) {
      throw new Error('请求资源不存在');
    } else if (res.data.code === HTTP_STATUS.BAD_GATEWAY) {
      throw new Error('服务端出现了问题');
    } else if (res.data.code == HTTP_STATUS.FORBIDDEN) {
      const D = await reRequestProcess(pageUrl, postData, method.toLowerCase());
      return D;
    } else if (res.data.code == HTTP_STATUS.AUTHENTICATE) {
      Taro.setStorageSync('Authorization', '');
      Taro.setStorageSync('licensePlate', '');
      Taro.setStorageSync('avatar', '');
      Taro.setStorageSync('memberId', '');
      Taro.setStorageSync('phoneNumber', '');
      pageToLogin();
      throw new Error('需要鉴权');
    }
    throw new Error(res.data.msg);
  });
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
