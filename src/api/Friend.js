import http from '@/utils/http'

export default {
  search (params) {
    return http.post('/api/FriendLink/search.action', params)
  },
  edit (params) {
    return http.postJSON('/api/FriendLink/update.action', params)
  },
  add (params) {
    return http.postJSON('/api/FriendLink/create.action', params)
  },
  delete (params) {
    return http.postJSON('/api/FriendLink/delete.action', params)
  }
}
