<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useLanguage } from '~/composables/useLanguage'

const { t, currentLang, initLanguage } = useLanguage()

const words = computed(() => (t.value.paragraph || '').split(' '))

const typedText = ref('')
let typingTimer: any = null

function runInfiniteTypewriter() {
  if (typingTimer) clearTimeout(typingTimer)
  
  let isDeleting = false
  let charIndex = 0
  const targetWord = t.value.typedBrand || 'YeneSchool'

  function tick() {
    const currentTarget = t.value.typedBrand || 'YeneSchool'
    if (!isDeleting) {
      charIndex++
      typedText.value = currentTarget.slice(0, charIndex)

      if (charIndex >= currentTarget.length) {
        // Pause when full word is typed
        typingTimer = setTimeout(() => {
          isDeleting = true
          tick()
        }, 2400)
        return
      }
      typingTimer = setTimeout(tick, 130)
    } else {
      charIndex--
      typedText.value = currentTarget.slice(0, charIndex)

      if (charIndex <= 0) {
        // Pause briefly before typing again
        isDeleting = false
        typingTimer = setTimeout(tick, 600)
        return
      }
      typingTimer = setTimeout(tick, 65)
    }
  }

  tick()
}

// Restart typewriter when language changes
watch(currentLang, () => {
  typedText.value = ''
  runInfiniteTypewriter()
})

let ctx: gsap.Context | null = null

onMounted(() => {
  initLanguage()
  if (typeof window !== 'undefined') {
    ctx = gsap.context(() => {
      // Slower, cinematic Reveal Wipe animation for the big title
      gsap.from('.hero-title-wipe', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 2.2,
        ease: 'power3.inOut',
      })

      // Start infinite auto-typing
      setTimeout(() => {
        runInfiniteTypewriter()
      }, 700)

      // Spotlight Reveal animation for paragraph
      gsap.from('.hero-paragraph .split-char', {
        opacity: 0.1,
        scale: 0.8,
        filter: 'blur(4px)',
        stagger: {
          each: 0.016,
          from: 'center',
        },
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.8,
      })

      // Delayed Cinematic Reveal for CTA Action Buttons (reveals after headline and paragraph)
      gsap.from('.hero-cta-buttons .cta-button', {
        opacity: 0,
        y: 28,
        scale: 0.92,
        filter: 'blur(8px)',
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 1.85,
        clearProps: 'filter',
      })
    })
  }
})

onUnmounted(() => {
  if (ctx) ctx.revert()
  if (typingTimer) clearTimeout(typingTimer)
})
</script>

<template>
  <div class="home-hero-container relative w-full h-[calc(100vh-7rem)] flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 text-center select-none">
    <!-- Geometric Pattern Background (Full Viewport Width & Height) -->
    <div class="pattern-background pointer-events-none fixed inset-0 w-screen h-screen -z-10" />

    <div class="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center space-y-6">
      <!-- Slower Reveal Wipe Main Headline with Infinite Auto-Typed YeneSchool -->
      <h1 class="hero-title-wipe w-full max-w-7xl font-black tracking-[-0.04em] text-zinc-900 dark:text-white leading-[0.98] text-[clamp(48px,8vw,114px)] [text-wrap:balance]">
        {{ t.titleLine1 }}
        <br />
        <span class="text-zinc-900 dark:text-white">{{ t.forWord }} </span>
        <span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent min-w-[5ch] inline-block text-left">
          {{ typedText || '\u00A0' }}
        </span>
        <span class="inline-block w-[3px] sm:w-[4px] h-[0.82em] bg-indigo-600 dark:bg-blue-400 align-middle ml-1 -mt-1 animate-pulse" />
      </h1>

      <!-- Spotlight Reveal Description Paragraph -->
      <p class="hero-paragraph max-w-3xl text-[clamp(17px,2vw,22px)] text-zinc-600 dark:text-zinc-300 leading-relaxed opacity-95 [text-wrap:balance]">
        <span
          v-for="(word, wIdx) in words"
          :key="wIdx"
          class="inline-block whitespace-nowrap mr-[0.28em]"
        >
          <span
            v-for="(char, cIdx) in word"
            :key="cIdx"
            class="split-char inline-block will-change-transform"
          >{{ char }}</span>
        </span>
      </p>

      <!-- Primary Action Buttons (Animated Delayed Reveal) -->
      <div class="hero-cta-buttons flex flex-wrap items-center justify-center gap-4 pt-3">
        <UButton
          to="/guides/getting-started"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
          class="cta-button px-8 py-3.5 font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-base sm:text-lg"
        >
          {{ t.getStarted }}
        </UButton>
        <UButton
          to="/guides"
          color="neutral"
          variant="outline"
          size="xl"
          icon="i-lucide-book-open"
          class="cta-button px-8 py-3.5 font-semibold hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-base sm:text-lg"
        >
          {{ t.browseGuides }}
        </UButton>
      </div>
    </div>
  </div>
</template>
