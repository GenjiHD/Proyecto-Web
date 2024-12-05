<template>
    <div class="container mt-5" v-if="personal[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar Personal</h4>
            </div>
            <div v-if="message == 1" class="alert alert-success" role="alert">
                Datos actualizados, nicesu
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="personal[0].id" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="personal[0].nombre">
                </div>
                <div class="mb-3">
                    Dirección
                    <input type="text" class="form-control" v-model="personal[0].direccion">
                </div>
                <div class="mb-3">
                    Teléfono
                    <input type="text" class="form-control" v-model="personal[0].telefono">
                </div>
                <div class="mb-3">
                    Estatus
                    <input type="text" class="form-control" v-model="personal[0].estatus">
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click="updatePersonal(personal[0])">Actualizar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { UsePersonal } from '../controllers/UsePersonal';
const { getPersonalId,updatePersonal, message, personal } = UsePersonal();
let idPersona = 0;
const route = useRoute();

onMounted(async() => {
    idPersona = Number(route.params.id);
    await getPersonalId(Number(idPersona));
});

</script>

<style scoped>

</style>