<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useLanguage } from '~/composables/useLanguage'

const { t, initLanguage } = useLanguage()

const words = computed(() => (t.value.paragraph || '').split(' '))

let ctx: gsap.Context | null = null

onMounted(() => {
  initLanguage()
  if (typeof window !== 'undefined') {
    ctx = gsap.context(() => {
      // Cinematic Reveal Wipe animation for the main title
      gsap.from('.hero-title-wipe', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.8,
        ease: 'power3.inOut',
      })

      // Spotlight Reveal animation for paragraph
      gsap.from('.hero-paragraph .split-char', {
        opacity: 0.1,
        scale: 0.8,
        filter: 'blur(4px)',
        stagger: {
          each: 0.014,
          from: 'center',
        },
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.6,
      })

      // Staggered Entrance for Action Buttons
      gsap.from('.cta-btn-wrapper', {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.8,
        clearProps: 'all',
      })
    })
  }
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <div class="home-hero-container relative w-full h-[calc(100vh-7rem)] flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 text-center select-none">
    <!-- Geometric Pattern Background (Full Viewport Width & Height) -->
    <div class="pattern-background pointer-events-none fixed inset-0 w-screen h-screen -z-10" />

    <div class="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center space-y-6">
      <!-- Clean Static Headline with Gradient Brand -->
      <h1 class="hero-title-wipe w-full max-w-7xl font-black tracking-[-0.04em] text-zinc-900 dark:text-white leading-[0.98] text-[clamp(48px,8vw,114px)] [text-wrap:balance]">
        {{ t.titleLine1 }}
        <br />
        <span class="text-zinc-900 dark:text-white mr-3 sm:mr-4">{{ t.forWord }}</span>
        <span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent inline-block">
          {{ t.typedBrand || 'YeneSchool' }}
        </span>
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

      <!-- Primary Action Buttons -->
      <div class="hero-cta-buttons flex flex-wrap items-center justify-center gap-4 pt-3">
        <div class="cta-btn-wrapper inline-block">
          <UButton
            to="/guides/getting-started"
            size="xl"
            trailing-icon="i-lucide-arrow-right"
            class="px-8 py-3.5 font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-base sm:text-lg"
          >
            {{ t.getStarted }}
          </UButton>
        </div>
        <div class="cta-btn-wrapper inline-block">
          <UButton
            to="/guides/directory"
            color="neutral"
            variant="outline"
            size="xl"
            icon="i-lucide-book-open"
            class="px-8 py-3.5 font-semibold hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-base sm:text-lg"
          >
            {{ t.browseGuides }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
