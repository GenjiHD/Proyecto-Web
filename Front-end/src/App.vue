<script setup lang="ts"> 
  import MenuVue from './modules/principal/views/MenuVue.vue';  // Importa el componente MenuVue para la barra de navegación.
  import FooterVue from './modules/principal/views/FooterVue.vue';  // Importa el componente FooterVue para el pie de página.
  import { RouterView } from 'vue-router';  // Importa el componente RouterView, que es utilizado para renderizar las vistas de la ruta activa.
</script>

<template>
  <header>
    <MenuVue/>  <!-- Inserta el componente MenuVue en el encabezado. -->
  </header>
  <RouterView/>  <!-- El componente RouterView renderiza el componente correspondiente a la ruta activa. -->
</template>
