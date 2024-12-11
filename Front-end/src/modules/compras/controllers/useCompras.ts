import { ref } from 'vue'; // Importamos la función ref para manejar estados reactivos en Vue.
import type { Compra, CompraAgregar } from '../interfaces/compras_interfaces'; // Importamos los tipos de datos definidos para las compras.
import { comprasAPI } from '../api/comprasAPI'; // Importamos la instancia de API para gestionar las solicitudes relacionadas con compras.

// Hook personalizado para gestionar las compras.
export const useCompras = () => {
    const compras = ref<Compra[]>([]); // Variable reactiva para almacenar la lista de compras.
    let mensaje = ref<string[]>([]); // Variable reactiva para almacenar mensajes de estado (éxito o error).

    // Función: Obtener todas las compras.
    const getCompras = async (params: Record<string, any> = {}) => {
        try {
            // Convertimos los parámetros a un formato de consulta (query string).
            const queryParams = new URLSearchParams(params).toString();
            const url = `/${queryParams ? '?' + queryParams : ''}`; // Construimos la URL con los parámetros si existen.
            const response = await comprasAPI.get<{ data: Compra[], pagination: any }>(url); // Realizamos una solicitud GET a la API.
            
            compras.value = response.data.data; // Almacenamos las compras obtenidas en la variable reactiva.
            return response.data; // Devolvemos la respuesta completa, incluyendo la paginación.
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor']; // Mensaje de error en caso de fallo en la conexión.
        }
    };

    // Función: Obtener una compra por su ID.
    const getComprasById = async (id: number) => {
        try {
            const response = await comprasAPI.get<Compra[]>(`/${id}`); // Realizamos una solicitud GET a la API con el ID especificado.
            compras.value = response.data; // Almacenamos la compra obtenida en la variable reactiva.
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor']; // Mensaje de error en caso de fallo en la conexión.
        }
    };

    // Función: Registrar una nueva compra.
    const setCompras = async (compra: CompraAgregar) => {
        try {
            const response = await comprasAPI.post('/', compra); // Realizamos una solicitud POST con los datos de la nueva compra.
            
            // Verificamos si hubo un error en la respuesta.
            if (response.data.error) {
                let { error } = response.data;
                // Si existen detalles específicos del error, los agregamos al mensaje.
                if (error && error.issues) {
                    mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
                } else {
                    mensaje.value = ['Error desconocido al agregar la compra'];
                }
            } else {
                mensaje.value = ['Compra agregada con éxito']; // Mensaje de éxito en caso de éxito.
            }
        } catch (error) {
            mensaje.value = ['Error al intentar agregar la compra.']; // Mensaje de error en caso de fallo en la solicitud.
            console.error(error); // Registramos el error en la consola para depuración.
        }
    };

    // Función: Actualizar una compra existente.
    const updateCompras = async (compra: Compra) => {
        try {
            const response = await comprasAPI.put('/', compra); // Realizamos una solicitud PUT para actualizar la compra.
            
            // Verificamos si hubo un error en la respuesta.
            if (response.data.error) {
                let { error } = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            } else {
                mensaje.value = ['Compra actualizada con éxito']; // Mensaje de éxito en caso de éxito.
            }
        } catch (error) {
            mensaje.value = ['Error al intentar actualizar la compra.']; // Mensaje de error en caso de fallo en la solicitud.
            console.error(error); // Registramos el error en la consola para depuración.
        }
    };

    // Devolvemos las variables reactivas y funciones para ser usadas en otros componentes.
    return {
        compras,
        mensaje,
        getCompras,
        getComprasById,
        setCompras,
        updateCompras
    };
};
