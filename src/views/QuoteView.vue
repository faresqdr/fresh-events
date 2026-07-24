<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

// ── Constants ─────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 4
const FORMULE_CATEGORIES = ['Formules']
const SERVICE_CATEGORIES = ['Services à la carte']
const CATEGORY_ORDER = ['Entrées', 'Plats', 'Desserts', 'Boissons']

const eventTypes = [
  { id: 'seminaire', label: 'Séminaire & Conférence', sub: 'Team building, formations, meetings d\'entreprise', icon: '💼' },
  { id: 'cocktail', label: 'Cocktail & Réception', sub: 'Soirée d\'entreprise, inauguration, networking', icon: '🥂' },
  { id: 'anniversaire', label: 'Anniversaire & Privé', sub: 'Anniversaire, fête privée, célébration', icon: '🎉' },
  { id: 'mariage', label: 'Mariage & Cérémonie', sub: 'Réception, vin d\'honneur, banquet', icon: '💐' },
  { id: 'festival', label: 'Festival & Grand Format', sub: 'Événements publics, concerts, foires, parcs', icon: '🎪' },
  { id: 'autre', label: 'Autre projet', sub: 'Tout autre type de prestation', icon: '📋' },
]

const timeSlots = ['Matin', 'Midi / Déjeuner', 'Soir / Dîner', 'Journée complète']

const months = [
  { value: '01', label: 'Janvier' }, { value: '02', label: 'Février' },
  { value: '03', label: 'Mars' }, { value: '04', label: 'Avril' },
  { value: '05', label: 'Mai' }, { value: '06', label: 'Juin' },
  { value: '07', label: 'Juillet' }, { value: '08', label: 'Août' },
  { value: '09', label: 'Septembre' }, { value: '10', label: 'Octobre' },
  { value: '11', label: 'Novembre' }, { value: '12', label: 'Décembre' },
]

const currentYear = new Date().getFullYear()
const availableYears = Array.from({ length: 4 }, (_, i) => currentYear + i)

const festivalServiceTypes = [
  { id: 'stands', label: 'Stands alimentaires', icon: '🍔' },
  { id: 'foodcourt', label: 'Food Court centralisé', icon: '🏪' },
  { id: 'assis', label: 'Service assis / Lounge VIP', icon: '🍽️' },
  { id: 'mix', label: 'Mix (stands + service assis)', icon: '⚡' },
]

const festivalFlux = [
  { id: 'small', label: '< 500 personnes / jour' },
  { id: 'medium', label: '500 – 2 000 / jour' },
  { id: 'large', label: '2 000 – 10 000 / jour' },
  { id: 'xlarge', label: '10 000+ / jour' },
]

const festivalDurations = ['1 jour', '2 – 3 jours', '4 – 7 jours', 'Plus d\'une semaine']

// ── State ─────────────────────────────────────────────────────────────────────

const step = ref(1)
const wizardRef = ref(null)

const event = reactive({
  type: '', name: '', date: '', location: '', guests: 50, timeSlot: '', duration: '',
})

const dateDay = ref('')
const dateMonth = ref('')
const dateYear = ref('')

watch([dateDay, dateMonth, dateYear], ([d, m, y]) => {
  event.date = (d && m && y) ? `${y}-${m}-${d.padStart(2, '0')}` : ''
})

const locationPreset = ref('')

function setLocationPreset(preset) {
  locationPreset.value = preset
  event.location = preset === 'local' ? 'Fresh Food Amnéville' : ''
}

const festival = reactive({
  serviceType: '', stands: '', flux: '', duration: '', notes: '',
})

const products = ref([])
const productsLoading = ref(false)
const productsError = ref('')

const selectionMode = ref('formule')
const selectedFormule = ref(null)
const selectedServices = ref([])

const alacarteQuantities = reactive({})

function adjustAlacarteQty(id, delta) {
  const next = Math.max(0, (alacarteQuantities[id] || 0) + delta)
  if (next === 0) delete alacarteQuantities[id]
  else alacarteQuantities[id] = next
}

function setAlacarteQty(id, val) {
  const n = Math.max(0, parseInt(val) || 0)
  if (n === 0) delete alacarteQuantities[id]
  else alacarteQuantities[id] = n
}

const dishQuantities = reactive({})

function adjustDishQty(id, delta) {
  const next = Math.max(0, (dishQuantities[id] || 0) + delta)
  if (next === 0) delete dishQuantities[id]
  else dishQuantities[id] = next
}

function setDishQty(id, val) {
  const n = Math.max(0, parseInt(val) || 0)
  if (n === 0) delete dishQuantities[id]
  else dishQuantities[id] = n
}

const contact = reactive({
  name: '', company: '', email: '', phone: '', message: '',
})

const isSubmitting = ref(false)
const submitError = ref('')
const quoteRef = ref('')

// ── Computed ─────────────────────────────────────────────────────────────────

const isFestival = computed(() => event.type === 'festival')

const formules = computed(() =>
  products.value.filter(p => FORMULE_CATEGORIES.includes(p.category))
)

const optionalServices = computed(() =>
  products.value.filter(p => SERVICE_CATEGORIES.includes(p.category))
)

const alacarteProducts = computed(() =>
  products.value.filter(p => !FORMULE_CATEGORIES.includes(p.category) && !SERVICE_CATEGORIES.includes(p.category))
)

const alacarteCategories = computed(() => {
  const found = new Set(alacarteProducts.value.map(p => p.category))
  return [...found].sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a)
    const ib = CATEGORY_ORDER.indexOf(b)
    if (ia === -1 && ib === -1) return a.localeCompare(b, 'fr')
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })
})

const productsByCategory = computed(() => {
  const map = {}
  for (const cat of alacarteCategories.value) {
    map[cat] = alacarteProducts.value.filter(p => p.category === cat)
  }
  return map
})

// Plats disponibles dans le panel "répartir" : uniquement si la formule a des produits définis dans Odoo
const dishableProducts = computed(() => {
  if (!selectedFormuleObj.value) return []
  const inclus = selectedFormuleObj.value.inclus || []
  if (inclus.length === 0) return []
  const inclusIds = new Set(inclus.map(d => d.id))
  return alacarteProducts.value.filter(p => inclusIds.has(p.id))
})

const dishableCategories = computed(() => {
  const found = new Set(dishableProducts.value.map(p => p.category))
  return [...found].sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a)
    const ib = CATEGORY_ORDER.indexOf(b)
    if (ia === -1 && ib === -1) return a.localeCompare(b, 'fr')
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })
})

// Smart increments: adapt to group size, avoid silly values
const smartIncrements = computed(() => {
  const n = event.guests || 10
  if (n <= 10) return [2, 5]
  if (n <= 25) return [5, 10]
  if (n <= 60) return [5, 10, 25]
  return [10, 25, 50]
})

const selectedFormuleObj = computed(() =>
  formules.value.find(p => p.id === selectedFormule.value) || null
)

const selectedAlacarteObjs = computed(() =>
  alacarteProducts.value.filter(p => (alacarteQuantities[p.id] || 0) > 0)
)

const selectedServiceObjs = computed(() =>
  optionalServices.value.filter(p => selectedServices.value.includes(p.id))
)

const formuleTotal = computed(() =>
  selectedFormuleObj.value ? selectedFormuleObj.value.price * event.guests : 0
)
const formuleTotalTTC = computed(() =>
  selectedFormuleObj.value ? (selectedFormuleObj.value.price_ttc || selectedFormuleObj.value.price) * event.guests : 0
)

const alacarteTotal = computed(() =>
  selectedAlacarteObjs.value.reduce((sum, p) => sum + p.price * (alacarteQuantities[p.id] || 0), 0)
)
const alacarteTotalTTC = computed(() =>
  selectedAlacarteObjs.value.reduce((sum, p) => sum + (p.price_ttc || p.price) * (alacarteQuantities[p.id] || 0), 0)
)

const servicesTotal = computed(() =>
  selectedServiceObjs.value.reduce((sum, p) => sum + p.price, 0)
)
const servicesTotalTTC = computed(() =>
  selectedServiceObjs.value.reduce((sum, p) => sum + (p.price_ttc || p.price), 0)
)

const grandTotal = computed(() => {
  if (selectionMode.value === 'formule') return formuleTotal.value + servicesTotal.value
  return alacarteTotal.value + servicesTotal.value
})
const grandTotalTTC = computed(() => {
  if (selectionMode.value === 'formule') return formuleTotalTTC.value + servicesTotalTTC.value
  return alacarteTotalTTC.value + servicesTotalTTC.value
})

const hasProductSelection = computed(() => {
  if (selectionMode.value === 'formule') return !!selectedFormule.value
  return Object.values(alacarteQuantities).some(q => q > 0)
})

function dishCategoryTotal(cat) {
  return dishableProducts.value
    .filter(p => p.category === cat)
    .reduce((sum, p) => sum + (dishQuantities[p.id] || 0), 0)
}

const canNext = computed(() => {
  if (step.value === 1) return !!event.type
  if (step.value === 2) return !!event.date && !!event.location && event.guests > 0 && !!event.timeSlot
  if (step.value === 3) {
    if (isFestival.value) return !!festival.serviceType && !!festival.flux && !!festival.duration
    return hasProductSelection.value
  }
  if (step.value === 4) return !!contact.name && !!contact.company && !!contact.email && !!contact.phone
  return false
})

const stepLabels = computed(() => ['Type', 'Événement', isFestival.value ? 'Format' : 'Menu', 'Contact'])

