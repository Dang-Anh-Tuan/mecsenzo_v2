<template>
  <div class="w-full h-[450px] px-[50px]">
    <div class="relative w-[180px] cursor-pointer">
      <select
        v-model="filter"
        name=""
        class="appearance-none outline-none w-full px-[30px] py-[8px] rounded-full text-[1.1rem] border border-[#ff7200] shadow-xl cursor-pointer bg-white"
      >
        <option value="sent">
          {{ $t('addFriendTab.invitationTab.sent') }}
        </option>
        <option value="pending">
          {{ $t('addFriendTab.invitationTab.pending') }}
        </option>
        <option value="approved">
          {{ $t('addFriendTab.invitationTab.approved') }}
        </option>
      </select>
      <div class="absolute right-4 top-[25%] pointer-events-none">
        <fa icon="caret-down" class="text-dark_bg text-[1.2rem] ml-2" />
      </div>
    </div>

    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full my-6 overflow-y-auto max-h-[400px]"
    >
      <div
        v-for="invitation in getInvitations"
        :key="invitation.id"
        class="relative flex w-full justify-between items-center border-[2px] p-3 h-[86px]"
      >
        <div v-if="invitation.user" class="flex items-center">
          <avatar
            :is-have-avatar="!!invitation.user.avatar"
            :src-image="invitation.user.avatar"
            :first-char="invitation.user.fullName.charAt(0)"
          />
          <p class="select-none text-[1.2rem] font-medium ml-3 dark:text-white">
            {{ invitation.user.fullName }}
          </p>
        </div>
        <div v-if="filter === 'approved'">
          <ButtonIcon class="group" color="#333">
            <fa icon="ellipsis-vertical" class="dark:text-dark_text_light" />
            <div
              class="hidden absolute top-[100%] right-0 group-hover:flex flex-col w-[150px] shadow-xl z-[1000] bg-white after:contents-[''] after:w-full after:absolute after:h-[30px] after:left-0 after:top-[-30px] after:bg-transparent"
            >
              <button
                class="text-[0.9rem] py-2 px-3 border-b-[1px] hover:bg-slate-300"
                @click="handleRedirectToConversation(invitation.user)"
              >
                {{ $t('addFriendTab.invitationTab.chat') }}
              </button>
              <button
                class="text-[0.9rem] py-2 px-3 border-b-[1px] hover:bg-slate-300"
                @click="handleShowInfoFriend(invitation.user)"
              >
                {{ $t('addFriendTab.invitationTab.info') }}
              </button>
              <button
                class="text-[0.9rem] py-2 px-3 border-b-[1px] hover:bg-slate-300"
                @click="handleUnfriend(invitation)"
              >
                {{ $t('addFriendTab.invitationTab.unfriend') }}
              </button>
            </div>
          </ButtonIcon>
        </div>
        <div v-else-if="filter === 'sent'">
          <Button
            color="#f74242"
            :handle-click="() => handleCancelInvitation(invitation)"
          >
            {{ $t('addFriendTab.invitationTab.cancel') }}
          </Button>
        </div>
        <div v-else-if="filter === 'pending'">
          <Button
            color="#01c851"
            :handle-click="() => handleAccept(invitation)"
          >
            {{ $t('addFriendTab.invitationTab.accept') }}
          </Button>
        </div>
      </div>
    </div>
    <ModalProfileFriend
      v-if="profileFriend"
      :user="profileFriend"
      @redirect-chat="handleRedirectToConversation"
      @close-modal="handleCloseModalProfile"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from './Avatar.vue'
import {
  acceptInvitation,
  deleteInvitation,
  getAcceptInvitation,
  getPendingInvitationSent,
  getPendingInvitationReceived,
} from '~/api/friend.api'
import {
  addNewFriend,
  getUserByEmail,
  getUsersByEmails,
  unfriend,
} from '~/api/user.api'
import { mapInvitationUser } from '~/helper/mapInvitationUser'
import { createNotify } from '~/api/notify'
import { routers } from '~/constants/router'
import {
  createConversation,
  getIndividualConversationByMember,
} from '~/api/conversation'

export default {
  components: { Avatar },

  data() {
    return {
      filter: 'pending',
      friends: [],
      invitationsSent: [],
      invitationsReceived: [],
      currentUser: null,
      profileFriend: null,
    }
  },

  computed: {
    ...mapGetters({
      getCurrentEmail: 'account/getAccount',
    }),

    getInvitations() {
      if (this.filter === 'pending') {
        return this.invitationsReceived
      } else if (this.filter === 'sent') {
        return this.invitationsSent
      } else {
        return this.friends
      }
    },
  },

  async created() {
    this.currentUser = await getUserByEmail(this.getCurrentEmail)

    this.invitationsSent = await getPendingInvitationSent(this.getCurrentEmail)
    this.invitationsReceived = await getPendingInvitationReceived(
      this.getCurrentEmail
    )

    const emailReceiverInvitation = this.invitationsSent.map(
      (invitation) => invitation.receiverEmail
    )
    if (emailReceiverInvitation.length > 0) {
      const receiverInvitation = await getUsersByEmails(emailReceiverInvitation)

      this.invitationsSent = mapInvitationUser(
        this.invitationsSent,
        receiverInvitation
      ).splice(0)
    }

    const emailSenderInvitation = this.invitationsReceived.map(
      (invitation) => invitation.senderEmail
    )
    if (emailSenderInvitation.length > 0) {
      const senderInvitation = await getUsersByEmails(emailSenderInvitation)

      this.invitationsReceived = mapInvitationUser(
        this.invitationsReceived,
        senderInvitation
      ).splice(0)
    }

    this.friends = await getAcceptInvitation(this.getCurrentEmail)
  },

  methods: {
    async handleAccept(invitation) {
      const invitationUser = invitation.user

      delete invitation.user

      acceptInvitation(invitation)
      await addNewFriend(this.currentUser, invitationUser.email)
      await addNewFriend(invitationUser, this.currentUser.email)

      this.invitationsReceived = this.invitationsReceived.filter(
        (item) => item.id !== invitation.id
      )

      await createNotify(
        invitationUser.email,
        this.currentUser.fullName,
        'acceptFriend',
        routers.ADD_FRIEND_PAGE
      )

      await createConversation({
        type: 'individual',
        member: [this.getCurrentEmail, invitationUser.email],
        seen: [],
        isTyping: [],
        colorChat: '#0084ff',
        thumb: null,
        name: '',
        accountHost: null,
        lastMessage: null,
      })
    },

    async handleCancelInvitation(invitation) {
      await deleteInvitation(invitation.id)
      this.invitationsSent = this.invitationsSent.filter(
        (item) => item.id !== invitation.id
      )
    },

    async handleUnfriend(invitation) {
      await unfriend(this.currentUser, invitation.user.email)
      await unfriend(invitation.user, this.currentUser.email)
      await deleteInvitation(invitation.id)
      this.friends = this.friends.filter((item) => item.id !== invitation.id)
    },

    async handleRedirectToConversation(partnerUser) {
      const conversationsOfCurrentUser =
        await getIndividualConversationByMember(this.currentUser.email)

      const conversation = conversationsOfCurrentUser.filter((conversation) =>
        conversation.member.includes(partnerUser.email)
      )[0]

      this.$router.push({
        path: `/`,
        params: { id: conversation.id },
        name: `id___${this.$i18n.locale}`,
      })
    },

    handleShowInfoFriend(user) {
      this.profileFriend = user
    },

    handleCloseModalProfile() {
      this.profileFriend = null
    },
  },
}
</script>
