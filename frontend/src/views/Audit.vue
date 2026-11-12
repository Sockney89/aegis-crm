<template>
  <div>
    <h2 class="text-xl font-semibold text-slate-800 mb-6">Audit log</h2>
    <div class="card">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-slate-500 border-b border-slate-200">
            <th class="py-3 px-2">Action</th>
            <th class="py-3 px-2">Entity</th>
            <th class="py-3 px-2">ID</th>
            <th class="py-3 px-2">When</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in logs" :key="a.id" class="border-b border-slate-100">
            <td class="py-3 px-2 font-medium text-slate-800">{{ a.action }}</td>
            <td class="py-3 px-2 text-slate-600">{{ a.entity_type }}</td>
            <td class="py-3 px-2 text-slate-600">{{ a.entity_id }}</td>
            <td class="py-3 px-2 text-slate-600">{{ a.created_at }}</td>
          </tr>
          <tr v-if="!logs.length">
            <td colspan="4" class="py-6 text-center text-slate-400">No audit entries</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const logs = ref([])
onMounted(async () => {
  const { data } = await api.get('/audit')
  logs.value = data
})
</script>

<style scoped>
.card { @apply bg-white rounded-[1.35rem] border border-[#dfe3dc] p-5 shadow-[0_12px_35px_rgba(31,55,49,.05)]; }
</style>
