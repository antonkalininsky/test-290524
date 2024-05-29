<script setup>
import dataJson from '@/data.json'
import TestItem from '@/components/TestItem.vue'
import { computed, ref, watch, nextTick } from 'vue'
import rowColorizer from '@/helpers/rowColorizer'

const isOpen = ref(false)

const props = defineProps(['data', 'isAllOpen'])
const children = computed(() => dataJson.filter((item) => item.parent_id === props.data?.id))

watch(
  () => props.isAllOpen,
  () => {
    isOpen.value = props.isAllOpen
  },
  {
    immediate: true
  }
)

watch(
  () => isOpen.value,
  () => {
    console.log('trigger')
    nextTick(() => rowColorizer())
  }
)
</script>
<template>
  <div>
    <div class="item">
      <button v-if="children?.length" class="item__button" @click="isOpen = !isOpen">
        {{ isOpen ? '-' : '|' }}
      </button>
      <div class="item__title">
        {{ `${props.data?.id} - ${props.data?.title}` }}
      </div>
    </div>
    <template v-if="isOpen">
      <TestItem
        v-for="item in children"
        :key="item.id"
        :data="item"
        :isAllOpen="props.isAllOpen"
        style="padding-left: 20px"
      />
    </template>
  </div>
</template>
<style scoped>
.item {
  border: 1px solid black;
  margin: 1rem;
  display: flex;
}

.booty {
  background-color: green;
}
</style>
