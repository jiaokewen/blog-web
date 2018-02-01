import Sys from '@/api/Sys'

let dict = []

export default {
  load () {
    return new Promise((resolve, reject) => {
      Sys.findSysDictItem().then((page) => {
        dict = page.rows
        resolve()
      }).catch(() => {
        reject()
      })
    })
  },

  translate (dictCode, dictItemCode) {
    let found = dict.find(item => {
      return item.dictCode === dictCode && item.dictItemCode === dictItemCode
    })
    return found.dictItemValue || '?'
  },
}
