<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-slate-800">Tags</h2>
      <button @click="openCreate" class="btn-primary">+ New tag</button>
    </div>
    <div class="card">
      <ul class="space-y-2">
        <li v-for="t in tags" :key="t.id" class="flex items-center justify-between border-b border-slate-100 py-2">
          <span class="text-slate-800">{{ t.name }}</span>
          <div class="space-x-2">
            <button @click="openEdit(t)" class="text-brand-600 text-xs">Edit</button>
            <button @click="remove(t.id)" class="text-red-600 text-xs">Delete</button>
          </div>
        </li>
        <li v-if="!tags.length" class="text-slate-400 text-center py-6">No tags yet</li>
      </ul>
    </div>

    <Modal :open="modalOpen" :title="editingId ? 'Edit tag' : 'New tag'" @close="modalOpen = false">
      <form @submit.prevent="create" class="space-y-3">
        <input v-model="form.name" placeholder="Name" class="input" />
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

const tags = ref([])
const modalOpen = ref(false)
const saving = ref(false)
const editingId = ref(null)
const form = ref({ name: '' })

async function load() {
  const { data } = await api.get('/tags')
  tags.value = data
}
onMounted(load)

function openCreate() {
  editingId.value = null
  form.value = { name: '' }
  modalOpen.value = true
}

function openEdit(t) {
  editingId.value = t.id
  form.value = { name: t.name || '' }
  modalOpen.value = true
}

async function create() {
  saving.value = true
  try {
    if (editingId.value) {
      await api.put(`/tags/${editingId.value}`, form.value)
      toast.success('Tag updated')
    } else {
      await api.post('/tags', form.value)
      toast.success('Tag created')
    }
    modalOpen.value = false
    await load()
  } finally {
    saving.value = false
  }
}

async function remove(id) {
  if (!confirm('Delete this tag?')) return
  await api.delete(`/tags/${id}`)
  toast.success('Tag deleted')
  await load()
}
</script>

<style scoped>
.card { @apply bg-white rounded-xl border border-slate-200 p-4; }
.input { @apply w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500; }
.btn-primary { @apply px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700; }
</style>
