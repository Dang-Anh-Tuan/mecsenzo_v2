<template>
  <nuxt-link to="/" @click.native="handleCloseNotify">
    <div class="py-3 px-1 cursor-pointer border-b-[1px] border-b-[#939496]">
      <p class="leading-[1.4rem]">
        <span class="font-semibold"> Dang Anh Moi </span>
        da gui loi moi ket ban
      </p>
      <p class="mt-1 text-[0.9rem] italic text-gray-400">2 gio truoc</p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  emit: ['closeNotify'],

  methods: {
    handleCloseNotify() {
      this.$emit('closeNotify')
    },
  },
}
</script>
