<template>
  <div class="fixed top-0 left-0 w-[100vw] h-[100vh] overflow-hidden">
    <div class="w-full h-full bg-[rgba(0,0,0,0.5)]" @click="closeModal"></div>
    <div
      class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[480px] min-h-[560px] bg-white shadow-xl rounded-[25px] p-[32px] py-5 px-10"
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
            <div v-else>
              <div
                v-for="(member, index) in conversationBinding.members"
                :key="index"
              >
                <div v-if="member.email === getCurrentEmail">
                  <FormField
                    name="yourNickname"
                    :label-field="`$t('conversationModal.yourNickname')`"
                    :value-field="member && member.nickname"
                    rule="required|maximumLen:30"
                    @onChangeField="handleChangeFiled"
                  />
                </div>
                <div v-else>
                  <FormField
                    name="partnerNickname"
                    :label-field="`${member.email}$t('conversationModal.partnerNickname')`"
                    :value-field="member && member.nickname"
                    rule="required|maximumLen:30"
                    @onChangeField="handleChangeFiled"
                  />
                </div>
              </div>
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
            <div class="mt-[54px]">
              <FormField
                :label-field="$t('profileModal.avatar')"
                type-input="file"
                :value-field="avatar"
                @onChangeFile="handleChangeAvatar"
              />
              <div class="flex items-center justify-center">
                <Avatar
                  :is-have-avatar="getIsHaveAvatar"
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

          <div
            class="mt-8 mx-auto w-[350px] flex justify-between items-end h-[50px]"
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
import { createConversation } from '~/api/conversation'

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
    isCreate: Boolean,
    isShow: Boolean,
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
      conversationBinding: this.conversation,
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

    getIsHaveAvatar() {
      if (this.conversation) return !!this.conversation.thumb
      return true
    },
  },

  created() {
    if (this.isCreate)
      this.conversationBinding = {
        type: 'group',
        member: [],
        seen: [],
        isTyping: false,
        colorChat: '#0084ff',
        thumb: null,
        name: '',
        accountHost: null,
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

    handleUpdateConversation() {},

    handleImageUpdateComplete(urlAvatar) {
      if (this.isCreate) {
        this.conversationBinding.thumb = urlAvatar
        this.handleCreateConversation()
        this.closeModal()
      }
    },

    handleSubmitForm() {
      if (this.fileAvatar) {
        uploadImage(
          `room-chat-thumb`,
          this.fileAvatar,
          this.handleImageUpdateComplete
        )
      } else if (this.isCreate) {
        this.handleCreateConversation()
        this.closeModal()
      } else {
        this.handleUpdateConversation()
      }
    },
  },
}
</script>