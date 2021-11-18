import http from '@/utils/http'

export function useInfo(data) {
  return http.get('/api/user/1', data);
}