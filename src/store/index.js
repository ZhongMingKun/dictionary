import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import searchAndHistory from './modules/searchAndHistory'
import sideDetail from './modules/bushouDetail'
import pinyinDetail from './modules/pinyinDetail'
import fontDetail from './modules/fontDetail'
import fontList from './modules/fontList'

Vue.use(Vuex)

const state = {
  key: 'beb8de4a1656916c4f69d79d1b641b4e'
}

export default new Vuex.Store({
  state,
  actions,
  modules: {
    sideDetail,
    pinyinDetail,
    fontDetail,
    searchAndHistory,
    fontList
  }
})
