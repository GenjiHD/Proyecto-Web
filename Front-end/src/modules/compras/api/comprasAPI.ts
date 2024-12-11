import axios from "axios"; // Importamos axios, una biblioteca para realizar solicitudes HTTP.

// Creamos una instancia de axios preconfigurada para manejar solicitudes relacionadas con compras.
export const comprasAPI = axios.create({
    baseURL: "http://localhost:3001/api/compras" // Definimos la URL base para las solicitudes.
});
