<template>
  <div class="fixed top-0 left-0 bottom-0 right-0 overflow-hidden z-[1000]">
    <div
      class="w-full h-full bg-[rgba(0,0,0,0.5)]"
      @click="closeShowImageMessage"
    ></div>

    <img
      :src="src"
      alt="image message"
      class="max-w-[100%] max-h-[60%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    />

    <div class="absolute flex top-[32px] right-[32px]">
      <a
        :href="src"
        target="_blank"
        class="appearance-none px-2 py-1 text-white text-[1.2rem] mr-4 border border-white hover:bg-white hover:text-gray-400 transition-all"
      >
        <fa icon="arrow-down" />
      </a>
      <button
        class="appearance-none px-2 py-1 text-white text-[1.2rem] border border-white hover:bg-white hover:text-gray-400 transition-all"
        @click="closeShowImageMessage"
      >
        <fa icon="xmark" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
    },
  },

  emits: ['close-show-image-message'],

  methods: {
    closeShowImageMessage() {
      this.$emit('close-show-image-message')
    },
  },
}
</script>

<style></style>
