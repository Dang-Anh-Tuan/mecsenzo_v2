import { getUsersByEmails } from '~/api/user.api'

export const state = () => ({
  currentMembers: [],
})

export const getters = {
  getCurrentMembers(state) {
    return state.currentMembers
  },
}

export const mutations = {
  setCurrentMembers(state, members) {
    state.currentMembers = members
  },
}

export const actions = {
  async setCurrentMembers(context, members) {
    const currentMembers = await getUsersByEmails(members)
    context.commit('setCurrentMembers', currentMembers)
  },
}
