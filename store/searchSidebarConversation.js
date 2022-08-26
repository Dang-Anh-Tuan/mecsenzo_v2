export const state = () => ({
  keySearch: '',
})

export const getters = {
  getKeySearch(state) {
    return state.keySearch
  },
}

export const mutations = {
  setKeySearch(state, value) {
    state.keySearch = value
  },
}

export const actions = {
  setKeySearch(context, keySearch) {
    context.commit('setKeySearch', keySearch)
  },
}
