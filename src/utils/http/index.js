import Taro from '@tarojs/taro';
import getBaseUrl from './baseUrl';
import interceptors from './interceptors';
import { md5 } from '@/utils/md5';
import { randomString } from '@/utils/utils';

const whitelist = [
  '/passport/mini-program/auto-login',
  '/charge/geography/around',
  '/charge/shop/listMaintenanceShop',
  '/charge/shop/listShop',
  '/charge/banner/listValidBanner',
  '/charge/geography/position',
  '/charge/shop/getShopDetailBody',
  '/charge/shop/getShopDetailGoods',
  '/charge/goods/getGoodsDetail',
  '/charge/shop/getShopDetailHead',
  '/charge/geography/listArea',
  '/passport/mini-program/re-board',
];

interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));

class httpRequest {
  baseOptions(params, method = 'GET') {
    let { url, data } = params;
    const BASE_URL = getBaseUrl(url);
    let contentType = 'application/json';
    contentType = params.contentType || contentType;

    // const uuid = Taro.getStorageSync('uuid');
    // const Authorization = Taro.getStorageSync('Authorization');
    // if (!whitelist.includes(url) && process.env.NODE_ENV === 'production') {
    //   const memberId = Taro.getStorageSync('memberId');
    //   let nonce = randomString(6);
    //   let timestamp = parseInt(new Date().getTime() / 1000);
    //   let sign = md5(memberId + nonce + timestamp + Authorization);
    //   url = `${url}?uid=${memberId}&nonce=${nonce}&timestamp=${timestamp}&sign=${sign}`;
    // }
    // const header = {
    //   uuid,
    //   'content-type': contentType,
    // };
    // if (process.env.NODE_ENV === 'development') {
    //   header.Authorization = Authorization;
    // }
    // // header.Authorization = Authorization
    // if (data) {
    //   data.pageUrl = url;
    // } else {
    //   data = {
    //     pageUrl: url,
    //   };
    // }

    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      // header,
    };
    // console.log(option, 'option')
    return Taro.request(option);
  }

  get(url, data = '') {
    let option = { url, data };
    return this.baseOptions(option);
  }

  post(url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, 'POST');
  }

  put(url, data = '') {
    let option = { url, data };
    return this.baseOptions(option, 'PUT');
  }

  delete(url, data = '') {
    let option = { url, data };
    return this.baseOptions(option, 'DELETE');
  }
}

export default new httpRequest();
