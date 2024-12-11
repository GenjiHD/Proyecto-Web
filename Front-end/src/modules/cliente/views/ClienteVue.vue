<template>
    <!-- Contenedor principal de la página -->
    <section class="container text-center mt-3">

        <!-- Fila para el título y el botón de agregar cliente -->
        <div class="row justify-content-between align-items-center p-2">
            <div class="col-md-6">
                <!-- Título de la sección "Clientes" -->
                <h3 class="fw-bold titulo">Clientes</h3> 
                <!-- Descripción de la sección -->
                <p>Listado de clientes registrados.</p> 
            </div>
            <div class="col-md-3 text-right">
                <!-- Enlace a la página de agregar cliente -->
                <router-link :to="{ path: '/clientes/agregar' }">
                    <!-- Botón para agregar un nuevo cliente -->
                    <button class="btn btn-sm btn-outline-primary">
                        <i class="fa fa-plus"></i> Agregar
                    </button>
                </router-link>
            </div>
        </div>

        <!-- Filtro de búsqueda -->
        <div class="row mt-3">
            <div class="col-md-8">
                <!-- Campo de texto para ingresar el término de búsqueda -->
                <input type="text" class="form-control" v-model="searchQuery" placeholder="Buscar...">
            </div>
            <div class="col-md-4 d-flex align-items-center">
                <!-- Etiqueta para el filtro de búsqueda -->
                <label for="searchField" class="form-label me-2 mb-0">Filtro:</label>
                <!-- Selector de campo para elegir por qué se quiere filtrar (nombre, dirección, etc.) -->
                <select v-model="searchField" class="form-select">
                    <option value="nombre">Nombre</option>
                    <option value="direccion">Dirección</option>
                    <option value="telefono">Teléfono</option>
                    <option value="correo_electronico">Correo</option>
                    <option value="ciudad">Ciudad</option>
                </select>
            </div>
        </div>

        <!-- Tabla que muestra la lista de clientes -->
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr class="table-info">
                                <!-- Encabezados de las columnas -->
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                                <th>Ciudad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Mensaje cuando no hay clientes registrados -->
                            <tr v-if="clientes.length == 0">
                                <td class="centrado" colspan="7">Sin Clientes Registrados</td>
                            </tr>
                            <!-- Fila por cada cliente en la lista -->
                            <tr v-for="cliente in pagedClientes" :key="cliente.id">
                                <!-- Muestra los datos de cada cliente en las celdas correspondientes -->
                                <td>{{ cliente.id }}</td>
                                <td>{{ cliente.nombre }}</td>
                                <td>{{ cliente.direccion }}</td>
                                <td>{{ cliente.telefono }}</td>
                                <td>{{ cliente.correo_electronico }}</td>
                                <td>{{ cliente.ciudad }}</td>
                                <td>
                                    <!-- Enlace para editar el cliente -->
                                    <RouterLink title="Editar" :to="{ path: '/clientes/'+ cliente.id +'/editar/' } " class="btn btn-sm btn-outline-primary p-2 m-1">
                                        <i class="fa fa-edit"></i>
                                    </RouterLink>
                                    <!-- Enlace para eliminar el cliente -->
                                    <RouterLink title="Eliminar" :to="{ path: '/clientes/' + cliente.id + '/borrar' }" class="btn btn-sm btn-outline-danger p-2 m-1">
                                        <i class="fa fa-trash"></i>
                                    </RouterLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Componente de paginación -->
        <pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            @update:currentPage="goToPage" <!-- Actualiza la página actual al hacer clic en una nueva página -->
        />
    </section>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useCliente } from '../controladores/useCliente';
import { RouterLink } from 'vue-router';

// Se extraen las funciones y datos del composable 'useCliente'
const { getClientes, clientes, mensaje } = useCliente();

// Variables reactivas para la búsqueda, filtrado y paginación
const searchQuery = ref('');
const searchField = ref('nombre');
const currentPage = ref(Number(localStorage.getItem('currentPageCliente')) || 1); // Se guarda la página actual en localStorage
const itemsPerPage = 10;

// Se obtiene la lista de clientes al montar el componente
onMounted(async () => {
    await getClientes();
    if (mensaje.value[0] === 'No fue posible conectarse con el servidor') {
        errorToast(mensaje.value[0]); // Muestra un mensaje de error si la conexión falla
    }
});

// Watch para mostrar una advertencia si no hay clientes
watch(clientes, (newVal) => {
    if (newVal.length === 0) {
        warningToast('No hay registros disponibles'); // Muestra un mensaje si no hay registros
    }
});

// Filtrado de clientes según el campo seleccionado y la consulta de búsqueda
const filteredClientes = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return clientes.value.filter((cliente) => {
        return (cliente as { [key: string]: string | number })[searchField.value]
        ?.toString()
        .toLowerCase()
        .includes(query);
    });
});

// Cálculo del total de páginas para la paginación
const totalPages = computed(() => {
    return Math.ceil(filteredClientes.value.length / itemsPerPage);
});

// Clientes paginados para mostrar en la tabla
const pagedClientes = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return filteredClientes.value.slice(startIndex, startIndex + itemsPerPage);
});

// Función para manejar el cambio de página y almacenar el valor en localStorage
const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        localStorage.setItem('currentPageCliente', page.toString()); // Guardar la página actual en localStorage
    }
};
</script>


<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap'); /* Importa la fuente Montserrat */

    .table {
    border-collapse: collapse;
    width: 100%; /* Establece el ancho de la tabla al 100% */
    }

    .table th, .table td {
    padding: 10px;
    text-align: left; /* Alinea el texto a la izquierda en las celdas de la tabla */
    }

    .table th {
    background-color: #f2f2f2; /* Establece un color de fondo para los encabezados de la tabla */
    }
</style>