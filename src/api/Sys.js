import http from '@/utils/http'

export default {
  findAuthMenu (params) {
    return http.post('/hxufs/loadTree.act', params)
  },

  findSysDictItem (okCb, errCb) {
    return http.post('/api/syscode/viewAll.action')
  },

  findLicensedMenuEasyUI (okCb, errCb) {
    return http.post('/hxufs/UwMenu/findLicensedMenuEasyUI.action')
  }
}
