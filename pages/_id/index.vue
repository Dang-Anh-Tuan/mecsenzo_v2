<template>
  <ChatSide />
</template>

<script>
import ChatSide from '../../components/ChatSide.vue'

export default {
  name: 'ChatPage',
  components: {
    ChatSide,
  },
  layout: 'chat',

  middleware: ['check-auth', 'auth-required'],
}
</script>
