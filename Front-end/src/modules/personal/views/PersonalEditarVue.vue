<template>
    <!-- Contenedor principal para editar información del personal -->
    <div class="container mt-5" v-if="personal[0]">
        <!-- Tarjeta que contiene el formulario de edición -->
        <div class="card">
            <div class="card-header">
                <h4>Editar Personal</h4> <!-- Título de la tarjeta -->
            </div>
            <!-- Mensaje de éxito al actualizar los datos -->
            <div v-if="message == 1" class="alert alert-success" role="alert">
                Datos actualizados, nicesu
            </div>
            <div class="card-body">
                <!-- Formulario de edición con campos para los datos del personal -->
                <div class="mb-3">
                    Id
                    <!-- Campo de solo lectura para el ID del personal -->
                    <input type="text" class="form-control" v-model="personal[0].id" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <!-- Campo editable para el nombre -->
                    <input type="text" class="form-control" v-model="personal[0].nombre">
                </div>
                <div class="mb-3">
                    Dirección
                    <!-- Campo editable para la dirección -->
                    <input type="text" class="form-control" v-model="personal[0].direccion">
                </div>
                <div class="mb-3">
                    Teléfono
                    <!-- Campo editable para el teléfono -->
                    <input type="text" class="form-control" v-model="personal[0].telefono">
                </div>
                <div class="mb-3">
                    Estatus
                    <!-- Campo editable para el estatus -->
                    <input type="text" class="form-control" v-model="personal[0].estatus">
                </div>
                <div class="mb-3">
                    <!-- Botón para actualizar los datos del personal -->
                    <button class="btn btn-primary" @click="updatePersonal(personal[0])">Actualizar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'; // Importa funciones reactivas y de ciclo de vida.
import { useRoute } from 'vue-router'; // Para acceder a los parámetros de la URL.
import { UsePersonal } from '../controllers/UsePersonal'; // Controlador para manejar datos del personal.

// Desestructura las funciones y datos del controlador.
const { getPersonalId, updatePersonal, message, personal } = UsePersonal();

// Variable para almacenar el ID del personal desde la URL.
let idPersona = 0;
// Obtener los parámetros de la ruta actual.
const route = useRoute();

// Acción que se ejecuta al montar el componente.
onMounted(async () => {
    idPersona = Number(route.params.id); // Obtiene el ID del personal desde los parámetros de la URL.
    await getPersonalId(idPersona); // Llama a la función para obtener los datos del personal.
});
</script>

<style scoped>
/* Estilo específico para este componente */
</style>
