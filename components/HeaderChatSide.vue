<template>
  <div class="flex justify-between items-center">
    <div class="h-[50px] w-full flex items-center justify-between">
      <div class="flex items-center">
        <div class="relative z-[10]">
          <avatar
            :is-have-avatar="!!infoConversation.avatar"
            :src-image="infoConversation.avatar"
            :first-char="
              infoConversation.name && infoConversation.name.charAt(0)
            "
          />
          <div
            v-if="infoConversation.conversation.type === 'individual'"
            :class="`absolute w-[12px] h-[12px] rounded-full  bottom-0 right-0
              ${infoConversation.statusPartner ? 'bg-success' : 'bg-gray-300'}`"
          ></div>
        </div>
        <div class="conversation-content ml-4">
          <p
            :class="`select-none font-semibold truncate  max-w-[80px] sm:max-w-[300px] 
              ${isShowSidebarConversation ? 'hidden' : ''}
              `"
          >
            {{ infoConversation.name }}
          </p>
          <p
            v-if="infoConversation.conversation.type === 'individual'"
            class="select-none truncate text-[0.9rem] max-w-[180px] h-[1.4rem] text-gray-500"
          >
            {{
              infoConversation.statusPartner
                ? $t('chatSide.active')
                : $t('chatSide.offline')
            }}
          </p>
        </div>
      </div>
      <div class="flex items-center">
        <ButtonIcon
          v-if="infoConversation.conversation.type === 'group'"
          :color="getColorBtnIcon"
          @btn-icon-click="handleShowModalAddMember"
        >
          <fa icon="user-plus" />
        </ButtonIcon>
        <ButtonIcon
          :color="getColorBtnIcon"
          @btn-icon-click="handleCreateVideoCall"
        >
          <fa icon="video" />
        </ButtonIcon>
        <ButtonIcon
          :color="getColorBtnIcon"
          @btn-icon-click="showModalConversation"
        >
          <fa icon="circle-info" />
        </ButtonIcon>
        <ButtonIcon
          v-if="infoConversation.conversation.type === 'group'"
          :color="getColorBtnIcon"
          @btn-icon-click="handleShowPopupLeaveRoom"
        >
          <fa icon="arrow-right-from-bracket" />
        </ButtonIcon>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonIcon from './ButtonIcon.vue'

export default {
  components: { ButtonIcon },

  props: {
    infoConversation: {
      type: Object,
      default: () => {},
    },
    isShowSidebarConversation: Boolean,
  },

  emits: [
    'header-chat-side:show-add-member',
    'header-chat-side:show-modal-conversation',
    'header-chat-side:leave-room',
  ],

  computed: {
    getColorBtnIcon() {
      return this.infoConversation.conversation.colorChat
    },
  },

  methods: {
    handleShowModalAddMember() {
      this.$emit('header-chat-side:show-add-member')
    },

    showModalConversation() {
      this.$emit('header-chat-side:show-modal-conversation')
    },

    handleShowPopupLeaveRoom() {
      this.$emit('header-chat-side:leave-room')
    },

    handleCreateVideoCall() {
      this.$emit('header-chat-side:create-video-call')
    },
  },
}
</script>

<style></style>
