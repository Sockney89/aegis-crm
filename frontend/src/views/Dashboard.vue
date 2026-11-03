<template>
  <div>
    <h2 class="text-xl font-semibold text-slate-800 mb-6">Dashboard</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="card">
        <div class="text-sm text-slate-500">Contacts</div>
        <div class="text-3xl font-bold text-slate-800 mt-1">{{ stats.contacts }}</div>
      </div>
      <div class="card">
        <div class="text-sm text-slate-500">Companies</div>
        <div class="text-3xl font-bold text-slate-800 mt-1">{{ stats.companies }}</div>
      </div>
      <div class="card">
        <div class="text-sm text-slate-500">Deals</div>
        <div class="text-3xl font-bold text-slate-800 mt-1">{{ stats.deals }}</div>
      </div>
    </div>
    <div class="card">
      <h3 class="font-semibold text-slate-800 mb-3">Quick actions</h3>
      <div class="flex gap-3 flex-wrap">
        <router-link to="/contacts" class="btn-secondary">Manage contacts</router-link>
        <router-link to="/companies" class="btn-secondary">Manage companies</router-link>
        <router-link to="/deals" class="btn-secondary">Manage deals</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const stats = ref({ contacts: 0, companies: 0, deals: 0 })

onMounted(async () => {
  try {
    const { data } = await api.get('/stats')
    stats.value = data
  } catch (e) {}
})
</script>

<style scoped>
.card { @apply bg-white rounded-xl border border-slate-200 p-6; }
.btn-secondary { @apply px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200; }
</style>
