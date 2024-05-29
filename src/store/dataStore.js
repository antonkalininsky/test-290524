import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDataStore = defineStore('data', () => {
  const data = ref([])
  const loading = ref(false)
  const isError = ref(false)

  async function fetchData() {
    loading.value = true
    isError.value = false
    try {
      const res = await axios.get('https://64b4c8450efb99d862694609.mockapi.io/tree/items')
      data.value = res.data
    } catch (error) {
      data.value = []
      isError.value = true
      console.log(error)
    }
    loading.value = false
  }

  return { data, loading, isError, fetchData }
})
