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
      favicon: '/favicon.ico',
      class: 'h-12 w-auto',
    },
  },

  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'zinc',
    },
    fonts: {
      sans: 'Lexend Deca',
      mono: 'JetBrains Mono',
    },
  },

  socials: {
    website: 'https://yeneschool.com',
    telegram: 'https://t.me/yeneschool',
    linkedin: 'https://linkedin.com/company/yeneschool',
    x: 'https://x.com/yeneschool',
  },

  toc: {
    title: 'On this page',
    bottom: {
      title: 'Need help?',
      links: [
        {
          icon: 'i-lucide-message-circle',
          label: 'Contact Support',
          to: 'mailto:support@yeneschool.com',
          target: '_blank',
        },
      ],
    },
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