// ── Methods ──────────────────────────────────────────────────────────────────

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

async function fetchProducts() {
  productsLoading.value = true
  productsError.value = ''
  try {
    const res = await fetch('/fresh-events/quote/products')
    const data = await res.json()
    if (data.success) products.value = data.products
    else productsError.value = data.error || 'Impossible de charger le catalogue.'
  } catch {
    productsError.value = 'Erreur de connexion au serveur.'
  } finally {
    productsLoading.value = false
  }
}

function switchFormule(id) {
  if (selectedFormule.value === id) return
  if (Object.keys(dishQuantities).length > 0) {
    if (!window.confirm('Vous avez déjà réparti des plats. Changer de formule effacera ces choix. Continuer ?')) return
    Object.keys(dishQuantities).forEach(k => delete dishQuantities[k])
  }
  selectedFormule.value = id
}

function switchMode(mode) {
  if (selectionMode.value === mode) return
  if (selectionMode.value === 'formule' && Object.keys(dishQuantities).length > 0) {
    if (!window.confirm('Vous avez réparti des plats dans la formule. Passer en composition libre effacera ces choix. Continuer ?')) return
    Object.keys(dishQuantities).forEach(k => delete dishQuantities[k])
  }
  selectionMode.value = mode
}

function toggleService(id) {
  const idx = selectedServices.value.indexOf(id)
  if (idx === -1) selectedServices.value.push(id)
  else selectedServices.value.splice(idx, 1)
}

function scrollToWizard() {
  wizardRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function nextStep() {
  if (!canNext.value) return
  if (step.value === 2 && !isFestival.value && products.value.length === 0) fetchProducts()
  step.value++
  scrollToWizard()
}

function prevStep() {
  if (step.value > 1) { step.value--; scrollToWizard() }
}

async function submitQuote() {
  if (!canNext.value) return
  isSubmitting.value = true
  submitError.value = ''

  const lines = []

  if (isFestival.value) {
    // Festival: no product lines
  } else if (selectionMode.value === 'formule' && selectedFormuleObj.value) {
    const f = selectedFormuleObj.value
    lines.push({ product_id: f.id, quantity: event.guests, price: f.price })
    for (const [idStr, qty] of Object.entries(dishQuantities)) {
      if (qty > 0) lines.push({ product_id: parseInt(idStr), quantity: qty, price: 0 })
    }
    selectedServiceObjs.value.forEach(s => lines.push({ product_id: s.id, quantity: 1, price: s.price }))
  } else {
    for (const [idStr, qty] of Object.entries(alacarteQuantities)) {
      if (qty > 0) {
        const p = alacarteProducts.value.find(x => x.id === parseInt(idStr))
        if (p) lines.push({ product_id: p.id, quantity: qty, price: p.price })
      }
    }
    selectedServiceObjs.value.forEach(s => lines.push({ product_id: s.id, quantity: 1, price: s.price }))
  }

  const eventPayload = { ...event }
  if (isFestival.value) {
    eventPayload.festival_service_type = festival.serviceType
    eventPayload.festival_flux = festival.flux
    eventPayload.festival_duration = festival.duration
    eventPayload.festival_notes = festival.notes
  }

  try {
    const res = await fetch('/fresh-events/quote/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventPayload, lines, contact }),
    })
    const data = await res.json()
    if (data.success) {
      quoteRef.value = data.quote_ref
      step.value = 5
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      submitError.value = data.error || 'Une erreur est survenue.'
    }
  } catch {
    submitError.value = 'Erreur de connexion. Veuillez réessayer.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Devis traiteur événementiel en ligne — Fresh Events',
    description: 'Configurez votre prestation de restauration événementielle en ligne en quelques minutes.',
    provider: {
      '@type': 'FoodEstablishment',
      name: 'Fresh Events — Fresh Food Amnéville',
      address: { '@type': 'PostalAddress', addressLocality: 'Amnéville', addressRegion: 'Moselle', addressCountry: 'FR' },
    },
    areaServed: ['Moselle', 'Meurthe-et-Moselle', 'Grand Est', 'Lorraine'],
    serviceType: ['Restauration événementielle', 'Traiteur séminaire', 'Traiteur mariage', 'Traiteur festival'],
  })
  document.head.appendChild(script)
})
</script>

