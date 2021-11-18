import Taro from '@tarojs/taro'

const getBaseUrl = () => {
  let BASE_URL = '';
  const isH5 = Taro.getEnv() === 'WEB'
  if (!isH5) {
    BASE_URL = minProgramBaseUrl
  }
  return BASE_URL
}

export default getBaseUrl;
