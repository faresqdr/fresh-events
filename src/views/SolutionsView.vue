<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // Animations disabled for immediate visibility
  console.log('SolutionsView mounted - animations disabled for testing')
})
</script>

<template>
  <div class="solutions-view">
    <!-- Hero -->
    <section class="hero-section bg-primary">
      <div class="container text-center">
        <p class="uppercase" style="color: rgba(255,255,255,0.8); font-size: 0.85rem; letter-spacing: 0.15em; margin-bottom: 1.5rem;">Solutions</p>
        <h1 class="text-white">Sur-Mesure pour <br><span class="accent-text">Chaque Événement</span></h1>
        <div class="accent-line accent-line-center" style="background: rgba(255,255,255,0.3); margin: 2rem auto;"></div>
        <p class="text-lg text-white" style="max-width: 700px; margin: 0 auto; opacity: 0.9;">
          Festivals, événements corporate, lieux de loisirs... Notre expertise 
          s'adapte à tous vos besoins.
        </p>
      </div>
    </section>

    <!-- Festivals & Culture -->
    <section class="solution-block bg-white section-padding-lg">
      <div class="container">
        <div class="grid-2">
          <div class="solution-content">
            <span class="solution-tag">High Volume</span>
            <h2>Festivals & Culture</h2>
            <div class="accent-line"></div>
            <p class="text-lg">
              Gérer des flux de 50 000 personnes ? C'est notre quotidien. 
              Signalétique optimale, débit maximum, expérience fluide.
            </p>
            <ul class="solution-features">
              <li>Capacité de flux massive</li>
              <li>Organisation multi-points de vente</li>
              <li>Gestion des pics d'affluence</li>
              <li>Solutions de paiement rapide</li>
            </ul>
            <div class="solution-specs">
              <div class="spec">
                <strong>50K+</strong>
                <span>Capacité visiteurs</span>
              </div>
              <div class="spec">
                <strong>24/7</strong>
                <span>Support événement</span>
              </div>
            </div>
          </div>
          <div class="solution-visual">
            <div class="img-container">
              <img src="https://picsum.photos/seed/festival/700/600" alt="Festival" class="img-premium" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Corporate & Séminaires -->
    <section class="solution-block bg-cream section-padding-lg">
      <div class="container">
        <div class="grid-2">
          <div class="solution-visual order-desktop-1">
<div class="img-container">
              <img src="https://picsum.photos/seed/corporate-business/700/600" alt="Corporate" class="img-premium" />
            </div>
          </div>
          <div class="solution-content order-desktop-2">
            <span class="solution-tag">Premium Service</span>
            <h2>Corporate & Séminaires</h2>
            <div class="accent-line"></div>
            <p class="text-lg">
              Service irréprochable pour impressionner vos clients et collaborateurs. 
              Buffets soignés, personnel élégant, attention aux détails.
            </p>
            <ul class="solution-features">
              <li>Service haut de gamme</li>
              <li>Menus personnalisés</li>
              <li>Personnel en tenue professionnelle</li>
              <li>Discrétion et efficacité</li>
            </ul>
            <div class="solution-specs">
              <div class="spec">
                <strong>100%</strong>
                <span>Satisfaction client</span>
              </div>
              <div class="spec">
                <strong>Premium</strong>
                <span>Qualité garantie</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lieux de Loisirs -->
    <section class="solution-block bg-white section-padding-lg">
      <div class="container">
        <div class="grid-2">
          <div class="solution-content">
            <span class="solution-tag">Family Friendly</span>
            <h2>Lieux de Loisirs</h2>
            <div class="accent-line"></div>
            <p class="text-lg">
              Musées, parcs, stades, zoos... Gestion pérenne ou saisonnière 
              pour fidéliser vos visiteurs par l'expérience gastronomique.
            </p>
            <ul class="solution-features">
              <li>Gestion quotidienne ou événementielle</li>
              <li>Offres adaptées au public familial</li>
              <li>Rotation rapide et qualité constante</li>
              <li>Modèle économique flexible</li>
            </ul>
            <div class="solution-specs">
              <div class="spec">
                <strong>365j</strong>
                <span>Disponibilité</span>
              </div>
              <div class="spec">
                <strong>Flex</strong>
                <span>Gestion adaptée</span>
              </div>
            </div>
          </div>
          <div class="solution-visual">
            <div class="img-container">
              <img src="https://picsum.photos/seed/party-celebration/700/600" alt="Loisirs" class="img-premium" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Adaptability Section -->
    <section class="adaptability-section bg-primary section-padding-lg">
      <div class="container text-center">
        <h2 class="text-white" style="margin-bottom: 2rem;">Partout. Tout le Temps.</h2>
        <div class="accent-line accent-line-center" style="background: rgba(255,255,255,0.3);"></div>
        <p class="text-lg text-white" style="max-width: 600px; margin: 2rem auto 3rem; opacity: 0.9;">
          Intérieur, extérieur, conditions extrêmes ou environnement premium. 
          Notre capacité d'adaptation garantit votre succès dans tous les contextes.
        </p>
        <div class="adaptability-grid">
          <div class="adapt-item">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <p>Intérieur</p>
          </div>
          <div class="adapt-item">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Extérieur</p>
          </div>
          <div class="adapt-item">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p>Toutes saisons</p>
          </div>
          <div class="adapt-item">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <p>Prestations premium</p>
          </div>
        </div>
        <RouterLink to="/contact" class="btn btn-outline-white btn-large" style="margin-top: 3rem;">Lancer Votre Projet</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  padding: clamp(6rem, 15vw, 10rem) 0;
}

/* Solution Blocks */
.solution-block {
  position: relative;
}

.solution-content {
  padding: 2rem 0;
}

.solution-tag {
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
  background: var(--color-accent);
  color: var(--color-white);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.solution-content h2 {
  margin-bottom: 1.5rem;
}

.solution-features {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.solution-features li {
  padding: 0.75rem 0;
  padding-left: 2rem;
  position: relative;
  color: var(--color-black);
}

.solution-features li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: var(--color-accent);
  border-radius: 50%;
}

.solution-specs {
  display: flex;
  gap: 3rem;
  margin-top: 2.5rem;
}

.spec {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.spec strong {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--color-accent);
  font-weight: 500;
}

.spec span {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-black);
  opacity: 0.7;
}

/* Adaptability */
.adaptability-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.adapt-item {
  color: var(--color-white);
  text-align: center;
}

.adapt-item svg {
  margin-bottom: 1rem;
  opacity: 0.9;
}

.adapt-item p {
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 1024px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }

  .order-desktop-1 {
    order: 1;
  }

  .order-desktop-2 {
    order: 2;
  }
}

@media (max-width: 768px) {
  .solution-specs {
    flex-direction: column;
    gap: 1.5rem;
  }

  .adaptability-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
