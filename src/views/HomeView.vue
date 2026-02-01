<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-grid">
         <div class="hero-content">
            <h1 class="hero-title">
              La Food Event <br>
              <span class="highlight">Comme Personne.</span>
            </h1>
            <p class="subtitle accent-font">Restauration Événémentielle Maîtrisée de A à Z.</p>
            <p class="description">
              Transformez la restauration de vos événements en un levier de satisfaction et de rentabilité. 
              Gestion clé en main, agile et fiable pour les organisateurs qui n'ont pas peur de la réussite.
            </p>
            <div class="hero-actions">
              <RouterLink to="/contact" class="btn btn-primary">Démarrer</RouterLink>
              <RouterLink to="/offre" class="btn btn-outline-white">Voir les Solutions</RouterLink>
            </div>
         </div>
         <div class="hero-visual">
            <img src="https://placehold.co/600x700/fff6d0/000?text=FRESH+VIBES" alt="Fresh Events Team" class="brutalist-img main-img" />
            <div class="floating-badge">
              <span>ZÉRO</span><br>STRESS
            </div>
         </div>
      </div>
    </section>

    <!-- Value Proposition -->
    <section class="value-prop section-padding">
      <div class="container">
        <div class="grid-2">
           <div class="visual-col">
              <img src="https://placehold.co/600x400/fff/000?text=GESTION+DE+FOULE" alt="Crowd" class="brutalist-img" />
           </div>
           <div class="text-col">
              <h2 class="section-title">Fiabilité Opérationnelle & <span class="highlight-text">Rentabilité</span></h2>
              <p class="intro-text">
                L’improvisation ? Pas chez nous. Fresh Events est votre partenaire terrain. 
                Nous prenons le contrôle total : logistique, staff, encaissement. 
              </p>
              <p class="intro-text"><strong>Promesse simple :</strong> Zéro contrainte pour vous, expérience incroyable pour eux.</p>
           </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="benefits section-padding">
      <div class="container">
        <h2 class="text-center">Pourquoi Nous ?</h2>
        <div class="grid-3">
          <div class="benefit-card">
            <div class="icon">🧘‍♂️</div>
            <h3>Sérénité Absolue</h3>
            <p>On gère tout. Staff, matos, HACCP. Vous ? Vous profitez du spectacle.</p>
          </div>
          <div class="benefit-card">
            <div class="icon">🚀</div>
            <h3>Flux Massifs</h3>
            <p>500 ou 5000 personnes ? Nos process avalent les files d'attente.</p>
          </div>
          <div class="benefit-card">
            <div class="icon">💸</div>
            <h3>Gagnant-Gagnant</h3>
            <p>Modèle à la performance. Transformez un centre de coût en centre de profit.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof -->
    <section class="social-proof section-padding">
      <div class="container text-center">
        <h2>Ils nous font <span class="accent-font">super</span> confiance</h2>
        
        <div class="partners-grid-funky">
          <img src="/logos/partners/amneville.png" alt="Zoo d’Amnéville" class="partner-logo rotate-left" />
          <img src="/logos/partners/arcelor-mittal.png" alt="Arcelor Mittal" class="partner-logo rotate-right" />
          <img src="/logos/partners/casino.png" alt="Seven Casino" class="partner-logo rotate-left" />
          <img src="/logos/partners/golden-tulip.png" alt="Golden Tulip" class="partner-logo rotate-right" />
          <img src="/logos/partners/galaxie.png" alt="Le Galaxie" class="partner-logo rotate-left" style="background-color: var(--color-black);" />
          <img src="/logos/partners/moselle.png" alt="Moselle" class="partner-logo rotate-right" />
          <img src="/logos/partners/grdf.png" alt="GRDF" class="partner-logo rotate-left" />
          <img src="/logos/partners/france-judo.png" alt="France Judo" class="partner-logo rotate-right" />
        </div>

        <div class="img-strip mt-5">
           <img src="https://placehold.co/300x200/fff/000?text=Event+1" class="brutalist-img small" />
           <img src="https://placehold.co/300x200/fff6d0/000?text=Event+2" class="brutalist-img small" />
           <img src="https://placehold.co/300x200/fff/000?text=Event+3" class="brutalist-img small" />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section bg-primary text-center section-padding">
      <div class="container">
        <h2 class="text-white">Prêt à passer au niveau supérieur ?</h2>
        <p class="text-white mb-4">Discutons de vos enjeux et construisons la solution adaptée.</p>
        <RouterLink to="/contact" class="btn btn-outline-white big-btn">ON Y VA</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background-color: var(--color-black);
  color: var(--color-white);
  padding: 80px 0;
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 50px;
}

.hero-title {
  font-size: 5rem;
  line-height: 0.9;
  margin-bottom: 20px;
}

.highlight {
  color: var(--color-primary);
  -webkit-text-stroke: 2px var(--color-white); /* Outline effect */
  text-shadow: 4px 4px 0px var(--color-primary);
}

.subtitle {
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--color-secondary);
  transform: rotate(-2deg);
  display: inline-block;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 40px;
  max-width: 90%;
}

.hero-actions {
  display: flex;
  gap: 20px;
}

.hero-visual {
  position: relative;
}

.main-img {
  transform: rotate(3deg);
  border-color: var(--color-white) !important;
}

.floating-badge {
  position: absolute;
  bottom: -30px;
  left: -30px;
  background: var(--color-secondary);
  color: var(--color-black);
  padding: 20px;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  line-height: 1;
  border: 3px solid var(--color-black);
  box-shadow: 5px 5px 0px var(--color-black);
  transform: rotate(-5deg);
  text-align: center;
}

.highlight-text {
  background: var(--color-secondary);
  padding: 0 10px;
}

.benefit-card {
  background: var(--color-black);
  border: 3px solid var(--color-white);
  padding: 40px 30px;
  color: var(--color-white);
  text-align: center;
  transition: transform 0.3s;
}

.benefit-card:hover {
  background: var(--color-primary);
  border-color: var(--color-black);
  color: var(--color-white);
  transform: scale(1.05);
}

.benefit-card h3 {
  color: var(--color-white);
  margin: 20px 0;
}

.benefit-card .icon {
  font-size: 4rem;
}

.bg-dark-title {
  color: var(--color-white);
}

.partners-grid-funky {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.partner-logo {
  height: 140px;
  width: auto;
  border: 3px solid var(--color-black);
  box-shadow: 4px 4px 0px var(--color-primary);
  background: white;
  padding: 15px;
  object-fit: contain;
  transition: transform 0.3s;
}

.partner-logo:hover {
    transform: scale(1.1) rotate(0deg) !important;
    z-index: 10;
}

.rotate-left { transform: rotate(-3deg); }
.rotate-right { transform: rotate(3deg); }

.img-strip {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 60px;
  flex-wrap: wrap;
}

.small {
  max-width: 300px;
  height: 200px;
  object-fit: cover;
}

.text-white { color: var(--color-white) !important; }
.mb-4 { margin-bottom: 2rem; }
.big-btn { font-size: 1.5rem; padding: 20px 50px; }

@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; text-align: center; }
  .hero-title { font-size: 3.5rem; }
  .hero-actions { justify-content: center; }
  .hero-visual { display: none; } /* Hide visual on mobile for simplicity or adjust */
}
</style>
