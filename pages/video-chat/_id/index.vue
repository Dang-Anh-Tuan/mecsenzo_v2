<template>
  <div class="relative mt-[68px] h-[calc(100vh-68px)] overflow-hidden">
    <div ref="containerVideo" class="containerVideo w-full flex h-full"></div>
    <div
      ref="containerMyVideo"
      class="absolute bottom-[100px] right-[20px] w-[300px] h-[100px] border border-dark_primary rounded-[20px]"
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
</template>

<script>
import { mapGetters } from 'vuex'
import stringee from '@/api/stringee'

export default {
  data() {
    return {
      client: null,
      userToken: null,
      roomToken: null,
    }
  },

  computed: {
    ...mapGetters({
      getCurrentEmail: 'account/getAccount',
    }),
  },

  async created() {
    this.roomToken = await stringee.getRoomToken(this.$route.params.id)
  },

  async mounted() {
    await this.login()
    await this.publishVideo()
  },

  methods: {
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
      this.$refs.containerMyVideo.appendChild(videoElement)

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

      room.on('removetrack', (event) => {
        if (!event.track) {
          return
        }

        const elements = event.track.detach()
        elements.forEach((e) => e.remove())
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
        containerVideo.appendChild(elVideo)
      })
    },

    handleOutRoomVideoCall() {
      this.$router.push(
        {
          path: '/',
          name: `index___${this.$i18n.locale}`,
        },
        () => window.location.reload(true)
      )
    },
  },
}
</script>

<style scoped>
.containerVideo video {
  width: 100vw;
}
</style>
