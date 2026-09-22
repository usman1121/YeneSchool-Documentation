import { copyFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, join } from 'node:path'

// Helper to crawl all markdown files in content subdirectories so all locale routes prerender statically
function getContentRoutes(dir: string, base = ''): string[] {
  const routes: string[] = []
  if (!existsSync(dir)) return routes
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.')) continue
    const fullPath = join(dir, entry)
    const isDir = statSync(fullPath).isDirectory()
    const cleanSegment = entry.replace(/^\d+\./, '').replace(/\.md$/, '')
    const routePath = `${base}/${cleanSegment}`
    if (isDir) {
      routes.push(...getContentRoutes(fullPath, routePath))
    } else if (entry.endsWith('.md')) {
      routes.push(cleanSegment === 'index' ? (base || '/') : routePath)
    }
  }
  return routes
}

// Ensure Docus recognizes Amharic locale (Docus checks node_modules/docus/i18n/locales/)
try {
  const amLocaleSrc = resolve(__dirname, 'locales/am.json')
  const docusLocaleDir = resolve(__dirname, 'node_modules/docus/i18n/locales')
  if (existsSync(amLocaleSrc) && existsSync(docusLocaleDir)) {
    copyFileSync(amLocaleSrc, resolve(docusLocaleDir, 'am.json'))
  }
} catch (e) {
  console.warn('[i18n] Failed to copy am.json to docus:', e)
}

export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['@nuxtjs/i18n'],
  devtools: { enabled: false },
  css: ['~/app.css'],

  // Light is the default; the header toggle still works (persists via `color-mode` cookie).
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English',  file: 'en.json' },
      { code: 'am', name: 'አማርኛ',    file: 'am.json' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    langDir: 'locales/',
    lazy: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'sp_lang',
      redirectOn: 'root',
    },
  },

  routeRules: {
    '/': { redirect: { to: '/en', statusCode: 302 } },
    '/guides': { redirect: { to: '/en/guides/getting-started', statusCode: 302 } },
  },

  llms: false,

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: [
        '/en',
        '/am',
        ...getContentRoutes(resolve(__dirname, 'content/en'), '/en'),
        ...getContentRoutes(resolve(__dirname, 'content/am'), '/am'),
      ],
    },
  },

  app: {
    head: {
      title: 'YeneSchool Docs',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'User guides, role-based walkthroughs, and feature documentation for YeneSchool — the all-in-one school management platform built for Ethiopian schools.',
        },
        { name: 'theme-color', content: '#60a5fa' },
        { property: 'og:title', content: 'YeneSchool Documentation' },
        {
          property: 'og:description',
          content: 'Guides for Directors, Teachers, Parents, Finance officers, and Registrars.',
        },
        { property: 'og:site_name', content: 'YeneSchool Docs' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
        // Preload mermaid so diagrams render instantly (no loading delay)
        { rel: 'preload', as: 'script', href: 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js' },
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js', defer: true },
      ],
    },
  },
})