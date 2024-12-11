<script lang="ts" setup>
  // Importación de funciones y librerías necesarias
  import { ref, watch } from 'vue'; // Importa ref (para crear referencias reactivas) y watch (para observar cambios en valores reactivos).
  import type { ClienteAgregar } from '../interfaces/cliente_interfaces'; // Importa el tipo ClienteAgregar, que define la estructura de los datos del cliente.
  import { useCliente } from '../controladores/useCliente'; // Importa la función useCliente para manejar las operaciones relacionadas con los clientes.
  import { Form, Field, ErrorMessage } from 'vee-validate'; // Importa componentes de vee-validate para la validación de formularios.
  import { clienteSchema } from '../schemas/ClienteSchema'; // Importa el esquema de validación para los datos del cliente.

  // Obtiene las funciones y valores necesarios de useCliente.
  const { setCliente, mensaje } = useCliente();

  // Declara una referencia reactiva para el objeto cliente con los campos vacíos.
  let cliente = ref<ClienteAgregar>({
    nombre: '',
    direccion: '',
    telefono: '',
    correo_electronico: '',
    ciudad: ''
  });

  // Función que se ejecuta cuando el formulario es validado y enviado.
  const onValidated = async () => {
    await setCliente(cliente.value); // Llama a la función setCliente para guardar los datos del cliente.
  };

  // Función para mostrar un mensaje de error si no se puede agregar el cliente.
  const showErrorToast = () => {
    if (mensaje.value && mensaje.value[0] !== 'Cliente agregado con éxito') {
      errorToast('No se puede ingresar este cliente'); // Muestra un mensaje de error si la operación no fue exitosa.
    }
  };

  // Función para mostrar un mensaje de éxito si el cliente se agrega correctamente.
  const showSuccessToast = () => {
    if (mensaje.value && mensaje.value[0] === 'Cliente agregado con éxito') {
      sucessToast('Cliente agregado correctamente'); // Muestra un mensaje de éxito si el cliente fue agregado correctamente.
    }
  };

  // Observa los cambios en el valor de mensaje y ejecuta las funciones de error o éxito dependiendo del mensaje.
  watch(mensaje, () => {
    showErrorToast(); // Muestra el mensaje de error si corresponde.
    showSuccessToast(); // Muestra el mensaje de éxito si corresponde.
  });

  // Observa los cambios en el mensaje y limpia los datos del cliente si el cliente fue agregado con éxito.
  watch(mensaje, () => {
    if (mensaje.value && mensaje.value[0] === 'Cliente agregado con éxito') {
      cliente.value = {
        nombre: '',
        direccion: '',
        telefono: '',
        correo_electronico: '',
        ciudad: ''
      }; // Resetea los campos del cliente.
    }
  });
</script>

<template>
    <!-- Contenedor principal centrado con flexbox -->
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <!-- Tarjeta con estilo para agregar cliente -->
      <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
        <!-- Encabezado de la tarjeta con título -->
        <div class="card-header border-custom">
          <h4 class="text-center">Agregar Cliente</h4>
        </div>
        <!-- Mensaje de éxito que se muestra si el cliente se agrega correctamente -->
        <div class="alert alert-success text-center mt-3 p-2" v-if="mensaje && mensaje[0] === 'Cliente agregado con éxito'" role="alert">
          {{ mensaje[0].toString() }} <!-- Muestra el mensaje de éxito -->
        </div>
        <!-- Mensajes de error que se muestran si no se puede agregar el cliente -->
        <div class="alert alert-danger text-center mt-3 p-2" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== 'Cliente agregado con éxito'" role="alert">
          {{ error }} <!-- Muestra el mensaje de error -->
        </div>
        <!-- Cuerpo de la tarjeta con el formulario para agregar un cliente -->
        <div class="card-body">
          <!-- Formulario que usa el esquema de validación para los campos -->
          <Form :validation-schema="clienteSchema" @submit="onValidated">
            <!-- Campo para el nombre del cliente -->
            <div class="mb-3">
              <label for="nombre">Nombre</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-person"></i></span> <!-- Ícono de persona -->
                <Field type="text" class="form-control" name="nombre" v-model="cliente.nombre" placeholder="Nombre"/> <!-- Campo de texto para el nombre -->
              </div>
              <ErrorMessage name="nombre" class="errorValidacion" /> <!-- Muestra los errores de validación del campo 'nombre' -->
            </div>
            <!-- Campo para la dirección del cliente -->
            <div class="mb-3">
              <label for="direccion">Direccion</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-house-door"></i></span> <!-- Ícono de casa -->
                <Field type="text" class="form-control" name="direccion" v-model="cliente.direccion" placeholder="Dirección"/> <!-- Campo de texto para la dirección -->
              </div>
              <ErrorMessage name="direccion" class="errorValidacion" /> <!-- Muestra los errores de validación del campo 'direccion' -->
            </div>
            <!-- Campo para el teléfono del cliente -->
            <div class="mb-3">
              <label for="telefono">Teléfono</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-telephone"></i></span> <!-- Ícono de teléfono -->
                <Field type="text" class="form-control" name="telefono" v-model="cliente.telefono" placeholder="Teléfono"/> <!-- Campo de texto para el teléfono -->
              </div>
              <ErrorMessage name="telefono" class="errorValidacion" /> <!-- Muestra los errores de validación del campo 'telefono' -->
            </div>
            <!-- Campo para el correo electrónico del cliente -->
            <div class="mb-3">
              <label for="correo_electronico">Correo Electrónico</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-envelope"></i></span> <!-- Ícono de correo -->
                <Field type="email" class="form-control" name="correo_electronico" v-model="cliente.correo_electronico" placeholder="Correo Electrónico"/> <!-- Campo de texto para el correo -->
              </div>
              <ErrorMessage name="correo_electronico" class="errorValidacion" /> <!-- Muestra los errores de validación del campo 'correo_electronico' -->
            </div>
            <!-- Campo para la ciudad del cliente -->
            <div class="mb-3">
              <label for="ciudad">Ciudad</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-geo-alt"></i></span> <!-- Ícono de ciudad -->
                <Field type="text" class="form-control" name="ciudad" v-model="cliente.ciudad" placeholder="Ciudad"/> <!-- Campo de texto para la ciudad -->
              </div>
              <ErrorMessage name="ciudad" class="errorValidacion" /> <!-- Muestra los errores de validación del campo 'ciudad' -->
            </div>
            <!-- Botón para enviar el formulario -->
            <div class="mb-3 text-center">
              <button type="submit" class="btn btn-success">Agregar</button> <!-- Botón para agregar el cliente -->
            </div>
          </Form>
        </div>
      </div>
    </div>
  </template>

  <style scoped>
  /* Estilo para los mensajes de error de validación */
  .errorValidacion{
    color: red; /* Color rojo para los mensajes de error */
    font-weight: bold; /* Negrita para los mensajes de error */
  }
  /* Estilo personalizado para el borde de la tarjeta */
  .border-custom {
    border: 3px solid #0237f6; /* Establece un borde de 3px de color azul */
    border-radius: 20px; /* Redondea las esquinas del borde */
    background-color: #9091eb; /* Establece un fondo azul claro para la tarjeta */
  }
  /* Estilo para la tarjeta pequeña */
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
