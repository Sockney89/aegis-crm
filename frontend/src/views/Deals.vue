<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-slate-800">Deals</h2>
      <button @click="openCreate" class="btn-primary">+ New deal</button>
    </div>
    <div class="card">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-slate-500 border-b border-slate-200">
            <th class="py-3 px-2">Title</th>
            <th class="py-3 px-2">Stage</th>
            <th class="py-3 px-2">Amount</th>
            <th class="py-3 px-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in deals" :key="d.id" class="border-b border-slate-100">
            <td class="py-3 px-2 font-medium text-slate-800">{{ d.title }}</td>
            <td class="py-3 px-2">
              <span class="px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-700">{{ d.stage }}</span>
            </td>
            <td class="py-3 px-2 text-slate-600">${{ Number(d.amount).toLocaleString() }}</td>
            <td class="py-3 px-2 text-right">
              <button @click="remove(d.id)" class="text-red-600 hover:text-red-700 text-xs">Delete</button>
            </td>
          </tr>
          <tr v-if="!deals.length">
            <td colspan="4" class="py-6 text-center text-slate-400">No deals yet</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal :open="modalOpen" title="New deal" @close="modalOpen = false">
      <form @submit.prevent="create" class="space-y-3">
        <input v-model="form.title" placeholder="Title" class="input" />
        <select v-model="form.stage" class="input">
          <option value="lead">Lead</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
        <input v-model.number="form.amount" type="number" placeholder="Amount" class="input" />
        <button class="btn-primary w-full" :disabled="saving">{{ saving ? 'Saving...' : 'Save' }}</button>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'
import Modal from '../components/Modal.vue'

const deals = ref([])
const modalOpen = ref(false)
const saving = ref(false)
const form = ref({ title: '', stage: 'lead', amount: 0 })

async function load() {
  const { data } = await api.get('/deals')
  deals.value = data
}
onMounted(load)

function openCreate() {
  form.value = { title: '', stage: 'lead', amount: 0 }
  modalOpen.value = true
}

async function create() {
  saving.value = true
  try {
    await api.post('/deals', form.value)
    modalOpen.value = false
    await load()
  } finally {
    saving.value = false
  }
}

async function remove(id) {
  if (!confirm('Delete this deal?')) return
  await api.delete(`/deals/${id}`)
  await load()
}
</script>

<style scoped>
.card { @apply bg-white rounded-xl border border-slate-200 p-4; }
.input { @apply w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500; }
.btn-primary { @apply px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700; }
</style>
