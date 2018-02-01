import Vue from 'vue'
import Indicator from './Indicator'
let instance

export default {
  open (options = {}) {
    if (!instance) {
      let IndicatorExt = Vue.extend(Indicator)
      instance = new IndicatorExt({
        el: document.createElement('div')
      })
    }
    if (instance.visible) {
      return
    }
    document.body.appendChild(instance.$el)

    Vue.nextTick(() => {
      instance.visible = true
    })
  },

  close () {
    if (instance) {
      instance.visible = false
    }
  }
}
