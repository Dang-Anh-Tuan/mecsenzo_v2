<template>
  <div>
    <Header />
    <div class="flex max-w-[1200px] m-auto mt-[100px] h-[80vh]">
      <SidebarConversation @open-modal-add-space="openModalAddConversation" />
      <Nuxt />
      <div
        v-if="getIsShowModal"
        class="absolute w-[100vw] h-[100vh] top-0 left-0 z-[100]"
      >
        <ModalConversation
          :conversation="getConversation"
          @closeModal="closeModalConversation"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '../components/Header.vue'
export default {
  name: 'Default',
  components: { Header },

  computed: {
    ...mapGetters({
      getIsShowModal: 'modalChatRoom/getIsShow',
      getConversation: 'modalChatRoom/getConversation',
    }),
  },

  methods: {
    closeModalConversation() {
      this.$store.dispatch('modalChatRoom/closeModal')
    },

    openModalAddConversation() {
      this.$store.dispatch('modalChatRoom/setConversation', null)
      this.$store.dispatch('modalChatRoom/openModal')
    },
  },
}
</script>
