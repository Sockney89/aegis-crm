<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <h1 class="text-2xl font-bold text-slate-800 mb-1">Set new password</h1>
      <p class="text-sm text-slate-500 mb-6">Enter your reset token and new password</p>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="label">Reset token</label>
          <input v-model="token" type="text" required class="input" />
        </div>
        <div>
          <label class="label">New password</label>
          <input v-model="password" type="password" required class="input" />
        </div>
        <p v-if="message" class="text-sm text-green-600">{{ message }}</p>
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
        <button class="btn-primary w-full" :disabled="loading">{{ loading ? 'Resetting...' : 'Reset password' }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const token = ref('')
const password = ref('')
const message = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await auth.reset(token.value, password.value)
    message.value = 'Password reset. You can sign in now.'
    setTimeout(() => router.push('/login'), 1200)
  } catch (e) {
    error.value = e.response?.data?.error || 'Reset failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.label { @apply block text-sm font-medium text-slate-700 mb-1; }
.input { @apply w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500; }
.btn-primary { @apply px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed; }
</style>
