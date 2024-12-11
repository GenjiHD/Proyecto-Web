// Importa `ref` de Vue, que se utiliza para declarar variables reactivas dentro de composables.
import { ref } from "vue"; 

// Importa los tipos `Registro` y `RegistroAgregar` desde el archivo de interfaces.
// Estos tipos se utilizan para proporcionar validación y autocompletado en el código.
import type { Registro, RegistroAgregar } from "../interfaces/registros_interfaces";

// Importa `registrosAPI`, una instancia preconfigurada de Axios que interactúa con el backend.
import { registrosAPI } from "../api/registrosAPI";

// Define un composable llamado `useRegistros`, que encapsula la lógica relacionada con los registros.
export const useRegistros = () => { 

    // Declara un estado reactivo `registros` para almacenar una lista de registros.
    const registros = ref<Registro[]>([]);

    // Declara un estado reactivo `mensaje` para almacenar mensajes relacionados con operaciones.
    let mensaje = ref<string[]>([]);

    // Función para obtener la lista de registros desde la API.
    const getRegistros = async () => { 
        try {
            // Realiza una solicitud GET al endpoint de registros y actualiza el estado con los datos obtenidos.
            const response = await registrosAPI.get<Registro[]>("/");
            registros.value = response.data;
        } catch (error) {
            // Maneja errores de conexión asignando un mensaje al estado `mensaje`.
            mensaje.value = ['No se pudo conectar con el servidor'];
        }
    };

    // Función para agregar un nuevo registro a través de la API.
    const setRegistro = async (registro: RegistroAgregar) => {
        try {
            // Realiza una solicitud POST al endpoint de registros con los datos proporcionados.
            const response = await registrosAPI.post('/', registro);

            // Si la API devuelve un error en los datos enviados, extrae los mensajes de error y los asigna al estado `mensaje`.
            if (response.data.error) {
                let { error } = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            } else {
                // Si no hay errores, asigna un mensaje de éxito.
                mensaje.value = ['Registro agregado exitosamente'];
            }
        } catch (error) {
            // Maneja errores al intentar agregar el registro.
            mensaje.value = ['No se pudo agregar el registro'];
        }
    };

    // Función para eliminar un registro a través de la API.
    const deleteRegistro = async (id: number) => {
        try {
            // Realiza una solicitud DELETE al endpoint correspondiente al registro con el ID especificado.
            const response = await registrosAPI.delete(`/${id}`);
            mensaje.value = ['Registro eliminado'];
        } catch (error) {
            // Maneja errores al intentar eliminar el registro.
            mensaje.value = ['No se pudo eliminar registro'];
        }
    };

    // Retorna las propiedades y funciones definidas para que puedan ser utilizadas en componentes.
    return {
        registros, // Lista reactiva de registros.
        mensaje, // Lista reactiva de mensajes.
        getRegistros, // Función para obtener registros.
        setRegistro, // Función para agregar registros.
        deleteRegistro // Función para eliminar registros.
    };
};
