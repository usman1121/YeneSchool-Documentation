export default defineAppConfig({
  docus: {
    locale: 'en',
    colorMode: '',
  },
  search: {
    fts: false,
  },

  seo: {
    title: 'YeneSchool — School Management System',
    description:
      'User guides, role-based walkthroughs, and feature documentation for YeneSchool — the all-in-one school management platform built for Ethiopian schools.',
  },

  header: {
    title: 'YeneSchool',
    logo: {
      alt: 'YeneSchool',
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
      display: 'wordmark',
      favicon: '/favicon.svg',
      class: 'h-12 w-auto',
    },
  },

  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc',
    },
    fonts: {
      sans: 'Lexend Deca',
      mono: 'JetBrains Mono',
    },
    modal: {
      overlay: 'bg-neutral-950/40 dark:bg-black/65 backdrop-blur-md',
      content: 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-2xl rounded-2xl overflow-hidden',
    },
    contentSearch: {
      modal: 'sm:max-w-2xl',
    },
  },

  socials: {
    website: 'https://yeneschool.me',
    telegram: 'https://t.me/yeneschool',
    linkedin: 'https://linkedin.com/company/yeneschool',
    x: 'https://x.com/yeneschool',
  },

  toc: {
    title: 'On this page',
  },

  navigation: false,

  assistant: {
    floatingInput: false,
    explainWithAi: false,
    faqQuestions: [
      'How do I mark student attendance offline?',
      'How do I switch to the Ethiopian Calendar?',
      'How do I generate report cards?',
      'How can parents view their child\'s grades?',
      'How do I pay school fees?',
      'How do I bulk import students with CSV?',
      'How do I configure the school bell (siren)?',
    ],
  },
})
