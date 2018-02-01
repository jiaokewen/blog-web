import http from '@/utils/http'

export default {
  search (params) {
    return http.post('/cash_settle/backend/ExceptionEmail/search.action', params)
  },
  findById (exceptionEmailId) {
    return http.post('/cash_settle/backend/ExceptionEmail/findById.action', {exceptionEmailId}
    )
  }
}
