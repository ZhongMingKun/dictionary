const state = {
  getMoreIsShow: false,
  noMoreIsShow: false
}

const getters = {
  getMore: state => state.getMoreIsShow,
  noMore: state => state.noMoreIsShow
}

const mutations = {
  hideGetMore(state) {
    state.getMoreIsShow = false
  },
  showGetMore(state) {
    state.getMoreIsShow = true
  },
  hideNoMore(state) {
    state.noMoreIsShow = false
  },
  showNoMore(state) {
    state.noMoreIsShow = true
  }
}

const actions = {
  hideGetMoreDiv: ({commit}) => {
    commit('hideGetMore')
  },
  showGetMoreDiv: ({commit}) => {
    commit('showGetMore')
  },
  hideNoMoreDiv: ({commit}) => {
    commit('hideNoMore')
  },
  showNoMoreDiv: ({commit}) => {
    commit('showNoMore')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
