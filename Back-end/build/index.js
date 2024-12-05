"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Creamos la aplicacion a traves del paquete express
// y llamamos a su constructor
const app = (0, express_1.default)();
// Todo lo que regresa al usuario es de tipo JSON
app.use(express_1.default.json());
// Puerto para escuchar las peticiones del front-end
const port = 3001;
// Activar el servidor y lo ponemos en escucha
app.listen(port, () => {
    console.log(`Server is listening in the port ${port}`);
});
