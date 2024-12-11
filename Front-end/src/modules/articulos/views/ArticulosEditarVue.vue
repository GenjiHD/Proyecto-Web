<template>
  <!-- Contenedor principal de la página centrado vertical y horizontalmente -->
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100" v-if="articulos[0]">
    <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
      <div class="card-header border-custom">
        <h4 class="text-center">Editar Artículo</h4> <!-- Título del formulario -->
      </div>
      <!-- Mensaje de éxito si se actualizó el artículo correctamente -->
      <div class="alert alert-success text-center" v-if="mensaje && mensaje[0] === 'Articulo actualizado con éxito'" role="alert">
        {{ mensaje[0].toString() }} <!-- Muestra el mensaje de éxito -->
      </div>
      <!-- Mensajes de error si no se actualizó correctamente -->
      <div class="alert alert-danger text-center" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== 'Articulo actualizado con éxito'" role="alert">
        {{ error }} <!-- Muestra cada error -->
      </div>
      <div class="card-body">
        <!-- Formulario con validación -->
        <Form :validation-schema="ArticuloEditarSchema" @submit="onValidated">
          <!-- Campo de descripción -->
          <div class="mb-3">
            <label for="descripcion">Descripción</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-card-heading"></i></span>
              <Field type="text" class="form-control" name="descripcion" v-model="articulos[0].descripcion" placeholder="Descripción" />
            </div>
            <ErrorMessage name="descripcion" class="errorValidacion" /> <!-- Muestra mensaje de error si la validación falla -->
          </div>
          <!-- Campo de precio -->
          <div class="mb-3">
            <label for="precio">Precio</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
              <Field type="number" class="form-control" name="precio" v-model="articulos[0].precio" placeholder="Precio" />
            </div>
            <ErrorMessage name="precio" class="errorValidacion" />
          </div>
          <!-- Campo de cantidad en almacén -->
          <div class="mb-3">
            <label for="cantidad_en_almacen">Cantidad en Almacén</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-box"></i></span>
              <Field type="number" class="form-control" name="cantidad_en_almacen" v-model="articulos[0].cantidad_en_almacen" placeholder="Cantidad en Almacén" />
            </div>
            <ErrorMessage name="cantidad_en_almacen" class="errorValidacion" />
          </div>
          <!-- Campo de fecha de caducidad -->
          <div class="mb-3">
            <label for="fecha_caducidad">Fecha de Caducidad</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-calendar2-week"></i></span>
              <Field type="date" class="form-control" name="fecha_caducidad" v-model="articulos[0].fecha_caducidad" placeholder="Fecha de Caducidad" />
            </div>
            <ErrorMessage name="fecha_caducidad" class="errorValidacion" />
          </div>
          <!-- Botón para enviar el formulario -->
          <div class="mb-3 text-center">
            <button type="submit" class="btn border-custom">Actualizar</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // Importaciones necesarias
  import { onMounted, ref, watch, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useArticulos } from '../controladores/useArticulos';
  import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import { ArticuloEditarSchema } from '../schemas/ArticuloSchema';

  const { getArticulosById, mensaje, updateArticulos, articulos } = useArticulos();

  let idArticulo = 0;
  const route = useRoute();

  // Obtiene el artículo por su ID cuando el componente se monta
  onMounted(async () => {
    idArticulo = Number(route.params.id);
    await getArticulosById(idArticulo);
  });

  // Muestra mensaje de error si la actualización falla
  const showErrorToast = () => {
    if (mensaje.value && mensaje.value[0] !== 'Articulo actualizado con éxito') {
      errorToast('No se puede actualizar este artículo');
    }
  };

  // Computed para manejar el precio como número
  const precioFloat = computed({
    get: () => {
      const precio = articulos.value[0]?.precio;
      return typeof precio === 'string' ? parseFloat(precio) : precio ?? 0;
    },
    set: (value: number) => {
      if (articulos.value[0]) {
        articulos.value[0].precio = parseFloat(value.toString());
      }
    }
  });

  // Función para manejar la validación del formulario y actualizar el artículo
  const onValidated = async () => {
    await updateArticulos(articulos.value[0]);
  };

  // Muestra mensaje de éxito cuando el artículo es actualizado correctamente
  const showSuccessToast = () => {
    if (mensaje.value && mensaje.value[0] === 'Articulo actualizado con éxito') {
      sucessToast('Artículo actualizado con éxito');
    }
  };

  // Observa los cambios en los mensajes y ejecuta las funciones de éxito y error
  watch(mensaje, () => {
    showErrorToast();
    showSuccessToast();
  });

  // Router para redirigir después de la actualización
  const router = useRouter();

  const disableButton = ref(false);
  const tiempo = ref(3);

  // Temporizador para redirigir después de la actualización exitosa
  watch(mensaje, () => {
    timerRedirect();
  });

  const timerRedirect = () => {
    if (mensaje.value && mensaje.value[0] === 'Artículo actualizado con éxito') {
      disableButton.value = true;
      const interval = setInterval(() => {
        if (tiempo.value > 0) {
          tiempo.value -= 1;
        } else {
          clearInterval(interval);
          router.push('/articulos'); // Redirige a la lista de artículos
        }
      }, 1000);
    }
  };
</script>

<style scoped>
  /* Estilo para los mensajes de error */
  .errorValidacion {
    color: red;
  }

  /* Estilo personalizado para el borde de los elementos */
  .border-custom {
    border: 3px solid #0d00ff;
    border-radius: 20px;
    background-color: #7f7ce9;
  }

  /* Estilo para la tarjeta pequeña */
  .small-card {
    max-width: 600px;
    width: 100%;
  }

  /* Estilo general de la tarjeta */
  .card {
    margin: 0 auto;
    padding: 2rem;
  }
</style>
