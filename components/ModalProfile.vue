<template>
  <div class="fixed top-0 left-0 bottom-0 right-0 overflow-hidden">
    <div class="w-full h-full bg-[rgba(0,0,0,0.5)]" @click="closeModal"></div>
    <div
      class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[380px] min-h-[560px] sm:w-[480px] bg-white shadow-xl rounded-[25px] p-[32px] py-5 px-10"
    >
      <div class="py-2 border-b-2 border-b-[#212332]">
        <h3 class="text-[1.4rem] sm:text-[1.6rem] font-bold">
          {{ $t('profileModal.heading') }}
        </h3>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(handleEditProfile)">
          <div>
            <FormField
              name="fullName"
              :label-field="$t('profileModal.fullname')"
              :value-field="user && user.fullName"
              rule="required|maximumLen:30"
              @onChangeField="handleChangeFiled"
            />

            <FormField
              name="age"
              :label-field="$t('profileModal.age')"
              type-input="number"
              :value-field="user && user.age"
              @onChangeField="handleChangeFiled"
            />
            <FormField
              name="address"
              :label-field="$t('profileModal.address')"
              :value-field="user && user.address"
              @onChangeField="handleChangeFiled"
            />
            <FormField
              :label-field="$t('profileModal.avatar')"
              type-input="file"
              :value-field="avatar"
              @onChangeFile="handleChangeAvatar"
            />
          </div>
          <div class="flex items-center justify-center">
            <Avatar
              :is-have-avatar="!!avatar"
              :src-image="avatar"
              :first-char="user && user.fullName.charAt(0)"
              size="large"
            />
          </div>
          <div class="w-full">
            <div
              class="mt-8 mx-auto w-full sm:w-[80%] flex justify-between items-end h-[50px]"
            >
              <Button
                color="#ff7200"
                size="large"
                :handle-click="handleEditProfile"
                type="submit"
                :name-button="$t('profileModal.edit')"
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
import { mapGetters } from 'vuex'
import FormField from './FormField.vue'
import Avatar from './Avatar.vue'
import Button from './Button.vue'
import { uploadImage } from '~/helper/FirebaseHelper'
import { getUserByEmail, setAvatarUser, updateUser } from '~/api/user.api'

export default {
  components: { FormField, Avatar, Button },

  props: {
    isShow: Boolean,
  },

  emits: [
    'closeModal',
    'update:user',
    'set-percent-upload',
    'clear-percent-upload',
  ],

  data() {
    return {
      user: null,
      avatar: null,
      fileAvatar: null,
    }
  },

  computed: {
    ...mapGetters({
      getCurrentEmail: 'account/getAccount',
    }),
  },

  async created() {
    this.user = await getUserByEmail(this.getCurrentEmail)
    this.avatar = this.user && this.user.avatar
  },

  methods: {
    handleChangeFiled(newValue) {
      const fieldChange = newValue[0]
      this.user[fieldChange] = newValue[1]
    },
    closeModal() {
      this.$emit('closeModal')
    },
    handleChangeAvatar(fileImage) {
      this.avatar = fileImage.preview
      this.fileAvatar = fileImage
    },
    updateInfoUser() {
      updateUser(this.user)
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    async handleImageUpdateComplete(urlAvatar) {
      this.updateInfoUser()
      await setAvatarUser(urlAvatar)
      this.closeModal()
      this.clearPercentUploadAvatar()
    },

    handleEditProfile() {
      if (this.fileAvatar) {
        uploadImage(
          `user-avatar`,
          this.fileAvatar,
          this.handleImageUpdateComplete,
          this.setPercentUploadAvatar
        )
        this.$emit('update:user', {
          newUser: this.user,
          urlAvatarTemp: this.avatar,
        })
      } else {
        this.updateInfoUser()
        this.closeModal()
        this.$emit('update:user')
      }
    },

    setPercentUploadAvatar(percent) {
      this.$emit('set-percent-upload', percent)
    },

    clearPercentUploadAvatar() {
      this.$emit('clear-percent-upload')
    },
  },
}
</script>