<template>
  <div class="quote-view">

    <!-- Hero -->
    <section class="hero-section bg-primary">
      <div class="container text-center">
        <p class="uppercase hero-eyebrow">Traiteur événementiel · Amnéville, Moselle · Grand Est</p>
        <h1 class="text-white">Devis Traiteur en Ligne —<br><span class="accent-text">Prix en Temps Réel</span></h1>
        <div class="accent-line accent-line-center hero-line"></div>
        <p class="text-lg text-white hero-sub">
          Séminaire, cocktail, mariage, anniversaire, festival en Moselle ou Lorraine — composez votre menu,
          visualisez les prix HT et TTC et recevez un devis personnalisé <strong>sous 24h</strong>.
        </p>
        <div class="hero-badges">
          <span class="hero-badge">✓ Réponse sous 24h</span>
          <span class="hero-badge">✓ Prix HT & TTC instantanés</span>
          <span class="hero-badge">✓ Sans engagement</span>
          <span class="hero-badge">✓ HACCP certifié</span>
          <span class="hero-badge">✓ Moselle · Lorraine · Grand Est</span>
        </div>
      </div>
    </section>

    <!-- Wizard -->
    <section ref="wizardRef" class="wizard-section section-padding-lg" v-if="step <= 4">
      <div class="container-narrow">

        <!-- Progress bar -->
        <div class="progress-bar">
          <template v-for="n in TOTAL_STEPS" :key="n">
            <div class="progress-step" :class="{ active: step === n, done: step > n }">
              <div class="step-circle">
                <svg v-if="step > n" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                <span v-else>{{ n }}</span>
              </div>
              <span class="step-label">{{ stepLabels[n - 1] }}</span>
            </div>
            <div v-if="n < TOTAL_STEPS" class="step-connector" :class="{ done: step > n }"></div>
          </template>
        </div>

        <!-- Helper contextuel par étape -->
        <div class="step-helper" v-if="step === 1">
          <span class="sh-icon">👋</span>
          <p><strong>Bienvenue !</strong> Commencez par choisir le type d'événement — cela nous permet de vous proposer les formules et services les mieux adaptés.</p>
        </div>
        <div class="step-helper" v-else-if="step === 2">
          <span class="sh-icon">📅</span>
          <p><strong>Bon choix !</strong> Maintenant dites-nous quand, où et combien vous serez — ces infos nous permettent d'afficher les prix au plus juste.</p>
        </div>
        <div class="step-helper" v-else-if="step === 3 && !isFestival">
          <span class="sh-icon">🍽️</span>
          <p><strong>La partie fun !</strong> Choisissez une formule clé en main <em>ou</em> composez votre propre menu plat par plat. Les prix HT et TTC s'affichent en temps réel.</p>
        </div>
        <div class="step-helper" v-else-if="step === 3 && isFestival">
          <span class="sh-icon">🎪</span>
          <p><strong>Grand format !</strong> Quelques infos sur votre événement et notre chef de projet revient vers vous avec une proposition sur mesure sous 24h.</p>
        </div>

        <!-- STEP 1 — Type d'événement -->
        <div v-if="step === 1" class="step-card">
          <h2 class="step-title">Quel type d'événement organisez-vous ?</h2>
          <div class="event-type-grid">
            <button
              v-for="et in eventTypes" :key="et.id"
              class="event-type-card"
              :class="{ selected: event.type === et.id }"
              @click="event.type = et.id"
            >
              <span class="et-icon">{{ et.icon }}</span>
              <strong>{{ et.label }}</strong>
              <span class="et-sub">{{ et.sub }}</span>
            </button>
          </div>
        </div>

        <!-- STEP 2 — Détails événement -->
        <div v-if="step === 2" class="step-card">
          <h2 class="step-title">Les détails de votre événement</h2>

          <div class="form-group">
            <label>Nom ou description de l'événement</label>
            <input v-model="event.name" type="text" placeholder="Ex : Séminaire annuel Acme, Anniversaire 40 ans, Mariage Dupont..." />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Date prévue *</label>
              <div class="date-selects">
                <select v-model="dateDay" class="date-select">
                  <option value="">Jour</option>
                  <option v-for="d in 31" :key="d" :value="String(d).padStart(2,'0')">{{ d }}</option>
                </select>
                <select v-model="dateMonth" class="date-select">
                  <option value="">Mois</option>
                  <option v-for="m in months" :key="m.value" :value="m.value">{{ m.label }}</option>
                </select>
                <select v-model="dateYear" class="date-select">
                  <option value="">Année</option>
                  <option v-for="y in availableYears" :key="y" :value="String(y)">{{ y }}</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Créneau *</label>
              <div class="slot-grid">
                <button
                  v-for="s in timeSlots" :key="s"
                  class="slot-chip"
                  :class="{ selected: event.timeSlot === s }"
                  @click="event.timeSlot = s"
                >{{ s }}</button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Durée de l'événement</label>
            <div class="slot-grid">
              <button
                v-for="d in ['1h', '2h', '3h', '4h', '6h', 'Demi-journée', 'Journée', '2 jours+']" :key="d"
                class="slot-chip"
                :class="{ selected: event.duration === d }"
                @click="event.duration = event.duration === d ? '' : d"
              >{{ d }}</button>
            </div>
          </div>

          <div class="form-group">
            <label>Lieu *</label>
            <div class="location-toggle">
              <button class="location-opt" :class="{ selected: locationPreset === 'local' }" @click="setLocationPreset('local')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Nos locaux — Fresh Food Amnéville
              </button>
              <button class="location-opt" :class="{ selected: locationPreset === 'autre' }" @click="setLocationPreset('autre')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Autre lieu
              </button>
            </div>
            <input
              v-if="locationPreset === 'autre'"
              v-model="event.location"
              type="text"
              placeholder="Ex : Metz, Nancy, salle des fêtes de..."
              class="location-input"
            />
          </div>

          <div class="form-group">
            <label>Nombre de convives estimé *</label>
            <div class="guests-row">
              <div class="guests-input">
                <button class="guests-btn" @click="event.guests = Math.max(1, event.guests - 10)">−</button>
                <input v-model.number="event.guests" type="number" min="1" class="guests-number" />
                <button class="guests-btn" @click="event.guests += 10">+</button>
              </div>
              <div class="guests-presets">
                <button v-for="n in [10,20,30,50,80,100]" :key="n" class="guests-preset" :class="{ active: event.guests === n }" @click="event.guests = n">{{ n }}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- STEP 3A — Festival -->
        <div v-if="step === 3 && isFestival" class="step-card">
          <div class="festival-header">
            <div class="festival-badge">Grand Format</div>
            <h2 class="step-title">Configurez votre événement grand public</h2>
            <p class="festival-intro">Pour les événements de grande envergure, notre équipe élabore un dispositif sur mesure.</p>
          </div>

          <div class="form-group">
            <label>Type de restauration souhaité *</label>
            <div class="festival-service-grid">
              <button
                v-for="ft in festivalServiceTypes" :key="ft.id"
                class="festival-service-card"
                :class="{ selected: festival.serviceType === ft.id }"
                @click="festival.serviceType = ft.id"
              >
                <span class="festival-service-icon">{{ ft.icon }}</span>
                <strong>{{ ft.label }}</strong>
              </button>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Affluence estimée *</label>
              <div class="slot-grid">
                <button
                  v-for="f in festivalFlux" :key="f.id"
                  class="slot-chip"
                  :class="{ selected: festival.flux === f.id }"
                  @click="festival.flux = f.id"
                >{{ f.label }}</button>
              </div>
            </div>
            <div class="form-group">
              <label>Durée *</label>
              <div class="slot-grid">
                <button
                  v-for="d in festivalDurations" :key="d"
                  class="slot-chip"
                  :class="{ selected: festival.duration === d }"
                  @click="festival.duration = d"
                >{{ d }}</button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Informations complémentaires</label>
            <textarea v-model="festival.notes" rows="3" placeholder="Contexte, contraintes logistiques, thème, exigences particulières..."></textarea>
          </div>

          <div class="festival-cta-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
            Notre chef de projet vous contacte dans les <strong>24h</strong> avec une proposition sur mesure.
          </div>
        </div>

        <!-- STEP 3B — Menu builder -->
        <div v-if="step === 3 && !isFestival" class="step-card step-card--menu">

          <div v-if="productsLoading" class="loading-state">
            <div class="spinner"></div>
            <p>Chargement du catalogue...</p>
          </div>

          <div v-else-if="productsError" class="error-msg">{{ productsError }}</div>

          <template v-else>

            <!-- Mode switcher -->
            <div class="mode-switcher">
              <button class="mode-btn" :class="{ active: selectionMode === 'formule' }" @click="switchMode('formule')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                Formule clé en main
              </button>
              <button class="mode-btn" :class="{ active: selectionMode === 'alacarte' }" @click="switchMode('alacarte')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                Composer mon menu
              </button>
            </div>

            <!-- ── FORMULE MODE ──────────────────────────────────────────── -->
            <div v-if="selectionMode === 'formule'">
              <div class="products-grid">
                <div v-for="p in formules" :key="p.id" class="formule-item">

                  <!-- Carte formule -->
                  <button
                    class="product-card"
                    :class="{ selected: selectedFormule === p.id }"
                    @click="switchFormule(p.id)"
                  >
                    <div class="product-card-inner">
                      <div class="product-info">
                        <strong>{{ p.name }}</strong>
                        <p v-if="p.description">{{ p.description }}</p>
                        <!-- Contenu de la formule -->
                        <div v-if="p.inclus && p.inclus.length > 0" class="formule-inclus">
                          <template v-for="cat in CATEGORY_ORDER" :key="cat">
                            <div v-if="p.inclus.some(d => d.category === cat)" class="formule-inclus-cat">
                              <span class="formule-inclus-cat-label">{{ cat }}</span>
                              <div class="formule-inclus-tags">
                                <span v-for="d in p.inclus.filter(d2 => d2.category === cat)" :key="d.id" class="formule-inclus-tag">{{ d.name }}</span>
                              </div>
                            </div>
                          </template>
                          <div v-if="p.inclus.some(d => !CATEGORY_ORDER.includes(d.category))" class="formule-inclus-cat">
                            <span class="formule-inclus-cat-label">Autres</span>
                            <div class="formule-inclus-tags">
                              <span v-for="d in p.inclus.filter(d2 => !CATEGORY_ORDER.includes(d2.category))" :key="d.id" class="formule-inclus-tag">{{ d.name }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="product-price-block">
                        <span class="product-price">{{ fmt(p.price_ttc || p.price) }}</span>
                        <span class="product-uom">TTC / pers.</span>
                        <span class="price-ht-tag">{{ fmt(p.price) }} HT</span>
                        <span class="product-total" v-if="selectedFormule === p.id">
                          = {{ fmt((p.price_ttc || p.price) * event.guests) }} TTC
                        </span>
                      </div>
                    </div>
                    <div class="selected-badge" v-if="selectedFormule === p.id">✓ Sélectionné</div>
                  </button>

                  <!-- Répartition des plats — visible uniquement si la formule a des plats définis -->
                  <div v-if="selectedFormule === p.id && dishableProducts.length > 0" class="dish-panel dish-panel--inline">
                    <div class="dish-panel-header">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                      <span>Répartir les plats par convive</span>
                      <span class="dish-optional-tag">Optionnel</span>
                    </div>
                    <div class="dish-panel-body">
                      <p class="dish-panel-intro">Indiquez combien de convives souhaitent chaque plat — utile si votre groupe a des préférences différentes.</p>
                      <div v-for="cat in dishableCategories" :key="cat" class="dish-cat-block">
                        <div class="dish-cat-header">
                          <h4 class="dish-cat-title">{{ cat }}</h4>
                          <span class="dish-cat-counter" :class="{ exact: dishCategoryTotal(cat) === event.guests, over: dishCategoryTotal(cat) > event.guests }">
                            {{ dishCategoryTotal(cat) }} / {{ event.guests }} pers.
                          </span>
                        </div>
                        <div v-for="dp in dishableProducts.filter(x => x.category === cat)" :key="dp.id" class="dish-row" :class="{ active: (dishQuantities[dp.id] || 0) > 0 }">
                          <div class="dish-row-left">
                            <div class="dish-row-img" v-if="dp.image">
                              <img :src="dp.image" :alt="dp.name" />
                            </div>
                            <span class="dish-row-name">{{ dp.name }}</span>
                          </div>
                          <div class="dish-row-ctrl">
                            <div class="qty-main">
                              <button class="qty-btn qty-btn--sm" @click="adjustDishQty(dp.id, -1)" :disabled="!(dishQuantities[dp.id] > 0)">−</button>
                              <input type="number" class="qty-input qty-input--sm" :value="dishQuantities[dp.id] || 0" min="0" @change="setDishQty(dp.id, $event.target.value)" @focus="$event.target.select()" />
                              <button class="qty-btn qty-btn--sm" @click="adjustDishQty(dp.id, 1)">+</button>
                            </div>
                            <div class="qty-presets">
                              <button class="qty-preset qty-preset--all" @click="setDishQty(dp.id, event.guests)">Tout ({{ event.guests }})</button>
                              <button v-if="(dishQuantities[dp.id] || 0) > 0" class="qty-reset" @click="setDishQty(dp.id, 0)" title="Retirer">×</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <!-- Services optionnels en mode formule -->
              <div class="services-section" v-if="optionalServices.length > 0">
                <h3 class="menu-cat-title">Prestations additionnelles <span class="opt-badge">Optionnel</span></h3>
                <div class="services-list">
                  <button v-for="p in optionalServices" :key="p.id" class="service-row" :class="{ 'service-row--active': selectedServices.includes(p.id) }" @click="toggleService(p.id)">
                    <div class="service-row-info">
                      <strong>{{ p.name }}</strong>
                      <span v-if="p.description">{{ p.description }}</span>
                    </div>
                    <div class="service-row-right">
                      <span class="service-price">{{ fmt(p.price) }}</span>
                      <span class="service-check" v-if="selectedServices.includes(p.id)">✓</span>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Total formule -->
              <div class="total-bar" v-if="selectedFormuleObj">
                <div class="total-lines">
                  <div class="total-line">
                    <span>{{ selectedFormuleObj.name }} × {{ event.guests }} pers.</span>
                    <span class="total-line-amounts">
                      <span class="amount-ht">{{ fmt(formuleTotal) }} HT</span>
                      <span class="amount-ttc">{{ fmt(formuleTotalTTC) }} TTC</span>
                    </span>
                  </div>
                  <div class="total-line" v-for="s in selectedServiceObjs" :key="s.id">
                    <span>{{ s.name }}</span>
                    <span class="total-line-amounts">
                      <span class="amount-ht">{{ fmt(s.price) }} HT</span>
                      <span class="amount-ttc">{{ fmt(s.price_ttc || s.price) }} TTC</span>
                    </span>
                  </div>
                </div>
                <div class="total-grand">
                  <span>Total estimé</span>
                  <span class="total-grand-amounts">
                    <span class="amount-ht-lg">{{ fmt(grandTotal) }} HT</span>
                    <span class="amount-ttc-lg">{{ fmt(grandTotalTTC) }} TTC</span>
                  </span>
                </div>
                <p class="total-note">Estimation indicative. Le devis définitif sera établi par notre équipe.</p>
              </div>
            </div>

            <!-- ── COMPOSER MON MENU (À la carte) ────────────────────────── -->
            <div v-if="selectionMode === 'alacarte'">

              <div v-if="alacarteProducts.length === 0" class="alacarte-empty">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                <p>Le catalogue est en cours de configuration.</p>
                <p style="margin-top:0.5rem;opacity:0.7;font-size:0.9rem">Utilisez une formule clé en main ou contactez-nous directement.</p>
                <button class="btn-switch-mode" @click="selectionMode = 'formule'">← Voir les formules</button>
              </div>

              <template v-else>
                <p class="menu-intro">
                  {{ event.guests }} convives · Sélectionnez les plats et ajustez les quantités par convive.
                </p>

                <!-- Sections par catégorie -->
                <div class="menu-builder">
                  <section v-for="cat in alacarteCategories" :key="cat" class="menu-section">
                    <div class="menu-cat-header">
                      <h3 class="menu-cat-title">{{ cat }}</h3>
                      <span class="menu-cat-count" v-if="productsByCategory[cat].some(p => (alacarteQuantities[p.id] || 0) > 0)">
                        {{ productsByCategory[cat].filter(p => (alacarteQuantities[p.id] || 0) > 0).length }} sélectionné(s)
                      </span>
                    </div>

                    <div class="menu-cards">
                      <div
                        v-for="p in productsByCategory[cat]" :key="p.id"
                        class="menu-card"
                        :class="{ 'menu-card--active': (alacarteQuantities[p.id] || 0) > 0 }"
                      >
                        <!-- Photo -->
                        <div class="menu-card-img">
                          <img v-if="p.image" :src="p.image" :alt="p.name" loading="lazy" />
                          <div v-else class="menu-card-img-ph">🍽️</div>
                          <div v-if="(alacarteQuantities[p.id] || 0) > 0" class="menu-card-badge">
                            {{ alacarteQuantities[p.id] }} pers.
                          </div>
                        </div>

                        <!-- Infos + contrôles -->
                        <div class="menu-card-body">
                          <strong class="menu-card-name">{{ p.name }}</strong>
                          <p v-if="p.description" class="menu-card-desc">{{ p.description }}</p>
                          <div class="menu-card-price">
                            {{ fmt(p.price_ttc || p.price) }}<small> TTC/pers.</small>
                            <span class="menu-card-ht">{{ fmt(p.price) }} HT</span>
                          </div>
                          <div class="menu-card-ctrl">
                            <div class="qty-main">
                              <button class="qty-btn" @click="adjustAlacarteQty(p.id, -1)" :disabled="!(alacarteQuantities[p.id] > 0)">−</button>
                              <input type="number" class="qty-input" :value="alacarteQuantities[p.id] || 0" min="0" @change="setAlacarteQty(p.id, $event.target.value)" @focus="$event.target.select()" />
                              <button class="qty-btn" @click="adjustAlacarteQty(p.id, 1)">+</button>
                            </div>
                            <div class="qty-presets">
                              <button class="qty-preset qty-preset--all" @click="setAlacarteQty(p.id, event.guests)">Tout ({{ event.guests }})</button>
                              <button v-if="(alacarteQuantities[p.id] || 0) > 0" class="qty-reset" @click="setAlacarteQty(p.id, 0)" title="Retirer">×</button>
                            </div>
                          </div>
                          <div class="menu-card-subtotal" v-if="(alacarteQuantities[p.id] || 0) > 0">
                            → <strong>{{ fmt((p.price_ttc || p.price) * alacarteQuantities[p.id]) }} TTC</strong>
                            <span class="subtotal-ht">({{ fmt(p.price * alacarteQuantities[p.id]) }} HT)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <!-- Prestations additionnelles -->
                <div class="services-section" v-if="optionalServices.length > 0">
                  <h3 class="menu-cat-title">Prestations additionnelles <span class="opt-badge">Optionnel</span></h3>
                  <div class="services-list">
                    <button v-for="p in optionalServices" :key="p.id" class="service-row" :class="{ 'service-row--active': selectedServices.includes(p.id) }" @click="toggleService(p.id)">
                      <div class="service-row-info">
                        <strong>{{ p.name }}</strong>
                        <span v-if="p.description">{{ p.description }}</span>
                      </div>
                      <div class="service-row-right">
                        <span class="service-price">{{ fmt(p.price) }}</span>
                        <span class="service-check" v-if="selectedServices.includes(p.id)">✓</span>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Total à la carte -->
                <div class="total-bar" v-if="selectedAlacarteObjs.length > 0 || selectedServiceObjs.length > 0">
                  <div class="total-lines">
                    <div class="total-line" v-for="p in selectedAlacarteObjs" :key="p.id">
                      <span>{{ p.name }} × {{ alacarteQuantities[p.id] }} pers.</span>
                      <span class="total-line-amounts">
                        <span class="amount-ht">{{ fmt(p.price * alacarteQuantities[p.id]) }} HT</span>
                        <span class="amount-ttc">{{ fmt((p.price_ttc || p.price) * alacarteQuantities[p.id]) }} TTC</span>
                      </span>
                    </div>
                    <div class="total-line" v-for="s in selectedServiceObjs" :key="s.id">
                      <span>{{ s.name }}</span>
                      <span class="total-line-amounts">
                        <span class="amount-ht">{{ fmt(s.price) }} HT</span>
                        <span class="amount-ttc">{{ fmt(s.price_ttc || s.price) }} TTC</span>
                      </span>
                    </div>
                  </div>
                  <div class="total-grand">
                    <span>Total estimé</span>
                    <span class="total-grand-amounts">
                      <span class="amount-ht-lg">{{ fmt(grandTotal) }} HT</span>
                      <span class="amount-ttc-lg">{{ fmt(grandTotalTTC) }} TTC</span>
                    </span>
                  </div>
                  <p class="total-note">Estimation indicative. Le devis définitif sera établi par notre équipe.</p>
                </div>

              </template>
            </div>

          </template>
        </div>

        <!-- STEP 4 — Contact (version WOW) -->
        <div v-if="step === 4" class="step-card step-card--final">

          <!-- Header excitant -->
          <div class="final-hero">
            <div class="final-hero-emoji">🎉</div>
            <div class="final-hero-text">
              <h2>Votre devis est presque entre vos mains !</h2>
              <p>Plus qu'une étape — renseignez vos coordonnées et notre équipe vous envoie le devis définitif personnalisé <strong>sous 24h ouvrées</strong>.</p>
            </div>
          </div>

          <!-- Résumé visuel de ce qu'ils ont construit -->
          <div class="final-summary">
            <div class="fs-item">
              <span class="fs-check">✓</span>
              <span>{{ eventTypes.find(e => e.id === event.type)?.icon }} <strong>{{ eventTypes.find(e => e.id === event.type)?.label }}</strong> — {{ event.timeSlot }}<template v-if="event.duration"> · {{ event.duration }}</template></span>
            </div>
            <div class="fs-item">
              <span class="fs-check">✓</span>
              <span>{{ event.date }} · {{ event.location }}</span>
            </div>
            <div class="fs-item" v-if="!isFestival">
              <span class="fs-check">✓</span>
              <span><strong>{{ event.guests }} convives</strong></span>
            </div>
            <div class="fs-item" v-if="isFestival">
              <span class="fs-check">✓</span>
              <span>{{ festivalFlux.find(f => f.id === festival.flux)?.label }} · {{ festival.duration }}</span>
            </div>
            <div class="fs-item fs-item--price" v-if="!isFestival && grandTotalTTC > 0">
              <span class="fs-check fs-check--star">✦</span>
              <span>Estimation <strong class="fs-price">{{ fmt(grandTotalTTC) }} TTC</strong> <span class="fs-ht">({{ fmt(grandTotal) }} HT)</span></span>
            </div>
            <div class="fs-item fs-item--price" v-if="isFestival">
              <span class="fs-check fs-check--star">✦</span>
              <span>Proposition sur mesure élaborée par notre chef de projet</span>
            </div>
          </div>

          <!-- Formulaire contact -->
          <div class="final-form">
            <p class="final-form-label">Qui doit-on contacter ?</p>
            <div class="form-row">
              <div class="form-group">
                <label>Prénom & Nom *</label>
                <input v-model="contact.name" type="text" placeholder="Jean Dupont" />
              </div>
              <div class="form-group">
                <label>Société / Organisation *</label>
                <input v-model="contact.company" type="text" placeholder="Votre entreprise" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Email *</label>
                <input v-model="contact.email" type="email" placeholder="contact@exemple.fr" />
              </div>
              <div class="form-group">
                <label>Téléphone *</label>
                <input v-model="contact.phone" type="tel" placeholder="06 12 34 56 78" />
              </div>
            </div>
            <div class="form-group">
              <label>Précisions ou questions <span style="font-weight:400;opacity:0.5">(optionnel)</span></label>
              <textarea v-model="contact.message" rows="3" placeholder="Régimes alimentaires, contraintes logistiques, demandes spéciales..."></textarea>
            </div>
          </div>

          <div v-if="submitError" class="error-msg">{{ submitError }}</div>

          <!-- Bouton submit intégré à l'étape -->
          <button class="final-submit-btn" :disabled="!canNext || isSubmitting" @click="submitQuote">
            <span v-if="!isSubmitting">Envoyer ma demande de devis →</span>
            <span v-else class="final-submit-loading">
              <span class="spinner-sm"></span> Envoi en cours...
            </span>
          </button>

          <!-- Trust signals -->
          <div class="final-trust">
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Données confidentielles</span>
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Réponse sous 24h</span>
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Gratuit & sans engagement</span>
          </div>
        </div>

        <!-- Navigation (sans bouton submit, géré dans l'étape 4) -->
        <div class="wizard-nav">
          <button class="btn btn-outline" @click="prevStep" v-if="step > 1">← Retour</button>
          <span v-else></span>
          <button v-if="step < 4" class="btn btn-primary btn-large" :disabled="!canNext" @click="nextStep">Continuer →</button>
          <span v-if="step === 4"></span>
        </div>

      </div>
    </section>

    <!-- STEP 5 — Confirmation -->
    <section v-if="step === 5" class="confirmation-section section-padding-lg">
      <div class="container-narrow text-center">
        <div class="confirm-icon">✓</div>
        <h2>Demande reçue !</h2>
        <div class="accent-line accent-line-center"></div>
        <p class="text-lg" style="max-width:560px;margin:2rem auto;">
          Votre demande de devis a bien été enregistrée. Notre équipe vous contacte sous <strong>24h ouvrées</strong>.
        </p>
        <div v-if="quoteRef" class="quote-ref-block">
          <span class="quote-ref-label">Référence de votre demande</span>
          <span class="quote-ref">{{ quoteRef }}</span>
        </div>
        <div class="confirm-actions">
          <a href="/" class="btn btn-primary btn-large">Retour à l'accueil</a>
          <a href="/contact" class="btn btn-outline btn-large">Nous contacter</a>
        </div>
      </div>
    </section>

    <!-- SEO block -->
    <section class="seo-section section-padding-lg" v-if="step >= 5 || step === 1">
      <div class="container-narrow">
        <div class="seo-grid">
          <div class="seo-item">
            <h3>Traiteur événementiel en Moselle — Amnéville, Metz, Thionville, Nancy</h3>
            <p>Fresh Events est votre traiteur événementiel basé à Amnéville (57). Nous intervenons pour séminaires, cocktails d'entreprise, mariages, anniversaires et festivals dans toute la Moselle, la Lorraine et le Grand Est.</p>
          </div>
          <div class="seo-item">
            <h3>Devis traiteur en ligne avec prix instantanés</h3>
            <p>Configurez votre prestation en 4 étapes et visualisez le prix HT et TTC en temps réel. Choisissez une formule clé en main ou composez votre propre menu. Devis personnalisé finalisé par notre équipe sous 24h.</p>
          </div>
          <div class="seo-item">
            <h3>Tous types d'événements — de 10 à 10 000 convives</h3>
            <p>Séminaire, conférence, incentive, cocktail dînatoire, gala, mariage, anniversaire, festival, food court — Fresh Events s'adapte à tous les formats et tous les budgets.</p>
          </div>
          <div class="seo-item">
            <h3>Certification HACCP — 11 ans d'expertise</h3>
            <p>Restauration certifiée HACCP, personnel formé, logistique complète. Vos invités profitent d'une expérience culinaire de qualité pendant que vous vous concentrez sur votre événement.</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ── Hero ──────────────────────────────────────────────────────────────────── */
.hero-section { padding: clamp(5rem, 12vw, 8rem) 0; }
.hero-eyebrow { color: rgba(255,255,255,0.75); font-size: 0.85rem; letter-spacing: 0.15em; margin-bottom: 1.5rem; }
.hero-line { background: rgba(255,255,255,0.3); margin: 2rem auto; }
.hero-sub { max-width: 680px; margin: 0 auto 2rem; opacity: 0.9; }
.hero-badges { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem; }
.hero-badge { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); color: rgba(255,255,255,0.9); padding: 0.4rem 1rem; font-size: 0.8rem; letter-spacing: 0.03em; }

/* ── Progress bar ──────────────────────────────────────────────────────────── */
.progress-bar { display: flex; align-items: flex-start; justify-content: center; margin-bottom: 3.5rem; }
.progress-step { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; }
.step-circle { width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--color-tertiary); background: var(--color-white); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; color: var(--color-black); opacity: 0.4; transition: all var(--transition-base); flex-shrink: 0; }
.progress-step.active .step-circle, .progress-step.done .step-circle { border-color: var(--color-accent); background: var(--color-accent); color: var(--color-white); opacity: 1; }
.step-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-black); opacity: 0.4; transition: opacity var(--transition-base); white-space: nowrap; }
.progress-step.active .step-label, .progress-step.done .step-label { opacity: 1; color: var(--color-accent); }
.step-connector { width: clamp(2.5rem, 7vw, 6rem); height: 2px; background: var(--color-tertiary); transition: background var(--transition-base); margin-top: 19px; flex-shrink: 0; }
.step-connector.done { background: var(--color-accent); }

