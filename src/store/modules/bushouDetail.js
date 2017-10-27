import * as api from '../../api'

const state = {
  side: '',
  fontList: [],
  currentPage: 1
}

const getters = {
  newSide: state => state.side,
  fontListBySide: state => state.fontList,
  sideCurrMaxPage: state => state.currentPage,
  sideListLen: state => state.fontList.length
}

const actions = {
  getFontData({state}, data) {
    state.fontList = data
  },
  getSide({state}, side) {
    state.side = side
  },
  loadNewSideList({state}) {
    state.currentPage++
    api.getSideDetail(state.side, state.currentPage, function (data) {
      data.result.list.forEach((item) => {
        state.fontList.push(item)
      })
    })
  },
  resetSidePage ({state}) {
    state.currentPage = 1
  }
}

export default {
  state,
  getters,
  actions
}
