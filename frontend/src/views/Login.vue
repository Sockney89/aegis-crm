<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <h1 class="text-2xl font-bold text-slate-800 mb-1">Welcome back</h1>
      <p class="text-sm text-slate-500 mb-6">Sign in to your CRM account</p>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="label">Email</label>
          <input v-model="email" type="email" required class="input" />
        </div>
        <div>
          <label class="label">Password</label>
          <input v-model="password" type="password" required class="input" />
        </div>
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
        <button class="btn-primary w-full" :disabled="loading">{{ loading ? 'Signing in...' : 'Sign in' }}</button>
      </form>
      <div class="mt-6 text-sm text-slate-500 flex justify-between">
        <router-link to="/forgot" class="hover:text-brand-600">Forgot password?</router-link>
        <router-link to="/register" class="hover:text-brand-600">Create account</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = e.response?.data?.error || 'Login failed'
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
