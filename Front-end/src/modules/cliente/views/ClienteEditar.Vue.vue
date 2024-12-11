<script lang="ts" setup>
  // Importación de hooks y funcionalidades de Vue y otras librerías
  import { onMounted, ref, watch } from 'vue';  // Importa hooks de Vue para el ciclo de vida, reactividad y observación.
  import { useRoute, useRouter } from 'vue-router';  // Importa hooks para usar rutas en Vue.
  import { useCliente } from '../controladores/useCliente';  // Importa un composable que maneja la lógica de clientes.
  import { Form, Field, ErrorMessage } from 'vee-validate';  // Importa componentes de validación de formularios.
  import { clienteSchema } from '../schemas/ClienteSchema';  // Importa el esquema de validación para los datos del cliente.

  // Desestructuración del composable 'useCliente' para obtener funciones y datos relacionados con los clientes.
  const { getClienteById, mensaje, updateCliente, clientes } = useCliente();

  // Definición de la variable para almacenar el ID del cliente
  let idCliente = 0;
  const route = useRoute();  // Usamos el hook 'useRoute' para obtener la información de la ruta actual.

  // Hook que se ejecuta cuando el componente se monta.
  onMounted(async () => {
    idCliente = Number(route.params.id);  // Obtiene el 'id' de la ruta y lo convierte en número.
    await getClienteById(idCliente);  // Llama a la función 'getClienteById' para obtener los detalles del cliente por ID.
  });

  // Función que muestra un mensaje de error si la actualización del cliente no fue exitosa.
  const showErrorToast = () => {
    if (mensaje.value && mensaje.value[0] !== 'Cliente actualizado con éxito') {
      errorToast('No se puede actualizar este cliente');  // Muestra un toast de error si el mensaje no es el esperado.
    }
  };

  // Función que muestra un mensaje de éxito si la actualización del cliente fue exitosa.
  const showSuccessToast = () => {
    if (mensaje.value && mensaje.value[0] === 'Cliente actualizado con éxito') {
      sucessToast('Cliente actualizado con éxito');  // Muestra un toast de éxito si el mensaje es el esperado.
    }
  };

  // Observador para escuchar los cambios en el mensaje de respuesta de la API.
  watch(mensaje, () => {
    showErrorToast();  // Llama a la función de error si el mensaje indica un error.
    showSuccessToast();  // Llama a la función de éxito si el mensaje indica que la actualización fue exitosa.
  });

  // Inicialización del router para redirigir después de la actualización.
  const router = useRouter();

  // Definición de un estado reactivo para deshabilitar el botón después de la actualización.
  const disableButton = ref(false);
  const tiempo = ref(3);  // Contador que se usa para redirigir después de un tiempo.

  // Observador para escuchar los cambios en el mensaje y ejecutar la redirección.
  watch(mensaje, () => {
    timerRedirect();  // Llama a la función que maneja el temporizador y redirige si es necesario.
  });

  // Función que maneja la redirección después de un tiempo de espera.
  const timerRedirect = () => {
    if (mensaje.value && mensaje.value[0] === 'Cliente actualizado con éxito') {
      disableButton.value = true;  // Deshabilita el botón para evitar múltiples clics.
      const interval = setInterval(() => {
        if (tiempo.value > 0) {
          tiempo.value -= 1;  // Decrementa el contador.
        } else {
          clearInterval(interval);  // Detiene el temporizador.
          router.push('/clientes');  // Redirige a la lista de clientes después de 3 segundos.
        }
      }, 1000);  // Ejecuta cada segundo.
    }
  };
</script>

