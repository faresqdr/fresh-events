<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// Catalogue traiteur — page unique, lue au défilement. Les données viennent
// d'Odoo (même source que le configurateur de devis) et les prix ne sont
// jamais affichés : c'est un catalogue de présentation partenaires.
// ─────────────────────────────────────────────────────────────────────────────

const FORMULE_CATEGORY = 'Formules'
const SERVICE_CATEGORY = 'Services à la carte'
const CATEGORY_ORDER = ['Entrées', 'Plats', 'Desserts', 'Boissons']

const currentYear = new Date().getFullYear()

// ── État ──────────────────────────────────────────────────────────────────────

const products = ref([])
const loading = ref(true)
const error = ref('')

const rootRef = ref(null)
const navOffset = ref(0)
const activeSection = ref('')
const scrolled = ref(false)

// ── Chargement ────────────────────────────────────────────────────────────────

async function fetchCatalogue() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch('/fresh-events/quote/products')
    const data = await res.json()
    if (data.success) products.value = data.products || []
    else error.value = data.error || 'Impossible de charger le catalogue.'
  } catch {
    error.value = 'Catalogue momentanément indisponible. Merci de réessayer dans quelques instants.'
  } finally {
    loading.value = false
  }
}

// ── Découpage du catalogue ────────────────────────────────────────────────────

const formules = computed(() =>
  products.value.filter(p => p.category === FORMULE_CATEGORY)
)

const services = computed(() =>
  products.value.filter(p => p.category === SERVICE_CATEGORY)
)

const carte = computed(() =>
  products.value.filter(p => p.category !== FORMULE_CATEGORY && p.category !== SERVICE_CATEGORY)
)

function sortCategories(list) {
  return [...list].sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a)
    const ib = CATEGORY_ORDER.indexOf(b)
    if (ia === -1 && ib === -1) return a.localeCompare(b, 'fr')
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })
}

// Un même enrichissement peut être proposé sur plusieurs formules : on le
// présente une fois, en rappelant les formules concernées.
const extras = computed(() => {
  const byProduct = new Map()
  for (const formule of formules.value) {
    for (const supp of formule.supplements || []) {
      const key = supp.product_id ?? `supp-${supp.id}`
      if (!byProduct.has(key)) {
        byProduct.set(key, { key, name: supp.name, description: supp.description || '',
                             image: supp.image || null, formules: [] })
      }
      const extra = byProduct.get(key)
      if (!extra.description && supp.description) extra.description = supp.description
      if (!extra.image && supp.image) extra.image = supp.image
      if (!extra.formules.includes(formule.name)) extra.formules.push(formule.name)
    }
  }
  return [...byProduct.values()]
})

// La carte à l'unité recoupe le contenu des formules : plutôt que d'en refaire
// un catalogue complet, on la résume en une phrase et quelques noms.
const carteSummary = computed(() => {
  // Les produits sans catégorie devis (« Autre ») ne méritent pas un « et 1 autre »
  // dans la phrase : on ne compte que les rubriques du menu.
  const counts = sortCategories([...new Set(carte.value.map(p => p.category))])
    .filter(cat => CATEGORY_ORDER.includes(cat))
    .map(cat => {
      const n = carte.value.filter(p => p.category === cat).length
      const label = n > 1 ? cat.toLowerCase() : cat.toLowerCase().replace(/s$/, '')
      return `${n} ${label}`
    })
  if (counts.length <= 1) return counts[0] || ''
  return counts.slice(0, -1).join(', ') + ' et ' + counts[counts.length - 1]
})

// Un échantillon panaché : un plat par catégorie d'abord, puis on complète.
const carteSample = computed(() => {
  const byCat = new Map()
  for (const p of carte.value) {
    if (!byCat.has(p.category)) byCat.set(p.category, [])
    byCat.get(p.category).push(p.name)
  }
  const picked = []
  const seen = new Set()          // évite « Café ou Décaféiné » deux fois de suite
  const key = (name) => name.toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').slice(0, 12)
  let round = 0
  while (picked.length < 8) {
    let added = false
    for (const cat of sortCategories([...byCat.keys()])) {
      const name = byCat.get(cat)[round]
      if (!name) continue
      added = true
      if (seen.has(key(name))) continue
      seen.add(key(name))
      picked.push(name)
      if (picked.length >= 8) break
    }
    if (!added) break
    round++
  }
  return picked
})

