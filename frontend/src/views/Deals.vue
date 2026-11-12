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
            <td class="py-3 px-2 text-right space-x-2">
              <button v-if="nextStage(d.stage)" @click="advance(d)" class="text-emerald-600 hover:text-emerald-700 text-xs">Move to {{ nextStage(d.stage) }}</button>
              <button @click="openEdit(d)" class="text-brand-600 hover:text-brand-700 text-xs">Edit</button>
              <button @click="remove(d.id)" class="text-red-600 hover:text-red-700 text-xs">Delete</button>
            </td>
          </tr>
          <tr v-if="!deals.length">
            <td colspan="4" class="py-6 text-center text-slate-400">No deals yet</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal :open="modalOpen" :title="editingId ? 'Edit deal' : 'New deal'" @close="modalOpen = false">
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
import { useToastStore } from '../stores/toast'

const toast = useToastStore()
const deals = ref([])
const modalOpen = ref(false)
const saving = ref(false)
const editingId = ref(null)
const form = ref({ title: '', stage: 'lead', amount: 0 })

async function load() {
  const { data } = await api.get('/deals')
  deals.value = data
}
onMounted(load)

function openCreate() {
  editingId.value = null
  form.value = { title: '', stage: 'lead', amount: 0 }
  modalOpen.value = true
}

function openEdit(d) {
  editingId.value = d.id
  form.value = { title: d.title || '', stage: d.stage || 'lead', amount: d.amount || 0 }
  modalOpen.value = true
}

async function create() {
  saving.value = true
  try {
    if (editingId.value) {
      await api.put(`/deals/${editingId.value}`, form.value)
      toast.success('Deal updated')
    } else {
      await api.post('/deals', form.value)
      toast.success('Deal created')
    }
    modalOpen.value = false
    await load()
  } finally {
    saving.value = false
  }
}

async function remove(id) {
  if (!confirm('Delete this deal?')) return
  await api.delete(`/deals/${id}`)
  toast.success('Deal deleted')
  await load()
}

function nextStage(stage) {
  const next = { lead: 'qualified', qualified: 'proposal', proposal: 'won' }
  return next[stage] || ''
}

async function advance(deal) {
  const next = nextStage(deal.stage)
  if (!next) return
  await api.post(`/deals/${deal.id}/transition`, { stage: next })
  toast.success(`Deal moved to ${next}; mock email and webhook delivered`)
  await load()
}
</script>

<style scoped>
.card { @apply bg-white rounded-[1.35rem] border border-[#dfe3dc] p-5 shadow-[0_12px_35px_rgba(31,55,49,.05)]; }
.input { @apply w-full px-3 py-2.5 border border-[#d9ddd5] rounded-xl bg-[#fbfbf8] focus:outline-none focus:ring-2 focus:ring-brand-500; }
.btn-primary { @apply px-4 py-2.5 bg-[#123d3a] text-white rounded-xl font-semibold hover:bg-[#087f70]; }
</style>
