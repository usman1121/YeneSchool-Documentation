<script setup lang="ts">
import LanguageSwitcher from './LanguageSwitcher.vue'

const appConfig = useAppConfig()
const colorMode = useColorMode()
const { isEnabled: isAssistantEnabled } = useAssistant()
const { subNavigationMode } = useSubNavigation()

const route = useRoute()
const isHomePage = computed(() => route.path === '/' || route.path === '')
</script>

<template>
  <UHeader
    :ui="{
      root: 'border-none bg-transparent sticky top-0 z-50',
      container: 'flex items-center justify-between h-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      left: 'flex items-center gap-3',
      center: 'flex-1 flex items-center justify-center',
      right: 'flex items-center gap-2',
      toggle: 'hidden'
    }"
    :toggle="false"
  >
    <AppHeaderCenter v-if="!isHomePage" />

    <template #left>
      <AppHeaderLeft />
    </template>

    <template #right>
      <div class="flex items-center gap-1.5">
        <AppHeaderCTA />

        <template v-if="isAssistantEnabled">
          <AssistantChat />
        </template>

        <!-- Main Website Link -->
        <UButton
          to="https://yeneschool.com"
          target="_blank"
          size="sm"
          class="flex items-center justify-center h-8 w-8"
          color="neutral"
          variant="ghost"
          icon="i-lucide-globe"
          aria-label="Visit YeneSchool Website"
        />

        <!-- Language Switcher -->
        <LanguageSwitcher />

        <!-- Theme Switcher (Light / Dark mode toggle) -->
        <ClientOnly>
          <UColorModeButton class="flex items-center justify-center h-8 w-8" />

          <template #fallback>
            <div class="h-8 w-8 animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md" />
          </template>
        </ClientOnly>
      </div>
    </template>

    <template #body>
      <AppHeaderBody />
    </template>

    <template
      v-if="subNavigationMode === 'header'"
      #bottom
    >
      <AppHeaderBottom />
    </template>
  </UHeader>
</template>
