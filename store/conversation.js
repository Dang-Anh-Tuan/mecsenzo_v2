import Cookies from 'js-cookie'
import { getConversationById } from '~/api/conversation'
import { getUsersByEmails } from '~/api/user.api'

export const state = () => ({
  currentConversation: null,
  currentMembers: [],
})

export const getters = {
  getCurrentConversation(state) {
    return state.currentConversation
  },

  getCurrentMembers(state) {
    return state.currentMembers
  },
}

export const mutations = {
  setCurrentConversation(state, conversation) {
    state.currentConversation = conversation
  },

  setCurrentMembers(state, members) {
    state.currentMembers = members
  },
}

export const actions = {
  async setCurrentConversation(context, idConversation) {
    const conversation = await getConversationById(idConversation)
    context.commit('setCurrentConversation', conversation)

    localStorage.setItem('currentConversationId', idConversation)
    Cookies.set('currentConversationId', idConversation)

    context.dispatch('setCurrentMembers', conversation.member)
  },

  async setCurrentMembers(context, members) {
    const currentMembers = await getUsersByEmails(members)
    context.commit('setCurrentMembers', currentMembers)
  },

  async initConversation(context, req) {
    let currentConversationId = null

    if (req) {
      if (!req.headers.cookie) return false
      const cookieSplit = req.headers.cookie.split(';')
      const currentConversationIdKey = cookieSplit.find((c) =>
        c.trim().startsWith('currentConversationId=')
      )
      currentConversationId = currentConversationIdKey.split('=')[1]
    } else if (!process.server) {
      currentConversationId = localStorage.getItem('currentConversationId')
    }

    if (currentConversationId) {
      const currentConversation = await getConversationById(
        currentConversationId
      )
      const currentEmail = context.rootGetters['account/getAccount']

      if (
        currentConversation.member &&
        currentConversation.member.includes(currentEmail)
      ) {
        context.commit('setCurrentConversation', currentConversation)
        context.dispatch('setCurrentMembers', currentConversation.member)
      }
    }
  },

  clearCurrentConversation({ commit }) {
    commit('setCurrentConversation', null)
    commit('setCurrentMembers', null)
  },
}
