import http from '@/utils/http'

export default {
  search (params) {
    return http.post('/api/system/blog/search', params)
  },
  findById (cid) {
    return http.get('/api/system/blog/findById', {cid})
  },
  update (params) {
    return http.postJSON('/api/system/blog/update', params)
  },
  create (params) {
    return http.postJSON('/api/system/blog/add', params)
  },
  delete (cid) {
    return http.post('/api/system/blog/delete', {cid})
  },
}
