import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    items: [],
  }),
  actions: {
    show(message, type = 'info', duration = 3000) {
      const id = Date.now() + Math.random()
      this.items.push({ id, message, type })
      if (duration > 0) {
        setTimeout(() => this.dismiss(id), duration)
      }
      return id
    },
    success(message, duration = 3000) {
      return this.show(message, 'success', duration)
    },
    error(message, duration = 4000) {
      return this.show(message, 'error', duration)
    },
    dismiss(id) {
      this.items = this.items.filter((t) => t.id !== id)
    },
  },
})