<template>
  <div ref="root" class="relative">
    <button
      @click.stop="open = !open"
      class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      :title="$t('lang.switch')"
    >
      <span class="hidden sm:inline text-gray-700 dark:text-gray-300">{{ currentLocale?.name }}</span>
      <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <Transition name="dropdown">
      <div
        v-if="open"
        class="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden"
        @click.stop
      >
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="switchLocale(locale.code)"
          class="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          :class="locale.code === currentCode ? 'text-blue-500 font-semibold' : 'text-gray-700 dark:text-gray-300'"
        >
          <span>{{ locale.name }}</span>
          <svg v-if="locale.code === currentCode" class="w-3.5 h-3.5 ml-auto text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { locale, locales, setLocale } = useI18n()
const open = ref(false)
const root = ref<HTMLElement | null>(null)

const currentCode = computed(() => locale.value)
const currentLocale = computed(() => (locales.value as any[]).find(l => l.code === locale.value))
const availableLocales = computed(() => locales.value as any[])

async function switchLocale(code: string) {
  await setLocale(code)
  open.value = false
  const route = useRoute()
  let targetPath = route.path
  if (code === 'am') {
    if (targetPath === '/en' || targetPath === '/') targetPath = '/am'
    else if (targetPath.startsWith('/en/')) targetPath = targetPath.replace(/^\/en\//, '/am/')
  } else {
    if (targetPath === '/am' || targetPath === '/') targetPath = '/en'
    else if (targetPath.startsWith('/am/')) targetPath = targetPath.replace(/^\/am\//, '/en/')
  }
  if (targetPath !== route.path) {
    navigateTo(targetPath)
  }
}

function onClickOutside(event: MouseEvent) {
  if (root.value && !root.value.contains(event.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active { transition: all 0.15s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
