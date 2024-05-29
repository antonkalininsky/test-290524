<script setup>
import TestItem from '@/components/TestItem.vue'
import { computed, onMounted, ref, nextTick } from 'vue'
import rowColorizer from '@/helpers/rowColorizer'
import { useDataStore } from '@/store/dataStore'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAlert, mdiTimerSandEmpty } from '@mdi/js'

const dataStore = useDataStore()

const isAllOpen = ref(false)

const parentlessItems = computed(() => dataStore.data?.filter((item) => item.parent_id === null))

onMounted(async () => {
  await dataStore.fetchData()
  rowColorizer()
})
</script>
<template>
  <div class="container">
    <div class="loading" v-if="dataStore.loading">
      <svg-icon type="mdi" :path="mdiTimerSandEmpty" size="20" />
      <div>loading...</div>
    </div>
    <div class="warning" v-else-if="dataStore.isError">
      <svg-icon type="mdi" :path="mdiAlert" size="20" />
      <div>Data fetch error. Try again later.</div>
    </div>
    <template v-else>
      <button
        class="toggle-button"
        @click="
          () => {
            isAllOpen = !isAllOpen
            nextTick(() => rowColorizer())
          }
        "
      >
        {{ isAllOpen ? 'close all' : 'open all' }}
      </button>
      <div class="container__items">
        <TestItem
          v-for="item in parentlessItems"
          :key="item.id"
          :data="item"
          :isAllOpen="isAllOpen"
          :isFirst="true"
        />
      </div>
    </template>
  </div>
</template>
<style scoped>
.container {
  width: 500px;
}

.container__items {
  margin-top: 1rem;
}

.warning {
  color: red;
  font-weight: bold;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
}

.loading {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
}
</style>
