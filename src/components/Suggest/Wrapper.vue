<script setup>
import { ref, onMounted } from 'vue'

const list = ref()
const wrapper = ref()
const suggestHeight = ref(0)

onMounted(() => {
  const childrenArray = [...list.value.children]
  const wrapperHeight = wrapper.value.getBoundingClientRect().height
  const listHeight = list.value.getBoundingClientRect().height

  const listHeightOffset = childrenArray.slice(0, 4).reduce((totalHeight, element) => {
    return totalHeight + element.getBoundingClientRect().height
  }, 0)

  suggestHeight.value = wrapperHeight - listHeight + listHeightOffset
})
</script>

<template>
  <div ref="wrapper" class="suggest-wrapper" :style="[suggestHeight && `height: ${suggestHeight}px; overflow-y: scroll;`]" role="listbox" aria-labelledby="suggest-label">
    <ul ref="list" class="suggest-list" role="presentation">
      <slot />
    </ul>
  </div>
</template>

<style scoped lang="scss">
.suggest-wrapper {
  margin-top: var(--pico-spacing);
  background-color: var(--pico-dropdown-background-color);
  border-radius: var(--pico-border-radius);
  padding: var(--pico-spacing);
}

.suggest-list {
  padding: 0;
}
</style>