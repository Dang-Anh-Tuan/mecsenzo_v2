<template>
  <div
    v-if="messageVideoCall && messageVideoCall.status !== 'end'"
    class="relative h-[100vh] overflow-hidden"
  >
    <div class="relative flex h-full overflow-hidden">
      <div
        ref="containerVideo"
        class="flex w-full h-full translate-x-[-100%]"
      ></div>
      <button
        ref="preBtn"
        class="w-[50px] h-[50px] absolute top-[50%] translate-y-[-50%] left-[4px] rounded-full border border-white text-white text-[1.2rem]"
        @click="handlePreVideo"
      >
        <fa icon="chevron-left" />
      </button>
      <button
        ref="nextBtn"
        class="w-[50px] h-[50px] absolute top-[50%] translate-y-[-50%] right-[4px] rounded-full border border-white text-white text-[1.2rem]"
        @click="handleNextVideo"
      >
        <fa icon="chevron-right" />
      </button>
    </div>
    <div
      ref="containerMyVideo"
      class="absolute bottom-[100px] right-[20px] w-[280px] h-[150px] border border-dark_primary rounded-[20px]"
    ></div>
    <div
      class="absolute bottom-[100px] right-0 w-full flex justify-center z-[10000]"
    >
      <button
        class="w-[68px] h-[68px] rounded-full bg-danger text-[1.2rem] text-white"
        @click="handleOutRoomVideoCall"
      >
        <fa icon="phone-slash" />
      </button>
    </div>
  </div>
  <div v-else class="relative h-[100vh] overflow-hidden">
    <div
      class="flex flex-col justify-center items-center h-full overflow-hidden"
    >
      <p class="text-[#888] text-[1.2rem] mt-4 font-light">
        {{ $t('modalCallVideo.videoCallEnd') }}
      </p>
      <button
        class="w-[68px] h-[68px] rounded-full bg-danger text-[1.2rem] text-white mt-4"
        @click="goBackHomePage"
      >
        <fa icon="phone-slash" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { serverTimestamp } from '@firebase/firestore'
import stringee from '@/api/stringee'
import { getMessageRealtime, updateMessageVideoCall } from '~/api/message.api'
import { getConversationById, updateConversation } from '~/api/conversation'
import { getUsersByEmails, updateUser } from '~/api/user.api'

