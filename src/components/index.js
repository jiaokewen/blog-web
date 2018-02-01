import Indicator from './indicator'

export default {
  install (Vue, config = {}) {
    Vue.$indicator = Vue.prototype.$indicator = Indicator
  }
}