function inclusByCategory(formule) {
  const grouped = new Map()
  for (const dish of formule.inclus || []) {
    const cat = CATEGORY_ORDER.includes(dish.category) ? dish.category : 'Autres'
    if (!grouped.has(cat)) grouped.set(cat, [])
    grouped.get(cat).push(dish)
  }
  return sortCategories([...grouped.keys()])
    .map(cat => ({ category: cat, dishes: grouped.get(cat) }))
}

// ── Sommaire flottant ─────────────────────────────────────────────────────────

const sections = computed(() => [
  { id: 'formules', label: 'Formules', show: formules.value.length > 0 },
  { id: 'enrichissements', label: 'Enrichissements', show: extras.value.length > 0 },
  { id: 'prestations', label: 'Prestations', show: services.value.length > 0 },
].filter(s => s.show))

function goToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - navOffset.value - 56
  window.scrollTo({ top, behavior: 'smooth' })
}

function printCatalogue() {
  window.print()
}

// ── Animations ────────────────────────────────────────────────────────────────
// Tout est réversible : chaque ScrollTrigger est enregistré dans le contexte
// gsap, détruit au démontage de la vue.

let ctx = null

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function buildAnimations() {
  if (typeof window === 'undefined') return
  ctx?.revert()

  if (prefersReducedMotion()) {
    gsap.set('[data-reveal], [data-reveal-group] > *', { opacity: 1, y: 0 })
    return
  }

  ctx = gsap.context(() => {
    // Ouverture : le titre de couverture se pose, ligne à ligne.
    gsap.from('[data-cover-item]', {
      y: 26, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.15,
    })

    // La couverture s'efface en remontant : profondeur, pas de gadget.
    gsap.to('[data-cover-inner]', {
      y: -70, opacity: 0.25, ease: 'none',
      scrollTrigger: { trigger: '[data-cover]', start: 'top top', end: 'bottom top', scrub: 0.6 },
    })

    // Apparitions au fil de la lecture.
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.fromTo(el, { y: 34, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })

    gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
      gsap.fromTo(group.children, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.09,
        immediateRender: false,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      })
    })

    // Le filet doré se trace.
    gsap.utils.toArray('[data-rule]').forEach((el) => {
      gsap.fromTo(el, { scaleX: 0 }, {
        scaleX: 1, transformOrigin: 'left center', duration: 1, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      })
    })

    // Visuels : dévoilement au masque, puis lente respiration en parallaxe.
    gsap.utils.toArray('[data-plate]').forEach((plate) => {
      const img = plate.querySelector('img')
      gsap.fromTo(plate,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: plate, start: 'top 88%', once: true } })
      if (!img) return
      gsap.fromTo(img,
        { yPercent: -6, scale: 1.12 },
        { yPercent: 6, scale: 1.12, ease: 'none',
          scrollTrigger: { trigger: plate, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
    })

    // Numéro de formule en filigrane, décalé au défilement.
    gsap.utils.toArray('[data-watermark]').forEach((el) => {
      gsap.fromTo(el, { y: 30 }, {
        y: -30, ease: 'none',
        scrollTrigger: { trigger: el.closest('.formule'), start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    })

    // Sommaire flottant : section active + apparition passé la couverture.
    sections.value.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      ScrollTrigger.create({
        trigger: el,
        start: 'top 40%',
        end: 'bottom 40%',
        onToggle: ({ isActive }) => { if (isActive) activeSection.value = id },
      })
    })

    ScrollTrigger.create({
      trigger: '[data-cover]',
      start: 'bottom 30%',
      end: 'max',
      onToggle: ({ isActive }) => { scrolled.value = isActive },
    })
  }, rootRef.value)
}

// ── Cycle de vie ──────────────────────────────────────────────────────────────

let navResizeObserver = null

