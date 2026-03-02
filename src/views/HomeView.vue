<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const partners = [
  { name: 'Zoo d\'Amnéville', logo: '/logos/partners/zoo_amneville.png', url: 'https://www.zoo-amneville.com' },
  { name: 'Arcelor Mittal', logo: '/logos/partners/arcelor-mittal.png', url: 'https://www.arcelormittal.com' },
  { name: 'Seven Casino', logo: '/logos/partners/casino.png', url: 'https://www.seven-casino.fr' },
  { name: 'Golden Tulip', logo: '/logos/partners/golden-tulip.png', url: 'https://www.goldentulip.com' },
  { name: 'Le Galaxie', logo: '/logos/partners/galaxie.png', url: 'https://www.legaxie.fr'},
  { name: 'Moselle', logo: '/logos/partners/moselle.png', url: 'https://www.moselle.fr' },
  { name: 'GRDF', logo: '/logos/partners/grdf.png', url: 'https://www.grdf.fr' },
  { name: 'France Judo', logo: '/logos/partners/france-judo.png', url: 'https://www.ffjudo.fr' },
  { name: 'Socotec', logo: '/logos/partners/socotec.png', url: 'https://www.socotec.fr' },
  { name: 'Équatour', logo: '/logos/partners/equatour.png', url: 'https://www.equatour.fr' },
  { name: 'Renault', logo: '/logos/partners/renault.png', url: 'https://www.renault.fr' },
  { name: 'Séminaire Amnéville', logo: '/logos/partners/seminaire-amneville.png', url: 'https://www.seminaire-amneville.com' },
  { name: 'Car Avenue', logo: '/logos/partners/peugeot.png', url: 'https://www.caravenue.fr' },
  { name: 'Mondelez International', logo: '/logos/partners/mondelez.png', url: 'https://www.mondelezinternational.com' }
]

const heroRef = ref(null)
const statsRef = ref(null)

onMounted(() => {
  // Animations disabled for immediate visibility
  // All content is now visible by default
  console.log('HomeView mounted - animations disabled for testing')
})
</script>

<template>
  <div class="home-view">
    <!-- Premium Hero Section -->
    <section class="hero-premium">
      <div class="container">
        <div class="hero-content-wrapper">
          <div class="hero-text">
            <p class="hero-pretitle uppercase accent-color">Restauration événementielle</p>
            <h1 class="hero-title">
              <span class="hero-title-line">Excellence</span>
              <span class="hero-title-line">Opérationnelle.</span>
              <span class="hero-title-line accent-text">Sans Compromis.</span>
            </h1>
            <p class="hero-subtitle text-lg">
              Transformez vos événements en expériences mémorables avec une restauration 
              maîtrisée de bout en bout.
            </p>
            <p class="hero-description">
              Nous prenons le contrôle total : de la logistique au staff, en passant par l'encaissement. 
              Zéro contrainte pour vous, expérience exceptionnelle pour vos invités.
            </p>
            <div class="hero-actions">
              <RouterLink to="/contact" class="btn btn-primary btn-large hero-btn">Commencer</RouterLink>
              <RouterLink to="/offre" class="btn btn-secondary btn-large hero-btn">Découvrir</RouterLink>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-image-container">
              <img 
                src="https://picsum.photos/seed/premium-event/700/800" 
                alt="Fresh Events Excellence" 
                class="hero-image img-premium"
              />
              <div class="floating-accent">
                <span class="accent-number">100%</span>
                <span class="accent-label">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="stats-bar bg-primary" ref="statsRef">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number">500+</span>
            <span class="stat-label">Événements</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">100K+</span>
            <span class="stat-label">Convives Servis</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">15+</span>
            <span class="stat-label">Années d'Expertise</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">Clé en Main</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Proposition -->
    <section class="value-section section-padding-lg fade-in-section">
      <div class="container">
        <div class="grid-2">
          <div class="value-visual">
            <div class="img-container parallax-section">
              <img 
                src="https://picsum.photos/seed/excellence/700/500" 
                alt="Excellence opérationnelle" 
                class="img-premium parallax-img"
              />
            </div>
          </div>
          <div class="value-text">
            <p class="uppercase accent-color">Notre Promesse</p>
            <h2>Fiabilité & <br><span class="accent-text">Rentabilité</span></h2>
            <div class="accent-line"></div>
            <p class="text-lg">
              L'improvisation n'a pas sa place dans nos opérations. Fresh Events est votre 
              partenaire de confiance sur le terrain.
            </p>
            <p>
              Nous gérons l'intégralité de votre restauration événementielle : logistique, 
              équipement, personnel qualifié, encaissement sécurisé. Notre expertise transforme 
              un centre de coût en levier de satisfaction et de performance.
            </p>
            <ul class="premium-list">
              <li>Gestion opérationnelle complète</li>
              <li>Personnel formé et expérimenté</li>
              <li>Conformité HACCP garantie</li>
              <li>Modèle économique performant</li>
            </ul>
            <RouterLink to="/savoir-faire" class="btn btn-primary">Notre Expertise</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section section-padding bg-cream fade-in-section">
      <div class="container">
        <div class="section-header text-center">
          <p class="uppercase accent-color">Avantages</p>
          <h2>Pourquoi Fresh Events</h2>
          <div class="accent-line accent-line-center"></div>
        </div>
        <div class="benefits-grid grid-3">
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>Sérénité Absolue</h3>
            <p>
              Concentrez-vous sur votre événement. Nous gérons tout : du matériel au staff, 
              en passant par la conformité HACCP.
            </p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3>Gestion des Flux</h3>
            <p>
              De 500 à 5000 personnes, nos processus éprouvés absorbent les volumes 
              sans compromis sur la qualité.
            </p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3>Modèle Gagnant-Gagnant</h3>
            <p>
              Notre modèle à la performance transforme votre restauration en source 
              de revenus, pas en charge.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Large Visual Break -->
    <section class="visual-break parallax-section">
      <div class="visual-overlay"></div>
      <img 
        src="https://picsum.photos/seed/event-large/1600/600" 
        alt="Fresh Events en action" 
        class="parallax-img"
      />
      <div class="visual-content">
        <div class="container text-center">
          <h2 class="text-white">L'Excellence Opérationnelle à Chaque Détail</h2>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="partners-section section-padding-lg fade-in-section">
      <div class="container">
        <div class="section-header text-center">
          <p class="uppercase accent-color">Références</p>
          <h2>Ils Nous Font Confiance</h2>
          <div class="accent-line accent-line-center"></div>
        </div>
        <div class="partners-container">
          <a 
            v-for="partner in partners" 
            :key="partner.name" 
            :href="partner.url" 
            target="_blank" 
            rel="noopener" 
            class="partner-item"
          >
            <img :src="partner.logo" :alt="partner.name" class="partner-logo" />
          </a>
          <RouterLink to="/contact" class="partner-item partner-cta">
            <div class="cta-inner">
              <span class="cta-icon">+</span>
              <p class="cta-text">Rejoignez-nous</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section bg-primary section-padding-lg">
      <div class="container-narrow text-center">
        <h2 class="text-white">Prêt à Transformer Vos Événements ?</h2>
        <div class="accent-line accent-line-center" style="background: rgba(255,255,255,0.3);"></div>
        <p class="text-white text-lg" style="margin-bottom: 3rem;">
          Discutons de vos besoins et construisons ensemble une solution sur mesure.
        </p>
        <RouterLink to="/contact" class="btn btn-outline-white btn-large">Nous Contacter</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Premium Hero */
