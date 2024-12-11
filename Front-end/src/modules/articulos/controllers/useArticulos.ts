import { ref } from 'vue';  // Importa la función "ref" de Vue para crear variables reactivas.
import type { Articulos, ArticulosAgregar } from '../interfaces/articulos-interface';  // Importa los tipos "Articulos" y "ArticulosAgregar" de la interfaz definida previamente.
import { articulosAPI } from '../api/articulosAPI';  // Importa las funciones para hacer solicitudes a la API de artículos.

export const useArticulos = () => {  // Define el hook "useArticulos" que maneja la lógica relacionada con los artículos.

    const articulos = ref<Articulos[]>([]);  // Crea una variable reactiva "articulos" para almacenar una lista de artículos.
    let mensaje = ref<string[]>([]);  // Crea una variable reactiva "mensaje" para almacenar mensajes de estado.

    // Función para obtener artículos con parámetros opcionales (como filtros o búsqueda).
    const getArticulos = async (params: Record<string, any> = {}) => { 
        try {
            const queryParams = new URLSearchParams(params).toString();  // Convierte los parámetros en una cadena de consulta para la URL.
            const url = `/${queryParams ? '?' + queryParams : ''}`;  // Construye la URL con los parámetros de consulta si existen.
            const response = await articulosAPI.get<{ data: Articulos[], pagination: any }>(url);  // Hace la solicitud GET a la API.
            articulos.value = response.data.data;  // Asigna los datos de la respuesta a la variable reactiva "articulos".
            return response.data;  // Devuelve los datos de la respuesta.
        } catch (error) {  
            mensaje.value = ['Hubo un problema al intentar conectarse con el servidor'];  // Manejo de error en caso de fallo de la solicitud.
        }
    };

    // Función para obtener todos los artículos sin ningún filtro.
    const getAllArticulos = async () => {
        try {
            const response = await articulosAPI.get<Articulos[]>('/getArticulos');  // Hace la solicitud para obtener todos los artículos.
            articulos.value = response.data;  // Asigna los datos de la respuesta a la variable reactiva "articulos".
            console.log(response.data);  // Imprime los datos de la respuesta en la consola.
        } catch (error) {  
            mensaje.value = ['No se pudo establecer conexión con el servidor'];  // Manejo de error en caso de fallo de la solicitud.
        }
    }

    // Función para agregar un artículo a la base de datos.
    const setArticulos = async (articulos: ArticulosAgregar) => {
        try {
            const response = await articulosAPI.post('/', articulos);  // Hace la solicitud POST para agregar un nuevo artículo.
            if (response.data.error) {  // Verifica si hay un error en la respuesta.
                let { error } = response.data;  // Extrae el objeto de error.
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);  // Extrae los mensajes de error.
            } else {
                mensaje.value = ['Artículo añadido correctamente'];  // Mensaje de éxito si no hay errores.
            }
        } catch (error) {  
            mensaje.value = ['No se pudo agregar el artículo'];  // Manejo de error en caso de fallo al agregar el artículo.
        }
    }

    // Función para obtener un artículo por su ID.
    const getArticulosById = async (id: number) => {
        try {
            const response = await articulosAPI.get<Articulos[]>(`/${id}`);  // Hace la solicitud GET para obtener un artículo por su ID.
            articulos.value = response.data;  // Asigna los datos de la respuesta a la variable reactiva "articulos".
        } catch (error) {  
            mensaje.value = ['No se pudo conectar al servidor para obtener el artículo'];  // Manejo de error si no se pudo obtener el artículo.
        }
    }

    // Función para actualizar los datos de un artículo existente.
    const updateArticulos = async (articulos: Articulos) => {
        try {
            const response = await articulosAPI.put('/', articulos);  // Hace la solicitud PUT para actualizar un artículo.
            if (response.data.error) {  // Verifica si hay un error en la respuesta.
                let { error } = response.data;  // Extrae el objeto de error.
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);  // Extrae los mensajes de error.
            } else {
                mensaje.value = ['Artículo actualizado con éxito'];  // Mensaje de éxito si el artículo fue actualizado correctamente.
            }
        } catch (error) {  
            mensaje.value = ['Hubo un error al intentar actualizar el artículo'];  // Manejo de error si no se pudo actualizar el artículo.
        }
    }

    // Función para eliminar un artículo.
    const deleteArticulos = async (articulos: Articulos) => {
        try {
            const response = await articulosAPI.delete('/', { data: { id: articulos.id } });  // Hace la solicitud DELETE para eliminar un artículo.
            if (response.data.error) {  // Verifica si hay un error en la respuesta.
                let { error } = response.data;  // Extrae el objeto de error.
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);  // Extrae los mensajes de error.
            } else {
                mensaje.value = ['Artículo eliminado correctamente'];  // Mensaje de éxito si el artículo fue eliminado correctamente.
            }
        } catch (error) {  
            mensaje.value = ['No se pudo eliminar el artículo'];  // Manejo de error si no se pudo eliminar el artículo.
        }
    }

    // Retorna las propiedades y funciones que serán usadas en el componente.
    return {
        articulos,
        mensaje,
        getArticulos,
        setArticulos,
        getArticulosById,
        updateArticulos,
        deleteArticulos,
        getAllArticulos
    }
}