/* ── Step card ─────────────────────────────────────────────────────────────── */
.step-card { background: var(--color-white); padding: clamp(2rem, 5vw, 3.5rem); box-shadow: var(--shadow-lg); border: 1px solid rgba(0,0,0,0.06); margin-bottom: 2rem; }
.step-card--menu { padding: clamp(1.5rem, 4vw, 2.5rem); }
.step-title { font-size: clamp(1.4rem, 3vw, 2rem); margin-bottom: 2.5rem; color: var(--color-black); }

/* ── Event type grid ───────────────────────────────────────────────────────── */
.event-type-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.event-type-card { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; padding: 2rem 1rem; border: 2px solid rgba(0,0,0,0.08); background: var(--color-secondary); cursor: pointer; transition: all var(--transition-base); text-align: center; }
.event-type-card:hover { border-color: var(--color-accent); transform: translateY(-3px); box-shadow: var(--shadow-md); }
.event-type-card.selected { border-color: var(--color-accent); background: rgba(74, 124, 89, 0.06); box-shadow: var(--shadow-md); }
.et-icon { font-size: 2.2rem; line-height: 1; }
.event-type-card strong { font-size: 0.95rem; color: var(--color-black); }
.et-sub { font-size: 0.78rem; color: var(--color-black); opacity: 0.6; }

