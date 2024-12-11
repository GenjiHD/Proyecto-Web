<template>
    <!-- Contenedor principal, muestra los datos solo si existe información de `personal[0]` -->
    <div class="container mt-5" v-if="personal[0]">
        <!-- Tarjeta que contiene el formulario de confirmación de eliminación -->
        <div class="card">
            <div class="card-header">
                <h4>Borrar Personal</h4> <!-- Título de la tarjeta -->
            </div>
            <!-- Mensaje de advertencia al usuario -->
            <div class="alert alert-warning" role="alert">
                ¿Seguro de borrar la información?
                <i class="fa fa-warning"></i>
            </div>
            <div class="card-body">
                <!-- Información del registro a eliminar, todos los campos están deshabilitados -->
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="personal[0].id" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="personal[0].nombre" disabled>
                </div>
                <div class="mb-3">
                    Dirección
                    <input type="text" class="form-control" v-model="personal[0].direccion" disabled>
                </div>
                <div class="mb-3">
                    Teléfono
                    <input type="text" class="form-control" v-model="personal[0].telefono" disabled>
                </div>
                <div class="mb-3">
                    Estatus
                    <input type="text" class="form-control" v-model="personal[0].estatus" disabled>
                </div>
                <!-- Botón para confirmar la eliminación del registro -->
                <div class="mb-3">
                    <button class="btn btn-danger" @click="deletePersonal(personal[0])">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'; // Importa funciones reactivas de Vue.
import { useRoute, useRouter } from 'vue-router'; // Manejo de rutas dinámicas.
import { UsePersonal } from '../controllers/UsePersonal'; // Controlador para datos del personal.

// Extrae funciones y datos del controlador.
const { getPersonalId, deletePersonal, message, personal } = UsePersonal();

let idPersona = 0; // Variable para almacenar el ID del personal desde la URL.

// Obtiene información de la ruta actual.
const route = useRoute();
// Redirige a otra ruta después de la acción.
const routeRedirect = useRouter();

// Observador que redirige al listado de personal cuando `message` cambia.
watch(
    () => message.value, // Observa el valor del mensaje.
    () => {
        routeRedirect.push('/personal'); // Redirige al listado de personal.
    }
);

// Acción cuando el componente se monta.
onMounted(async () => {
    idPersona = Number(route.params.id); // Obtiene el ID desde los parámetros de la URL.
    await getPersonalId(idPersona); // Llama a la función para obtener los datos del personal.
});
</script>

<style scoped>
/* Estilo específico para este componente */
</style>
