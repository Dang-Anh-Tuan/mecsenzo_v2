<template>
  <div class="h-[10%] w-full flex items-center">
    <div class="flex justify-center items-center">
      <div
        class="relative h-[40px] w-[40px] rounded-full mr-2 flex items-center justify-center hover:bg-slate-200 hover:bg-[rgba(255,255,255,0.1)]"
      >
        <input
          id="input-image"
          ref="inputImage"
          type="file"
          class="opacity-0 z-[-1] absolute"
          @change="handleSetFileImageInput"
        />
        <label for="input-image" class="cursor-pointer">
          <fa ref="iconFooter" icon="image" class="text-[1.2rem]" />
        </label>
      </div>
      <ButtonIcon
        :color="colorBtn"
        class="mr-1"
        @btn-icon-click="handleShowPreviewChatVoice"
      >
        <fa icon="microphone" class="text-[1.2rem]" />
      </ButtonIcon>
    </div>
    <form class="flex-1 flex items-center" @submit.prevent="handleSendMessage">
      <div class="relative flex-1 h-full">
        <input
          ref="inputMessage"
          v-focus
          type="text"
          class="w-full px-3 py-2 pr-[60px] appearance-none outline-none rounded-full bg-slate-200 dark:bg-dark_bg_message dark:text-white"
          :disabled="isDisableInputMessage"
          :placeholder="$t('chatSide.inputPlaceholder')"
          @focus="handleFocusInputMessage"
          @blur="handleBlurInputMessage"
          @input="updateInputMessage"
        />
        <div
          class="absolute right-0 top-0 h-full w-[50px] flex justify-center items-center cursor-pointer noSelect"
          @click="toggleEmojiPicker"
        >
          <img
            src="@/assets/images/icon.png"
            alt="emoji"
            class="w-[28px] object-fill"
          />
          <div
            v-if="checkIsClientSide && isShowIconPicker"
            class="absolute w-[50px] h-[50px]"
          >
            <VEmojiPicker
              ref="emojiPicker"
              class="absolute right-[-50px] md:right-[0px] translate-y-[calc(-100%)] h-[330px]"
              :show-search="false"
              @select="handleSelectEmoji"
            />
          </div>
        </div>
      </div>
      <ButtonIcon type="submit" :color="colorBtn" class="ml-1">
        <fa icon="paper-plane" class="text-[1.2rem]" />
      </ButtonIcon>
    </form>
  </div>
</template>

<script>
import ButtonIcon from './ButtonIcon.vue'
export default {
  components: { ButtonIcon },
  props: {
    colorBtn: {
      type: String,
      default: () => '#0084ff',
    },
    isDisableInputMessage: Boolean,
  },

  emits: [
    'set-file-image-input',
    'show-preview-chat-voice',
    'send-message',
    'focus-input-message',
    'blur-input-message',
    'select-emoji',
  ],

  data() {
    return {
      isShowIconPicker: false,
    }
  },

  computed: {
    checkIsClientSide() {
      return !process.server
    },
  },
  mounted() {
    this.$refs.iconFooter.style.color = this.colorBtn
  },

  updated() {
    this.$refs.iconFooter.style.color = this.colorBtn
  },

  methods: {
    toggleEmojiPicker() {
      this.isShowIconPicker = !this.isShowIconPicker
    },

    handleSetFileImageInput(e) {
      const fileImage = e.target.files[0]
      this.$emit('set-file-image-input', fileImage)

      this.$refs.inputMessage.value = ''
    },

    handleShowPreviewChatVoice() {
      this.$emit('show-preview-chat-voice')
    },

    handleSendMessage() {
      this.$refs.inputMessage.value = ''
      this.$emit('send-message')
    },

    handleFocusInputMessage() {
      this.$emit('focus-input-message')
    },

    handleBlurInputMessage() {
      this.$emit('blur-input-message')
    },

    handleSelectEmoji(emoji) {
      const inputMessageEl = this.$refs.inputMessage
      inputMessageEl.value = inputMessageEl.value + emoji.data
      inputMessageEl.focus()
      this.$refs.inputMessage.focus()
      this.$emit('select-emoji', emoji)
    },

    updateInputMessage(e) {
      this.$emit('update:input-message', e.target.value)
    },
  },
}
</script>

<style></style>
