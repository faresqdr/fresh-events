<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const partners = [
  { name: 'Arcelor Mittal', logo: '/logos/partners/arcelor-mittal.png', url: 'https://www.arcelormittal.com' },
  { name: 'Seven Casino', logo: '/logos/partners/casino.png', url: 'https://www.seven-casino.com' },
  { name: 'Golden Tulip', logo: '/logos/partners/golden-tulip.png', url: 'https://www.goldentulip.com' },
  { name: 'Le Galaxie', logo: '/logos/partners/galaxie.png', url: 'https://www.le-galaxie.com'},
  { name: 'Moselle', logo: '/logos/partners/moselle.png', url: 'https://www.moselle.fr' },
  { name: 'GRDF', logo: '/logos/partners/grdf.png', url: 'https://www.grdf.fr' },
  { name: 'France Judo', logo: '/logos/partners/france-judo.png', url: 'https://www.ffjudo.com' },
  { name: 'Socotec', logo: '/logos/partners/socotec.png', url: 'https://www.socotec.fr' },
  { name: 'Équatour', logo: '/logos/partners/equatour.png', url: 'https://www.equatour.fr' },
  { name: 'Renault', logo: '/logos/partners/renault.png', url: 'https://www.renault.fr' },
  { name: 'Séminaire Amnéville', logo: '/logos/partners/seminaire-amneville.png', url: 'https://www.seminaire-amneville.com' },
  { name: 'Car Avenue', logo: '/logos/partners/peugeot.png', url: 'https://concessions.peugeot.fr/yutz/' },
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
            <p class="hero-pretitle uppercase accent-color">Traiteur événementiel · Moselle · Luxembourg</p>
            <h1 class="hero-title">
              <span class="hero-title-line">Excellence</span>
              <span class="hero-title-line">Opérationnelle.</span>
              <span class="hero-title-line accent-text">Sans Compromis.</span>
            </h1>
            <p class="hero-subtitle text-lg">
              Séminaire, mariage, cocktail, festival — obtenez votre prix en temps réel
              et recevez un devis personnalisé <strong style="color:var(--color-accent)">sous 24h</strong>.
            </p>
            <div class="hero-devis-strip">
              <span class="hero-devis-tag">✓ Gratuit</span>
              <span class="hero-devis-tag">✓ Sans engagement</span>
              <span class="hero-devis-tag">✓ Prix HT & TTC instantanés</span>
            </div>
            <div class="hero-actions">
              <RouterLink to="/devis" class="btn btn-accent btn-large hero-btn hero-btn--primary">Créer mon devis →</RouterLink>
              <RouterLink to="/offre" class="btn btn-secondary btn-large hero-btn">Découvrir</RouterLink>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=700&h=800&q=80"
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
            <span class="stat-number">Sur mesure</span>
            <span class="stat-label">Événements professionnels</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">Service fluide</span>
            <span class="stat-label">Expérience convive</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">11 ans</span>
            <span class="stat-label">Années d'Expertise</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">Clé en main</span>
            <span class="stat-label">Accompagnement complet</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Devis en ligne — section mise en avant -->
    <section class="devis-cta-section">
      <div class="container">
        <div class="devis-cta-inner">
          <div class="devis-cta-text">
            <p class="devis-cta-eyebrow">Moselle · Grand Est · Luxembourg</p>
            <h2 class="devis-cta-title">Votre devis traiteur<br><span class="accent-text">en 4 minutes chrono</span></h2>
            <p class="devis-cta-sub">
              Séminaire, cocktail, mariage, anniversaire, festival — composez votre menu,
              choisissez vos prestations et obtenez le prix <strong>HT et TTC en temps réel</strong>.
              Moselle, Grand Est et Grand-Duché de Luxembourg. Notre équipe vous répond sous 24h.
            </p>
            <div class="devis-cta-pills">
              <span class="devis-pill">💼 Séminaire</span>
              <span class="devis-pill">🥂 Cocktail</span>
              <span class="devis-pill">💐 Mariage</span>
              <span class="devis-pill">🎉 Anniversaire</span>
              <span class="devis-pill">🎪 Festival</span>
            </div>
          </div>
          <div class="devis-cta-card">
            <div class="devis-card-steps">
              <div class="devis-step"><span class="devis-step-num">1</span><span>Type d'événement</span></div>
              <div class="devis-step"><span class="devis-step-num">2</span><span>Date, lieu &amp; convives</span></div>
              <div class="devis-step"><span class="devis-step-num">3</span><span>Formule ou menu libre</span></div>
              <div class="devis-step"><span class="devis-step-num">4</span><span>Vos coordonnées</span></div>
            </div>
            <div class="devis-card-price-preview">
              <span class="devis-price-label">Prix affichés en temps réel</span>
              <span class="devis-price-example">à partir de <strong>4,50 €</strong> TTC / pers.</span>
            </div>
            <RouterLink to="/devis" class="btn btn-primary btn-large devis-card-btn">
              Créer mon devis gratuit →
            </RouterLink>
            <p class="devis-card-note">Gratuit · Sans engagement · Réponse sous 24h</p>
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
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&h=500&q=80"
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
              Nos processus éprouvés absorbent les volumes 
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
        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&h=600&q=80"
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
        <h2 class="text-white">Un événement en Moselle, Grand Est ou au Luxembourg ?</h2>
        <div class="accent-line accent-line-center" style="background: rgba(255,255,255,0.3);"></div>
        <p class="text-white text-lg" style="margin-bottom: 1.5rem;">
          Obtenez une estimation de prix <strong>en temps réel</strong> — composez votre menu
          et recevez un devis personnalisé sous 24h.
        </p>
        <p class="text-white" style="margin-bottom: 3rem; opacity: 0.8; font-size: 0.95rem;">
          Amnéville · Metz · Thionville · Nancy · Luxembourg-Ville · Esch-sur-Alzette
        </p>
        <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
          <RouterLink to="/devis" class="btn btn-outline-white btn-large">Faire mon devis en ligne →</RouterLink>
          <RouterLink to="/contact" class="btn btn-outline-white btn-large" style="opacity:0.7">Nous contacter</RouterLink>
        </div>
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

/* Devis strip sous le subtitle */
.hero-devis-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0 1.75rem;
}
.hero-devis-tag {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-primary);
  background: rgba(74,124,89,0.1);
  border: 1px solid rgba(74,124,89,0.2);
  padding: 0.3rem 0.75rem;
}

