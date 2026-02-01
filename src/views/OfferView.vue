<template>
  <div class="offer-view">
    <section class="page-header bg-primary-block">
      <div class="container text-center">
        <h1 class="big-title">On gère. <span class="highlight-stroke">Vous soufflez.</span></h1>
        <p class="subtitle">L'externalisation totale comme levier de performance.</p>
      </div>
    </section>

    <section class="pillars section-padding">
      <div class="container">
        <div class="grid-3">
          <div class="pillar-card rotate-1">
            <div class="card-header">01</div>
            <h3>Ops & Logistics</h3>
            <p>On gère le recrutement, la formation, l'approvisionnement flux tendu et le montage des structures.</p>
            <div class="sticker">DONE</div>
          </div>
          <div class="pillar-card rotate-2">
            <div class="card-header">02</div>
            <h3>Safety First</h3>
            <p>Traçabilité, normes HACCP, gestion des déchets. Pas de blague avec l'hygiène.</p>
            <div class="sticker">SAFE</div>
          </div>
          <div class="pillar-card rotate-1">
            <div class="card-header">03</div>
            <h3>User Experience</h3>
            <p>Files d'attente fluides, paiement rapide, sourire garanti. L'expérience client avant tout.</p>
            <div class="sticker">WOW</div>
          </div>
        </div>
      </div>
    </section>

    <section class="economic-model section-padding">
      <div class="container">
        <div class="brutalist-box">
          <h2>Modèle "No Risk, All Reward"</h2>
          <p class="lead accent-font">Oubliez les coûts fixes.</p>
          <p class="desc">Fresh Events propose des partenariats basés sur la performance (redevance CA ou gestion déléguée).</p>
          
          <div class="model-points">
            <div class="point">
              <span class="badass-number">0€</span>
              <h3>Investissement</h3>
            </div>
            <div class="point">
              <span class="badass-number">0%</span>
              <h3>Risque</h3>
            </div>
            <div class="point">
              <span class="badass-number">100%</span>
              <h3>Rentabilité</h3>
            </div>
          </div>
          
          <div class="text-center mt-5">
            <RouterLink to="/contact" class="btn btn-primary">Let's talk money</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-header {
  padding: 100px 0;
  border-bottom: 5px solid var(--color-primary);
}

.big-title {
  font-size: 4.5rem;
  color: var(--color-white);
  line-height: 1;
}

.highlight-stroke {
  color: transparent;
  -webkit-text-stroke: 2px var(--color-primary);
}

.subtitle {
  color: var(--color-secondary);
  font-family: var(--font-accent);
  font-size: 1.5rem;
  margin-top: 20px;
}

.pillar-card {
  background: var(--color-white);
  border: 3px solid var(--color-black);
  padding: 30px;
  position: relative;
  box-shadow: 8px 8px 0px var(--color-black);
  transition: all 0.2s;
}

.pillar-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 12px 12px 0px var(--color-primary);
}

.card-header {
  background: var(--color-black);
  color: var(--color-white);
  display: inline-block;
  padding: 5px 15px;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.pillar-card h3 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.sticker {
  position: absolute;
  top: -15px;
  right: -15px;
  background: var(--color-primary); /* Yellow sticker */
  color: var(--color-white);
  padding: 10px;
  border-radius: 50%;
  font-weight: bold;
  font-family: var(--font-heading);
  transform: rotate(15deg);
  border: 2px solid var(--color-black);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.rotate-1 { transform: rotate(-1deg); }
.rotate-2 { transform: rotate(1deg); }

.brutalist-box {
  background: var(--color-black);
  color: var(--color-white);
  padding: 60px;
  border: 4px solid var(--color-primary);
  text-align: center;
}

.desc { max-width: 600px; margin: 0 auto 40px; }

.badass-number {
  font-family: var(--font-heading);
  font-size: 4rem;
  color: var(--color-primary);
  text-shadow: 3px 3px 0 var(--color-white);
  display: block;
}

.model-points {
  display: flex;
  justify-content: center;
  gap: 50px;
  flex-wrap: wrap;
}

.mt-5 { margin-top: 3rem; }
</style>
