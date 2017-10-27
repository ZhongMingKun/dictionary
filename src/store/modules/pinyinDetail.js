import * as api from '../../api'

const state = {
  spell: '',
  fontList: [],
  currentPage: 1
}

const getters = {
  newSpell: state => state.spell,
  fontListBySpell: state => state.fontList,
  spellCurrMaxPage: state => state.currentPage,
  spellListLen: state => state.fontList.length
}
const actions = {
  getSpell({state}, spell) {
    state.spell = spell
  },
  getFontData({state}, data) {
    state.fontList = data
  },
  loadNewSpellList({state}) {
    state.currentPage++
    api.getSpellDetail(state.spell, state.currentPage, function (data) {
      data.result.list.forEach((item) => {
        state.fontList.push(item)
      })
    })
  },
  resetSpellPage({state}) {
    state.currentPage = 1
    state.spell = ''
  }
}
export default {
  state,
  getters,
  actions
}
