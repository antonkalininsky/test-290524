<script setup>
import TestItem from '@/components/TestItem.vue'
import { computed, ref, watch, nextTick } from 'vue'
import rowColorizer from '@/helpers/rowColorizer'
import { useDataStore } from '@/store/dataStore'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiChevronDown, mdiChevronRight, mdiMinus } from '@mdi/js'

const dataStore = useDataStore()

const isOpen = ref(false)

const props = defineProps(['data', 'isAllOpen', 'isFirst'])
const children = computed(() => dataStore.data?.filter((item) => item.parent_id === props.data?.id))
const icon = computed(() => {
  if (!children.value?.length) {
    return mdiMinus
  }
  return isOpen.value ? mdiChevronDown : mdiChevronRight
})

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
    nextTick(() => rowColorizer())
  }
)
</script>
<template>
  <div>
    <div class="item" @click="isOpen = !isOpen">
      <svg-icon class="item__icon" type="mdi" :path="icon" size="20" />
      <div class="item__title" :class="{ bold: props.isFirst }">
        {{ props.data?.title }}
      </div>
    </div>
    <template v-if="isOpen">
      <TestItem
        v-for="item in children"
        :key="item.id"
        :data="item"
        :isAllOpen="props.isAllOpen"
        style="padding-left: 1rem"
      />
    </template>
  </div>
</template>
<style scoped>
.item {
  display: flex;
  align-items: center;
  cursor: pointer;
  column-gap: 0.5rem;
  padding: 0.4rem;
}

.item__icon {
  font-size: 1rem;
}

.item__title {
  font-size: 1.2rem;
}

.bold {
  font-weight: bold;
}

.highlight {
  background-color: lightblue;
}
</style>
