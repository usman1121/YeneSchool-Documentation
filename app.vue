<script setup lang="ts">
import type { ContentNavigationItem, PageCollections } from '@nuxt/content'
import * as nuxtUiLocales from '@nuxt/ui/locale'

const appConfig = useAppConfig()
const { seo } = appConfig
useDocusShortcuts()
const site = useSiteConfig()
const { locale, locales, isEnabled, switchLocalePath } = useDocusI18n()
const { isEnabled: isAssistantEnabled } = useAssistant()

const nuxtUiLocale = computed(() => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales] || nuxtUiLocales.en)
// /en and /am are real route prefixes (Nuxt Content collections), so the html lang/dir
// must follow the route even though the i18n strategy is `no_prefix` and the runtime
// locale can lag behind the path on direct visits/hard reloads.
const routeForLang = useRoute()
const routeLang = computed<'en' | 'am'>(() =>
  routeForLang.path === '/am' || routeForLang.path.startsWith('/am/') ? 'am' : 'en',
)
const lang = computed(() => (routeLang.value === 'am' ? 'am' : (nuxtUiLocale.value.code || 'en')))
const dir = computed(() => (routeLang.value === 'am' ? 'ltr' : nuxtUiLocale.value.dir))
const collectionName = computed(() => isEnabled.value ? `docs_${locale.value}` : 'docs')

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang,
    dir,
  },
})

useSeoMeta({
  titleTemplate: seo.titleTemplate,
  title: seo.title,
  description: seo.description,
  ogSiteName: site.name,
  twitterCard: 'summary_large_image',
})

if (isEnabled.value) {
  const route = useRoute()
  const defaultLocale = useRuntimeConfig().public.i18n.defaultLocale!
  onMounted(() => {
    const currentLocale = route.path.split('/')[1]
    if (!locales.some(locale => locale.code === currentLocale)) {
      return navigateTo(switchLocalePath(defaultLocale) as string)
    }
  })
}

const { data: rawNavigation } = await useAsyncData(() => `navigation_${collectionName.value}`, () => queryCollectionNavigation(collectionName.value as keyof PageCollections), {
  watch: [locale],
})

// Docus mounts each locale's docs under content/<locale>/** with a /<locale> prefix, so the
// navigation tree comes back wrapped in a single top-level node named after the locale
// (e.g. "En"/"Am"). Unwrap it so the sidebar shows the actual section links directly.
const navigation = computed<ContentNavigationItem[] | null | undefined>(() => {
  const nav = rawNavigation.value
  if (!Array.isArray(nav)) return nav
  return nav.length === 1 && nav[0]?.children?.length ? nav[0].children : nav
})

provide('navigation', navigation)

const { subNavigationMode } = useSubNavigation(navigation)
</script>

<template>
  <UApp :locale="nuxtUiLocale">
    <NuxtLoadingIndicator color="var(--ui-primary)" :height="3" />

    <div class="flex">
      <div
        class="flex-1 min-w-0"
        :class="{ 'docus-sub-header': subNavigationMode === 'header' }"
      >
        <AppHeader v-if="$route.meta.header !== false" />
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
        <AppFooter v-if="$route.meta.footer !== false" />

        <ClientOnly>
          <AppSearch :navigation="navigation" />
          <LazyAssistantFloatingInput v-if="isAssistantEnabled" />
        </ClientOnly>
      </div>

      <ClientOnly v-if="isAssistantEnabled">
        <LazyAssistantPanel />
      </ClientOnly>
    </div>
  </UApp>
</template>

<style>
@media (min-width: 1024px) {
  .docus-sub-header {
    --ui-header-height: 112px;
  }
}
</style>