<template>
  <!-- Contenedor principal que usa clases de Bootstrap para un diseño centrado y adaptativo -->
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-10" v-if="clientes[0]">
    <!-- Tarjeta con una clase para ajustarse al tamaño de la pantalla, con sombra y fondo claro -->
    <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
      
      <!-- Encabezado de la tarjeta con un borde personalizado -->
      <div class="card-header border-custom">
        <!-- Título centrado dentro del encabezado -->
        <h4 class="text-center">Editar Cliente</h4>
      </div>

      <!-- Alerta de éxito que se muestra solo si el mensaje es de éxito -->
      <div
        class="alert alert-success text-center mt-3 p-2"
        v-if="mensaje && mensaje[0] === 'Cliente actualizado con éxito'"
        role="alert"
      >
        {{ mensaje[0].toString() }}
      </div>

      <!-- Alerta de error que se muestra solo si el mensaje no es de éxito -->
      <div
        class="alert alert-danger text-center mt-3 p-2"
        v-for="(error, index) in mensaje"
        :key="index"
        v-if="mensaje && mensaje[0] !== 'Cliente actualizado con éxito'"
        role="alert"
      >
        {{ error }}
      </div>
      <!-- Cuerpo de la tarjeta donde se encuentra el formulario -->
      <div class="card-body">
        <!-- Formulario con validación usando el componente Form de vee-validate -->
        <Form :validation-schema="clienteSchema" @submit="updateCliente(clientes[0])">
          <!-- Campo ID: el ID es solo de lectura -->
          <div class="mb-3">
            <label for="id" class="form-label">ID</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-hash"></i></span>
              <input
                type="text"
                class="form-control"
                v-model="clientes[0].id"
                placeholder="Id"
                disabled
              />
            </div>
          </div>
          <!-- Campo Nombre: campo de texto con validación -->
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <Field
                type="text"
                class="form-control"
                name="nombre"
                v-model="clientes[0].nombre"
                placeholder="Nombre"/>
            </div>
            <!-- Mensaje de error de validación para el campo Nombre -->
            <ErrorMessage name="nombre" class="errorValidacion" />
          </div>
          <!-- Campo Dirección: campo de texto con validación -->
          <div class="mb-3">
            <label for="direccion" class="form-label">Dirección</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-house-door"></i></span>
              <Field
                type="text"
                class="form-control"
                name="direccion"
                v-model="clientes[0].direccion"
                placeholder="Dirección"/>
            </div>
            <!-- Mensaje de error de validación para el campo Dirección -->
            <ErrorMessage name="direccion" class="errorValidacion" />
          </div>
          <!-- Campo Teléfono: campo de texto con validación -->
          <div class="mb-3">
            <label for="telefono" class="form-label">Teléfono</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-telephone"></i></span>
              <Field
                type="text"
                class="form-control"
                name="telefono"
                v-model="clientes[0].telefono"
                placeholder="Teléfono"/>
            </div>
            <!-- Mensaje de error de validación para el campo Teléfono -->
            <ErrorMessage name="telefono" class="errorValidacion" />
          </div>
          <!-- Campo Correo Electrónico: campo de texto de tipo email con validación -->
          <div class="mb-3">
            <label for="correo_electronico" class="form-label">Correo Electrónico</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-envelope"></i></span>
              <Field
                type="email"
                class="form-control"
                name="correo_electronico"
                v-model="clientes[0].correo_electronico"
                placeholder="Correo Electrónico"/>
            </div>
            <!-- Mensaje de error de validación para el campo Correo Electrónico -->
            <ErrorMessage name="correo_electronico" class="errorValidacion" />
          </div>
          <!-- Campo Ciudad: campo de texto con validación -->
          <div class="mb-3">
            <label for="ciudad" class="form-label">Ciudad</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-geo-alt"></i></span>
              <Field
                type="text"
                class="form-control"
                name="ciudad"
                v-model="clientes[0].ciudad"
                placeholder="Ciudad"/>
            </div>
          </div>
          <!-- Botón para enviar el formulario -->
          <div class="mb-3 text-center">
            <button
              type="submit"
              class="btn btn-warning"
              :disabled="disableButton">
              Actualizar
            </button>
          </div>
          <!-- Mensaje que aparece mientras se espera la redirección -->
          <p class="text-center" v-if="disableButton">Redirigiendo en {{ tiempo }}...</p>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Estilo para los mensajes de error */
  .errorValidacion {
    color: red; /* El texto de los mensajes de error será de color rojo */
  }

  /* Estilo para el borde personalizado de la tarjeta */
  .border-custom {
    border: 3px solid #4000ff; /* Establece un borde de 3px de color #4000ff (un tono morado) */
    border-radius: 20px; /* Redondea las esquinas del borde a 20px */
    background-color: #9aa3ec; /* Establece un fondo color morado claro */
  }

  /* Estilo para la tarjeta pequeña (max-width: 600px) */
  .small-card {
    max-width: 600px; /* La tarjeta tendrá un ancho máximo de 600px */
    width: 100%; /* El ancho será del 100% del contenedor, pero limitado a 600px */
  }

  /* Estilo para la tarjeta en sí (margen automático y padding) */
  .card {
    margin: 0 auto; /* Centra la tarjeta en el contenedor */
    padding: 2rem; /* Agrega un padding de 2rem dentro de la tarjeta */
  }
</style>
