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
                title: 'Fresh Events - Restauration Événémentielle & Séminaires à Amnéville',
                description: 'Expert en restauration événémentielle à Amnéville. Séminaires, événements d\'entreprise, food services. 10+ ans d\'expérience, conforme HACCP.'
            }
        },
        {
            path: '/offre',
            name: 'offer',
            component: OfferView,
            meta: {
                title: 'Services de Restauration Événémentielle | Fresh Events',
                description: 'Offres de restauration clé en main pour événements d\'entreprise, séminaires et food events à Amnéville.'
            }
        },
        {
            path: '/pourquoi-fresh-events',
            name: 'why-us',
            component: WhyUsView,
            meta: {
                title: 'Pourquoi Choisir Fresh Events | Expertise & Qualité',
                description: 'Découvrez pourquoi Fresh Events est le partenaire idéal pour vos événements professionnels et séminaires.'
            }
        },
        {
            path: '/savoir-faire',
            name: 'expertise',
            component: ExpertiseView,
            meta: {
                title: '10 Ans d\'Expertise en Restauration Événémentielle | Fresh Events',
                description: 'Découvrez notre expérience, nos certifications HACCP et notre support terrain 24/7 pour tous vos événements.'
            }
        },
        {
            path: '/solutions',
            name: 'solutions',
            component: SolutionsView,
            meta: {
                title: 'Solutions Personnalisées pour Événements | Fresh Events',
                description: 'Solutions sur mesure pour événements d\'entreprise, séminaires, food events. Amnéville et région.'
            }
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactView,
            meta: {
                title: 'Contact & Devis | Fresh Events',
                description: 'Contactez-nous pour un devis personnalisé pour votre événement ou séminaire à Amnéville.'
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

// Update document title and meta description on route change
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Fresh Events'
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.name = 'description'
        document.head.appendChild(metaDescription)
    }
    metaDescription.content = to.meta.description || 'Fresh Events - Restauration événémentielle premium à Amnéville'
    
    next()
})

export default router
