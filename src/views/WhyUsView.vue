<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // Animations disabled for immediate visibility
  console.log('WhyUsView mounted - animations disabled for testing')
})
</script>

<template>
  <div class="why-us-view">
    <!-- Hero Section -->
    <section class="hero-section bg-primary">
      <div class="container text-center hero-content">
        <p class="uppercase" style="color: rgba(255,255,255,0.8); font-size: 0.85rem; letter-spacing: 0.15em; margin-bottom: 1.5rem;">Pourquoi Fresh Events</p>
        <h1 class="text-white">L'Excellence <br>par la <span class="accent-text">Passion</span></h1>
        <div class="accent-line accent-line-center" style="background: rgba(255,255,255,0.3); margin: 2rem auto;"></div>
        <p class="text-lg text-white" style="max-width: 700px; margin: 0 auto; opacity: 0.9;">
          Ni groupe impersonnel, ni amateur isolé. Nous sommes le partenaire événementiel 
          qui allie expertise professionnelle et engagement personnel.
        </p>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section section-padding-lg">
      <div class="container">
        <div class="feature-row">
          <div class="feature-visual">
            <div class="img-container">
              <img src="https://picsum.photos/seed/teamwork/600/500" alt="Équipe professionnelle" class="img-premium" />
            </div>
          </div>
          <div class="feature-content">
            <span class="feature-number">01</span>
            <h2>Fiabilité Humaine</h2>
            <div class="accent-line"></div>
            <p class="text-lg">
              Pas de sous-traitance opaque. Nos responsables sont présents sur le terrain, 
              coordonnent chaque détail et assurent une qualité constante.
            </p>
            <ul class="feature-list">
              <li>Équipe dédiée et formée</li>
              <li>Responsables sur site</li>
              <li>Communication en temps réel</li>
            </ul>
          </div>
        </div>

        <div class="feature-row reverse">
          <div class="feature-visual">
            <div class="img-container">
              <img src="https://picsum.photos/seed/fast-action/600/500" alt="Gestion des flux" class="img-premium" />
            </div>
          </div>
          <div class="feature-content">
            <span class="feature-number">02</span>
            <h2>Maîtrise des Flux</h2>
            <div class="accent-line"></div>
            <p class="text-lg">
              Notre expertise opérationnelle transforme les fortes affluences 
              en routine parfaitement orchestrée.
            </p>
            <ul class="feature-list">
              <li>Processus optimisés</li>
              <li>Gestion des pics d'affluence</li>
              <li>Réduction des temps d'attente</li>
            </ul>
          </div>
        </div>

        <div class="feature-row">
          <div class="feature-visual">
            <div class="img-container">
              <img src="https://picsum.photos/seed/flexibility/600/500" alt="Adaptabilité" class="img-premium" />
            </div>
          </div>
          <div class="feature-content">
            <span class="feature-number">03</span>
            <h2>Agilité Totale</h2>
            <div class="accent-line"></div>
            <p class="text-lg">
              Conditions météo difficiles ? Affluence record ? Notre capacité d'adaptation 
              en temps réel garantit le succès dans toutes les situations.
            </p>
            <ul class="feature-list">
              <li>Plans de contingence</li>
              <li>Ressources modulables</li>
              <li>Solutions instantanées</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote Section -->
    <section class="quote-section bg-accent section-padding">
      <div class="container text-center">
        <blockquote class="premium-quote">
          <p class="quote-text text-white">
            "Notre métier : transformer chaque contrainte en opportunité, <br>
            chaque événement en expérience mémorable."
          </p>
          <cite class="text-white" style="opacity: 0.8; font-size: 0.9rem; font-style: normal;">— L'équipe Fresh Events</cite>
        </blockquote>
        <RouterLink to="/contact" class="btn btn-outline-white btn-large" style="margin-top: 3rem;">Rencontrons-nous</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  padding: clamp(6rem, 15vw, 10rem) 0;
}

.hero-content h1 {
  margin-bottom: 2rem;
}

/* Features */
.feature-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(3rem, 6vw, 6rem);
  align-items: center;
  margin-bottom: clamp(6rem, 12vw, 10rem);
}

.feature-row.reverse {
  direction: rtl;
}

.feature-row.reverse > * {
  direction: ltr;
}

.feature-number {
  font-family: var(--font-heading);
  font-size: 4rem;
  color: var(--color-accent);
  opacity: 0.2;
  font-weight: 300;
  line-height: 1;
  display: block;
  margin-bottom: 1rem;
}

.feature-content h2 {
  margin-bottom: 1.5rem;
}

.feature-list {
  list-style: none;
  margin: 2rem 0;
  padding: 0;
}

.feature-list li {
  padding: 0.75rem 0;
  padding-left: 2rem;
  position: relative;
  color: var(--color-black);
  opacity: 0.85;
}

.feature-list li::before {
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

/* Quote */
.premium-quote {
  margin: 0;
  padding: 0;
  border: none;
}

.quote-text {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 1.5rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .feature-row,
  .feature-row.reverse {
    grid-template-columns: 1fr;
    direction: ltr;
  }

  .feature-number {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .quote-text {
    font-size: 1.35rem;
  }
}
</style>
