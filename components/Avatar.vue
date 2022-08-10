<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div :class="`rounded-full select-none ${getClassSize}`">
    <div v-if="isHaveAvatar" class="w-full h-full">
      <img
        :src="srcImage"
        alt=""
        class="w-full h-full object-cover rounded-full"
      />
    </div>
    <div
      v-else
      class="w-full h-full bg-dark_primary flex items-center justify-center rounded-full"
    >
      <p :class="`uppercase font-bold  text-white ${getClassSizeText}`">
        {{ firstChar }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isHaveAvatar: Boolean,
    firstChar: {
      type: String,
      default: () => {
        return ''
      },
    },
    srcImage: {
      type: String,
      default: () => {
        return ''
      },
    },
    size: {
      type: String,
      default: () => 'medium',
    },
  },
  computed: {
    getClassSize() {
      const sizeWith = {
        small: 26,
        medium: 44,
        large: 100,
      }

      return `w-[${sizeWith[this.size]}px] h-[${sizeWith[this.size]}px]`
    },
    getClassSizeText() {
      const sizeText = {
        small: 0.8,
        medium: 1.2,
        large: 2,
      }

      return `text-[${sizeText[this.size]}rem] `
    },
  },
}
</script>
