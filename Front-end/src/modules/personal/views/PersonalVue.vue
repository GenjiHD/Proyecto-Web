<template>
    <!-- Sección principal para administrar el personal -->
    <section>
        <!-- Botón para agregar nuevo personal -->
        <div>
            <RouterLink :to="{ path: '/personal/agregar' }">
                <button class="btn btn-sm btn-outline-primary">
                    Agregar <i class="fa fa-plus"></i>
                </button>
            </RouterLink>
            &nbsp;

            <!-- Botón para imprimir el listado de personal como PDF -->
            <button @click.prevent="imprimirPersonalPDF" class="btn btn-sm btn-outline-primary" v-if="personal.length > 0">
                Imprimir <i class="fa fa-print"></i>
            </button>
            &nbsp;

            <!-- Botón para exportar el listado de personal a Excel -->
            <button class="btn btn-sm btn-outline-primary" v-if="personal.length > 0">
                <download-excel :data="personal" type="xlsx" name="personal.xlsx">
                    Excel <i class="fa fa-file-excel-o"></i>
                </download-excel>
            </button>
        </div>
    </section>

    <!-- Tabla para mostrar la información del personal -->
    <table class="table table-striped" id="tablaPersonal">
        <caption><h3>Personal</h3></caption>
        <thead>
            <tr>
                <th>Clave</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Estatus</th>
            </tr>
        </thead>
        <tbody>
            <!-- Mensaje cuando no hay registros -->
            <tr v-if="personal.length == 0">
                <td class="centrado" colspan="6">Sin personal registrado</td>
            </tr>

            <!-- Iteración sobre el array de personal para mostrar cada registro -->
            <tr v-else v-for="(persona, index) in personal" :key="index">
                <td>{{ persona.id }}</td>
                <td>{{ persona.nombre }}</td>
                <td>{{ persona.direccion }}</td>
                <td>{{ persona.telefono }}</td>
                <td>{{ persona.estatus }}</td>
                <td class="centrado">
                    <!-- Botones de editar y borrar -->
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-sm btn-outline-primary">
                            <RouterLink class="nav-lnk item" :to="{ path: '/personal/' + persona.id + '/editar' }">
                                <i class="fa fa-pencil"></i>
                            </RouterLink>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger">
                            <RouterLink class="nav-lnk item" :to="{ path: '/personal/' + persona.id + '/borrar' }">
                                <i class="fa fa-trash"></i>
                            </RouterLink>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
    // Importa la biblioteca para generar PDF desde HTML.
    import html2PDF from 'jspdf-html2canvas';

    // Importa el ciclo de vida `onMounted` de Vue.
    import { onMounted } from 'vue';

    // Importa el controlador para gestionar los datos del personal.
    import { UsePersonal } from '../controllers/UsePersonal';

    // Obtén las funciones y datos desde el controlador.
    const { getPersonal, personal } = UsePersonal();

    // Ejecuta la función para obtener datos del personal cuando el componente está montado.
    onMounted(async () => {
        await getPersonal(); // Llama a la función para cargar la información del personal.
    });

    // Función para generar un PDF del contenido de la tabla de personal.
    const imprimirPersonalPDF = async () => {
        let pagina = document.getElementById('tablaPersonal'); // Obtén la tabla del DOM.
        await html2PDF(pagina, {
            jsPDF: {
                format: 'a4', // Define el formato del PDF.
            },
            imageType: 'image/jpeg', // Define el tipo de imagen para el contenido.
            output: './reporte_personal.pdf', // Ruta y nombre del archivo de salida.
        });
    };
</script>

<style scoped>
/* Estilos para la sección de botones */
section {
    display: flex;
    flex-flow: row wrap; /* Permite que los elementos se distribuyan en varias filas si es necesario. */
    justify-content: space-around; /* Distribuye uniformemente los elementos. */
    margin-top: 20px; /* Espaciado superior. */
}

/* Clase para centrar contenido */
.centrado {
    text-align: center;
}

/* Estilo para el título de la tabla */
caption {
    caption-side: top; /* Posiciona el título en la parte superior. */
    text-align: center; /* Centra el texto del título. */
    padding: 10px; /* Espaciado alrededor del título. */
    font-weight: bold; /* Hace el título en negrita. */
}
</style>
