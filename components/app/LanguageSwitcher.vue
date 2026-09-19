<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLanguage, type SupportedLang } from '~/composables/useLanguage'

const { currentLang, languages, setLanguage, initLanguage } = useLanguage()

onMounted(() => {
  initLanguage()
})

const items = computed(() => {
  return languages.map(lang => ({
    label: `${lang.nativeLabel} (${lang.label})`,
    icon: currentLang.value === lang.code ? 'i-lucide-check' : undefined,
    onSelect: () => setLanguage(lang.code as SupportedLang),
    class: currentLang.value === lang.code ? 'font-semibold text-primary' : '',
  }))
})
</script>

<template>
  <ClientOnly>
    <UDropdownMenu
      :items="items"
      :content="{ align: 'end', side: 'bottom', sideOffset: 6 }"
    >
      <UButton
        size="sm"
        color="neutral"
        variant="ghost"
        icon="i-lucide-languages"
        class="flex items-center justify-center h-8 w-8"
        aria-label="Switch Language"
      />
    </UDropdownMenu>

    <template #fallback>
      <div class="h-8 w-8 animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md" />
    </template>
  </ClientOnly>
</template>
