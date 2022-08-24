<template>
  <div
    :class="`flex-1 flex flex-col ml-0 md:ml-4 bg-white shadow-2xl rounded-[20px] 
    p-[36px] sm:pl-[100px]  md:pl-[36px] overflow-x-hidden 
    ${getShowSidebarConversation ? 'pl-[100px]' : 'pl-[36px]'}
    `"
  >
    <div class="flex justify-between items-center">
      <div class="h-[50px] w-full flex items-center justify-between">
        <div class="flex items-center">
          <div class="relative z-[10]">
            <avatar
              :is-have-avatar="!!getConversationInfo[1]"
              :src-image="getConversationInfo[1]"
              :first-char="
                getConversationInfo[0] && getConversationInfo[0].charAt(0)
              "
            />
            <div
              v-if="getCurrentConversationType === 'individual'"
              :class="`absolute w-[12px] h-[12px] rounded-full  bottom-0 right-0
              ${getStatusPartner ? 'bg-success' : 'bg-gray-300'}`"
            ></div>
          </div>
          <div class="conversation-content ml-4">
            <p class="select-none font-semibold">
              {{ getConversationInfo[0] }}
            </p>
            <p
              v-if="getCurrentConversationType === 'individual'"
              class="select-none truncate text-ellipsis text-[0.9rem] max-w-[180px] h-[1.4rem] text-gray-500"
            >
              {{
                getStatusPartner
                  ? $t('chatSide.active')
                  : $t('chatSide.offline')
              }}
            </p>
          </div>
        </div>
        <div v-for="n in 1" :key="n" class="flex items-center">
          <button
            v-if="getCurrentConversationType === 'group'"
            ref="btnHeader"
            class="p-2 w-[40px] h-[40px] rounded-full text-[1.2rem] flex justify-center items-center hover:bg-slate-200"
          >
            <fa icon="user-plus" />
          </button>
          <button
            ref="btnHeader"
            class="p-2 w-[40px] h-[40px] rounded-full text-[1.2rem] flex justify-center items-center hover:bg-slate-200"
          >
            <fa icon="video" />
          </button>
          <button
            ref="btnHeader"
            class="p-2 w-[40px] h-[40px] rounded-full text-[1.2rem] flex justify-center items-center hover:bg-slate-200"
            @click="showModalConversation"
          >
            <fa icon="circle-info" />
          </button>
        </div>
      </div>
    </div>
    <Separation />
    <div
      id="container-msg"
      ref="containerMsg"
      class="flex-1 overflow-y-auto p-2"
      @scroll="onScrollContainerMessage"
    >
      <div class="h-[90%] flex flex-col-reverse justify-end">
        <div
          class="relative flex text-gray-500 py-2 right-[-4px] justify-between"
        >
          <div class="flex items-center">
            <div
              v-if="getIsTyping.length > 0"
              class="flex justify-center items-center text-[0.8rem]"
            >
              {{ $t('chatSide.typing') }}
              <div
                class="dot-typing animate-[dotTyping_0.8s_ease-in_infinite] ml-4"
              ></div>
            </div>
          </div>
          <div
            v-if="getSeenUser.length > sizeSeenMessage"
            class="relative flex justify-end text-gray-500 py-2 right-[-4px]"
          >
            <avatar
              v-for="n in sizeSeenMessage"
              :key="n"
              :is-have-avatar="!!getSeenUser[n - 1].avatar"
              :src-image="getSeenUser[n - 1].avatar"
              :first-char="
                getSeenUser[n - 1] && getSeenUser[n - 1].fullName.charAt(0)
              "
              size="tiny"
              class="mr-1"
            ></avatar>
            <div
              class="bg-gray-500 text-white text-[0.6rem] w-[16px] h-[16px] rounded-full flex justify-center items-center select-none"
            >
              {{ `+${getSeenUser.length - sizeSeenMessage}` }}
            </div>
          </div>
          <div
            v-else
            class="relative flex justify-end text-gray-500 py-2 right-[-4px]"
          >
            <avatar
              v-for="user in getSeenUser"
              :key="user.id"
              :is-have-avatar="!!user.avatar"
              :src-image="user.avatar"
              :first-char="user && user.fullName.charAt(0)"
              size="tiny"
              class="mr-1"
            ></avatar>
          </div>
        </div>

        <div
          v-for="(message, index) in listMessage"
          :key="index"
          class="flex flex-col-reverse"
        >
          <div
            v-if="isMyMessage(message)"
            class="flex flex-row-reverse items-end justify-start mt-3"
          >
            <div class="max-w-[80%] md:max-w-[45%] rounded-[10px] peer">
              <div
                v-if="message.reply !== null"
                class="ml-2 p-2 bg-[#f6f9fa] rounded-[10px]"
              >
                <p class="text-[1rem] text-gray-500 w-fit">
                  {{ message.reply.content }}
                </p>
              </div>
              <div
                v-tooltip.top-start="{
                  content: getTooltipContent(message.timestamp),
                  classes: 'tooltip tooltip--left',
                }"
                :class="`ml-2 p-2 rounded-[10px] w-fit ${getBgMessage}`"
              >
                <p class="text-[1.1rem] text-white">
                  {{ message.content }}
                </p>
              </div>
            </div>

            <div
              class="relative hidden peer-hover:block before:content-[''] before:absolute before:w-[14px] before:h-full before:bg-transparent hover:block right-2 before:left-[100%]"
            >
              <button
                class="h-[32px] w-[32px] rounded-full flex items-center justify-center hover:bg-slate-200"
                @click="handleSetReplyMessage(message)"
              >
                <fa icon="reply" />
              </button>
            </div>
          </div>
          <div v-else class="flex items-end mt-3">
            <avatar
              :is-have-avatar="!!message.user.avatar"
              :src-image="message.user.avatar"
              :first-char="message.user && message.user.fullName.charAt(0)"
              size="small"
            />
            <div class="max-w-[80%] md:max-w-[45%] rounded-[10px] peer">
              <div
                v-if="message.reply !== null"
                class="ml-2 p-2 bg-[#f6f9fa] rounded-[10px] w-fit"
              >
                <p class="text-[1rem] text-gray-500">
                  {{ message.reply.content }}
                </p>
              </div>
              <div
                v-tooltip.top-start="{
                  content: getTooltipContent(message.timestamp),
                  classes: 'tooltip tooltip--left',
                }"
                class="ml-2 p-2 bg-gray-200 rounded-[10px] w-fit"
              >
                <p class="text-[1.1rem]">{{ message.content }}</p>
              </div>
            </div>

            <div
              class="relative left-2 hidden peer-hover:block before:content-[''] before:absolute before:w-[14px] before:h-full before:bg-transparent hover:block before:right-[100%]"
            >
              <button
                class="h-[32px] w-[32px] rounded-full flex items-center justify-center hover:bg-slate-200"
                @click="handleSetReplyMessage(message)"
              >
                <fa icon="reply" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="replyMessage"
      class="flex justify-between h-[50px] border-t-[1px] border-black mt-2"
    >
      <div class="w-[50%]">
        <p
          class="text-[0.9rem] truncate text-ellipsis max-w-[200px] md:max-w-[300px]"
        >
          Đang trả lời
          <span class="font-semibold">{{ replyMessage.user.fullName }}</span>
        </p>
        <p
          class="text-[0.9rem] text-[#9e9fa2] truncate text-ellipsis max-w-[200px] md:max-w-[300px]"
        >
          {{ replyMessage.content }}
        </p>
      </div>
      <button class="w-[50px] h-full" @click="clearReplyMessage">
        <fa icon="xmark" />
      </button>
    </div>
    <div v-for="n in 1" :key="n" class="h-[10%] w-full flex items-center">
      <div class="flex justify-center items-center">
        <div
          class="relative h-[32px] w-[32px] rounded-full mr-2 flex items-center justify-center hover:bg-slate-200"
        >
          <input
            id="input-image"
            type="file"
            class="opacity-0 z-[-1] absolute"
          />
          <label for="input-image" class="cursor-pointer">
            <fa ref="iconFooter" icon="image" class="text-[1.2rem]" />
          </label>
        </div>
        <button
          class="h-[32px] w-[32px] rounded-full mr-2 flex items-center justify-center hover:bg-slate-200"
        >
          <fa ref="iconFooter" icon="microphone" class="text-[1.2rem]" />
        </button>
      </div>
      <form
        class="flex-1 flex items-center"
        @submit.prevent="handleSendMessage"
      >
        <div class="relative flex-1 h-full">
          <input
            ref="inputMessage"
            v-model="inputMessage"
            v-focus
            type="text"
            class="w-full px-3 py-2 pr-[60px] appearance-none outline-none rounded-full bg-slate-200"
            :placeholder="$t('chatSide.inputPlaceholder')"
            @focus="handleFocusInputMessage"
            @blur="handleBlurInputMessage"
          />
          <div
            class="absolute right-0 top-0 h-full w-[50px] flex justify-center items-center cursor-pointer noSelect"
            @click="toggleEmojiPicker"
          >
            <img
              src="@/assets/images/icon.png"
              alt="emoji"
              class="w-[28px] object-fill select-none"
            />
            <div
              v-if="checkIsClientSide && isShowIconPicker"
              class="absolute w-[50px] h-[50px]"
            >
              <VEmojiPicker
                ref="emojiPicker"
                class="absolute right-[-50px] md:right-[0px] translate-y-[calc(-100%)] w-[200px] h-[330px]"
                :show-search="false"
                @select="handleSelectEmoji"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="h-[40px] w-[40px] ml-2 rounded-full flex items-center justify-center hover:bg-slate-200"
        >
          <fa ref="iconFooter" icon="paper-plane" class="text-[1.2rem]" />
        </button>
      </form>
    </div>
    <div
      :class="`noSelect cursor-pointer absolute w-[50px] 
      h-[50px] top-[30%] left-[0] flex sm:hidden
      justify-center items-center bg-white rounded-full 
      text-dark_primary shadow-xl hover:bg-dark_primary hover:text-white
      transition-all
      ${
        getShowSidebarConversation
          ? 'translate-x-[70px]'
          : 'translate-x-[-20px]'
      }`"
      @click="handleToggleSidebarMobile"
    >
      <fa v-if="!getShowSidebarConversation" icon="angles-right" class="ml-3" />
      <fa v-else icon="angles-left" class="ml-3" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { VEmojiPicker } from 'v-emoji-picker'
import { serverTimestamp } from '@firebase/firestore'
import Separation from './Separation.vue'
import { saveMessage, getMessageByConversation } from '~/api/message.api'
import {
  getConversationByIdRealTime,
  getConversationById,
  updateConversation,
} from '~/api/conversation'
import { formatDateForMessage } from '~/helper/date'
import { constant } from '~/constants/constant'

export default {
  components: { Separation, VEmojiPicker },

  data() {
    return {
      currentConversation: null,
      listMessage: null,
      lastDocMessage: null,
      unsubscribeSnapMessage: null,
      unsubscribeLoadMoreMsg: null,
      isShowIconPicker: false,
      inputMessage: '',
      replyMessage: null,
      isScrollToBottom: true,
      conversationRealtime: null,
      unsubscribeGetConversationRealtime: null,
      sizeSeenMessage: constant.SIZE_SEEN_MESSAGE,
    }
  },

  computed: {
    ...mapGetters({
      getCurrentMembers: 'conversation/getCurrentMembers',
      getShowSidebarConversation: 'sidebarConversation/getIsShow',
    }),

    checkIsClientSide() {
      return !process.server
    },

    getCurrentEmail() {
      if (process.server) {
        return this.$store.getters['account/getAccount']
      } else {
        return localStorage.getItem('email')
      }
    },

    getCurrentConversationType() {
      const currentConversation = this.conversationRealtime

      return currentConversation ? currentConversation.type : ''
    },

    getPartnerUser() {
      const currentMembers = this.getCurrentMembers

      const partnerUser = currentMembers.filter(
        (user) => user.email !== this.getCurrentEmail
      )[0]

      return partnerUser
    },

    getConversationInfo() {
      if (this.conversationRealtime) {
        if (this.conversationRealtime.type === 'group')
          return [
            this.conversationRealtime.name,
            this.conversationRealtime.thumb,
          ]

        const partnerUser = this.getPartnerUser

        return partnerUser
          ? [partnerUser.fullName, partnerUser.avatar]
          : ['', null]
      }

      return ['', null]
    },

    getStatusPartner() {
      const partnerUser = this.getPartnerUser

      if (partnerUser) {
        return partnerUser.isActive
      }
      return false
    },

    getSeenUser() {
      if (
        this.conversationRealtime &&
        this.conversationRealtime.lastMessage &&
        this.conversationRealtime.lastMessage.user.email ===
          this.getCurrentEmail
      ) {
        const currentMembers = this.getCurrentMembers
        return currentMembers.filter(
          (member) =>
            member.email !== this.getCurrentEmail &&
            this.conversationRealtime.seen.includes(member.email)
        )
      }
      return []
    },

    getIsTyping() {
      if (this.conversationRealtime && this.conversationRealtime.isTyping) {
        const emailTyping = this.conversationRealtime.isTyping.filter(
          (email) => email !== this.getCurrentEmail
        )
        return emailTyping
      }
      return []
    },

    isMyMessage() {
      return (message) => {
        if (message.user.email === this.getCurrentEmail) return true
        return false
      }
    },

    formatDateForMessage() {
      return (timestamp) => {
        return formatDateForMessage(timestamp)
      }
    },

    getTooltipContent() {
      return (time) => this.formatDateForMessage(time)
    },

    getBgMessage() {
      if (this.conversationRealtime) {
        return `bg-[${this.conversationRealtime.colorChat}]`
      }
      return 'bg-[#0084ff]'
    },
  },

  watch: {
    currentConversation(newValue) {
      if (newValue) {
        this.unsubscribeSnapMessage = getMessageByConversation(
          newValue.id,
          this.setListMessage,
          this.lastDocMessage
        )

        this.unsubscribeGetConversationRealtime = getConversationByIdRealTime(
          newValue.id,
          this.setConversationRealtime
        )
      }
    },
  },

  async created() {
    const idConversation = this.$route.params.id
    this.currentConversation = await getConversationById(idConversation)

    this.$store.dispatch(
      'conversation/setCurrentMembers',
      this.currentConversation.member
    )
  },

  updated() {
    this.setColorBtnHeader()
    this.scrollTopBottomContainerChat()
  },

  beforeDestroy() {
    if (this.unsubscribeSnapMessage) {
      this.unsubscribeSnapMessage()
    }

    if (this.unsubscribeGetConversationRealtime) {
      this.unsubscribeGetConversationRealtime()
    }
  },

  methods: {
    scrollTopBottomContainerChat() {
      if (this.isScrollToBottom) {
        this.$nextTick(() => {
          const containerMessage = this.$refs.containerMsg
          containerMessage.scrollTo({
            top: containerMessage.scrollHeight,
            behavior: 'smooth',
          })
        })
      }
    },

    toggleEmojiPicker() {
      this.isShowIconPicker = !this.isShowIconPicker
    },

    handleSelectEmoji(emoji) {
      this.inputMessage = this.inputMessage + emoji.data
      this.$refs.inputMessage[0].focus()
    },

    setColorBtnHeader() {
      this.$nextTick(() => {
        if (this.conversationRealtime) {
          this.$refs.btnHeader.forEach(
            (btn) => (btn.style.color = this.conversationRealtime.colorChat)
          )
          this.$refs.iconFooter.forEach(
            (btn) => (btn.style.color = this.conversationRealtime.colorChat)
          )
        } else {
          this.$refs.btnHeader.forEach((btn) => (btn.style.color = '#0084ff'))
          this.$refs.iconFooter.forEach((btn) => (btn.style.color = '#0084ff'))
        }
      })
    },

    handleToggleSidebarMobile() {
      this.$store.dispatch('sidebarConversation/toggleSidebar')
    },

    handleDocsMessage(listMessageDocs) {
      const listMessage = listMessageDocs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      const lastDocMessage = listMessageDocs[listMessageDocs.length - 1]

      return { listMessage, lastDocMessage }
    },

    setListMessage(listMessageDocs) {
      const { listMessage, lastDocMessage } =
        this.handleDocsMessage(listMessageDocs)

      this.listMessage = listMessage
      this.lastDocMessage = lastDocMessage
    },

    handleSetReplyMessage(message) {
      this.replyMessage = message
    },

    clearReplyMessage() {
      this.replyMessage = null
    },

    async handleSendMessage() {
      if (this.inputMessage) {
        const currentMembers = this.getCurrentMembers
        const userSendMessage = currentMembers.filter(
          (user) => user.email === this.getCurrentEmail
        )[0]

        const newMessage = await saveMessage(
          this.conversationRealtime.id,
          userSendMessage,
          this.inputMessage,
          this.replyMessage,
          'text'
        )

        await updateConversation({
          ...this.conversationRealtime,
          lastMessage: newMessage,
          timeEnd: serverTimestamp(),
          seen: [this.getCurrentEmail],
        })

        this.inputMessage = ''
        this.replyMessage = null
        this.isScrollToBottom = true
      }
    },

    loadMoreMessage(listMessageDocs) {
      const { listMessage, lastDocMessage } =
        this.handleDocsMessage(listMessageDocs)

      if (lastDocMessage && lastDocMessage.id !== this.lastDocMessage.id) {
        this.lastDocMessage = lastDocMessage
        this.listMessage = [...this.listMessage, ...listMessage]
      }
    },

    handleLoadMoreMessage() {
      this.unsubscribeLoadMoreMsg = getMessageByConversation(
        this.conversationRealtime.id,
        this.loadMoreMessage,
        this.lastDocMessage
      )
    },

    onScrollContainerMessage(e) {
      if (e.target.scrollTop === 0) {
        this.isScrollToBottom = false
        this.handleLoadMoreMessage()
      }
    },

    setConversationRealtime(doc) {
      this.conversationRealtime = { id: doc.id, ...doc.data() }
    },

    async handleFocusInputMessage() {
      if (this.conversationRealtime) {
        if (!this.conversationRealtime.seen.includes(this.getCurrentEmail)) {
          await updateConversation({
            ...this.conversationRealtime,
            seen: [...this.conversationRealtime.seen, this.getCurrentEmail],
          })
        }
        await updateConversation({
          ...this.conversationRealtime,
          isTyping: [
            ...this.conversationRealtime.isTyping,
            this.getCurrentEmail,
          ],
        })
      }
    },

    async handleBlurInputMessage() {
      if (this.conversationRealtime && this.conversationRealtime.isTyping) {
        const newIsTyping = this.conversationRealtime.isTyping.filter(
          (email) => email !== this.getCurrentEmail
        )
        await updateConversation({
          ...this.conversationRealtime,
          isTyping: newIsTyping,
        })
      }
    },

    showModalConversation() {
      this.$store.dispatch('modalChatRoom/openModal')
      this.$store.dispatch(
        'modalChatRoom/setConversation',
        this.conversationRealtime
      )
    },
  },
}
</script>
