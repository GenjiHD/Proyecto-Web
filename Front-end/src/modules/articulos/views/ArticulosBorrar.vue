<script lang="ts" setup>
// Importación de las funciones necesarias de Vue, vue-router y otros módulos
import { onMounted, ref, watch } from 'vue'; // Importa funciones reactivas y de ciclo de vida
import { useRoute, useRouter } from 'vue-router'; // Para gestionar rutas y redirección
import { useArticulos } from '../controladores/useArticulos'; // Para manejar artículos
import 'vue3-toastify/dist/index.css'; // Importación de estilos para notificaciones de Toast

// Desestructuración de las funciones que gestionan artículos y mensajes
const { getArticulosById, mensaje, deleteArticulos, articulos } = useArticulos();

// Variable para almacenar el ID del artículo a eliminar
let idArticulo = 0;
const route = useRoute(); // Usar la ruta actual para acceder a parámetros
const routeRedirect = useRouter(); // Usar el enrutador para redirigir a otras rutas

// Establecer un watch para redirigir a la lista de artículos si el mensaje cambia
watch(
  () => mensaje.value, // Observar cambios en el mensaje
  (newId) => { // Cuando el mensaje cambia
    routeRedirect.push('/articulos'); // Redirigir al listado de artículos
  }
);

// Hook onMounted para cargar el artículo por su ID cuando el componente se monta
onMounted(async () => {
  idArticulo = Number(route.params.id); // Extraer el ID de la ruta
  await getArticulosById(idArticulo); // Llamar a la función para obtener los detalles del artículo
});
</script>

<template>
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100" v-if="articulos[0]">
    <!-- Estructura de la tarjeta donde se muestra el artículo -->
    <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
      <div class="card-header border-custom">
        <h4 class="text-center">Borrar Artículo</h4> <!-- Título de la tarjeta -->
      </div>

      <!-- Mostrar mensaje de éxito si el artículo se eliminó correctamente -->
      <div
        class="alert alert-success text-center"
        v-if="mensaje && mensaje[0] === 'Articulo eliminado con éxito'"
        role="alert"
      >
        {{ mensaje[0].toString() }} <!-- Mostrar mensaje de éxito -->
      </div>

      <!-- Mostrar mensajes de error si la eliminación falla -->
      <div
        class="alert alert-danger text-center"
        v-for="(error, index) in mensaje"
        :key="index"
        v-if="mensaje && mensaje[0] !== 'Articulo eliminado con éxito'"
        role="alert"
      >
        {{ error }} <!-- Mostrar cada error individualmente -->
      </div>

      <div class="card-body">
        <!-- Mostrar los detalles del artículo que se va a eliminar -->
        <div class="mb-3">
          <label for="id">ID</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-hash"></i></span>
            <input
              type="text"
              class="form-control"
              v-model="articulos[0].id"
              placeholder="Id"
              disabled <!-- Campo solo lectura -->
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="descripcion">Descripción:</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-card-text"></i></span>
            <input
              type="text"
              class="form-control"
              v-model="articulos[0].descripcion"
              placeholder="Descripción"
              disabled <!-- Campo solo lectura -->
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="precio">Precio:</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
            <input
              type="number"
              class="form-control"
              v-model="articulos[0].precio"
              placeholder="Precio"
              disabled <!-- Campo solo lectura -->
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="cantidad_en_almacen">Cantidad en Almacén:</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-box"></i></span>
            <input
              type="number"
              class="form-control"
              v-model="articulos[0].cantidad_en_almacen"
              placeholder="Cantidad en Almacén"
              disabled <!-- Campo solo lectura -->
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="fecha_caducidad">Fecha de Caducidad:</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-calendar2-week"></i></span>
            <input
              type="date"
              class="form-control"
              v-model="articulos[0].fecha_caducidad"
              disabled <!-- Campo solo lectura -->
            />
          </div>
        </div>

        <!-- Botón para eliminar el artículo -->
        <div class="mb-3 text-center">
          <button class="btn btn-danger" @click="deleteArticulos(articulos[0])">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para el borde de la tarjeta */
.border-custom {
    border: 3px solid #100dc6;
    border-radius: 20px;
    background-color: #858de7; /* Fondo de borde personalizado */
}

/* Establecer el tamaño de la tarjeta */
.small-card {
    max-width: 600px;
    width: 100%; /* Asegura que se ajusta al tamaño de pantalla */
}

/* Estilos generales para la tarjeta */
.card {
    margin: 0 auto;
    padding: 2rem; /* Añadir espaciado interno */
}
</style>
