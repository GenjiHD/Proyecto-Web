<template>
    <!-- Contenedor principal del formulario -->
    <div class="contenedor">
        <!-- Formulario de registro, evitando la acción predeterminada de envío con '@submit.prevent' -->
        <form @submit.prevent="registrarUsuario" class="formulario">
            <!-- Título del formulario -->
            <h2>Registro de Usuario</h2>

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
                {{ error }}  <!-- Muestra el mensaje de error -->
            </div>

            <!-- Botón de envío del formulario -->
            <button type="submit">
                Registrarse
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
    // Importación de 'ref' desde Vue para crear variables reactivas
    import { ref } from 'vue';

    // Importación de métodos de autenticación desde Firebase
    import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

    // Importación de la función de enrutamiento desde Vue Router
    import { useRouter } from 'vue-router';

    // Importación de la configuración de Firebase
    import '../../../firebase/config.js';

    // Declaración de variables reactivas para correo, contraseña y error
    const correo = ref('');  // Variable reactiva para el correo del usuario
    const password = ref('');  // Variable reactiva para la contraseña del usuario
    const error = ref<string | null>(null);  // Variable reactiva para mostrar mensajes de error

    // Inicialización del enrutador
    const router = useRouter();

    // Función de registro de usuario
    const registrarUsuario = async() => {
        error.value = null;  // Resetea el error al comenzar el proceso
        try {
            const auth = getAuth();  // Obtiene la instancia de autenticación de Firebase

            // Crea un usuario con el correo y la contraseña proporcionados
            await createUserWithEmailAndPassword(auth, correo.value, password.value);

            // Redirige al usuario a la ruta 'bienvenida' después de un registro exitoso
            router.push({name: 'bienvenida'});

        } catch (err) {
            // Manejo de errores según el código de error retornado por Firebase
            switch (err) {
                case 'auth/email-already-in-use':  // Si el correo ya está en uso
                    error.value = "Este correo ya esta registrado";  // Muestra un mensaje de error
                    break;
                case 'auth/weak-password':  // Si la contraseña es demasiado débil
                    error.value = "La contraseña es muy debil";  // Muestra un mensaje de error
                    break;
                default:  // En caso de cualquier otro error
                    error.value = "Ocurrio un error en el registro";  // Muestra un mensaje genérico
                    break;
            }
        }
    };
</script>


<style scoped>
    /* Estilos del contenedor principal */
    .contenedor {
        max-width: 400px;  /* Define un ancho máximo de 400px */
        margin: 0px auto;  /* Centra el contenedor horizontalmente */
        padding: 20px;  /* Agrega espacio interno */
    }

    /* Estilos para el formulario */
    .formulario {
        display: flex;  /* Usa el modelo de diseño flexbox */
        flex-direction: column;  /* Organiza los elementos en columna */
        gap: 1em;  /* Espacio entre los elementos */
    }

    /* Estilos para los campos de entrada (grupo) */
    .grupo {
        display: flex;  /* Usa flexbox para los elementos internos */
        flex-direction: column;  /* Organiza los elementos de manera vertical */
        gap: 0.5em;  /* Espacio entre los elementos */
    }

    /* Estilos para los campos de entrada */
    input {
        padding: 8px;  /* Agrega un relleno interno */
        border: 1px solid #DDD;  /* Bordes grises */
        border-radius: 5px;  /* Bordes redondeados */
    }

    /* Estilos para el botón */
    button {
        padding: 10px;  /* Agrega un relleno interno */
        background-color: #4CAF50;  /* Color de fondo verde */
        color: white;  /* Texto blanco */
        border: none;  /* Sin bordes */
        border-radius: 5px;  /* Bordes redondeados */
        cursor: pointer;  /* Cursor tipo mano al pasar sobre el botón */
    }

    /* Estilos para los mensajes de error */
    .error {
        color: red;  /* Color de texto rojo */
        font-size: 0.9em;  /* Tamaño de fuente más pequeño */
        margin-top: 0.5em;  /* Espacio superior */
    }
</style>
