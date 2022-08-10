<template>
  <div>
    <h1 class="text-red-500 text-[1.6rem] bg-[#ccc] dark:text-[#fff]">
      Hello user : {{ getCurrentAccount }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  middleware: ['check-auth', 'auth-required'],
  computed: {
    getCurrentAccount() {
      const currentAccount = this.$store.getters['account/getAccount']
      return currentAccount || 'Not login'
    },
  },
}
</script>
