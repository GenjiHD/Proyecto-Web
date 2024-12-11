<template>
    <section class="container text-center mt-3">
        <!-- Contenedor principal con estilo centrado y margen superior -->
        <div class="row justify-content-between align-items-center p-2">
            <!-- Fila para la cabecera de la sección de compras -->
            <div class="col-md-6">
                <h3 class="titulo">Compras</h3> <!-- Título principal de la página -->
                <p>Lista de compras registradas</p> <!-- Breve descripción de la página -->
            </div>
            <div class="col-md-3 text-right">
                <!-- Columna para el botón de agregar nueva compra -->
                <router-link :to="{ path: '/compras/agregar' }">
                    <button class="btn btn-sm btn-outline-primary">
                        <i class="fa fa-plus"></i> Agregar <!-- Botón con icono y texto -->
                    </button>
                </router-link>
            </div>
        </div>

        <div class="row mt-3">
            <!-- Fila para el filtro de búsqueda -->
            <div class="col-md-8">
                <input type="text" class="form-control" v-model="searchQuery" placeholder="Buscar">
                <!-- Campo de entrada para texto de búsqueda -->
            </div>
            <div class="col-md-4 d-flex align-items-center">
                <!-- Columna con selector para el campo de búsqueda -->
                <label for="searchField" class="form-label me-2 mb-0">Filtro:</label> <!-- Etiqueta para el selector -->
                <select v-model="searchField" class="form-select">
                    <option value="id">ID</option> <!-- Opción de filtro por ID -->
                    <option value="id_articulo">ID Articulo</option> <!-- Opción de filtro por ID de artículo -->
                    <option value="cantidad">Cantidad</option> <!-- Opción de filtro por cantidad -->
                    <option value="precio">Precio</option> <!-- Opción de filtro por precio -->
                    <option value="Iva">Iva</option> <!-- Opción de filtro por IVA -->
                    <option value="subtotal">Subtotal</option> <!-- Opción de filtro por subtotal -->
                    <option value="total">Total</option> <!-- Opción de filtro por total -->
                    <option value="fecha_compra">Fecha de compra</option> <!-- Opción de filtro por fecha de compra -->
                </select>
            </div>
        </div>

        <div class="row mt-3">
            <!-- Fila para la tabla de compras registradas -->
            <div class="col-md-12">
                <div class="table-responsive">
                    <!-- Contenedor para que la tabla sea responsive -->
                    <table class="table table-bordered">
                        <thead>
                            <tr class="table-info">
                                <!-- Fila de encabezados de la tabla -->
                                <th>ID</th> <!-- Columna para el ID de la compra -->
                                <th>ID Articulo</th> <!-- Columna para el ID del artículo -->
                                <th>Cantidad</th> <!-- Columna para la cantidad de artículos -->
                                <th>Precio</th> <!-- Columna para el precio unitario -->
                                <th>Iva</th> <!-- Columna para el IVA aplicado -->
                                <th>Subtotal</th> <!-- Columna para el subtotal -->
                                <th>Total</th> <!-- Columna para el total -->
                                <th>Fecha de compra</th> <!-- Columna para la fecha de compra -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="compras.length == 0">
                                <!-- Fila que muestra un mensaje si no hay compras registradas -->
                                <td class="centrado" colspan="8">No hay Compras Registradas</td>
                            </tr>
                            <tr v-for="compra in pagedCompras" :key="compra.id">
                                <!-- Fila que muestra cada compra registrada -->
                                <td>{{ compra.id }}</td> <!-- Muestra el ID de la compra -->
                                <td>{{ compra.id_articulo }}</td> <!-- Muestra el ID del artículo -->
                                <td>{{ compra.cantidad }}</td> <!-- Muestra la cantidad de artículos -->
                                <td>${{ compra.precio }}</td> <!-- Muestra el precio de los artículos -->
                                <td>${{ compra.iva }}</td> <!-- Muestra el IVA aplicado -->
                                <td>${{ compra.subtotal }}</td> <!-- Muestra el subtotal de la compra -->
                                <td>${{ compra.total }}</td> <!-- Muestra el total de la compra -->
                                <td>{{ compra.fecha_compra }}</td> <!-- Muestra la fecha de la compra -->
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, watch } from 'vue'; // Importa funciones reactivas y del ciclo de vida de Vue
    import axios from 'axios'; // Importa Axios para manejar solicitudes HTTP
    import * as XLSX from 'xlsx'; // Importa XLSX para exportar datos a Excel (aunque no se usa en este código)
    import { useCompras } from '../controllers/useCompras'; // Importa el composable para manejar datos de compras
    import { RouterLink } from 'vue-router'; // Importa RouterLink para navegar entre rutas

    const { getCompras, compras, mensaje } = useCompras(); // Usa el composable para obtener datos y mensajes de compras
    const searchQuery = ref(''); // Variable reactiva para el texto de búsqueda
    const searchField = ref('id'); // Variable reactiva para el campo de búsqueda
    const currentPage = ref(Number(localStorage.getItem('currentPageCompras')) || 1); // Página actual inicializada desde el almacenamiento local
    const itemsPerPage = 10; // Número de elementos por página

    onMounted(async () => {
        // Acción al montar el componente
        await getCompras(); // Llama a la función para obtener compras
        console.log(compras.value); // Muestra las compras en la consola para depuración
        if (mensaje.value[0] === 'No se puede conectar con el servidor') {
            errorToast(mensaje.value[0]); // Muestra un mensaje de error si no se conecta al servidor
        }
    });

    watch(compras, (newVal) => {
        // Observa cambios en la lista de compras
        if (newVal.length === 0) {
            warningToast('No hay registros disponibles'); // Muestra advertencia si no hay registros
        }
    });

    const filteredCompras = computed(() => {
        // Filtra las compras según búsqueda y campo seleccionado
        const query = searchQuery.value.toLowerCase(); // Convierte la búsqueda a minúsculas
        return compras.value.filter((compra) => {
            return (compra as { [key: string]: string | number })[searchField.value]
            ?.toString()
            .toLowerCase()
            .includes(query); // Retorna compras coincidentes
        });
    });

    const totalPages = computed(() => {
        // Calcula el número total de páginas
        return Math.ceil(filteredCompras.value.length / itemsPerPage); // Redondea hacia arriba
    });

    const pagedCompras = computed(() => {
        // Obtiene las compras de la página actual
        const startIndex = (currentPage.value - 1) * itemsPerPage; // Índice inicial
        return filteredCompras.value.slice(startIndex, startIndex + itemsPerPage); // Retorna compras para la página actual
    });

    const goToPage = (page: number) => {
        // Cambia la página actual
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page; // Establece la nueva página
            localStorage.setItem('currentPageCompras', page.toString()); // Guarda la página en el almacenamiento local
        }
    };
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap'); /* Fuente Montserrat */

    .table {
    border-collapse: collapse;
    width: 100%; /* Ancho completo de la tabla */
    }

    .table th, .table td {
    padding: 10px;
    text-align: left; /* Alinea contenido a la izquierda */
    }

    .table th {
    background-color: #f2f2f2; /* Fondo gris claro para encabezados */
    }
</style>