onMounted(async () => {
  document.body.classList.add('catalogue-page')

  const navbar = document.querySelector('.navbar')
  if (navbar) {
    const syncNav = () => { navOffset.value = navbar.offsetHeight }
    syncNav()
    if (typeof ResizeObserver !== 'undefined') {
      navResizeObserver = new ResizeObserver(syncNav)
      navResizeObserver.observe(navbar)
    }
  }

  await fetchCatalogue()
  await nextTick()
  buildAnimations()
  ScrollTrigger.refresh()

  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
  }
})

// Les visuels arrivent en base64 dans le JSON : la hauteur des sections change
// une fois les images posées, il faut recalculer les déclencheurs.
watch(products, async () => {
  await nextTick()
  ScrollTrigger.refresh()
})

onBeforeUnmount(() => {
  document.body.classList.remove('catalogue-page')
  navResizeObserver?.disconnect()
  ctx?.revert()
})
</script>

<template>
  <div class="catalogue" ref="rootRef" :style="{ '--cat-nav-h': navOffset + 'px' }">

    <!-- ── Couverture ─────────────────────────────────────────────────────── -->
    <section class="cover" data-cover>
      <div class="cover-inner" data-cover-inner>
        <div class="cover-frame">
          <p class="cover-house" data-cover-item>Fresh&nbsp;Events</p>
          <div class="rule rule--gold rule--center" data-cover-item></div>
          <h1 class="cover-title" data-cover-item>Catalogue<br>Traiteur</h1>
          <p class="cover-sub" data-cover-item>Formules · Enrichissements · Prestations</p>
          <div class="cover-foot" data-cover-item>
            <p class="cover-edition">Édition {{ currentYear }}</p>
            <p class="cover-places">Amnéville · Moselle · Grand Est · Luxembourg</p>
          </div>
        </div>
        <button class="cover-cue" data-cover-item @click="goToSection(sections[0]?.id || 'edito')">
          <span>Découvrir</span>
          <span class="cover-cue-line"></span>
        </button>
      </div>
    </section>

    <!-- ── Sommaire flottant ──────────────────────────────────────────────── -->
    <nav
      class="section-nav"
      :class="{ 'is-visible': scrolled }"
      :style="{ top: navOffset + 'px' }"
      aria-label="Sections du catalogue"
    >
      <div class="container section-nav-inner">
        <span class="section-nav-house">Catalogue {{ currentYear }}</span>
        <div class="section-nav-links">
          <button
            v-for="s in sections" :key="s.id"
            class="section-nav-link"
            :class="{ 'is-active': activeSection === s.id }"
            @click="goToSection(s.id)"
          >{{ s.label }}</button>
        </div>
        <button class="section-nav-print" @click="printCatalogue">Imprimer / PDF</button>
      </div>
    </nav>

    <!-- ── Édito ──────────────────────────────────────────────────────────── -->
    <section id="edito" class="edito section">
      <div class="container-narrow">
        <p class="eyebrow" data-reveal>Depuis Amnéville</p>
        <h2 class="section-title" data-reveal>Une cuisine d'événement,<br>pensée comme une table.</h2>
        <div class="rule rule--gold" data-rule></div>
        <div class="edito-columns" data-reveal>
          <p>
            Nos formules sont préparées chaque jour dans notre cuisine d'Amnéville,
            à trente minutes de Luxembourg-Ville. Produits frais, de saison,
            travaillés sur place : rien n'arrive tout fait.
          </p>
          <p>
            Ce catalogue présente nos ensembles clé en main, les enrichissements qui
            les prolongent, notre carte à l'unité et les prestations que nous assurons
            sur site — personnel, matériel, logistique.
          </p>
        </div>
        <blockquote class="pull-quote" data-reveal>
          « Une prestation réussie ne se voit pas — elle se goûte,
          et tout le reste paraît simple. »
        </blockquote>
        <p class="edito-note" data-reveal>
          Catalogue de présentation. Les tarifs sont établis sur devis, selon le format,
          le volume et la logistique de votre événement.
        </p>
      </div>
    </section>

    <!-- ── États ──────────────────────────────────────────────────────────── -->
    <section v-if="loading" class="section state-section">
      <div class="container-narrow state">
        <div class="state-mark">FE</div>
        <p>Ouverture du catalogue…</p>
      </div>
    </section>

    <section v-else-if="error" class="section state-section">
      <div class="container-narrow state">
        <p>{{ error }}</p>
        <button class="btn-ghost" @click="fetchCatalogue">Réessayer</button>
      </div>
    </section>

    <template v-else>

      <!-- ── Formules ─────────────────────────────────────────────────────── -->
      <section v-if="formules.length" id="formules" class="section formules-section">
        <div class="container">
          <header class="section-head">
            <p class="eyebrow" data-reveal>Clé en main</p>
            <h2 class="section-title" data-reveal>Nos formules</h2>
            <div class="rule rule--gold" data-rule></div>
            <p class="section-intro" data-reveal>
              Des ensembles pensés pour un service fluide et généreux. Chacun se décline
              et s'enrichit à la demande.
            </p>
          </header>
        </div>

        <article
          v-for="(formule, index) in formules" :key="formule.id"
          class="formule"
          :class="{ 'formule--flip': index % 2 === 1 }"
        >
          <div class="container formule-inner">
            <div class="formule-plate" data-plate>
              <img v-if="formule.image" :src="formule.image" :alt="formule.name" />
              <div v-else class="plate-fallback"><span>FE</span></div>
            </div>

            <div class="formule-text">
              <span class="formule-watermark" data-watermark>{{ String(index + 1).padStart(2, '0') }}</span>
              <p class="eyebrow" data-reveal>
                Formule {{ String(index + 1).padStart(2, '0') }} / {{ String(formules.length).padStart(2, '0') }}
              </p>
              <h3 class="formule-name" data-reveal>{{ formule.name }}</h3>
              <div class="rule rule--gold" data-rule></div>
              <p v-if="formule.description" class="formule-desc" data-reveal>{{ formule.description }}</p>

              <div v-if="(formule.inclus || []).length" class="composition" data-reveal>
                <p class="block-label">Composition</p>
                <div class="composition-groups">
                  <div v-for="group in inclusByCategory(formule)" :key="group.category" class="composition-group">
                    <span class="composition-cat">{{ group.category }}</span>
                    <ul>
                      <li v-for="dish in group.dishes" :key="dish.id">{{ dish.name }}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div v-if="(formule.supplements || []).length" class="formule-options" data-reveal>
                <p class="block-label">Enrichissements proposés</p>
                <ul class="options-inline">
                  <li v-for="supp in formule.supplements" :key="supp.id">{{ supp.name }}</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </section>

      <!-- ── Enrichissements ──────────────────────────────────────────────── -->
      <section v-if="extras.length" id="enrichissements" class="section section--cream">
        <div class="container">
          <header class="section-head">
            <p class="eyebrow" data-reveal>Le supplément d'âme</p>
            <h2 class="section-title" data-reveal>Enrichissements</h2>
            <div class="rule rule--gold" data-rule></div>
            <p class="section-intro" data-reveal>
              Chaque formule s'augmente d'options à la carte, à choisir selon l'occasion
              et le moment de la journée.
            </p>
          </header>

          <div class="extras-grid" data-reveal-group>
            <article v-for="extra in extras" :key="extra.key" class="extra">
              <div class="extra-plate">
                <img v-if="extra.image" :src="extra.image" :alt="extra.name" />
                <div v-else class="plate-fallback plate-fallback--sm"><span>✦</span></div>
              </div>
              <div class="extra-text">
                <h3>{{ extra.name }}</h3>
                <p v-if="extra.description">{{ extra.description }}</p>
                <p class="extra-formules">{{ extra.formules.join(' · ') }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ── Mention « à la carte » ───────────────────────────────────────
           Les plats de la carte composent déjà les formules : en refaire une
           section illustrée ferait doublon. On l'évoque en un paragraphe. -->
      <section v-if="carte.length" id="carte" class="carte-note">
        <div class="container-narrow carte-note-inner">
          <p class="eyebrow" data-reveal>Sur mesure</p>
          <h2 class="carte-note-title" data-reveal>Tout se compose</h2>
          <div class="rule rule--gold rule--center" data-rule></div>
          <p class="carte-note-text" data-reveal>
            Les plats qui composent nos formules se choisissent, se remplacent et se
            panachent — <strong>{{ carteSummary }}</strong> disponibles à l'unité.
            Un menu se réécrit pour un lieu, une saison, un budget ou une contrainte
            alimentaire.
          </p>
          <p v-if="carteSample.length" class="carte-note-sample" data-reveal>
            {{ carteSample.join(' · ') }}…
          </p>
          <RouterLink to="/devis" class="carte-note-link" data-reveal>
            Composer un menu <span>→</span>
          </RouterLink>
        </div>
      </section>

      <!-- ── Prestations ──────────────────────────────────────────────────── -->
      <section v-if="services.length" id="prestations" class="section section--cream">
        <div class="container-narrow">
          <header class="section-head">
            <p class="eyebrow" data-reveal>Sur site</p>
            <h2 class="section-title" data-reveal>Prestations</h2>
            <div class="rule rule--gold" data-rule></div>
            <p class="section-intro" data-reveal>
              Au-delà de l'assiette : personnel, matériel, logistique et service.
              Nous prenons l'événement en charge de bout en bout.
            </p>
          </header>

          <ul class="services" data-reveal-group>
            <li v-for="service in services" :key="service.id">
              <strong>{{ service.name }}</strong>
              <span v-if="service.description">{{ service.description }}</span>
            </li>
          </ul>
        </div>
      </section>

    </template>

    <!-- ── Clôture ────────────────────────────────────────────────────────── -->
    <section class="closing">
      <div class="container-narrow closing-inner">
        <p class="cover-house" data-reveal>Fresh&nbsp;Events</p>
        <div class="rule rule--gold rule--center" data-rule></div>
        <h2 class="closing-title" data-reveal>Construisons votre table</h2>
        <p class="closing-sub" data-reveal>
          Ce catalogue est un point de départ. Nos chefs adaptent chaque menu à votre lieu,
          votre budget et vos convives.
        </p>
        <div class="closing-actions" data-reveal-group>
          <RouterLink to="/devis" class="btn-gold">Construire un devis</RouterLink>
          <RouterLink to="/contact" class="btn-gold btn-gold--ghost">Nous écrire</RouterLink>
        </div>
        <div class="closing-details" data-reveal>
          <p>105 rue des Thermes (Hôtel Saint Eloi) — 57360 Amnéville</p>
          <p>
            <a href="tel:+33372396481">03 72 39 64 81</a>
            <span class="sep">·</span>
            <a href="mailto:contact@fresh-events.fr">contact@fresh-events.fr</a>
          </p>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.catalogue {
  overflow-x: clip;
  background: var(--color-white);
}

/* ── Rythme des sections ───────────────────────────────────────────────── */

.section {
  padding: clamp(4.5rem, 9vw, 8rem) 0;
}

.section--cream {
  background: var(--color-secondary);
}

.section-head {
  max-width: 640px;
  margin: 0 auto clamp(3rem, 6vw, 4.5rem);
}

.section .container,
.formules-section .container {
  max-width: 1150px;
}

.eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.section-title {
  font-family: var(--font-heading);
  font-size: clamp(1.9rem, 3.4vw, 3rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0;
}

.section-intro {
  max-width: 54ch;
  color: rgba(26, 26, 26, 0.75);
  line-height: 1.75;
  font-size: 0.98rem;
}

.rule {
  width: 56px;
  height: 1px;
  background: linear-gradient(to right, var(--color-gold), rgba(201, 169, 97, 0.2));
  margin: 1.35rem 0 1.75rem;
}

.rule--center {
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(to right, transparent, var(--color-gold), transparent);
  width: 90px;
}

.block-label {
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(26, 26, 26, 0.45);
  margin-bottom: 1rem;
}

/* ── Couverture ────────────────────────────────────────────────────────── */

.cover {
  position: relative;
  min-height: calc(100svh - var(--cat-nav-h, 0px));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(3rem, 8vw, 6rem) 1.25rem;
  background:
    radial-gradient(ellipse at 50% 35%, rgba(255, 255, 255, 0.07), transparent 62%),
    var(--color-primary);
  color: var(--color-white);
  text-align: center;
  overflow: hidden;
}

.cover-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(2.5rem, 6vw, 4rem);
}

.cover-frame {
  border: 1px solid rgba(201, 169, 97, 0.35);
  padding: clamp(2.25rem, 6vw, 4.5rem) clamp(1.75rem, 6vw, 5rem);
  max-width: 720px;
}

.cover-house {
  font-family: var(--font-body);
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
}

.cover-title {
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 5.5vw, 4rem);
  font-weight: 400;
  line-height: 1.03;
  letter-spacing: -0.025em;
  color: var(--color-white);
  margin: 0;
}

