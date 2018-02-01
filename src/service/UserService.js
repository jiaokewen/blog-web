import VueCookie from 'vue-cookie'
import userApi from '@/api/User'

const USER_KEY = 'user'
let func = []

export default {

  localLogin (user) {
    VueCookie.set(USER_KEY, JSON.stringify(user))
  },

  hasUserSession () {
    return VueCookie.get(USER_KEY)
  },

  getUser () {
    return JSON.parse(VueCookie.get(USER_KEY))
  },

  localLogout () {
    userApi.logout()
    VueCookie.set(USER_KEY, '')
  }
}
