<template>
    <!-- Barra de navegación principal -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <!-- Enlace principal que redirige a la página de bienvenida -->
            <a class="navbar-brand" href="/bienvenida">Tienda</a>
            
            <!-- Botón para alternar el menú en pantallas pequeñas -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <!-- Contenedor de los enlaces de navegación -->
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <!-- Lista de enlaces -->
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <!-- Enlace a la página de Clientes -->
                        <li class="nav-item margin">
                            <RouterLink class="nav-link item" to="/clientes">Clientes</RouterLink>
                        </li>
                        <!-- Enlace a la página de Personal -->
                        <li class="nav-item margin">
                            <RouterLink class="nav-link item" to="/personal">Personal</RouterLink>
                        </li>
                        <!-- Enlace a la página de Artículos -->
                        <li class="nav-item margin">
                            <RouterLink class="nav-link item" to="/articulos">Articulos</RouterLink>
                        </li>
                        <!-- Enlace a la página de Ventas -->
                        <li class="nav-item margin">
                            <RouterLink class="nav-link item" to="/ventas">Ventas</RouterLink>
                        </li>
                        <!-- Enlace a la página de Registro (visible solo si el usuario está autenticado) -->
                        <li class="nav-item margin" v-if="usuarioAutenticado">
                            <RouterLink class="nav-link item" to="/registro">Registro</RouterLink>
                        </li>
                        <!-- Botón para cerrar sesión (visible solo si el usuario está autenticado) -->
                        <li class="nav-item margin" v-if="usuarioAutenticado">
                            <button @click.prevent="cerrarSesion" class="nav-link btn btn-link">
                                Salir
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
// Importa funciones de Firebase Authentication para verificar el estado de autenticación y cerrar sesión.
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// Importa funciones de Vue para manejar estado reactivo y ciclos de vida del componente.
import { ref, onMounted } from 'vue';

// Importa el enrutador para manejar redirecciones dentro de la aplicación.
import { useRouter } from 'vue-router';

// Estado reactivo para verificar si el usuario está autenticado.
const usuarioAutenticado = ref(false);

// Obtiene una instancia del servicio de autenticación de Firebase.
const auth = getAuth();

// Obtiene una instancia del enrutador para redireccionar después de cerrar sesión.
const router = useRouter();

// Ciclo de vida `onMounted` para ejecutar código cuando el componente se monta.
onMounted(() => {
    // Observa los cambios en el estado de autenticación del usuario.
    onAuthStateChanged(auth, (user) => {
        // Actualiza el estado `usuarioAutenticado` según si hay un usuario autenticado.
        usuarioAutenticado.value = !!user;
    });
});

// Función para cerrar la sesión del usuario.
const cerrarSesion = async () => {
    try {
        // Cierra la sesión utilizando Firebase Authentication.
        await signOut(auth);
        // Redirige al usuario a la página de bienvenida.
        router.push('/bienvenida');
    } catch (err) {
        // Muestra un error en la consola si ocurre un problema al cerrar sesión.
        console.log('Error al cerrar sesión', err);
    }
};
</script>

<style scoped>
/* Define estilos locales para el componente. */
</style>
