<template>
  <div class="min-h-[600px] w-full rounded-[25px] shadow-2xl">
    <div
      :class="`${getClassColsTabItem} relative grid w-full h-[68px] bg-dark_primary rounded-[25px]`"
    >
      <div
        v-for="(tabItem, index) in tabItems"
        :key="tabItem.name"
        :class="`flex items-center justify-center w-full h-full text-white text-[1.2rem] 
                 font-semibold cursor-pointer select-none`"
        @click="setCurrentTab(index)"
      >
        {{ tabItem.title }}
      </div>
      <div
        :class="`${getClassMaker} absolute top-0 h-full bg-[rgba(255,255,255,0.3)] 
        rounded-[25px] transition-all duration-300 ease-in-out `"
      ></div>
    </div>
    <div class="mt-[50px] flex justify-center">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabItems: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      currentTab: 1,
      currentComponent: this.tabItems && this.tabItems[1].component,
    }
  },

  computed: {
    getClassColsTabItem() {
      return `grid-cols-${this.tabItems.length}`
    },
    getClassMaker() {
      const width = Number.parseFloat(100 / this.tabItems.length).toFixed(2)
      const leftPosition = this.currentTab * 100
      return `w-[${width}%] translate-x-[${leftPosition}%]`
    },
  },

  methods: {
    setCurrentTab(index) {
      this.currentTab = index
      this.currentComponent = this.tabItems[this.currentTab].component
    },
  },
}
</script>

<style></style>
