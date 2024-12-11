import axios from 'axios';  // Importamos la librería axios para hacer solicitudes HTTP.

export const articulosAPI = axios.create({  // Creamos una instancia personalizada de axios.
    baseURL:"http://localhost:3001/api/articulos"  // Definimos la URL base de la API de artículos.
}); 
