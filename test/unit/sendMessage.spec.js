import flushPromises from 'flush-promises'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import { jest } from '@jest/globals'
import * as conversationApi from '@/api/conversation'

import ChatSide from '~/components/ChatSide.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const mockGetConversationById = jest
  .spyOn(conversationApi, 'getConversationById')
  .mockReturnValue({
    member: ['abc@gmai.com'],
  })

const mockGetMessageByConversation = jest.fn(
  (id, setListMessage, lastDocMessage) => setListMessage('someData')
)

const mockGetConversationByIdRealTime = jest.fn((id, setConversationRealtime) =>
  setConversationRealtime('someData')
)

const factory = (props, data, store, localVue) => {
  return shallowMount(ChatSide, {
    propsData: {
      ...props,
    },
    data() {
      return {
        ...data,
      }
    },
    mocks: {
      $t: (msg) => msg,
      $i18n: { en: 'en' },
      $route: {
        params: 'MP6K4t0a07jPx2JlZ52q',
      },
      getConversationById: mockGetConversationById,
      getMessageByConversation: mockGetMessageByConversation,
      getConversationByIdRealTime: mockGetConversationByIdRealTime,
    },
    store,
    localVue,
    stubs: {
      fa: { template: '<i/>' },
    },
  })
}

describe('Getters.vue', () => {
  let actions
  let getters
  let store

  beforeEach(() => {
    getters = {
      'conversation/getCurrentMembers': () => [
        {
          fullName: 'nick moi',
          isFreeVideoCall: true,
          email: 'o@gmail.com',
          id: 'M5PGkhDJajtY16rfQ2qQ',
          address: null,
          friend: [],
          avatar: null,
          timestamp: { seconds: 1662370435, nanoseconds: 517000000 },
          age: null,
          isActive: false,
        },
        {
          isFreeVideoCall: true,
          timestamp: { nanoseconds: 140000000, seconds: 1659925189 },
          fullName: 'Dang Anh Tuan',
          age: '25',
          avatar:
            'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fhou-china-6.jpg58055701-4082-4ff0-8fe5-7a71b9798f86?alt=media&token=ced97e30-37e0-4c75-bf85-e482ba8360ae',
          id: 'uEMuwgGQSJHr7fKQ4vI5',
          email: 'abc@gmai.com',
          friend: [
            '1@gmail.com',
            't1@gmail.com',
            '10@gmail.com',
            't2@gmail.com',
            '7@gmail.com',
            '2@gmail.com',
            't@gmail.com',
          ],
          address: 'Ha noi',
          isActive: true,
        },
      ],
      'sidebarConversation/getIsShow': () => false,
      'account/getAccount': () => 'abc@gmai.com',
    }

    actions = {
      'conversation/setCurrentMembers': () => {
        return true
      },
    }

    store = new Store({
      getters,
      actions,
    })
  })

  it('Valid message type text', async () => {
    const wrapper = factory(
      {},
      {
        listMessage: [
          {
            id: '74dzXeR5qtLWq2H9VHez',
            user: {
              isActive: true,
              isFreeVideoCall: true,
              friend: [
                '1@gmail.com',
                't1@gmail.com',
                '10@gmail.com',
                't2@gmail.com',
                '7@gmail.com',
                '2@gmail.com',
                't@gmail.com',
              ],
              email: 'abc@gmai.com',
              address: 'Ha noi',
              age: '25',
              id: 'uEMuwgGQSJHr7fKQ4vI5',
              fullName: 'Dang Anh Tuan',
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fhou-china-6.jpg58055701-4082-4ff0-8fe5-7a71b9798f86?alt=media&token=ced97e30-37e0-4c75-bf85-e482ba8360ae',
              timestamp: { seconds: 1659925189, nanoseconds: 140000000 },
            },
            timestamp: { seconds: 1662611206, nanoseconds: 57000000 },
            reply: null,
            content: 'a',
            conversation: 'MP6K4t0a07jPx2JlZ52q',
            type: 'text',
          },
          {
            id: 'GKuB9BVBSF83uRjgqz42',
            user: {
              isFreeVideoCall: true,
              friend: [
                '1@gmail.com',
                't1@gmail.com',
                '10@gmail.com',
                't2@gmail.com',
                '7@gmail.com',
                '2@gmail.com',
                't@gmail.com',
              ],
              id: 'uEMuwgGQSJHr7fKQ4vI5',
              age: '25',
              timestamp: { nanoseconds: 140000000, seconds: 1659925189 },
              fullName: 'Dang Anh Tuan',
              email: 'abc@gmai.com',
              address: 'Ha noi',
              isActive: true,
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fhou-china-6.jpg58055701-4082-4ff0-8fe5-7a71b9798f86?alt=media&token=ced97e30-37e0-4c75-bf85-e482ba8360ae',
            },
            timestamp: { seconds: 1662611200, nanoseconds: 92000000 },
            conversation: 'MP6K4t0a07jPx2JlZ52q',
            reply: null,
            content: 'a',
            type: 'text',
          },
          {
            id: 'Q7tQFDVefVlmaFnnS197',
            conversation: 'MP6K4t0a07jPx2JlZ52q',
            user: {
              isActive: true,
              fullName: 'Dang Anh Tuan',
              timestamp: { nanoseconds: 140000000, seconds: 1659925189 },
              friend: [
                '1@gmail.com',
                't1@gmail.com',
                '10@gmail.com',
                't2@gmail.com',
                '7@gmail.com',
                '2@gmail.com',
                't@gmail.com',
              ],
              email: 'abc@gmai.com',
              age: '25',
              id: 'uEMuwgGQSJHr7fKQ4vI5',
              isFreeVideoCall: true,
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fhou-china-6.jpg58055701-4082-4ff0-8fe5-7a71b9798f86?alt=media&token=ced97e30-37e0-4c75-bf85-e482ba8360ae',
              address: 'Ha noi',
            },
            type: 'text',
            timestamp: { seconds: 1662611193, nanoseconds: 58000000 },
            reply: null,
            content: 'a',
          },
          {
            id: 'wEdjscSSmEqkQfRsVNdI',
            reply: {
              content:
                'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/message-image%2F4415ba5df0f4bfcee5893d6c441577e0.jpg8626c8fb-32a1-4d2f-b56b-980c3a64fa76?alt=media&token=305a3267-3d0e-4f1a-af79-f50b7b2fe6e8',
              id: 'wcQnZJwizFFbzwN3bBlD',
              type: 'image',
              reply: {
                type: 'text',
                reply: null,
                conversation: 'MP6K4t0a07jPx2JlZ52q',
                id: 'ZJ980cao6bdtQyHVtYAK',
                content: 'Gửi ảnh đi b',
                timestamp: { seconds: 1662449958, nanoseconds: 319000000 },
                user: {
                  address: null,
                  isActive: true,
                  age: null,
                  id: 'M5PGkhDJajtY16rfQ2qQ',
                  timestamp: { seconds: 1662370435, nanoseconds: 517000000 },
                  fullName: 'nick moi',
                  avatar: null,
                  friend: [],
                  email: 'o@gmail.com',
                },
              },
              timestamp: { seconds: 1662449977, nanoseconds: 703000000 },
              user: {
                age: '25',
                id: 'uEMuwgGQSJHr7fKQ4vI5',
                friend: [
                  '1@gmail.com',
                  't1@gmail.com',
                  '10@gmail.com',
                  't2@gmail.com',
                  '7@gmail.com',
                  '2@gmail.com',
                  't@gmail.com',
                ],
                isActive: true,
                avatar:
                  'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fxedoisong_novitec_torado_lamborghini_aventador_roadster_h3_orff.jpg074e6d51-750a-4a56-8e8a-49b87877e184?alt=media&token=6b347c93-5c03-43db-90b6-39c32d84e2b7',
                email: 'abc@gmai.com',
                address: 'Ha noi',
                isFreeVideoCall: true,
                timestamp: { nanoseconds: 140000000, seconds: 1659925189 },
                fullName: 'Dang Anh Tuan',
              },
              conversation: 'MP6K4t0a07jPx2JlZ52q',
            },
            conversation: 'MP6K4t0a07jPx2JlZ52q',
            content: 'oke',
            user: {
              fullName: 'Dang Anh Tuan',
              timestamp: { nanoseconds: 140000000, seconds: 1659925189 },
              email: 'abc@gmai.com',
              address: 'Ha noi',
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fhou-china-6.jpg58055701-4082-4ff0-8fe5-7a71b9798f86?alt=media&token=ced97e30-37e0-4c75-bf85-e482ba8360ae',
              age: '25',
              friend: [
                '1@gmail.com',
                't1@gmail.com',
                '10@gmail.com',
                't2@gmail.com',
                '7@gmail.com',
                '2@gmail.com',
                't@gmail.com',
              ],
              id: 'uEMuwgGQSJHr7fKQ4vI5',
              isFreeVideoCall: true,
              isActive: true,
            },
            timestamp: { seconds: 1662609156, nanoseconds: 806000000 },
            type: 'text',
          },
          {
            id: 'wXsn3SvsB4B6zeLcskYz',
            user: {
              timestamp: { nanoseconds: 140000000, seconds: 1659925189 },
              friend: [
                '1@gmail.com',
                't1@gmail.com',
                '10@gmail.com',
                't2@gmail.com',
                '7@gmail.com',
                '2@gmail.com',
                't@gmail.com',
              ],
              email: 'abc@gmai.com',
              id: 'uEMuwgGQSJHr7fKQ4vI5',
              age: '25',
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fhou-china-6.jpga55117c1-910a-4f0f-a784-c0f76d33ee12?alt=media&token=d7da0cbd-f280-4636-b2a2-69272fef1ef9',
              address: 'Ha noi',
              isFreeVideoCall: true,
              fullName: 'Dang Anh Tuan',
              isActive: true,
            },
            conversation: 'MP6K4t0a07jPx2JlZ52q',
            type: 'text',
            reply: null,
            timestamp: { seconds: 1662518606, nanoseconds: 390000000 },
            content: 'ok',
          },
          {
            id: 'IShdpzs1ouDBkcQNreuB',
            user: {
              email: 'abc@gmai.com',
              id: 'uEMuwgGQSJHr7fKQ4vI5',
              age: '25',
              address: 'Ha noi',
              fullName: 'Dang Anh Tuan',
              isFreeVideoCall: true,
              friend: [
                '1@gmail.com',
                't1@gmail.com',
                '10@gmail.com',
                't2@gmail.com',
                '7@gmail.com',
                '2@gmail.com',
                't@gmail.com',
              ],
              isActive: true,
              timestamp: { nanoseconds: 140000000, seconds: 1659925189 },
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fxedoisong_novitec_torado_lamborghini_aventador_roadster_h3_orff.jpg074e6d51-750a-4a56-8e8a-49b87877e184?alt=media&token=6b347c93-5c03-43db-90b6-39c32d84e2b7',
            },
            timestamp: { seconds: 1662458419, nanoseconds: 443000000 },
            content: 'test',
            reply: null,
            conversation: 'MP6K4t0a07jPx2JlZ52q',
            type: 'text',
          },
          {
            id: '4EhTNzvwhZwn2fE5K2TE',
            conversation: 'MP6K4t0a07jPx2JlZ52q',
            timestamp: { seconds: 1662453685, nanoseconds: 909000000 },
            content: {
              roomId: 'room-vn-1-G7HYM3B3C5-1662359751362',
              name: 'MP6K4t0a07jPx2JlZ52q',
              uniqueName: 'MP6K4t0a07jPx2JlZ52q',
              r: 0,
            },
            emailJoin: ['abc@gmai.com', 'o@gmail.com'],
            user: {
              isFreeVideoCall: true,
              email: 'abc@gmai.com',
              age: '25',
              timestamp: { nanoseconds: 140000000, seconds: 1659925189 },
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fxedoisong_novitec_torado_lamborghini_aventador_roadster_h3_orff.jpg074e6d51-750a-4a56-8e8a-49b87877e184?alt=media&token=6b347c93-5c03-43db-90b6-39c32d84e2b7',
              friend: [
                '1@gmail.com',
                't1@gmail.com',
                '10@gmail.com',
                't2@gmail.com',
                '7@gmail.com',
                '2@gmail.com',
                't@gmail.com',
              ],
              id: 'uEMuwgGQSJHr7fKQ4vI5',
              fullName: 'Dang Anh Tuan',
              isActive: true,
              address: 'Ha noi',
            },
            timeStart: { seconds: 1662453688, nanoseconds: 179000000 },
            status: 'end',
            timeEnd: { seconds: 1662453702, nanoseconds: 109000000 },
            reply: null,
            type: 'videoCall',
          },
          {
            id: 'Dl5ZfPucOXQIKPzUW5sm',
            conversation: 'MP6K4t0a07jPx2JlZ52q',
            type: 'text',
            user: {
              timestamp: { nanoseconds: 140000000, seconds: 1659925189 },
              id: 'uEMuwgGQSJHr7fKQ4vI5',
              friend: [
                '1@gmail.com',
                't1@gmail.com',
                '10@gmail.com',
                't2@gmail.com',
                '7@gmail.com',
                '2@gmail.com',
                't@gmail.com',
              ],
              age: '25',
              fullName: 'Dang Anh Tuan',
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fxedoisong_novitec_torado_lamborghini_aventador_roadster_h3_orff.jpg074e6d51-750a-4a56-8e8a-49b87877e184?alt=media&token=6b347c93-5c03-43db-90b6-39c32d84e2b7',
              isActive: true,
              isFreeVideoCall: true,
              address: 'Ha noi',
              email: 'abc@gmai.com',
            },
            reply: null,
            timestamp: { seconds: 1662451213, nanoseconds: 982000000 },
            content: 'abc',
          },
          {
            id: 'Lpz0rxYhMZR3sB5lMIZU',
            content:
              'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/message-voice%2Futterance-NaN.mp346238d88-d049-462f-be43-20ccedc5ceac?alt=media&token=c2b9b7fd-60fa-45a7-b29c-41ea0a59b880',
            reply: null,
            conversation: 'MP6K4t0a07jPx2JlZ52q',
            timestamp: { seconds: 1662451085, nanoseconds: 6000000 },
            type: 'audio',
            user: {
              friend: [
                '1@gmail.com',
                't1@gmail.com',
                '10@gmail.com',
                't2@gmail.com',
                '7@gmail.com',
                '2@gmail.com',
                't@gmail.com',
              ],
              isFreeVideoCall: true,
              isActive: true,
              address: 'Ha noi',
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fxedoisong_novitec_torado_lamborghini_aventador_roadster_h3_orff.jpg074e6d51-750a-4a56-8e8a-49b87877e184?alt=media&token=6b347c93-5c03-43db-90b6-39c32d84e2b7',
              timestamp: { nanoseconds: 140000000, seconds: 1659925189 },
              email: 'abc@gmai.com',
              age: '25',
              id: 'uEMuwgGQSJHr7fKQ4vI5',
              fullName: 'Dang Anh Tuan',
            },
          },
          {
            id: 'txI9jHYUNxEAH9VC5Cc7',
            reply: {
              user: {
                id: 'M5PGkhDJajtY16rfQ2qQ',
                email: 'o@gmail.com',
                address: null,
                timestamp: { seconds: 1662370435, nanoseconds: 517000000 },
                age: null,
                isActive: true,
                friend: [],
                avatar: null,
                fullName: 'nick moi',
              },
              reply: null,
              type: 'text',
              conversation: 'MP6K4t0a07jPx2JlZ52q',
              timestamp: { seconds: 1662450104, nanoseconds: 140000000 },
              id: 'WnvZXs6ga3eroR32jkcj',
              content: 'Lorm sa ta xem 😜',
            },
            timestamp: { seconds: 1662450891, nanoseconds: 3000000 },
            content:
              'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/message-image%2Fhou-china-6.jpg95b4b7e7-162d-4c08-b625-a72e60e32b00?alt=media&token=03b7f85f-6a9e-4b90-82a9-440f10f098bc',
            conversation: 'MP6K4t0a07jPx2JlZ52q',
            type: 'image',
            user: {
              isFreeVideoCall: true,
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fxedoisong_novitec_torado_lamborghini_aventador_roadster_h3_orff.jpg074e6d51-750a-4a56-8e8a-49b87877e184?alt=media&token=6b347c93-5c03-43db-90b6-39c32d84e2b7',
              email: 'abc@gmai.com',
              isActive: true,
              id: 'uEMuwgGQSJHr7fKQ4vI5',
              address: 'Ha noi',
              fullName: 'Dang Anh Tuan',
              timestamp: { seconds: 1659925189, nanoseconds: 140000000 },
              age: '25',
              friend: [
                '1@gmail.com',
                't1@gmail.com',
                '10@gmail.com',
                't2@gmail.com',
                '7@gmail.com',
                '2@gmail.com',
                't@gmail.com',
              ],
            },
          },
        ],
        lastDocMessage: null,
        unsubscribeSnapMessage: null,
        unsubscribeLoadMoreMsg: null,
        replyMessage: null,
        unsubscribeGetConversationRealtime: null,
        isShowModalAddMember: false,
        isShowPopupLeaveRoom: false,
        fileImageInput: null,
        percentUploadImage: null,
        srcImageShow: null,
        isShowPreviewChatVoice: false,
        dataChatVoice: null,
        isDisableInputMessage: false,
        currentMessageVideoCall: null,
        isShowModalCallVideo: false,
        infoVideoCall: null,
        unsubscribeCurrentMessageVideoCall: null,
        flagAutoCancelVideoCall: true,
        currentConversation: {
          type: 'individual',
          thumb: null,
          currentUser: {
            friend: [
              '1@gmail.com',
              't1@gmail.com',
              '10@gmail.com',
              't2@gmail.com',
              '7@gmail.com',
              '2@gmail.com',
              't@gmail.com',
            ],
            timestamp: { nanoseconds: 140000000, seconds: 1659925189 },
            id: 'uEMuwgGQSJHr7fKQ4vI5',
            email: 'abc@gmai.com',
            avatar:
              'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fhou-china-6.jpg58055701-4082-4ff0-8fe5-7a71b9798f86?alt=media&token=ced97e30-37e0-4c75-bf85-e482ba8360ae',
            fullName: 'Dang Anh Tuan',
            age: '25',
            address: 'Ha noi',
            isActive: true,
            isFreeVideoCall: true,
          },
          timeEnd: { seconds: 1662611205, nanoseconds: 335000000 },
          accountHost: null,
          colorChat: '#a797ff',
          id: 'MP6K4t0a07jPx2JlZ52q',
          partnerUser: {
            id: 'M5PGkhDJajtY16rfQ2qQ',
            address: null,
            isActive: false,
            isFreeVideoCall: true,
            avatar: null,
            fullName: 'nick moi',
            email: 'o@gmail.com',
            timestamp: { seconds: 1662370435, nanoseconds: 517000000 },
            age: null,
            friend: [],
          },
          isTyping: ['abc@gmai.com'],
          name: '',
          member: ['abc@gmai.com', 'o@gmail.com'],
          seen: ['abc@gmai.com'],
          lastMessage: {
            reply: null,
            content: 'a',
            id: '74dzXeR5qtLWq2H9VHez',
            type: 'text',
            conversation: 'MP6K4t0a07jPx2JlZ52q',
            timestamp: { seconds: 1662611206, nanoseconds: 57000000 },
            user: {
              age: '25',
              fullName: 'Dang Anh Tuan',
              id: 'uEMuwgGQSJHr7fKQ4vI5',
              friend: [
                '1@gmail.com',
                't1@gmail.com',
                '10@gmail.com',
                't2@gmail.com',
                '7@gmail.com',
                '2@gmail.com',
                't@gmail.com',
              ],
              email: 'abc@gmai.com',
              isActive: true,
              address: 'Ha noi',
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fhou-china-6.jpg58055701-4082-4ff0-8fe5-7a71b9798f86?alt=media&token=ced97e30-37e0-4c75-bf85-e482ba8360ae',
              timestamp: { seconds: 1659925189, nanoseconds: 140000000 },
              isFreeVideoCall: true,
            },
          },
        },
        conversationRealtime: {
          id: 'MP6K4t0a07jPx2JlZ52q',
          type: 'individual',
          thumb: null,
          currentUser: {
            friend: [
              '1@gmail.com',
              't1@gmail.com',
              '10@gmail.com',
              't2@gmail.com',
              '7@gmail.com',
              '2@gmail.com',
              't@gmail.com',
            ],
            timestamp: { nanoseconds: 140000000, seconds: 1659925189 },
            id: 'uEMuwgGQSJHr7fKQ4vI5',
            email: 'abc@gmai.com',
            avatar:
              'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fhou-china-6.jpg58055701-4082-4ff0-8fe5-7a71b9798f86?alt=media&token=ced97e30-37e0-4c75-bf85-e482ba8360ae',
            fullName: 'Dang Anh Tuan',
            age: '25',
            address: 'Ha noi',
            isActive: true,
            isFreeVideoCall: true,
          },
          timeEnd: { seconds: 1662611205, nanoseconds: 335000000 },
          accountHost: null,
          colorChat: '#a797ff',
          partnerUser: {
            id: 'M5PGkhDJajtY16rfQ2qQ',
            address: null,
            isActive: false,
            isFreeVideoCall: true,
            avatar: null,
            fullName: 'nick moi',
            email: 'o@gmail.com',
            timestamp: { seconds: 1662370435, nanoseconds: 517000000 },
            age: null,
            friend: [],
          },
          isTyping: [],
          name: '',
          member: ['abc@gmai.com', 'o@gmail.com'],
          seen: ['abc@gmai.com'],
          lastMessage: {
            reply: null,
            content: 'a',
            id: '74dzXeR5qtLWq2H9VHez',
            type: 'text',
            conversation: 'MP6K4t0a07jPx2JlZ52q',
            timestamp: { seconds: 1662611206, nanoseconds: 57000000 },
            user: {
              age: '25',
              fullName: 'Dang Anh Tuan',
              id: 'uEMuwgGQSJHr7fKQ4vI5',
              friend: [
                '1@gmail.com',
                't1@gmail.com',
                '10@gmail.com',
                't2@gmail.com',
                '7@gmail.com',
                '2@gmail.com',
                't@gmail.com',
              ],
              email: 'abc@gmai.com',
              isActive: true,
              address: 'Ha noi',
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fhou-china-6.jpg58055701-4082-4ff0-8fe5-7a71b9798f86?alt=media&token=ced97e30-37e0-4c75-bf85-e482ba8360ae',
              timestamp: { seconds: 1659925189, nanoseconds: 140000000 },
              isFreeVideoCall: true,
            },
          },
        },
        inputMessage: 'Hello',
      },
      store,
      localVue
    )

    await flushPromises()

    expect(wrapper.find('div')).toBe(true)
  })
})
