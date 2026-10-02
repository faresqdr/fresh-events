/**
 * `scripts/generate-sitemap.js` filtre les routes marquées `meta.robots:
 * noindex` pour ne jamais les faire fuiter dans le sitemap public (ex: la
 * page partenariat Zoo, volontairement hors indexation). On teste ici
 * exactement la même logique de filtrage que le script, appliquée à
 * `routeDefs` — une régression silencieuse (une page noindex qui réapparaît
 * dans le sitemap) ne romprait rien visuellement, elle ne se verrait qu'à
 * l'audit SEO.
 */
import { describe, expect, it } from 'vitest'
import { routeDefs as routes } from '../src/router/routes.js'

function publicRoutes(routeList) {
  return routeList.filter((route) => !route.meta?.robots?.includes('noindex'))
}

describe('sitemap: filtrage des routes publiques', () => {
  it('exclut toute route marquée noindex', () => {
    const result = publicRoutes(routes)
    for (const route of result) {
      expect(route.meta?.robots?.includes('noindex')).not.toBe(true)
    }
  })

  it('garde la page d\'accueil et la page devis', () => {
    const paths = publicRoutes(routes).map((r) => r.path)
    expect(paths).toContain('/')
    expect(paths).toContain('/devis')
  })

  it('exclut bien la page partenariat Zoo (marquée noindex)', () => {
    const zooRoute = routes.find((r) => r.path.includes('zoo'))
    expect(zooRoute, 'la route zoo devrait exister dans routeDefs').toBeTruthy()
    expect(zooRoute.meta?.robots).toContain('noindex')
    expect(publicRoutes(routes)).not.toContain(zooRoute)
  })

  it('ne renvoie jamais une liste vide (régression totale du filtre)', () => {
    expect(publicRoutes(routes).length).toBeGreaterThan(0)
  })

  it('chaque route publique a un path commençant par "/"', () => {
    for (const route of publicRoutes(routes)) {
      expect(route.path.startsWith('/')).toBe(true)
    }
  })
})
