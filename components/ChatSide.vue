<template>
  <div
    :class="`flex-1 flex flex-col ml-0 md:ml-4 bg-white shadow-2xl rounded-[20px]  
    p-[36px] sm:pl-[100px]  md:pl-[36px] overflow-x-hidden dark:bg-dark_bg_light
    ${getShowSidebarConversation ? 'pl-[100px]' : 'pl-[36px]'}
    `"
  >
    <div v-if="getIsShowLoader" class="h-[50px]">
      <LoaderUser />
    </div>
    <HeaderChatSide
      v-if="conversationRealtime"
      :info-conversation="getHeaderChatSideData"
      :is-show-sidebar-conversation="getShowSidebarConversation"
      @header-chat-side:show-add-member="handleShowModalAddMember"
      @header-chat-side:show-modal-conversation="showModalConversation"
      @header-chat-side:leave-room="handleShowPopupLeaveRoom"
      @header-chat-side:create-video-call="handleCreateVideoCall"
    />
    <Separation />
    <ListMessage
      :list-message-data="getListMessageData"
      @list-msg:load-more-message="handleLoadMoreMessage"
      @list-msg:set-reply="handleSetReplyMessage"
      @list-msg:show-image-detail="handleShowImageDetail"
    />
    <PreviewReply
      v-if="replyMessage"
      :reply-message="replyMessage"
      @clear-reply-message="clearReplyMessage"
    />
    <PreviewImageInput
      :file-image-input="fileImageInput"
      :percent-upload-image="percentUploadImage"
      @clear-temp-input-image="handleClearTempInputImage"
    />
    <PreviewVoiceChat
      :is-show-preview-chat-voice="isShowPreviewChatVoice"
      @close-preview="handleClosePreviewChatVoice"
      @set-data-chat-voice="handleSetDataChatVoice"
    />
    <ChatSideFooter
      :color-btn="
        conversationRealtime ? conversationRealtime.colorChat : '#0084ff'
      "
      :is-disable-input-message="isDisableInputMessage"
      @set-file-image-input="handleSetFileImageInput"
      @show-preview-chat-voice="handleShowPreviewChatVoice"
      @send-message="handleSendMessage"
      @focus-input-message="handleFocusInputMessage"
      @blur-input-message="handleBlurInputMessage"
      @select-emoji="handleSelectEmoji"
      @update:input-message="updateInputMessage"
    />
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
    <ModalAddMember
      v-if="
        conversationRealtime &&
        conversationRealtime.type === 'group' &&
        isShowModalAddMember
      "
      :conversation="conversationRealtime"
      @closeModal="handleCloseModalAddMember"
    />
    <PopupConfirm
      v-if="
        conversationRealtime &&
        conversationRealtime.type === 'group' &&
        isShowPopupLeaveRoom
      "
      :content="$t('popupConfirm.leaveRoomContent')"
      :name-btn-action="$t('popupConfirm.leaveRoom')"
      @close-popup="handleClosePopupLeaveRoom"
      @confirm-popup="handleLeaveRoom"
    />
    <ShowImageMessage
      v-if="srcImageShow"
      :src="srcImageShow"
      @close-show-image-message="handleCloseShowImageMessage"
    />
    <ModalCallVideo
      v-if="isShowModalCallVideo"
      :info-video-call="infoVideoCall"
      :current-message-video-call="currentMessageVideoCall"
      @cancel-video-call="handleCancelVideoCall"
      @close-video-call="handleCloseVideoCall"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { serverTimestamp } from '@firebase/firestore'
import Separation from './Separation.vue'
import ListMessage from './ListMessage.vue'
import HeaderChatSide from './HeaderChatSide.vue'
import PreviewReply from './PreviewReply.vue'
import PreviewImageInput from './PreviewImageInput.vue'
import ModalCallVideo from './ModalCallVideo.vue'
import LoaderUser from './LoaderUser.vue'
import PreviewVoiceChat from './PreviewVoiceChat.vue'
import ChatSideFooter from './ChatSideFooter.vue'

import {
  saveMessage,
  getMessageByConversation,
  saveMessageVideoCall,
  updateMessageVideoCall,
  getMessageRealtime,
} from '~/api/message.api'
import {
  getConversationByIdRealTime,
  getConversationById,
  updateConversation,
} from '~/api/conversation'
import { createTempUrlForImageFile } from '~/helper/FileHelper'
import { uploadByBlobUrl, uploadImage } from '~/helper/FirebaseHelper'
import { getUserByEmail, getUsersByEmails, updateUser } from '~/api/user.api'
import { constant } from '~/constants/constant'
import stringee from '@/api/stringee'

export default {
  components: {
    Separation,
    ListMessage,
    HeaderChatSide,
    PreviewReply,
    PreviewImageInput,
    ModalCallVideo,
    LoaderUser,
    PreviewVoiceChat,
    ChatSideFooter,
  },

  data() {
    return {
      currentConversation: null,
      listMessage: null,
      lastDocMessage: null,
      unsubscribeSnapMessage: null,
      unsubscribeLoadMoreMsg: null,
      inputMessage: '',
      replyMessage: null,
      conversationRealtime: null,
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
    }
  },

  head() {
    return {
      title: this.getTitlePage,
    }
  },

  computed: {
    ...mapGetters({
      getCurrentMembers: 'conversation/getCurrentMembers',
      getShowSidebarConversation: 'sidebarConversation/getIsShow',
      getCurrentEmail: 'account/getAccount',
    }),

    getPartnerUser() {
      const currentMembers = this.getCurrentMembers

      const partnerUser = currentMembers.filter(
        (user) => user.email !== this.getCurrentEmail
      )[0]

      return partnerUser
    },

    getCurrentUser() {
      const currentMembers = this.getCurrentMembers

      return currentMembers.filter(
        (user) => user.email === this.getCurrentEmail
      )[0]
    },

    getConversationInfo() {
      if (this.conversationRealtime) {
        if (this.conversationRealtime.type === 'group')
          return {
            name: this.conversationRealtime.name,
            avatar: this.conversationRealtime.thumb,
          }

        const partnerUser = this.getPartnerUser

        return partnerUser
          ? { name: partnerUser.fullName, avatar: partnerUser.avatar }
          : { name: '', avatar: null }
      }

      return { name: '', avatar: null }
    },

    getStatusPartner() {
      const partnerUser = this.getPartnerUser

      if (partnerUser) {
        return partnerUser.isActive
      }
      return false
    },

    getUsersSeen() {
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

    getUsersTyping() {
      if (this.conversationRealtime && this.conversationRealtime.isTyping) {
        const currentMembers = this.getCurrentMembers
        const emailTyping = this.conversationRealtime.isTyping.filter(
          (email) => email !== this.getCurrentEmail
        )

        const userTyping = currentMembers.filter(
          (user) => emailTyping.includes(user.email) && user.isActive
        )
        return userTyping
      }
      return []
    },

    getListMessageFooterData() {
      return {
        userTyping: this.getUsersTyping,
        usersSeen: this.getUsersSeen,
      }
    },

    getListMessageData() {
      return {
        footerData: this.getListMessageFooterData,
        listMessage: this.listMessage,
        conversation: this.conversationRealtime,
      }
    },

    getHeaderChatSideData() {
      return {
        avatar: this.getConversationInfo.avatar,
        name: this.getConversationInfo.name,
        conversation: this.conversationRealtime,
        statusPartner: this.getStatusPartner,
      }
    },

    getIsShowLoader() {
      return !this.conversationRealtime
    },

    getTitlePage() {
      if (this.conversationRealtime) {
        if (this.conversationRealtime.type === 'individual') {
          return this.conversationRealtime.partnerUser.fullName
        }
        return this.conversationRealtime.name
      }
      return 'Mecsenzo'
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

    async currentMessageVideoCall(newValue) {
      if (newValue.status === 'accept') {
        this.flagAutoCancelVideoCall = false
        this.$router.push({
          path: 'video-chat',
          params: { id: this.currentMessageVideoCall.id },
          name: `video-chat-id___${this.$i18n.locale}`,
        })
      } else if (newValue.status === 'cancel') {
        this.isShowModalCallVideo = false
        await updateUser({ ...this.getCurrentUser, isFreeVideoCall: true })
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

  mounted() {
    stringee.setRestToken()
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
    updateInputMessage(value) {
      this.inputMessage = value
    },

    handleSelectEmoji(emoji) {
      this.inputMessage = this.inputMessage + emoji.data
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

    async updateConversationWhenSendMessage(newMessage) {
      await updateConversation({
        ...this.conversationRealtime,
        lastMessage: newMessage,
        timeEnd: serverTimestamp(),
        seen: [this.getCurrentEmail],
      })
    },

    async sendMessage(content, type) {
      const userSendMessage = this.getCurrentUser

      const newMessage = await saveMessage(
        this.conversationRealtime.id,
        userSendMessage,
        content,
        this.replyMessage,
        type
      )

      await this.updateConversationWhenSendMessage(newMessage)
    },

    async saveMessageImage(url) {
      await this.sendMessage(url, 'image')
      this.handleClearTempInputImage()

      this.percentUploadImage = null
      this.replyMessage = null
    },

    async saveMessageVoice(url) {
      await this.sendMessage(url, 'audio')
      this.handleClosePreviewChatVoice()

      this.replyMessage = null
    },

    setPercentLoaderImage(percent) {
      this.percentUploadImage = percent
    },

    async handleSendMessage() {
      if (this.fileImageInput) {
        uploadImage(
          'message-image',
          this.fileImageInput,
          this.saveMessageImage,
          this.setPercentLoaderImage
        )
      } else if (this.dataChatVoice) {
        uploadByBlobUrl(
          'message-voice',
          this.dataChatVoice.blob,
          this.dataChatVoice.fileName,
          this.saveMessageVoice
        )
      } else if (this.inputMessage) {
        await this.sendMessage(this.inputMessage, 'text')

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

    handleCloseModalAddMember() {
      this.isShowModalAddMember = false
    },

    handleShowModalAddMember() {
      this.isShowModalAddMember = true
    },

    handleClosePopupLeaveRoom() {
      this.isShowPopupLeaveRoom = false
    },

    handleShowPopupLeaveRoom() {
      this.isShowPopupLeaveRoom = true
    },

    async handleLeaveRoom() {
      this.handleClosePopupLeaveRoom()

      await updateConversation({
        ...this.conversationRealtime,
        member: this.conversationRealtime.member.filter(
          (email) => email !== this.getCurrentEmail
        ),
      })

      this.$router.push({
        path: '/',
        name: `index___${this.$i18n.locale}`,
      })
    },

    handleSetFileImageInput(fileImage) {
      this.fileImageInput = createTempUrlForImageFile(fileImage)
      this.isDisableInputMessage = true

      if (this.fileImageInput) {
        this.inputMessage = ''
      }
      if (this.isShowPreviewChatVoice) {
        this.isShowPreviewChatVoice = null
        this.dataChatVoice = null
      }
    },

    handleClearTempInputImage() {
      this.fileImageInput = null
      this.isDisableInputMessage = false
    },

    handleShowImageDetail(src) {
      this.srcImageShow = src
    },

    handleCloseShowImageMessage() {
      this.srcImageShow = null
    },

    handleShowPreviewChatVoice() {
      this.isShowPreviewChatVoice = true
      this.isDisableInputMessage = true
      this.inputMessage = ''

      if (this.fileImageInput) {
        this.fileImageInput = null
      }
    },

    handleClosePreviewChatVoice() {
      this.isShowPreviewChatVoice = false
      this.dataChatVoice = null
      this.inputMessage = ''
      this.isDisableInputMessage = false
    },

    handleSetDataChatVoice(payload) {
      this.dataChatVoice = payload
    },

    async handleCreateVideoCall() {
      const roomVideoCall = await stringee.createRoom(
        this.conversationRealtime.id
      )

      this.flagAutoCancelVideoCall = true

      const newMessage = await saveMessageVideoCall(
        this.conversationRealtime.id,
        this.getCurrentUser,
        roomVideoCall
      )

      await this.updateConversationWhenSendMessage(newMessage)

      this.isShowModalCallVideo = true

      this.currentMessageVideoCall = newMessage

      if (this.conversationRealtime.type === 'individual') {
        const partnerUser = this.getPartnerUser
        const partnerUserQuery = await getUserByEmail(partnerUser.email)
        const currentUser = this.getCurrentUser

        this.infoVideoCall = {
          avatar: partnerUserQuery.avatar,
          name: partnerUserQuery.fullName,
        }

        if (partnerUserQuery.isFreeVideoCall === false) {
          this.currentMessageVideoCall = {
            ...this.currentMessageVideoCall,
            status: 'cancel',
          }
          await this.handleCancelVideoCall()
        } else {
          await updateUser({ ...partnerUserQuery, isFreeVideoCall: false })
          await updateUser({ ...currentUser, isFreeVideoCall: false })

          setTimeout(async () => {
            if (this.flagAutoCancelVideoCall) {
              await this.handleCancelVideoCall()
              this.handleCloseVideoCall()
              await updateUser({ ...partnerUserQuery, isFreeVideoCall: true })
              await updateUser({ ...currentUser, isFreeVideoCall: true })

              if (this.unsubscribeCurrentMessageVideoCall) {
                this.unsubscribeCurrentMessageVideoCall()
              }
            }
          }, constant.MILISECONDS_CANCEL_VIDEO_CALL)

          this.unsubscribeCurrentMessageVideoCall = getMessageRealtime(
            this.currentMessageVideoCall.id,
            this.setCurrentMessageVideoCall
          )
        }
      } else {
        const emailMemberOfConversation = this.conversationRealtime.member
        const userOfConversation = await getUsersByEmails(
          emailMemberOfConversation
        )
        userOfConversation.forEach(async (user) => {
          await updateUser({ ...user, isFreeVideoCall: false })
        })

        this.$router.push({
          path: 'video-chat',
          params: { id: this.currentMessageVideoCall.id },
          name: `video-chat-id___${this.$i18n.locale}`,
        })

        this.infoVideoCall = {
          avatar: this.conversationRealtime.thumb,
          name: this.conversationRealtime.name,
        }
      }
    },

    async handleCancelVideoCall() {
      const newLastMessage = {
        ...this.currentMessageVideoCall,
        status: 'cancel',
      }
      await updateMessageVideoCall(newLastMessage)
      await this.updateConversationWhenSendMessage(newLastMessage)
    },

    handleCloseVideoCall() {
      this.isShowModalCallVideo = false
      this.flagAutoCancelVideoCall = false
    },

    setCurrentMessageVideoCall(message) {
      this.currentMessageVideoCall = message
    },
  },
}
</script>
