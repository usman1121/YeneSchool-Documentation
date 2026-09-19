<script setup lang="ts">
const { sidebarNavigation } = useSubNavigation()
const contentNavVariants = useUIConfig('contentNavigation')
</script>

<template>
  <div class="sidebar-nav-wrapper py-2">
    <UContentNavigation
      :collapsible="true"
      :highlight="contentNavVariants.highlight ?? true"
      :highlight-color="contentNavVariants.highlightColor"
      :variant="contentNavVariants.variant ?? 'link'"
      :color="contentNavVariants.color"
      :navigation="sidebarNavigation"
      class="space-y-1"
    />
  </div>
</template>
