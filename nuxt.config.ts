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
    preset: 'vercel-static',
  },

  hooks: {
    'build:done': async () => {
      try {
        const { resolve } = await import('node:path')
        const { existsSync } = await import('node:fs')
        const { readFile, writeFile } = await import('node:fs/promises')
        const vcPath = resolve('.vercel/output/config.json')
        if (existsSync(vcPath)) {
          const data = await readFile(vcPath, 'utf8')
          const cfg = JSON.parse(data)
          if (Array.isArray(cfg.routes)) {
            const prevCount = cfg.routes.length
            cfg.routes = cfg.routes.filter((r: any) => {
              if (r.dest && r.dest.includes('/raw/')) return false
              if (r.dest === '/llms.txt') return false
              if (r.headers && r.headers['content-type']?.includes('text/markdown')) return false
              if (r.headers && r.headers['vary'] === 'Accept, User-Agent') return false
              return true
            })
            await writeFile(vcPath, JSON.stringify(cfg, null, 2), 'utf8')
            console.log(`[vercel-fix] Sanitized config.json routes from ${prevCount} to ${cfg.routes.length}`)
          }
        }
      } catch (e) {
        console.warn('[vercel-fix] Could not sanitize config.json:', e)
      }
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