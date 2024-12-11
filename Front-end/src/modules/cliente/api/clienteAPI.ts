// Importa la librería 'axios' para realizar solicitudes HTTP.
import axios from "axios";

// Crea una instancia personalizada de axios llamada 'clienteAPI'.
// Esto permite centralizar y configurar las solicitudes HTTP relacionadas con el API de clientes.
export const clienteAPI = axios.create({
    
    // Define la URL base para las solicitudes de la API. 
    // Todas las solicitudes realizadas con 'clienteAPI' usarán esta URL como base.
    baseURL: "http://localhost:3001/api/cliente"
});
