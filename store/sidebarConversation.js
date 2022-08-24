export const state = () => ({
  isShow: false,
})

export const getters = {
  getIsShow(state) {
    return state.isShow
  },
}

export const mutations = {
  setIsShow(state, value) {
    state.isShow = value
  },
}

export const actions = {
  closeSidebar(context) {
    context.commit('setIsShow', false)
  },

  toggleSidebar(context) {
    context.commit('setIsShow', !context.state.isShow)
  },
}
