/**
 * Calculs de prix du générateur de devis (QuoteView.vue), extraits en
 * fonctions pures pour pouvoir être testés sans monter le composant complet
 * (1900+ lignes, données produits chargées depuis l'API au mount). Chaque
 * fonction reproduit exactement un `computed()` de QuoteView.vue — voir les
 * commentaires de ce fichier pour le lien vers l'original.
 *
 * Toutes les quantités/prix sont en unités monétaires simples (pas de
 * centimes ici, contrairement à StayOrder) : `price` vient directement
 * d'Odoo tel quel.
 */

/** formuleTotal */
export function computeFormuleTotal(selectedFormuleObj, guests) {
  return selectedFormuleObj ? selectedFormuleObj.price * guests : 0
}

/** formuleTotalTTC */
export function computeFormuleTotalTTC(selectedFormuleObj, guests) {
  return selectedFormuleObj ? (selectedFormuleObj.price_ttc || selectedFormuleObj.price) * guests : 0
}

/** alacarteTotal */
export function computeAlacarteTotal(selectedAlacarteObjs, quantities) {
  return selectedAlacarteObjs.reduce((sum, p) => sum + p.price * (quantities[p.id] || 0), 0)
}

/** alacarteTotalTTC */
export function computeAlacarteTotalTTC(selectedAlacarteObjs, quantities) {
  return selectedAlacarteObjs.reduce((sum, p) => sum + (p.price_ttc || p.price) * (quantities[p.id] || 0), 0)
}

/** supplementsTotal — tarif par personne × nombre de convives, comme la formule elle-même */
export function computeSupplementsTotal(selectedSupplementObjs, guests) {
  return selectedSupplementObjs.reduce((sum, s) => sum + s.price, 0) * guests
}

/** supplementsTotalTTC */
export function computeSupplementsTotalTTC(selectedSupplementObjs, guests) {
  return selectedSupplementObjs.reduce((sum, s) => sum + (s.price_ttc || s.price), 0) * guests
}

/** servicesTotal */
export function computeServicesTotal(selectedServiceObjs) {
  return selectedServiceObjs.reduce((sum, p) => sum + p.price, 0)
}

/** servicesTotalTTC */
export function computeServicesTotalTTC(selectedServiceObjs) {
  return selectedServiceObjs.reduce((sum, p) => sum + (p.price_ttc || p.price), 0)
}

/** grandTotal */
export function computeGrandTotal(selectionMode, { formuleTotal, supplementsTotal, servicesTotal, alacarteTotal }) {
  if (selectionMode === 'formule') return formuleTotal + supplementsTotal + servicesTotal
  return alacarteTotal + servicesTotal
}

/** grandTotalTTC */
export function computeGrandTotalTTC(selectionMode, { formuleTotalTTC, supplementsTotalTTC, servicesTotalTTC, alacarteTotalTTC }) {
  if (selectionMode === 'formule') return formuleTotalTTC + supplementsTotalTTC + servicesTotalTTC
  return alacarteTotalTTC + servicesTotalTTC
}

/** hasProductSelection */
export function computeHasProductSelection(selectionMode, { selectedFormule, contactMessage, alacarteQuantities }) {
  if (selectionMode === 'formule') return !!selectedFormule
  if (selectionMode === 'libre') return (contactMessage || '').trim().length > 0
  return Object.values(alacarteQuantities).some((q) => q > 0)
}

/**
 * canNext — un objet par étape plutôt qu'un switch pour rester lisible une
 * fois testé avec des cas limites (étape inconnue, etc.). Reproduit
 * exactement la logique de QuoteView.vue : NE PAS diverger entre les deux
 * sans mettre à jour les deux côtés.
 */
export function computeCanNext(step, ctx) {
  const { event, isFestival, festival, hasProductSelection, accountType, contact } = ctx
  if (step === 1) return !!event.type
  if (step === 2) return !!event.date && !!event.location && event.guests > 0 && !!event.timeSlot
  if (step === 3) {
    if (isFestival) return !!festival.serviceType && !!festival.flux && !!festival.duration
    return hasProductSelection
  }
  if (step === 4) {
    const accountOk = accountType === 'societe' ? !!contact.company.trim() : !!accountType
    return !!contact.name && !!contact.email && !!contact.phone && accountOk
  }
  return false
}