.cover-sub {
  margin-top: 1.1rem;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.cover-foot {
  margin-top: clamp(1.75rem, 4vw, 2.75rem);
  padding-top: 1.35rem;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
}

.cover-edition {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  letter-spacing: 0.1em;
  color: var(--color-gold);
}

.cover-places {
  margin-top: 0.45rem;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}

.cover-cue {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  transition: color var(--transition-fast);
}

.cover-cue:hover {
  color: var(--color-gold);
}

.cover-cue-line {
  width: 1px;
  height: 46px;
  background: linear-gradient(to bottom, rgba(201, 169, 97, 0.9), transparent);
  animation: cue-slide 2.4s ease-in-out infinite;
}

@keyframes cue-slide {
  0%, 100% { transform: scaleY(0.55); transform-origin: top; opacity: 0.5; }
  50%      { transform: scaleY(1);    transform-origin: top; opacity: 1; }
}

/* ── Sommaire flottant ─────────────────────────────────────────────────── */

.section-nav {
  position: sticky;
  z-index: 500;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(26, 58, 26, 0.08);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: opacity var(--transition-base), transform var(--transition-base),
              visibility 0s linear var(--transition-base);
}

.section-nav.is-visible {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition-delay: 0s;
}

.section-nav-inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
}

.section-nav-house {
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(26, 26, 26, 0.35);
  white-space: nowrap;
}

