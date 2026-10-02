import { describe, expect, it } from 'vitest'
import {
  computeFormuleTotal, computeFormuleTotalTTC,
  computeAlacarteTotal, computeAlacarteTotalTTC,
  computeSupplementsTotal, computeSupplementsTotalTTC,
  computeServicesTotal, computeGrandTotal, computeGrandTotalTTC,
  computeHasProductSelection, computeCanNext,
} from '../src/utils/quotePricing.js'

describe('computeFormuleTotal', () => {
  it('multiplie le prix par le nombre de convives', () => {
    expect(computeFormuleTotal({ price: 25 }, 40)).toBe(1000)
  })

  it('renvoie 0 sans formule sélectionnée', () => {
    expect(computeFormuleTotal(null, 40)).toBe(0)
  })
})

describe('computeFormuleTotalTTC', () => {
  it('utilise price_ttc quand il existe', () => {
    expect(computeFormuleTotalTTC({ price: 25, price_ttc: 27.5 }, 10)).toBe(275)
  })

  it("retombe sur price si price_ttc est absent (pas de TVA à inventer)", () => {
    expect(computeFormuleTotalTTC({ price: 25 }, 10)).toBe(250)
  })
})

describe('computeAlacarteTotal', () => {
  it('somme prix x quantité pour chaque produit sélectionné', () => {
    const products = [{ id: 1, price: 10 }, { id: 2, price: 5 }]
    const quantities = { 1: 3, 2: 4 }
    expect(computeAlacarteTotal(products, quantities)).toBe(10 * 3 + 5 * 4)
  })

  it('ignore un produit sans quantité renseignée (pas de NaN)', () => {
    const products = [{ id: 1, price: 10 }]
    expect(computeAlacarteTotal(products, {})).toBe(0)
  })
})

describe('computeAlacarteTotalTTC', () => {
  it('utilise price_ttc par produit quand disponible, price sinon', () => {
    const products = [{ id: 1, price: 10, price_ttc: 11 }, { id: 2, price: 5 }]
    const quantities = { 1: 2, 2: 2 }
    expect(computeAlacarteTotalTTC(products, quantities)).toBe(11 * 2 + 5 * 2)
  })
})

describe('computeSupplementsTotal', () => {
  it('somme les suppléments puis multiplie par le nombre de convives (tarif par personne)', () => {
    const supplements = [{ id: 1, price: 2 }, { id: 2, price: 3 }]
    expect(computeSupplementsTotal(supplements, 20)).toBe((2 + 3) * 20)
  })
})

describe('computeServicesTotal', () => {
  it("les services sont un forfait, PAS multipliés par le nombre de convives", () => {
    const services = [{ id: 1, price: 150 }, { id: 2, price: 80 }]
    expect(computeServicesTotal(services)).toBe(230)
  })
})

describe('computeGrandTotal', () => {
  const totals = { formuleTotal: 1000, supplementsTotal: 100, servicesTotal: 50, alacarteTotal: 400 }

  it('mode formule: formule + suppléments + services (PAS la à-la-carte)', () => {
    expect(computeGrandTotal('formule', totals)).toBe(1000 + 100 + 50)
  })

  it('mode à-la-carte: à-la-carte + services (PAS la formule ni les suppléments)', () => {
    expect(computeGrandTotal('alacarte', totals)).toBe(400 + 50)
  })
})

describe('computeGrandTotalTTC', () => {
  it('même logique que HT, sur les montants TTC', () => {
    const totals = {
      formuleTotalTTC: 1100, supplementsTotalTTC: 110, servicesTotalTTC: 55, alacarteTotalTTC: 440,
    }
    expect(computeGrandTotalTTC('formule', totals)).toBe(1100 + 110 + 55)
    expect(computeGrandTotalTTC('alacarte', totals)).toBe(440 + 55)
  })
})

describe('computeHasProductSelection', () => {
  it('mode formule: vrai seulement si une formule est choisie', () => {
    expect(computeHasProductSelection('formule', { selectedFormule: 42 })).toBe(true)
    expect(computeHasProductSelection('formule', { selectedFormule: null })).toBe(false)
  })

  it('mode libre: vrai seulement si un message non-vide est saisi', () => {
    expect(computeHasProductSelection('libre', { contactMessage: '  Bonjour  ' })).toBe(true)
    expect(computeHasProductSelection('libre', { contactMessage: '   ' })).toBe(false)
    expect(computeHasProductSelection('libre', { contactMessage: '' })).toBe(false)
  })

  it('mode à-la-carte: vrai si au moins une quantité positive', () => {
    expect(computeHasProductSelection('alacarte', { alacarteQuantities: { 1: 0, 2: 3 } })).toBe(true)
    expect(computeHasProductSelection('alacarte', { alacarteQuantities: { 1: 0, 2: 0 } })).toBe(false)
    expect(computeHasProductSelection('alacarte', { alacarteQuantities: {} })).toBe(false)
  })
})

describe('computeCanNext (validation par étape du wizard de devis)', () => {
  const baseEvent = { type: 'mariage', date: '2027-06-01', location: 'Amnéville', guests: 50, timeSlot: 'Soir' }
  const baseContact = { name: 'Jean', email: 'jean@test.fr', phone: '0600000000', company: '' }

  it('étape 1: exige un type d\'événement', () => {
    expect(computeCanNext(1, { event: { type: null } })).toBe(false)
    expect(computeCanNext(1, { event: { type: 'mariage' } })).toBe(true)
  })

  it('étape 2: exige date + lieu + convives > 0 + créneau', () => {
    expect(computeCanNext(2, { event: baseEvent })).toBe(true)
    expect(computeCanNext(2, { event: { ...baseEvent, guests: 0 } })).toBe(false)
    expect(computeCanNext(2, { event: { ...baseEvent, location: '' } })).toBe(false)
  })

  it('étape 3 festival: exige serviceType + flux + duration (pas la sélection produit)', () => {
    const festival = { serviceType: 'stands', flux: 'medium', duration: '1 jour' }
    expect(computeCanNext(3, { isFestival: true, festival, hasProductSelection: false })).toBe(true)
    expect(computeCanNext(3, { isFestival: true, festival: { ...festival, flux: null }, hasProductSelection: true })).toBe(false)
  })

  it('étape 3 non-festival: délègue entièrement à hasProductSelection', () => {
    expect(computeCanNext(3, { isFestival: false, hasProductSelection: true })).toBe(true)
    expect(computeCanNext(3, { isFestival: false, hasProductSelection: false })).toBe(false)
  })

  it('étape 4: exige nom/email/téléphone, + raison sociale si compte société', () => {
    expect(computeCanNext(4, { accountType: 'particulier', contact: baseContact })).toBe(true)
    expect(computeCanNext(4, { accountType: 'societe', contact: baseContact })).toBe(false) // company vide
    expect(computeCanNext(4, { accountType: 'societe', contact: { ...baseContact, company: 'Acme' } })).toBe(true)
  })

  it('étape inconnue: refuse par défaut (fail-safe)', () => {
    expect(computeCanNext(99, {})).toBe(false)
  })
})
