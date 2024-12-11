<template>
    <!-- Contenedor principal del formulario -->
    <div class="contenedor">
        <!-- Formulario de entrada del usuario, previene el comportamiento por defecto al enviar -->
        <form @submit.prevent="entradaUsuario" class="formulario">
            <!-- Título del formulario -->
            <h2>Validación de Usuario</h2>
            
            <!-- Campo de entrada para el correo -->
            <div class="grupo">
                <label>Correo:</label>
                <input 
                    type="email" 
                    v-model="correo" 
                    required 
                >
            </div>

            <!-- Campo de entrada para la contraseña -->
            <div class="grupo">
                <label>Contraseña:</label>
                <input 
                    type="password" 
                    v-model="password" 
                    required 
                >
            </div>

            <!-- Mostrar mensaje de error si existe -->
            <div class="error" v-if="error">
                {{ error }} <!-- Muestra el mensaje de error -->
            </div>

            <!-- Botón para enviar el formulario -->
            <button type="submit">
                Registrarse
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
    // Importa los módulos necesarios de Vue y Firebase
    import { ref } from 'vue';  // Para manejar variables reactivas
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';  // Para manejar la autenticación de Firebase
    import { useRouter } from 'vue-router';  // Para manejar la navegación entre rutas
    import '../../../firebase/config.js';  // Configuración de Firebase

    // Definición de las variables reactivas para correo, contraseña y errores
    const correo = ref('');  // Correo del usuario
    const password = ref('');  // Contraseña del usuario
    const error = ref<string | null>(null);  // Mensaje de error, si lo hay
    const router = useRouter();  // Instancia del enrutador de Vue

    // Función para validar el inicio de sesión
    const entradaUsuario = async() => {
        error.value = null;  // Reinicia el mensaje de error en caso de nuevo intento
        try {
            const auth = getAuth();  // Obtiene la instancia de autenticación de Firebase
            await signInWithEmailAndPassword(auth, correo.value, password.value);  // Intenta iniciar sesión con el correo y la contraseña proporcionados
            router.push({ name: 'personal' });  // Redirige a la ruta 'personal' si el inicio de sesión es exitoso
        } catch (err) {  // Si ocurre un error, se maneja según el tipo
            switch (err.code) {
                case 'auth/email-already-not-found':  // Si el correo no está registrado
                    error.value = "Usuario no encontrado";  // Muestra mensaje de usuario no encontrado
                    break;
                case 'auth/wrong-password':  // Si la contraseña es incorrecta
                    error.value = "Contraseña incorrecta";  // Muestra mensaje de contraseña incorrecta
                    break;
                default:  // En caso de cualquier otro error
                    error.value = "Ocurrió un error al iniciar sesión";  // Muestra mensaje genérico de error
                    break;
            }
        }
    };
</script>



<style scoped>
    /* Estilos del contenedor principal */
    .contenedor {
        max-width: 400px;  /* Limita el ancho máximo del contenedor */
        margin: 0px auto;  /* Centra el contenedor en la página */
        padding: 20px;  /* Añade espacio dentro del contenedor */
    }

    /* Estilos del formulario */
    .formulario {
        display: flex;  /* Usa flexbox para organizar los elementos */
        flex-direction: column;  /* Organiza los elementos en columna */
        gap: 1em;  /* Añade espacio entre los elementos */
    }

    /* Estilos de los campos de entrada */
    .grupo {
        display: flex;  /* Usa flexbox para organizar el contenido dentro del grupo */
        flex-direction: column;  /* Organiza los elementos dentro del grupo en columna */
        gap: 0.5em;  /* Añade espacio entre los elementos del grupo */
    }

    /* Estilos de los inputs */
    input {
        padding: 8px;  /* Añade relleno dentro del input */
        border: 1px solid #DDD;  /* Bordes del input */
        border-radius: 5px;  /* Bordes redondeados */
    }

    /* Estilos del botón */
    button {
        padding: 10px;  /* Relleno dentro del botón */
        background-color: #4CAF50;  /* Color de fondo verde */
        color: white;  /* Color de texto blanco */
        border: none;  /* Sin borde */
        border-radius: 5px;  /* Bordes redondeados */
        cursor: pointer;  /* Cambia el cursor cuando el botón es hover */
    }

    /* Estilos para el mensaje de error */
    .error {
        color: red;  /* Color del texto en rojo */
        font-size: 0.9em;  /* Tamaño de fuente más pequeño */
        margin-top: 0.5em;  /* Añade espacio encima del mensaje de error */
    }
</style>
