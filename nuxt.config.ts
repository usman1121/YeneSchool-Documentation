export default defineNuxtConfig({
  extends: ['docus'],
  devtools: { enabled: false },
  css: ['~/app.css'],

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
        { name: 'theme-color', content: '#2563eb' },
        { property: 'og:title', content: 'YeneSchool Documentation' },
        {
          property: 'og:description',
          content: 'Guides for Directors, Teachers, Parents, Finance officers, and Registrars.',
        },
        { property: 'og:site_name', content: 'YeneSchool Docs' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
})