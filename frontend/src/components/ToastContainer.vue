<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 w-80">
    <div
      v-for="t in toast.items"
      :key="t.id"
      class="rounded-lg shadow-lg px-4 py-3 text-sm text-white flex items-start justify-between gap-3"
      :class="{
        'bg-green-600': t.type === 'success',
        'bg-red-600': t.type === 'error',
        'bg-slate-700': t.type === 'info',
      }"
    >
      <span>{{ t.message }}</span>
      <button class="opacity-80 hover:opacity-100" @click="toast.dismiss(t.id)">×</button>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toast'
const toast = useToastStore()
</script>
