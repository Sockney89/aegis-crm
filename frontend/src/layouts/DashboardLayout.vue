<template>
  <div class="min-h-screen bg-slate-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div class="h-16 flex items-center px-6 border-b border-slate-200">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">C</div>
          <span class="font-semibold text-slate-800">CRM</span>
        </div>
      </div>
      <nav class="flex-1 p-4 space-y-1">
        <router-link to="/" class="nav-link" active-class="nav-active">Dashboard</router-link>
        <router-link to="/contacts" class="nav-link" active-class="nav-active">Contacts</router-link>
        <router-link to="/companies" class="nav-link" active-class="nav-active">Companies</router-link>
        <router-link to="/deals" class="nav-link" active-class="nav-active">Deals</router-link>
      </nav>
      <div class="p-4 border-t border-slate-200">
        <div class="text-sm text-slate-600 mb-2">{{ auth.user?.name || auth.user?.email }}</div>
        <button @click="logout" class="w-full text-left text-sm text-slate-500 hover:text-slate-800">Sign out</button>
      </div>
    </aside>
    <!-- Main -->
    <main class="flex-1 flex flex-col">
      <header class="h-16 bg-white border-b border-slate-200 flex items-center px-8">
        <h1 class="text-lg font-semibold text-slate-800">{{ title }}</h1>
      </header>
      <div class="p-8 flex-1 overflow-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const title = computed(() => {
  const map = { '/': 'Dashboard', '/contacts': 'Contacts', '/companies': 'Companies', '/deals': 'Deals' }
  return map[route.path] || 'CRM'
})

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.nav-link {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 500;
}
.nav-link:hover { background: #f1f5f9; color: #1e293b; }
.nav-active { background: #eff6ff; color: #2563eb; }
</style>