.section-nav-links {
  display: flex;
  gap: 0.35rem;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
}

.section-nav-links::-webkit-scrollbar { display: none; }

.section-nav-link {
  border: none;
  background: none;
  cursor: pointer;
  white-space: nowrap;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(26, 26, 26, 0.6);
  padding: 0.4rem 0.75rem;
  border-bottom: 1px solid transparent;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.section-nav-link:hover { color: var(--color-primary); }

.section-nav-link.is-active {
  color: var(--color-primary);
  border-bottom-color: var(--color-gold);
}

.section-nav-print {
  border: 1px solid rgba(26, 58, 26, 0.2);
  background: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-primary);
  padding: 0.45rem 0.9rem;
  white-space: nowrap;
  transition: all var(--transition-fast);
}

.section-nav-print:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

/* ── Édito ─────────────────────────────────────────────────────────────── */

.edito-columns {
  columns: 2;
  column-gap: clamp(2rem, 4vw, 3.5rem);
  margin-bottom: 2.5rem;
}

.edito-columns p {
  margin-bottom: 1rem;
  line-height: 1.8;
  font-size: 0.97rem;
  color: rgba(26, 26, 26, 0.78);
  break-inside: avoid;
}

.pull-quote {
  margin: 0 0 2rem;
  padding: 1.75rem 0;
  border-top: 1px solid rgba(201, 169, 97, 0.4);
  border-bottom: 1px solid rgba(201, 169, 97, 0.4);
  font-family: var(--font-heading);
  font-size: clamp(1.2rem, 2.2vw, 1.65rem);
  line-height: 1.5;
  color: var(--color-primary);
  text-align: center;
}

