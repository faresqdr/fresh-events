import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OfferView from '../views/OfferView.vue'
import WhyUsView from '../views/WhyUsView.vue'
import ExpertiseView from '../views/ExpertiseView.vue'
import SolutionsView from '../views/SolutionsView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                title: 'Fresh Events | Expert Restauration Événémentielle'
            }
        },
        {
            path: '/offre',
            name: 'offer',
            component: OfferView,
            meta: {
                title: 'Notre Offre | Restauration Clé en Main'
            }
        },
        {
            path: '/pourquoi-fresh-events',
            name: 'why-us',
            component: WhyUsView,
            meta: {
                title: 'Pourquoi Nous Choisir | Fresh Events'
            }
        },
        {
            path: '/savoir-faire',
            name: 'expertise',
            component: ExpertiseView,
            meta: {
                title: 'Savoir-Faire & Expérience | Fresh Events'
            }
        },
        {
            path: '/solutions',
            name: 'solutions',
            component: SolutionsView,
            meta: {
                title: 'Solutions Sur Mesure | Fresh Events'
            }
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactView,
            meta: {
                title: 'Contact & Devis | Fresh Events'
            }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// Update document title on route change
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Fresh Events'
    next()
})

export default router
