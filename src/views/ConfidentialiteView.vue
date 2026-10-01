<script setup>
</script>

<template>
  <div class="legal-view">
    <section class="legal-hero bg-primary">
      <div class="container">
        <h1 class="text-white">Politique de Confidentialité</h1>
      </div>
    </section>

    <section class="legal-content section-padding">
      <div class="container">
        <p>
          FRESH-EVENTS AND FOOD (SAS au capital de 5 000,00 €, SIRET 999 908 676 00011) attache une attention
          particulière à la protection des données personnelles des visiteurs et clients de fresh-events.fr,
          conformément au Règlement Général sur la Protection des Données (RGPD).
        </p>

        <h2>Responsable du traitement</h2>
        <p>
          FRESH-EVENTS AND FOOD, 105 rue des Thermes (Hôtel Saint Eloi), 57360 Amnéville —
          <a href="mailto:contact@fresh-events.fr">contact@fresh-events.fr</a>.
        </p>

        <h2>Mesure d'audience</h2>
        <p>
          Le site utilise Umami, un outil de mesure d'audience auto-hébergé, respectueux de la vie privée : il ne
          dépose aucun cookie, n'utilise aucun identifiant unique et ne collecte aucune donnée personnelle
          permettant de vous identifier individuellement. Les statistiques produites (pages vues, provenance du
          trafic, appareil) sont agrégées et anonymes. Conformément aux recommandations de la CNIL, cet outil est
          exempté de consentement préalable.
        </p>

        <h2>Données collectées</h2>
        <p>
          Les seules données personnelles collectées le sont directement et volontairement par vous, via :
        </p>
        <ul>
          <li>le formulaire de contact (nom, email, téléphone, message) ;</li>
          <li>le formulaire de demande de devis en ligne (coordonnées, type d'événement, nombre d'invités et préférences de prestation).</li>
        </ul>
        <p>
          Ces données sont transmises à notre outil de gestion commerciale interne afin de traiter votre demande.
          Aucune donnée n'est vendue ni cédée à des tiers à des fins commerciales.
        </p>

        <h2>Finalité et base légale</h2>
        <p>
          Ces données sont utilisées exclusivement pour répondre à votre demande de contact ou de devis, et
          constituer, le cas échéant, un dossier client. Le traitement repose sur votre consentement (envoi du
          formulaire) et sur l'intérêt légitime de FRESH-EVENTS AND FOOD à répondre aux demandes commerciales.
        </p>

        <h2>Durée de conservation</h2>
        <p>
          Les données sont conservées le temps nécessaire au traitement de votre demande, puis jusqu'à 3 ans à
          compter du dernier contact à des fins de prospection commerciale, sauf opposition de votre part.
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation,
          d'opposition et de portabilité de vos données. Vous pouvez exercer ces droits en écrivant à
          <a href="mailto:contact@fresh-events.fr">contact@fresh-events.fr</a>. Vous disposez également du droit
          d'introduire une réclamation auprès de la CNIL (cnil.fr).
        </p>

        <h2>Cookies</h2>
        <p>
          Le site ne dépose aucun cookie, y compris pour la mesure d'audience (voir ci-dessus). Si un outil
          nécessitant des cookies venait à être mis en place à l'avenir, cette page serait mise à jour et un
          bandeau de consentement vous serait présenté.
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

.legal-content ul {
  margin: 0 0 1rem 1.5rem;
  line-height: 1.7;
}

.legal-content a {
  color: var(--color-accent);
}
</style>
