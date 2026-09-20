<template>
  <div
    class="mermaid-wrapper my-6 flex justify-center overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6"
  >
    <div v-if="loading" class="text-gray-400 text-sm py-4 animate-pulse">Rendering diagram…</div>
    <div v-else ref="el" class="mermaid-diagram max-w-full" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{ code: string }>()

const el = ref<HTMLElement | null>(null)
const loading = ref(true)

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = reject
    document.head.appendChild(s)
  })
}

async function render() {
  if (!el.value || !props.code) return
  loading.value = true

  // Load mermaid from CDN if not already loaded
  await loadScript('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js')

  const mermaid = (window as any).mermaid
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

  const id = `mermaid-${Math.random().toString(36).slice(2)}`
  try {
    const { svg } = await mermaid.render(id, props.code)
    if (el.value) el.value.innerHTML = svg
  } catch (e) {
    if (el.value) el.value.innerHTML = `<pre class="text-red-500 text-xs">${props.code}</pre>`
  }
  loading.value = false
}

onMounted(render)
watch(() => props.code, render)
</script>
