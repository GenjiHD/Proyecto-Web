<script lang="ts" setup>
// Importamos las funcionalidades necesarias desde Vue y otras librerías
import { onMounted, ref, watch } from 'vue';
import type { CompraAgregar } from '../interfaces/compras-interface'; // Tipos para las compras
import { useCompras } from '../controladores/useCompras'; // Controlador de compras
import { useArticulos } from '../../articulos/controladores/useArticulos'; // Controlador de artículos
import { errorToast, sucessToast } from '@/modulos/utils/displayToast'; // Funciones para mostrar mensajes tipo toast
import { CompraAgregarSchema } from '../schemas/CompraSchema'; // Esquema de validación para compras
import { Form, Field, ErrorMessage } from 'vee-validate'; // Componentes para formularios y validación
import type { Articulos } from '@/modulos/articulos/interfaces/articulos-interface'; // Tipos para los artículos

// Desestructuramos funciones y estados del controlador de compras
const { setCompras, mensaje, compras } = useCompras();
// Desestructuramos funciones y estados del controlador de artículos
const { getAllArticulos, articulos } = useArticulos(); // articulos de useArticulos

// Declaramos un estado reactivo para almacenar datos de un artículo
let articulo = ref<Articulos>({
    id: 0,
    descripcion: '',
    precio: 0,
    cantidad_en_almacen: 0,
    fecha_caducidad: null
});

// Declaramos un estado reactivo para manejar los datos de la compra
let compra = ref<CompraAgregar>({
    id_articulo: 0,
    cantidad: 0,
    precio: 0,
    iva: 0,
    subtotal: 0,
    total: 0,
    fecha_compra: null
});

// Función para calcular el IVA (16%) a partir de un precio
const calcularIVA = (precio: number): number => {
    return precio * 0.16;
};

// Función para calcular el subtotal multiplicando cantidad y precio
const calcularSubtotal = (cantidad: number, precio: number): number => {
    return cantidad * precio;
};

// Función para calcular el total sumando subtotal e IVA
const calcularTotal = (subtotal: number, IVA: number): number => {
    return subtotal + IVA;
};

// Observador: actualiza subtotal, IVA y total cuando cambian cantidad o precio
watch([() => compra.value.cantidad, () => compra.value.precio], ([newCantidad, newPrecio]) => {
    compra.value.subtotal = calcularSubtotal(newCantidad, newPrecio); // Calculamos el subtotal
    compra.value.IVA = calcularIVA(compra.value.subtotal); // Calculamos el IVA
    compra.value.total = calcularTotal(compra.value.subtotal, compra.value.IVA); // Calculamos el total
});

// Acción a realizar al montar el componente
onMounted(async () => {
    await getAllArticulos(); // Obtenemos todos los artículos desde el controlador
});

// Observador: sincroniza el ID del artículo en la compra según su descripción
watch(() => articulo.value.descripcion, (newDescripcion) => {
    const selectedArticulo = articulos.value.find(item => item.descripcion === newDescripcion); // Buscamos el artículo seleccionado
    if (selectedArticulo) {
        articulo.value.id = selectedArticulo.id; // Actualizamos el ID del artículo
        compra.value.id_articulo = selectedArticulo.id; // Sincronizamos el ID en la compra
    }
});

// Función para validar y enviar los datos de la compra
const onValidated = async () => {
    console.log("Desde onValidated");
    console.log(compra.value.total);

    // Creamos un objeto con los datos necesarios para enviar
    const compraData = {
        id_articulo: compra.value.id_articulo, // ID del artículo
        cantidad: compra.value.cantidad, // Cantidad
        precio: compra.value.precio, // Precio
        IVA: compra.value.IVA, // IVA calculado
        subtotal: compra.value.subtotal, // Subtotal calculado
        total: compra.value.total, // Total calculado
        fecha_compra: compra.value.fecha_compra // Fecha de la compra
    };

    // Enviamos los datos al backend o servicio correspondiente
    await setCompras(compraData);
};

// Función para mostrar mensajes de éxito o error según el resultado
const showToast = () => {
    if (mensaje.value) { // Si hay un mensaje disponible
        if (mensaje.value[0] === 'Compra agregada con éxito') {
            sucessToast('Compra agregada correctamente'); // Mostramos mensaje de éxito
        } else {
            errorToast('No se ha podido agregar la compra'); // Mostramos mensaje de error
        }
    }
};

