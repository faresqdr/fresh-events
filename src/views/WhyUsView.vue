<template>
  <div class="why-us-view">
    <section class="page-header bg-primary-block">
      <div class="container text-center">
        <h1>Pourquoi Nous ? <span class="highlight">La Passion.</span></h1>
        <p class="subtitle accent-font">Ni groupe impersonnel, ni amateur isolé. Le juste équilibre.</p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        
        <div class="feature-row">
          <div class="feature-image">
             <img src="https://picsum.photos/seed/teamwork/500/400" class="brutalist-img rotate-left" />
          </div>
          <div class="feature-text">
            <h3>Fiabilité Humaine</h3>
            <p>Pas de sous-traitance obscure. Nos responsables sont sur le terrain, talkie à la main, yeux partout.</p>
            <span class="tag">REAL PEOPLE</span>
          </div>
        </div>

        <div class="feature-row reverse">
          <div class="feature-image">
             <img src="https://picsum.photos/seed/fast-action/500/400" class="brutalist-img rotate-right" />
          </div>
          <div class="feature-text">
            <h3>Maîtrise des Flux</h3>
            <p>Servir 5000 personnes en 1h ? Challenge accepted. Nos process sont militaires pour réduire l'attente.</p>
            <span class="tag">FAST SERVICE</span>
          </div>
        </div>

        <div class="feature-row">
          <div class="feature-image">
             <img src="https://picsum.photos/seed/flexibility/500/400" class="brutalist-img rotate-left" />
          </div>
          <div class="feature-text">
            <h3>Agilité Totale</h3>
            <p>Pluie torrentielle ? Affluence record ? On s'adapte en temps réel. Pas d'excuses, que des solutions.</p>
            <span class="tag">NO EXCUSES</span>
          </div>
        </div>

      </div>
    </section>
    
    <section class="quote-section bg-primary text-center">
        <div class="container">
            <h2 class="quote-text">"Notre métier, c'est de transformer la faim en sourire."</h2>
            <RouterLink to="/contact" class="btn btn-outline-white mt-5">Meet the team</RouterLink>
        </div>
    </section>
  </div>
</template>

<style scoped>
.page-header {
  padding: 80px 0;
  border-bottom: 5px solid var(--color-primary);
}

.highlight { color: var(--color-primary); }

.subtitle {
  color: var(--color-secondary);
  font-size: 1.5rem;
}

.feature-row {
  display: flex;
  align-items: center;
  gap: 60px;
  margin-bottom: 100px;
}

.feature-row.reverse {
  flex-direction: row-reverse;
}

.feature-text { flex: 1; }
.feature-image { flex: 1; }

.brutalist-img {
    border: 3px solid var(--color-black);
    box-shadow: 8px 8px 0px var(--color-black);
}

.rotate-left { transform: rotate(-2deg); }
.rotate-right { transform: rotate(2deg); }

.tag {
    background: var(--color-black);
    color: var(--color-primary);
    padding: 5px 10px;
    font-weight: bold;
    font-family: var(--font-heading);
    margin-top: 15px;
    display: inline-block;
    transform: rotate(-1deg);
}

.quote-section {
    padding: 100px 0;
    color: var(--color-white);
}

.quote-text {
    font-family: var(--font-recoleta);
    font-size: 3rem;
    color: var(--color-white);
    text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.5), -2px -2px 0px rgba(255, 255, 255, 0.3);
}

@media (max-width: 900px) {
    .feature-row, .feature-row.reverse {
        flex-direction: column;
        text-align: center;
    }
}
</style>
