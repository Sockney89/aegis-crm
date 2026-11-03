<template>
  <div v-if="open" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" @click.self="close">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-slate-800">{{ title }}</h3>
        <button @click="close" class="text-slate-400 hover:text-slate-600">✕</button>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({ open: Boolean, title: String })
const emit = defineEmits(['close'])
function close() { emit('close') }
</script>
