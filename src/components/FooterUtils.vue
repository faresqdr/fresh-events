<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-col brand-col">
        <RouterLink to="/" class="footer-logo-link">
          <img src="/logos/dark_logo.png" alt="Fresh Events" class="footer-logo" />
        </RouterLink>
        <p class="accent-font subheading">On nourrit votre succès.</p>
        <p>Expert en restauration événementielle et gestion clé en main.</p>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><RouterLink to="/">Accueil</RouterLink></li>
          <li><RouterLink to="/offre">Notre Offre</RouterLink></li>
          <li><RouterLink to="/pourquoi-fresh-events">Pourquoi Nous</RouterLink></li>
          <li><RouterLink to="/savoir-faire">Savoir-Faire</RouterLink></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Solutions</h4>
        <ul>
          <li><RouterLink to="/solutions">Festivals</RouterLink></li>
          <li><RouterLink to="/solutions">Entreprises</RouterLink></li>
          <li><RouterLink to="/solutions">Lieux de Loisirs</RouterLink></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Parlons-en</h4>
        <p>Prêt à discuter de votre projet ?</p>
        <RouterLink to="/contact" class="btn btn-primary" style="margin-top: 15px;">Nous Contacter</RouterLink>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Fresh Events. Conçu pour performer.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-white);
  color: var(--color-black);
  padding: 80px 0 30px;
  margin-top: auto;
  border-top: 5px solid var(--color-black);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 50px;
  margin-bottom: 50px;
}

.footer-logo-link {
  display: inline-block;
  margin-bottom: 20px;
  background-color: var(--color-secondary);
  border: 3px solid var(--color-white);
  box-shadow: 4px 4px 0px var(--color-primary);
  padding: 5px;
  transform: rotate(-2deg);
}

.footer-logo {
  height: 70px;
  width: auto;
  display: block;
}

.highlight {
  color: var(--color-primary);
}

.subheading {
  font-size: 1.2rem;
  margin-bottom: 20px;
  display: block;
}

h4 {
  color: var(--color-primary);
  margin-bottom: 25px;
  font-family: var(--font-recoleta);
  font-size: 1.8rem;
  letter-spacing: 0.5px;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  margin-bottom: 12px;
}

ul li a {
  color: var(--color-black);
  text-decoration: none;
  font-family: var(--font-heading);
  text-transform: uppercase;
  font-weight: 800;
  font-size: 1rem; 
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}

ul li a:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 2px 5px;
  border-color: var(--color-black);
  box-shadow: 3px 3px 0px var(--color-black);
  transform: rotate(-2deg);
  display: inline-block;
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 2px solid #333;
  font-family: var(--font-heading);
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;
}
</style>