.edito-note {
  font-size: 0.82rem;
  font-style: italic;
  color: rgba(26, 26, 26, 0.5);
  text-align: center;
}

/* ── Formules ──────────────────────────────────────────────────────────── */

.formule {
  padding: clamp(2.5rem, 5vw, 4.5rem) 0;
}

.formule-inner {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(2rem, 4vw, 4rem);
  align-items: center;
  max-width: 1150px;
  margin: 0 auto;
}

.formule--flip .formule-plate {
  order: 2;
}

.formule-plate {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--color-tertiary);
  clip-path: inset(0% 0% 0% 0%);
  will-change: clip-path;
}

.formule-plate img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plate-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-tertiary));
}

.plate-fallback span {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  letter-spacing: 0.12em;
  color: var(--color-accent);
  opacity: 0.35;
}

.plate-fallback--sm span { font-size: 1.35rem; }

.formule-text {
  position: relative;
}

.formule-watermark {
  position: absolute;
  top: -3.5rem;
  right: -0.5rem;
  z-index: 0;
  font-family: var(--font-heading);
  font-size: clamp(4.5rem, 8vw, 7.5rem);
  line-height: 1;
  color: var(--color-primary);
  opacity: 0.045;
  pointer-events: none;
  user-select: none;
}

/* Le texte passe au-dessus du filigrane. */
.formule-text > *:not(.formule-watermark) {
  position: relative;
  z-index: 1;
}

