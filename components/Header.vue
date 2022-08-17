<template>
  <header class="w-full h-[68px] bg-white fixed top-0 shadow-xl z-[1000]">
    <div
      class="flex items-center max-w-[1200px] m-auto h-full justify-between px-4 xl:px-0"
    >
      <nuxt-link
        to="/"
        class="flex items-center"
        @click.native="handleCloseNotifyAndMenu"
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
              v-if="getNumberNewNotify > 0"
              class="absolute top-[-4px] right-[-4px] w-[16px] h-[16px] bg-red-500 rounded-full text-white text-[0.8rem] flex items-center justify-center"
            >
              {{ getNumberNewNotify }}
            </div>
            <fa icon="bell" class="text-[1.2rem]" />
          </div>
          <div
            v-if="isShowNotify"
            class="notify-container absolute w-[350px] max-h-[70vh] overflow-y-auto px-4 py-4 bg-white shadow-xl top-[110%] right-[calc(100%-40px)] rounded-[20px] after:content[''] after:w-full after:h-[20px] after:bg-slate-500 after:absolute after:top-[-20px] after:left-0 after:bg-transparent z-[100] origin-top transition-all duration-150 ease-in-out animate-[leftIn_0.3s_ease-in-out] md:animate-[scaleDown_0.15s_ease-in-out]"
            @scroll="handleScroll"
          >
            <div v-for="(notify, index) in notifies" :key="index">
              <NotifyItem
                :sender="notify.senderFullname"
                :type="notify.type"
                :timestamp="notify.timestamp"
                :link="notify.link"
                @closeNotify="handleCloseNotify"
              />
            </div>
          </div>
          <div
            ref="mainMenu"
            class="main-menu flex justify-center items-center md:cursor-pointer shadow-xl md:shadow-none"
          >
            <div class="flex justify-center items-center py-3 md:py-0">
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
              <fa
                icon="caret-down"
                class="hidden text-dark_bg text-[1.2rem] ml-2 md:block"
              />
            </div>

            <div
              class="sub-menu absolute w-[300px] px-4 py-4 bg-white shadow-xl top-[110%] right-0 rounded-[20px] after:content[''] after:w-full after:h-[20px] after:bg-slate-500 after:absolute after:top-[-20px] after:left-0 after:bg-transparent z-[100] origin-top transition-all duration-150 ease-in-out"
            >
              <SubMenuItem
                icon="user"
                :content="$t('nav.profile')"
                type="button"
                :handle-click-sub-menu-item="handleShowProfile"
                @closeNotify="handleCloseNotifyAndMenu"
              />
              <SubMenuItem
                icon="plus"
                :content="$t('nav.addFriend')"
                to="/add-friend"
                type="nuxt-link"
                @closeNotify="handleCloseNotifyAndMenu"
              />
              <SubMenuItem
                icon="chart-line"
                :content="$t('nav.statistic')"
                to="/statistic"
                type="nuxt-link"
                @closeNotify="handleCloseNotifyAndMenu"
              />
              <SubMenuItem
                icon="moon"
                :content="$t('nav.darkMode')"
                :is-dark-mode="true"
                type="button"
                @closeNotify="handleCloseNotifyAndMenu"
              />
              <SubMenuItem
                icon="arrow-right-from-bracket"
                :content="$t('nav.logout')"
                type="button"
                :handle-click-sub-menu-item="handleLogout"
                @closeNotify="handleCloseNotifyAndMenu"
              />
            </div>
          </div>
          <div
            ref="btnHamburger"
            class="btn-hamburger flex flex-col justify-center items-center w-[40px] h-[40px] bg-slate-200 rounded-full md:hidden cursor-pointer"
            @click="handleToggleMenu"
          >
            <span></span>
            <span></span>
            <span></span>
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
import { getNotify, seenNotifies } from '~/api/notify'

export default {
  components: { Avatar, SubMenuItem, ModalProfile, NotifyItem },

  data() {
    return {
      user: null,
      avatar: null,
      isShowModalProfile: false,
      isShowNotify: false,
      notifies: null,
      lastDocNotify: null,
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

    getNumberNewNotify() {
      let count = 0
      this.notifies &&
        this.notifies.forEach((notify) => {
          if (notify.seen === false) {
            count++
          }
        })
      return count
    },
  },
  async created() {
    await this.setUser()
    this.avatar = this.user && this.user.avatar

    getNotify(
      this.getCurrentEmail,
      (notifies) => {
        this.setNotifies(notifies)
      },
      this.lastDocNotify
    )
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

    handleToggleMenu() {
      this.handleCloseNotify()
      this.$refs.mainMenu.classList.toggle('main-menu--show')
      this.$refs.btnHamburger.classList.toggle('btn-hamburger--active')
    },

    handleCloseMenu() {
      this.$refs.mainMenu.classList.remove('main-menu--show')
      this.$refs.btnHamburger.classList.remove('btn-hamburger--active')
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

    async handleToggleNotify() {
      this.handleCloseMenu()
      if (!this.isShowNotify) {
        await seenNotifies(this.user.email)
      }
      this.isShowNotify = !this.isShowNotify
      this.currentLoadNotify = 1
    },

    handleCloseNotify() {
      this.isShowNotify = false
    },

    handleCloseNotifyAndMenu() {
      this.handleCloseMenu()
      this.isShowNotify = false
    },

    setNotifies(notifiesDoc) {
      const notifies = notifiesDoc.map((doc) => ({ ...doc.data(), id: doc.id }))
      this.notifies = notifies
      this.lastDocNotify = notifiesDoc[notifiesDoc.length - 1]
    },

    loadMoreNotify(notifiesDoc) {
      const notifiesMore = notifiesDoc.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      const lastDoc = notifiesDoc[notifiesDoc.length - 1]
      if (lastDoc && lastDoc.id !== this.lastDocNotify.id) {
        this.lastDocNotify = lastDoc
        this.notifies = [...this.notifies, ...notifiesMore]
      }
    },

    handleScroll(e) {
      if (
        Math.ceil(e.target.scrollTop) + e.target.clientHeight >=
        e.target.scrollHeight
      ) {
        getNotify(
          this.getCurrentEmail,
          (notifies) => {
            this.loadMoreNotify(notifies)
          },
          this.lastDocNotify
        )
      }
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

.btn-hamburger > span {
  width: 24px;
  height: 3px;
  background-color: #000;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
}

.btn-hamburger > span:nth-child(2) {
  margin: 3px 0;
}

.btn-hamburger--active > span:nth-child(2) {
  opacity: 0;
}
.btn-hamburger--active > span:nth-child(1) {
  transform: rotate(45deg) translate(4px, 4px);
}

.btn-hamburger--active > span:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -4px);
}

@media screen and (max-width: 768px) {
  .main-menu {
    position: absolute;
    top: 110%;
    width: 100vw;
    background-color: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom: solid 1px #939496;
    right: -16px;
    transform: translateX(100%);
    transition: all 0.3s ease-in-out;
  }
  .sub-menu {
    transform: scaleY(1);
    width: 100%;
    height: 80vh;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    top: 100%;
  }
  .sub-menu::after {
    display: none;
  }
  .main-menu--show {
    transform: translateX(0);
  }

  .notify-container {
    width: 100vw;
    height: 100vh;
    right: -16px;
  }
}
</style>
