<template>
  <div class="flex max-w-[1200px] m-auto mt-[100px] h-[80vh]">
    <SidebarConversation @open-modal-add-space="openModalAddConversation" />
    <ChatSide />
    <div
      v-if="isShowModalConversation"
      class="absolute w-[100vw] h-[100vh] top-0 left-0 z-[100]"
    >
      <ModalConversation
        :is-create="isCreateConversation"
        @closeModal="closeModalConversation"
      />
    </div>
  </div>
</template>

<script>
import SidebarConversation from '../components/SidebarConversation.vue'
import ChatSide from '../components/ChatSide.vue'
import ModalConversation from '~/components/ModalConversation.vue'
export default {
  name: 'IndexPage',

  components: { SidebarConversation, ChatSide, ModalConversation },

  middleware: ['check-auth', 'auth-required'],

  data() {
    return {
      isShowModalConversation: false,
      isCreateConversation: true,
    }
  },

  methods: {
    closeModalConversation() {
      this.isShowModalConversation = false
    },

    openModalAddConversation() {
      this.isCreateConversation = true
      this.isShowModalConversation = true
    },
  },
}
</script>
