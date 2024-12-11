// Importación de las dependencias necesarias para manejar datos reactivos y realizar peticiones HTTP
import { ref } from "vue"; 
import type { Personal, PersonalAgregar } from "../interfaces/Personal-interface"; // Tipos importados para la estructura de datos
import PersonalAPI from "../api/PersonalAPI"; // API personalizada para interactuar con el backend
import axios from "axios"; // Importación de Axios para hacer peticiones HTTP

// Definición del Composable 'UsePersonal' que encapsula la lógica relacionada con las operaciones CRUD de 'Personal'
export const UsePersonal = () => {
    // Definimos una variable reactiva 'personal' que es un arreglo de objetos de tipo 'Personal'
    const personal = ref<Personal[]>([]); 
    // Definimos un mensaje reactivo 'message' que se utiliza para indicar el resultado de las operaciones
    let message = ref(0);
    // Función asincrónica para obtener todos los registros de 'Personal'
    const getPersonal = async () => {
        try {
            // Realiza una solicitud GET a la API para obtener los datos de 'personal'
            const response = await PersonalAPI.get<Personal[]>('/'); 
            // Asigna la respuesta de la API a la variable reactiva 'personal'
            personal.value = response.data; 
        } catch (err) {
            // Si ocurre un error, lo imprime en la consola
            console.log(err); 
        }
    };

    // Función asincrónica para obtener un registro de 'Personal' por su ID
    const getPersonalId = async (id: number) => {
        try {
            // Realiza una solicitud GET a la API para obtener un registro específico de 'personal' por ID
            const response = await PersonalAPI.get<Personal[]>('/' + id); 
            // Asigna la respuesta de la API a la variable reactiva 'personal'
            personal.value = response.data; 
        } catch (err) {
            // Si ocurre un error, lo imprime en la consola
            console.log(err); 
        }
    };

    // Función asincrónica para agregar un nuevo registro de 'Personal'
    const agregarPersonal = async (personal: PersonalAgregar) => {
        try {
            // Realiza una solicitud POST a la API para agregar un nuevo 'personal'
            const response = await PersonalAPI.post('/', personal); 
            // Si la respuesta indica que la operación fue exitosa, asigna un valor a 'message'
            if (response.data.affectedRows >= 1) { 
                message.value = 1; // 1 indica éxito
            }
        } catch (err) {
            // Si ocurre un error, lo imprime en la consola
            console.log(err); 
        }
    };

    // Función asincrónica para actualizar un registro de 'Personal'
    const updatePersonal = async (personal: Personal) => {
        try {
            // Realiza una solicitud PUT a la API para actualizar los datos de un 'personal'
            const response = await PersonalAPI.put('/', personal); 
            // Si la respuesta indica que la operación fue exitosa, asigna un valor a 'message'
            if (response.data.affectedRows >= 1) {
                message.value = 1; // 1 indica éxito
            }
        } catch (err) {
            // Si ocurre un error, lo imprime en la consola
            console.log(err); 
        }
    };

    // Función asincrónica para eliminar un registro de 'Personal'
    const deletePersonal = async (personal: Personal) => {
        try {
            // Realiza una solicitud DELETE a la API para eliminar un 'personal' usando el ID
            const response = await PersonalAPI.delete('/', { data: { id: personal.id } }); 
            // Si la respuesta indica que la operación fue exitosa, asigna un valor a 'message'
            if (response.data.fieldCount == 0) { 
                message.value = 1; // 1 indica éxito
            }
        } catch (err) {
            // Si ocurre un error, lo imprime en la consola
            console.log(err); 
        }
    };

    // Retorna todas las funciones y variables reactivas para ser utilizadas en otros componentes
    return {
        personal,       // Lista reactiva de 'Personal'
        message,        // Mensaje reactivo para indicar el resultado de operaciones CRUD
        getPersonal,    // Función para obtener todos los 'Personal'
        agregarPersonal, // Función para agregar un nuevo 'Personal'
        getPersonalId,  // Función para obtener un 'Personal' por su ID
        updatePersonal, // Función para actualizar un 'Personal'
        deletePersonal  // Función para eliminar un 'Personal'
    };
};
