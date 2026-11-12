<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-slate-800">Contacts</h2>
      <button @click="openCreate" class="btn-primary">+ New contact</button>
    </div>
    <div class="card">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-slate-500 border-b border-slate-200">
            <th class="py-3 px-2">Name</th>
            <th class="py-3 px-2">Email</th>
            <th class="py-3 px-2">Phone</th>
            <th class="py-3 px-2">Notes</th>
            <th class="py-3 px-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in contacts" :key="c.id" class="border-b border-slate-100">
            <td class="py-3 px-2 font-medium text-slate-800">{{ c.name }}</td>
            <td class="py-3 px-2 text-slate-600">{{ c.email }}</td>
            <td class="py-3 px-2 text-slate-600">{{ c.phone }}</td>
            <td class="py-3 px-2 text-slate-600">{{ c.notes }}</td>
            <td class="py-3 px-2 text-right">
              <button @click="remove(c.id)" class="text-red-600 hover:text-red-700 text-xs">Delete</button>
            </td>
          </tr>
          <tr v-if="!contacts.length">
            <td colspan="5" class="py-6 text-center text-slate-400">No contacts yet</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal :open="modalOpen" title="New contact" @close="modalOpen = false">
      <form @submit.prevent="create" class="space-y-3">
        <input v-model="form.name" placeholder="Name" class="input" />
        <input v-model="form.email" placeholder="Email" class="input" />
        <input v-model="form.phone" placeholder="Phone" class="input" />
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

const contacts = ref([])
const modalOpen = ref(false)
const saving = ref(false)
const form = ref({ name: '', email: '', phone: '', notes: '' })

async function load() {
  const { data } = await api.get('/contacts')
  contacts.value = data
}
onMounted(load)

function openCreate() {
  form.value = { name: '', email: '', phone: '', notes: '' }
  modalOpen.value = true
}

async function create() {
  saving.value = true
  try {
    await api.post('/contacts', form.value)
    modalOpen.value = false
    toast.success('Contact created')
    await load()
  } finally {
    saving.value = false
  }
}

async function remove(id) {
  if (!confirm('Delete this contact?')) return
  await api.delete(`/contacts/${id}`)
  toast.success('Contact deleted')
  await load()
}
</script>

<style scoped>
.card { @apply bg-white rounded-xl border border-slate-200 p-4; }
.input { @apply w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500; }
.btn-primary { @apply px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700; }
</style>
