<script setup>
import dataJson from '@/data.json'
import TestItem from '@/components/TestItem.vue'
import { computed, onMounted, ref, nextTick } from 'vue'
import rowColorizer from '@/helpers/rowColorizer'

const isAllOpen = ref(false)

const parentlessItems = computed(() => dataJson.filter((item) => item.parent_id === null))

onMounted(() => {
  rowColorizer()
})
</script>
<template>
  <div class="container">
    <button
      @click="
        () => {
          isAllOpen = !isAllOpen
          nextTick(() => rowColorizer())
        }
      "
    >
      open all
    </button>
    <div class="idiots">
      <TestItem
        v-for="item in parentlessItems"
        :key="item.id"
        :data="item"
        :isAllOpen="isAllOpen"
      />
    </div>
  </div>
</template>
<style>
.container {
  width: 500px;
  border: 1px solid red;
}
</style>
