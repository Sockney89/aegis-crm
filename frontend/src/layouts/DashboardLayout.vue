<template>
  <div class="min-h-screen bg-[#f5f4ef] text-[#172625] lg:flex">
    <!-- Sidebar -->
    <aside class="hidden lg:flex lg:w-72 bg-[#123d3a] text-white flex-col lg:min-h-screen lg:sticky lg:top-0">
      <div class="h-24 flex items-center px-7 border-b border-white/10">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-2xl bg-[#f2b56b] text-[#123d3a] flex items-center justify-center font-bold text-lg">C</div>
          <div>
            <span class="block font-semibold tracking-tight">Cohort</span>
            <span class="block text-[11px] uppercase tracking-[0.24em] text-white/50">CRM studio</span>
          </div>
        </div>
      </div>
      <nav class="flex-1 p-5 space-y-1">
        <router-link to="/" class="nav-link" active-class="nav-active">Dashboard</router-link>
        <router-link to="/contacts" class="nav-link" active-class="nav-active">Contacts</router-link>
        <router-link to="/companies" class="nav-link" active-class="nav-active">Companies</router-link>
        <router-link to="/deals" class="nav-link" active-class="nav-active">Deals</router-link>
        <router-link to="/tasks" class="nav-link" active-class="nav-active">Tasks</router-link>
        <router-link to="/tags" class="nav-link" active-class="nav-active">Tags</router-link>
        <router-link to="/audit" class="nav-link" active-class="nav-active">Audit</router-link>
        <router-link to="/workflows" class="nav-link" active-class="nav-active">Workflows</router-link>
      </nav>
      <div class="p-5 border-t border-white/10">
        <div class="text-sm text-white/80 mb-1">{{ auth.user?.name || auth.user?.email }}</div>
        <div class="text-xs text-white/40 mb-3">Workspace owner</div>
        <button @click="logout" class="w-full text-left text-sm text-white/55 hover:text-white">Sign out</button>
      </div>
    </aside>
    <!-- Main -->
    <main class="flex-1 min-w-0 flex flex-col">
      <header class="bg-[#f5f4ef]/95 backdrop-blur border-b border-[#d9ddd5] px-5 py-5 sm:px-8 lg:px-12">
        <div class="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div>
            <p class="text-[11px] uppercase tracking-[0.24em] text-[#087f70] font-semibold">Cohort workspace</p>
            <h1 class="text-2xl font-semibold text-[#172625] mt-1">{{ title }}</h1>
          </div>
          <div class="hidden sm:flex items-center gap-2 rounded-full bg-white border border-[#d9ddd5] px-3 py-2 text-xs text-[#53635e]">
            <span class="w-2 h-2 rounded-full bg-[#0f9f8a]"></span>
            Local workspace
          </div>
        </div>
      </header>
      <div class="lg:hidden overflow-x-auto bg-[#123d3a] px-4 py-3">
        <nav class="flex gap-2 min-w-max">
          <router-link v-for="item in navItems" :key="item.to" :to="item.to" class="mobile-nav-link" active-class="mobile-nav-active">{{ item.label }}</router-link>
        </nav>
      </div>
      <div class="px-5 py-7 sm:px-8 lg:px-12 lg:py-10 flex-1 overflow-auto">
        <div class="max-w-7xl mx-auto">
        <router-view />
        </div>
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

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/contacts', label: 'Contacts' },
  { to: '/companies', label: 'Companies' },
  { to: '/deals', label: 'Deals' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/tags', label: 'Tags' },
  { to: '/audit', label: 'Audit' },
  { to: '/workflows', label: 'Workflows' },
]

const title = computed(() => {
  const map = { '/': 'Dashboard', '/contacts': 'Contacts', '/companies': 'Companies', '/deals': 'Deals', '/tasks': 'Tasks', '/tags': 'Tags', '/audit': 'Audit log', '/workflows': 'Mock workflows' }
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
  padding: 0.7rem 0.85rem;
  border-radius: 0.75rem;
  color: rgba(255,255,255,.62);
  font-size: 0.875rem;
  font-weight: 500;
}
.nav-link:hover { background: rgba(255,255,255,.08); color: white; }
.nav-active { background: #f2b56b; color: #123d3a; }
.mobile-nav-link { padding: .5rem .75rem; border-radius: 999px; color: rgba(255,255,255,.68); font-size: .8rem; font-weight: 600; }
.mobile-nav-active { background: #f2b56b; color: #123d3a; }
</style>
