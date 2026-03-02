<script setup>
import { reactive, ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  message: ''
})

const isLoading = ref(false)
const formStatus = ref(null)
const statusMessage = ref('')

onMounted(() => {
  // Animations disabled for immediate visibility
  console.log('ContactView mounted - animations disabled for testing')
})

const submitForm = async () => {
  isLoading.value = true
  formStatus.value = null
  statusMessage.value = ''

  try {
    const response = await fetch('http://localhost:3001/api/create-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        message: form.message
      })
    })

    const data = await response.json()

    if (response.ok) {
      formStatus.value = 'success'
      statusMessage.value = `✓ Message envoyé avec succès! Nous vous recontacterons rapidement.`
      
      // Reset form
      form.name = ''
      form.company = ''
      form.email = ''
      form.phone = ''
      form.message = ''
    } else {
      formStatus.value = 'error'
      statusMessage.value = `Erreur lors de l'envoi. Veuillez réessayer.`
    }
  } catch (error) {
    formStatus.value = 'error'
    statusMessage.value = `Erreur de connexion. Veuillez vérifier votre connexion.`
    console.error('Form submission error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="contact-view">
    <!-- Hero Section -->
    <section class="hero-section bg-primary">
      <div class="container text-center">
        <p class="uppercase" style="color: rgba(255,255,255,0.8); font-size: 0.85rem; letter-spacing: 0.15em; margin-bottom: 1.5rem;">Contact</p>
        <h1 class="text-white">Écrivons <br><span class="accent-text">Votre Histoire</span></h1>
        <div class="accent-line accent-line-center" style="background: rgba(255,255,255,0.3); margin: 2rem auto;"></div>
        <p class="text-lg text-white" style="max-width: 700px; margin: 0 auto; opacity: 0.9;">
          Chaque grand événement commence par une conversation. 
          Partagez-nous votre projet, nous le transformerons en réussite.
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section section-padding-lg">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h3>Informations de Contact</h3>
            <div class="accent-line"></div>
            
            <div class="info-item">
              <div class="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4>Adresse</h4>
                <p>123 Avenue de l'Événement<br>75001 Paris, France</p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4>Téléphone</h4>
                <p><a href="tel:+33123456789">01 23 45 67 89</a></p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <p><a href="mailto:contact@fresh-events.fr">contact@fresh-events.fr</a></p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4>Horaires</h4>
                <p>Lun - Ven : 9h - 19h<br>Sam : 10h - 18h</p>
              </div>
            </div>
          </div>

          <div class="contact-form">
            <h3>Envoyez-nous un Message</h3>
            <div class="accent-line"></div>

            <form @submit.prevent="submitForm">
              <div v-if="formStatus === 'success'" class="status-message success">
                {{ statusMessage }}
              </div>
              <div v-if="formStatus === 'error'" class="status-message error">
                {{ statusMessage }}
              </div>

              <div class="form-group">
                <label for="name">Nom & Prénom *</label>
                <input 
                  type="text" 
                  id="name"
                  v-model="form.name" 
                  placeholder="Jean Dupont" 
                  required 
                />
              </div>

              <div class="form-group">
                <label for="company">Société / Organisation *</label>
                <input 
                  type="text" 
                  id="company"
                  v-model="form.company" 
                  placeholder="Votre entreprise" 
                  required 
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email *</label>
                  <input 
                    type="email" 
                    id="email"
                    v-model="form.email" 
                    placeholder="contact@exemple.fr" 
                    required 
                  />
                </div>
                <div class="form-group">
                  <label for="phone">Téléphone *</label>
                  <input 
                    type="tel" 
                    id="phone"
                    v-model="form.phone" 
                    placeholder="06 12 34 56 78" 
                    required 
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="message">Votre Projet</label>
                <textarea 
                  id="message"
                  rows="6" 
                  v-model="form.message" 
                  placeholder="Décrivez-nous votre projet, vos besoins, vos objectifs..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary btn-large full-width" 
                :disabled="isLoading"
              >
                {{ isLoading ? 'Envoi en cours...' : 'Envoyer le Message' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  padding: clamp(6rem, 15vw, 10rem) 0;
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(3rem, 6vw, 6rem);
  align-items: start;
}

.contact-info h3,
.contact-form h3 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
}

/* Contact Info */
.info-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.info-item:last-child {
  border-bottom: none;
}

.info-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-secondary);
  color: var(--color-accent);
  border-radius: 50%;
}

.info-item h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-black);
}

.info-item p {
  color: var(--color-black);
  opacity: 0.75;
  line-height: 1.6;
  margin: 0;
}

.info-item a {
  color: var(--color-accent);
  transition: all var(--transition-base);
}

.info-item a:hover {
  color: var(--color-primary);
}

/* Contact Form */
.contact-form {
  background: var(--color-white);
  padding: 3rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

label {
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--color-black);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

input,
textarea {
  width: 100%;
  padding: 0.9rem 1.1rem;
  background: var(--color-secondary);
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-family: var(--font-body);
  font-size: 1rem;
  transition: all var(--transition-base);
  color: var(--color-black);
}

input:focus,
textarea:focus {
  outline: none;
  background: var(--color-white);
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.full-width {
  width: 100%;
}

.status-message {
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  font-weight: 500;
}

.status-message.success {
  background: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #4caf50;
}

.status-message.error {
  background: #ffebee;
  color: #c62828;
  border: 1px solid #f44336;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .contact-info {
    order: 2;
    margin-top: 3rem;
  }

  .contact-form {
    order: 1;
  }
}

@media (max-width: 768px) {
  .contact-form {
    padding: 2rem 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
