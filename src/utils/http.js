import Vue from 'vue'
import * as C from './constants'
import UserService from '@/service/UserService'
import router from '@/router'
import * as R from '@/router/router-types'

export default {
  req (method, url, params, options, okCb, errCb) {
    return new Promise((resolve, reject) => {
      var promise = null
      if (method === 'GET') {
        promise = Vue.http.get(url, { params })
      } else if (method === 'POST' || method === 'POSTJSON') {
        promise = Vue.http.post(url, params, options)
      }
      promise.then((resp) => {
        if (resp.headers.map.sessionStatus) {
          if (resp.headers.map.sessionStatus[0] === "false") {
            UserService.localLogout()
            Vue.$indicator.close()
            router.push({ path: R.kLogin })
          } else {
            if (errCb) {
              errCb(C.ERR_MSG_AUTH, C.ERR_CODE_AUTH)
            }
            reject(C.ERR_MSG_AUTH, C.ERR_CODE_AUTH)
          }
        } else {
          if (okCb) {
            okCb(resp.data)
          }
          resolve(resp.data)
        }
      }, (resp) => {
        if (errCb) {
          errCb(C.ERR_MSG_NETWORK, C.ERR_CODE_NETWORK)
        }
        reject(C.ERR_MSG_NETWORK, C.ERR_CODE_NETWORK)
      })
    })
  },

  get (url, params, okCb, errCb) {
    return this.req('GET', url, params, {
      emulateJSON: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }, okCb, errCb)
  },

  post (url, params, okCb, errCb) {
    return this.req('POST', url, params, {
      emulateJSON: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }, okCb, errCb)
  },

  postJSON (url, params, okCb, errCb) {
    return this.req('POSTJSON', url, params, {
      emulateJSON: false,
      headers: {
        'Content-Type': 'application/json'
      }
    }, okCb, errCb)
  },

  logOut (url) {
    Vue.http.post(url)
  }
}
