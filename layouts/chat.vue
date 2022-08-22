<template>
  <div>
    <Header />
    <div class="flex max-w-[1200px] m-auto mt-[100px] h-[80vh]">
      <SidebarConversation @open-modal-add-space="openModalAddConversation" />
      <Nuxt />
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
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  name: 'Default',
  components: { Header },

  data() {
    return {
      isShowModalConversation: false,
      isCreateConversation: true,
    }
  },

  created() {
    this.$store.dispatch('conversation/initConversation')
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
