<template>
  <div class="w-[420px]">
    <div class="relative h-[43px] rounded-full">
      <input
        ref="inputSearchName"
        v-model="searchKey"
        v-focus
        type="text"
        class="appearance-none outline-none pl-[20px] py-[8px] pr-[calc(120px+12px)] w-full h-full rounded-full text-[1.1rem] border border-[#ff7200] focus:shadow-md focus:shadow-[#f69443]"
        :placeholder="$t('addFriendTab.searchTab.inputPlaceholder')"
      />
      <Button class="absolute right-0 top-0" :handle-click="handleSearch">
        <fa icon="magnifying-glass" />
      </Button>
    </div>
    <div class="max-h-[350px] overflow-auto px-3 mt-[40px]">
      <div
        v-for="user in usersSearch"
        :key="user.id"
        class="flex h-[50px] w-full justify-between items-center mb-[40px]"
      >
        <div class="flex items-center">
          <avatar
            :is-have-avatar="user && !!user.avatar"
            :src-image="user && user.avatar"
            :first-char="user && user.fullName.charAt(0)"
          />
          <p class="select-none text-[1.2rem] font-medium ml-3">
            {{ user && user.fullName }}
          </p>
        </div>
        <div>
          <div
            v-if="isFriend(user)"
            class="flex items-center justify-center min-w-[120px] px-[12px] py-[6px] text-[1.2rem] text-white rounded-[20px] bg-[#33b5e7] border border-[#33b5e7] select-none"
          >
            {{ $t('addFriendTab.searchTab.friend') }}
          </div>
          <Button
            v-else-if="isPendingInvitationSent(user)"
            color="#f74242"
            :handle-click="() => handleCancelInvitation(user.email)"
          >
            {{ $t('addFriendTab.searchTab.cancel') }}
          </Button>
          <Button
            v-else-if="isPendingInvitationReceived(user)"
            color="#01c851"
            :handle-click="() => handleAcceptInvitation(user.email)"
          >
            {{ $t('addFriendTab.searchTab.accept') }}
          </Button>
          <Button
            v-else
            color="#01c851"
            :handle-click="() => handleSendInvitation(user.email)"
          >
            {{ $t('addFriendTab.searchTab.invite') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue'
import Avatar from './Avatar.vue'
import {
  getUserByEmail,
  getUserByEmailAndFullname,
  addNewFriend,
} from '~/api/user.api'
import {
  getPendingInvitationSent,
  getPendingInvitationReceived,
  getPendingInvitationBySenderReceiver,
  deleteInvitation,
  createInvitation,
  getInvitationById,
  acceptInvitation,
} from '~/api/friend.api'
import { createNotify } from '~/api/notify'
import { routers } from '~/constants/router'

export default {
  components: { Button, Avatar },
  data() {
    return {
      searchKey: '',
      usersSearch: [],
      pendingInvitationSent: [],
      pendingInvitationReceived: [],
      friendOfCurrentUser: [],
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
    isPendingInvitationSent() {
      return (user) => {
        const emailReceived = this.pendingInvitationSent.map(
          (invitation) => invitation.receiverEmail
        )

        return emailReceived.includes(user.email)
      }
    },
    isPendingInvitationReceived() {
      return (user) => {
        const emailSent = this.pendingInvitationReceived.map(
          (invitation) => invitation.senderEmail
        )

        return emailSent.includes(user.email)
      }
    },
    isFriend() {
      return (user) => {
        return this.friendOfCurrentUser.includes(user.email)
      }
    },
  },

  methods: {
    async handleSearch() {
      const resultSearch = await getUserByEmailAndFullname(this.searchKey)
      this.usersSearch = resultSearch.filter(
        (user) => user.email !== this.getCurrentEmail
      )

      const pendingInvitationSent = await getPendingInvitationSent(
        this.getCurrentEmail
      )
      this.pendingInvitationSent = pendingInvitationSent

      const pendingInvitationReceived = await getPendingInvitationReceived(
        this.getCurrentEmail
      )
      this.pendingInvitationReceived = pendingInvitationReceived

      const currentUser = await getUserByEmail(this.getCurrentEmail)
      this.friendOfCurrentUser = currentUser.friend ? currentUser.friend : []
    },

    async handleCancelInvitation(receiver) {
      const invitation = await getPendingInvitationBySenderReceiver(
        this.getCurrentEmail,
        receiver
      )

      await deleteInvitation(invitation.id)

      this.pendingInvitationSent = this.pendingInvitationSent.filter(
        (invite) => invite.id !== invitation.id
      )
    },

    async handleAcceptInvitation(sender) {
      const invitation = await getPendingInvitationBySenderReceiver(
        sender,
        this.getCurrentEmail
      )

      acceptInvitation(invitation)

      const currentUser = await getUserByEmail(this.getCurrentEmail)
      const senderUser = await getUserByEmail(sender)
      await addNewFriend(currentUser, sender)
      await addNewFriend(senderUser, currentUser.email)

      this.$set(
        this.friendOfCurrentUser,
        this.friendOfCurrentUser.length,
        sender
      )

      await createNotify(
        sender,
        currentUser.fullName,
        'acceptFriend',
        routers.ADD_FRIEND_PAGE
      )
    },

    async handleSendInvitation(receiver) {
      const newInvitation = await createInvitation(
        this.getCurrentEmail,
        receiver
      )
      this.pendingInvitationSent.push(await getInvitationById(newInvitation.id))

      const currentUser = await getUserByEmail(this.getCurrentEmail)

      await createNotify(
        receiver,
        currentUser.fullName,
        'inviteFriend',
        routers.ADD_FRIEND_PAGE
      )
    },
  },
}
</script>
