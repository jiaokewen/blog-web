import http from '@/utils/http'

export default {
  search (params) {
    return http.post('/cash_settle/backend/RegionCompany/search.action', params)
  },
  findRegionCompanyById (regionCompanyId) {
    return http.post('/cash_settle/backend/RegionCompany/findById.action', {regionCompanyId}
    )
  },
  update (params) {
    return http.postJSON('/cash_settle/backend/RegionCompany/update.action', params)
  },
  create (params) {
    return http.postJSON('/cash_settle/backend/RegionCompany/create.action', params)
  },
  validateCompany (params) {
    return http.postJSON('/cash_settle/backend/RegionCompany/validateCompany.action', params)
  },
  validateTel (params) {
    return http.postJSON('/cash_settle/backend/RegionCompany/validateTel.action', params)
  },
}
