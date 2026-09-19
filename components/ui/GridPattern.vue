<script setup lang="ts">
import { useId } from 'vue'

interface Props {
  width?: number
  height?: number
  x?: number
  y?: number
  squares?: Array<[number, number]>
  strokeDasharray?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: 40,
  height: 40,
  x: -1,
  y: -1,
  strokeDasharray: '0',
  squares: () => [
    [4, 4],
    [5, 1],
    [8, 2],
    [5, 3],
    [5, 5],
    [10, 10],
    [12, 15],
    [15, 10],
    [10, 15],
    [15, 10],
    [10, 15],
    [15, 10],
  ]
})

const id = useId()
</script>

<template>
  <svg
    aria-hidden="true"
    :class="[
      'pointer-events-none absolute inset-0 h-full w-full fill-gray-400/25 stroke-gray-400/25 dark:fill-gray-600/30 dark:stroke-gray-600/30',
      props.class
    ]"
  >
    <defs>
      <pattern
        :id="id"
        :width="width"
        :height="height"
        patternUnits="userSpaceOnUse"
        :x="x"
        :y="y"
      >
        <path
          :d="`M.5 ${height}V.5H${width}`"
          fill="none"
          :stroke-dasharray="strokeDasharray"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" stroke-width="0" :fill="`url(#${id})`" />
    <svg v-if="squares?.length" :x="x" :y="y" class="overflow-visible">
      <rect
        v-for="([sqX, sqY], idx) in squares"
        :key="`${sqX}-${sqY}-${idx}`"
        stroke-width="0"
        :width="width - 1"
        :height="height - 1"
        :x="sqX * width + 1"
        :y="sqY * height + 1"
      />
    </svg>
  </svg>
</template>
