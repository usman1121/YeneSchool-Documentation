<template>
  <!-- Intercept mermaid fenced blocks and render with Mermaid component -->
  <Mermaid v-if="language === 'mermaid'" :code="code" />
  <div v-else class="prose-code-wrapper">
    <pre :class="`language-${language}`"><code v-html="highlightedCode" /></pre>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string
  language?: string
  filename?: string
  highlights?: number[]
}>()

// For non-mermaid blocks just show the raw code (Docus will handle highlighting)
const highlightedCode = computed(() => props.code)
</script>
