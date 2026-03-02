<script setup>
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col brand-col">
          <RouterLink to="/" class="footer-logo-link">
            <img src="/logos/dark_logo.png" alt="Fresh Events" class="footer-logo" />
          </RouterLink>
          <p class="footer-tagline accent-color">Excellence en restauration événementielle</p>
          <p class="footer-description">
            Partenaire de confiance pour une gestion complète et performante 
            de vos événements.
          </p>
        </div>

        <div class="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><RouterLink to="/">Accueil</RouterLink></li>
            <li><RouterLink to="/offre">Notre Offre</RouterLink></li>
            <li><RouterLink to="/pourquoi-fresh-events">Pourquoi Nous</RouterLink></li>
            <li><RouterLink to="/savoir-faire">Savoir-Faire</RouterLink></li>
            <li><RouterLink to="/solutions">Solutions</RouterLink></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Solutions</h4>
          <ul>
            <li><RouterLink to="/solutions">Festivals & Culture</RouterLink></li>
            <li><RouterLink to="/solutions">Corporate & Séminaires</RouterLink></li>
            <li><RouterLink to="/solutions">Lieux de Loisirs</RouterLink></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Contact</h4>
          <div class="footer-contact">
            <p>105 rue des Thermes (Hôtel Saint Eloi)<br>57360 Amnéville<br>Le bureau est situé au sein de l’hôtel.</p>
            <p><a href="tel:+33372396481">03 72 39 64 81</a></p>
            <p><a href="mailto:contact@fresh-events.fr">contact@fresh-events.fr</a></p>
          </div>
          <RouterLink to="/contact" class="btn btn-primary" style="margin-top: 1.5rem; display: inline-block;">
            Nous Contacter
          </RouterLink>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>&copy; {{ currentYear }} Fresh Events. Tous droits réservés.</p>
          <div class="footer-links">
            <a href="#">Mentions Légales</a>
            <span class="separator">•</span>
            <a href="#">Confidentialité</a>
            <span class="separator">•</span>
            <a href="#">CGV</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: clamp(4rem, 8vw, 6rem) 0 2rem;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.2fr repeat(3, 1fr);
  gap: clamp(2rem, 5vw, 4rem);
  margin-bottom: 4rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.brand-col {
  max-width: 350px;
}

.footer-logo-link {
  display: inline-block;
  margin-bottom: 1.5rem;
  transition: all var(--transition-base);
}

.footer-logo-link:hover {
  transform: scale(1.05);
}

.footer-logo {
  height: 70px;
  width: auto;
  display: block;
  filter: brightness(0) invert(1);
}

.footer-tagline {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: var(--color-white);
}

.footer-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.6;
}

.footer-col h4 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: var(--color-white);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col ul li {
  margin-bottom: 0.75rem;
}

.footer-col ul li a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.95rem;
  transition: all var(--transition-base);
  display: inline-block;
}

.footer-col ul li a:hover {
  color: var(--color-white);
  padding-left: 0.5rem;
}

.footer-contact {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
}

.footer-contact p {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.footer-contact a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all var(--transition-base);
}

.footer-contact a:hover {
  color: var(--color-white);
}

.footer-bottom {
  padding-top: 2rem;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all var(--transition-base);
}

.footer-links a:hover {
  color: var(--color-white);
}

.separator {
  color: rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .brand-col {
    grid-column: 1 / -1;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
  }
}
</style>
