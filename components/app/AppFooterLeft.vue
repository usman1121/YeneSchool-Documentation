<template>
  <div class="flex items-center gap-2 text-sm text-muted">
    <!-- Graduation cap icon -->
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>
    <span>
      Copyright © {{ new Date().getFullYear() }}
      <strong class="text-foreground font-semibold">YeneSchool</strong>
      · All rights reserved.
    </span>
  </div>
</template>
