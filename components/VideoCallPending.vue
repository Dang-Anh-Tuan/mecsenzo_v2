<template>
  <div>
    <div
      v-if="lastMessageVideoCall"
      class="fixed top-0 left-0 bottom-0 right-0 overflow-hidden z-[1000]"
    >
      <div
        class="w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
      >
        <div v-if="infoVideoCall" class="w-[60%] h-[60%]">
          <div class="flex justify-center items-center h-[90%]">
            <div class="flex flex-col items-center">
              <div>
                <Avatar
                  :is-have-avatar="!!infoVideoCall.avatar"
                  :src-image="infoVideoCall.avatar"
                  :first-char="
                    infoVideoCall.name && infoVideoCall.name.charAt(0)
                  "
                  size="large"
                />
              </div>
              <div>
                <p class="select-none text-[1.2rem] text-white font-medium">
                  {{ infoVideoCall.name }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div class="m-auto w-[80%] md:w-[60%] flex justify-between">
              <button
                class="w-[68px] h-[68px] rounded-full bg-success text-[1.2rem] text-white"
                @click="acceptVideoCall"
              >
                <fa icon="phone" />
              </button>
              <button
                class="w-[68px] h-[68px] rounded-full bg-danger text-[1.2rem] text-white"
                @click="handleCancelVideoCall"
              >
                <fa icon="xmark" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { serverTimestamp } from '@firebase/firestore'
import { mapGetters } from 'vuex'
import {
  getConversationById,
  getConversationOfUserRealtime,
  updateConversation,
} from '~/api/conversation'
import { updateMessageVideoCall } from '~/api/message.api'
import {
  getUserByEmail,
  getUserRealtimeByEmail,
  updateUser,
} from '~/api/user.api'
export default {
  data() {
    return {
      currentUser: null,
      allConversations: null,
      unsubGetUser: null,
      unsubGetConversation: null,
      lastMessageVideoCall: null,
      infoVideoCall: null,
    }
  },

  computed: {
    ...mapGetters({
      getCurrentEmail: 'account/getAccount',
    }),
  },

  watch: {
    allConversations: {
      handler(newValue) {
        if (newValue) {
          const lastMessages = newValue.map(
            (conversation) => conversation.lastMessage
          )
          const excludeMessageVideoCall =
            localStorage.getItem('excludeMessageVideoCall') || []

          this.lastMessageVideoCall = lastMessages.filter((message) => {
            return (
              message.type === 'videoCall' &&
              message.status === 'pending' &&
              message.user.email !== this.getCurrentEmail &&
              !excludeMessageVideoCall.includes(message.id)
            )
          })[0]
        }
      },
    },

    lastMessageVideoCall: {
      async handler(newValue) {
        if (newValue) {
          const videoCallConversation = await getConversationById(
            newValue.conversation
          )
          if (videoCallConversation.type === 'individual') {
            const emailPartner = videoCallConversation.member.filter(
              (email) => email !== this.getCurrentEmail
            )[0]
            const userPartner = await getUserByEmail(emailPartner)

            this.infoVideoCall = {
              name: userPartner.fullName,
              avatar: userPartner.avatar,
              conversation: videoCallConversation,
            }
          } else {
            this.infoVideoCall = {
              name: videoCallConversation.name,
              avatar: videoCallConversation.thumb,
              conversation: videoCallConversation,
            }
          }
        }
      },
    },
  },

  async created() {
    this.unsubGetUser = await getUserRealtimeByEmail(
      this.getCurrentEmail,
      this.setCurrentUser
    )
    this.unsubGetConversation = getConversationOfUserRealtime(
      this.getCurrentEmail,
      this.setAllConversations,
      null
    )
  },

  beforeDestroy() {
    if (this.unsubGetUser) {
      this.unsubGetUser()
    }
    if (this.unsubGetConversation) {
      this.unsubGetConversation()
    }
  },

  methods: {
    setCurrentUser(user) {
      this.currentUser = user
    },

    setAllConversations(conversationsDoc) {
      this.allConversations = conversationsDoc.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    },

    async updateConversationWhenSendMessage(newMessage) {
      const videoCallConversation = await getConversationById(
        newMessage.conversation
      )

      await updateConversation({
        ...videoCallConversation,
        lastMessage: newMessage,
        timeEnd: serverTimestamp(),
        seen: [this.getCurrentEmail],
      })
    },

    async handleCancelVideoCall() {
      const currentUser = await getUserByEmail(this.getCurrentEmail)
      await updateUser({ ...currentUser, isFreeVideoCall: true })

      if (this.infoVideoCall.type === 'individual') {
        const newLastMessage = {
          ...this.lastMessageVideoCall,
          status: 'cancel',
        }
        await updateMessageVideoCall(newLastMessage)
        await this.updateConversationWhenSendMessage(newLastMessage)
      } else {
        const excludeMessageVideoCall =
          localStorage.getItem('excludeMessageVideoCall') || []

        localStorage.setItem('excludeMessageVideoCall', [
          ...excludeMessageVideoCall,
          this.lastMessageVideoCall.id,
        ])

        this.lastMessageVideoCall = null
      }
    },

    async acceptVideoCall() {
      let newLastMessage
      if (this.infoVideoCall.conversation.type === 'individual') {
        newLastMessage = {
          ...this.lastMessageVideoCall,
          status: 'accept',
          timeStart: serverTimestamp(),
          emailJoin: [
            ...this.lastMessageVideoCall.emailJoin,
            this.getCurrentEmail,
          ],
        }
      } else {
        newLastMessage = {
          ...this.lastMessageVideoCall,
          emailJoin: [
            ...this.lastMessageVideoCall.emailJoin,
            this.getCurrentEmail,
          ],
          timeStart: serverTimestamp(),
        }
      }

      const idMessage = this.lastMessageVideoCall.id

      await updateMessageVideoCall(newLastMessage)
      await this.updateConversationWhenSendMessage(newLastMessage)

      this.$router.push({
        path: 'video-chat',
        params: { id: idMessage },
        name: `video-chat-id___${this.$i18n.locale}`,
      })
    },
  },
}
</script>

<style></style>
