<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="navbar">
    <div class="container navbar-container">
      <RouterLink to="/" class="logo-wrapper">
        <img src="/logos/dark_logo.png" alt="Fresh Events" class="nav-logo" />
      </RouterLink>

      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle Navigation">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>

      <nav :class="{ 'nav-links': true, 'active': isMenuOpen }">
        <RouterLink to="/" @click="isMenuOpen = false">Accueil</RouterLink>
        <RouterLink to="/offre" @click="isMenuOpen = false">Notre Offre</RouterLink>
        <RouterLink to="/pourquoi-fresh-events" @click="isMenuOpen = false">Pourquoi Nous</RouterLink>
        <RouterLink to="/savoir-faire" @click="isMenuOpen = false">Savoir-Faire</RouterLink>
        <RouterLink to="/solutions" @click="isMenuOpen = false">Solutions</RouterLink>
        <RouterLink to="/contact" class="btn btn-primary nav-cta" @click="isMenuOpen = false">Contact</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: var(--color-white);
  color: var(--color-black);
  padding: 1.5rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 4px solid var(--color-black);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-wrapper {
  display: block;
  line-height: 0;
}

.nav-logo {
  height: 60px;
  width: auto;
  object-fit: contain;
  /* Optionnel : si le logo est sur fond transparent avec texte noir, on peut l'inverser ou lui donner un fond */
  /* background-color: var(--color-secondary); */
  /* padding: 5px; */
  /* border-radius: 4px; */
  border: 2px solid var(--color-black);
  box-shadow: 4px 4px 0px var(--color-primary);
  background: var(--color-secondary); /* Fond crème pour matcher le style sticker */
}

.nav-links {
  display: flex;
  gap: 30px;
  align-items: center;
}

.nav-links a {
  color: var(--color-black);
  font-family: var(--font-heading);
  text-transform: uppercase;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.nav-links a:not(.btn):hover {
  color: var(--color-primary);
  text-decoration: underline;
  text-decoration-thickness: 3px;
}

.nav-cta {
  padding: 10px 20px;
  font-size: 1rem;
  box-shadow: 3px 3px 0 var(--color-white);
  border-color: var(--color-white);
}
.nav-cta:hover {
  box-shadow: 1px 1px 0 var(--color-white);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 6px;
}

.bar {
  width: 30px;
  height: 4px;
  background-color: var(--color-black);
  /* Brutalist bars */
  box-shadow: 2px 2px 0px var(--color-primary); 
}

@media (max-width: 900px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: var(--color-black);
    flex-direction: column;
    padding: 20px 0;
    display: none;
    border-bottom: 4px solid var(--color-primary);
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links a {
    padding: 15px;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #333;
  }
}
</style>
