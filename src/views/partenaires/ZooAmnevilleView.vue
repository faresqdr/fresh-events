<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Accès par code ────────────────────────────────────────────────────────
// Barrière légère, pas un vrai contrôle d'accès : elle décourage un lien
// partagé par erreur, elle ne protège pas d'un visiteur déterminé. Tant que
// le code n'est pas saisi, le contenu (formules, prix) n'existe simplement
// pas dans la page — il n'apparaît qu'après déverrouillage, donc il n'est
// pas visible dans le code source avant ce moment.
const ACCESS_CODE = 'zoo26'
const STORAGE_KEY = 'zoo-amneville-access'

const unlocked = ref(false)
const codeInput = ref('')
const codeError = ref(false)

function tryUnlock() {
  if (codeInput.value.trim().toLowerCase() === ACCESS_CODE) {
    unlocked.value = true
    codeError.value = false
    try { sessionStorage.setItem(STORAGE_KEY, '1') } catch { /* navigation privée : tant pis */ }
    nextTick().then(() => {
      buildAnimations()
      ScrollTrigger.refresh()
    })
  } else {
    codeError.value = true
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Document de travail privé — 13 formules pour le Zoo d'Amnéville.
// Contenu figé en dur (photos locales + données ci-dessous) : cette page ne
// dépend d'aucun appel réseau à Odoo, pour une fiabilité totale le jour du
// rendez-vous. Seul le prix client (HT, marge zoo déjà incluse) est affiché —
// jamais le tarif de gros ni le taux de marge, cette page pouvant circuler
// au-delà de la réunion. Les mêmes prestations existent aussi comme produits
// réels dans Odoo (catégorie "Zoo d'Amnéville", liste de prix partenaire),
// où le détail du calcul reste, lui, strictement interne.
// ─────────────────────────────────────────────────────────────────────────────

const IMG = (slug) => `/zoo-amneville/${slug}.jpg`

const sections = [
  {
    id: 'plateaux',
    title: 'Service sur plateaux — debout',
    intro: 'Cocktails dînatoires, du format court au format complet, en version classique et Prestige.',
    lines: [
      {
        name: 'Cocktail 8 pièces',
        image: IMG('cocktail8'),
        description: '6 pièces salées + 2 pièces sucrées. Exemples : mini-burger bœuf, wrap de volaille, verrine de légumes, tartelette tomate-chèvre, mini panna cotta. Option veggie : mini-wrap légumes grillés, verrine chèvre & légumes. Option sans porc : charcuterie de volaille ou saumon fumé.',
        adulte: 18.63, enfant: 11.18,
      },
      {
        name: 'Cocktail 8 pièces Prestige',
        prestige: true,
        image: IMG('cocktail8_prestige'),
        description: 'Pièces plus travaillées : tartare de saumon citronné, mini-burger gourmet, brochette de crevettes, foie gras selon saison, verrine de légumes croquants, macaron ou mini-dessert. Alternative veggie et sans porc sur demande.',
        adulte: 25.88, enfant: 15.53,
      },
      {
        name: 'Cocktail 14 pièces',
        image: IMG('cocktail14'),
        description: '10 pièces salées + 4 pièces sucrées. Assortiment froid/chaud : mini-burgers, wraps, quiches, brochettes, verrines, mini-tartelettes et panna cotta. Service sur plateaux, nappage et vaisselle inclus.',
        adulte: 28.98, enfant: 17.39,
      },
      {
        name: 'Cocktail 14 pièces Prestige',
        prestige: true,
        image: IMG('cocktail14_prestige'),
        description: 'Sélection gastronomique : noix de Saint-Jacques selon arrivage, saumon fumé, crevettes, tartare, pièces végétales raffinées et mignardises. Produits nobles, présentation soignée et recettes plus élaborées.',
        adulte: 39.33, enfant: 23.60,
      },
      {
        name: 'Cocktail 20 pièces',
        image: IMG('cocktail20'),
        description: '14 pièces salées + 6 pièces sucrées. Large assortiment chaud/froid : mini-burgers, brochettes, quiches, wraps, verrines, bouchées de poisson et assortiment de desserts individuels.',
        adulte: 36.23, enfant: 21.74,
      },
      {
        name: 'Cocktail 20 pièces Prestige',
        prestige: true,
        image: IMG('cocktail20_prestige'),
        description: '16 pièces salées + 4 pièces sucrées, avec produits nobles et pièces signatures : Saint-Jacques, saumon, crevettes, foie gras selon saison, mini-desserts maison. Alternative veggie et sans porc incluse sur demande.',
        adulte: 49.68, enfant: 29.81,
      },
    ],
  },
  {
    id: 'table',
    title: 'Service à table',
    intro: 'Repas assis, entrée / plat / dessert, avec fromage sur les formules Prestige et Gala.',
    lines: [
      {
        name: 'Déjeuner Entrée + Plat + Dessert',
        image: IMG('dejeuner'),
        description: 'Entrée : salade de saison ou velouté maison. Plats au choix : suprême de poulet sauce forestière, pavé de saumon sauce citronnée, filet de dorade légumes de saison. Garnitures : gratin dauphinois, riz basmati ou légumes. Dessert maison : tiramisu, crème brûlée ou salade de fruits.',
        adulte: 31.05, enfant: 18.63,
      },
      {
        name: 'Déjeuner Prestige Entrée + Plat + Fromage + Dessert',
        prestige: true,
        image: IMG('dejeuner_prestige'),
        description: 'Entrée raffinée : saumon fumé ou tartare de saumon. Plat : filet de bœuf sauce aux morilles/échalotes, pavé de saumon ou volaille fermière. Fromage régional. Dessert maison travaillé. Produits nobles et présentation gastronomique.',
        adulte: 46.58, enfant: 27.95,
      },
      {
        name: 'Dîner de Gala Entrée + Plat + Fromage + Dessert',
        prestige: true,
        image: IMG('gala'),
        description: 'Entrée gastronomique : noix de Saint-Jacques selon saison ou foie gras. Plat : filet de bœuf, Saint-Jacques ou poisson noble selon arrivage, garniture de saison. Fromage régional affiné. Dessert signature maison et mignardises.',
        adulte: 67.28, enfant: 40.37,
      },
    ],
  },
  {
    id: 'buffet',
    title: 'Service en buffet',
    intro: 'Formats extérieurs et de saison — le Buffet froid se décline toute l’année, le BBQ en saison chaude.',
    lines: [
      {
        name: 'BBQ — Printemps / Été',
        image: IMG('bbq'),
        description: 'Période proposée : mai à septembre. Assortiment grillé : brochettes de volaille, bœuf mariné, saucisse de volaille, légumes grillés, pommes de terre rôties, salades composées et sauces maison. Alternative veggie : brochettes légumes/fromage et galettes végétales. Sans porc : 100 % viandes de volaille/bœuf.',
        adulte: 33.12, enfant: 19.87,
      },
      {
        name: 'BBQ Prestige — Printemps / Été',
        prestige: true,
        image: IMG('bbq_prestige'),
        description: 'Période proposée : mai à septembre. Pièces nobles : entrecôte, filet de bœuf, brochettes de gambas ou poisson selon arrivage, accompagnements maison, légumes grillés et salades fraîches. Alternative veggie et sans porc sur demande.',
        adulte: 46.58, enfant: 27.95,
      },
      {
        name: 'Buffet froid — Printemps / Été',
        image: IMG('buffetfroid'),
        description: 'Période proposée : avril à septembre. Salades composées, crudités, tomates-mozzarella, taboulé, charcuterie de volaille, saumon, œufs mimosa, terrines maison, fromages, pain et assortiment de desserts. Alternative veggie et sans porc disponible.',
        adulte: 28.98, enfant: 17.39,
      },
      {
        name: 'Buffet froid — Automne / Hiver',
        image: IMG('buffetfroid_hiver'),
        description: 'Période proposée : octobre à mars. Salades de saison, légumes rôtis, terrines maison, saumon, charcuterie de volaille, fromages régionaux, tartes salées, pain et desserts maison. Alternative veggie et sans porc disponible.',
        adulte: 28.98, enfant: 17.39,
      },
    ],
  },
]

// ── Mise en forme des descriptions ────────────────────────────────────────
// Le texte source est rédigé en phrases « Label : contenu » (Entrée : …,
// Exemples : …) ou en notes libres. On le découpe une fois pour toutes en
// puces structurées, et on isole à part les mentions veggie / sans porc —
// une information d'une autre nature (une option, pas un ingrédient) qui
// mérite son propre encart plutôt que de se noyer dans la liste.
function parseDescription(desc) {
  const sentences = desc
    .split(/(?<=[.!])\s+(?=[A-ZÀ-ÖØ-Þ0-9])/)
    .map((s) => s.trim())
    .filter(Boolean)
  const bullets = []
  const options = []
  for (const sentence of sentences) {
    const isOption = /veggie|sans\s*porc/i.test(sentence)
      && /^(option|alternative|sans\s*porc)\b/i.test(sentence)
    const colonIndex = sentence.indexOf(' : ')
    const hasShortLabel = colonIndex > -1 && colonIndex <= 42
    const label = hasShortLabel ? sentence.slice(0, colonIndex) : null
    const text = hasShortLabel ? sentence.slice(colonIndex + 3) : sentence
    ;(isOption ? options : bullets).push({ label, text })
  }
  return { bullets, options }
}

for (const sec of sections) {
  for (const line of sec.lines) {
    Object.assign(line, parseDescription(line.description))
  }
}

let ctx = null

function buildAnimations() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    gsap.set('[data-reveal], [data-reveal-group] > *', { opacity: 1, y: 0 })
    return
  }
  ctx = gsap.context(() => {
    gsap.from('[data-cover-item]', {
      y: 24, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.1,
    })
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.fromTo(el, { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })
    gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
      gsap.fromTo(group.children, { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.07,
        immediateRender: false,
        scrollTrigger: { trigger: group, start: 'top 88%', once: true },
      })
    })
    gsap.utils.toArray('[data-rule]').forEach((el) => {
      gsap.fromTo(el, { scaleX: 0 }, {
        scaleX: 1, transformOrigin: 'left center', duration: 0.9, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      })
    })
  })
}

