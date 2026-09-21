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
    '/guides': { redirect: { to: '/en/guides/getting-started', statusCode: 302 } },
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
        // Preload mermaid so diagrams render instantly (no loading delay)
        { rel: 'preload', as: 'script', href: 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js' },
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js', defer: true },
      ],
    },
  },
})