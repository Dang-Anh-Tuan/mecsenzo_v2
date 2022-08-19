<template>
  <div
    class="container-sidebar w-[30%] h-full py-[36px] px-[20px] bg-white shadow-2xl rounded-[20px] z-[50] flex justify-center items-center"
  >
    <div class="flex justify-center items-center bg-loader w-[64px] h-[64px] animate-spin rounded-full">
      <div class="w-[60px] h-[60px] rounded-full bg-white">

      </div>
    </div>
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