/* ── Form elements ─────────────────────────────────────────────────────────── */
.form-group { margin-bottom: 1.75rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
label { display: block; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.6rem; color: var(--color-black); }
input[type="text"], input[type="email"], input[type="tel"], input[type="number"], select, textarea { width: 100%; padding: 0.9rem 1.1rem; background: var(--color-secondary); border: 1px solid rgba(0,0,0,0.1); font-family: var(--font-body); font-size: 1rem; color: var(--color-black); transition: all var(--transition-base); appearance: none; }
input:focus, select:focus, textarea:focus { outline: none; background: var(--color-white); border-color: var(--color-accent); box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1); }
textarea { resize: vertical; min-height: 110px; }

/* ── Date ──────────────────────────────────────────────────────────────────── */
.date-selects { display: grid; grid-template-columns: 1fr 2fr 1.5fr; gap: 0.5rem; }
.date-select { cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.75rem center; padding-right: 2rem; }

/* ── Time slots ────────────────────────────────────────────────────────────── */
.slot-grid { display: flex; flex-direction: column; gap: 0.5rem; }
.slot-chip { padding: 0.65rem 1rem; border: 1.5px solid rgba(0,0,0,0.1); background: var(--color-secondary); font-family: var(--font-body); font-size: 0.9rem; cursor: pointer; transition: all var(--transition-fast); color: var(--color-black); text-align: left; }
.slot-chip:hover { border-color: var(--color-accent); }
.slot-chip.selected { border-color: var(--color-accent); background: var(--color-accent); color: var(--color-white); }

