import http from '@/utils/http'
import md5 from 'js-md5'

export default {
  login (username, password, okCb, errCb) {
    return http.post('/api/login', {
      username,
      password: md5(password)
    })
  },

  getUsers (params) {
    return http.post('/cash_settle/backend/User/search.action', params)
  },

  createUser (user) {
    return http.postJSON('/cash_settle/backend/User/create.action', user)
  },

  removeUser (user) {
    return http.postJSON('/cash_settle/backend/User/delete.action', user)
  },

  findUserById (userId) {
    return http.post('/cash_settle/backend/User/findById.action', {
      userId
    })
  },

  updateUser (user) {
    return http.postJSON('/cash_settle/backend/User/update.action', user)
  },

  changePassword (password, newPassword) {
    return http.post('/cash_settle/backend/User/changePassword.action', {
      password: md5(password),
      newPassword: md5(newPassword)
    })
  },
  logout () {
    return http.logOut('/cash_settle/backend/User/logout.action')
  },
  validateUser (user) {
    return http.postJSON('/cash_settle/backend/User/validateUser.action', user)
  },
  validateTel (user) {
    return http.postJSON('/cash_settle/backend/User/validateTel.action', user)
  },
  validateEmail (user) {
    return http.postJSON('/cash_settle/backend/User/validateEmail.action', user)
  }
}
