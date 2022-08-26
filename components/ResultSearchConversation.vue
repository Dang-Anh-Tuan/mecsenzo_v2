<template>
  <div
    class="absolute w-full h-[85%] bg-white bottom-[10px] md:bottom-0 left-0 z-[1000] px-[20px]"
  >
    <div
      class="container-conversation h-[90%] my-5 overflow-y-auto overflow-x-hidden"
    >
      <div>
        <nuxt-link
          v-for="conversation in resultSearch"
          :id="conversation.id"
          :key="conversation.id"
          :to="`/${conversation.id}`"
          class="h-[54px] mb-3 flex items-center cursor-pointer hover:bg-slate-200"
        >
          <div class="relative">
            <avatar
              v-if="conversation.type === 'individual'"
              :is-have-avatar="!!conversation.partnerUser.avatar"
              :src-image="
                conversation.partnerUser.avatar &&
                conversation.partnerUser.avatar
              "
              :first-char="conversation.partnerUser.fullName.charAt(0)"
            />
            <avatar
              v-else
              :is-have-avatar="!!conversation.thumb"
              :src-image="conversation.thumb"
              :first-char="conversation.name.charAt(0)"
            />
            <div
              v-if="conversation.type === 'individual'"
              :class="`absolute w-[12px] h-[12px] rounded-full bottom-0 right-0 
              ${getClassIsOnline(conversation.partnerUser)}`"
            ></div>
          </div>
          <div class="conversation-content ml-4">
            <p
              :class="`select-none truncate text-ellipsis max-w-[180px] m
              d:max-w-[120px] lg:max-w-[180px] h-[1.4rem] 
              ${getClassNameNotSeen(conversation)}`"
            >
              {{
                conversation.type === 'individual'
                  ? conversation.partnerUser.fullName
                  : conversation.name
              }}
            </p>
            <p
              :class="`select-none truncate text-ellipsis text-[0.9rem] max-w-[180px] 
              md:max-w-[120px] lg:max-w-[180px] h-[1.4rem] 
              ${getClassNewMsgNotSeen(conversation)}`"
            >
              {{ getLastMessage(conversation).content }}
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getConversationOfUser } from '@/api/conversation'
import {
  filterByName,
  mergeUseIndividualConversation,
} from '~/helper/conversation'

export default {
  data() {
    return {
      resultSearchAll: null,
      resultSearch: null,
    }
  },

  computed: {
    ...mapGetters({
      getKeySearch: 'searchSidebarConversation/getKeySearch',
    }),

    getCurrentEmail() {
      if (process.server) {
        return this.$store.getters['account/getAccount']
      } else {
        return localStorage.getItem('email')
      }
    },

    getClassNameNotSeen() {
      return (conversation) =>
        conversation.seen.includes(this.getCurrentEmail) ? '' : 'font-medium'
    },

    getClassNewMsgNotSeen() {
      return (conversation) =>
        conversation.seen.includes(this.getCurrentEmail)
          ? 'text-gray-400'
          : 'text-dark_primary font-medium'
    },

    getClassIsOnline() {
      return (partnerUser) => {
        return partnerUser.isActive ? 'bg-success' : 'bg-gray-300'
      }
    },

    getLastMessage() {
      return (conversation) => {
        return conversation.lastMessage ? conversation.lastMessage : ''
      }
    },
  },

  watch: {
    getKeySearch(newValue) {
      if (this.resultSearchAll) {
        this.resultSearch = filterByName(this.resultSearchAll, newValue)
      }
    },
  },

  async created() {
    const conversationOfCurrentUser = await getConversationOfUser(
      this.getCurrentEmail
    )

    if (conversationOfCurrentUser) {
      const individualChat = conversationOfCurrentUser.filter(
        (conversation) => conversation.type === 'individual'
      )

      const groupChat = conversationOfCurrentUser.filter(
        (conversation) => conversation.type === 'group'
      )

      await mergeUseIndividualConversation(individualChat, this.getCurrentEmail)

      this.resultSearchAll = [...individualChat, ...groupChat]
    }
  },
}
</script>
