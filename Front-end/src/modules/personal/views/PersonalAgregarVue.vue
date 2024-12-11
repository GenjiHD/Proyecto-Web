<template>
    <div class="container mt-5"> <!-- Contenedor principal con margen superior -->
        <div class="card"> <!-- Contenedor en forma de tarjeta -->
            <div class="card-header"> <!-- Cabecera de la tarjeta -->
                <h4>Agregar Personal</h4> <!-- Título de la sección -->
            </div>
            
            <!-- Mensaje de éxito al agregar datos, se muestra si 'message' es igual a 1 -->
            <div v-if="message == 1" class="alert alert-success" role="alert">
                Datos insertados, nicesu
            </div>

            <!-- Cuerpo de la tarjeta con el formulario para agregar personal -->
            <div class="card-body">
                <!-- Formulario de 'vee-validate' con validación y acción de submit -->
                <Form :validation-schema="PersonalSchema" @submit="onTodoBien">
                    <div class="mb-3"> <!-- Espaciado para los campos -->
                        Nombre
                        <!-- Campo para nombre, con validación y enlace bidireccional con 'personal.nombre' -->
                        <Field name="nombre" type="text" class="form-control" v-model="personal.nombre"/>
                        <!-- Mensaje de error para el campo 'nombre' si no pasa la validación -->
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Dirección
                        <!-- Campo para dirección, con validación y enlace bidireccional con 'personal.direccion' -->
                        <Field name="direccion" type="text" class="form-control" v-model="personal.direccion"/>
                        <!-- Mensaje de error para el campo 'direccion' -->
                        <ErrorMessage name="direccion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Teléfono
                        <!-- Campo para teléfono, con validación y enlace bidireccional con 'personal.telefono' -->
                        <Field name="telefono" type="text" class="form-control" v-model="personal.telefono"/>
                        <!-- Mensaje de error para el campo 'telefono' -->
                        <ErrorMessage name="telefono" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Estatus
                        <!-- Campo para estatus, con validación y enlace bidireccional con 'personal.estatus' -->
                        <Field name="estatus" type="text" class="form-control" v-model="personal.estatus"/>
                        <!-- Mensaje de error para el campo 'estatus' -->
                        <ErrorMessage name="estatus" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <!-- Botón de envío del formulario. Se ejecuta 'onTodoBien' cuando se envía el formulario -->
                        <button class="btn btn-primary" type="submit">Agregar</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'; // Importa 'ref' de Vue para crear propiedades reactivas
import type { PersonalAgregar } from '../interfaces/Personal-interface'; // Importa el tipo 'PersonalAgregar' para validar la estructura de los datos
import { UsePersonal } from '../controllers/UsePersonal'; // Importa la función 'UsePersonal' que maneja las acciones relacionadas con el personal
const { agregarPersonal, message } = UsePersonal(); // Desestructura las funciones 'agregarPersonal' y 'message' del controlador 'UsePersonal'
import { PersonalSchema } from '../schemas/PersonalSchema'; // Importa el esquema de validación 'PersonalSchema'
import { Field, Form, ErrorMessage } from 'vee-validate'; // Importa los componentes necesarios de 'vee-validate' para la validación del formulario

// Definición de un objeto reactivo 'personal' con los campos necesarios para agregar un nuevo registro
let personal = ref<PersonalAgregar>({
    nombre: '',
    direccion: '',
    telefono: '',
    estatus: 0 // Valor predeterminado para el estatus
});

// Función que se ejecuta cuando el formulario se envía con éxito (después de la validación)
const onTodoBien = async () => {
    await agregarPersonal(personal.value); // Llama a la función 'agregarPersonal' con los datos del objeto 'personal'
}
</script>


<style scoped>
.errorValidacion{  /* Estilo para los mensajes de error de validación */
    color: red;     /* El color del texto será rojo */
    font-weight: bold; /* El texto será en negrita */
}
</style>