.formule-name {
  font-family: var(--font-heading);
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0;
}

.formule-desc {
  font-size: 0.98rem;
  line-height: 1.8;
  color: rgba(26, 26, 26, 0.78);
  margin-bottom: 2rem;
  white-space: pre-line;
}

.composition-groups {
  columns: 2;
  column-gap: 2rem;
}

.composition-group {
  break-inside: avoid;
  margin-bottom: 1.1rem;
}

.composition-cat {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 0.35rem;
}

.composition-group ul,
.options-inline {
  list-style: none;
  padding: 0;
  margin: 0;
}

.composition-group li {
  position: relative;
  padding-left: 0.9rem;
  font-size: 0.92rem;
  line-height: 1.65;
  color: rgba(26, 26, 26, 0.85);
}

.composition-group li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.75em;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--color-gold);
}

.formule-options {
  margin-top: 1.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(26, 26, 26, 0.08);
}

.options-inline {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.options-inline li {
  font-size: 0.82rem;
  padding: 0.32rem 0.85rem;
  border: 1px solid rgba(201, 169, 97, 0.55);
  color: rgba(26, 26, 26, 0.78);
}

/* ── Enrichissements ───────────────────────────────────────────────────── */

.extras-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

.extra {
  display: flex;
  gap: 1.25rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(26, 26, 26, 0.08);
}

.extra-plate {
  flex-shrink: 0;
  width: 112px;
  height: 112px;
  overflow: hidden;
  background: var(--color-tertiary);
}

.extra-plate img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.extra:hover .extra-plate img { transform: scale(1.06); }

.extra-text h3 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 500;
  margin: 0 0 0.4rem;
}

.extra-text p {
  font-size: 0.9rem;
  line-height: 1.65;
  color: rgba(26, 26, 26, 0.7);
}

.extra-formules {
  margin-top: 0.6rem;
  font-size: 0.7rem !important;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(26, 26, 26, 0.35) !important;
}

/* ── Mention « à la carte » ────────────────────────────────────────────── */

.carte-note {
  padding: clamp(3.5rem, 7vw, 6rem) 0;
  background: var(--color-secondary);
  border-top: 1px solid rgba(26, 58, 26, 0.08);
  border-bottom: 1px solid rgba(26, 58, 26, 0.08);
}

.carte-note-inner {
  text-align: center;
  max-width: 760px;
}

.carte-note-title {
  font-family: var(--font-heading);
  font-size: clamp(1.6rem, 2.8vw, 2.35rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0;
}

.carte-note-text {
  max-width: 58ch;
  margin: 0 auto;
  font-size: 1rem;
  line-height: 1.85;
  color: rgba(26, 26, 26, 0.78);
}

.carte-note-text strong {
  font-weight: 600;
  color: var(--color-primary);
}

.carte-note-sample {
  margin-top: 1.5rem;
  font-family: var(--font-heading);
  font-size: clamp(0.95rem, 1.4vw, 1.15rem);
  line-height: 1.9;
  color: rgba(26, 26, 26, 0.55);
}

.carte-note-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2rem;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--color-gold);
}

.carte-note-link span {
  transition: transform var(--transition-base);
}

.carte-note-link:hover span {
  transform: translateX(5px);
}

/* ── Prestations ───────────────────────────────────────────────────────── */

.services {
  list-style: none;
  padding: 0;
  margin: 0;
}

.services li {
  padding: 1.35rem 0;
  border-bottom: 1px solid rgba(26, 26, 26, 0.1);
}

.services li:first-child {
  border-top: 1px solid rgba(26, 26, 26, 0.1);
}