.hero-premium {
  padding: clamp(5rem, 12vw, 10rem) 0 clamp(4rem, 10vw, 8rem);
  background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-tertiary) 100%);
  position: relative;
  overflow: hidden;
}

.hero-content-wrapper {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(3rem, 6vw, 6rem);
  align-items: center;
}

.hero-text {
  max-width: 650px;
}

.hero-pretitle {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: inline-block;
}

.hero-title {
  margin-bottom: 2rem;
  line-height: 1.1;
}

.hero-title-line {
  display: block;
}

.hero-subtitle {
  color: var(--color-black);
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.hero-description {
  color: var(--color-black);
  opacity: 0.75;
  margin-bottom: 2.5rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.hero-image-container {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.hero-image {
  width: 100%;
  height: auto;
  display: block;
}

.floating-accent {
  position: absolute;
  bottom: 2rem;
  left: -1.5rem;
  background: var(--color-white);
  padding: 1.5rem 2rem;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border-left: 3px solid var(--color-accent);
}

.accent-number {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-accent);
  line-height: 1;
}

.accent-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-black);
  font-weight: 500;
}

/* Stats Bar */
.stats-bar {
  padding: clamp(3rem, 6vw, 4rem) 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 3rem;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 400;
  color: var(--color-white);
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.8);
}

/* Value Section */
.value-section {
  background: var(--color-white);
}

.value-text {
  padding: 2rem 0;
}

.value-text .uppercase {
  margin-bottom: 1rem;
}

.premium-list {
  list-style: none;
  margin: 2rem 0 2.5rem;
  padding: 0;
}

.premium-list li {
  padding: 0.75rem 0;
  padding-left: 2rem;
  position: relative;
}

.premium-list li::before {
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

/* Benefits Section */
.section-header {
  margin-bottom: 4rem;
}

.benefits-grid {
  margin-top: 3rem;
}

.benefit-card {
  background: var(--color-white);
  padding: 3rem 2rem;
  text-align: center;
  transition: all var(--transition-base);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-accent);
}

.benefit-icon {
  color: var(--color-accent);
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.benefit-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-black);
}

.benefit-card p {
  color: var(--color-black);
  opacity: 0.75;
  line-height: 1.7;
}

/* Visual Break */
.visual-break {
  position: relative;
  height: 500px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-break img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  object-fit: cover;
}

.visual-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(26, 58, 26, 0.85), rgba(74, 124, 89, 0.75));
  z-index: 1;
}

.visual-content {
  position: relative;
  z-index: 2;
}

/* Partners Section */
.partners-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.partner-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--color-white);
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all var(--transition-base);
  min-height: 140px;
  text-decoration: none;
}

.partner-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}

.partner-logo {
  max-width: 100%;
  height: auto;
  max-height: 80px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all var(--transition-base);
}

.partner-item:hover .partner-logo {
  filter: grayscale(0%);
  opacity: 1;
}

.partner-cta {
  background: var(--color-accent);
  border-color: var(--color-accent);
}

.partner-cta:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-white);
}

.cta-icon {
  font-size: 3rem;
  font-weight: 300;
  line-height: 1;
}

.cta-text {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
}

/* CTA Section */
.cta-section h2 {
  margin-bottom: 1.5rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-content-wrapper {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-text {
    max-width: 100%;
  }

  .hero-actions {
    justify-content: center;
  }

  .floating-accent {
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 768px) {
  .hero-visual {
    max-width: 400px;
    margin: 0 auto;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .visual-break {
    height: 350px;
  }

  .partners-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .hero-actions .btn {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