/* Bouton devis accent */
.btn-accent {
  background: var(--color-accent);
  color: #fff;
  border: 2px solid var(--color-accent);
}
.btn-accent:hover { background: var(--color-primary); border-color: var(--color-primary); }

.hero-btn--primary {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  box-shadow: 0 4px 18px rgba(74,124,89,0.35);
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

/* ── Section devis en ligne ────────────────────────────────────────────────── */
.devis-cta-section {
  background: linear-gradient(135deg, var(--color-primary) 0%, #1a4a2a 100%);
  padding: clamp(3.5rem, 8vw, 6rem) 0;
}

.devis-cta-inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(2.5rem, 5vw, 5rem);
  align-items: center;
}

.devis-cta-eyebrow {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.6);
  margin-bottom: 1rem;
}

.devis-cta-title {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  color: var(--color-white);
  line-height: 1.15;
  margin-bottom: 1.25rem;
}

.devis-cta-sub {
  color: rgba(255,255,255,0.82);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 1.75rem;
}

.devis-cta-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.devis-pill {
  font-size: 0.8rem;
  background: rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 0.35rem 0.85rem;
  white-space: nowrap;
}

.devis-cta-card {
  background: var(--color-white);
  padding: 2.25rem 2rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
}

.devis-card-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
}

.devis-step {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 0.9rem;
  color: var(--color-black);
}

.devis-step-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-white);
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.devis-card-price-preview {
  background: var(--color-secondary);
  border-left: 3px solid var(--color-accent);
  padding: 0.85rem 1.1rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.devis-price-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  opacity: 0.55;
  font-weight: 600;
}

.devis-price-example {
  font-size: 1rem;
  color: var(--color-primary);
}

.devis-price-example strong {
  font-size: 1.25rem;
  color: var(--color-accent);
}

.devis-card-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  padding: 1rem 1.5rem;
}

.devis-card-note {
  text-align: center;
  font-size: 0.77rem;
  opacity: 0.45;
  margin-top: 0.85rem;
}

@media (max-width: 900px) {
  .devis-cta-inner { grid-template-columns: 1fr; }
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
