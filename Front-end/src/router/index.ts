import ArticulosVue from '@/modulos/articulos/views/ArticulosVue.vue'
import { getAuth } from 'firebase/auth'
import ArticulosEditarVue from '@/modulos/articulos/views/ArticulosEditarVue.vue'
import ClienteAgregarVue from '@/modulos/cliente/views/ClienteAgregarVue.vue'
import ClienteBorrarVue from '@/modulos/cliente/views/ClienteBorrarVue.vue'
import ClienteEditarVue from '@/modulos/cliente/views/ClienteEditarVue.vue'
import ClienteVue from '@/modulos/cliente/views/ClienteVue.vue'
import PersonalAgregarVue from '@/modulos/personal/views/PersonalAgregarVue.vue'
import PersonalBorrar from '@/modulos/personal/views/PersonalBorrar.vue'
import PersonalEditarVue from '@/modulos/personal/views/PersonalEditarVue.vue'
import PersonalVue from '@/modulos/personal/views/PersonalVue.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ArticulosBorrarVue from '@/modulos/articulos/views/ArticulosBorrarVue.vue'
import ArticulosAgregarVue from '@/modulos/articulos/views/ArticulosAgregarVue.vue'
import BienvenidaVue from '@/modulos/principal/views/BienvenidaVue.vue'
import SignUpVue from '@/modulos/auth/views/SignUpVue.vue'
import SignInVue from '@/modulos/authentication/views/SignInVue.vue'
import ComprasVue from '@/modulos/compras/views/ComprasVue.vue'
import ComprasAgregarVue from '@/modulos/compras/views/ComprasAgregarVue.vue'
import RegistrosVue from '../modulos/registros/views/RegistrosVue.vue'
import RegistrosAgregarVue from '@/modulos/registros/views/RegistrosAgregarVue.vue'

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
      component: SignUPVue,
    },
    {
      path: '/validacion',
      name: 'validacion',
      component: SignINVue,
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