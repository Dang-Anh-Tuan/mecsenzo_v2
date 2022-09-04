<template>
  <button
    ref="btn"
    :type="type"
    class="p-2 w-[40px] h-[40px] rounded-full text-[1.2rem] flex justify-center items-center hover:bg-slate-200"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: () => '#0084ff',
    },

    type: {
      type: String,
      default: () => 'button',
    },
  },

  emits: ['btn-icon-click'],

  watch: {
    color: {
      handler(newValue) {
        if (this.$refs.btn) {
          this.$refs.btn.style.color = newValue
        }
      },
    },
  },

  mounted() {
    this.$refs.btn.style.color = this.color
  },

  methods: {
    handleClick() {
      this.$emit('btn-icon-click')
    },
  },
}
</script>
