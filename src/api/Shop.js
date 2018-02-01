import http from '@/utils/http'

export default {

  search (params) {
    return http.post('/cash_settle/backend/SaleBusiness/search.action', params)
  },
  findById (id) {
    return http.post('/cash_settle/backend/SaleBusiness/findById.action', {id}
    )
  },
}
