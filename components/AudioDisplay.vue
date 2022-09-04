<template>
  <div
    v-if="url"
    :class="`container-result ${isColorWhite ? 'container-result--white' : ''}`"
  >
    <button class="btn-controller" @click="handleTogglePlayPreview">
      <fa
        v-if="isPreviewPause"
        icon="play"
        :class="`${isColorWhite ? 'text-white' : ''}`"
      />
      <fa v-else icon="pause" :class="`${isColorWhite ? 'text-white' : ''}`" />
    </button>
    <div class="process-audio">
      <div ref="processCurrent" class="process-current"></div>
    </div>
    <div
      :class="`time-audio ${isColorWhite ? 'text-white' : 'text-[#888]'} ${
        currentTimePreview && totalTimePreview ? 'time-audio--show' : ''
      }`"
    >
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
    isColorWhite: {
      type: Boolean,
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
  background-color: #0fcdce;
}
.process-current {
  position: relative;
  top: -1px;
  height: 4px;
  width: 0;
}

.time-audio {
  font-size: 0.9rem;
  margin-left: 8px;
  opacity: 0;
}

.time-audio--show {
  opacity: 1;
}

.container-result--white .process-current {
  color: #fff;
  background-color: #fff;
}
</style>
