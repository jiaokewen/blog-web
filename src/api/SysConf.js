import http from '@/utils/http'

export default {

  search (params) {
    return http.post('/cash_settle/bs/SysConfig/search.action', params)
  },
  findById (configId) {
    return http.post('/cash_settle/bs/SysConfig/findById.action', {configId}
    )
  },
  update (params) {
    return http.postJSON('/cash_settle/bs/SysConfig/update.action', params)
  }
}
