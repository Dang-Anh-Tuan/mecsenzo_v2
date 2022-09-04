<template>
  <div
    v-if="footerListMessageData"
    class="relative flex text-gray-500 py-2 right-[-4px] justify-between"
  >
    <ShowTyping :user-typing="footerListMessageData.userTyping" />
    <ShowSeenMessage :users-seen="footerListMessageData.usersSeen" />
  </div>
</template>

<script>
import ShowTyping from './ShowTyping.vue'
import ShowSeenMessage from './ShowSeenMessage.vue'
export default {
  components: { ShowTyping, ShowSeenMessage },
  props: {
    footerListMessageData: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style></style>