onMounted(async () => {
  document.body.classList.add('catalogue-page')

  let alreadyUnlocked = false
  try { alreadyUnlocked = sessionStorage.getItem(STORAGE_KEY) === '1' } catch { /* ignore */ }

  if (alreadyUnlocked) {
    unlocked.value = true
    await nextTick()
    buildAnimations()
    if (document.readyState !== 'complete') {
      window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
    }
  }
})

onBeforeUnmount(() => {
  document.body.classList.remove('catalogue-page')
  ctx?.revert()
})

const fmt = (n) => n.toFixed(2).replace('.', ',') + ' €'

function printPage() {
  window.print()
}
</script>

<template>
  <div class="zoo-page">

    <!-- ── Écran de code ────────────────────────────────────────────────── -->
    <section v-if="!unlocked" class="gate">
      <form class="gate-card" @submit.prevent="tryUnlock">
        <p class="cover-eyebrow">Fresh Events × Zoo d’Amnéville</p>
        <div class="rule rule--gold rule--center"></div>
        <h1 class="gate-title">Accès protégé</h1>
        <p class="gate-sub">Ce document est réservé aux personnes qui en ont reçu le code.</p>
        <input
          v-model="codeInput"
          type="text"
          class="gate-input"
          :class="{ 'gate-input--error': codeError }"
          placeholder="Code d’accès"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          @input="codeError = false"
        />
        <p v-if="codeError" class="gate-error">Code incorrect — réessayez.</p>
        <button type="submit" class="btn-gold">Accéder</button>
      </form>
    </section>

    <template v-else>

    <!-- ── Confidentiel ──────────────────────────────────────────────────── -->
    <div class="confidential-bar">
      <div class="container confidential-inner">
        <span>Document de travail — usage interne Zoo d’Amnéville &amp; Fresh Events</span>
        <button class="print-btn" @click="printPage">Imprimer / PDF</button>
      </div>
    </div>

    <!-- ── Couverture ─────────────────────────────────────────────────────── -->
    <section class="zoo-cover">
      <div class="zoo-cover-inner">
        <p class="cover-eyebrow" data-cover-item>Fresh Events × Zoo d’Amnéville</p>
        <div class="rule rule--gold rule--center" data-cover-item></div>
        <h1 class="cover-title" data-cover-item>Proposition de<br>Partenariat Traiteur</h1>
        <p class="cover-sub" data-cover-item>Formules traiteur — restauration événementielle</p>
        <p class="cover-date" data-cover-item>Septembre 2026</p>
      </div>
    </section>

    <!-- ── Pitch ──────────────────────────────────────────────────────────── -->
    <section class="section">
      <div class="container-narrow">
        <p class="eyebrow" data-reveal>Notre proposition</p>
        <h2 class="section-title" data-reveal>Vous vendez. Nous produisons.</h2>
        <div class="rule rule--gold" data-rule></div>
        <div class="pitch-text" data-reveal>
          <p>
            Fresh Events assure déjà la restauration événementielle de plusieurs acteurs majeurs
            du pôle d’Amnéville — Galaxie, Séminaire Amnéville, Golden Tulip, Seven Casino.
            Nous connaissons vos contraintes de site, votre logistique et vos flux.
          </p>
          <p>
            <strong>Vous restez l’interlocuteur unique de vos clients</strong> : nous assurons la
            production, la logistique et le service, sous votre marque.
          </p>
          <p>
            Nous nous positionnons sur <strong>l’intégralité de ces 12 formules</strong>, présentées
            ci-dessous avec leur composition détaillée.
          </p>
        </div>
      </div>
    </section>

    <!-- ── Les 3 catégories de service ───────────────────────────────────── -->
    <section v-for="(sec, si) in sections" :key="sec.id" :id="sec.id" class="section" :class="{ 'section--cream': si % 2 === 1 }">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow" data-reveal>{{ String(si + 1).padStart(2, '0') }} — {{ sections.length }} catégories</p>
          <h2 class="section-title" data-reveal>{{ sec.title }}</h2>
          <div class="rule rule--gold" data-rule></div>
          <p class="section-intro" data-reveal>{{ sec.intro }}</p>
        </header>

        <div class="lines">
          <article
            v-for="line in sec.lines" :key="line.name"
            class="line-card"
            :class="{ 'line-card--prestige': line.prestige }"
            data-reveal
          >
            <div class="line-media">
              <img :src="line.image" :alt="line.name" loading="lazy" />
              <span v-if="line.prestige" class="prestige-tag">✦ Prestige</span>
              <span class="photo-tag">Photo indicative</span>
            </div>

            <div class="line-body">
              <h3>{{ line.name }}</h3>

              <p class="line-price">
                <strong>{{ fmt(line.adulte) }}</strong> HT adulte
                <span class="line-price-sep">|</span>
                <strong>{{ fmt(line.enfant) }}</strong> HT enfant
              </p>

              <ul class="line-bullets">
                <li v-for="(b, bi) in line.bullets" :key="bi">
                  <strong v-if="b.label">{{ b.label }} :</strong> {{ b.text }}
                </li>
              </ul>

              <div v-if="line.options.length" class="line-options">
                <span v-for="(o, oi) in line.options" :key="oi" class="option-pill">
                  <strong v-if="o.label">{{ o.label }} :</strong> {{ o.text }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Conditions communes ──────────────────────────────────────────── -->
    <section class="section section--cream">
      <div class="container-narrow">
        <p class="eyebrow" data-reveal>Applicable aux 12 prestations</p>
        <h2 class="section-title" data-reveal>Conditions communes</h2>
        <div class="rule rule--gold" data-rule></div>
        <ul class="common-conditions" data-reveal-group>
          <li>TVA à 10 % appliquée sur l’ensemble des prestations.</li>
          <li>De 20 à 500 convives par commande.</li>
          <li>Tarifs incluant service, nappage, vaisselle, matériel de cuisine et personnel de cuisine.</li>
        </ul>
      </div>
    </section>

    <!-- ── Clôture ───────────────────────────────────────────────────────── -->
    <section class="zoo-closing">
      <div class="container-narrow closing-inner">
        <p class="cover-eyebrow" data-reveal>Fresh Events</p>
        <div class="rule rule--gold rule--center" data-rule></div>
        <h2 class="closing-title" data-reveal>Prêts à démarrer ensemble</h2>
        <p class="closing-sub" data-reveal>
          Nous nous positionnons sur l’intégralité de ces 12 formules, aux conditions détaillées
          ci-dessus. À votre disposition pour affiner les menus, les périodes saisonnières et
          organiser un premier événement test.
        </p>
        <div class="closing-details" data-reveal>
          <p>Fresh Events — 105 rue des Thermes (Hôtel Saint Eloi), 57360 Amnéville</p>
          <p>
            <a href="tel:+33372396481">03 72 39 64 81</a>
            <span class="sep">·</span>
            <a href="mailto:contact@fresh-events.fr">contact@fresh-events.fr</a>
          </p>
        </div>
      </div>
    </section>

    </template>

  </div>
</template>

<style scoped>
.zoo-page {
  background: var(--color-white);
  overflow-x: clip;
}

/* ── Écran de code ─────────────────────────────────────────────────────── */
.gate {
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.25rem;
  background:
    radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.07), transparent 62%),
    var(--color-primary);
}

