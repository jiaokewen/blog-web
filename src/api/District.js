import http from '@/utils/http'

export default {
  findAllProvince () {
    return http.post('/cash_settle/bs/province/findAllProviceInfo.action')
  },

  findAllCity () {
    return http.postJSON('/cash_settle/bs/city/findAllCityInfo.action')
  },

  findAllArea () {
    return http.postJSON('/cash_settle/bs/area/findAllAreaInfo.action')
  }
}
