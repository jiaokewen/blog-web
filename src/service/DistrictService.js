import districtApi from '@/api/District'

let provinces = []
let city = []
let area = []

let areaMap = {}
let cityMap = {}
let provinceMap = {}

export default {
  load () {
    return new Promise((resolve, reject) => {
      Promise.all([
        districtApi.findAllProvince(),
        districtApi.findAllCity(),
        districtApi.findAllArea()
      ]).then((res) => {
        provinces = res[0].rows
        for (let i = 0; i < provinces.length; i++) {
          if (provinces[i].provinceCode) {
            provinceMap[provinces[i].provinceCode.substr(0, 2)] = provinces[i]
          }
        }

        city = res[1].rows
        for (let i = 0; i < city.length; i++) {
          city[i].parent = provinceMap[city[i].cityCode.substr(0, 2)]
          cityMap[city[i].cityCode.substr(0, 4)] = city[i]
        }
        area = res[2].rows
        for (let i = 0; i < area.length; i++) {
          area[i].parent = cityMap[area[i].areaCode.substr(0, 4)]
          areaMap[area[i].areaCode] = area[i]
        }

        resolve([provinces, city, area])
      }).catch(err => {
        reject(err)
      })
    })
  },

  translate (districtCode) {
    if (areaMap[districtCode]) {
      let a = areaMap[districtCode]
      return [a.parent.parent, a.parent, a]
    } else if (cityMap[districtCode.substring(0, 4)]) {
      let a = cityMap[districtCode.substring(0, 4)]
      return [a.parent, a]
    } else {
      return [provinceMap[districtCode.substring(0, 2)]]
    }
  }
}