.gate-card {
  width: 100%;
  max-width: 380px;
  text-align: center;
  padding: clamp(2.25rem, 6vw, 3rem) clamp(1.75rem, 5vw, 2.5rem);
  border: 1px solid rgba(201, 169, 97, 0.35);
  color: var(--color-white);
}

.gate-title {
  font-family: var(--font-heading);
  font-size: 1.9rem;
  font-weight: 400;
  color: var(--color-white);
  margin: 0.75rem 0 0.6rem;
}

.gate-sub {
  font-size: 0.85rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 1.75rem;
}

.gate-input {
  width: 100%;
  padding: 0.85rem 1rem;
  margin-bottom: 0.85rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: 1rem;
  text-align: center;
  letter-spacing: 0.06em;
  transition: border-color var(--transition-fast);
}

.gate-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.gate-input:focus {
  outline: none;
  border-color: var(--color-gold);
}

.gate-input--error {
  border-color: #c66;
}

.gate-error {
  font-size: 0.78rem;
  color: #e39a9a;
  margin: -0.4rem 0 1rem;
}

.gate-card .btn-gold {
  width: 100%;
  padding: 0.85rem 1.5rem;
  border: 1px solid var(--color-gold);
  background: var(--color-gold);
  color: var(--color-primary);
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.gate-card .btn-gold:hover {
  background: transparent;
  color: var(--color-gold);
}

/* ── Bandeau confidentiel ──────────────────────────────────────────────── */
.confidential-bar {
  background: #1a1a1a;
  color: rgba(255, 255, 255, 0.75);
}

.confidential-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
}

