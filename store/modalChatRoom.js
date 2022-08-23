export const state = () => ({
  isShow: false,
  conversation: null,
})

export const getters = {
  getIsShow(state) {
    return state.isShow
  },
  getConversation(state) {
    return state.conversation
  },
}

export const mutations = {
  setIsShow(state, value) {
    state.isShow = value
  },
  setConversation(state, conversation) {
    state.conversation = conversation
  },
}

export const actions = {
  closeModal(context) {
    context.commit('setIsShow', false)
  },

  openModal(context) {
    context.commit('setIsShow', true)
  },

  setConversation(context, conversation) {
    context.commit('setConversation', conversation)
  },
}
