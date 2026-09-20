<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const feedbackSubmitted = ref(false)
const feedbackType = ref<'helpful' | 'not-helpful' | null>(null)

function submitFeedback(type: 'helpful' | 'not-helpful') {
  feedbackType.value = type
  feedbackSubmitted.value = true
  
  // Track in local storage if helpful
  try {
    const feedbackList = JSON.parse(localStorage.getItem('yeneschool_doc_feedback') || '[]')
    feedbackList.push({ path: route.path, type, timestamp: new Date().toISOString() })
    localStorage.setItem('yeneschool_doc_feedback', JSON.stringify(feedbackList))
  } catch {}
}
</script>

<template>
  <div class="docs-right-aside-bottom pt-4 space-y-4 text-sm select-none">
    <USeparator type="dashed" class="opacity-60" />

    <!-- Helpful Feedback Box -->
    <div class="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 transition-all duration-200">
      <div v-if="!feedbackSubmitted">
        <p class="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-2.5 flex items-center gap-1.5">
          <UIcon name="i-lucide-thumbs-up" class="size-3.5 text-primary" />
          Was this guide helpful?
        </p>
        <div class="flex items-center gap-2">
          <UButton
            size="xs"
            color="neutral"
            variant="subtle"
            icon="i-lucide-smile"
            class="flex-1 justify-center py-1.5 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 transition-colors"
            @click="submitFeedback('helpful')"
          >
            Yes
          </UButton>
          <UButton
            size="xs"
            color="neutral"
            variant="subtle"
            icon="i-lucide-frown"
            class="flex-1 justify-center py-1.5 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition-colors"
            @click="submitFeedback('not-helpful')"
          >
            No
          </UButton>
        </div>
      </div>

      <!-- After Feedback Submission State -->
      <div v-else class="text-center py-1">
        <p class="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
          <UIcon name="i-lucide-check-circle-2" class="size-3.5" />
          Thank you for your feedback!
        </p>
      </div>
    </div>

    <!-- Need Support / Help Links -->
    <div class="space-y-2">
      <p class="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 px-1">
        Need Help?
      </p>

      <div class="flex flex-col gap-1">
        <NuxtLink
          to="/guides/support-error-reporting"
          class="flex items-center gap-2 px-2 py-1.5 text-xs rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors font-medium"
        >
          <UIcon name="i-lucide-life-buoy" class="size-3.5 text-primary" />
          <span>Submit Support Ticket</span>
        </NuxtLink>

        <a
          href="https://t.me/yeneschool"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-2 py-1.5 text-xs rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors font-medium"
        >
          <UIcon name="i-lucide-send" class="size-3.5 text-sky-500" />
          <span>Telegram Community</span>
        </a>

        <a
          href="mailto:support@yeneschool.me"
          class="flex items-center gap-2 px-2 py-1.5 text-xs rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors font-medium"
        >
          <UIcon name="i-lucide-mail" class="size-3.5 text-indigo-500" />
          <span>Email Support Desk</span>
        </a>
      </div>
    </div>
  </div>
</template>
