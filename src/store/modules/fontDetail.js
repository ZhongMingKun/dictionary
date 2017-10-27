const state = {
  fontID: '',
  fontDetail: {},
  listShow: true
}

const getters = {
  newFont: state => state.fontID,
  isShowList: state => state.listShow,
  fontDetail: state => state.fontDetail
}

const actions = {
  getFontDetail({state}, fontDetail) {
    state.fontDetail = fontDetail
  },
  getFontID({state}, fontID) {
    state.fontID = fontID
  },
  resetFontDetail({state}) {
    state.fontDetail = {}
    state.listShow = true
  },
  showList({state}) {
    state.listShow = true
  },
  hideList({state}) {
    state.listShow = false
  }
}

export default {
  state,
  getters,
  actions
}
