<template>
    <div class="container mt-5" v-if="personal[0]">
        <div class="card">
            <div class="card-header">
                <h4>Borrar Personal</h4>
            </div>
            <div class="alert alert-warning" role="alert">
                ¿Seguro de borrar la información?
                <i class="fa fa-warning"></i>
            </div>
            <div class="card-body">
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
                <div class="mb-3">
                    <button class="btn btn-danger" @click="deletePersonal(personal[0])">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { UsePersonal } from '../controllers/UsePersonal';
const { getPersonalId, deletePersonal, message, personal } = UsePersonal();
let idPersona = 0;
// Para los parametros de la URL
const route = useRoute();
// Para moverme de URL
const routeRedirect = useRouter();
// Observador - Watch
watch(
    () => message.value,
    newId => {
        routeRedirect.push('/personal');
    }
);

onMounted(async() => {
    idPersona = Number(route.params.id);
    await getPersonalId(Number(idPersona));
});

</script>

<style scoped>

</style>