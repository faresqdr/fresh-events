<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // Animations disabled for immediate visibility
  console.log('OfferView mounted - animations disabled for testing')
})
</script>

<template>
  <div class="offer-view">
    <!-- Hero Section -->
    <section class="hero-section bg-primary">
      <div class="container text-center">
        <p class="uppercase" style="color: rgba(255,255,255,0.8); font-size: 0.85rem; letter-spacing: 0.15em; margin-bottom: 1.5rem;">Notre Offre</p>
        <h1 class="text-white">Vous Organisez. <br><span class="accent-text">Nous Gérons.</span></h1>
        <div class="accent-line accent-line-center" style="background: rgba(255,255,255,0.3); margin: 2rem auto;"></div>
        <p class="text-lg text-white" style="max-width: 700px; margin: 0 auto; opacity: 0.9;">
          L'externalisation complète de votre restauration événementielle. 
          Un partenaire unique, une solution totale.
        </p>
      </div>
    </section>

    <!-- Pillars Section -->
    <section class="pillars-section section-padding-lg">
      <div class="container">
        <div class="section-header text-center">
          <p class="uppercase accent-color">Nos Piliers</p>
          <h2>Une Approche 360°</h2>
          <div class="accent-line accent-line-center"></div>
        </div>

        <div class="pillars-grid grid-3">
          <div class="pillar-card">
            <span class="pillar-number">01</span>
            <h3>Opérations & Logistique</h3>
            <p>
              Recrutement et formation du personnel, approvisionnement en flux tendu, 
              montage et démontage des structures. Chaque détail est maîtrisé.
            </p>
            <div class="pillar-features">
              <span class="feature-tag">Personnel formé</span>
              <span class="feature-tag">Logistique optimisée</span>
              <span class="feature-tag">Installation complète</span>
            </div>
          </div>

          <div class="pillar-card">
            <span class="pillar-number">02</span>
            <h3>Sécurité & Conformité</h3>
            <p>
              Traçabilité alimentaire complète, respect strict des normes HACCP, 
              gestion responsable des déchets. La sécurité sanitaire est notre priorité absolue.
            </p>
            <div class="pillar-features">
              <span class="feature-tag">Normes HACCP</span>
              <span class="feature-tag">Traçabilité totale</span>
              <span class="feature-tag">Gestion déchets</span>
            </div>
          </div>

          <div class="pillar-card">
            <span class="pillar-number">03</span>
            <h3>Expérience Client</h3>
            <p>
              Files d'attente optimisées, paiement rapide et sécurisé, service attentionné. 
              Nous transformons chaque visite en expérience positive.
            </p>
            <div class="pillar-features">
              <span class="feature-tag">Flux optimisés</span>
              <span class="feature-tag">Service premium</span>
              <span class="feature-tag">Satisfaction garantie</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Economic Model Section -->
    <section class="model-section section-padding bg-cream">
      <div class="container-narrow">
        <div class="model-card">
          <div class="text-center">
            <p class="uppercase accent-color">Modèle Économique</p>
            <h2>Performance Sans Risque</h2>
            <div class="accent-line accent-line-center"></div>
            <p class="text-lg" style="max-width: 600px; margin: 2rem auto;">
              Oubliez les investissements lourds et les risques opérationnels. 
              Fresh Events propose un partenariat basé sur la performance.
            </p>
          </div>

          <div class="model-grid">
            <div class="model-point">
              <span class="model-number accent-color">0€</span>
              <h3>Investissement Initial</h3>
              <p>Aucun investissement requis de votre part</p>
            </div>
            <div class="model-point">
              <span class="model-number accent-color">0%</span>
              <h3>Risque Opérationnel</h3>
              <p>Nous assumons l'intégralité des risques</p>
            </div>
            <div class="model-point">
              <span class="model-number accent-color">100%</span>
              <h3>Transparence</h3>
              <p>Reporting complet et suivi en temps réel</p>
            </div>
          </div>

          <div class="model-description">
            <h4>Modèles de partenariat</h4>
            <ul class="premium-list">
              <li><strong>Redevance sur CA :</strong> Partage équitable des revenus générés</li>
              <li><strong>Gestion déléguée :</strong> Nous gérons, vous profitez</li>
              <li><strong>Solutions hybrides :</strong> Sur mesure selon vos besoins</li>
            </ul>
          </div>

          <div class="text-center" style="margin-top: 3rem;">
            <RouterLink to="/contact" class="btn btn-primary btn-large">Discutons de Votre Projet</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-mini bg-primary section-padding">
      <div class="container text-center">
        <h3 class="text-white" style="font-size: clamp(1.75rem, 4vw, 2.5rem); margin-bottom: 1.5rem;">
          Prêt à externaliser votre restauration ?
        </h3>
        <p class="text-white" style="opacity: 0.9; margin-bottom: 2rem;">
          Contactez-nous pour une étude personnalisée de vos besoins.
        </p>
        <RouterLink to="/contact" class="btn btn-outline-white btn-large">Nous Contacter</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  padding: clamp(6rem, 15vw, 10rem) 0;
}

/* Pillars */
.pillars-section {
  background: var(--color-white);
}

.pillars-grid {
  margin-top: 4rem;
}

.pillar-card {
  background: var(--color-white);
  padding: 3rem 2.5rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all var(--transition-base);
  position: relative;
}

.pillar-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-accent);
}

.pillar-number {
  font-family: var(--font-heading);
  font-size: 3rem;
  color: var(--color-accent);
  opacity: 0.15;
  font-weight: 300;
  line-height: 1;
  display: block;
  margin-bottom: 1rem;
}

.pillar-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
  color: var(--color-black);
}

.pillar-card p {
  color: var(--color-black);
  opacity: 0.75;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.pillar-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.feature-tag {
  font-size: 0.8rem;
  padding: 0.4rem 0.9rem;
  background: var(--color-secondary);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  color: var(--color-black);
}

/* Economic Model */
.model-card {
  background: var(--color-white);
  padding: clamp(3rem, 6vw, 5rem);
  box-shadow: var(--shadow-lg);
}

.model-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin: 4rem 0;
  padding: 3rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.model-point {
  text-align: center;
}

.model-number {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 400;
  line-height: 1;
  display: block;
  margin-bottom: 1rem;
}

.model-point h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--color-black);
}

.model-point p {
  color: var(--color-black);
  opacity: 0.7;
  font-size: 0.95rem;
}

.model-description {
  background: var(--color-secondary);
  padding: 2.5rem;
  border-radius: 4px;
}

.model-description h4 {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  margin-bottom: 1.5rem;
  color: var(--color-black);
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

/* Responsive */
@media (max-width: 768px) {
  .model-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .pillars-grid {
    grid-template-columns: 1fr;
  }
}
</style>
