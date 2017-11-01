import * as types from './mutation-types'

export const addToHistory = ({commit}, fontData) => {
  commit(types.ADD_HISTORY, fontData)
}
