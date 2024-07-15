<script setup>
const emit = defineEmits(['selected'])

const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'https://placehold.co/54x54'
  },
  image: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <li class="suggest-item" role="listitem">
    <button class="outline contrast suggest-button" @click="emit('selected')" :aria-label="`Select ${title}`">
      <span class="suggest-image">
        <img :src="image || placeholder" :alt="title" height="54" width="54" loading="lazy">
      </span>
      <span class="suggest-content">
        <span class="suggest-title" aria-label="Title">{{ title }}</span>
        <span class="suggest-description" aria-label="Description">{{ description }}</span>
      </span>
    </button>
</li>
</template>

<style scoped lang="scss">
.suggest-item {
  list-style: none;
}

.suggest-button {
  display: flex;
  justify-content: left;
  align-items: stretch;
  text-align: left;

  background: none;
  border: 0;
  width: 100%;
}

.suggest-content {
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
}

.suggest-image {
  display: flex;
  align-items: center;
}
</style>