<script setup>
// npm
import { onMounted, ref, nextTick } from 'vue'
// local
import TestComponent from './components/TestComponent.vue'
import { useDataStore } from '@/store/dataStore'
import rowColorizer from '@/helpers/rowColorizer'

const dataStore = useDataStore()

const rerender = ref(false)

onMounted(async () => {
  await dataStore.fetchData()
  nextTick(() => rowColorizer())
})
</script>

<template>
  <div>
    <button
      class="rerender-button"
      @click="
        () => {
          rerender = !rerender
          nextTick(() => rowColorizer())
        }
      "
    >
      rerenderer & open
    </button>
    <TestComponent :key="rerender" />
  </div>
</template>

<style scoped>
.rerender-button {
  margin-bottom: 1rem;
}
</style>
