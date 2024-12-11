<script lang="ts" setup>
// Importación de funciones necesarias desde Vue y otros módulos
import { ref, watch } from 'vue'; // Importa funciones de estado reactivo y watch
import type { ArticulosAgregar } from '../interfaces/articulos-interface'; // Importa el tipo de datos ArticulosAgregar
import { useArticulos } from '../controladores/useArticulos'; // Importa el controlador de artículos
import { errorToast, successToast } from '@/modulos/utils/displayToast'; // Funciones para mostrar notificaciones de éxito y error
import { ArticuloAgregarSchema } from '../schemas/ArticuloSchema'; // Importa el esquema de validación del formulario
import { Form, Field, ErrorMessage } from 'vee-validate'; // Importa componentes de validación del formulario

// Llamamos a las funciones necesarias del controlador useArticulos
const { setArticulos, mensaje } = useArticulos();
// Definimos un estado reactivo para los datos del artículo a agregar
let articulo = ref<ArticulosAgregar>({
  descripcion: '',
  precio: 0,
  cantidad_en_almacen: 0,
  fecha_caducidad: null
});
// Función que se ejecuta cuando el formulario es validado correctamente
const onValidated = async () => {
  await setArticulos(articulo.value); // Agrega el artículo
  // Limpiamos los campos del formulario después de agregar exitosamente
  articulo.value = {
    descripcion: '',
    precio: 0,
    cantidad_en_almacen: 0,
    fecha_caducidad: null
  };
};
// Función para mostrar un mensaje de error si no se pudo agregar el artículo
const showErrorToast = () => {
  if (mensaje.value && mensaje.value[0] !== 'Articulo agregado con éxito') {
    // Muestra un mensaje de error si no fue exitoso
    errorToast('No se pudo agregar el artículo. Verifica los datos');
  }
};
// Función para mostrar un mensaje de éxito cuando el artículo se agrega correctamente
const showSuccessToast = () => {
  if (mensaje.value && mensaje.value[0] === 'Articulo agregado con éxito') {
    // Muestra un mensaje de éxito si el artículo fue agregado
    successToast('¡Artículo agregado con éxito!');
  }
};
// Usamos watch para observar los cambios en el mensaje y activar las funciones correspondientes
watch(mensaje, () => {
  showErrorToast(); // Muestra el mensaje de error si es necesario
  showSuccessToast(); // Muestra el mensaje de éxito si es necesario
});
</script>

<template>
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
    <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
      <div class="card-header border-custom">
        <h4 class="text-center">Agregar Artículo</h4> <!-- Título de la tarjeta -->
      </div>
      <!-- Mensaje de éxito si el artículo fue agregado correctamente -->
      <div class="alert alert-success text-center mt-3 p-2" v-if="mensaje && mensaje[0] === 'Articulo agregado con éxito'" role="alert">
        {{ mensaje[0].toString() }} <!-- Muestra el mensaje de éxito -->
      </div>
      <!-- Mensaje de error si ocurrió algún problema al agregar el artículo -->
      <div class="alert alert-danger text-center mt-3 p-2" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== 'Articulo agregado con éxito'" role="alert">
        {{ error }} <!-- Muestra los mensajes de error -->
      </div>
      <div class="card-body">
        <!-- Formulario de validación con esquema -->
        <Form :validation-schema="ArticuloAgregarSchema" @submit="onValidated">
          <!-- Descripción -->
          <div class="mb-3">
            <label for="descripcion">Descripción</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-card-heading"></i></span>
              <Field type="text" class="form-control" name="descripcion" v-model="articulo.descripcion" placeholder="Descripción" />
            </div>
            <ErrorMessage name="descripcion" class="errorValidacion" /> <!-- Muestra mensaje de error si no es válido -->
          </div>
          <!-- Precio -->
          <div class="mb-3">
            <label for="precio">Precio</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
              <Field type="number" class="form-control" name="precio" v-model="articulo.precio" placeholder="Precio" />
            </div>
            <ErrorMessage name="precio" class="errorValidacion" /> <!-- Muestra mensaje de error si no es válido -->
          </div>
          <!-- Cantidad en Almacén -->
          <div class="mb-3">
            <label for="cantidad_en_almacen">Cantidad en Almacén</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-box"></i></span>
              <Field type="number" class="form-control" name="cantidad_en_almacen" v-model="articulo.cantidad_en_almacen" placeholder="Cantidad en Almacén" />
            </div>
            <ErrorMessage name="cantidad_en_almacen" class="errorValidacion" /> <!-- Muestra mensaje de error si no es válido -->
          </div>
          <!-- Fecha de Caducidad -->
          <div class="mb-3">
            <label for="fecha_caducidad">Fecha de Caducidad</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-calendar2-week"></i></span>
              <Field type="date" class="form-control" name="fecha_caducidad" v-model="articulo.fecha_caducidad" placeholder="Fecha de Caducidad" />
            </div>
            <ErrorMessage name="fecha_caducidad" class="errorValidacion" /> <!-- Muestra mensaje de error si no es válido -->
          </div>
          <!-- Botón de Envío -->
          <div class="mb-3 text-center">
            <button type="submit" class="btn btn-success">Agregar</button> <!-- Botón para enviar el formulario -->
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para los mensajes de validación */
.errorValidacion {
  color: red;
  font-weight: bold; /* Estilo para mensajes de error */
}

/* Estilo personalizado para el borde de la tarjeta */
.border-custom {
    border: 3px solid #2020b0; /* Color del borde */
    border-radius: 20px; /* Bordes redondeados */
    background-color: #888be3; /* Color de fondo */
}

/* Estilos para la tarjeta pequeña */
.small-card {
    max-width: 600px; /* Ajusta el tamaño de la tarjeta */
    width: 100%; /* Se adapta al tamaño de pantalla */
}

.card {
    margin: 0 auto;
    padding: 2rem; /* Espaciado interior de la tarjeta */
}
</style>
