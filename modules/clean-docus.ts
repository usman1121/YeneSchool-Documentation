import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'clean-docus',
  },
  setup(_options, nuxt) {
    nuxt.hook('modules:done', () => {
      // Remove GitHub config so Docus never renders Edit this page / Report issue buttons
      if (nuxt.options.appConfig) {
        delete (nuxt.options.appConfig as any).github
      }
    })

    nuxt.hook('nitro:config', (nitroConfig) => {
      if (nitroConfig.runtimeConfig?.app) {
        delete (nitroConfig.runtimeConfig.app as any).github
      }
    })
  },
})