/* ── Location ──────────────────────────────────────────────────────────────── */
.location-toggle { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.location-opt { display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1.25rem; border: 1.5px solid rgba(0,0,0,0.1); background: var(--color-secondary); font-family: var(--font-body); font-size: 0.9rem; color: var(--color-black); cursor: pointer; transition: all var(--transition-fast); }
.location-opt:hover { border-color: var(--color-accent); }
.location-opt.selected { border-color: var(--color-accent); background: rgba(74, 124, 89, 0.07); color: var(--color-primary); font-weight: 600; }
.location-opt.selected svg { stroke: var(--color-accent); }
.location-input { margin-top: 0.75rem; }

/* ── Guests ────────────────────────────────────────────────────────────────── */
.guests-row { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
.guests-input { display: flex; align-items: center; }
.guests-btn { width: 48px; height: 50px; background: var(--color-primary); color: var(--color-white); border: none; font-size: 1.4rem; cursor: pointer; transition: background var(--transition-fast); flex-shrink: 0; }
.guests-btn:hover { background: var(--color-accent); }
.guests-number { width: 80px; text-align: center; font-size: 1.25rem; font-weight: 600; border-left: none; border-right: none; -moz-appearance: textfield; }
.guests-number::-webkit-inner-spin-button, .guests-number::-webkit-outer-spin-button { -webkit-appearance: none; }
.guests-presets { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.guests-preset { padding: 0.45rem 0.85rem; border: 1.5px solid rgba(0,0,0,0.12); background: var(--color-secondary); font-family: var(--font-body); font-size: 0.9rem; font-weight: 600; color: var(--color-black); cursor: pointer; transition: all var(--transition-fast); }
.guests-preset:hover { border-color: var(--color-accent); color: var(--color-accent); }
.guests-preset.active { border-color: var(--color-accent); background: var(--color-accent); color: var(--color-white); }

/* ── Festival ──────────────────────────────────────────────────────────────── */
.festival-header { margin-bottom: 2rem; }
.festival-badge { display: inline-block; background: var(--color-primary); color: var(--color-white); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; padding: 0.3rem 0.9rem; margin-bottom: 1rem; }
.festival-intro { color: var(--color-black); opacity: 0.7; font-size: 0.95rem; line-height: 1.6; margin-top: 0.75rem; }
.festival-service-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
.festival-service-card { display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem; border: 2px solid rgba(0,0,0,0.08); background: var(--color-secondary); cursor: pointer; transition: all var(--transition-base); text-align: left; }
.festival-service-card:hover { border-color: var(--color-accent); }
.festival-service-card.selected { border-color: var(--color-accent); background: rgba(74, 124, 89, 0.06); }
.festival-service-icon { font-size: 1.6rem; flex-shrink: 0; }
.festival-service-card strong { font-size: 0.95rem; color: var(--color-black); }
.festival-cta-note { display: flex; align-items: flex-start; gap: 0.75rem; background: var(--color-secondary); border-left: 3px solid var(--color-accent); padding: 1.25rem 1.5rem; margin-top: 2rem; font-size: 0.9rem; color: var(--color-black); opacity: 0.85; line-height: 1.5; }
.festival-cta-note svg { flex-shrink: 0; margin-top: 0.1rem; stroke: var(--color-accent); }

/* ── Mode switcher ─────────────────────────────────────────────────────────── */
.mode-switcher { display: flex; margin-bottom: 2rem; border: 2px solid var(--color-primary); }
.mode-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 0.9rem 1.5rem; background: transparent; border: none; font-family: var(--font-body); font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-primary); cursor: pointer; transition: all var(--transition-fast); }
.mode-btn:first-child { border-right: 2px solid var(--color-primary); }
.mode-btn:hover { background: rgba(74, 124, 89, 0.05); }
.mode-btn.active { background: var(--color-primary); color: var(--color-white); }

/* ── Formule products ──────────────────────────────────────────────────────── */
.products-grid { display: flex; flex-direction: column; gap: 1rem; }
.formule-item { display: flex; flex-direction: column; }
.product-card { width: 100%; text-align: left; padding: 1.5rem; border: 2px solid rgba(0,0,0,0.07); background: var(--color-secondary); cursor: pointer; transition: all var(--transition-base); position: relative; overflow: hidden; }
.product-card:hover { border-color: var(--color-accent); box-shadow: var(--shadow-sm); }
.product-card.selected { border-color: var(--color-accent); background: rgba(74, 124, 89, 0.05); }
.product-card-inner { display: flex; justify-content: space-between; align-items: flex-start; gap: 1.5rem; }
.product-info { flex: 1; }
.product-info strong { display: block; font-size: 1rem; font-weight: 600; margin-bottom: 0.4rem; }
.product-info p { font-size: 0.875rem; opacity: 0.65; line-height: 1.5; margin: 0; }
.product-price-block { text-align: right; flex-shrink: 0; }
.product-price { display: block; font-family: var(--font-heading); font-size: 1.5rem; color: var(--color-accent); font-weight: 500; line-height: 1; }
.product-uom { font-size: 0.8rem; opacity: 0.6; display: block; margin-top: 0.2rem; }
.product-total { display: block; font-size: 0.85rem; font-weight: 600; color: var(--color-primary); margin-top: 0.4rem; }
.price-ht-tag { display: block; font-size: 0.78rem; opacity: 0.55; margin-top: 0.15rem; }
.selected-badge { position: absolute; top: 0; right: 0; background: var(--color-accent); color: var(--color-white); font-size: 0.75rem; font-weight: 600; padding: 0.3rem 0.8rem; letter-spacing: 0.03em; }

/* ── Contenu de la formule ─────────────────────────────────────────────────── */
.formule-inclus { margin-top: 0.85rem; display: flex; flex-direction: column; gap: 0.5rem; }
.formule-inclus-cat { display: flex; align-items: flex-start; gap: 0.6rem; }
.formule-inclus-cat-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-primary); opacity: 0.6; white-space: nowrap; padding-top: 0.2rem; min-width: 60px; }
.formule-inclus-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.formule-inclus-tag { font-size: 0.76rem; background: rgba(74,124,89,0.08); color: var(--color-primary); border: 1px solid rgba(74,124,89,0.2); padding: 0.18rem 0.55rem; line-height: 1.4; }

/* ── À la carte menu builder ───────────────────────────────────────────────── */
.menu-intro { font-size: 0.9rem; color: var(--color-black); opacity: 0.65; margin-bottom: 2rem; border-left: 3px solid var(--color-accent); padding-left: 1rem; }

.menu-builder { display: flex; flex-direction: column; gap: 0; }

.menu-section { margin-bottom: 3rem; }

.menu-cat-header { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 2px solid var(--color-primary); }

.menu-cat-title { font-size: 1.25rem; font-family: var(--font-heading); color: var(--color-primary); margin: 0; letter-spacing: -0.01em; }

.menu-cat-count { font-size: 0.78rem; font-weight: 600; color: var(--color-accent); background: rgba(74, 124, 89, 0.1); padding: 0.2rem 0.65rem; }

/* ── Mosaic product grid ───────────────────────────────────────────────────── */
.menu-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.menu-card {
  display: flex;
  flex-direction: column;
  border: 1.5px solid rgba(0,0,0,0.08);
  background: var(--color-secondary);
  overflow: hidden;
  transition: all var(--transition-fast);
}

.menu-card--active {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px rgba(74, 124, 89, 0.15);
}

.menu-card-img {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  background: rgba(0,0,0,0.06);
  flex-shrink: 0;
}

.menu-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

.menu-card-img-ph {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: 2.5rem; opacity: 0.35;
}

.menu-card-badge {
  position: absolute; top: 0.5rem; right: 0.5rem;
  background: var(--color-accent); color: #fff;
  font-size: 0.7rem; font-weight: 700;
  padding: 0.2rem 0.5rem;
  letter-spacing: 0.03em;
}

.menu-card-body {
  display: flex; flex-direction: column; gap: 0.3rem;
  padding: 0.85rem; flex: 1;
}

.menu-card-name { font-size: 0.92rem; font-weight: 700; color: var(--color-black); line-height: 1.3; }

.menu-card-desc { font-size: 0.78rem; color: var(--color-black); opacity: 0.55; line-height: 1.4; margin: 0; }

.menu-card-price {
  font-size: 1rem; font-weight: 700; color: var(--color-accent);
  margin-top: auto; padding-top: 0.4rem;
}
.menu-card-price small { font-size: 0.7rem; font-weight: 400; opacity: 0.7; }
.menu-card-ht { display: block; font-size: 0.7rem; font-weight: 400; opacity: 0.5; }

.menu-card-ctrl { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem; }

.menu-card-subtotal { font-size: 0.8rem; color: var(--color-primary); margin-top: 0.25rem; }
.menu-card-subtotal .subtotal-ht { opacity: 0.55; font-size: 0.75rem; margin-left: 0.25rem; }

/* ── Qty controls ──────────────────────────────────────────────────────────── */
.qty-main { display: flex; align-items: center; flex-shrink: 0; }

.qty-btn {
  width: 34px; height: 34px;
  background: var(--color-primary); color: var(--color-white);
  border: none; font-size: 1.15rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background var(--transition-fast); flex-shrink: 0; line-height: 1;
}

.qty-btn:hover:not(:disabled) { background: var(--color-accent); }
.qty-btn:disabled { opacity: 0.25; cursor: not-allowed; }

.qty-btn--sm { width: 30px; height: 30px; font-size: 1rem; }

.qty-input {
  width: 56px; height: 34px;
  text-align: center; font-size: 1rem; font-weight: 700;
  color: var(--color-primary); background: var(--color-white);
  border: 1px solid rgba(0,0,0,0.1); border-left: none; border-right: none;
  padding: 0; -moz-appearance: textfield;
}

