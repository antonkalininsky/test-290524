import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTableStore = defineStore('table', () => {
  const state = ref({})

  return { state }
})