.print-btn {
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: none;
  color: rgba(255, 255, 255, 0.85);
  padding: 0.35rem 0.9rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.print-btn:hover {
  background: rgba(255, 255, 255, 0.12);
}

/* ── Couverture ────────────────────────────────────────────────────────── */
.zoo-cover {
  min-height: 62vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: clamp(3rem, 8vw, 5rem) 1.5rem;
  background:
    radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.07), transparent 62%),
    var(--color-primary);
  color: var(--color-white);
}

.cover-eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
}

.cover-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.6rem);
  font-weight: 400;
  line-height: 1.08;
  color: var(--color-white);
  margin: 0;
}

.cover-sub {
  margin-top: 1.25rem;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
}

.cover-date {
  margin-top: 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-gold);
}

/* ── Générique ─────────────────────────────────────────────────────────── */
.section {
  padding: clamp(3.5rem, 7vw, 6rem) 0;
}

.section--cream {
  background: var(--color-secondary);
}

.section-head {
  max-width: 680px;
  margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
}

.eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 0.9rem;
}

.section-title {
  font-family: var(--font-heading);
  font-size: clamp(1.7rem, 3vw, 2.6rem);
  font-weight: 500;
  line-height: 1.12;
  letter-spacing: -0.02em;
  margin: 0;
}

