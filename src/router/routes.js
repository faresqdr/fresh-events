// Route paths/names/meta only — no .vue imports, so this file can be
// executed directly by plain Node (e.g. scripts/generate-sitemap.js)
// without going through a bundler.
export const routeDefs = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: {
            title: 'Traiteur Événementiel Moselle & Luxembourg — Devis en Ligne · Fresh Events',
            description: 'Traiteur événementiel à Amnéville (Moselle), à 30 min de Luxembourg-Ville. Devis en ligne en 4 minutes : séminaire, mariage, cocktail, anniversaire, festival. Prix HT et TTC en temps réel. Moselle, Grand Est, Grand-Duché de Luxembourg. Réponse sous 24h.'
        }
    },
    {
        path: '/offre',
        name: 'offer',
        component: () => import('../views/OfferView.vue'),
        meta: {
            title: 'Services de Restauration Événémentielle | Fresh Events',
            description: 'Offres de restauration clé en main pour événements d\'entreprise, séminaires et food events à Amnéville.'
        }
    },
    {
        path: '/catalogue',
        name: 'catalogue',
        component: () => import('../views/CatalogueView.vue'),
        meta: {
            title: 'Catalogue Traiteur — Formules, Plats & Prestations | Fresh Events',
            description: 'Le catalogue complet Fresh Events : formules traiteur clé en main, enrichissements, plats à la carte et prestations événementielles. Amnéville, Moselle, Lorraine, Luxembourg.'
        }
    },
    {
        path: '/pourquoi-fresh-events',
        name: 'why-us',
        component: () => import('../views/WhyUsView.vue'),
        meta: {
            title: 'Pourquoi Choisir Fresh Events | Expertise & Qualité',
            description: 'Découvrez pourquoi Fresh Events est le partenaire idéal pour vos événements professionnels et séminaires.'
        }
    },
    {
        path: '/savoir-faire',
        name: 'expertise',
        component: () => import('../views/ExpertiseView.vue'),
        meta: {
            title: '11 Ans d\'Expertise en Restauration Événémentielle | Fresh Events',
            description: 'Découvrez notre expérience, nos certifications HACCP et notre support terrain 24/7 pour tous vos événements.'
        }
    },
    {
        path: '/solutions',
        name: 'solutions',
        component: () => import('../views/SolutionsView.vue'),
        meta: {
            title: 'Solutions Personnalisées pour Événements | Fresh Events',
            description: 'Solutions sur mesure pour événements d\'entreprise, séminaires, food events. Amnéville et région.'
        }
    },
    {
        path: '/partenaires/zoo-amneville',
        name: 'zoo-amneville',
        component: () => import('../views/partenaires/ZooAmnevilleView.vue'),
        meta: {
            title: 'Fresh Events × Zoo d\'Amnéville — Proposition Partenariat',
            description: 'Document privé de travail — non destiné à l\'indexation.',
            robots: 'noindex, nofollow'
        }
    },
    {
        path: '/mentions-legales',
        name: 'mentions-legales',
        component: () => import('../views/MentionsLegalesView.vue'),
        meta: {
            title: 'Mentions Légales | Fresh Events',
            description: 'Mentions légales du site Fresh Events — éditeur, hébergement, propriété intellectuelle.'
        }
    },
    {
        path: '/confidentialite',
        name: 'confidentialite',
        component: () => import('../views/ConfidentialiteView.vue'),
        meta: {
            title: 'Politique de Confidentialité | Fresh Events',
            description: 'Politique de confidentialité et protection des données personnelles — Fresh Events.'
        }
    },
    {
        path: '/cgv',
        name: 'cgv',
        component: () => import('../views/CGVView.vue'),
        meta: {
            title: 'Conditions Générales de Vente | Fresh Events',
            description: 'Conditions générales de vente applicables aux prestations Fresh Events.'
        }
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('../views/ContactView.vue'),
        meta: {
            title: 'Contact | Fresh Events',
            description: 'Contactez-nous pour votre événement ou séminaire à Amnéville.'
        }
    },
    {
        path: '/devis',
        name: 'quote',
        component: () => import('../views/QuoteView.vue'),
        meta: {
            title: 'Devis Traiteur Événementiel en Ligne | Fresh Events — Amnéville & Grand Est',
            description: 'Configurez votre devis traiteur en ligne en 4 étapes : séminaire, cocktail, mariage, anniversaire, festival. Réponse sous 24h. Traiteur événementiel à Amnéville, Moselle, Lorraine.'
        }
    }
]

export function scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    } else {
        return { top: 0 }
    }
}
