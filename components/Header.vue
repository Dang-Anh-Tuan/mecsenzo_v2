<!-- eslint-disable vue/this-in-template -->
<template>
  <header class="w-full h-[68px] bg-white fixed shadow-xl z-[1000]">
    <div
      class="flex justify-center items-center max-w-[1200px] m-auto h-full lg:justify-between"
    >
      <nuxt-link
        to="/"
        class="flex items-center"
        @click.native="handleCloseNotify"
      >
        <img
          src="@/assets/images/logo.png"
          alt="logo"
          class="w-[68px] h-full"
        />
        <h1 class="text-dark_primary text-[1.5rem] font-bold tracking-wider">
          MECSENZO
        </h1>
      </nuxt-link>
      <div class="h-full">
        <div class="relative flex items-center h-full">
          <div
            class="relative flex items-center justify-center w-[40px] h-[40px] bg-slate-200 mr-10 rounded-full cursor-pointer"
            @click="handleToggleNotify"
          >
            <div
              class="absolute top-[-4px] right-[-4px] w-[16px] h-[16px] bg-red-500 rounded-full text-white text-[0.8rem] flex items-center justify-center"
            >
              3
            </div>
            <fa icon="bell" class="text-[1.2rem]" />
          </div>
          <div
            v-if="isShowNotify"
            class="absolute w-[350px] max-h-[70vh] overflow-y-auto px-4 py-4 bg-white shadow-xl top-[110%] right-[calc(100%-40px)] rounded-[20px] after:content[''] after:w-full after:h-[20px] after:bg-slate-500 after:absolute after:top-[-20px] after:left-0 after:bg-transparent z-[100] origin-top transition-all duration-150 ease-in-out animate-[scaleDown_0.15s_ease-in-out]"
          >
            <NotifyItem />
            <NotifyItem />
            <NotifyItem />
            <NotifyItem />
          </div>
          <div
            class="main-menu flex justify-center items-center cursor-pointer"
          >
            <avatar
              :is-have-avatar="!!avatar"
              :src-image="avatar"
              :first-char="user && user.fullName.charAt(0)"
            />
            <p
              class="text-dark_bg leading-[1.4rem] text-[1.2rem] h-[1.4rem] ml-4 select-none"
            >
              {{ user && user.fullName }}
            </p>
            <fa icon="caret-down" class="text-dark_bg text-[1.2rem] ml-2" />
            <div
              class="sub-menu absolute w-[300px] px-4 py-4 bg-white shadow-xl top-[110%] right-0 rounded-[20px] after:content[''] after:w-full after:h-[20px] after:bg-slate-500 after:absolute after:top-[-20px] after:left-0 after:bg-transparent z-[100] origin-top transition-all duration-150 ease-in-out"
            >
              <SubMenuItem
                icon="user"
                :content="$t('nav.profile')"
                type="button"
                :handle-click-sub-menu-item="handleShowProfile"
                @closeNotify="handleCloseNotify"
              />
              <SubMenuItem
                icon="plus"
                :content="$t('nav.addFriend')"
                to="/add-friend"
                type="nuxt-link"
                @closeNotify="handleCloseNotify"
              />
              <SubMenuItem
                icon="chart-line"
                :content="$t('nav.statistic')"
                to="/statistic"
                type="nuxt-link"
                @closeNotify="handleCloseNotify"
              />
              <SubMenuItem
                icon="moon"
                :content="$t('nav.darkMode')"
                :is-dark-mode="true"
                type="button"
                @closeNotify="handleCloseNotify"
              />
              <SubMenuItem
                icon="arrow-right-from-bracket"
                :content="$t('nav.logout')"
                type="button"
                :handle-click-sub-menu-item="handleLogout"
                @closeNotify="handleCloseNotify"
              />
            </div>
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
import NotifyItem from './NotifyItem.vue'
import { getUserByEmail, setActiveUser } from '~/api/user.api'

export default {
  components: { Avatar, SubMenuItem, ModalProfile, NotifyItem },

  data() {
    return {
      user: null,
      avatar: null,
      isShowModalProfile: false,
      isShowNotify: false,
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

    handleToggleNotify() {
      this.isShowNotify = !this.isShowNotify
    },

    handleCloseNotify() {
      this.isShowNotify = false
    },
  },
}
</script>

<style scoped>
.sub-menu {
  transform: scaleY(0);
}
.main-menu:hover .sub-menu {
  transform: scaleY(1);
}
</style>
