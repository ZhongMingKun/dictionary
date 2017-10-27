import $ from 'jquery'

const pinyinList = require('./pinyinList')
const bushouList = require('./bushouList')

let key = 'beb8de4a1656916c4f69d79d1b641b4e'

export function getBuShouList(cb) {
  cb(bushouList)
}

export function getPinYinList(cb) {
  cb(pinyinList)
}

export function getFontDetail(word, cb) {
  let url = 'https://v.juhe.cn/xhzd/query'
  $.ajax(url, {
    type: 'get',
    data: {
      word,
      key
    },
    dataType: 'jsonp',
    success: function (data) {
      cb(data)
    }
  })
}

export function getFontDetailById(word, cb) {
  let url = 'https://v.juhe.cn/xhzd/queryid'
  $.ajax(url, {
    type: 'get',
    data: {
      word,
      key
    },
    dataType: 'jsonp',
    success: function (data) {
      cb(data)
    }
  })
}

export function getSpellDetail(word, page, cb) {
  let url = 'https://v.juhe.cn/xhzd/querypy'
  $.ajax(url, {
    type: 'get',
    data: {
      word,
      page,
      isjijie: 0,
      isxiangjie: 0,
      key
    },
    dataType: 'jsonp',
    success: function (data) {
      cb(data)
    }
  })
}

export function getSideDetail(word, page, cb) {
  let url = 'https://v.juhe.cn/xhzd/querybs'
  $.ajax(url, {
    type: 'get',
    data: {
      word,
      page,
      isjijie: 0,
      isxiangjie: 0,
      key
    },
    dataType: 'jsonp',
    success: function (data) {
      cb(data)
    }
  })
}
