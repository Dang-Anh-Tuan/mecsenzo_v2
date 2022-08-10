<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  comments: { Header },
}
</script>