.section-intro {
  max-width: 56ch;
  color: rgba(26, 26, 26, 0.72);
  line-height: 1.75;
  font-size: 0.96rem;
}

.rule {
  width: 54px;
  height: 1px;
  background: linear-gradient(to right, var(--color-gold), rgba(201, 169, 97, 0.2));
  margin: 1.25rem 0 1.5rem;
}

.rule--center {
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(to right, transparent, var(--color-gold), transparent);
  width: 90px;
}

.pitch-text p {
  font-size: 1rem;
  line-height: 1.85;
  color: rgba(26, 26, 26, 0.8);
  margin-bottom: 1.25rem;
}

.pitch-text strong {
  color: var(--color-primary);
  font-weight: 600;
}

/* ── Lignes de prestation ──────────────────────────────────────────────── */
.lines {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: clamp(1.75rem, 3vw, 2.5rem);
}

.line-card {
  position: relative;
  background: var(--color-white);
  border: 1px solid rgba(26, 58, 26, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow var(--transition-base), transform var(--transition-base);
}

.section--cream .line-card {
  background: var(--color-white);
}

/* Les lignes Prestige se distinguent à trois niveaux : un liseré doré en
   tête de carte, un contour et une ombre plus chaleureux, et un prix teinté
   bronze — visibles d'un coup d'œil, même en défilant vite. */
.line-card--prestige {
  border-color: rgba(201, 169, 97, 0.55);
  box-shadow: 0 12px 32px rgba(201, 169, 97, 0.16);
}

.line-card--prestige::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  z-index: 1;
  background: linear-gradient(to right, var(--color-gold), #e8d4a3, var(--color-gold));
}

.line-media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--color-tertiary);
}

