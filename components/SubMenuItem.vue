<template>
  <div
    v-if="type == 'button'"
    class="flex p-3 items-center border-b-[1px] cursor-pointer border-b-[#939496] hover:border-b-[#ff7200] group transition-all duration-300"
    @click="handleClickSubMenuItem"
  >
    <div
      class="w-[30px] text-[1.2rem] text-[#939496] group-hover:text-dark_primary transition-all duration-300"
    >
      <fa :icon="icon" />
    </div>
    <div>
      <p
        class="text-[1.2rem] text-[#939496] group-hover:text-dark_primary transition-all duration-300"
      >
        {{ content }}
      </p>
    </div>
    <div
      v-if="isDarkMode"
      class="relative w-[68px] h-[30px] bg-[#939496] rounded-full ml-5"
    >
      <div
        class="absolute top-[2px] left-1 w-[26px] h-[26px] bg-slate-600 rounded-full"
      ></div>
    </div>
  </div>
  <nuxt-link
    v-else-if="type == 'nuxt-link'"
    class="flex p-3 items-center border-b-[1px] cursor-pointer border-b-[#939496] hover:border-b-[#ff7200] group transition-all duration-300"
    :to="to"
    @click="handleClickSubMenuItem"
  >
    <div
      class="w-[30px] text-[1.2rem] text-[#939496] group-hover:text-dark_primary transition-all duration-300"
    >
      <fa :icon="icon" />
    </div>
    <div>
      <p
        class="text-[1.2rem] text-[#939496] group-hover:text-dark_primary transition-all duration-300"
      >
        {{ content }}
      </p>
    </div>
    <div
      v-if="isDarkMode"
      class="relative w-[68px] h-[30px] bg-[#939496] rounded-full ml-5"
    >
      <div
        class="absolute top-[2px] left-1 w-[26px] h-[26px] bg-slate-600 rounded-full"
      ></div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: () => 'envelope',
    },
    content: {
      type: String,
      default: () => '',
    },
    handleClickSubMenuItem: {
      type: Function,
      default: () => {
        return function () {}
      },
    },
    isDarkMode: {
      type: Boolean,
    },
    type: {
      type: String,
      default: () => 'button',
    },
    to: {
      type: String,
      default: () => '#',
    },
  },
}
</script>
