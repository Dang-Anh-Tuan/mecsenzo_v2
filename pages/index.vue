<template>
  <div class="flex max-w-[1200px] m-auto mt-[100px] h-[80vh]">
    <AsyncSidebarConversation />

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
import ChatSide from '../components/ChatSide.vue'
import ModalConversation from '~/components/ModalConversation.vue'
import LoaderSideConversation from '~/components/LoaderSideConversation.vue'

const AsyncSidebarConversation = () => ({
  component: import('@/components/SidebarConversation.vue'),
  loading: LoaderSideConversation,
  error: LoaderSideConversation,
  delay: 0,
  timeout: 3000,
})

export default {
  name: 'IndexPage',

  components: {
    AsyncSidebarConversation,
    ChatSide,
    ModalConversation,
  },

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
