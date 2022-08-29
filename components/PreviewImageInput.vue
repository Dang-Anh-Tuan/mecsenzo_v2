<template>
  <div
    v-if="fileImageInput"
    class="flex justify-between h-[100px] border-t-[1px] border-black mt-2"
  >
    <div class="relative flex items-center h-full max-w-[300px]">
      <img
        class="h-[90%] object-cover"
        :src="fileImageInput.preview"
        alt="image sent"
      />
      <div
        v-if="percentUploadImage"
        class="absolute top-[5%] left-0 h-[90%] w-full bg-[rgba(0,0,0,0.5)]"
      ></div>
      <ProgressLoader
        v-if="percentUploadImage"
        size="small"
        :percent="percentUploadImage"
      />
    </div>
    <button class="w-[50px] h-full" @click="handleClearTempInputImage">
      <fa icon="xmark" />
    </button>
  </div>
</template>

<script>
import ProgressLoader from './ProgressLoader.vue'

export default {
  components: { ProgressLoader },

  props: {
    fileImageInput: {
      type: File,
      default: () => null,
    },
    percentUploadImage: {
      type: Number,
      default: () => null,
    },
  },

  emits: ['clear-temp-input-image'],

  methods: {
    handleClearTempInputImage() {
      this.$emit('clear-temp-input-image')
    },
  },
}
</script>

<style></style>
