<template>
  <div class="space-y-8">
    <section class="hero-panel rounded-[2rem] p-7 sm:p-10 text-white overflow-hidden relative">
      <div class="relative z-10 max-w-2xl">
        <p class="text-xs uppercase tracking-[0.25em] text-[#f2b56b] font-semibold">Relationship intelligence</p>
        <h2 class="text-4xl sm:text-5xl font-semibold tracking-tight mt-4 leading-[1.05]">Keep the signal.<br><span class="text-[#f2b56b]">Move the work.</span></h2>
        <p class="mt-5 text-white/65 max-w-lg leading-relaxed">A calm command center for the conversations, deals, and follow-ups that keep your team moving.</p>
      </div>
      <div class="hero-orbit orbit-one"></div>
      <div class="hero-orbit orbit-two"></div>
    </section>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <div class="stat-card">
        <div class="stat-kicker">People</div>
        <div class="stat-value">{{ stats.contacts }}</div>
        <div class="stat-note">contacts in your orbit</div>
      </div>
      <div class="stat-card">
        <div class="stat-kicker">Accounts</div>
        <div class="stat-value">{{ stats.companies }}</div>
        <div class="stat-note">companies being tracked</div>
      </div>
      <div class="stat-card">
        <div class="stat-kicker">Momentum</div>
        <div class="stat-value">{{ stats.deals }}</div>
        <div class="stat-note">active deal records</div>
      </div>
      <div class="stat-card stat-card-accent">
        <div class="stat-kicker">Pipeline value</div>
        <div class="stat-value">${{ Number(stats.pipeline_value).toLocaleString() }}</div>
        <div class="stat-note">{{ stats.open_tasks }} open tasks</div>
      </div>
    </div>
    <div class="grid lg:grid-cols-[1.4fr_.8fr] gap-5">
      <div class="card p-7">
        <div class="flex items-start justify-between gap-4 mb-6">
          <div>
            <p class="eyebrow">Workspace shortcuts</p>
            <h3 class="section-title">Start where the energy is</h3>
          </div>
          <span class="badge">Today</span>
        </div>
        <div class="grid sm:grid-cols-3 gap-3">
          <router-link to="/contacts" class="action-tile"><span class="action-icon bg-[#d5f4e9] text-[#087f70]">01</span><span>People</span></router-link>
          <router-link to="/deals" class="action-tile"><span class="action-icon bg-[#fde5cf] text-[#b56a28]">02</span><span>Deals</span></router-link>
          <router-link to="/tasks" class="action-tile"><span class="action-icon bg-[#e4e3fb] text-[#5a56a8]">03</span><span>Tasks</span></router-link>
        </div>
      </div>
      <div class="card p-7 bg-[#e7f3ee] border-[#c7e7d9]">
        <p class="eyebrow">Aegis signal</p>
        <h3 class="section-title mt-2">Workflow-aware by design.</h3>
        <p class="text-sm text-[#53635e] mt-3 leading-relaxed">Deal transitions trigger typed state rules and mock integrations, so every movement is visible and testable.</p>
        <router-link to="/workflows" class="inline-flex mt-6 text-sm font-semibold text-[#087f70]">View workflow runs <span class="ml-2">-&gt;</span></router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const stats = ref({ contacts: 0, companies: 0, deals: 0, pipeline_value: 0, open_tasks: 0 })

onMounted(async () => {
  try {
    const { data } = await api.get('/stats')
    stats.value = data
  } catch (e) {}
})
</script>

<style scoped>
.card { @apply bg-white rounded-[1.35rem] border border-[#dfe3dc] shadow-[0_12px_35px_rgba(31,55,49,.05)]; }
.hero-panel { background: #123d3a; box-shadow: 0 20px 50px rgba(18,61,58,.18); }
.hero-orbit { position: absolute; border: 1px solid rgba(242,181,107,.35); border-radius: 999px; }
.orbit-one { width: 360px; height: 360px; right: -80px; top: -150px; }
.orbit-two { width: 260px; height: 260px; right: 40px; top: -100px; }
.stat-card { @apply rounded-[1.25rem] border border-[#dfe3dc] bg-white p-5; box-shadow: 0 10px 30px rgba(31,55,49,.04); }
.stat-card-accent { @apply bg-[#f2b56b] border-[#f2b56b]; }
.stat-kicker { @apply text-xs uppercase tracking-[.16em] font-semibold text-[#70807a]; }
.stat-card-accent .stat-kicker { color: #6a421f; }
.stat-value { @apply text-3xl font-semibold tracking-tight text-[#172625] mt-3; }
.stat-card-accent .stat-value { color: #3e2a1c; }
.stat-note { @apply text-xs text-[#70807a] mt-2; }
.stat-card-accent .stat-note { color: #6a421f; }
.eyebrow { @apply text-[11px] uppercase tracking-[.2em] text-[#087f70] font-semibold; }
.section-title { @apply text-xl font-semibold text-[#172625] mt-1; }
.badge { @apply rounded-full bg-[#f5f4ef] px-3 py-1 text-[11px] uppercase tracking-wider text-[#70807a]; }
.action-tile { @apply rounded-2xl border border-[#e3e7e0] p-4 flex items-center gap-3 text-sm font-semibold text-[#31423e] hover:border-[#0f9f8a] hover:-translate-y-0.5; }
.action-icon { @apply w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold; }
</style>
