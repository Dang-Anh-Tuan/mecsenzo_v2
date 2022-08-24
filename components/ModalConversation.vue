<template>
  <div class="fixed top-0 left-0 bottom-0 right-0 overflow-hidden">
    <div class="w-full h-full bg-[rgba(0,0,0,0.5)]" @click="closeModal"></div>
    <div
      class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[380px] min-h-[560px] sm:w-[480px] bg-white shadow-xl rounded-[25px] p-[32px] py-5 px-10"
    >
      <div class="py-2 border-b-2 border-b-[#212332]">
        <h3 class="text-[1.6rem] font-bold">
          {{ getHeadingModal }}
        </h3>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(handleSubmitForm)">
          <div>
            <div v-if="conversationBinding.type === 'group'">
              <FormField
                name="name"
                :label-field="$t('conversationModal.roomName')"
                :value-field="conversationBinding.name"
                rule="required|maximumLen:30"
                @onChangeField="handleChangeFiled"
              />
            </div>

            <div class="flex justify-between items-center w-full mt-4">
              <div class="flex items-center">
                <p class="text-[1.2rem] font-semibold text-dark_primary">
                  {{ $t('conversationModal.color') }}
                </p>
                <div class="relative">
                  <div
                    ref="btnColorConversation"
                    class="w-[26px] h-[26px] rounded-full cursor-pointer ml-[68px]"
                    @click="toggleChooseColor"
                  ></div>
                  <div
                    v-if="isShowChooseColor"
                    class="absolute grid grid-cols-5 gap-3 w-[200px] h-[100px] bg-white rounded-[20px] shadow-xl top-[100%] left-[100%] p-4"
                  >
                    <button
                      v-for="(value, key) in colorsConversation"
                      ref="btnChooseColorItem"
                      :key="key"
                      :value="value"
                      class="btn-choose-color-item w-[26px] h-[26px] rounded-full cursor-pointer"
                      @click="selectColorConversation"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="conversationBinding.type === 'group'" class="mt-[54px]">
              <FormField
                :label-field="$t('profileModal.avatar')"
                type-input="file"
                :value-field="avatar"
                @onChangeFile="handleChangeAvatar"
              />
              <div class="flex items-center justify-center">
                <Avatar
                  :is-have-avatar="!!avatar"
                  :src-image="
                    avatar ||
                    'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg'
                  "
                  :first-char="
                    conversationBinding && conversationBinding.name.charAt(0)
                  "
                  size="large"
                />
              </div>
            </div>
          </div>

          <div class="w-full flex justify-center">
            <div
              class="absolute bottom-[60px] mt-8 w-[350px] flex justify-between items-end h-[50px]"
            >
              <Button
                color="#ff7200"
                size="large"
                type="submit"
                :name-button="
                  (conversation && $t('profileModal.edit')) ||
                  $t('conversationModal.create')
                "
              ></Button>
              <Button
                color="#ff7200"
                variant="outline"
                size="large"
                :handle-click="closeModal"
                >{{ $t('profileModal.close') }}</Button
              >
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { extend } from 'vee-validate'
import FormField from './FormField.vue'
import Avatar from './Avatar.vue'
import Button from './Button.vue'
import { colorConversation } from '~/constants/colorConversation'
import { uploadImage } from '~/helper/FirebaseHelper'
import { createConversation, updateConversation } from '~/api/conversation'

extend('required', {
  validate(value) {
    return {
      required: true,
      valid: !['', null, undefined].includes(value),
    }
  },
  computesRequired: true,
  message: 'Field is required',
})

extend('maximumLen', {
  validate(value, args) {
    return value.length <= args.length
  },
  params: ['length'],
  message: 'Must be least 30 characters',
})

export default {
  components: { FormField, Avatar, Button },

  props: {
    conversation: {
      type: Object,
      default: () => null,
    },
  },

  emits: ['closeModal'],

  data() {
    return {
      fileAvatar: null,
      avatar: null,
      isShowChooseColor: false,
      colorsConversation: colorConversation,
      conversationBinding: null,
    }
  },

  computed: {
    getCurrentEmail() {
      if (process.server) {
        return this.$store.getters['account/getAccount']
      } else {
        return localStorage.getItem('email')
      }
    },

    getHeadingModal() {
      if (this.conversation) return this.$t('conversationModal.headingEdit')
      return this.$t('conversationModal.headingCreate')
    },
  },

  created() {
    if (!this.conversation) {
      this.conversationBinding = {
        type: 'group',
        member: [],
        seen: [],
        isTyping: [],
        colorChat: '#0084ff',
        messages: [],
        thumb: null,
        name: '',
        accountHost: null,
      }
    } else {
      this.conversationBinding = { ...this.conversation }
      this.avatar = this.conversation.thumb
    }
  },

  mounted() {
    this.$refs.btnColorConversation.style.backgroundColor =
      this.conversationBinding.colorChat
  },

  methods: {
    closeModal() {
      this.$emit('closeModal')
    },

    handleChangeFiled(newValue) {
      const fieldChange = newValue[0]
      this.conversationBinding[fieldChange] = newValue[1]
    },

    setColorForChooseBtn() {
      this.$nextTick(() => {
        this.$refs.btnChooseColorItem.forEach(
          (btn) => (btn.style.backgroundColor = btn.value)
        )
      })
    },

    toggleChooseColor() {
      this.isShowChooseColor = !this.isShowChooseColor
      if (this.isShowChooseColor) {
        this.setColorForChooseBtn()
      }
    },

    closeChooseColor() {
      this.isShowChooseColor = false
    },

    selectColorConversation(e) {
      this.conversationBinding.colorChat = e.target.value
      this.$nextTick(() => {
        this.$refs.btnColorConversation.style.backgroundColor =
          this.conversationBinding.colorChat
      })
      this.closeChooseColor()
    },

    handleChangeAvatar(fileImage) {
      this.avatar = fileImage.preview
      this.fileAvatar = fileImage
    },

    handleCreateConversation() {
      this.conversationBinding.accountHost = this.getCurrentEmail
      this.conversationBinding.member = [this.getCurrentEmail]
      createConversation(this.conversationBinding)
    },

    handleUpdateConversation() {
      updateConversation(this.conversationBinding)
    },

    handleImageUpdateCompleteCreateRoom(urlAvatar) {
      this.conversationBinding.thumb = urlAvatar
      this.handleCreateConversation()
      this.closeModal()
    },

    handleImageUpdateCompleteUpdateRoom(urlAvatar) {
      this.conversationBinding.thumb = urlAvatar
      this.handleUpdateConversation()
      this.closeModal()
    },

    handleSubmitForm() {
      if (this.fileAvatar) {
        if (!this.conversation) {
          uploadImage(
            `room-chat-thumb`,
            this.fileAvatar,
            this.handleImageUpdateCompleteCreateRoom
          )
        } else {
          uploadImage(
            `room-chat-thumb`,
            this.fileAvatar,
            this.handleImageUpdateCompleteUpdateRoom
          )
        }
      } else if (!this.conversation) {
        this.handleCreateConversation()
        this.closeModal()
      } else {
        this.handleUpdateConversation()
        this.closeModal()
      }
    },
  },
}
</script>
