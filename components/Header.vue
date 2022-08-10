<!-- eslint-disable vue/this-in-template -->
<template>
  <header class="w-full h-[68px] bg-white fixed shadow-xl">
    <div
      class="flex justify-center items-center max-w-[1200px] m-auto h-full lg:justify-between"
    >
      <div class="flex items-center">
        <img
          src="@/assets/images/logo.png"
          alt="logo"
          class="w-[68px] h-full"
        />
        <h1 class="text-dark_primary text-[1.5rem] font-bold tracking-wider">
          MECSENZO
        </h1>
      </div>
      <div class="h-full">
        <div class="main-menu relative flex items-center h-full cursor-pointer">
          <avatar
            :is-have-avatar="!!avatar"
            :src-image="avatar"
            :first-char="user && user.fullName.charAt(0)"
          />
          <p
            class="text-dark_bg leading-[1.4rem] text-[1.2rem] h-[1.4rem] ml-4"
          >
            {{ user && user.fullName }}
          </p>
          <fa icon="caret-down" class="text-dark_bg text-[1.2rem] ml-2" />
          <div
            class="sub-menu hidden absolute w-[300px] px-4 py-4 bg-white shadow-xl top-[110%] right-0 rounded-[20px] after:content[''] after:w-full after:h-[20px] after:bg-slate-500 after:absolute after:top-[-20px] after:left-0 after:bg-transparent"
          >
            <SubMenuItem
              icon="user"
              :content="$t('nav.profile')"
              type="button"
              :handle-click-sub-menu-item="handleShowProfile"
            />
            <SubMenuItem
              icon="plus"
              :content="$t('nav.addFriend')"
              to="/add-friend"
              type="nuxt-link"
            />
            <SubMenuItem
              icon="chart-line"
              :content="$t('nav.statistic')"
              to="/statistic"
              type="nuxt-link"
            />
            <SubMenuItem
              icon="moon"
              :content="$t('nav.darkMode')"
              :is-dark-mode="true"
              type="button"
            />
            <SubMenuItem
              icon="arrow-right-from-bracket"
              :content="$t('nav.logout')"
              type="button"
              :handle-click-sub-menu-item="handleLogout"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isShowModalProfile"
      class="absolute w-[100vw] h-[100vh] top-0 left-0 z-[100]"
    >
      <ModalProfile
        @closeModal="closeModalProfile"
        @update:user="handleUpdateUser"
      />
    </div>
  </header>
</template>

<script>
import Avatar from './Avatar.vue'
import SubMenuItem from './SubMenuItem.vue'
import ModalProfile from './ModalProfile.vue'
import { getUserByEmail, setActiveUser } from '~/api/user.api'

export default {
  components: { Avatar, SubMenuItem, ModalProfile },

  data() {
    return {
      user: null,
      isShowModalProfile: false,
      avatar: null,
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
  },
  async created() {
    await this.setUser()
    this.avatar = this.user && this.user.avatar
  },

  methods: {
    async setUser() {
      this.user = await getUserByEmail(this.getCurrentEmail)
    },
    handleLogout() {
      setActiveUser(false)
      localStorage.removeItem('user')
      this.$store.dispatch('account/clearAccount')
      this.$router.push('/login')
    },
    handleShowProfile() {
      this.isShowModalProfile = true
    },
    closeModalProfile() {
      this.isShowModalProfile = false
    },
    async handleUpdateUser(payload) {
      await this.setUser()
      if (payload) {
        this.avatar = payload.urlAvatarTemp
        this.user.fullName = payload.newUser.fullName
      }
    },
  },
}
</script>

<style>
.main-menu:hover .sub-menu {
  display: block;
}
</style>
