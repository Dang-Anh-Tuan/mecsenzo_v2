<template>
  <div class="flex max-w-[1200px] m-auto mt-[100px] h-[80vh]">
    <SidebarConversation />
    <ChatSide />
  </div>
</template>

<script>
import SidebarConversation from '../components/SidebarConversation.vue'
import ChatSide from '../components/ChatSide.vue'
export default {
  name: 'IndexPage',

  components: { SidebarConversation, ChatSide },

  middleware: ['check-auth', 'auth-required'],
}
</script>