export default {
  layout: 'auth',

  data() {
    return {
      messageVideoCall: null,
      conversationOfMessage: null,
      client: null,
      userToken: null,
      roomToken: null,
      currentVideo: 0,
    }
  },

  computed: {
    ...mapGetters({
      getCurrentEmail: 'account/getAccount',
    }),

    getCountVideoPartner() {
      return this.$refs.containerVideo.childElementCount
    },
  },

  watch: {
    currentVideo: {
      handler() {
        this.displayVideoPartner()
        if (this.currentVideo === this.getCountVideoPartner - 1) {
          this.$refs.nextBtn.disabled = true
        } else if (this.currentVideo === 0) {
          this.$refs.preBtn.disabled = true
        } else {
          this.$refs.nextBtn.disabled = false
          this.$refs.preBtn.disabled = false
        }
      },
    },
    messageVideoCall: {
      async handler(newValue) {
        if (newValue) {
          this.conversationOfMessage = await getConversationById(
            newValue.conversation
          )
          this.roomToken = await stringee.getRoomToken(newValue.content.roomId)

          await this.login()
          await this.publishVideo()
          this.displayVideoPartner()
        }
      },
    },
  },

  created() {
    getMessageRealtime(this.$route.params.id, this.setMessageVideoCall)
  },

  methods: {
    setMessageVideoCall(message) {
      this.messageVideoCall = message
    },

    login() {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        // eslint-disable-next-line no-undef
        const client = new StringeeClient()
        this.client = client

        const userId = (Math.random() * 10000).toFixed(0)
        const userToken = await stringee.getUserToken(userId)

        client.connect(userToken)

        client.on('authen', (result) => resolve(result))
      })
    },

    async publishVideo() {
      const containerVideo = this.$refs.containerVideo

      // eslint-disable-next-line no-undef
      const localTrack = await StringeeVideo.createLocalVideoTrack(
        this.client,
        {
          audio: true,
          video: true,
          videoDimensions: { width: 640, height: 360 },
        }
      )

      const videoElement = localTrack.attach()
      if (this.$refs.containerMyVideo) {
        this.$refs.containerMyVideo.appendChild(videoElement)
      }

      // eslint-disable-next-line no-undef
      const roomData = await StringeeVideo.joinRoom(this.client, this.roomToken)
      const room = roomData.room
      room.clearAllOnMethos()

      room.on('addtrack', async (event) => {
        const trackInfo = event.info.track

        if (trackInfo.serverId === localTrack.serverId) {
          return
        }

        await this.subscribeTrack(trackInfo, room, containerVideo)
      })

      room.on('removetrack', async (event) => {
        if (!event.track) {
          return
        }

        const elements = event.track.detach()
        elements.forEach((e) => e.parentElement.remove())

        if (this.conversationOfMessage.type === 'individual') {
          await this.handleOutRoomVideoCall()
        }
      })

      const listUserPublishUnique = []
      const listTrackInfoUnique = []
      roomData.listTracksInfo.forEach((trackInfo) => {
        if (!listUserPublishUnique.includes(trackInfo.userPublish)) {
          listTrackInfoUnique.push(trackInfo)
          listUserPublishUnique.push(trackInfo.userPublish)
        }
      })

      roomData.listTracksInfo.forEach((trackInfo) =>
        this.subscribeTrack(trackInfo, room, containerVideo)
      )

      room.publish(localTrack)
    },

    async subscribeTrack(trackInfo, room, containerVideo) {
      const track = await room.subscribe(trackInfo.serverId)
      track.on('ready', () => {
        const elVideo = track.attach()

        const newContainerVideoEl = document.createElement('div')
        newContainerVideoEl.classList.add('container-video-item')
        newContainerVideoEl.appendChild(elVideo)
        containerVideo.appendChild(newContainerVideoEl)
      })
    },

    async handleOutRoomVideoCall() {
      const userOfConversation = await getUsersByEmails(
        this.conversationOfMessage.member
      )
      userOfConversation.forEach(async (user) => {
        await updateUser({ ...user, isFreeVideoCall: true })
      })

      if (this.conversationOfMessage.type === 'individual') {
        await updateMessageVideoCall({
          ...this.messageVideoCall,
          status: 'end',
          timeEnd: serverTimestamp(),
        })

        this.goBackHomePage()
      } else {
        let newMessageVideoCall
        if (this.messageVideoCall.emailJoin.length === 1) {
          newMessageVideoCall = {
            ...this.messageVideoCall,
            emailJoin: this.messageVideoCall.emailJoin.filter(
              (email) => email !== this.getCurrentEmail
            ),
            timeEnd: serverTimestamp(),
            status: 'end',
          }
        } else {
          newMessageVideoCall = {
            ...this.messageVideoCall,
            emailJoin: this.messageVideoCall.emailJoin.filter(
              (email) => email !== this.getCurrentEmail
            ),
          }
        }

        await updateMessageVideoCall(newMessageVideoCall)
        await updateConversation({
          ...this.conversationOfMessage,
          lastMessage: newMessageVideoCall,
          timeEnd: serverTimestamp(),
          seen: [this.getCurrentEmail],
        })
        this.goBackHomePage()
      }
    },

    goBackHomePage() {
      this.$router.push(
        {
          path: '/',
          name: `index___${this.$i18n.locale}`,
        },
        () => window.location.reload(true)
      )
    },

    displayVideoPartner() {
      if (this.$refs.containerVideo) {
        this.$refs.containerVideo.style.transform = `translateX(-${
          this.currentVideo * 100
        }%)`
      }
    },

    handlePreVideo() {
      this.currentVideo = --this.currentVideo
    },

    handleNextVideo() {
      this.currentVideo = ++this.currentVideo
    },
  },
}
</script>

<style scoped>
.container-video-item {
  flex: 0 0 100%;
  height: 100%;
}
</style>
