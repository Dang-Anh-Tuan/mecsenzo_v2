<template>
  <button
    v-if="type === 'button'"
    :type="type"
    :class="`outline-none min-w-[120px] text-[1.2rem] rounded-[20px] ${renderClassSize} ${renderClassColor}`"
    @click="handleClick"
  >
    <slot></slot>
  </button>
  <nuxt-link v-else-if="type === 'link'">
    <slot></slot>
  </nuxt-link>
  <input
    v-else-if="type === 'submit'"
    type="submit"
    :class="`outline-none min-w-[120px] text-[1.2rem] rounded-[20px] cursor-pointer ${renderClassSize} ${renderClassColor}`"
    :value="nameButton"
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: () => 'button',
    },
    size: {
      type: String,
      default: () => 'medium',
    },
    color: {
      type: String,
      default: () => '#007bff ',
    },
    variant: {
      type: String,
      default: () => 'contained',
    },
    handleClick: {
      type: Function,
      default: () => {
        return function () {}
      },
    },
    nameButton: {
      type: String,
      default: () => 'Submit',
    },
  },
  computed: {
    renderClassSize() {
      const sizeWidth = {
        small: [4, 8],
        medium: [6, 12],
        large: [8, 16],
      }

      return `px-[${sizeWidth[this.size][1]}px]
              py-[${sizeWidth[this.size][0]}px]`
    },
    renderClassColor() {
      if (this.variant === 'contained') {
        return `text-[#fff] bg-[${this.color}] border border-[${this.color}] hover:opacity-[0.7]`
      } else {
        return `text-[${this.color}] bg-[#fff]  border border-[${this.color}] hover:text-[#fff] hover:bg-[${this.color}]`
      }
    },
  },
}
</script>
