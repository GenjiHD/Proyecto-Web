<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar Personal</h4>
            </div>
            <div v-if="message == 1" class="alert alert-success" role="alert">
                Datos insertados, nicesu
            </div>
            <div class="card-body">
                <Form :validation-schema="PersonalSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" type="text" class="form-control" v-model="personal.nombre"/>
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Dirección
                        <Field name="direccion" type="text" class="form-control" v-model="personal.direccion"/>
                        <ErrorMessage name="direccion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Teléfono
                        <Field name="telefono" type="text" class="form-control" v-model="personal.telefono"/>
                        <ErrorMessage name="telefono" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Estatus
                        <Field name="estatus" type="text" class="form-control" v-model="personal.estatus"/>
                        <ErrorMessage name="estatus" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <!-- <button class="btn btn-primary" @click="agregarPersonal(personal)">Agregar</button> -->
                        <button class="btn btn-primary" type="submit">Agregar</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PersonalAgregar } from '../interfaces/Personal-interface';
import { UsePersonal } from '../controllers/UsePersonal';
const { agregarPersonal, message } = UsePersonal();
import { PersonalSchema } from '../schemas/PersonalSchema';
import { Field, Form, ErrorMessage } from 'vee-validate';

    let personal = ref<PersonalAgregar>({
        nombre: '',
        direccion: '',
        telefono: '',
        estatus: 0
    });

    const onTodoBien = async () => {
        await agregarPersonal(personal.value);
    }
</script>

<style scoped>
.errorValidacion{
    color: red;
    font-weight: bold;
}
</style>