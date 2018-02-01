import http from '@/utils/http'

export default {
  search (params) {
    return http.post('/cash_settle/backend/BillSettle/search.action', params)
  },
  findAllByTransactionId (transactionId,billType) {
    return http.post('/cash_settle/backend/BillSettle/findAllByTransactionId.action', {transactionId,billType}
    )
  }
}