.qty-input::-webkit-inner-spin-button, .qty-input::-webkit-outer-spin-button { -webkit-appearance: none; }
.qty-input:focus { outline: none; background: #f0f7f1; }

.qty-input--sm { width: 48px; height: 30px; font-size: 0.9rem; }

.qty-presets { display: flex; gap: 0.35rem; flex-wrap: wrap; }

.qty-preset {
  padding: 0.28rem 0.6rem;
  border: 1.5px solid rgba(0,0,0,0.12); background: var(--color-white);
  font-family: var(--font-body); font-size: 0.77rem; font-weight: 600;
  color: var(--color-black); cursor: pointer; transition: all var(--transition-fast);
}

.qty-preset:hover { border-color: var(--color-accent); color: var(--color-accent); }

.qty-preset--all { border-color: var(--color-primary); color: var(--color-primary); font-weight: 700; }
.qty-preset--all:hover { background: var(--color-primary); color: var(--color-white); }

.qty-reset {
  width: 28px; height: 28px;
  border: 1.5px solid rgba(197,48,48,0.3); background: transparent;
  color: #c53030; font-size: 1rem; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all var(--transition-fast); flex-shrink: 0; line-height: 1;
}
.qty-reset:hover { background: #fff5f5; border-color: #c53030; }

/* ── Prestations additionnelles ────────────────────────────────────────────── */
.services-section { margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid rgba(0,0,0,0.07); }

.opt-badge { font-size: 0.7rem; font-family: var(--font-body); font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--color-accent); background: rgba(74,124,89,0.1); padding: 0.2rem 0.55rem; margin-left: 0.6rem; vertical-align: middle; }

.services-list { display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1.25rem; }

.service-row {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 1.5rem; padding: 1rem 1.25rem;
  border: 1.5px solid rgba(0,0,0,0.08); background: var(--color-secondary);
  cursor: pointer; text-align: left; transition: all var(--transition-fast); width: 100%;
}

.service-row:hover { border-color: var(--color-accent); }

.service-row--active { border-color: var(--color-accent); background: rgba(74,124,89,0.04); }

.service-row-info { flex: 1; }
.service-row-info strong { display: block; font-size: 0.95rem; font-weight: 600; margin-bottom: 0.25rem; }
.service-row-info span { font-size: 0.82rem; opacity: 0.6; line-height: 1.4; }

.service-row-right { display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; }

.service-price { font-size: 1rem; font-weight: 700; color: var(--color-accent); }

.service-check { width: 24px; height: 24px; background: var(--color-accent); color: var(--color-white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; flex-shrink: 0; }

/* ── Dish panel ────────────────────────────────────────────────────────────── */
.dish-panel { margin-top: 0; border: 1.5px solid rgba(0,0,0,0.08); background: var(--color-white); }
.dish-panel--inline { border-top: 2px solid rgba(74,124,89,0.3); border-color: rgba(74,124,89,0.25); }
.dish-panel-header { display: flex; align-items: center; gap: 0.75rem; padding: 0.9rem 1.4rem; background: rgba(74,124,89,0.05); border-bottom: 1px solid rgba(0,0,0,0.07); font-weight: 600; font-size: 0.9rem; color: var(--color-primary); }
.dish-optional-tag { background: rgba(74,124,89,0.12); color: var(--color-accent); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 0.2rem 0.6rem; }
.dish-panel-body { padding: 1.25rem 1.4rem 1.5rem; }
.dish-panel-intro { font-size: 0.875rem; opacity: 0.65; margin-bottom: 1.75rem; line-height: 1.55; }
.dish-cat-block { margin-bottom: 2rem; }
.dish-cat-block:last-child { margin-bottom: 0; }
.dish-cat-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--color-tertiary); }
.dish-cat-title { font-size: 1rem; font-family: var(--font-heading); color: var(--color-black); margin: 0; }
.dish-cat-counter { font-size: 0.8rem; font-weight: 600; color: var(--color-black); opacity: 0.45; background: var(--color-secondary); padding: 0.2rem 0.6rem; transition: all var(--transition-fast); }
.dish-cat-counter.exact { color: var(--color-accent); background: rgba(74,124,89,0.1); opacity: 1; }
.dish-cat-counter.over { color: #c53030; background: #fff5f5; opacity: 1; }
.dish-row { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 0.7rem 0.9rem; border: 1.5px solid rgba(0,0,0,0.06); background: var(--color-secondary); margin-bottom: 0.5rem; transition: all var(--transition-fast); }
.dish-row:last-child { margin-bottom: 0; }
.dish-row.active { border-color: var(--color-accent); background: rgba(74,124,89,0.04); }
.dish-row-left { display: flex; align-items: center; gap: 0.75rem; flex: 1; min-width: 0; }
.dish-row-img { width: 40px; height: 40px; flex-shrink: 0; overflow: hidden; }
.dish-row-img img { width: 100%; height: 100%; object-fit: cover; }
.dish-row-name { font-size: 0.9rem; color: var(--color-black); }
.dish-row.active .dish-row-name { font-weight: 600; color: var(--color-primary); }
.dish-row-ctrl { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; flex-shrink: 0; }

/* ── Empty state ───────────────────────────────────────────────────────────── */
.alacarte-empty { background: var(--color-secondary); padding: 3rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
.alacarte-empty p { font-size: 0.95rem; color: var(--color-black); margin: 0; }
.btn-switch-mode { display: inline-block; margin-top: 0.75rem; padding: 0.6rem 1.25rem; border: 1.5px solid var(--color-accent); background: transparent; color: var(--color-accent); font-family: var(--font-body); font-size: 0.85rem; cursor: pointer; transition: all var(--transition-fast); }
.btn-switch-mode:hover { background: var(--color-accent); color: var(--color-white); }

/* ── Total bar ─────────────────────────────────────────────────────────────── */
.total-bar { margin-top: 2.5rem; border-top: 2px solid var(--color-primary); padding-top: 1.5rem; }
.total-lines { margin-bottom: 1rem; }
.total-line { display: flex; justify-content: space-between; padding: 0.4rem 0; font-size: 0.9rem; border-bottom: 1px solid rgba(0,0,0,0.06); }
.total-line-amounts { display: flex; gap: 1rem; align-items: center; flex-shrink: 0; }
.amount-ht { font-size: 0.82rem; opacity: 0.6; }
.amount-ttc { font-size: 0.9rem; font-weight: 600; color: var(--color-primary); }
.total-grand { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0 0.5rem; font-size: 1.1rem; font-weight: 700; color: var(--color-primary); gap: 1rem; }
.total-grand-amounts { display: flex; flex-direction: column; align-items: flex-end; gap: 0.1rem; flex-shrink: 0; }
.amount-ht-lg { font-size: 0.9rem; opacity: 0.6; font-weight: 500; }
.amount-ttc-lg { font-size: 1.4rem; font-weight: 700; color: var(--color-primary); }
.total-note { font-size: 0.8rem; opacity: 0.5; font-style: italic; margin-top: 0.5rem; }

/* ── Step helpers ──────────────────────────────────────────────────────────── */
.step-helper {
  display: flex; align-items: flex-start; gap: 1rem;
  background: rgba(74,124,89,0.07); border-left: 3px solid var(--color-accent);
  padding: 1rem 1.25rem; margin-bottom: 1.75rem;
  font-size: 0.9rem; line-height: 1.6; color: var(--color-black);
}
.sh-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: 0.05rem; line-height: 1; }
.step-helper p { margin: 0; }
.step-helper strong { color: var(--color-primary); }

/* ── Étape finale (WOW) ────────────────────────────────────────────────────── */
.step-card--final { padding: 0; overflow: hidden; }

.final-hero {
  display: flex; align-items: flex-start; gap: 1.25rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, #1a4a2a 100%);
  padding: clamp(1.75rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 3rem);
  color: var(--color-white);
}
.final-hero-emoji { font-size: 2.5rem; flex-shrink: 0; line-height: 1; margin-top: 0.1rem; }
.final-hero-text h2 { font-size: clamp(1.25rem, 2.5vw, 1.7rem); color: var(--color-white); margin-bottom: 0.5rem; line-height: 1.25; }
.final-hero-text p { font-size: 0.95rem; color: rgba(255,255,255,0.82); line-height: 1.6; margin: 0; }

.final-summary {
  background: var(--color-secondary);
  padding: 1.25rem clamp(1.5rem, 4vw, 3rem);
  border-bottom: 1px solid rgba(0,0,0,0.07);
  display: flex; flex-direction: column; gap: 0.6rem;
}
.fs-item { display: flex; align-items: baseline; gap: 0.75rem; font-size: 0.9rem; color: var(--color-black); }
.fs-check { font-size: 0.85rem; font-weight: 700; color: var(--color-accent); flex-shrink: 0; width: 16px; text-align: center; }
.fs-check--star { color: var(--color-primary); font-size: 0.9rem; }
.fs-item--price { margin-top: 0.35rem; padding-top: 0.75rem; border-top: 1px solid rgba(0,0,0,0.08); }
.fs-price { font-size: 1.2rem; color: var(--color-primary); }
.fs-ht { font-size: 0.8rem; opacity: 0.55; margin-left: 0.4rem; }

.final-form {
  padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 3rem) 0;
}
.final-form-label {
  font-weight: 700; font-size: 0.8rem; text-transform: uppercase;
  letter-spacing: 0.07em; color: var(--color-accent); margin-bottom: 1.5rem;
}

.final-submit-btn {
  display: flex; align-items: center; justify-content: center; gap: 0.6rem;
  width: calc(100% - clamp(3rem, 8vw, 6rem)); margin: 1.75rem clamp(1.5rem, 4vw, 3rem) 0;
  padding: 1.15rem 2rem;
  background: var(--color-primary); color: var(--color-white);
  border: none; font-family: var(--font-body); font-size: 1.05rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em;
  cursor: pointer; transition: background var(--transition-base);
}
.final-submit-btn:hover:not(:disabled) { background: var(--color-accent); }
.final-submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.final-submit-loading { display: flex; align-items: center; gap: 0.6rem; }
.spinner-sm { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: var(--color-white); border-radius: 50%; animation: spin 0.7s linear infinite; }

