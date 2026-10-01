<script setup>
</script>

<template>
  <div class="legal-view">
    <section class="legal-hero bg-primary">
      <div class="container">
        <h1 class="text-white">Conditions Générales de Vente</h1>
      </div>
    </section>

    <section class="legal-content section-padding">
      <div class="container">
        <h2>Article 1 — Objet et champ d'application</h2>
        <p>
          Les présentes Conditions Générales de Vente (CGV) régissent les prestations de restauration
          événementielle fournies par <strong>FRESH-EVENTS AND FOOD</strong>, SAS au capital de 5 000,00 €,
          immatriculée sous le SIRET n° 999 908 676 00011, dont le siège social est situé 105 rue des Thermes
          (Hôtel Saint Eloi), 57360 Amnéville. Elles s'appliquent à toute prestation commandée via le site
          fresh-events.fr ou directement auprès de nos équipes.
        </p>

        <h2>Article 2 — Devis et commande</h2>
        <p>
          Chaque prestation fait l'objet d'un devis personnalisé, établi en fonction du type d'événement, du
          nombre d'invités et des prestations choisies. Le devis précise le prix (HT et TTC), ainsi que les
          conditions spécifiques applicables à la commande : montant et échéance de l'acompte, modalités de
          règlement du solde et conditions d'annulation propres à la prestation. La commande n'est considérée
          comme ferme qu'à réception du devis signé et, le cas échéant, du versement de l'acompte demandé.
        </p>

        <h2>Article 3 — Prix et modalités de paiement</h2>
        <p>
          Les prix sont ceux indiqués sur le devis accepté par le client, lequel fait foi. Les modalités de
          paiement (acompte, échéancier, solde) sont variables selon la nature, la taille et la date de
          l'événement : elles sont systématiquement détaillées sur le devis et/ou la facture correspondante et
          font partie intégrante du contrat conclu avec le client.
        </p>

        <h2>Article 4 — Annulation et modification</h2>
        <p>
          Les conditions d'annulation ou de report (délais, pénalités éventuelles) sont propres à chaque
          prestation et précisées sur le devis accordé au client. À défaut de mention contraire sur le devis,
          le client est invité à se rapprocher de FRESH-EVENTS AND FOOD à
          <a href="mailto:contact@fresh-events.fr">contact@fresh-events.fr</a> pour toute demande d'annulation
          ou de modification.
        </p>

        <h2>Article 5 — Exécution de la prestation</h2>
        <p>
          FRESH-EVENTS AND FOOD s'engage à exécuter la prestation commandée dans le respect des normes d'hygiène
          et de sécurité alimentaire en vigueur (certification HACCP). Toute demande de modification du nombre
          d'invités ou du contenu de la prestation doit être communiquée dans les délais indiqués sur le devis
          afin de pouvoir être prise en compte.
        </p>

        <h2>Article 6 — Responsabilité</h2>
        <p>
          FRESH-EVENTS AND FOOD ne saurait être tenue responsable des conséquences d'un cas de force majeure ou
          d'un fait indépendant de sa volonté (intempéries, défaillance d'un tiers, décision administrative, etc.)
          affectant l'exécution de la prestation.
        </p>

        <h2>Article 7 — Droit applicable et litiges</h2>
        <p>
          Les présentes CGV sont soumises au droit français. En cas de litige, et à défaut de résolution amiable,
          les tribunaux compétents du ressort du siège social de FRESH-EVENTS AND FOOD seront seuls compétents.
        </p>

        <h2>Contact</h2>
        <p>
          Pour toute question relative à ces conditions générales de vente, vous pouvez nous écrire à
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
