// Loads mermaid from CDN and makes it available globally (client-side only)
export default defineNuxtPlugin(() => {
  // Mermaid is loaded on-demand inside the Mermaid.vue component via CDN
  // Nothing needed here — the component uses a dynamic script tag
})
