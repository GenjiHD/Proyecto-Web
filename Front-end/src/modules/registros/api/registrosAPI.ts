// Importa Axios, una biblioteca popular para realizar solicitudes HTTP en JavaScript.
import axios from "axios";

// Crea una instancia personalizada de Axios llamada `registrosAPI`.
// Esta instancia está configurada con una URL base para interactuar con la API de registros.
export const registrosAPI = axios.create({
    baseURL: "http://localhost:3001/api/registros" // Define la URL base para todas las solicitudes realizadas con esta instancia.
});
