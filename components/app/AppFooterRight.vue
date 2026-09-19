<script setup lang="ts">
const appConfig = useAppConfig()
const colorMode = useColorMode()

interface FooterLink {
  icon: string
  to: string
  target: '_blank'
  'aria-label': string
}

const iconMap: Record<string, string> = {
  website: 'i-lucide-globe',
  telegram: 'i-simple-icons-telegram',
  linkedin: 'i-simple-icons-linkedin',
  x: 'i-simple-icons-x',
  twitter: 'i-simple-icons-x',
  facebook: 'i-simple-icons-facebook',
  youtube: 'i-simple-icons-youtube',
}

const links = computed<FooterLink[]>(() => {
  return Object.entries(appConfig.socials || {}).flatMap(([key, url]) => {
    if (typeof url !== 'string' || !url) return []

    const icon = iconMap[key.toLowerCase()] || `i-simple-icons-${key}`

    return [{
      icon,
      to: url,
      target: '_blank' as const,
      'aria-label': `${key} link`,
    }]
  })
})
</script>

<template>
  <div class="flex items-center gap-1.5">
    <template v-if="links.length">
      <UButton
        v-for="(link, index) of links"
        :key="index"
        size="sm"
        class="flex items-center justify-center h-8 w-8 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
      />
    </template>
  </div>
</template>
