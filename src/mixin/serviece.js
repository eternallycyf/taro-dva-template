import http from '@/utils/http';

export function postGoodsJsapi(data) {
  return http.post('/charge/pay/goodsJsapi', data);
}

export function postJsapi(data) {
  return http.post('/charge/index/jsapi', data);
}
