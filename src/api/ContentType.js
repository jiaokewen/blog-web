import http from '@/utils/http'

export default {
  search (params) {
    return http.post('/api/ContentType/search.action', params)
  },
  searchvl (params) {
    return http.post('/api/ContentType/searchv1.action', params)
  },
  edit (params) {
    return http.postJSON('/api/ContentType/update.action', params)
  },
  add (params) {
    return http.postJSON('/api/ContentType/create.action', params)
  },
  findFatcher (typeId) {
    return http.post('/api/ContentType/findFatcher.action', {typeId})
  }
}
