<template>
  <div class="contact-view">
    <section class="contact-hero section-padding">
      <div class="container grid-2">
         <div class="hero-txt">
            <h1>Marquons <br><span class="highlight">L'Histoire.</span></h1>
            <p class="subtitle accent-font">Anticipation = Réussite.</p>
            <div class="info-box">
                <p><strong>HQ:</strong> 123 Avenue de l'Événement, Paris</p>
                <p><strong>Tel:</strong> 01 23 45 67 89</p>
                <p><strong>Mail:</strong> contact@fresh-events.fr</p>
            </div>
         </div>
         <div class="form-wrapper">
             <div class="paper-stack"></div>
             <form class="brutalist-form" @submit.prevent="submitForm">
                 <h2>Projet Info</h2>
                 
                 <div class="form-group">
                     <label>Identité</label>
                     <input type="text" v-model="form.name" placeholder="Nom & Prénom" required />
                 </div>
                 
                 <div class="form-group">
                     <label>Structure</label>
                     <input type="text" v-model="form.company" placeholder="Société / Organisme" required />
                 </div>
                 
                 <div class="form-row">
                     <div class="form-group">
                         <label>Email</label>
                         <input type="email" v-model="form.email" placeholder="hello@world.com" required />
                     </div>
                     <div class="form-group">
                         <label>Tel</label>
                         <input type="tel" v-model="form.phone" placeholder="06..." required />
                     </div>
                 </div>

                 <div class="form-group">
                     <label>Le Pitch</label>
                     <textarea rows="4" v-model="form.message" placeholder="Dites-nous tout..."></textarea>
                 </div>

                 <button type="submit" class="btn btn-primary full-width">Envoyer 🚀</button>
             </form>
         </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  message: ''
})

const submitForm = () => {
  alert('BOOM! Message sent (simulation).')
}
</script>

<style scoped>
.contact-hero {
    background: var(--color-black);
    color: var(--color-white);
    min-height: 90vh;
    display: flex;
    align-items: center;
}

.highlight { 
    color: var(--color-primary); 
    text-shadow: 4px 4px 0px var(--color-white);
}

.subtitle {
    font-size: 2rem;
    color: var(--color-secondary);
    margin-bottom: 40px;
}

.info-box p {
    font-size: 1.2rem;
    margin-bottom: 10px;
    border-left: 3px solid var(--color-primary);
    padding-left: 15px;
}

.form-wrapper {
    position: relative;
}

.paper-stack {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 100%;
    height: 100%;
    background: var(--color-secondary);
    border: 3px solid var(--color-white);
    z-index: 0;
}

.brutalist-form {
    position: relative;
    background: var(--color-white);
    padding: 40px;
    border: 3px solid var(--color-white);
    color: var(--color-black);
    z-index: 1;
    transform: translate(-10px, -10px);
    transition: transform 0.3s;
}

.brutalist-form:hover {
    transform: translate(0, 0);
}

.brutalist-form h2 {
    color: var(--color-black);
    border-bottom: 3px solid var(--color-black);
    padding-bottom: 10px;
    margin-bottom: 30px;
}

.form-group { margin-bottom: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

label {
    display: block;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    font-family: var(--font-heading);
}

input, textarea {
    width: 100%;
    padding: 15px;
    background: #f0f0f0;
    border: 2px solid var(--color-black);
    font-family: var(--font-body);
    font-size: 1rem;
    transition: all 0.2s;
}

input:focus, textarea:focus {
    outline: none;
    background: var(--color-white);
    border-color: var(--color-primary);
    box-shadow: 4px 4px 0px var(--color-primary);
}

.full-width { width: 100%; }

@media (max-width: 900px) {
    .grid-2 { grid-template-columns: 1fr; }
    .form-wrapper { margin-top: 50px; }
}
</style>
