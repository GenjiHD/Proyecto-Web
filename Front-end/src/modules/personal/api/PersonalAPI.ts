// Importamos la librería 'axios' para realizar peticiones HTTP
import axios from "axios";

// Creamos una instancia de axios con la configuración base para interactuar con la API de 'personal'
// Se define la URL base a la que se harán las solicitudes HTTP para acceder a los recursos de 'personal'
const PersonalAPI = axios.create({
    baseURL: 'http://localhost:3001/api/personal/' // URL base de la API donde se gestionan los registros de 'personal'
});

// Exportamos la instancia de axios para que se pueda utilizar en otros archivos donde se necesite interactuar con la API
export default PersonalAPI;
