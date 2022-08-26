<template>
  <nuxt-link :to="link" @click.native="handleCloseNotify">
    <div class="py-3 px-1 cursor-pointer border-b-[1px] border-b-[#939496]">
      <p class="leading-[1.4rem]">
        <span class="font-semibold">{{ sender }}</span>
        {{ $t(getQueryTextNotifyContent) }}
      </p>
      <p class="mt-1 text-[0.9rem] italic text-gray-400">
        {{ getTimeNotify }}
      </p>
    </div>
  </nuxt-link>
</template>

<script>
import transformTimeStampToString from '~/helper/transformTimeStampToString'

export default {
  props: {
    sender: {
      type: String,
      default: () => '',
    },
    type: {
      type: String,
      default: () => '',
    },
    timestamp: {
      type: Object,
      default: () => null,
    },
    link: {
      type: Object,
      default: () => ({
        path: 'add-friend',
        name: `add-friend___${this.$i18n.locale}`,
      }),
    },
  },

  emits: ['closeNotify'],

  computed: {
    getQueryTextNotifyContent() {
      return `notify.${this.type}`
    },

    getTimeNotify() {
      const time = transformTimeStampToString(this.timestamp.seconds)
      return `${time.value} ${this.$t('time.' + time.type)} ${this.$t(
        'time.ago'
      )}`
    },
  },

  methods: {
    handleCloseNotify() {
      this.$emit('closeNotify')
    },
  },
}
</script>
