<script setup>
</script>

<template>
  <div class="legal-view">
    <section class="legal-hero bg-primary">
      <div class="container">
        <h1 class="text-white">Mentions Légales</h1>
      </div>
    </section>

    <section class="legal-content section-padding">
      <div class="container">
        <h2>Éditeur du site</h2>
        <p>
          Le site fresh-events.fr est édité par <strong>FRESH-EVENTS AND FOOD</strong>, société par actions simplifiée (SAS)
          au capital social fixe de 5 000,00 €, immatriculée sous le SIRET n° 999 908 676 00011.
        </p>
        <p>
          Président : Abdelkrim QEDIRA.<br>
          Siège social : 105 rue des Thermes (Hôtel Saint Eloi), 57360 Amnéville, France.<br>
          Téléphone : <a href="tel:+33372396481">03 72 39 64 81</a><br>
          Email : <a href="mailto:contact@fresh-events.fr">contact@fresh-events.fr</a>
        </p>

        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par <strong>OVH SAS</strong>, 2 rue Kellermann, 59100 Roubaix, France.
        </p>

        <h2>Directeur de la publication</h2>
        <p>Abdelkrim QEDIRA, Président de FRESH-EVENTS AND FOOD.</p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, logos, mise en page) est la propriété de
          FRESH-EVENTS AND FOOD, sauf mention contraire, et ne peut être reproduit sans autorisation préalable.
        </p>

        <h2>Contact</h2>
        <p>
          Pour toute question relative à ces mentions légales, vous pouvez nous écrire à
          <a href="mailto:contact@fresh-events.fr">contact@fresh-events.fr</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.legal-hero {
  padding: clamp(3rem, 6vw, 5rem) 0 clamp(2rem, 4vw, 3rem);
}

.legal-content h2 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.legal-content h2:first-child {
  margin-top: 0;
}

.legal-content p {
  line-height: 1.7;
  margin-bottom: 1rem;
}

.legal-content a {
  color: var(--color-accent);
}
</style>
