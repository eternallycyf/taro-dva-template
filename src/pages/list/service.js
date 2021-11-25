import http from '@/utils/http'

export function getList(data) {
  return http.get('/api/list', data);
}