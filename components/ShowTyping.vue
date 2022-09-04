<template>
  <div class="flex items-center">
    <div v-if="userTyping.length > 0">
      <div
        v-for="user in userTyping"
        :key="user.id"
        class="flex justify-center items-center text-[0.8rem]"
      >
        <avatar
          :is-have-avatar="!!user.avatar"
          :src-image="user.avatar"
          :first-char="user && user.fullName.charAt(0)"
          size="small"
          class="mr-1 mt-1"
        ></avatar>
        <div
          class="dot-typing animate-[dotTyping_0.8s_ease-in_infinite] ml-4"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userTyping: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style></style>
