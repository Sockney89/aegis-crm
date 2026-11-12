<template>
  <div>
    <h2 class="text-xl font-semibold text-slate-800 mb-2">Mock workflows</h2>
    <p class="text-sm text-slate-500 mb-6">Aegis workflow runs for mock email and webhook integrations.</p>
    <div class="card">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-slate-500 border-b border-slate-200">
            <th class="py-3 px-2">Trigger</th>
            <th class="py-3 px-2">Service</th>
            <th class="py-3 px-2">Status</th>
            <th class="py-3 px-2">Payload</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="run in runs" :key="run.id" class="border-b border-slate-100">
            <td class="py-3 px-2 font-medium text-slate-800">{{ run.trigger }}</td>
            <td class="py-3 px-2 text-slate-600">{{ run.service }}</td>
            <td class="py-3 px-2 text-emerald-600">{{ run.status }}</td>
            <td class="py-3 px-2 text-slate-600">{{ run.payload }}</td>
          </tr>
          <tr v-if="!runs.length">
            <td colspan="4" class="py-6 text-center text-slate-400">No workflow runs yet</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const runs = ref([])
onMounted(async () => {
  const { data } = await api.get('/workflows')
  runs.value = data
})
</script>

<style scoped>
.card { @apply bg-white rounded-[1.35rem] border border-[#dfe3dc] p-5 shadow-[0_12px_35px_rgba(31,55,49,.05)]; }
</style>
