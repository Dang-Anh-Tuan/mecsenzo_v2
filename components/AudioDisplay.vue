<template>
  <div v-if="url" class="container-result">
    <button @click="handleTogglePlayPreview">
      <fa v-if="isPreviewPause" icon="play" />
      <fa v-else icon="pause" />
    </button>
    <div class="process-audio">
      <div ref="processCurrent" class="process-current"></div>
    </div>
    <div v-if="currentTimePreview && totalTimePreview" class="time-audio">
      {{ Math.ceil(currentTimePreview) }}:{{ Math.ceil(totalTimePreview) }}
    </div>
    <audio
      ref="audioEl"
      class="audio-el"
      :src="url"
      controls
      :title="fileName"
      @timeupdate="onTimeUpdate"
    />
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: () => null,
    },
    fileName: {
      type: String,
      default: () => '',
    },
  },

  data() {
    return {
      isPreviewPause: true,
      currentTimePreview: null,
      totalTimePreview: null,
    }
  },

  methods: {
    onTimeUpdate() {
      this.currentTimePreview = this.$refs.audioEl.currentTime
      this.totalTimePreview = this.$refs.audioEl.duration
      this.$refs.processCurrent.style.width =
        Math.ceil((this.currentTimePreview / this.totalTimePreview) * 100) + '%'
    },

    handleTogglePlayPreview() {
      this.isPreviewPause = !this.isPreviewPause
      const audioEl = this.$refs.audioEl

      if (audioEl.paused) {
        audioEl.play()
      } else {
        audioEl.pause()
      }
    },
  },
}
</script>

<style scoped>
.container-result {
  position: relative !important;
  left: 70px;
  top: 5px;
  display: flex;
  align-items: center;
}

.audio-el {
  opacity: 0;
  max-width: 200px;
  left: 100px;
  width: 0;
  height: 0;
}

.process-audio {
  height: 1px;
  width: 150px;
  margin-left: 8px;
  background-color: rgb(156, 163, 175);
}

.process-current {
  height: 1px;
  width: 0;
  background-color: #0fcdce;
  box-shadow: 0 0 3px 1px #0fcdce;
}

.time-audio {
  font-size: 0.9rem;
  color: #888;
  margin-left: 8px;
}
</style>
