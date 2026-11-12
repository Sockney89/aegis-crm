<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-slate-800">Companies</h2>
      <button @click="openCreate" class="btn-primary">+ New company</button>
    </div>
    <div class="card">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-slate-500 border-b border-slate-200">
            <th class="py-3 px-2">Name</th>
            <th class="py-3 px-2">Industry</th>
            <th class="py-3 px-2">Website</th>
            <th class="py-3 px-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in companies" :key="c.id" class="border-b border-slate-100">
            <td class="py-3 px-2 font-medium text-slate-800">{{ c.name }}</td>
            <td class="py-3 px-2 text-slate-600">{{ c.industry }}</td>
            <td class="py-3 px-2 text-slate-600">{{ c.website }}</td>
            <td class="py-3 px-2 text-right space-x-2">
              <button @click="openEdit(c)" class="text-brand-600 hover:text-brand-700 text-xs">Edit</button>
              <button @click="remove(c.id)" class="text-red-600 hover:text-red-700 text-xs">Delete</button>
            </td>
          </tr>
          <tr v-if="!companies.length">
            <td colspan="4" class="py-6 text-center text-slate-400">No companies yet</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal :open="modalOpen" :title="editingId ? 'Edit company' : 'New company'" @close="modalOpen = false">
      <form @submit.prevent="create" class="space-y-3">
        <input v-model="form.name" placeholder="Name" class="input" />
        <input v-model="form.industry" placeholder="Industry" class="input" />
        <input v-model="form.website" placeholder="Website" class="input" />
        <input v-model="form.notes" placeholder="Notes" class="input" />
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
const companies = ref([])
const modalOpen = ref(false)
const saving = ref(false)
const editingId = ref(null)
const form = ref({ name: '', industry: '', website: '', notes: '' })

async function load() {
  const { data } = await api.get('/companies')
  companies.value = data
}
onMounted(load)

function openCreate() {
  editingId.value = null
  form.value = { name: '', industry: '', website: '', notes: '' }
  modalOpen.value = true
}

function openEdit(c) {
  editingId.value = c.id
  form.value = { name: c.name || '', industry: c.industry || '', website: c.website || '', notes: c.notes || '' }
  modalOpen.value = true
}

async function create() {
  saving.value = true
  try {
    if (editingId.value) {
      await api.put(`/companies/${editingId.value}`, form.value)
      toast.success('Company updated')
    } else {
      await api.post('/companies', form.value)
      toast.success('Company created')
    }
    modalOpen.value = false
    await load()
  } finally {
    saving.value = false
  }
}

async function remove(id) {
  if (!confirm('Delete this company?')) return
  await api.delete(`/companies/${id}`)
  toast.success('Company deleted')
  await load()
}
</script>

<style scoped>
.card { @apply bg-white rounded-[1.35rem] border border-[#dfe3dc] p-5 shadow-[0_12px_35px_rgba(31,55,49,.05)]; }
.input { @apply w-full px-3 py-2.5 border border-[#d9ddd5] rounded-xl bg-[#fbfbf8] focus:outline-none focus:ring-2 focus:ring-brand-500; }
.btn-primary { @apply px-4 py-2.5 bg-[#123d3a] text-white rounded-xl font-semibold hover:bg-[#087f70]; }
</style>
