import ArticulosVue from '../modules/articulos/views/ArticulosVue.vue'
import { getAuth } from 'firebase/auth'
import ArticulosEditarVue from '../modules/articulos/views/ArticulosEditarVue.vue'
import ClienteAgregarVue from '../modules/cliente/views/ClienteAgregarVue.vue'
import ClienteBorrarVue from '../modules/cliente/views/ClienteBorrarVue.vue'
import ClienteEditarVue from '../modules/cliente/views/ClienteEditar.Vue.vue'
import ClienteVue from '../modules/cliente/views/ClienteVue.vue'
import PersonalAgregarVue from '../modules/personal/views/PersonalAgregarVue.vue'
import PersonalBorrar from '../modules/personal/views/PersonalEliminarVue.vue'
import PersonalEditarVue from '../modules/personal/views/PersonalEditarVue.vue'
import PersonalVue from '../modules/personal/views/PersonalVue.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ArticulosBorrarVue from '../modules/articulos/views/ArticulosBorrar.vue'
import ArticulosAgregarVue from '../modules/articulos/views/ArticulosAgregarVue.vue'
import BienvenidaVue from '../modules/principal/views/BienvenidaVue.vue'
import SignUpVue from '../modules/authentication/views/SignUpVue.vue'
import SignInVue from '../modules/authentication/views/SignInVue.vue'
import ComprasVue from '../modules/compras/views/ComprasVue.vue'
import ComprasAgregarVue from '../modules/compras/views/ComprasAgregarVue.vue'
import RegistrosVue from '../modules/registros/views/RegistrosVue.vue'
import RegistrosAgregarVue from '../modules/registros/views/RegistrosAgregarVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BienvenidaVue,
    },
    {
      path: '/Bienvenida',
      name: 'Bienvenida',
      component: BienvenidaVue,
    },
    {
      path: '/registrar',
      name: 'registrar',
      component: SignUpVue,
    },
    {
      path: '/validacion',
      name: 'validacion',
      component: SignInVue,
    },
    {
      path: '/personal',
      name: 'personal',
      component: PersonalVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/personal/:id/editar',
      name: 'personaleditar',
      component: PersonalEditarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/personal/agregar',
      name: 'personalagregar',
      component: PersonalAgregarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/personal/:id/borrar',
      name: 'personalborrar',
      component: PersonalBorrar,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: ClienteVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/clientes/:id/editar',
      name: 'clienteseditar',
      component: ClienteEditarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/clientes/agregar',
      name: 'clientesagregar',
      component: ClienteAgregarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/clientes/:id/borrar',
      name: 'clientesborrar',
      component: ClienteBorrarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/articulos',
      name: 'articulos',
      component: ArticulosVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/articulos/:id/editar',
      name: 'articuloseditar',
      component: ArticulosEditarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/articulos/:id/borrar',
      name: 'articulosborrar',
      component: ArticulosBorrarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/articulos/agregar',
      name: 'articulosagregar',
      component: ArticulosAgregarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/compras',
      name: 'compras',
      component: ComprasVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/compras/agregar',
      name: 'comprasagregar',
      component: ComprasAgregarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/clientes/registro',
      name: 'registros',
      component: RegistrosVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/clientes/registro',
      name: 'registros',
      component: RegistrosVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/registro/agregar',
      name: 'agregarregistro',
      component: RegistrosAgregarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },

  ],
})

export default router