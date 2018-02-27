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
      return item.codeTypeName === dictCode && item.codeValue === dictItemCode
    })
    return found.codeName || '?'
  },

  findList (dictCode) {
    let found = []
    dict.map(item => {
      if (item.codeTypeName === dictCode) {
        found.push(item)
      }
    })
    return found
  }
}