.line-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.prestige-tag {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  z-index: 2;
  padding: 0.4rem 0.85rem;
  background: var(--color-gold);
  color: var(--color-primary);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
}

.photo-tag {
  position: absolute;
  bottom: 0.7rem;
  right: 0.7rem;
  padding: 0.22rem 0.6rem;
  background: rgba(0, 0, 0, 0.55);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.62rem;
  font-style: italic;
  letter-spacing: 0.02em;
  border-radius: 2px;
}

.line-body {
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.line-body h3 {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0 0 0.75rem;
  line-height: 1.25;
}

.line-price {
  font-size: 0.95rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(26, 26, 26, 0.08);
}

.line-price strong {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 600;
}

.line-price-sep {
  margin: 0 0.6rem;
  color: rgba(26, 26, 26, 0.25);
}

.line-card--prestige .line-price strong {
  color: #8a6d2f;
}

.line-card--prestige .line-price {
  border-bottom-color: rgba(201, 169, 97, 0.3);
}

.line-bullets {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  flex: 1;
}

.line-bullets li {
  position: relative;
  padding-left: 0.9rem;
  font-size: 0.86rem;
  line-height: 1.6;
  color: rgba(26, 26, 26, 0.72);
  margin-bottom: 0.5rem;
}

.line-bullets li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--color-gold);
}

.line-bullets li strong {
  color: var(--color-primary);
  font-weight: 600;
}

.line-card--prestige .line-bullets li strong {
  color: #8a6d2f;
}

/* Les options veggie / sans porc changent de nature (un choix, pas un
   ingrédient) : un encart distinct plutôt qu'une puce de plus. */
.line-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
  padding-top: 0.85rem;
  border-top: 1px dashed rgba(26, 26, 26, 0.14);
}

