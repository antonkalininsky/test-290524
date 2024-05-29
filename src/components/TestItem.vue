<script setup>
import TestItem from '@/components/TestItem.vue'
import { computed, ref, watch, nextTick, onMounted } from 'vue'
import rowColorizer from '@/helpers/rowColorizer'
import { useDataStore } from '@/store/dataStore'
import { useTableStore } from '@/store/tableStore'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiChevronDown, mdiChevronRight, mdiMinus } from '@mdi/js'

const dataStore = useDataStore()
const tableStore = useTableStore()

const isOpen = ref(false)
const isOpenOnMount = ref(false)

const props = defineProps(['data', 'isFirst', 'isParentOpen', 'isParentOpenOnMount'])

const children = computed(() => dataStore.data?.filter((item) => item.parent_id === props.data?.id))
const icon = computed(() => {
  if (!children.value?.length) {
    return mdiMinus
  }
  return isOpen.value ? mdiChevronDown : mdiChevronRight
})

onMounted(() => {
  if (typeof tableStore.state?.[props.data.id] === 'boolean') {
    isOpen.value = tableStore.state[props.data.id]
  } else {
    tableStore.state[props.data.id] = false
  }
  if (props.isParentOpen && !props.isParentOpenOnMount && !isOpen.value) {
    isOpen.value = true
    isOpenOnMount.value = true
  }
})

watch(
  () => isOpen.value,
  () => {
    tableStore.state[props.data.id] = isOpen.value
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
        :isParentOpen="isOpen"
        :isParentOpenOnMount="isOpenOnMount"
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
