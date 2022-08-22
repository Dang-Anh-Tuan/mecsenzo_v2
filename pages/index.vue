<template>
  <div
    class="flex-1 flex justify-center items-center text-[1.1rem] text-gray-400 ml-4 bg-white shadow-2xl rounded-[20px] p-[36px] pl-[100px] md:pl-[36px]"
  >
    {{ $t('chatSide.noConversation') }}
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  layout: 'chat',

  middleware: ['check-auth', 'auth-required'],
}
</script>
