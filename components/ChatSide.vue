<template>
  <div
    class="flex-1 ml-4 bg-white shadow-2xl rounded-[20px] p-[36px] pl-[100px] md:pl-[36px]"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <div class="relative z-[10]">
          <avatar
            :is-have-avatar="true"
            src-image="https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126694049.jpeg"
            first-char="D"
          />
          <div
            class="absolute w-[12px] h-[12px] rounded-full bg-success bottom-0 right-0"
          ></div>
        </div>
        <div class="conversation-content ml-4">
          <p class="select-none font-semibold">Nguyen Van Nam</p>
          <p
            class="select-none truncate text-ellipsis text-[0.9rem] max-w-[180px] h-[1.4rem] text-gray-500"
          >
            {{ $t('chatSide.active') }}
          </p>
        </div>
      </div>
      <div></div>
    </div>
    <Separation />
    <div id="container-msg" class="h-[74%] overflow-y-auto p-2">
      <div class="h-[90%] flex flex-col-reverse justify-end">
        <div class="flex justify-end text-gray-500">
          <div class="flex items-center select-none">
            <p>{{ $t('chatSide.seen') }}</p>
            <fa icon="check" class="ml-1" />
          </div>
        </div>
        <div class="flex flex-row-reverse items-end justify-start mt-3">
          <div class="max-w-[80%] md:max-w-[40%] rounded-[10px] peer">
            <div class="ml-2 p-2 bg-[#f6f9fa] rounded-[10px]">
              <p class="text-[1rem] text-gray-500 w-fit">
                suscipit quam rem illo eius molestiae adipisci nisi deleniti,
                est enim?
              </p>
            </div>
            <div
              v-tooltip.top-start="{
                content: '19/08/2022',
                classes: 'tooltip tooltip--left',
              }"
              class="ml-2 p-2 bg-blue-600 rounded-[10px] w-fit"
            >
              <p class="text-[1.1rem] text-white">
                suscipit quam rem illo eius molestiae adipisci nisi deleniti,
                est enim?
              </p>
            </div>
          </div>

          <div
            class="relative hidden peer-hover:block before:content-[''] before:absolute before:w-[14px] before:h-full before:bg-transparent hover:block right-2 before:left-[100%]"
          >
            <button
              class="h-[32px] w-[32px] rounded-full flex items-center justify-center hover:bg-slate-200"
            >
              <fa icon="reply" />
            </button>
          </div>
        </div>
        <div class="flex items-end mt-3">
          <avatar
            :is-have-avatar="true"
            src-image="https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126694049.jpeg"
            first-char="D"
            size="small"
          />
          <div
            class="max-w-[80%] md:max-w-[40%] ml-2 p-2 bg-gray-200 rounded-[10px]"
          >
            <p class="text-[1.1rem]">Hello</p>
          </div>
        </div>
        <div class="flex items-end mt-3">
          <avatar
            :is-have-avatar="true"
            src-image="https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126694049.jpeg"
            first-char="D"
            size="small"
          />
          <div class="max-w-[80%] md:max-w-[40%] rounded-[10px] peer">
            <div class="ml-2 p-2 bg-[#f6f9fa] rounded-[10px] w-fit">
              <p class="text-[1rem] text-gray-500">suscipit</p>
            </div>
            <div class="ml-2 p-2 bg-gray-200 rounded-[10px] w-fit">
              <p class="text-[1.1rem]">nesciunt inventore nostrum</p>
            </div>
          </div>

          <div
            class="relative left-2 hidden peer-hover:block before:content-[''] before:absolute before:w-[14px] before:h-full before:bg-transparent hover:block before:right-[100%]"
          >
            <button
              class="h-[32px] w-[32px] rounded-full flex items-center justify-center hover:bg-slate-200"
            >
              <fa icon="reply" />
            </button>
          </div>
        </div>
        <div class="flex flex-row-reverse items-end justify-start mt-3">
          <div
            v-tooltip.top-start="{
              content: '19/08/2022',
              classes: 'tooltip tooltip--left',
            }"
            class="max-w-[80%] md:max-w-[40%] ml-2 p-2 bg-blue-600 rounded-[10px] peer"
          >
            <p class="text-[1.1rem] text-white">Lorem ipsum dolor sit</p>
          </div>
          <div
            class="relative hidden peer-hover:block before:content-[''] before:absolute before:w-[14px] before:h-full before:bg-transparent hover:block right-2 before:left-[100%]"
          >
            <button
              class="h-[32px] w-[32px] rounded-full flex items-center justify-center hover:bg-slate-200"
            >
              <fa icon="reply" />
            </button>
          </div>
        </div>

        <div class="flex items-end justify-end mt-3">
          <div
            class="max-w-[80%] md:max-w-[40%] ml-2 p-2 bg-blue-600 rounded-[10px]"
          >
            <p class="text-[1.1rem] text-white">
              suscipit quam rem illo eius molestiae adipisci nisi deleniti, est
              enim?
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="h-[10%] w-full flex items-center">
      <div class="flex justify-center items-center">
        <div
          class="relative h-[32px] w-[32px] rounded-full mr-2 flex items-center justify-center hover:bg-slate-200"
        >
          <input
            id="input-image"
            type="file"
            class="opacity-0 z-[-1] absolute"
          />
          <label for="input-image" class="cursor-pointer">
            <fa icon="image" class="text-blue-600 text-[1.2rem]" />
          </label>
        </div>
        <button
          class="h-[32px] w-[32px] rounded-full mr-2 flex items-center justify-center hover:bg-slate-200"
        >
          <fa icon="microphone" class="text-blue-600 text-[1.2rem]" />
        </button>
      </div>
      <form
        class="flex-1 flex items-center"
        @submit.prevent="handleSendMessage"
      >
        <div class="relative flex-1 h-full">
          <input
            ref="inputMessage"
            v-model="inputMessage"
            v-focus
            type="text"
            class="w-full px-3 py-2 appearance-none outline-none rounded-full bg-slate-200"
            :placeholder="$t('chatSide.inputPlaceholder')"
          />
          <div
            class="absolute right-0 top-0 h-full w-[50px] flex justify-center items-center cursor-pointer"
            @click="toggleEmojiPicker"
          >
            <img
              src="@/assets/images/icon.png"
              alt="emoji"
              class="w-[28px] object-fill select-none"
            />
            <div
              v-if="checkIsClientSide && isShowIconPicker"
              class="absolute w-[50px] h-[50px]"
            >
              <VEmojiPicker
                ref="emojiPicker"
                class="absolute right-[-50px] md:right-[0px] translate-y-[calc(-100%)] w-[200px] h-[330px]"
                :show-search = "false"
                @select="handleSelectEmoji"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="h-[40px] w-[40px] ml-2 rounded-full flex items-center justify-center hover:bg-slate-200"
        >
          <fa icon="paper-plane" class="text-blue-600 text-[1.2rem]" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { VEmojiPicker } from 'v-emoji-picker'
import Separation from './Separation.vue'
export default {
  components: { Separation, VEmojiPicker },

  data() {
    return {
      inputMessage: '',
      isShowIconPicker: false,
    }
  },

  computed: {
    checkIsClientSide() {
      return !process.server
    },
  },

  mounted() {
    const containerMessage = document.getElementById('container-msg')
    containerMessage.scrollTo({
      top: containerMessage.scrollHeight,
      behavior: 'smooth',
    })
  },

  methods: {
    toggleEmojiPicker() {
      this.isShowIconPicker = !this.isShowIconPicker
    },

    handleSelectEmoji(emoji) {
      this.inputMessage = this.inputMessage + emoji.data
      this.$refs.inputMessage.focus()
    },

    handleSendMessage() {
      console.log(this.inputMessage)
    },
  },
}
</script>
