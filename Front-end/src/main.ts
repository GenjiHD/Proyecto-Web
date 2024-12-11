import { createApp } from 'vue'  // Importa la función `createApp` de Vue para crear una instancia de la aplicación.
import App from './App.vue'  // Importa el componente principal de la aplicación, `App.vue`.
import router from './router'  // Importa el enrutador para manejar la navegación entre vistas.

const app = createApp(App)  // Crea la aplicación Vue pasando el componente `App` como root.

app.use(router)  // Utiliza el enrutador dentro de la aplicación para permitir la navegación entre páginas.

app.mount('#app')  // Monta la aplicación en el elemento HTML con id "app".
