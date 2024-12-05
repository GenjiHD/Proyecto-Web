<script setup lang="ts">
  import MenuVue from './modules/principal/views/MenuVue.vue'
  import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <MenuVue/>
  </header>
  <RouterView/>
</template>
