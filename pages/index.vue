<template>
  <div
    :class="`flex-1 flex justify-center items-center ml-0 md:ml-4 text-gray-500 bg-white shadow-2xl rounded-[20px] 
    p-[36px]  md:pl-[36px] overflow-x-hidden dark:bg-dark_bg_light
     ${getShowSidebarConversation ? 'pl-[100px]' : 'pl-[36px]'}
    `"
  >
    {{ $t('chatSide.noConversation') }}
    <div
      :class="`noSelect cursor-pointer absolute w-[50px] 
      h-[50px] top-[30%] left-[0] flex sm:hidden
      justify-center items-center bg-white rounded-full 
      text-dark_primary shadow-xl hover:bg-dark_primary hover:text-white
      transition-all
      ${
        getShowSidebarConversation
          ? 'translate-x-[70px]'
          : 'translate-x-[-20px]'
      }`"
      @click="handleToggleSidebarMobile"
    >
      <fa v-if="!getShowSidebarConversation" icon="angles-right" class="ml-3" />
      <fa v-else icon="angles-left" class="ml-3" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',

  layout: 'chat',

  middleware: ['check-auth', 'auth-required'],

  computed: {
    ...mapGetters({
      getShowSidebarConversation: 'sidebarConversation/getIsShow',
    }),
  },

  methods: {
    handleToggleSidebarMobile() {
      this.$store.dispatch('sidebarConversation/toggleSidebar')
    },
  },
}
</script>
