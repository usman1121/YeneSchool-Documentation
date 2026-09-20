<template>
  <div class="mermaid-wrapper my-6 flex justify-center overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
    <div ref="el" class="mermaid-diagram max-w-full" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{ code: string }>()
const el = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!el.value || !props.code) return

  // Wait for mermaid global (loaded via page <head> script tag)
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
      fontSize: '14px',
    },
    flowchart: { curve: 'basis', padding: 20 },
  })

  const id = `m${Math.random().toString(36).slice(2)}`
  try {
    const { svg } = await mermaid.render(id, props.code)
    if (el.value) el.value.innerHTML = svg
  } catch {
    if (el.value) el.value.innerHTML = `<pre class="text-xs text-red-400 whitespace-pre-wrap">${props.code}</pre>`
  }
})
</script>