.services strong {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
}

.services span {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(26, 26, 26, 0.68);
}

/* ── États ─────────────────────────────────────────────────────────────── */

.state-section { background: var(--color-secondary); }

.state {
  text-align: center;
  color: rgba(26, 26, 26, 0.6);
}

.state-mark {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  letter-spacing: 0.15em;
  color: var(--color-accent);
  margin-bottom: 1rem;
  animation: state-pulse 1.8s ease-in-out infinite;
}

@keyframes state-pulse {
  0%, 100% { opacity: 0.2; }
  50%      { opacity: 0.5; }
}

.btn-ghost {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.8rem 2rem;
  border: 1px solid var(--color-primary);
  background: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
  transition: all var(--transition-fast);
}

.btn-ghost:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

/* ── Clôture ───────────────────────────────────────────────────────────── */

.closing {
  padding: clamp(5rem, 10vw, 8rem) 0;
  background:
    radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.06), transparent 62%),
    var(--color-primary);
  color: var(--color-white);
  text-align: center;
}

.closing-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3.6vw, 2.8rem);
  font-weight: 400;
  color: var(--color-white);
  margin: 0.5rem 0 1.25rem;
}

.closing-sub {
  max-width: 48ch;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.8;
  font-size: 0.98rem;
}

.closing-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2.5rem 0;
}

.btn-gold {
  padding: 0.95rem 2.25rem;
  border: 1px solid var(--color-gold);
  background: var(--color-gold);
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: all var(--transition-fast);
}

.btn-gold:hover {
  background: transparent;
  color: var(--color-gold);
}

.btn-gold--ghost {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.35);
  color: rgba(255, 255, 255, 0.9);
}

.btn-gold--ghost:hover {
  border-color: var(--color-white);
  color: var(--color-white);
}

.closing-details {
  font-size: 0.9rem;
  line-height: 2;
  color: rgba(255, 255, 255, 0.7);
}

.closing-details a {
  color: var(--color-white);
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
}

.closing-details a:hover {
  color: var(--color-gold);
  border-color: var(--color-gold);
}

.closing-details .sep {
  margin: 0 0.6rem;
  opacity: 0.4;
}

/* ── Responsive ────────────────────────────────────────────────────────── */

@media (max-width: 900px) {
  .formule-inner {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }

  .formule--flip .formule-plate {
    order: 0;
  }

  .formule-plate {
    aspect-ratio: 16 / 10;
  }

  .formule-watermark {
    top: -3.5rem;
    font-size: 5rem;
  }

  .edito-columns {
    columns: 1;
  }
}

@media (max-width: 640px) {
  .composition-groups {
    columns: 1;
  }

  .extra {
    gap: 1rem;
  }

  .extra-plate {
    width: 88px;
    height: 88px;
  }

  .section-nav-house,
  .section-nav-print {
    display: none;
  }
}
</style>

<!-- Impression : le catalogue sort en continu, une section par page, sans le
     mobilier du site. Bloc global car la navbar et le footer sont rendus hors
     de cette vue — la classe est posée puis retirée par le composant. -->
<style>
@media print {
  @page {
    size: A4;
    margin: 14mm;
  }

  body.catalogue-page .navbar,
  body.catalogue-page .footer,
  body.catalogue-page .section-nav,
  body.catalogue-page .cover-cue,
  body.catalogue-page .closing-actions {
    display: none !important;
  }

  body.catalogue-page .catalogue {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Les animations laissent des éléments à opacité 0 : on force l'état final. */
  body.catalogue-page [data-reveal],
  body.catalogue-page [data-reveal-group] > *,
  body.catalogue-page [data-cover-item],
  body.catalogue-page [data-cover-inner],
  body.catalogue-page [data-plate],
  body.catalogue-page [data-rule] {
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
  }

  body.catalogue-page .cover {
    min-height: 0 !important;
    padding: 3rem 0 !important;
  }

  body.catalogue-page .section,
  body.catalogue-page .closing {
    padding: 1.5rem 0 !important;
    break-before: page;
    page-break-before: always;
  }

  body.catalogue-page .formule,
  body.catalogue-page .extra,
  body.catalogue-page .services li {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
</style>
