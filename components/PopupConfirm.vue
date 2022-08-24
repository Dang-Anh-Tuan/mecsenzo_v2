<template>
  <div class="fixed top-0 left-0 bottom-0 right-0 overflow-hidden z-[1000]">
    <div class="w-full h-full bg-[rgba(0,0,0,0.5)]" @click="closeModal"></div>
    <div
      class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[380px] min-h-[200px] sm:w-[480px] bg-white shadow-xl rounded-[25px] p-[32px] py-10 px-10"
    >
      <div class="text-center">
        <p class="text-[1rem] sm:text-[1.2rem] font-medium">{{ content }}</p>
      </div>
      <div class="w-full">
        <div
          class="mt-8 mx-auto w-full sm:w-[80%] flex justify-between items-end h-[50px]"
        >
          <Button color="#ff7200" size="large" :handle-click="handleConfirm">
            {{ nameBtnAction }}
          </Button>
          <Button
            color="#ff7200"
            variant="outline"
            size="large"
            :handle-click="closeModal"
            >{{ $t('profileModal.close') }}</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: () => '',
    },

    nameBtnAction: {
      type: String,
      default: () => this.$t('popupConfirm.accept'),
    },
  },

  emits: ['close-popup', 'confirm-popup'],

  methods: {
    closeModal() {
      this.$emit('close-popup')
    },

    handleConfirm() {
      this.$emit('confirm-popup')
    },
  },
}
</script>

<style></style>
