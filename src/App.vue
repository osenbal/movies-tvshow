<script setup>
import navbarApp from './components/navbarApp.vue';
import bottombarApp from './components/bottombarApp.vue';
import footerApp from './components/footerApp.vue';
</script>

<template>
  <navbarApp />
  <router-view></router-view>
  <div class="pb-[100px]"></div>
  <footerApp />
  <bottombarApp />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
