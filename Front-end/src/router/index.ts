import { getAuth } from 'firebase/auth';
import SignInVue from '@/modules/authentication/views/SignInVue.vue'
import SignUpVue from '@/modules/authentication/views/SignUpVue.vue'
import PersonalAgregarVue from '@/modules/personal/views/PersonalAgregarVue.vue'
import PersonalEditarVue from '@/modules/personal/views/PersonalEditarVue.vue'
import PersonalEliminarVue from '@/modules/personal/views/PersonalEliminarVue.vue'
import PersonalVue from '@/modules/personal/views/PersonalVue.vue'
import BienvenidaVue from '@/modules/principal/views/BienvenidaVue.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    {
      path: '/personal',
      name: 'personal',
      component: PersonalVue,
      beforeEnter:(to, from, next) => {
        const auth = getAuth();
        const usuario = auth.currentUser // Hay un usuario?
        if(usuario){
          next();
        }
        else{
          next('/validacion');
        }
      }
    },
    {
      path: '/personal/agregar',
      name: 'personalagregar',
      component: PersonalAgregarVue,
    },
    {
      path: '/personal/:id/editar',
      name: 'personaleditar',
      component: PersonalEditarVue,
    },
    {
      path: '/personal/:id/borrar',
      name: 'personalborrar',
      component: PersonalEliminarVue
    },
    {
      path: '/bienvenida',
      name: 'bienvenida',
      component: BienvenidaVue
    },
    {
      path: '/registrar',
      name: 'registrar',
      component: SignUpVue
    },
    {
      path: '/validacion',
      name: 'validacion',
      component: SignInVue
    },
  ],
})

export default router
