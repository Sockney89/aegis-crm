<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-slate-800">Tasks</h2>
      <button @click="openCreate" class="btn-primary">+ New task</button>
    </div>
    <div class="card">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-slate-500 border-b border-slate-200">
            <th class="py-3 px-2">Title</th>
            <th class="py-3 px-2">Status</th>
            <th class="py-3 px-2">Priority</th>
            <th class="py-3 px-2">Due</th>
            <th class="py-3 px-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in tasks" :key="t.id" class="border-b border-slate-100">
            <td class="py-3 px-2 font-medium text-slate-800">{{ t.title }}</td>
            <td class="py-3 px-2 text-slate-600">{{ t.status }}</td>
            <td class="py-3 px-2 text-slate-600">{{ t.priority }}</td>
            <td class="py-3 px-2 text-slate-600">{{ t.due_at }}</td>
            <td class="py-3 px-2 text-right space-x-2">
              <button @click="openEdit(t)" class="text-brand-600 hover:text-brand-700 text-xs">Edit</button>
              <button @click="remove(t.id)" class="text-red-600 hover:text-red-700 text-xs">Delete</button>
            </td>
          </tr>
          <tr v-if="!tasks.length">
            <td colspan="5" class="py-6 text-center text-slate-400">No tasks yet</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal :open="modalOpen" :title="editingId ? 'Edit task' : 'New task'" @close="modalOpen = false">
      <form @submit.prevent="create" class="space-y-3">
        <input v-model="form.title" placeholder="Title" class="input" />
        <input v-model="form.description" placeholder="Description" class="input" />
        <input v-model="form.priority" placeholder="Priority" class="input" />
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

const tasks = ref([])
const modalOpen = ref(false)
const saving = ref(false)
const editingId = ref(null)
const form = ref({ title: '', description: '', priority: 'medium' })

async function load() {
  const { data } = await api.get('/tasks')
  tasks.value = data
}
onMounted(load)

function openCreate() {
  editingId.value = null
  form.value = { title: '', description: '', priority: 'medium' }
  modalOpen.value = true
}

function openEdit(t) {
  editingId.value = t.id
  form.value = { title: t.title || '', description: t.description || '', priority: t.priority || 'medium' }
  modalOpen.value = true
}

async function create() {
  saving.value = true
  try {
    if (editingId.value) {
      await api.put(`/tasks/${editingId.value}`, form.value)
      toast.success('Task updated')
    } else {
      await api.post('/tasks', form.value)
      toast.success('Task created')
    }
    modalOpen.value = false
    await load()
  } finally {
    saving.value = false
  }
}

async function remove(id) {
  if (!confirm('Delete this task?')) return
  await api.delete(`/tasks/${id}`)
  toast.success('Task deleted')
  await load()
}
</script>

<style scoped>
.card { @apply bg-white rounded-[1.35rem] border border-[#dfe3dc] p-5 shadow-[0_12px_35px_rgba(31,55,49,.05)]; }
.input { @apply w-full px-3 py-2.5 border border-[#d9ddd5] rounded-xl bg-[#fbfbf8] focus:outline-none focus:ring-2 focus:ring-brand-500; }
.btn-primary { @apply px-4 py-2.5 bg-[#123d3a] text-white rounded-xl font-semibold hover:bg-[#087f70]; }
</style>