.final-trust {
  display: flex; justify-content: center; gap: 1.75rem; flex-wrap: wrap;
  padding: 1.25rem clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 4vw, 2.5rem);
  font-size: 0.78rem; color: var(--color-black); opacity: 0.5;
}
.final-trust span { display: flex; align-items: center; gap: 0.4rem; }
.final-trust svg { stroke: var(--color-accent); opacity: 0.8; flex-shrink: 0; }

/* ── Navigation ────────────────────────────────────────────────────────────── */
.wizard-nav { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
.btn { display: inline-flex; align-items: center; justify-content: center; }
.btn-outline { padding: 0.85rem 2rem; border: 2px solid var(--color-primary); background: transparent; color: var(--color-primary); font-family: var(--font-body); font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer; transition: all var(--transition-base); text-decoration: none; }
.btn-outline:hover { background: var(--color-primary); color: var(--color-white); }
button:disabled { opacity: 0.45; cursor: not-allowed; }

/* ── States ────────────────────────────────────────────────────────────────── */
.loading-state { text-align: center; padding: 3rem; opacity: 0.6; }
.spinner { width: 36px; height: 36px; border: 3px solid var(--color-tertiary); border-top-color: var(--color-accent); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
@keyframes spin { to { transform: rotate(360deg); } }
.error-msg { background: #fff5f5; border: 1px solid #feb2b2; color: #c53030; padding: 1rem 1.25rem; margin-bottom: 1.5rem; font-size: 0.9rem; }

/* ── Confirmation ──────────────────────────────────────────────────────────── */
.confirmation-section { background: var(--color-secondary); }
.confirm-icon { width: 80px; height: 80px; border-radius: 50%; background: var(--color-accent); color: var(--color-white); font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; }
.quote-ref-block { display: inline-flex; flex-direction: column; gap: 0.4rem; background: var(--color-white); border: 1px solid rgba(0,0,0,0.08); padding: 1.25rem 2.5rem; margin: 2rem 0; box-shadow: var(--shadow-sm); }
.quote-ref-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.5; }
.quote-ref { font-family: var(--font-heading); font-size: 1.75rem; color: var(--color-primary); }
.confirm-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem; }

/* ── SEO ───────────────────────────────────────────────────────────────────── */
.seo-section { background: var(--color-white); border-top: 1px solid rgba(0,0,0,0.06); }
.seo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem 3rem; }
.seo-item h3 { font-size: 1rem; font-family: var(--font-heading); color: var(--color-primary); margin-bottom: 0.75rem; }
.seo-item p { font-size: 0.9rem; opacity: 0.7; line-height: 1.7; }

/* ── Responsive ────────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .event-type-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .event-type-grid { grid-template-columns: 1fr 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .date-selects { grid-template-columns: 1fr 1.5fr 1.2fr; }
  .festival-service-grid { grid-template-columns: 1fr; }
  .seo-grid { grid-template-columns: 1fr; gap: 2rem; }
  .step-connector { width: clamp(1rem, 4vw, 2.5rem); }
  .step-label { font-size: 0.65rem; }
  .location-toggle { flex-direction: column; }
  .mode-switcher { flex-direction: column; }
  .mode-btn:first-child { border-right: none; border-bottom: 2px solid var(--color-primary); }
  .product-card-inner { flex-direction: column; gap: 1rem; }
  .product-price-block { text-align: left; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
  .product-price { font-size: 1.3rem; }
  .confirm-actions { flex-direction: column; align-items: center; }
  .menu-cards { grid-template-columns: repeat(2, 1fr); }
  .menu-card-img { height: 130px; }
  .menu-card-ctrl { gap: 0.5rem; }
  .qty-presets { gap: 0.3rem; }
  .guests-row { flex-direction: column; align-items: flex-start; }

  /* Dish row — empile le nom et les contrôles verticalement */
  .dish-row { flex-direction: column; align-items: flex-start; gap: 0.6rem; padding: 0.85rem; }
  .dish-row-left { width: 100%; }
  .dish-row-ctrl { width: 100%; justify-content: flex-start; }

  /* Total bar */
  .total-line { flex-direction: column; gap: 0.2rem; align-items: flex-start; }
  .total-line-amounts { gap: 0.5rem; }
  .total-grand { flex-direction: column; align-items: flex-start; gap: 0.4rem; }
  .total-grand-amounts { align-items: flex-start; }

  /* Services */
  .service-row { flex-direction: column; gap: 0.5rem; }
  .service-row-right { align-self: flex-end; }

  /* Final step */
  .final-trust { gap: 1rem; flex-direction: column; align-items: flex-start; padding-left: clamp(1.5rem, 4vw, 3rem); }
}

/* ── Mobile (< 480px) — petits téléphones ──────────────────────────────────── */
@media (max-width: 480px) {
  /* Hero */
  .hero-section { padding: 3.5rem 0 2.5rem; }
  .hero-badges { gap: 0.4rem; }
  .hero-badge { font-size: 0.72rem; padding: 0.3rem 0.65rem; }

  /* Wizard padding */
  .wizard-section { padding: 2rem 0; }
  .step-card { padding: 1.25rem 1rem; }
  .step-card--menu { padding: 1rem; }

  /* Progress bar — masquer les labels, réduire les cercles */
  .step-circle { width: 32px; height: 32px; font-size: 0.8rem; }
  .step-label { font-size: 0.6rem; letter-spacing: 0; max-width: 52px; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .step-connector { width: clamp(0.75rem, 3vw, 1.5rem); margin-top: 15px; }
  .progress-bar { margin-bottom: 2rem; }

  /* Step helper */
  .step-helper { padding: 0.85rem 1rem; font-size: 0.85rem; }

  /* Step 1 — 1 colonne sur très petits écrans */
  .event-type-grid { grid-template-columns: 1fr; gap: 0.6rem; }
  .event-type-card { flex-direction: row; align-items: center; text-align: left; padding: 0.9rem 1rem; gap: 0.75rem; }
  .et-icon { font-size: 1.6rem; }
  .et-sub { display: none; }

  /* Step 2 */
  .step-title { font-size: 1.25rem; margin-bottom: 1.5rem; }
  .date-selects { grid-template-columns: 1fr 1fr; gap: 0.4rem; }
  .date-selects select:last-child { grid-column: span 2; }
  .guests-presets { display: flex; flex-wrap: wrap; gap: 0.35rem; }
  .guests-preset { flex: 0 0 auto; }
  .guests-btn { width: 44px; height: 46px; }
  .guests-number { width: 70px; font-size: 1.1rem; }
  .slot-grid { gap: 0.4rem; }
  .slot-chip { padding: 0.55rem 0.85rem; font-size: 0.85rem; }
  .location-opt { padding: 0.65rem 1rem; font-size: 0.85rem; }

  /* Step 3 — Mode switcher */
  .mode-btn { padding: 0.8rem 1rem; font-size: 0.82rem; }

  /* Step 3 — Formule cards */
  .product-card { padding: 1rem; }
  .formule-inclus-cat { flex-direction: column; gap: 0.25rem; }
  .formule-inclus-cat-label { min-width: unset; }

  /* Step 3 — Menu à la carte — 1 colonne sur très petits écrans */
  .menu-cards { grid-template-columns: 1fr; }
  .menu-card-img { height: 140px; }
  .menu-card-body { padding: 0.75rem; }
  .menu-card-name { font-size: 0.9rem; }
  .menu-card-price { font-size: 0.95rem; }
  .menu-card-ctrl { margin-top: 0.4rem; gap: 0.4rem; }

  /* Qty controls — plus grands pour les doigts */
  .qty-btn { width: 38px; height: 38px; font-size: 1.2rem; }
  .qty-btn--sm { width: 34px; height: 34px; font-size: 1.1rem; }
  .qty-input { width: 50px; height: 38px; }
  .qty-input--sm { width: 44px; height: 34px; }
  .qty-preset--all { font-size: 0.8rem; padding: 0.35rem 0.7rem; }
  .qty-reset { width: 32px; height: 32px; font-size: 1.1rem; }

  /* Dish panel */
  .dish-panel-body { padding: 1rem; }
  .dish-panel-header { padding: 0.75rem 1rem; font-size: 0.85rem; }

  /* Total */
  .total-bar { margin-top: 1.5rem; }
  .total-line { font-size: 0.85rem; }
  .amount-ttc-lg { font-size: 1.2rem; }

  /* Festival */
  .festival-service-card { padding: 1rem; }
  .festival-service-icon { font-size: 1.3rem; }

  /* Step 4 */
  .final-hero { flex-direction: column; gap: 0.75rem; padding: 1.5rem 1.25rem; }
  .final-hero-emoji { font-size: 1.8rem; }
  .final-hero-text h2 { font-size: 1.2rem; }
  .final-summary { padding: 1rem 1.25rem; }
  .final-form { padding: 1.25rem 1rem 0; }
  .final-submit-btn { width: calc(100% - 2rem); margin: 1.25rem 1rem 0; font-size: 0.95rem; padding: 1rem; }
  .final-trust { padding: 1rem 1.25rem 1.5rem; font-size: 0.75rem; gap: 0.65rem; }

  /* Confirmation */
  .confirm-icon { width: 64px; height: 64px; font-size: 1.6rem; }
  .quote-ref { font-size: 1.5rem; }

  /* Wizard nav */
  .wizard-nav { flex-direction: column-reverse; gap: 0.75rem; }
  .wizard-nav .btn { width: 100%; text-align: center; }
  .btn-outline { width: 100%; justify-content: center; }
}
</style>
