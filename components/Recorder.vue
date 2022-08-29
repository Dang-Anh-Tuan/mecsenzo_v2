<template>
  <div id="container-recorder" class="h-[100px]">
    <audio-recorder :pause-recording="callback" :after-recording="callback" />
    <AudioDisplay :url="url" :file-name="file_name" />
  </div>
</template>

<script>
import AudioDisplay from './AudioDisplay.vue'
export default {
  components: { AudioDisplay },

  emits: ['change-data-audio'],

  data() {
    return {
      url: null,
    }
  },

  computed: {
    file_name() {
      let paddedNumber = ''
      if (this.index < 10) {
        paddedNumber = `00${this.index + 1}`
      } else if (this.index < 100) {
        paddedNumber = `0${this.index + 1}`
      } else {
        paddedNumber = `${this.index + 1}`
      }

      return `utterance-${paddedNumber}.mp3`
    },
  },

  methods: {
    callback(data) {
      if (data && data.url) {
        this.$emit('change-data-audio', { ...data, fileName: this.file_name })
        this.url = data.url
      }
    },
  },
}
</script>

<style>
#container-recorder {
  display: flex;
  align-items: center;
}

.ar {
  position: relative !important;
  height: 100px;
  width: fit-content !important;
  box-shadow: none !important;
  background: transparent !important;
}

.ar-content {
  display: block;
}

.ar-recorder {
  position: absolute !important;
  align-items: flex-start;
  top: 40px;
  left: 12px;
}

.ar-icon__sm.ar-recorder__stop {
  position: absolute !important;
  z-index: 1000;
  left: 40px;
  top: 1px;
}

.ar-icon.ar-icon__lg,
.ar-icon__sm.ar-recorder__stop {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
}

svg {
  width: 20px;
  height: 20px;
}

.ar-player-actions,
.ar-player-bar,
.ar-records__record,
.ar-recorder__duration,
.ar-recorder__records-limit,
.ar-recorder__time-limit,
.ar-player,
.ar-records__record.ar-records__record--selected {
  width: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
  opacity: 0 !important;
}
</style>
