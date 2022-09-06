<template>
  <div
    class="flex justify-center items-center bg-loader w-[64px] h-[64px] animate-spin rounded-full"
  >
    <div class="w-[60px] h-[60px] rounded-full bg-white dark:bg-dark_bg_light"></div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  .container-sidebar {
    position: absolute;
    width: 90px;
    height: 80vh;
    border-radius: 5px;
  }
  .container-sidebar:hover {
    width: 300px;
  }
}
</style>
