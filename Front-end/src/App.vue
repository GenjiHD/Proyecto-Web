<script setup lang="ts">
  import MenuVue from './modules/principal/views/MenuVue.vue';
  import FooterVue from './modules/principal/views/FooterVue.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <MenuVue/>
  </header>
  <RouterView/>
</template>
