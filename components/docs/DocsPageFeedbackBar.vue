<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  pageTitle?: string
}>()

const route = useRoute()
const { open: openAssistant, isEnabled: isAssistantEnabled } = useAssistant()

const feedbackGiven = ref<'yes' | 'no' | null>(null)
const copied = ref(false)
const showSuggestModal = ref(false)
const suggestionText = ref('')
const suggestionSubmitted = ref(false)

function handleFeedback(type: 'yes' | 'no') {
  feedbackGiven.value = type
  if (type === 'no') {
    showSuggestModal.value = true
  }
}

function submitSuggestion() {
  if (!suggestionText.value.trim()) return
  suggestionSubmitted.value = true
  showSuggestModal.value = false
  // Store suggestion in localStorage
  try {
    const list = JSON.parse(localStorage.getItem('yeneschool_suggestions') || '[]')
    list.push({ path: route.path, text: suggestionText.value, timestamp: new Date().toISOString() })
    localStorage.setItem('yeneschool_suggestions', JSON.stringify(list))
  } catch {}
}

function copyPageLink() {
  if (typeof window !== 'undefined') {
    navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

function askAiAboutPage() {
  if (isAssistantEnabled?.value && openAssistant) {
    openAssistant(`Can you explain the key steps and features of "${props.pageTitle || 'this guide'}" in simple terms?`, true)
  } else {
    navigateTo('/ai/overview')
  }
}
</script>

<template>
  <div class="my-8 pt-6 border-t border-dashed border-neutral-200 dark:border-neutral-800">
    <div class="p-5 rounded-2xl bg-gradient-to-r from-neutral-50 via-indigo-50/20 to-neutral-50 dark:from-neutral-900 dark:via-indigo-950/20 dark:to-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm transition-all duration-200">
      
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <!-- Left: Was this guide helpful? -->
        <div class="flex items-center gap-3">
          <div class="size-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <UIcon name="i-lucide-sparkles" class="size-5" />
          </div>

          <div>
            <h4 class="text-sm font-semibold text-neutral-900 dark:text-white">
              Was this guide helpful?
            </h4>
            <p v-if="!feedbackGiven && !suggestionSubmitted" class="text-xs text-neutral-500 dark:text-neutral-400">
              Help us improve YeneSchool documentation for all educators.
            </p>
            <p v-else-if="suggestionSubmitted" class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              ✨ Thank you! Your feedback has been sent to our documentation team.
            </p>
            <p v-else class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              ❤️ Thank you for letting us know!
            </p>
          </div>
        </div>

        <!-- Middle: Feedback Action Buttons -->
        <div v-if="!feedbackGiven && !suggestionSubmitted" class="flex items-center gap-2">
          <UButton
            size="sm"
            color="neutral"
            variant="subtle"
            icon="i-lucide-thumbs-up"
            class="hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 transition-colors font-medium px-3 py-1.5"
            @click="handleFeedback('yes')"
          >
            Yes, helpful
          </UButton>

          <UButton
            size="sm"
            color="neutral"
            variant="subtle"
            icon="i-lucide-message-square-plus"
            class="hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-950/40 dark:hover:text-amber-400 transition-colors font-medium px-3 py-1.5"
            @click="handleFeedback('no')"
          >
            Suggest an edit
          </UButton>
        </div>

        <!-- Right: Helpful Utility Actions -->
        <div class="flex items-center flex-wrap gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-200/60 dark:border-neutral-800 w-full md:w-auto justify-end">
          <!-- Ask AI Assistant Button -->
          <UButton
            size="xs"
            color="primary"
            variant="soft"
            icon="i-lucide-bot"
            class="font-medium"
            @click="askAiAboutPage"
          >
            Ask AI Assistant
          </UButton>

          <!-- Copy Link -->
          <UButton
            size="xs"
            color="neutral"
            variant="ghost"
            :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
            class="font-medium"
            @click="copyPageLink"
          >
            {{ copied ? 'Link Copied!' : 'Copy Link' }}
          </UButton>

          <!-- Need Help / Support Ticket -->
          <UButton
            to="/guides/support-error-reporting"
            size="xs"
            color="neutral"
            variant="ghost"
            icon="i-lucide-life-buoy"
            class="font-medium"
          >
            Need Help?
          </UButton>

          <!-- Telegram Channel -->
          <UButton
            to="https://t.me/yeneschool"
            target="_blank"
            size="xs"
            color="neutral"
            variant="ghost"
            icon="i-lucide-send"
            class="font-medium"
          >
            Community
          </UButton>
        </div>

      </div>

      <!-- In-Line Suggestion Form (Opens when user clicks Suggest an edit) -->
      <div v-if="showSuggestModal && !suggestionSubmitted" class="mt-4 pt-4 border-t border-neutral-200/60 dark:border-neutral-800">
        <p class="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-1.5">
          <UIcon name="i-lucide-edit-3" class="size-3.5 text-primary" />
          What information was missing or needs improvement on this page?
        </p>
        <div class="flex gap-2">
          <input
            v-model="suggestionText"
            type="text"
            placeholder="e.g. Please clarify step 3 for Ethiopian Calendar setup..."
            class="flex-1 text-xs px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            @keydown.enter="submitSuggestion"
          />
          <UButton
            size="xs"
            color="primary"
            class="px-4 font-semibold"
            @click="submitSuggestion"
          >
            Send Feedback
          </UButton>
          <UButton
            size="xs"
            color="neutral"
            variant="ghost"
            @click="showSuggestModal = false"
          >
            Cancel
          </UButton>
        </div>
      </div>

    </div>
  </div>
</template>
