<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // Animations disabled for immediate visibility
  console.log('ExpertiseView mounted - animations disabled for testing')
})
</script>

<template>
  <div class="expertise-view">
    <!-- Hero -->
    <section class="hero-section bg-primary">
      <div class="container text-center">
        <p class="uppercase" style="color: rgba(255,255,255,0.8); font-size: 0.85rem; letter-spacing: 0.15em; margin-bottom: 1.5rem;">Savoir-Faire</p>
        <h1 class="text-white"><span class="accent-text">15 Années</span> <br>d'Excellence Opérationnelle</h1>
        <div class="accent-line accent-line-center" style="background: rgba(255,255,255,0.3); margin: 2rem auto;"></div>
        <p class="text-lg text-white" style="max-width: 700px; margin: 0 auto; opacity: 0.9;">
          Fiabilité industrielle et attention artisanale. Notre expertise transforme 
          chaque événement en réussite mémorable.
        </p>
      </div>
    </section>

    <!-- Key Numbers -->
    <section class="numbers-section section-padding-lg bg-white">
      <div class="container">
        <div class="xp-grid grid-3">
          <div class="xp-card">
            <div class="xp-number accent-color">15+</div>
            <h3>Années d'Expérience</h3>
            <p>Une expertise éprouvée sur tous types d'événements et de volumes.</p>
          </div>
          <div class="xp-card">
            <div class="xp-number accent-color">100%</div>
            <h3>Conformité HACCP</h3>
            <p>Respect absolu des normes sanitaires et de traçabilité alimentaire.</p>
          </div>
          <div class="xp-card">
            <div class="xp-number accent-color">24/7</div>
            <h3>Support Terrain</h3>
            <p>Disponibilité et réactivité permanentes pour vos événements.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Culture Produit -->
    <section class="culture-section section-padding bg-cream">
      <div class="container">
        <div class="grid-2">
          <div class="culture-content">
            <p class="uppercase accent-color">Notre Engagement</p>
            <h2>Culture du Produit</h2>
            <div class="accent-line"></div>
            <p class="text-lg">
              Sourcing qualitatif, produits frais, emballages éco-responsables. 
              La conscience écologique et la qualité ne sont pas des options, 
              mais le fondement de notre approche.
            </p>
            <ul class="premium-list" style="margin-top: 2rem;">
              <li><strong>Options Végétariennes :</strong> Offres adaptées à tous les régimes</li>
              <li><strong>Zéro Plastique :</strong> Emballages 100% éco-responsables</li>
              <li><strong>Producteurs Locaux :</strong> Circuit court et qualité garantie</li>
              <li><strong>Traçabilité Complète :</strong> De la source à l'assiette</li>
            </ul>
          </div>
          <div class="culture-visual">
            <div class="img-container">
              <img src="https://picsum.photos/seed/food-kitchen/700/600" alt="Cuisine professionnelle" class="img-premium" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Processus -->
    <section class="process-section section-padding-lg">
      <div class="container-narrow text-center">
        <p class="uppercase accent-color">Notre Méthode</p>
        <h2>Processus Éprouvé</h2>
        <div class="accent-line accent-line-center"></div>
        <p class="text-lg" style="margin: 2rem auto; max-width: 600px;">
          Chaque événement suit une méthodologie rigoureuse garantissant 
          excellence et tranquillité d'esprit.
        </p>

        <div class="process-steps">
          <div class="process-step">
            <div class="step-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4>Analyse</h4>
            <p>Audit de vos besoins et contraintes spécifiques</p>
          </div>
          <div class="process-connector"></div>
          <div class="process-step">
            <div class="step-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h4>Planification</h4>
            <p>Conception détaillée et validation du projet</p>
          </div>
          <div class="process-connector"></div>
          <div class="process-step">
            <div class="step-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4>Exécution</h4>
            <p>Mise en œuvre terrain avec excellence opérationnelle</p>
          </div>
          <div class="process-connector"></div>
          <div class="process-step">
            <div class="step-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4>Suivi</h4>
            <p>Reporting et amélioration continue</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section bg-primary section-padding">
      <div class="container text-center">
        <h3 class="text-white" style="font-size: clamp(1.75rem, 4vw, 2.5rem); margin-bottom: 1.5rem;">
          Prêt à bénéficier de notre expertise ?
        </h3>
        <p class="text-white" style="opacity: 0.9; margin-bottom: 2rem;">
          Découvrez nos solutions adaptées à votre type d'événement.
        </p>
        <RouterLink to="/solutions" class="btn btn-outline-white btn-large">Nos Solutions</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  padding: clamp(6rem, 15vw, 10rem) 0;
}

/* XP Cards */
.xp-grid {
  margin-top: 2rem;
}

.xp-card {
  background: var(--color-white);
  padding: 3rem 2rem;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all var(--transition-base);
}

.xp-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-accent);
}

.xp-number {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 6vw, 4rem);
  font-weight: 400;
  line-height: 1;
  display: block;
  margin-bottom: 1rem;
}

.xp-card h3 {
  font-size: 1.35rem;
  margin-bottom: 1rem;
  color: var(--color-black);
}

.xp-card p {
  color: var(--color-black);
  opacity: 0.75;
  line-height: 1.7;
}

/* Culture Section */
.culture-content {
  padding: 2rem 0;
}

.premium-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.premium-list li {
  padding: 0.75rem 0;
  padding-left: 2rem;
  position: relative;
  color: var(--color-black);
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

/* Process Section */
.process-steps {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  margin-top: 4rem;
  flex-wrap: wrap;
}

.process-step {
  flex: 0 1 200px;
  text-align: center;
}

.step-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  color: var(--color-accent);
  transition: all var(--transition-base);
}

.process-step:hover .step-icon {
  background: var(--color-accent);
  color: var(--color-white);
  transform: scale(1.1);
}

.process-step h4 {
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--color-black);
}

.process-step p {
  font-size: 0.9rem;
  color: var(--color-black);
  opacity: 0.7;
}

.process-connector {
  flex: 0 0 40px;
  height: 2px;
  background: var(--color-accent);
  opacity: 0.3;
  align-self: center;
  margin-top: -2rem;
}

@media (max-width: 1024px) {
  .process-steps {
    flex-direction: column;
    align-items: center;
  }

  .process-connector {
    width: 2px;
    height: 40px;
    flex: 0 0 40px;
    margin-top: 0;
  }
}

@media (max-width: 768px) {
  .xp-grid {
    grid-template-columns: 1fr;
  }
}
</style>
