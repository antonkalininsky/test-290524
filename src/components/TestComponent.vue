<script setup>
import TestItem from '@/components/TestItem.vue'
import { computed } from 'vue'
import { useDataStore } from '@/store/dataStore'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAlert, mdiTimerSandEmpty } from '@mdi/js'

const dataStore = useDataStore()

const parentlessItems = computed(() => dataStore.data?.filter((item) => item.parent_id === null))
</script>
<template>
  <div class="container">
    <div class="loading" v-if="dataStore.loading">
      <svg-icon type="mdi" :path="mdiTimerSandEmpty" size="20" />
      <div>Loading...</div>
    </div>
    <div class="warning" v-else-if="dataStore.isError">
      <svg-icon type="mdi" :path="mdiAlert" size="20" />
      <div>Data fetch error. Try again later.</div>
    </div>
    <template v-else>
      <div class="container__items">
        <TestItem v-for="item in parentlessItems" :key="item.id" :data="item" :isFirst="true" />
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
