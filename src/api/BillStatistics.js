import http from '@/utils/http'

export default {
  search (params) {
    return http.post('/cash_settle/backend/BillStatistics/search.action', params)
  },
  findById (billStatisticsId) {
    return http.post('/cash_settle/backend/BillStatistics/findById.action', {billStatisticsId}
    )
  },
  doAccount (startDate) {
    return http.post('/cash_settle/backend/BillSettle/reloadBill.action', {startDate}
  )},
  sysCount (params) {
    return http.post('/cash_settle/backend/Export/search.action', params)
  },
  companyCount (params) {
    return http.post('/cash_settle/backend/BillStatistics/companyCount.action', params)
  },
  export (params) {
    window.location.href = '/cash_settle/backend/Export/reportXls.action?reportName='+params.reportName+'&fileName='+params.fileName+'&params='+params.params
  }
}
