<template>
  <div
    v-if="listMessageData"
    id="container-msg"
    ref="containerMsg"
    class="flex-1 overflow-y-auto p-2 overflow-hidden scroll-smooth"
    @scroll="onScrollContainerMessage"
  >
    <div class="h-[90%] flex flex-col-reverse justify-end">
      <div v-if="!listMessageData.listMessage">
        <LoaderMessage />
      </div>
      <ListMessageFooter
        :footer-list-message-data="listMessageData.footerData"
      />
      <div
        v-for="(message, index) in listMessageData.listMessage"
        :key="index"
        class="flex flex-col-reverse"
      >
        <Message
          :message="message"
          :conversation="listMessageData.conversation"
          @set-reply="handleSetReplyMessage"
          @show-image-detail="handleShowImageDetail"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listMessageData: {
      type: Object,
      default: () => null,
    },
  },

  emits: [
    'list-msg:load-more-message',
    'list-msg:set-reply',
    'list-msg:show-image-detail',
  ],

  data() {
    return {
      isScrollToBottom: true,
    }
  },

  updated() {
    this.scrollTopBottomContainerChat()
  },

  methods: {
    scrollTopBottomContainerChat() {
      if (this.isScrollToBottom) {
        const containerMessage = this.$refs.containerMsg
        containerMessage.scrollTo({
          top: containerMessage.scrollHeight,
          behavior: 'smooth',
        })
      }
    },

    onScrollContainerMessage(e) {
      if (e.target.scrollTop === 0) {
        this.$emit('list-msg:load-more-message')
        this.isScrollToBottom = false
      }
    },

    handleSetReplyMessage(replyMessage) {
      this.$emit('list-msg:set-reply', replyMessage)
    },

    handleShowImageDetail(srcImage) {
      this.$emit('list-msg:show-image-detail', srcImage)
    },
  },
}
</script>

<style></style>