.option-pill {
  font-size: 0.74rem;
  line-height: 1.5;
  padding: 0.35rem 0.7rem;
  background: var(--color-secondary);
  border: 1px solid rgba(26, 58, 26, 0.12);
  color: rgba(26, 26, 26, 0.75);
}

.option-pill strong {
  color: var(--color-accent);
  font-weight: 600;
}

/* ── Conditions communes ───────────────────────────────────────────────── */
.common-conditions {
  list-style: none;
  padding: 0;
  margin: 0;
}

.common-conditions li {
  position: relative;
  padding: 0.9rem 0 0.9rem 1.3rem;
  border-bottom: 1px solid rgba(26, 26, 26, 0.08);
  font-size: 0.95rem;
  color: rgba(26, 26, 26, 0.8);
}

.common-conditions li:first-child {
  border-top: 1px solid rgba(26, 26, 26, 0.08);
}

.common-conditions li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 1.35rem;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-gold);
}

/* ── Checklist exigences/engagements ──────────────────────────────────── */
.checklist {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.checklist-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(26, 26, 26, 0.08);
}

.checklist-label {
  display: block;
  font-size: 0.64rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.checklist-req {
  font-size: 0.88rem;
  line-height: 1.6;
  color: rgba(26, 26, 26, 0.6);
}

.checklist-req .checklist-label {
  color: rgba(26, 26, 26, 0.4);
}

.checklist-rep {
  font-size: 0.88rem;
  line-height: 1.6;
  color: rgba(26, 26, 26, 0.85);
}

.checklist-rep .checklist-label {
  color: var(--color-accent);
}

/* ── Points ouverts ────────────────────────────────────────────────────── */
.open-points {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.open-point {
  padding: 1.25rem 1.5rem;
  background: var(--color-white);
  border-left: 3px solid var(--color-gold);
}

.open-point strong {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.open-point p {
  font-size: 0.88rem;
  line-height: 1.65;
  color: rgba(26, 26, 26, 0.68);
}

/* ── Clôture ───────────────────────────────────────────────────────────── */
.zoo-closing {
  padding: clamp(4rem, 8vw, 6.5rem) 0;
  background:
    radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.06), transparent 62%),
    var(--color-primary);
  color: var(--color-white);
  text-align: center;
}

.closing-title {
  font-family: var(--font-heading);
  font-size: clamp(1.7rem, 3.4vw, 2.6rem);
  font-weight: 400;
  color: var(--color-white);
  margin: 0.5rem 0 1.25rem;
}

.closing-sub {
  max-width: 56ch;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.8;
  font-size: 0.96rem;
}

.closing-details {
  margin-top: 2.5rem;
  font-size: 0.88rem;
  line-height: 2;
  color: rgba(255, 255, 255, 0.65);
}

.closing-details a {
  color: var(--color-white);
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
}

.closing-details .sep {
  margin: 0 0.6rem;
  opacity: 0.4;
}

/* ── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .checklist-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .confidential-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>

<!-- Impression : document A4 portrait, une section par page. Bloc global car
     la navbar/footer sont hors de cette vue ; la classe est posée par le
     composant lui-même et retirée au démontage. -->
<style>
@media print {
  @page {
    size: A4 portrait;
    margin: 14mm;
  }

  body.catalogue-page .navbar,
  body.catalogue-page .footer,
  body.catalogue-page .confidential-bar .print-btn {
    display: none !important;
  }

  body.catalogue-page [data-cover-item],
  body.catalogue-page [data-reveal],
  body.catalogue-page [data-reveal-group] > *,
  body.catalogue-page [data-rule] {
    opacity: 1 !important;
    transform: none !important;
  }

  body.catalogue-page .zoo-page {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body.catalogue-page .lines {
    grid-template-columns: 1fr 1fr !important;
  }

  body.catalogue-page .line-card {
    break-inside: avoid;
  }

  body.catalogue-page .section {
    padding: 1rem 0 !important;
  }
}
</style>
