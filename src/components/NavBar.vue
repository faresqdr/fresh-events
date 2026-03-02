<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  
  // Animate menu
  if (isMenuOpen.value) {
    gsap.from('.nav-links-mobile a', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.4,
      ease: 'power3.out'
    })
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="['navbar', { 'scrolled': isScrolled }]">
    <div class="container">
      <div class="navbar-container">
        <RouterLink to="/" class="logo-wrapper">
          <img src="/logos/dark_logo.png" alt="Fresh Events" class="nav-logo" />
        </RouterLink>

        <button 
          class="menu-toggle" 
          @click="toggleMenu" 
          aria-label="Toggle Navigation"
          :class="{ 'active': isMenuOpen }"
        >
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>

        <nav class="nav-links">
          <RouterLink to="/" class="nav-link">Accueil</RouterLink>
          <RouterLink to="/offre" class="nav-link">Notre Offre</RouterLink>
          <RouterLink to="/pourquoi-fresh-events" class="nav-link">Pourquoi Nous</RouterLink>
          <RouterLink to="/savoir-faire" class="nav-link">Savoir-Faire</RouterLink>
          <RouterLink to="/solutions" class="nav-link">Solutions</RouterLink>
          <RouterLink to="/contact" class="btn btn-primary nav-cta">Contact</RouterLink>
        </nav>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="isMenuOpen" class="mobile-menu-overlay" @click="toggleMenu">
        <nav class="nav-links-mobile" @click.stop>
          <RouterLink to="/" @click="toggleMenu" class="nav-link-mobile">Accueil</RouterLink>
          <RouterLink to="/offre" @click="toggleMenu" class="nav-link-mobile">Notre Offre</RouterLink>
          <RouterLink to="/pourquoi-fresh-events" @click="toggleMenu" class="nav-link-mobile">Pourquoi Nous</RouterLink>
          <RouterLink to="/savoir-faire" @click="toggleMenu" class="nav-link-mobile">Savoir-Faire</RouterLink>
          <RouterLink to="/solutions" @click="toggleMenu" class="nav-link-mobile">Solutions</RouterLink>
          <RouterLink to="/contact" @click="toggleMenu" class="btn btn-primary btn-large nav-cta-mobile">Contact</RouterLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.navbar {
  background-color: var(--color-white);
  color: var(--color-black);
  padding: 1.25rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all var(--transition-base);
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  padding: 0.75rem 0;
  box-shadow: var(--shadow-md);
  border-bottom-color: rgba(0, 0, 0, 0.08);
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-wrapper {
  display: block;
  line-height: 0;
  transition: all var(--transition-base);
}

.logo-wrapper:hover {
  transform: scale(1.02);
}

.nav-logo {
  height: 120px;
  width: auto;
  object-fit: contain;
  transition: all var(--transition-base);
}

.navbar.scrolled .nav-logo {
  height: 96px;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav-link {
  color: var(--color-black);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  position: relative;
  padding: 0.5rem 0;
  transition: all var(--transition-base);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width var(--transition-base);
}

.nav-link:hover {
  color: var(--color-accent);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.router-link-active {
  color: var(--color-accent);
}

.nav-link.router-link-active::after {
  width: 100%;
}

.nav-cta {
  padding: 0.75rem 1.75rem;
  font-size: 0.9rem;
  margin-left: 1rem;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  padding: 0.5rem;
  position: relative;
  z-index: 1001;
}

.bar {
  width: 28px;
  height: 2px;
  background-color: var(--color-black);
  transition: all var(--transition-base);
}

.menu-toggle.active .bar:nth-child(1) {
  transform: rotate(45deg) translateY(7px);
}

.menu-toggle.active .bar:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active .bar:nth-child(3) {
  transform: rotate(-45deg) translateY(-7px);
}

/* Mobile Menu */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  justify-content: flex-end;
}

.nav-links-mobile {
  background: var(--color-white);
  width: min(400px, 85vw);
  height: 100vh;
  padding: 6rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
}

.nav-link-mobile {
  color: var(--color-black);
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 500;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  transition: all var(--transition-base);
}

.nav-link-mobile:hover {
  color: var(--color-accent);
  padding-left: 1rem;
}

.nav-link-mobile.router-link-active {
  color: var(--color-accent);
}

.nav-cta-mobile {
  margin-top: 2rem;
  text-align: center;
}

/* Mobile menu transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity var(--transition-base);
}

.mobile-menu-enter-active .nav-links-mobile,
.mobile-menu-leave-active .nav-links-mobile {
  transition: transform var(--transition-smooth);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-from .nav-links-mobile,
.mobile-menu-leave-to .nav-links-mobile {
  transform: translateX(100%);
}

@media (max-width: 1024px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    display: none;
  }
}

@media (max-width: 768px) {
  .nav-logo {
    height: 72px;
  }

  .navbar.scrolled .nav-logo {
    height: 60px;
  }

  .nav-link-mobile {
    font-size: 1.25rem;
  }
}
</style>