// Observador: escucha cambios en "mensaje" para mostrar toasts
watch(mensaje, showToast);
</script>

<template>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <!-- Tarjeta para agregar compra -->
        <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
            <!-- Encabezado de la tarjeta -->
            <div class="card-header border-custom">
                <h4 class="text-center">Agregar Compra</h4>
            </div>
            <!-- Mensaje de éxito -->
            <div class="alert alert-success text-center mt-3 p-2" v-if="mensaje && mensaje[0] === 'Compra agregada con éxito'" role="alert">
                {{ mensaje[0].toString() }}
            </div>
            <!-- Mensajes de error -->
            <div class="alert alert-danger text-center mt-3 p-2" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== 'Compra agregada con éxito'" role="alert">
                {{ error }}
            </div>
            <!-- Cuerpo de la tarjeta -->
            <div class="card-body">
                <!-- Selector de descripción del artículo -->
                <div class="mb-3">
                    <label for="descripcion">Descripción</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-card-heading"></i></span>
                        <select class="form-select" name="descripcion" v-model="articulo.descripcion">
                            <option v-for="item in articulos" :key="item.id" :value="item.descripcion">
                                {{ item.descripcion }}
                            </option>
                        </select>
                    </div>
                </div>
                <!-- Formulario de validación -->
                <Form :validation-schema="CompraAgregarSchema" @submit="onValidated">
                    <!-- Campo ID Artículo -->
                    <div class="mb-3">
                        <label for="id">ID Articulo</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-hash"></i></span>
                            <Field type="text" class="form-control" name="id_articulo" v-model="compra.id_articulo" placeholder="ID Articulo" disabled />
                        </div>
                        <ErrorMessage name="id_articulo" class="errorValidacion" />
                    </div>
                    <!-- Campo Cantidad -->
                    <div class="mb-3">
                        <label for="cantidad">Cantidad</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-box"></i></span>
                            <Field type="number" class="form-control" name="cantidad" v-model="compra.cantidad" placeholder="Cantidad" />
                        </div>
                        <ErrorMessage name="cantidad" class="errorValidacion" />
                    </div>
                    <!-- Campo Precio -->
                    <div class="mb-3">
                        <label for="precio">Precio</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                            <Field type="number" class="form-control" name="precio" v-model="compra.precio" placeholder="Cantidad" />
                        </div>
                        <ErrorMessage name="precio" class="errorValidacion" />
                    </div>
                    <!-- Campo IVA -->
                    <div class="mb-3">
                        <label for="IVA">IVA</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                            <Field type="number" class="form-control" name="IVA" v-model="compra.IVA" placeholder="IVA" disabled/>
                        </div>
                    </div>
                    <!-- Campo Subtotal -->
                    <div class="mb-3">
                        <label for="subtotal">Subtotal</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                            <Field type="number" class="form-control" name="subtotal" v-model="compra.subtotal" placeholder="Subtotal" disabled/>
                        </div>
                    </div>
                    <!-- Campo Total -->
                    <div class="mb-3">
                        <label for="total">Total</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                            <Field type="number" class="form-control" name="total" v-model="compra.total" placeholder="Total" disabled/>
                        </div>
                    </div>
                    <!-- Campo Fecha de Compra -->
                    <div class="mb-3">
                        <label for="fecha_compra">Fecha de Compra</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-calendar"></i></span>
                            <Field type="date" class="form-control" name="fecha_compra" v-model="compra.fecha_compra" />
                        </div>
                    </div>
                    <!-- Botón para enviar el formulario -->
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-success">Agregar Compra</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Estilos para los mensajes de error de validación */
.errorValidacion {
    color: red;
    font-weight: bold;
}

/* Estilo personalizado para el borde del encabezado */
.border-custom {
    border: 3px solid #170885; 
    border-radius: 25px;
    background-color: #8392f5; 
}

/* Ajuste del ancho máximo para la tarjeta */
.small-card {
    max-width: 600px;
    width: 100%;
}

/* Estilos para centrar la tarjeta */
.card {
    margin: 0 auto;
    padding: 2rem;
}
</style>
