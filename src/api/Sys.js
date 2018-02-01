import http from '@/utils/http'

export default {
  findSysDictItem (okCb, errCb) {
    return http.post('/cash_settle/bs/SysDictItem/search.action', {
      page: 1,
      rows: -1
    }, okCb, errCb)
  },
  search (params) {
    return http.post('/cash_settle/bs/SysDictItem/search.action', params)
  },
}
