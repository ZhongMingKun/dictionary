import * as types from '../mutation-types'
import * as api from '../../api'

const state = {
  history: [],
  searchRes: [],
  searchReq: '',
  totalPage: 0,
  currentPage: 1
}

const getters = {
  historyData: state => state.history,
  searchRes: state => state.searchRes,
  searchTotalPage: state => state.totalPage,
  currentPage: state => state.currentPage
}

const mutations = {
  [types.ADD_HISTORY](state, fontData) {
    let newFont = state.history.find((item) => item.id === fontData.id)
    if (!newFont) {
      state.history.push(fontData)
    }
  }
}

const actions = {
  searchByCN({state}, searchReq) {
    api.getFontDetail(searchReq, function (data) {
      state.searchRes.push(data.result)
    })
  },
  searchBySpell({state}, searchReq) {
    state.searchReq = searchReq
    api.getSpellDetail(searchReq, state.currentPage, function (data) {
      state.searchRes = data.result.list
      state.totalPage = data.result.totalpage
    })
  },
  emptySearch({state}) {
    state.searchRes.splice(0, state.searchRes.length)
  },
  loadNewSearchList({state}) {
    state.currentPage++
    api.getSpellDetail(state.searchReq, state.currentPage, function (data) {
      data.result.list.forEach((item) => {
        state.searchRes.push(item)
      })
    })
  },
  resetSearch({state}) {
    state.searchRes = []
    state.searchReq = ''
    state.currentPage = 1
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
