<template>
  <div
    v-if="isShowPreviewChatVoice"
    class="`flex flex-row justify-between border-t-[1px] mt-2 w-full relative dark:!border-dark_text_strong`"
  >
    <Recorder @change-data-audio="handleChangeDataChatVoice" />
    <button
      class="absolute top-0 right-0 w-[50px] h-full"
      @click="closePreview"
    >
      <fa icon="xmark" class="dark:text-dark_text_strong" />
    </button>
  </div>
</template>

<script>
import Recorder from './Recorder.vue'
export default {
  components: { Recorder },

  props: {
    isShowPreviewChatVoice: Boolean,
  },

  emits: ['close-preview', 'set-data-chat-voice'],

  methods: {
    closePreview() {
      this.$emit('close-preview')
    },

    handleChangeDataChatVoice(payload) {
      this.$emit('set-data-chat-voice', payload)
    },
  },
}
</script>

<style></style>
