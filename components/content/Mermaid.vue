<template>
  <div class="mermaid-wrapper my-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
    <div ref="el" class="mermaid-diagram" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{ code: string }>()
const el = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!el.value || !props.code) return

  let attempts = 0
  while (!(window as any).mermaid && attempts++ < 20) {
    await new Promise(r => setTimeout(r, 100))
  }

  const mermaid = (window as any).mermaid
  if (!mermaid) return

  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      primaryColor: '#EFF6FF',
      primaryTextColor: '#1e3a8a',
      primaryBorderColor: '#60A5FA',
      lineColor: '#60A5FA',
      secondaryColor: '#DBEAFE',
      tertiaryColor: '#F0F9FF',
      edgeLabelBackground: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '20px',
    },
    flowchart: { curve: 'basis', padding: 32, nodeSpacing: 80, rankSpacing: 100 },
  })

  const id = `m${Math.random().toString(36).slice(2)}`
  try {
    const { svg } = await mermaid.render(id, props.code)
    if (el.value) {
      el.value.innerHTML = svg
      const svgEl = el.value.querySelector('svg')
      if (svgEl) {
        svgEl.style.width = '100%'
        svgEl.style.maxWidth = '100%'
        svgEl.style.height = 'auto'
        svgEl.removeAttribute('width')
        svgEl.removeAttribute('height')
      }
    }
  } catch {
    if (el.value) el.value.innerHTML = `<pre class="text-xs text-red-400 whitespace-pre-wrap">${props.code}</pre>`
  }
})
</script>

<style scoped>
.mermaid-diagram :deep(svg) {
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  min-height: 200px;
}
.mermaid-diagram :deep(.node rect),
.mermaid-diagram :deep(.node circle),
.mermaid-diagram :deep(.node polygon) {
  stroke-width: 2px;
}
.mermaid-diagram :deep(.nodeLabel) {
  font-size: 18px !important;
}
</style>
