<template>
  <div>
    <div class="fixed top-0 left-0 bottom-0 right-0 overflow-hidden z-[1000]">
      <div
        class="w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
      >
        <div v-if="infoVideoCall" class="w-[60%] h-[60%]">
          <div class="flex justify-center items-center h-[90%]">
            <div class="flex flex-col items-center">
              <div>
                <Avatar
                  :is-have-avatar="!!infoVideoCall.avatar"
                  :src-image="infoVideoCall.avatar"
                  :first-char="
                    infoVideoCall.name && infoVideoCall.name.charAt(0)
                  "
                  size="large"
                />
              </div>
              <div>
                <p class="select-none text-[1.2rem] text-white font-medium">
                  {{ infoVideoCall.name }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div class="m-auto w-[80%] md:w-[60%] flex justify-center">
              <button
                v-if="currentMessageVideoCall.status === 'pending'"
                class="w-[68px] h-[68px] rounded-full bg-danger text-[1.2rem] text-white"
                @click="handleCancelVideoCall"
              >
                <fa icon="xmark" />
              </button>
              <button
                v-else
                class="w-[68px] h-[68px] rounded-full bg-danger text-[1.2rem] text-white"
                @click="handleCloseModalVideoCall"
              >
                <fa icon="dash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
export default {
  components: { Avatar },

  props: {
    infoVideoCall: {
      type: Object,
      default: () => null,
    },
    currentMessageVideoCall: {
      type: Object,
      default: () => null,
    },
  },

  emits: ['cancel-video-call', 'close-video-call'],

  methods: {
    handleCancelVideoCall() {
      this.handleCloseModalVideoCall()
      this.$emit('cancel-video-call')
    },

    handleCloseModalVideoCall() {
      this.$emit('close-video-call')
    },
  },
}
</script>
