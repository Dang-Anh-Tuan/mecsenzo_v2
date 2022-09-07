<template>
  <div
    ref="container"
    class="absolute flex items-center justify-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
  >
    <p v-if="size === 'large'" class="absolute text-[1.2rem] text-white">
      {{ percent.toFixed(0) }}%
    </p>

    <svg class="flex justify-center items-center w-full h-full">
      <circle
        ref="circleAll"
        :cx="sizeWidth[size] / 2"
        :cy="sizeWidth[size] / 2"
        :r="sizeWidth[size] / 5"
      />
      <circle
        ref="circlePercent"
        :cx="sizeWidth[size] / 2"
        :cy="sizeWidth[size] / 2"
        :r="sizeWidth[size] / 5"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: () => 'medium',
    },
    percent: {
      type: Number,
      default: () => 0,
    },
  },

  data() {
    return {
      sizeWidth: {
        tiny: 50,
        small: 100,
        medium: 200,
        large: 400,
      },
      sizeFont: {
        tiny: 0.5,
        small: 0.8,
        medium: 1,
        large: 1.2,
      },
      sizeStroke: {
        tiny: 2,
        small: 4,
        medium: 6,
        large: 10,
      },
      offsetDash: {
        tiny: 65,
        small: 130,
        medium: 250,
        large: 520,
      },
    }
  },

  mounted() {
    const radiusCircle = Number(this.$refs.circleAll.getAttribute('r'))
    const totalLengthCircle = 2 * Math.PI * radiusCircle

    this.$refs.container.style.width = this.sizeWidth[this.size] + 'px'
    this.$refs.container.style.height = this.sizeWidth[this.size] + 'px'

    this.$refs.circleAll.style.stroke = '#e2e8f0'
    this.$refs.circlePercent.style.stroke = '#33b5e7'
    this.$refs.circleAll.style.strokeWidth = this.sizeStroke[this.size]

    this.$refs.circlePercent.style.strokeDasharray = totalLengthCircle
    this.$refs.circlePercent.style.strokeDashoffset =
      totalLengthCircle - (this.percent / 100) * totalLengthCircle
    this.$refs.circlePercent.style.strokeWidth = this.sizeStroke[this.size]
  },
}
</script>

<style>
circle {
  fill: none;
}
</style>
