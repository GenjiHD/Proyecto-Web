<template>
    <!-- Contenedor principal de la página con un margen superior -->
    <section class="container text-center mt-3">
        <!-- Fila que organiza los elementos de la parte superior: título y botón para agregar artículo -->
        <div class="row justify-content-between align-items-center p-2">
            <div class="col-md-6">
                <h3 class="titulo">Artículos</h3> <!-- Título de la sección -->
                <p>Listado de los artículos registrados.</p> <!-- Descripción breve -->
            </div>
            <div class="col-md-3 text-right">
                <!-- Enlace que lleva a la página de agregar artículo -->
                <RouterLink :to="{ path: '/articulos/agregar' }">
                    <button class="btn btn-sm btn-outline-primary">
                        <i class="fa fa-plus"></i> Agregar <!-- Icono y texto del botón -->
                    </button>
                </RouterLink>
            </div>
        </div>
        <!-- Sección de la tabla que mostrará los artículos -->
    </section>
    <section class="container text-center mt-3">
        <table class="table table-bordered">
            <thead>
                <tr class="table-info">
                    <!-- Encabezados de la tabla -->
                    <th>ID</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>Cantidad en almacen</th>
                    <th>Fecha de Caducidad</th>
                    <th>Acciones</th> <!-- Columna para las acciones -->
                </tr>
            </thead>
            <tbody>
                <!-- Si no hay artículos registrados -->
                <tr v-if="articulos.length == 0">
                    <td class="centrado" colspan="6">Sin Artículos Registrados</td> <!-- Mensaje si la lista está vacía -->
                </tr>
                <!-- Si existen artículos, iteramos sobre ellos -->
                <tr v-else v-for="(articulo, index) in articulos" :key="index">
                    <td>{{ articulo.id }}</td> <!-- Muestra el ID del artículo -->
                    <td>{{ articulo.descripcion }}</td> <!-- Muestra la descripción -->
                    <td>${{ articulo.precio }}</td> <!-- Muestra el precio -->
                    <td> {{ articulo.cantidad_en_almacen }}</td> <!-- Muestra la cantidad en almacén -->
                    <td>{{ articulo.fecha_caducidad === '1969-12-31' ? 'Sin fecha de caducidad' : articulo.fecha_caducidad }}</td> <!-- Muestra la fecha de caducidad o un mensaje si no está definida -->
                    <td class="centrado">
                        <fieldset class="btn-group" aria-label="Basic outline example">
                            <!-- Enlace para editar el artículo -->
                            <RouterLink class="item btn btn-sm btn-outline-primary p-2 m-1" :to="{path: '/articulos/'+articulo.id+'/editar'}">
                                <i class="fa fa-edit"></i> <!-- Icono de editar -->
                            </RouterLink>
                            <!-- Enlace para borrar el artículo -->
                            <RouterLink class="btn btn-sm btn-outline-danger p-2 m-1" :to="{path: '/articulos/'+articulo.id+'/borrar'}">
                                <i class="fa fa-trash"></i> <!-- Icono de eliminar -->
                            </RouterLink>
                        </fieldset>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
    <!-- Componente de paginación -->
    <Pagination 
        :currentPage="page" 
        :totalPages="totalPages" 
        @update:currentPage="handlePageChange" 
    />
</template>

<script setup lang="ts">
    // Importación de las funcionalidades necesarias de Vue
    import { ref, onMounted, watch } from 'vue'; 
    import axios from 'axios'; 
    import * as XLSX from 'xlsx'; 
    import { useArticulos } from '../controladores/useArticulos';

    // Uso del controlador para manejar los artículos
    const { getArticulos, articulos, mensaje } = useArticulos();
    const filterValue = ref(''); // Valor del filtro para búsqueda
    const filterField = ref('descripcion'); // Campo por el cual se filtrarán los artículos
    const page = ref(Number(localStorage.getItem('currentPageArticulos')) || 1); // Página actual, cargada desde localStorage
    const limit = 12; // Límite de artículos por página
    const totalPages = ref(1); // Total de páginas, se actualiza al obtener los datos

    // Función para obtener los artículos desde el servidor
    const fetchArticulos = async () => {
        const params = {
            page: page.value, // Parámetro de página
            limit, // Límite de artículos
            filterField: filterField.value || '', // Campo de filtro
            ...(filterValue.value ? { filterValue: filterValue.value } : {}), // Valor del filtro, si existe
        };
        const response = await getArticulos(params); // Realiza la llamada al API

        // Actualiza el total de páginas si la respuesta contiene la paginación
        if (response && response.pagination) {
            totalPages.value = response.pagination.totalPages;
        }

        // Si no fue posible conectarse, muestra un mensaje de error
        if (mensaje.value[0] === 'No fue posible conectarse con el servidor') {
            errorToast(mensaje.value[0]);
        }
    };

    // Función para manejar el cambio de página
    const handlePageChange = (newPage: number) => {
        page.value = newPage; // Actualiza la página actual
        localStorage.setItem('currentPageArticulos', newPage.toString()); // Guarda la página en el almacenamiento local
    };

    // Ejecuta la función de obtener artículos al montar el componente
    onMounted(fetchArticulos);
    // Observa cambios en los filtros y la página para actualizar los artículos
    watch([filterValue, filterField, page], fetchArticulos);
</script>

<style scoped>
    /* Importación de la fuente Montserrat desde Google Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap'); 

    .table {
    border-collapse: collapse; /* Colapsa los bordes de las celdas */
    width: 100%; /* Establece el ancho de la tabla al 100% */
    }

    .table th, .table td {
    padding: 10px; /* Relleno de las celdas */
    text-align: left; /* Alineación del texto en las celdas */
    }

    .table th {
    background-color: #f2f2f2; /* Fondo gris claro para los encabezados */
    }
</style>
