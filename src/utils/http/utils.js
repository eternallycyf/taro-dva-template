import Taro from '@tarojs/taro';
/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let url = currentPage.route;
  return url;
};

export const pageToLogin = () => {
  let path = getCurrentPageUrl();
  if (!path || !path.includes('login')) {
    Taro.navigateTo({
      url: '/pages/login/index',
    });
  }
};

/**
 * @description 判断登陆状态
 */
export const isLogin = () => {
  const token = Taro.getStorageSync('Authorization');
  return !!token;
};

import Taro from '@tarojs/taro';
/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let url = currentPage.route;
  return url;
};

export const pageToLogin = () => {
  let path = getCurrentPageUrl();
  if (!path || !path.includes('login')) {
    Taro.navigateTo({
      url: '/pages/login/index',
    });
  }
};

/**
 * @description 判断登陆状态
 */
export const isLogin = () => {
  const token = Taro.getStorageSync('Authorization');
  return !!token;
};
