<script setup lang="ts">
const appConfig = useAppConfig()
const { hasLogo, headerLightUrl, headerDarkUrl, contextMenuItems } = useLogoAssets()
</script>

<template>
  <div class="flex items-center select-none">
    <UContextMenu v-if="hasLogo" :items="contextMenuItems">
      <div class="flex items-center">
        <img
          :src="headerLightUrl || '/logo-light.svg'"
          :alt="appConfig.header?.logo?.alt || 'YeneSchool'"
          class="h-8 w-auto shrink-0 block dark:hidden"
          style="height: 32px; max-height: 32px; width: auto;"
        />
        <img
          :src="headerDarkUrl || '/logo-dark.svg'"
          :alt="appConfig.header?.logo?.alt || 'YeneSchool'"
          class="h-8 w-auto shrink-0 hidden dark:block"
          style="height: 32px; max-height: 32px; width: auto;"
        />
      </div>
    </UContextMenu>
    <span v-else class="text-xl font-bold text-primary">
      {{ appConfig.header?.title || 'YeneSchool' }}
    </span>
  </div>
</template>