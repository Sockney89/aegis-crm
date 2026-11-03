<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <h1 class="text-2xl font-bold text-slate-800 mb-1">Reset password</h1>
      <p class="text-sm text-slate-500 mb-6">Enter your email to receive a reset token</p>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="label">Email</label>
          <input v-model="email" type="email" required class="input" />
        </div>
        <p v-if="message" class="text-sm text-green-600">{{ message }}</p>
        <p v-if="token" class="text-xs text-slate-500 break-all">Token: {{ token }}</p>
        <button class="btn-primary w-full" :disabled="loading">{{ loading ? 'Sending...' : 'Send reset link' }}</button>
      </form>
      <div class="mt-6 text-sm text-slate-500">
        <router-link to="/login" class="hover:text-brand-600">Back to sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const email = ref('')
const message = ref('')
const token = ref('')
const loading = ref(false)

async function submit() {
  loading.value = true
  try {
    const data = await auth.forgot(email.value)
    message.value = 'If the email exists, a reset token was generated.'
    if (data.reset_token) token.value = data.reset_token
  } catch (e) {
    message.value = 'Request failed'
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
