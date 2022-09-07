import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import { getConversationById } from '~/api/conversation'

import ChatSide from '~/components/ChatSide.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const factory = (values, store, localVue) => {
  return shallowMount(ChatSide, {
    data() {
      return {
        ...values,
      }
    },
    mocks: {
      $t: (msg) => msg,
      $i18n: { en: 'en' },
      $route: {
        params: 'MP6K4t0a07jPx2JlZ52q',
      },
    },
    store,
    localVue,
    stubs: {
      NuxtLink: { template: '<div></div> ' },
      fa: { template: '<div></div> ' },
    },
  })
}

describe('Getters.vue', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      'conversation/getCurrentMembers': () => [
        {
          address: null,
          age: null,
          avatar:
            'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Ffavicon.png686a0a36-a6e6-47f8-8261-f677ecbf2944?alt=media&token=a090d255-7dab-421c-927e-df2206608941',
          email: 'o@gmail.com',
          friend: [],
          fullName: 'nick moi',
          id: 'M5PGkhDJajtY16rfQ2qQ',
          isActive: true,
        },
        {
          address: 'Ha noi',
          age: '25',
          avatar:
            'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fhou-china-6.jpg58055701-4082-4ff0-8fe5-7a71b9798f86?alt=media&token=ced97e30-37e0-4c75-bf85-e482ba8360ae',
          email: 'abc@gmai.com',
          fullName: 'Dang Anh Tuan',
          id: 'uEMuwgGQSJHr7fKQ4vI5',
          isActive: true,
          isFreeVideoCall: true,
        },
      ],
      'sidebarConversation/getIsShow': () => false,
      'account/getAccount': () => 'abc@gmai.com',
    }

    store = new Store({
      getters,
    })
  })

  it('Renders "store.getters.inputValue" in first p tag', async () => {
    const wrapper = factory(
      {
        inputMessage: 'Hello',
        currentConversation: {
          member: ['abc@gmai.com', 'o@gmail.com'],
        },
        conversationRealtime: {
          member: ['abc@gmai.com', 'o@gmail.com'],
        },
      },
      store,
      localVue
    )
    wrapper.vm.handleSendMessage()
    const conversationCurrent = await getConversationById(
      'MP6K4t0a07jPx2JlZ52q'
    )
    expect(conversationCurrent.lastMessage.content).toBe('Hello')
  })
})
