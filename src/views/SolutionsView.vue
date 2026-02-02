<template>
  <div class="solutions-view">
    <section class="page-header bg-primary-block">
      <div class="container text-center">
        <h1>Solutions <span class="highlight">Sur-Mesure.</span></h1>
        <p class="subtitle accent-font">Festivals, Corporate, Stades... On sait tout faire.</p>
      </div>
    </section>

    <!-- Festivals -->
    <section class="solution-block block-dark">
      <div class="container grid-2">
         <div class="text-content">
             <h2>Festivals & Culture</h2>
             <span class="badass-tag">HIGH VOLUME</span>
             <p class="desc">Absorber des flux de 50 000 personnes ? Easy. Signalétique visible, débit maximum, ambiance de feu.</p>
         </div>
         <div class="visual">
             <img src="https://picsum.photos/seed/festival/600/400" class="brutalist-img" />
         </div>
      </div>
    </section>

    <!-- Corporate -->
    <section class="solution-block block-light">
      <div class="container grid-2 reverse">
         <div class="text-content">
             <h2>Corporate & Séminaires</h2>
             <span class="badass-tag">PREMIUM</span>
             <p class="desc">Qualité de service irreprochable pour impressionner vos clients. Buffets soignés, staff élégant.</p>
         </div>
         <div class="visual">
             <img src="https://picsum.photos/seed/corporate-business/600/400" class="brutalist-img" />
         </div>
      </div>
    </section>

    <!-- Loisirs -->
    <section class="solution-block block-white">
      <div class="container grid-2">
         <div class="text-content">
             <h2>Lieux de Loisirs</h2>
             <span class="badass-tag">FAMILY FRIENDLY</span>
             <p class="desc">Musées, Parcs, Stades. Gestion pérenne ou saisonnière. On fidélise vos visiteurs par l'estomac.</p>
         </div>
         <div class="visual">
             <img src="https://picsum.photos/seed/party-celebration/600/400" class="brutalist-img" />
         </div>
      </div>
    </section>

    <section class="adaptability text-center section-padding bg-primary">
       <div class="container">
           <h2 class="text-white">Anywhere. Anytime.</h2>
           <p class="text-white mb-5">Intérieur, extérieur, désert ou palace. On s'adapte.</p>
           <RouterLink to="/contact" class="btn btn-outline-white big-btn">Challenge Us</RouterLink>
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

.solution-block {
    padding: 80px 0;
}

.block-dark { background: var(--color-black); color: var(--color-white); }
.block-light { background: var(--color-secondary); color: var(--color-black); }
.block-white { background: var(--color-white); color: var(--color-black); }

.block-dark h2 { color: var(--color-primary); }

.grid-2.reverse { 
    direction: rtl; 
}
.grid-2.reverse .text-content, .grid-2.reverse .visual {
    direction: ltr; /* Reset text direction */
}

.badass-tag {
    background: var(--color-primary);
    color: var(--color-white);
    padding: 5px 15px;
    font-family: var(--font-heading);
    font-size: 1.2rem;
    display: inline-block;
    margin-bottom: 20px;
    border: 2px solid var(--color-black);
    box-shadow: 4px 4px 0px var(--color-black);
}

.desc { font-size: 1.2rem; max-width: 500px; }

.brutalist-img {
    box-shadow: 10px 10px 0px var(--color-primary);
}
.block-dark .brutalist-img { box-shadow: 10px 10px 0px var(--color-white); }

.text-white { color: var(--color-white) !important; }
.mb-5 { margin-bottom: 3rem; }
.big-btn { padding: 20px 40px; font-size: 1.5rem; }

@media (max-width: 900px) {
    .grid-2, .grid-2.reverse { display: block; text-align: center; }
    .visual { margin-top: 30px; }
    .desc { margin: 0 auto; }
}
</style>
