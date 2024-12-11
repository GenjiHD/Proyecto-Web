// Importa 'ref' de Vue para crear variables reactivas que se pueden usar en el template de la vista.
import { ref } from 'vue';
// Importa las interfaces Cliente y ClienteAgregar para tener tipado fuerte en las variables y funciones.
import type { Cliente, ClienteAgregar } from '../interfaces/cliente_interfaces';
// Importa el clienteAPI que contiene las funciones para interactuar con la API del backend.
import { clienteAPI } from '../api/clienteAPI';
// Define y exporta un composable 'useCliente' que encapsula la lógica relacionada con la gestión de clientes.
export const useCliente = () => {
    
    // Inicializa una variable reactiva 'clientes' que será un arreglo de objetos tipo Cliente.
    const clientes = ref<Cliente[]>([]);
    // Inicializa una variable reactiva 'mensaje' para almacenar mensajes que serán mostrados en la vista.
    let mensaje = ref<string[]>([]);
    // Define una función 'getClientes' que obtiene una lista de clientes desde la API.
    const getClientes = async (params: Record<string, any> = {}) => {
        try {
            // Convierte los parámetros en una cadena de consulta (query string).
            const queryParams = new URLSearchParams(params).toString(); 
            // Define la URL de la API para la solicitud. Se agrega el query string si existe.
            const url = `/${queryParams ? '?' + queryParams : ''}`;
            // Realiza la solicitud GET a la API y guarda la respuesta en 'response'.
            const response = await clienteAPI.get<{ data: Cliente[], pagination: any }>(url);
            // Asigna los datos de clientes a la variable reactiva 'clientes'.
            clientes.value = response.data.data;
            // Devuelve la respuesta completa que incluye la paginación.
            return response.data;
        } catch (error) {
            // Si ocurre un error, muestra un mensaje en 'mensaje'.
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    };

    // Define una función 'getClienteById' para obtener un cliente específico por su ID desde la API.
    const getClienteById = async (id: number) => {
        try {
            // Realiza la solicitud GET para obtener el cliente por su ID.
            const response = await clienteAPI.get<Cliente[]>(`/${id}`);
            // Asigna los datos del cliente obtenido a la variable 'clientes'.
            clientes.value = response.data;
        } catch (error) {
            // Si ocurre un error, muestra un mensaje en 'mensaje'.
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    };

    // Define una función 'setCliente' para agregar un nuevo cliente a la API.
    const setCliente = async (cliente: ClienteAgregar) => {
        try {
            // Realiza la solicitud POST para agregar un cliente con los datos proporcionados.
            const response = await clienteAPI.post('/', cliente);
            // Si hay errores en la respuesta, extrae los mensajes de error y los asigna a 'mensaje'.
            if (response.data.error) {
                let { error } = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            } else {
                // Si el cliente se agrega correctamente, asigna un mensaje de éxito.
                mensaje.value = ['Cliente agregado con éxito'];
            }
        } catch (error) {
            // Si ocurre un error, muestra un mensaje en 'mensaje'.
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    };

    // Define una función 'updateCliente' para actualizar los datos de un cliente existente.
    const updateCliente = async (cliente: Cliente) => {
        try {
            // Realiza la solicitud PUT para actualizar el cliente con los nuevos datos.
            const response = await clienteAPI.put('/', cliente);
            // Si hay errores en la respuesta, extrae los mensajes de error y los asigna a 'mensaje'.
            if (response.data.error) {
                let { error } = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            } else {
                // Si el cliente se actualiza correctamente, asigna un mensaje de éxito.
                mensaje.value = ['Cliente actualizado con éxito'];
            }
        } catch (error) {
            // Si ocurre un error, muestra un mensaje en 'mensaje'.
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    };

    // Define una función 'deleteCliente' para eliminar un cliente por su ID.
    const deleteCliente = async (cliente: Cliente) => {
        try {
            // Realiza la solicitud DELETE para eliminar el cliente pasando su 'id' como parámetro.
            const response = await clienteAPI.delete('/', { data: { id: cliente.id } });
            // Si hay errores en la respuesta, extrae los mensajes de error y los asigna a 'mensaje'.
            if (response.data.error) {
                let { error } = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            } else {
                // Si el cliente se elimina correctamente, asigna un mensaje de éxito.
                mensaje.value = ['Cliente eliminado con éxito'];
            }
        } catch (error) {
            // Si ocurre un error, muestra un mensaje en 'mensaje'.
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    };

    // Devuelve las funciones y las variables reactivas para que puedan ser utilizadas en otras partes de la aplicación.
    return {
        clientes,       // La lista de clientes.
        mensaje,        // Los mensajes de éxito o error.
        getClientes,    // Función para obtener la lista de clientes.
        getClienteById, // Función para obtener un cliente por su ID.
        updateCliente,  // Función para actualizar un cliente.
        setCliente,     // Función para agregar un nuevo cliente.
        deleteCliente   // Función para eliminar un cliente.
    };
};
