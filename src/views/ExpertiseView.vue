<template>
  <div class="expertise-view">
    <section class="page-header bg-primary-block">
      <div class="container text-center">
        <h1>10 ans <span class="highlight">d'Excellence.</span></h1>
        <p class="subtitle accent-font">Fiabilité Industrielle, âme d'artisan.</p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        
        <div class="grid-3">
          <div class="xp-card">
            <div class="number">10+</div>
            <h3>Années d'Expérience</h3>
            <p>On a tout vu. Tout géré. Rien ne nous fait peur.</p>
          </div>
          <div class="xp-card">
            <div class="number">100%</div>
            <h3>Conforme HACCP</h3>
            <p>Le Graal de l'hygiène. On ne rigole pas avec ça.</p>
          </div>
          <div class="xp-card">
            <div class="number">24/7</div>
            <h3>Support Terrain</h3>
            <p>Toujours là. Toujours prêts.</p>
          </div>
        </div>

        <div class="premium-focus mt-5">
           <div class="focus-text">
               <h2>Culture Produit</h2>
               <p class="large-text">Sourcing qualitative, produits frais, emballages éco-responsables. Parce que la conscience écologique n'est pas une option.</p>
               <ul class="check-list">
                   <li>🥦 Options Végétariennes</li>
                   <li>♻️ Zéro Plastique</li>
                   <li>📍 Producteurs Locaux</li>
               </ul>
           </div>
           <div class="focus-img">
               <img src="https://picsum.photos/seed/food-kitchen/600/500" class="brutalist-img" />
           </div>
        </div>
      </div>
    </section>

    <section class="cta-banner bg-white border-top-thick section-padding text-center">
        <div class="container">
            <h2>Ready to upgrade your food game?</h2>
            <RouterLink to="/solutions" class="btn btn-primary mt-4">See our solutions</RouterLink>
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

.xp-card {
    background: var(--color-black);
    color: var(--color-white);
    padding: 40px 20px;
    text-align: center;
    border: 3px solid var(--color-primary);
    box-shadow: 8px 8px 0px var(--color-black); 
    transition: transform 0.3s;
}

.xp-card h3 {
    color: var(--color-primary);
    font-size: 1.5rem;
}

.xp-card:hover {
    transform: translateY(-5px);
    background: var(--color-secondary);
    color: var(--color-black);
    border-color: var(--color-black);
}

.xp-card:hover h3 {
    color: var(--color-black);
}

.number {
    font-size: 4rem;
    font-weight: bold;
    font-family: var(--font-heading);
    color: var(--color-primary);
    line-height: 1;
    margin-bottom: 10px;
}

.premium-focus {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: center;
    margin-top: 100px;
}

.large-text { font-size: 1.2rem; margin-bottom: 2rem; }

.check-list {
    list-style: none;
    font-size: 1.3rem;
    font-weight: bold;
}
.check-list li { margin-bottom: 10px; }

.border-top-thick {
    border-top: 5px solid var(--color-black);
}

@media (max-width: 900px) {
    .premium-focus { grid-template-columns: 1fr; }
}
</style>
