<script lang="ts" setup>
  // Importación de funciones y librerías de Vue y otros módulos.
  import { onMounted, ref, watch } from 'vue'; // Importa funciones de Vue como onMounted (para ejecutar código después de que el componente se haya montado), ref (para crear referencias reactivas) y watch (para observar cambios en valores reactivos).
  import { useRoute, useRouter } from 'vue-router'; // Importa funciones para manejar rutas en Vue.
  import { useCliente } from '../controladores/useCliente'; // Importa un módulo para manejar las operaciones relacionadas con los clientes.
  import 'vue3-toastify/dist/index.css'; // Importa el archivo de estilos CSS para las notificaciones de "vue3-toastify".

  // Desestructura las funciones y valores necesarios de useCliente.
  const { getClienteById, deleteCliente, mensaje, clientes } = useCliente();

  // Declara una variable para almacenar el ID del cliente.
  let idCliente = 0;
  const route = useRoute(); // Obtiene la ruta actual.
  const routeRedirect = useRouter(); // Obtiene la instancia de router para poder redirigir.

  // Observa los cambios en el valor de 'mensaje' y, cuando cambia, redirige a la página de clientes.
  watch(
    () => mensaje.value,
    newId => {
        routeRedirect.push('/clientes'); // Redirige al listado de clientes cuando se recibe un mensaje.
    }
  );

  // Función que se ejecuta cuando el componente es montado (después de que se haya cargado).
  onMounted(async () => {
    idCliente = Number(route.params.id); // Obtiene el ID del cliente desde los parámetros de la ruta.
    await getClienteById(Number(idCliente)); // Llama a la función 'getClienteById' para obtener los datos del cliente con el ID especificado.
  });
</script>

<template>
    <!-- Contenedor principal que usa flexbox para centrar el contenido -->
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100" v-if="clientes[0]">
      <!-- Tarjeta con estilo personalizado para mostrar el formulario de borrado de cliente -->
      <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
        <!-- Encabezado de la tarjeta -->
        <div class="card-header border-custom">
          <h4 class="text-center">Borrar Cliente</h4> 
        </div>
        <!-- Mensaje de éxito si el cliente se elimina correctamente -->
        <div class="alert alert-success text-center" v-if="mensaje && mensaje[0] === 'Cliente eliminado con éxito'" role="alert">
          {{ mensaje[0].toString() }} <!-- Muestra el mensaje de éxito -->
        </div>
        <!-- Mensajes de error si ocurren -->
        <div class="alert alert-danger text-center" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== ''" role="alert">
          {{ error }} <!-- Muestra el mensaje de error -->
        </div>
        <!-- Cuerpo de la tarjeta con los detalles del cliente -->
        <div class="card-body">
          <!-- Sección para mostrar el ID del cliente -->
          <div class="mb-3">
            <label for="id">ID</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-hash"></i></span> <!-- Ícono de hash para el ID -->
              <input type="text" class="form-control" v-model="clientes[0].id" placeholder="Id" disabled> <!-- Campo para el ID, solo lectura -->
            </div>
          </div>
          <!-- Sección para mostrar el nombre del cliente -->
          <div class="mb-3">
            <label for="nombre">Nombre</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span> <!-- Ícono de persona -->
              <input type="text" class="form-control" v-model="clientes[0].nombre" placeholder="Nombre" disabled> <!-- Campo para el nombre, solo lectura -->
            </div>
          </div>
          <!-- Sección para mostrar la dirección del cliente -->
          <div class="mb-3">
            <label for="direccion">Dirección</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-house-door"></i></span> <!-- Ícono de dirección -->
              <input type="text" class="form-control" v-model="clientes[0].direccion" placeholder="Dirección" disabled> <!-- Campo para la dirección, solo lectura -->
            </div>
          </div>
          <!-- Sección para mostrar el teléfono del cliente -->
          <div class="mb-3">
            <label for="telefono">Teléfono</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-telephone"></i></span> <!-- Ícono de teléfono -->
              <input type="text" class="form-control" v-model="clientes[0].telefono" placeholder="Teléfono" disabled> <!-- Campo para el teléfono, solo lectura -->
            </div>
          </div>
          <!-- Sección para mostrar el correo electrónico del cliente -->
          <div class="mb-3">
            <label for="correo">Correo Electrónico</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-envelope"></i></span> <!-- Ícono de correo -->
              <input type="email" class="form-control" v-model="clientes[0].correo_electronico" placeholder="Correo Electrónico" disabled> <!-- Campo para el correo electrónico, solo lectura -->
            </div>
          </div>
          <!-- Sección para mostrar la ciudad del cliente -->
          <div class="mb-3">
            <label for="ciudad">Ciudad</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-geo-alt"></i></span> <!-- Ícono de ubicación -->
              <input type="text" class="form-control" v-model="clientes[0].ciudad" placeholder="Ciudad" disabled> <!-- Campo para la ciudad, solo lectura -->
            </div>
          </div>
          <!-- Botón para borrar el cliente -->
          <div class="mb-3 text-center">
            <button class="btn btn-danger" @click="deleteCliente(clientes[0])">Borrar</button> <!-- Botón para borrar al cliente -->
          </div>
        </div>
      </div>    
    </div>
  </template>
  
  <style scoped>
  /* Estilo para el borde personalizado de la tarjeta */
  .border-custom {
    border: 3px solid #2b00ff; /* Establece un borde de 3px de color morado */
    border-radius: 20px; /* Redondea las esquinas del borde */
    background-color: #8d90e0; /* Establece un fondo color morado claro */
  }

  /* Estilo para la tarjeta pequeña (max-width: 600px) */
  .small-card {
    max-width: 600px; /* La tarjeta tendrá un ancho máximo de 600px */
    width: 100%; /* La tarjeta ocupa el 100% del contenedor */
  }

  /* Estilo para la tarjeta en sí (centrada y con padding) */
  .card {
    margin: 0 auto; /* Centra la tarjeta dentro del contenedor */
    padding: 2rem; /* Añade padding dentro de la tarjeta */
  }
</style>
